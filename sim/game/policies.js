'use strict';
// Bot archetypes. The three validated risk profiles (greedy / cautious / balanced) ported from the v1
// model, extended with the decisions the full game adds: publish-vs-sell the find, record-vs-plunder
// the objective, and when to retire (the quiet-legacy trigger). Deliberately simple — good enough to
// represent everything that CAN happen; fine tuning comes after first results.
const { totalPips } = require('../lib/resolution');
const { PROF } = require('./config');
const { canUpgradeAmp } = require('./economy');

// Send the strongest roster up to a cap, prioritising professions the card's locks require.
function selectRosterDefault(player, card, maxSend) {
  if (!player.team.length) return [];
  const needed = new Set(card.steps.filter(s => s.profLock).map(s => s.profLock));
  return [...player.team]
    .sort((a, b) => (needed.has(b.profession) ? 10 : 0) - (needed.has(a.profession) ? 10 : 0)
                 || totalPips(b, 1) - totalPips(a, 1))
    .slice(0, Math.min(maxSend, player.team.length));
}

// Shared record-vs-plunder body; each archetype sets its own appetite for considering a plunder.
function decideRecordOrPlunder(player, card, game, considers) {
  const o = card.objective;
  const integFrac = game.integrity / Math.max(1, game.integrityMax);
  const willConsider = considers === 'always' ? true
                     : considers === 'healthy' ? (o.isDoomed || integFrac >= 0.6)
                     : o.isDoomed; // 'doomed-only'
  if (!willConsider) return 'record';
  const others = game.players.filter(p => p !== player);
  const avg = sel => others.reduce((s, p) => s + p[sel], 0) / Math.max(1, others.length);
  if (player.rep  < avg('rep'))  return 'record';   // behind on rep → bank clean reputation
  if (player.cash < avg('cash')) return 'plunder';  // behind on cash → take it and sell
  return 'record';
}

// Shared artefact sell-vs-publish body (identical across archetypes — matches the pre-M2 hardcoded
// behaviour in game/actions.js verbatim): sell when behind the table average on Cash, else publish.
function defaultSellOrPublish(player, artefact, game) {
  const others = game.players.filter((p) => p !== player);
  const avgCash = others.reduce((s, p) => s + p.cash, 0) / Math.max(1, others.length);
  return player.cash < avgCash ? 'sell' : 'publish';
}

// Retire (the quiet-legacy trigger) when the multiverse is out of reach and there's nothing left to
// do — or, late enough, give up the Many Worlds dream outright so games actually terminate.
function stalledRetire(player, game) {
  if (player.machine.amp >= 7) return false;              // still chasing the door — don't quit
  if (game.round >= 30) return true;                      // late give-up: bank the earthbound career
  if (game.round < 20) return false;
  const nextAmpCost = game.cfg.ampCosts[player.machine.amp - 1];
  const canProgress = nextAmpCost != null && player.cash >= nextAmpCost;
  const pending = player.data.length || player.artefacts.length;
  return !canProgress && !pending;
}

// Prefer professions we lack (always worth buying — coverage gates the Amp ladder); once all three
// are covered, only deepen the bench up to Capacity+1 so nobody hoards the finite market dry.
function buyMissingProfession(player, market, minCash, buffer = 0) {
  const avail = market.filter(r => player.cash >= r.cost + buffer);
  if (!avail.length || (minCash != null && player.cash < minCash)) return null;
  const have = new Set(player.team.map(r => r.profession));
  const missing = PROF.filter(p => !have.has(p));
  const benchFull = player.team.length >= player.machine.cap + 1;
  if (missing.length) return avail.find(r => missing.includes(r.profession)) || (benchFull ? null : avail[0]);
  return benchFull ? null : avail[0];
}

// ── Bench-and-climb (Drew, 11 Jun): keep a specialist HOME to make the next machine upgrade, and
// send a reduced roster to an easier era so it still clears. This is what actually drives gradual
// Amp progression — without it, bots send everyone and never free up a Develop action to upgrade.
function upgradeBench(player, cfg) {
  // Planning-time approximation: we're deciding WHO to bench, so the true "home" set doesn't exist
  // yet (it's what this very function determines) — check against the whole team as a hint. The real
  // gate (economy.js's canUpgradeAmp/tryAmpUpgrade) is enforced for real at Develop time regardless.
  if (canUpgradeAmp(player, player.team, cfg)) {
    const eng = player.team.find(r => r.profession === 'Engineer');
    if (eng) return [eng];                                  // engineer home → climbs the Amp ladder
    const weakest = [...player.team].sort((a, b) => totalPips(a, 1) - totalPips(b, 1))[0];
    return weakest ? [weakest] : [];                        // free 1→2 needs no engineer — bench the weakest
  }
  const m = player.machine, phy = player.team.find(r => r.profession === 'Physicist');
  if (phy && m.cap - 1 < cfg.capCosts.length && player.cash >= (cfg.capCosts[m.cap - 1] ?? Infinity)) return [phy];
  return [];
}

