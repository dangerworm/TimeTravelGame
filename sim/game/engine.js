"use strict";
// The game loop: setup → rounds of turns → end-trigger → score. A turn follows the GDD §5 order
// (React/Negotiate are not bot-modelled): Jump → Process → Develop → Plan. Plan stages the NEXT turn.
const { loadDecks } = require("../lib/deck-loader");
const { makePlayer, makeGame, score } = require("./state");
const { makeMarket, buyIfAffordable } = require("./economy");
const { runJump, doHomeActions } = require("./actions");
const { resolveManyWorlds } = require("./manyworlds");
const { ALL } = require("./policies");

const SAFETY_MAX_ROUNDS = 40; // guards against a non-terminating game; quiet-legacy should fire first

function doTurn(player, game) {
  if (player.retired) return;
  if (player.policy.shouldRetire(player, game)) {
    player.retired = true;
    return;
  }

  const hasEngineer = player.team.some((r) => r.profession === "Engineer");
  const bricked =
    player.instability > 0 && !hasEngineer && player.machine.stab === game.cfg.startStab;

  if (bricked) {
    player.instability = 0; // early-game safety valve: a minimal turn vents it all
  } else if (player.staged && player.team.length) {
    if (player.staged.isMW) {
      resolveManyWorlds(player, player.staged, game);
      player.staged = null;
      if (game.ended) return;
    } else {
      const { home } = runJump(player, game);
      player.staged = null;
      doHomeActions(player, home, game);
    }
  } else {
    doHomeActions(player, player.team, game); // no jump staged → whole team develops
  }
  if (game.ended) return;

  // Collapse: Integrity 0 lights a one-round "Unravelling" fuse, then the timeline comes apart (GDD §11).
  if (game.integrity <= 0) {
    if (game.unravelRound === null) game.unravelRound = game.round;
    else if (game.round > game.unravelRound) {
      game.ended = true;
      game.endReason = "collapse";
      return;
    }
  }

  buyIfAffordable(player, game);
  planStage(player, game);
}

// Plan: draw era cards up to the Collimator and stage the next jump. Amp 7 stages a Many Worlds card.
function planStage(player, game) {
  const drawFrom = (e) => {
    if (!game.eraDecks[e].length) {
      game.eraDecks[e] = game.rng.shuffle(game.eraMaster[e].slice());
      game.eraDryEvents++;
    }
    return game.eraDecks[e].length ? game.eraDecks[e].pop() : null;
  };

  if (player.machine.amp >= 7) {
    player.staged = drawFrom(6);
    return;
  }

  const maxEraIdx = player.machine.amp - 1;
  const drawn = [];
  for (let i = 0; i < player.machine.col; i++) {
    const card = drawFrom(player.policy.pickEraIdx(player, maxEraIdx, game));
    if (card) drawn.push(card);
  }
  player.staged = drawn.length ? player.policy.pickCard(player, drawn) : null;
}

function playGame(numPlayers, policyNames, cfg, rng, opts = {}) {
  const loaded = loadDecks(rng, opts);
  const players = Array.from({ length: numPlayers }, (_, i) =>
    makePlayer(i, ALL[policyNames[i % policyNames.length]], cfg)
  );
  const game = makeGame(players, loaded, cfg, rng);
  game.findMult = opts.findMult || 1; // balance dial: scales en-route Cash income (find/spoil/sell)
  game.renewableMarket = !!opts.renewableMarket; // market refills from the pool instead of running dry
  makeMarket(game);

  for (const p of players) {
    buyIfAffordable(p, game);
    planStage(p, game);
  }

  while (!game.ended && game.round < SAFETY_MAX_ROUNDS) {
    game.round++;
    for (const p of players) {
      if (game.ended) break;
      doTurn(p, game);
    }
    if (!game.ended && players.every((p) => p.retired)) {
      game.ended = true;
      game.endReason = "quietlegacy";
    }
  }
  if (!game.ended) game.endReason = "timeout";

  for (const p of players) p.score = score(p);
  return game;
}

module.exports = { playGame };
