'use strict';
// Machine upgrades + the researcher market. Upgrade rules ported from the validated v1 model;
// recruitment is FINITE here (real 18 juniors / 9 experts), so the talent pool can run dry — a thing
// we want to observe, not assume away.
const { gainExp } = require('../lib/resolution');

// ── Machine upgrades ──────────────────────────────────────────────────────────
// Amplifier ladder gates (GDD §8: "Upgrading is a Develop action gated on WHO DOES THE WORK"):
// free→Modern (any home researcher); Modern→EM/Med needs the ACTING researcher to be an Engineer;
// Med→Anc/Pre needs the acting researcher to be an Engineer AND a Physicist also home that turn;
// Pre→MW needs both, both fully experienced. `home` is this turn's home roster (who's NOT away on
// the expedition) — owning a specialist who's off in the field does not satisfy the gate.
function tryAmpUpgrade(player, researcher, home, game) {
  const { cfg } = game, m = player.machine;
  if (m.amp >= 7) return false;
  const nextAmp = m.amp + 1;
  const isEngineer = researcher.profession === 'Engineer';
  const phyHome = home.some(r => r.profession === 'Physicist');
  const eng = player.team.find(r => r.profession === 'Engineer');
  const phy = player.team.find(r => r.profession === 'Physicist');
  const canAmp = nextAmp <= 2 ? true
               : nextAmp <= 4 ? isEngineer
               : nextAmp <= 6 ? isEngineer && phyHome
               : isEngineer && phyHome && !!eng && eng.expBoxes >= cfg.expMaxBoxes && !!phy && phy.expBoxes >= cfg.expMaxBoxes;
  const cost = cfg.ampCosts[m.amp - 1];
  if (!canAmp || cost == null || player.cash < cost) return false; // cost 0 (free 1→2) is valid
  player.cash -= cost; m.amp++; gainExp(researcher, cfg);
  return true;
}

// Is an Amplifier upgrade reachable THIS turn given who's home? (Used by the bench-and-climb bot
// tactic and to let a home Engineer prioritise climbing over housekeeping — doesn't commit to a
// specific acting researcher, just asks "is an Engineer [+ Physicist, deeper] home right now".)
function canUpgradeAmp(player, home, cfg) {
  const m = player.machine;
  if (m.amp >= 7) return false;
  const engHome = home.some((r) => r.profession === 'Engineer');
  const phyHome = home.some((r) => r.profession === 'Physicist');
  const eng = player.team.find((r) => r.profession === 'Engineer');
  const phy = player.team.find((r) => r.profession === 'Physicist');
  const nextAmp = m.amp + 1;
  const canAmp = nextAmp <= 2 ? true
               : nextAmp <= 4 ? engHome
               : nextAmp <= 6 ? engHome && phyHome
               : engHome && phyHome && !!eng && eng.expBoxes >= cfg.expMaxBoxes && !!phy && phy.expBoxes >= cfg.expMaxBoxes;
  const cost = cfg.ampCosts[m.amp - 1];
  return canAmp && cost != null && player.cash >= cost;
}

const stabIdx = (m, cfg) => (m.stab - cfg.startStab) / 2; // +2 max-instability per Stabiliser upgrade

// Profession-appropriate upgrade menu, tried in the policy's preferred order first, then the
// remaining options in their old fixed priority — so an LLM's pick that isn't affordable this turn
// still falls through instead of wasting the researcher's action (sim/game/policies.js's
// `chooseUpgrade` returns the old fixed order for the heuristic bots, i.e. unchanged behaviour there).
async function upgradeModule(player, researcher, home, game) {
  const { cfg } = game, m = player.machine;
  const buy = (key, costs, idx, step = 1) => {
    if (idx < 0 || idx >= costs.length) return false;
    const cost = costs[idx];
    if (cost == null || player.cash < cost) return false;
    player.cash -= cost; m[key] += step; gainExp(researcher, cfg);
    return true;
  };
  const order = researcher.profession === 'Physicist' ? ['cap', 'stab', 'amp']
              : researcher.profession === 'Engineer'  ? ['amp', 'col']
              : ['amp']; // Historian: only the free 1→2 tier will ever actually succeed
  const actions = {
    cap: () => buy('cap', cfg.capCosts, m.cap - 1),
    stab: () => buy('stab', cfg.stabCosts, stabIdx(m, cfg), 2),
    amp: () => tryAmpUpgrade(player, researcher, home, game),
    col: () => buy('col', cfg.colCosts, m.col - 1),
  };
  const preferred = await player.policy.chooseUpgrade(player, researcher, order, game);
  const tryOrder = preferred && order.includes(preferred) ? [preferred, ...order.filter((k) => k !== preferred)] : order;
  for (const key of tryOrder) {
    if (actions[key]()) return;
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

async function buyIfAffordable(player, game) {
  replenishMarket(game);
  const pick = await player.policy.buyResearcher(player, game.market.filter(Boolean), game.cfg);
  if (!pick) return;
  player.cash -= pick.cost;
  player.team.push(pick);
  const idx = game.market.indexOf(pick);
  if (idx >= 0) game.market.splice(idx, 1);
}

module.exports = { tryAmpUpgrade, upgradeModule, canUpgradeAmp, makeMarket, replenishMarket, buyIfAffordable };