// Send up to maxSend of the team, excluding the benched specialists, prioritising needed professions.
function selectRosterExcluding(player, card, maxSend, bench) {
  const benched = new Set(bench);
  const avail = player.team.filter(r => !benched.has(r));
  if (!avail.length) return [];
  const needed = new Set(card.steps.filter(s => s.profLock).map(s => s.profLock));
  return avail
    .sort((a, b) => (needed.has(b.profession) ? 10 : 0) - (needed.has(a.profession) ? 10 : 0) || totalPips(b, 1) - totalPips(a, 1))
    .slice(0, Math.min(maxSend, avail.length));
}

// While benching a specialist to upgrade, attempt an easier era so the reduced roster still clears.
const easyEra = (player, maxEraIdx, game) => (upgradeBench(player, game.cfg).length ? Math.max(0, maxEraIdx - 1) : maxEraIdx);

const greedy = {
  name: 'greedy',
  selectRoster(player, card, game) {
    if (card.isMW) return selectRosterDefault(player, card, player.team.length);
    return selectRosterExcluding(player, card, player.machine.cap, upgradeBench(player, game.cfg));
  },
  shouldOverclock(player, shortfall, si, card) {
    if (si === card.steps.length - 1 && shortfall <= 3) return true;     // gamble the headline prize
    return player.instability + 1 < player.machine.stab;                 // else stop short of a shutdown
  },
  recordOrPlunder(player, card, game) { return decideRecordOrPlunder(player, card, game, 'always'); },
  publishFind() { return false; },                    // sell the find — greedy wants Cash to upgrade
  pickEraIdx(player, maxEraIdx, game) { return easyEra(player, maxEraIdx, game); },
  pickCard(player, drawn) { return drawn.reduce((a, b) => (a.eraIdx >= b.eraIdx ? a : b)); },
  buyResearcher(player, market) {
    if (player.team.length < 2) { const a = market.filter(r => player.cash >= r.cost); return a[0] || null; }
    return buyMissingProfession(player, market, null, 0);
  },
  shouldRetire: stalledRetire,
  chooseUpgrade(player, researcher, order) { return order[0]; },  // unchanged fixed priority
  sellOrPublishArtefact: defaultSellOrPublish,
  shouldVent() { return true; },                       // free instability relief — always worth it
  declareManyWorlds() { return true; },                // push now, every time — matches the archetype
};

const cautious = {
  name: 'cautious',
  selectRoster(player, card, game) {
    if (card.isMW) return selectRosterDefault(player, card, player.team.length);
    return selectRosterExcluding(player, card, 1, upgradeBench(player, game.cfg));
  },
  shouldOverclock() { return false; },                // never gambles
  recordOrPlunder(player, card, game) { return decideRecordOrPlunder(player, card, game, 'doomed-only'); },
  publishFind() { return true; },                     // always bank the clean minor paper
  pickEraIdx(player, maxEraIdx, game) { return easyEra(player, maxEraIdx, game); },
  pickCard(player, drawn) { return drawn.reduce((a, b) => (a.eraIdx <= b.eraIdx ? a : b)); },
  buyResearcher(player, market) {
    if (player.team.length < 2) { const a = market.filter(r => player.cash >= r.cost); return a[0] || null; }
    return buyMissingProfession(player, market, 6, 3);
  },
  shouldRetire: stalledRetire,
  chooseUpgrade(player, researcher, order) { return order[0]; },
  sellOrPublishArtefact: defaultSellOrPublish,
  shouldVent() { return true; },
  declareManyWorlds(player) { return player.instability === 0; },  // vent first — never push a rattled machine
};

const balanced = {
  name: 'balanced',
  selectRoster(player, card, game) {
    if (card.isMW) return selectRosterDefault(player, card, player.team.length);
    return selectRosterExcluding(player, card, Math.max(1, Math.ceil(player.machine.cap * 0.75)), upgradeBench(player, game.cfg));
  },
  shouldOverclock(player, shortfall, si, card) {
    if (si === card.steps.length - 1 && shortfall <= 1) return true;     // gamble the prize only when 1 short
    if (player.instability + 1 >= player.machine.stab) return false;
    return shortfall <= 1 && player.instability + 1 < player.machine.stab - 1;
  },
  recordOrPlunder(player, card, game) { return decideRecordOrPlunder(player, card, game, 'healthy'); },
  publishFind(player) { return player.cash >= 5; },   // publish when comfortable, else sell
  pickEraIdx(player, maxEraIdx, game) { return easyEra(player, maxEraIdx, game); },
  pickCard(player, drawn) {
    const val = c => (c.objective.rep || 0) * 2 + (c.find ? c.find.cash : 0);
    return drawn.reduce((a, b) => (val(a) >= val(b) ? a : b));
  },
  buyResearcher(player, market) {
    if (player.team.length < 2) { const a = market.filter(r => player.cash >= r.cost); return a[0] || null; }
    return buyMissingProfession(player, market, 4, 0);
  },
  shouldRetire: stalledRetire,
  chooseUpgrade(player, researcher, order) { return order[0]; },
  sellOrPublishArtefact: defaultSellOrPublish,
  shouldVent() { return true; },
  declareManyWorlds(player) { return player.instability <= 1; },  // push when only lightly rattled
};

const ALL = { greedy, cautious, balanced };
module.exports = { ALL, selectRosterDefault };
