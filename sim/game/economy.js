'use strict';
// Machine upgrades + the researcher market. Upgrade rules ported from the validated v1 model;
// recruitment is FINITE here (real 18 juniors / 9 experts), so the talent pool can run dry — a thing
// we want to observe, not assume away.
const { gainExp } = require('../lib/resolution');

// ── Machine upgrades ──────────────────────────────────────────────────────────
// Amplifier ladder gates (GDD §8): free→Modern; Engineer→EM/Med; +Physicist→Anc/Pre; both maxed→MW.
function tryAmpUpgrade(player, researcher, game) {
  const { cfg } = game, m = player.machine;
  if (m.amp >= 7) return false;
  const nextAmp = m.amp + 1;
  const eng = player.team.find(r => r.profession === 'Engineer');
  const phy = player.team.find(r => r.profession === 'Physicist');
  const canAmp = nextAmp <= 2 ? true
               : nextAmp <= 4 ? !!eng
               : nextAmp <= 6 ? !!eng && !!phy
               : !!eng && !!phy && eng.expBoxes >= cfg.expMaxBoxes && phy.expBoxes >= cfg.expMaxBoxes;
  const cost = cfg.ampCosts[m.amp - 1];
  if (!canAmp || cost == null || player.cash < cost) return false; // cost 0 (free 1→2) is valid
  player.cash -= cost; m.amp++; gainExp(researcher, cfg);
  return true;
}

// Is an Amplifier upgrade legal + affordable right now? (Used by the bench-and-climb bot tactic and to
// let a home Engineer prioritise climbing over housekeeping.)
function canUpgradeAmp(player, cfg) {
  const m = player.machine;
  if (m.amp >= 7) return false;
  const eng = player.team.find((r) => r.profession === 'Engineer');
  const phy = player.team.find((r) => r.profession === 'Physicist');
  const nextAmp = m.amp + 1;
  const canAmp = nextAmp <= 2 ? true
               : nextAmp <= 4 ? !!eng
               : nextAmp <= 6 ? !!eng && !!phy
               : !!eng && !!phy && eng.expBoxes >= cfg.expMaxBoxes && phy.expBoxes >= cfg.expMaxBoxes;
  const cost = cfg.ampCosts[m.amp - 1];
  return canAmp && cost != null && player.cash >= cost;
}

// Profession-aware upgrade priority: Physicist → Cap, Stab, (Amp); Engineer → Amp, Col; Historian → Amp.
function upgradeModule(player, researcher, game) {
  const { cfg } = game, m = player.machine;
  const buy = (key, costs, idx, step = 1) => {
    if (idx < 0 || idx >= costs.length) return false;
    const cost = costs[idx];
    if (cost == null || player.cash < cost) return false;
    player.cash -= cost; m[key] += step; gainExp(researcher, cfg);
    return true;
  };
  if (researcher.profession === 'Physicist') {
    if (buy('cap', cfg.capCosts, m.cap - 1)) return;
    if (buy('stab', cfg.stabCosts, (m.stab - 2) / 2, 2)) return; // +2 max-instability per upgrade
    tryAmpUpgrade(player, researcher, game);
  } else if (researcher.profession === 'Engineer') {
    if (tryAmpUpgrade(player, researcher, game)) return;
    buy('col', cfg.colCosts, m.col - 1);
  } else {
    tryAmpUpgrade(player, researcher, game); // Historian
  }
}

// ── Market (finite real pools) ──────────────────────────────────────────────────
const JUNIOR_SLOTS = 6, EXPERT_SLOTS = 3;

function makeMarket(game) {
  game.juniorDraw = game.rng.shuffle(game.juniorPool.map(r => ({ ...r, pips: { ...r.pips } })));
  game.expertDraw = game.rng.shuffle(game.expertPool.map(r => ({ ...r, pips: { ...r.pips } })));
  game.market = [];
  replenishMarket(game);
  return game.market;
}

function replenishMarket(game) {
  const m = game.market;
  // Renewable pool: when a draw pile empties, reshuffle fresh clones of the whole pool (always more
  // grad students — the named cards are flavour, not a hard supply cap). Otherwise it's finite.
  const fill = (senior, slots, pool, key) => {
    while (m.filter(r => r.isSenior === senior).length < slots) {
      if (!game[key].length && game.renewableMarket) game[key] = game.rng.shuffle(pool.map(r => ({ ...r, pips: { ...r.pips } })));
      if (!game[key].length) break;
      m.push(game[key].pop());
    }
  };
  fill(false, JUNIOR_SLOTS, game.juniorPool, 'juniorDraw');
  fill(true, EXPERT_SLOTS, game.expertPool, 'expertDraw');
}

function buyIfAffordable(player, game) {
  replenishMarket(game);
  const pick = player.policy.buyResearcher(player, game.market.filter(Boolean), game.cfg);
  if (!pick) return;
  player.cash -= pick.cost;
  player.team.push(pick);
  const idx = game.market.indexOf(pick);
  if (idx >= 0) game.market.splice(idx, 1);
}

module.exports = { tryAmpUpgrade, upgradeModule, canUpgradeAmp, makeMarket, replenishMarket, buyIfAffordable };
