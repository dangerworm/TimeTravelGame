'use strict';
// The Many Worlds endgame — the open-alliance rule Drew resolved on 11 Jun (supersedes GDD §14).
// The host (a player at Amp 7) opens the door; every player commits their whole team for the final
// push (Capacity ignored). Only the HOST's machine traces pollute the combined deck. Success pays a
// co-author Reputation credit by contribution (+1 per committed researcher per owner, capped at +6);
// failure tears the timeline in proportion to how rattled the host's machine was: −2×(instability+1).
const { resolveSteps } = require('../lib/resolution');

const CO_AUTHOR_CAP = 6;

async function resolveManyWorlds(host, card, game) {
  const committed = []; // { r, owner }
  for (const p of game.players) {
    if (p.retired) continue;
    for (const r of p.team) committed.push({ r, owner: p });
  }
  const roster = committed.map(c => c.r);
  if (!roster.length) return { success: false };

  // Host opens the door: buildBag uses host.instability for traces (host-only) and the host's base.
  const outcome = await resolveSteps(host, card, roster, host.policy, game);

  if (outcome.success) {
    const byOwner = new Map();
    for (const c of committed) byOwner.set(c.owner, (byOwner.get(c.owner) || 0) + 1);
    for (const [owner, n] of byOwner) owner.rep += Math.min(CO_AUTHOR_CAP, n);
    game.ended = true; game.mwSuccess = true; game.endReason = 'triumph';
  } else {
    game.integrity = Math.max(0, game.integrity - 2 * (host.instability + 1));
  }
  return outcome;
}

module.exports = { resolveManyWorlds };
