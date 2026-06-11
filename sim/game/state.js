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
    round: 0, ended: false, endReason: null, mwSuccess: false, unravelRound: null,
    eraDryEvents: 0,                 // a Plan draw found an empty era deck (deck ran dry)
  };
}

// SCORE = Reputation − Disrepute + highest module level + unresearched held work (1 each).
function score(player) {
  const topModule    = Math.max(player.machine.amp, player.machine.cap, player.machine.col, player.machine.stab);
  const unresearched = player.data.length + player.artefacts.length;
  return Math.max(0, player.rep - player.disrepute) + topModule + unresearched;
}

module.exports = { makePlayer, makeGame, score };
