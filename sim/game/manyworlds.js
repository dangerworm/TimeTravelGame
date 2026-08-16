'use strict';
// The Many Worlds endgame — the open-alliance rule Drew resolved on 11 Jun (supersedes GDD §14).
// The host (a player at Amp 7) opens the door; every player commits their whole team for the final
// push (Capacity ignored). Only the HOST's machine traces pollute the combined deck. Success pays a
// co-author Reputation credit by contribution (+1 per committed researcher per owner, capped at
// cfg.mwCoAuthorCap); failure tears the timeline in proportion to how rattled the host's machine WAS
// GOING IN — cfg.mwIntegDmgFail × (pre-jump instability+1) — not how rattled the doomed attempt left
// it, which would double-punish every overclock made during the attempt itself.
// GDD §14's "the +6 cap and the −2× rate are provisional, untuned" — both are cfg dials, not
// hardcoded, so a balance pass can move them without a code change.
const { resolveSteps, drawCons, applyCons } = require('../lib/resolution');

async function resolveManyWorlds(host, card, game) {
  const committed = []; // { r, owner }
  for (const p of game.players) {
    if (p.retired) continue;
    for (const r of p.team) committed.push({ r, owner: p });
  }
  const roster = committed.map(c => c.r);
  if (!roster.length) return { success: false };

  // Every non-host committer's whole team is locked into this push (GDD §9: "their owner can't use
  // them at home that turn") — flag them so their own upcoming turn this round skips Develop.
  for (const p of game.players) {
    if (p !== host && !p.retired && p.team.length) p.mwCommittedRound = game.round;
  }

  const preInstability = host.instability; // snapshot BEFORE the gamble, not after it absorbs overclocks
  // Host opens the door: buildBag uses host.instability for traces (host-only) and the host's base.
  const outcome = await resolveSteps(host, card, roster, host.policy, game);
  if (outcome.overclocks > 0) applyCons(drawCons(game), host, game, card.eraIdx); // same base-consequence rule as a normal jump
  for (const p of new Set([host, ...committed.map((c) => c.owner)])) {
    p.deepestEra = Math.max(p.deepestEra, card.eraIdx); // everyone who committed reached Many Worlds
  }

  if (outcome.success) {
    const byOwner = new Map();
    for (const c of committed) byOwner.set(c.owner, (byOwner.get(c.owner) || 0) + 1);
    for (const [owner, n] of byOwner) owner.rep += Math.min(game.cfg.mwCoAuthorCap, n);
    game.ended = true; game.mwSuccess = true; game.endReason = 'triumph';
  } else {
    game.integrity = Math.max(0, game.integrity - game.cfg.mwIntegDmgFail * (preInstability + 1));
  }
  return outcome;
}

module.exports = { resolveManyWorlds };
