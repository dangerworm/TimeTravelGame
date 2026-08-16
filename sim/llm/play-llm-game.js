#!/usr/bin/env node
'use strict';
// ── Warped — LLM playtest ──────────────────────────────────────────────────────
// Plays one full game of Warped end-to-end on the real decks/ content, with every player's
// decisions made by a local Ollama model instead of a fixed heuristic bot. Reuses the exact same
// rules engine the balance sim uses (sim/game/*, sim/lib/*) — this is not a re-implementation of
// the rules, it's the validated engine with an LLM sitting in the "policy" seat.
//
// Usage:
//   node sim/llm/play-llm-game.js                       # 4 players, qwen2.5:7b, random seed
//   node sim/llm/play-llm-game.js --model llama3.1:8b
//   node sim/llm/play-llm-game.js --seed 42 --players 3
//   node sim/llm/play-llm-game.js --policies llm,llm,balanced,balanced   # mix in heuristics (fast debug)
//
// Known simplification (shared with the balance sim, see sim/game/engine.js's header comment):
// the React and Negotiate turn phases (cancelling a jump, renting a rival's teammate) are not
// modelled — every turn goes straight Jump → Process → Develop → Plan.
const path = require('path');
const fs = require('fs');
const { makePRNG } = require('../lib/resolution');
const { loadDecks } = require('../lib/deck-loader');
const { makePlayer, makeGame, score } = require('../game/state');
const { makeMarket, buyIfAffordable } = require('../game/economy');
const { doTurn, planStage } = require('../game/engine');
const { ALL } = require('../game/policies');
const { ensureServerRunning, ensureModel } = require('./ollama-client');
const { makeLlmPolicy } = require('./llm-policy');

const args = process.argv.slice(2);
const argVal = (flag, def) => {
  const i = args.indexOf(flag);
  return i >= 0 ? args[i + 1] : def;
};

const MODEL = argVal('--model', process.env.TT_SIM_MODEL || 'llama3.1:8b');
const NUM_PLAYERS = parseInt(argVal('--players', '4'), 10);
const SEED = parseInt(argVal('--seed', String(Date.now() & 0xffffffff)), 10);
const TEMPERATURE = parseFloat(argVal('--temperature', '0.3'));
const configPath = argVal('--config', null);
const BEST = require(path.join(__dirname, '..', 'best-config.json')).config;
const cfg = { ...BEST, ...(configPath ? JSON.parse(fs.readFileSync(configPath, 'utf8')).config || {} : {}) };
const policyList = argVal('--policies', Array(NUM_PLAYERS).fill('llm').join(',')).split(',');

const ERAS = ['Recent', 'Modern', 'EarlyModern', 'Medieval', 'Ancient', 'Prehistoric', 'ManyWorlds'];

function log(...a) {
  console.log(...a);
}

// A shallow snapshot of the fields a turn can change, so we can print a readable diff afterwards
// without needing hooks inside the engine itself.
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
        ` [rep ${p.rep}, disrepute ${p.disrepute}, top module ${Math.max(p.machine.amp, p.machine.cap, p.machine.col, p.machine.stab)}, ` +
        `unpublished ${p.data.length + p.artefacts.length}]` +
        (p.retired ? ' — retired' : '')
    );
    log(
      `     deepest era: ${ERAS[p.deepestEra]} · expeditions ${p.expeditions} · overclocks ${p.overclocks} · ` +
        `shutdowns ${p.shutdowns} · papers ${p.papersWritten} · plunders ${p.plunders} · sells ${p.sells}`
    );
  });
  log(`\nTimeline integrity: ${game.integrity}/${game.integrityMax}${game.integrity <= 0 ? ' — COLLAPSED' : ''}`);
  log(`Wall-clock time: ${(elapsedMs / 1000).toFixed(1)}s`);
}

async function main() {
  log(`Warped — LLM playtest\n  model: ${MODEL}\n  players: ${NUM_PLAYERS} [${policyList.join(', ')}]\n  seed: ${SEED}\n`);

  if (policyList.includes('llm')) {
    await ensureServerRunning({ log });
    await ensureModel(MODEL, { log });
  }

  const llmPolicy = makeLlmPolicy({ model: MODEL, log, temperature: TEMPERATURE });
  const policies = { ...ALL, llm: llmPolicy };
  const unknown = policyList.filter((n) => !policies[n]);
  if (unknown.length) throw new Error(`Unknown --policies entr${unknown.length > 1 ? 'ies' : 'y'}: ${unknown.join(', ')} (known: ${Object.keys(policies).join(', ')})`);

  const rng = makePRNG(SEED);
  const loaded = loadDecks(rng, {});
  const players = Array.from({ length: NUM_PLAYERS }, (_, i) => makePlayer(i, policies[policyList[i % policyList.length]], cfg));
  const game = makeGame(players, loaded, cfg, rng);
  game.findMult = 1;
  game.renewableMarket = false;
  makeMarket(game);

  const start = Date.now();

  for (const p of players) {
    await buyIfAffordable(p, game);
    await planStage(p, game);
  }

  const SAFETY_MAX_ROUNDS = 40;
  while (!game.ended && game.round < SAFETY_MAX_ROUNDS) {
    game.round++;
    log(`\n── Round ${game.round} ${'─'.repeat(60)}`);
    for (const p of players) {
      if (game.ended) break;
      if (p.retired) continue;
      const staged = p.staged;
      log(`\nPlayer ${p.id + 1}'s turn${staged ? ` — staged: ${staged.name} [${staged.era}]` : ' — no jump staged'}`);
      const before = snapshot(p);
      await doTurn(p, game);
      logTurnDiff(p, before);
    }
    if (!game.ended && players.every((p) => p.retired)) {
      game.ended = true;
      game.endReason = 'quietlegacy';
    }
  }
  if (!game.ended) game.endReason = 'timeout';

  for (const p of players) p.score = score(p);
  printFinalSummary(game, Date.now() - start);
}

main().catch((e) => {
  console.error('\nFatal error:', e);
  process.exit(1);
});
