'use strict';
// The Jump→Process and Develop phases (GDD §6–§9): resolve the expedition, route rewards through the
// Data/Artefact zones (deferred Publishing), and run each home researcher's single Develop action.
const { resolveSteps, drawCons, applyCons, gainExp } = require('../lib/resolution');
const { upgradeModule, canUpgradeAmp } = require('./economy');

// ── Jump + Process ────────────────────────────────────────────────────────────
function runJump(player, game) {
  const card = player.staged;
  const roster = player.policy.selectRoster(player, card, game);
  const home = player.team.filter(r => !roster.includes(r));

  const outcome = resolveSteps(player, card, roster, player.policy, game);
  processRewards(player, card, outcome, roster, game);

  // A turn with ≥1 overclock draws a consequence (a shutdown already drew its extra inside resolveSteps).
  if (outcome.overclocks > 0 && !outcome.shutdown) applyCons(drawCons(game), player, game, card.eraIdx);
  player.deepestEra = Math.max(player.deepestEra, card.eraIdx);
  return { outcome, home };
}

// Award rewards for every cleared step: en-route find (Sell XOR Publish), early-relief spoils (Cash),
// and — only if every step cleared — the objective (Record→Data zone / Plunder→Artefacts zone).
function processRewards(player, card, outcome, roster, game) {
  for (let i = 0; i < outcome.cleared; i++) {
    const st = card.steps[i];
    if (st.type === 'objective') claimObjective(player, card, roster, game);
    else if (i === card.findStepIndex) collectFind(player, card, roster, game);
    else if (st.cash > 0) player.cash += Math.round(st.cash * (game.findMult || 1)); // early-relief spoil
  }
}

function collectFind(player, card, roster, game) {
  const f = card.find;
  if (!f) return;
  if (player.policy.publishFind(player, card, game)) {
    player.rep += f.publishRep;                              // Publish → minor paper (Reputation)
    player.papersWritten++;
    grantWriterExp(roster, game);                           // the desk write-up earns experience
  } else {
    player.cash += Math.round(f.cash * (game.findMult || 1)); // Sell → Cash
  }
}

// Objective claim — only reached when the whole ladder cleared (the objective is the last step).
function claimObjective(player, card, roster, game) {
  const o = card.objective;
  if (o.mode === 'record-only') { player.data.push({ rep: o.rep, name: card.name }); return; }

  const take = player.policy.recordOrPlunder(player, card, game); // 'record' | 'plunder'
  if (take === 'record' && o.mode !== 'doomed-grab') {
    player.data.push({ rep: o.rep, name: card.name });            // copy/measure → clean
  } else {
    if (!o.isDoomed) game.integrity = Math.max(0, game.integrity - o.scar); // non-doomed take scars history
    player.plunders++;
    player.artefacts.push({ rep: o.rep, sellCash: o.sellCash, disrepute: o.disrepute, isDoomed: o.isDoomed, name: card.name });
  }
}

const grantWriterExp = (roster, game) => {
  const writer = roster.find(r => r.profession === 'Historian') || roster[0];
  if (writer) gainExp(writer, game.cfg);
};

// ── Develop (home actions): one action per researcher not in the field ──────────
function doHomeActions(player, home, game) {
  for (const r of home) {
    if (r.profession === 'Engineer') engineerHome(player, r, game);
    else if (r.profession === 'Physicist') upgradeModule(player, r, game);
    else historianHome(player, r, game);
  }
}

function engineerHome(player, r, game) {
  const { cfg } = game;
  // Climb the Amp ladder when it's available — progression beats housekeeping (the bench-and-climb
  // intent). Otherwise clear instability, then fall back to other upgrades.
  if (canUpgradeAmp(player, cfg)) {
    upgradeModule(player, r, game); // Engineer → tries the Amp upgrade first
  } else if (player.instability > 0) {
    const clr = Math.min((r.pips.C || 0) + r.expBoxes * cfg.expBonus, player.instability);
    player.instability = Math.max(0, player.instability - clr); // clearing does NOT grant experience (GDD §9)
  } else {
    upgradeModule(player, r, game);
  }
}

function historianHome(player, r, game) {
  const { cfg } = game;
  if (player.data.length) {                                   // publish a recorded finding → clean Reputation
    player.rep += player.data.shift().rep; player.papersWritten++; gainExp(r, cfg); return;
  }
  if (player.artefacts.length) {                              // publish (rep) XOR sell (cash + disrepute)
    const a = player.artefacts.shift();
    const others = game.players.filter(p => p !== player);
    const avgCash = others.reduce((s, p) => s + p.cash, 0) / Math.max(1, others.length);
    if (player.cash < avgCash) { player.cash += Math.round(a.sellCash * (game.findMult || 1)); player.disrepute += a.disrepute; player.sells++; }
    else { player.rep += a.rep; player.papersWritten++; }
    gainExp(r, cfg); return;
  }
  upgradeModule(player, r, game);                             // nothing to publish → push progression
}

module.exports = { runJump, doHomeActions };
