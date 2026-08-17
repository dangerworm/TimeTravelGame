#!/usr/bin/env node
'use strict';
// ── Warped — LLM playtest ──────────────────────────────────────────────────────
// Plays one full game of Warped end-to-end on the real decks/ content, with every player's
// decisions made by a local Ollama model instead of a fixed heuristic bot. Reuses the exact same
// rules engine the balance sim uses (sim/game/*, sim/lib/*) via engine.js's playGame() — this is
// not a re-implementation of the rules, it's the validated engine with an LLM sitting in the
// "policy" seat, driven through the same setup/loop the balance sim uses (opts.hooks below just
// taps into it for turn-by-turn logging).
//
// Usage:
//   node sim/llm/play-llm-game.js                       # 4 players, llama3.1:8b, random seed
//   node sim/llm/play-llm-game.js --model qwen2.5:7b-instruct
//   node sim/llm/play-llm-game.js --seed 42 --players 3
//   node sim/llm/play-llm-game.js --policies llm,llm,balanced,balanced   # mix in heuristics (fast debug)
//   node sim/llm/play-llm-game.js --config sim/configs/adopted.json      # play the tuned/gated content
//
// Config handling matches sim/full-game.js exactly (same --config/--reqs/--gates/--findmult flags,
// same overrides/options JSON shape) so the two drivers can never silently diverge on what content
// an LLM run is actually playing against.
//
// Known simplification (shared with the balance sim, see sim/game/engine.js's header comment):
// the React phase's jump-cancel/improvise branch and the Negotiate phase (renting a rival's
// teammate — the only player-to-player cash transfer in the game) aren't modelled. Every turn goes
// straight Jump → Process → Develop → Plan, so this sim always plays a closed economy.
// Also: every decision is a fresh, memoryless call to the model (no conversation history carried
// between them) — there's no continuity of "plan" across e.g. a buy decision and a bench decision.
const path = require('path');
const fs = require('fs');
const { makePRNG } = require('../lib/resolution');
const { playGame } = require('../game/engine');
const { topModuleLevel } = require('../game/state');
const { ALL } = require('../game/policies');
const { PROPOSED } = require('../lib/patterns');
const { ensureServerRunning, ensureModel } = require('./ollama-client');
const { makeLlmPolicy } = require('./llm-policy');

const args = process.argv.slice(2);
const has = (f) => args.includes(f);
const argVal = (flag, def) => {
  const i = args.indexOf(flag);
  return i >= 0 ? args[i + 1] : def;
};

const MODEL = argVal('--model', process.env.TT_SIM_MODEL || 'llama3.1:8b');
const NUM_PLAYERS = parseInt(argVal('--players', '4'), 10);
const SEED = parseInt(argVal('--seed', String(Date.now() & 0xffffffff)), 10);
const TEMPERATURE = parseFloat(argVal('--temperature', '0.3'));
const policyList = argVal('--policies', Array(NUM_PLAYERS).fill('llm').join(',')).split(',');

// Same shape/precedence as sim/full-game.js: best-config.json is the base; a --config file
// deep-overrides it (under "overrides", not "config" — that key never existed in sim/configs/*.json,
// so reading it silently played every LLM run on un-gated, un-patterned content) and supplies run
// options; CLI flags win over the file.
const BEST = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'best-config.json'), 'utf8')).config;
const configPath = argVal('--config', null);
const fileCfg = configPath ? JSON.parse(fs.readFileSync(configPath, 'utf8')) : {};
const cfg = { ...BEST, ...(fileCfg.overrides || {}) };
const fopts = fileCfg.options || {};
const reqs = argVal('--reqs', fopts.reqs || 'current');
const findMult = parseFloat(argVal('--findmult', String(fopts.findMult ?? 1)));
const gateTiers = has('--gates') ? true : has('--nogates') ? false : !!fopts.gateTiers;
const renewableMarket = has('--renewable') ? true : !!fopts.renewableMarket;
const patternMap = reqs === 'proposed' ? PROPOSED : null;
const configLabel = fileCfg.label || (configPath ? path.basename(configPath) : 'best-config');

const ERAS = ['Recent', 'Modern', 'EarlyModern', 'Medieval', 'Ancient', 'Prehistoric', 'ManyWorlds'];

function log(...a) {
  console.log(...a);
}

// A shallow snapshot of the fields a turn can change, so we can print a readable diff afterwards
// via playGame()'s onTurnStart/onTurnEnd hooks without needing logging built into the engine itself.
function snapshot(p) {
  return {
    cash: p.cash,
    rep: p.rep,
    disrepute: p.disrepute,
    instability: p.instability,
    teamSize: p.team.length,
    machine: { ...p.machine },
    dataLen: p.data.length,
    artefactsLen: p.artefacts.length,
    retired: p.retired,
    overclocks: p.overclocks,
    shutdowns: p.shutdowns,
    papersWritten: p.papersWritten,
    deepestEra: p.deepestEra,
  };
}

