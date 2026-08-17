'use strict';
// Player & game state factories, plus end-of-game scoring (GDD §12).
const { genConsDeck } = require('../lib/resolution');

function makePlayer(id, policy, cfg) {
  return {
    id, policy,
    cash: cfg.startCash, rep: 0, disrepute: 0,
    team: [],
    data: [],         // recorded findings awaiting a Historian's Publish → Reputation
    artefacts: [],    // plundered/doomed artefacts: Publish → rep, or Sell → cash (+disrepute)
    instability: 0,
    machine: { amp: cfg.startAmp, cap: cfg.startCap, col: cfg.startCol, stab: cfg.startStab },
    staged: null,
    retired: false,
    mwCommittedRound: null, // set by manyworlds.js when another player's MW attempt commits this player's team
    deepestEra: 0,
    // stats (for the report)
    expeditions: 0, overclocks: 0, shutdowns: 0, cashOuts: 0,
    papersWritten: 0, plunders: 0, sells: 0, retiredVeterans: 0,
    overclocksByEra: [0, 0, 0, 0, 0, 0, 0], // when in the game the gamble fires (0 Recent … 6 ManyWorlds)
    expeditionsByEra: [0, 0, 0, 0, 0, 0, 0], // expeditions per era → lets us split OC volume vs intensity
  };
}

function makeGame(players, loaded, cfg, rng) {
  const n = players.length;
  const pool = (n + 1) * cfg.integrityPerPlayerPlus1;
  return {
    cfg, rng, players,
    eraDecks: loaded.eraDecks.map(a => a.slice()),   // working decks (consumed at Plan)
    eraMaster: loaded.eraDecks.map(a => a.slice()),  // pristine copies to reshuffle from when one runs dry
    juniorPool: loaded.juniorPool,
    expertPool: loaded.expertPool,
    partingGifts: rng.shuffle(loaded.partingGifts.slice()),
    market: null,                    // built by economy.makeMarket in the engine
    integrity: pool, integrityMax: pool,
    consDeck: genConsDeck(cfg, rng),
    round: 0, ended: false, endReason: null, mwSuccess: false, unravelling: false,
    eraDryEvents: 0,                 // a Plan draw found an empty era deck (deck ran dry)
  };
}

// The Stabiliser's field (machine.stab) stores max-instability, not a level (starts at cfg.startStab,
// +2 per upgrade) — convert it to the same 1-based level scale as Amp/Cap/Col before comparing them.
// Shared by score() and any report that wants to display "top module level" (e.g. sim/llm's
// final-summary printout) so the two can't drift onto different numbers for the same player.
function topModuleLevel(player, cfg) {
  const stabLevel = (player.machine.stab - cfg.startStab) / 2 + 1;
  return Math.max(player.machine.amp, player.machine.cap, player.machine.col, stabLevel);
}

// SCORE = Reputation − Disrepute + highest module level + unresearched held work (1 each).
// GDD §12 has no floor on rep−disrepute — disrepute is meant to sting for real, not just to zero.
function score(player, cfg) {
  const unresearched = player.data.length + player.artefacts.length;
  return (player.rep - player.disrepute) + topModuleLevel(player, cfg) + unresearched;
}

module.exports = { makePlayer, makeGame, score, topModuleLevel };
