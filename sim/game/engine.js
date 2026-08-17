"use strict";
// The game loop: setup → rounds of turns → end-trigger → score. A turn follows the GDD §5 order
// (React/Negotiate are not bot-modelled): Jump → Process → Develop → Plan. Plan stages the NEXT turn.
const { loadDecks } = require("../lib/deck-loader");
const { makePlayer, makeGame, score } = require("./state");
const { makeMarket, buyIfAffordable } = require("./economy");
const { runJump, doHomeActions } = require("./actions");
const { resolveManyWorlds } = require("./manyworlds");
const { ALL } = require("./policies");

const SAFETY_MAX_ROUNDS = 40; // hard backstop if cfg.maxRounds is absent; quiet-legacy should fire first

// Every function below that can reach a policy decision is async, awaited all the way up to
// playGame — a no-op tick for the sync heuristic bots (policies.js), but what lets an LLM policy
// (sim/llm/llm-policy.js) make a real network round-trip to Ollama at each decision point.
async function doTurn(player, game) {
  if (player.retired) return;
  if (await player.policy.shouldRetire(player, game)) {
    player.retired = true;
    return;
  }

  // Many Worlds just committed this player's WHOLE team to another player's attempt this round
  // (GDD §9: "their owner can't use them at home that turn") — nothing left to jump or develop with.
  if (player.mwCommittedRound === game.round) {
    await buyIfAffordable(player, game);
    await planStage(player, game);
    return;
  }

  const hasEngineer = player.team.some((r) => r.profession === "Engineer");
  const ventEligible =
    player.instability > 0 && !hasEngineer && player.machine.stab === game.cfg.startStab;
  // GDD §6: this is a "may", not a "must" — and it's "a minimal turn... as their Develop action", not
  // a tax that also swallows the rest of the team's Develop (GDD's "Skip the Jump" path 2 doesn't lose
  // Develop either). So: vent replaces the JUMP for this turn only; the whole team still develops.
  const vent = ventEligible && (await player.policy.shouldVent(player, game));

  if (vent) {
    player.instability = 0;
    await doHomeActions(player, player.team, game);
  } else if (player.staged && player.team.length) {
    if (player.staged.isMW) {
      await resolveManyWorlds(player, player.staged, game);
      player.staged = null;
      if (game.ended) return;
    } else {
      const { home, skipped } = await runJump(player, game);
      player.staged = null;
      // An explicit empty-roster "skip the jump" still develops with the whole team (GDD §6 path 2).
      await doHomeActions(player, skipped ? player.team : home, game);
    }
  } else {
    await doHomeActions(player, player.team, game); // no jump staged → whole team develops
  }
  if (game.ended) return;

  await buyIfAffordable(player, game);
  await planStage(player, game);
}

// Plan: draw era cards up to the Collimator and stage the next jump. At Amp 7 the player DECLARES
// (or holds back) a Many Worlds attempt — GDD §14's "vent first, or push now?" — rather than being
// auto-staged into a forced, repeated attempt on whatever instability the machine happens to carry.
async function planStage(player, game) {
  const drawFrom = (e) => {
    if (!game.eraDecks[e].length) {
      game.eraDecks[e] = game.rng.shuffle(game.eraMaster[e].slice());
      game.eraDryEvents++;
    }
    return game.eraDecks[e].length ? game.eraDecks[e].pop() : null;
  };

  if (player.machine.amp >= 7) {
    if (await player.policy.declareManyWorlds(player, game)) {
      player.staged = drawFrom(6);
      return;
    }
    // Holding back: draw normal era cards, capped at the deepest non-MW tier (era 6 is MW-only).
  }

  const maxEraIdx = Math.min(player.machine.amp - 1, 5);
  const drawn = [];
  for (let i = 0; i < player.machine.col; i++) {
    const card = drawFrom(await player.policy.pickEraIdx(player, maxEraIdx, game));
    if (card) drawn.push(card);
  }
  player.staged = drawn.length ? await player.policy.pickCard(player, drawn) : null;
}

async function playGame(numPlayers, policyNames, cfg, rng, opts = {}) {
  const hooks = opts.hooks || {};
  const loaded = loadDecks(rng, opts);
  const players = Array.from({ length: numPlayers }, (_, i) =>
    makePlayer(i, ALL[policyNames[i % policyNames.length]], cfg)
  );
  const game = makeGame(players, loaded, cfg, rng);
  game.findMult = opts.findMult || 1; // balance dial: scales en-route Cash income (find/spoil/sell)
  game.renewableMarket = !!opts.renewableMarket; // market refills from the pool instead of running dry
  makeMarket(game);

  for (const p of players) {
    await buyIfAffordable(p, game);
    await planStage(p, game);
  }

  const maxRounds = cfg.maxRounds || SAFETY_MAX_ROUNDS;
  while (!game.ended && game.round < maxRounds) {
    game.round++;
    if (hooks.onRoundStart) await hooks.onRoundStart(game);
    for (const p of players) {
      if (game.ended) break;
      if (p.retired) continue;
      if (hooks.onTurnStart) await hooks.onTurnStart(p, game);
      await doTurn(p, game);
      if (hooks.onTurnEnd) await hooks.onTurnEnd(p, game);
    }
    if (game.ended) break;
    if (players.every((p) => p.retired)) {
      game.ended = true;
      game.endReason = "quietlegacy";
      break;
    }
    // Collapse: Integrity 0 lights a one-round "Unravelling" fuse (GDD §11). Checked once per
    // completed round (not mid-turn per player): the round in which Integrity hits 0 finishes
    // normally, then exactly one further full round is played before the timeline comes apart. Seats
    // that acted before the trigger within the triggering round get one more turn after it; seats
    // that hadn't gone yet get two (their remainder of the triggering round, plus the extra round) —
    // no seat is ever denied a turn once Integrity hits 0, which is the harm this fixes, but it's
    // "finish the round, then play one more," not a literal one-turn-each guarantee.
    if (game.integrity <= 0) {
      if (!game.unravelling) game.unravelling = true;
      else {
        game.ended = true;
        game.endReason = "collapse";
      }
    }
  }
  if (!game.ended) game.endReason = "timeout";

  for (const p of players) p.score = score(p, cfg);
  return game;
}

module.exports = { playGame, doTurn, planStage, SAFETY_MAX_ROUNDS };
