'use strict';
// The Jump→Process and Develop phases (GDD §6–§9): resolve the expedition, route rewards through the
// Data/Artefact zones (deferred Publishing), and run each home researcher's single Develop action.
const { resolveSteps, drawCons, applyCons, gainExp } = require('../lib/resolution');
const { upgradeModule, canUpgradeAmp } = require('./economy');

// ── Jump + Process ────────────────────────────────────────────────────────────
async function runJump(player, game) {
  const card = player.staged;
  const roster = await player.policy.selectRoster(player, card, game);
  // An explicit empty roster is "Skip the Jump" (GDD §6 path 2) — stay home, no expedition at all,
  // rather than running the ladder with a bare 2/2/2 hand and getting deepest-era credit for nothing.
  if (!roster.length) return { skipped: true, home: player.team };
  const home = player.team.filter(r => !roster.includes(r));

  const outcome = await resolveSteps(player, card, roster, player.policy, game);
  await processRewards(player, card, outcome, roster, game);

  // GDD §6: any turn with ≥1 overclock draws ONE consequence; a shutdown draws an EXTRA on top of
  // that (resolveSteps already drew the "extra" for the shutdown itself) — so this base draw fires
  // on every overclocked turn regardless of shutdown, giving shutdown 2 total and a clean overclocked
  // run 1, matching the doc instead of inverting the risk gradient.
  if (outcome.overclocks > 0) applyCons(drawCons(game), player, game, card.eraIdx);
  player.deepestEra = Math.max(player.deepestEra, card.eraIdx);
  return { outcome, home };
}

// Award rewards for every cleared step: en-route find (Sell XOR Publish), early-relief spoils (Cash),
// and — only if every step cleared — the objective (Record→Data zone / Plunder→Artefacts zone).
async function processRewards(player, card, outcome, roster, game) {
  for (let i = 0; i < outcome.cleared; i++) {
    const st = card.steps[i];
    if (st.type === 'objective') await claimObjective(player, card, roster, game);
    else if (i === card.findStepIndex) await collectFind(player, card, roster, game);
    else if (st.cash > 0) player.cash += Math.round(st.cash * (game.findMult || 1)); // early-relief spoil
  }
}

async function collectFind(player, card, roster, game) {
  const f = card.find;
  if (!f) return;
  if (await player.policy.publishFind(player, card, game)) {
    player.rep += f.publishRep;                              // Publish → minor paper (Reputation)
    player.papersWritten++;
    grantWriterExp(roster, game);                           // the desk write-up earns experience
  } else {
    player.cash += Math.round(f.cash * (game.findMult || 1)); // Sell → Cash
  }
}

// Objective claim — only reached when the whole ladder cleared (the objective is the last step).
async function claimObjective(player, card, roster, game) {
  const o = card.objective;
  if (o.mode === 'record-only') { player.data.push({ rep: o.rep, name: card.name }); return; }

  // Doomed artefacts (GDD §7) are grabbed clean — there is no record option, so this isn't a policy
  // decision at all; asking the model here would burn a round-trip on an answer that's discarded.
  if (o.mode === 'doomed-grab') {
    player.plunders++;
    player.artefacts.push({ rep: o.rep, sellCash: o.sellCash, disrepute: o.disrepute, isDoomed: true, name: card.name });
    return;
  }

  const take = await player.policy.recordOrPlunder(player, card, game); // 'record' | 'plunder'
  if (take === 'record') {
    player.data.push({ rep: o.rep, name: card.name });            // copy/measure → clean
  } else {
    game.integrity = Math.max(0, game.integrity - o.scar);        // non-doomed take scars history
    player.plunders++;
    player.artefacts.push({ rep: o.rep, sellCash: o.sellCash, disrepute: o.disrepute, isDoomed: false, name: card.name });
  }
}

const grantWriterExp = (roster, game) => {
  const writer = roster.find(r => r.profession === 'Historian') || roster[0];
  if (writer) gainExp(writer, game.cfg);
};

// ── Develop (home actions): one action per researcher not in the field ──────────
async function doHomeActions(player, home, game) {
  for (const r of home) {
    if (r.profession === 'Engineer') await engineerHome(player, r, home, game);
    else if (r.profession === 'Physicist') await upgradeModule(player, r, home, game);
    else await historianHome(player, r, home, game);
  }
}

async function engineerHome(player, r, home, game) {
  const { cfg } = game;
  // Climb the Amp ladder when it's available — progression beats housekeeping (the bench-and-climb
  // intent). Otherwise clear instability, then fall back to other upgrades.
  if (canUpgradeAmp(player, home, cfg)) {
    await upgradeModule(player, r, home, game); // Engineer → tries the Amp upgrade first
  } else if (player.instability > 0) {
    const clr = Math.min((r.pips.C || 0) + r.expBoxes * cfg.expBonus, player.instability);
    player.instability = Math.max(0, player.instability - clr); // clearing does NOT grant experience (GDD §9)
  } else {
    await upgradeModule(player, r, home, game);
  }
}

// Picks which held artefact to act on: highest reputation first (a policy choosing to publish wants
// its best one; one choosing to sell wants the same one it'd otherwise have published) rather than
// FIFO, which just reflected pickup order and could leave a strong artefact stranded indefinitely.
const bestArtefact = (artefacts) => artefacts.reduce((a, b) => (b.rep >= a.rep ? b : a));

async function historianHome(player, r, home, game) {
  const { cfg } = game;
  if (player.data.length) {                                   // publish a recorded finding → clean Reputation
    player.rep += player.data.shift().rep; player.papersWritten++; gainExp(r, cfg); return;
  }
  if (player.artefacts.length) {                              // publish (rep) XOR sell (cash + disrepute)
    const a = bestArtefact(player.artefacts);
    player.artefacts.splice(player.artefacts.indexOf(a), 1);
    const choice = await player.policy.sellOrPublishArtefact(player, a, game); // 'sell' | 'publish'
    if (choice === 'sell') { player.cash += Math.round(a.sellCash * (game.findMult || 1)); player.disrepute += a.disrepute; player.sells++; }
    else { player.rep += a.rep; player.papersWritten++; }
    gainExp(r, cfg); return;
  }
  await upgradeModule(player, r, home, game);                 // nothing to publish → push progression
}

module.exports = { runJump, doHomeActions };