function logTurnDiff(p, before) {
  const bits = [];
  if (p.cash !== before.cash) bits.push(`cash ${before.cash}→${p.cash}`);
  if (p.rep !== before.rep) bits.push(`rep ${before.rep}→${p.rep}`);
  if (p.disrepute !== before.disrepute) bits.push(`disrepute ${before.disrepute}→${p.disrepute}`);
  if (p.instability !== before.instability) bits.push(`instability ${before.instability}→${p.instability}`);
  if (p.team.length !== before.teamSize) bits.push(`team ${before.teamSize}→${p.team.length}`);
  for (const k of ['amp', 'cap', 'col', 'stab']) {
    if (p.machine[k] !== before.machine[k]) bits.push(`${k} ${before.machine[k]}→${p.machine[k]}`);
  }
  if (p.data.length !== before.dataLen) bits.push(`data ${before.dataLen}→${p.data.length}`);
  if (p.artefacts.length !== before.artefactsLen) bits.push(`artefacts ${before.artefactsLen}→${p.artefacts.length}`);
  if (p.deepestEra !== before.deepestEra) bits.push(`deepest era now ${ERAS[p.deepestEra]}`);
  if (p.shutdowns !== before.shutdowns) bits.push('SHUTDOWN');
  if (p.retired && !before.retired) bits.push('RETIRED');
  log(`  → P${p.id + 1} turn result: ${bits.length ? bits.join(', ') : '(no change)'}\n`);
}

function printFinalSummary(game, elapsedMs) {
  log('\n' + '═'.repeat(72));
  log(`GAME OVER after ${game.round} rounds — ${game.endReason}` + (game.mwSuccess ? ' (Many Worlds reached!)' : ''));
  log('═'.repeat(72));
  const ranked = [...game.players].sort((a, b) => b.score - a.score);
  ranked.forEach((p, i) => {
    log(
      `${i === 0 ? '🏆' : '  '} Player ${p.id + 1} (${p.policy.name}) — score ${p.score}` +
        ` [rep ${p.rep}, disrepute ${p.disrepute}, top module ${topModuleLevel(p, game.cfg)}, ` +
        `unpublished ${p.data.length + p.artefacts.length}]` +
        (p.retired ? ' — retired' : '')
    );
    log(
      `     deepest era: ${ERAS[p.deepestEra]} · expeditions ${p.expeditions} · overclocks ${p.overclocks} · ` +
        `shutdowns ${p.shutdowns} · papers ${p.papersWritten} · plunders ${p.plunders} · sells ${p.sells}`
    );
  });
  log(`\nTimeline integrity: ${game.integrity}/${game.integrityMax}${game.integrity <= 0 ? ' — COLLAPSED' : ''}`);
  if (game.eraDryEvents) log(`Era decks ran dry and reshuffled ${game.eraDryEvents} time(s) during the game.`);
  log(`Wall-clock time: ${(elapsedMs / 1000).toFixed(1)}s`);
}

async function main() {
  log(
    `Warped — LLM playtest\n  model: ${MODEL}\n  players: ${NUM_PLAYERS} [${policyList.join(', ')}]\n  seed: ${SEED}\n` +
      `  config: ${configLabel} (reqs:${reqs} gates:${gateTiers} findMult:${findMult} renewableMarket:${renewableMarket})\n`
  );

  if (policyList.includes('llm')) {
    await ensureServerRunning({ log });
    await ensureModel(MODEL, { log });
  }

  // sim/game/engine.js resolves policy names through its own imported `ALL` (sim/game/policies.js) —
  // it's a module-singleton object, so registering 'llm' on it here is what makes playGame() able to
  // hand an 'llm' policyName seat to this driver's model-backed policy.
  const llmPolicy = makeLlmPolicy({ model: MODEL, log, temperature: TEMPERATURE });
  ALL.llm = llmPolicy;
  const unknown = policyList.filter((n) => !ALL[n]);
  if (unknown.length) throw new Error(`Unknown --policies entr${unknown.length > 1 ? 'ies' : 'y'}: ${unknown.join(', ')} (known: ${Object.keys(ALL).join(', ')})`);

  const rng = makePRNG(SEED);
  const start = Date.now();
  const snapshots = new WeakMap();

  const game = await playGame(NUM_PLAYERS, policyList, cfg, rng, {
    patternMap,
    findMult,
    gateTiers,
    renewableMarket,
    hooks: {
      onRoundStart(g) {
        log(`\n── Round ${g.round} ${'─'.repeat(60)}`);
      },
      onTurnStart(p) {
        log(`\nPlayer ${p.id + 1}'s turn${p.staged ? ` — staged: ${p.staged.name} [${p.staged.era}]` : ' — no jump staged'}`);
        snapshots.set(p, snapshot(p));
      },
      onTurnEnd(p) {
        logTurnDiff(p, snapshots.get(p));
      },
    },
  });

  printFinalSummary(game, Date.now() - start);
}

main().catch((e) => {
  console.error('\nFatal error:', e);
  process.exit(1);
});
