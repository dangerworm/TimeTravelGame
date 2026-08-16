'use strict';
// ── Shared expedition-resolution kernel ───────────────────────────────────────
// Used by BOTH full-game-abstract.js (procedural cards + bots) and
// era-card-content-based.js (real decks/ cards). Extracted verbatim from the
// original sim.js so both sims resolve expeditions identically — DO NOT let the
// two drift. State arrives via params (player/roster/card/policy/game/cfg); the
// only module global is SKILLS.

const SKILLS = ['I', 'C', 'G'];

function makePRNG(seed) {
  let s = (seed >>> 0) || 12345;
  const next = () => { s = (Math.imul(1664525, s) + 1013904223) >>> 0; return s / 0x100000000; };
  return {
    next,
    int: (lo, hi) => lo + Math.floor(next() * (hi - lo + 1)),
    pick: arr => arr[Math.floor(next() * arr.length)],
    shuffle(arr) {
      const a = arr.slice();
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(next() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    },
  };
}

function genConsDeck(cfg, rng) {
  const W = cfg.consWeights;
  const total = Object.values(W).reduce((a,b)=>a+b,0);
  const deck = [];
  for (const [t, w] of Object.entries(W)) {
    const n = Math.round((w/total)*40);
    for (let i=0; i<n; i++) deck.push(t);
  }
  return rng.shuffle(deck);
}

function buildBag(player, roster, cfg) {
  const cards = [];
  for (let i=0; i<cfg.baseI; i++) cards.push('I');
  for (let i=0; i<cfg.baseC; i++) cards.push('C');
  for (let i=0; i<cfg.baseG; i++) cards.push('G');
  for (const r of roster) {
    const bonus = r.expBoxes * cfg.expBonus;
    for (const s of SKILLS) {
      const n = (r.pips[s]||0) + bonus;
      for (let i=0; i<n; i++) cards.push(s);
    }
  }
  for (let i=0; i<player.instability; i++) cards.push('T'); // Trace = dilution
  return cards;
}

function totalPips(r, expBonus) {
  return SKILLS.reduce((s,sk) => s+(r.pips[sk]||0)+r.expBoxes*expBonus, 0);
}

function gainExp(r, cfg) {
  if (r.noExp || r.expBoxes >= cfg.expMaxBoxes) return; // experts (noExp) start maxed; printed pips are final

  if (++r.expTokens >= cfg.expPerBox) { r.expTokens=0; r.expBoxes++; }
}

function drawCons(game) {
  if (!game.consDeck.length) game.consDeck = genConsDeck(game.cfg, game.rng);
  return game.consDeck.pop();
}

function applyCons(type, player, game, eraIdx) {
  const scale = 1 + game.cfg.consEraScale * eraIdx;
  switch (type) {
    case 'int1':     game.integrity = Math.max(0, game.integrity-1); break;
    case 'int2':     game.integrity = Math.max(0, game.integrity-2); break;
    case 'cashLoss': player.cash    = Math.max(0, player.cash - Math.ceil(scale)); break;
    case 'cashGain': player.cash   += 1; break;
    case 'repLoss':  player.rep     = Math.max(0, player.rep-1); break;
    case 'repGain':  player.rep    += 1; break;
    case 'modLoss': {
      const opts = ['amp','cap','col'].filter(k => player.machine[k]>1);
      if (opts.length) player.machine[game.rng.pick(opts)]--;
      break;
    }
    case 'nothing': break;
  }
}

// Resolve the step ladder ONLY: draw/hand-refill, overclock gamble, shutdown — plus the intrinsic
// side effects (instability, integrity hit + consequence on shutdown) and per-expedition bookkeeping.
// Does NOT grant rewards — callers decide how cleared steps pay (immediate tally vs Data/Artefact
// zones), so the full game and the per-card probe share one clearing engine. Returns the outcome.
async function resolveSteps(player, card, roster, policy, game) {
  const cfg = game.cfg;

  // Refill model (Drew's intent, 10 Jun): a persistent draw deck + discard. The hand is topped
  // back up to handSize at the START of every step; when the deck empties it is refilled by
  // reshuffling the discard (played skill cards + live Trace cards) back in. Overclock draws beyond
  // the cap. "Stamina" lives in accumulating Trace pollution + instability, not in hard depletion.
  let deck    = game.rng.shuffle(buildBag(player, roster, cfg));
  let discard = [];
  let hand    = [];
  const handSize = cfg.handPerResearcher*roster.length + cfg.handBase;

  const draw = () => {
    if (deck.length === 0) {
      if (discard.length === 0) return null;       // whole bag is in hand — nothing left to draw
      deck = game.rng.shuffle(discard); discard = [];
    }
    return deck.pop();
  };
  const topUp = () => { while (hand.length < handSize) { const c = draw(); if (c === null) break; hand.push(c); } };

  let cleared=0, overclocks=0, shutdown=false, cashOut=false;

  outer:
  for (let si=0; si<card.steps.length; si++) {
    const step = card.steps[si];

    // Profession lock: need matching prof on roster
    if (step.profLock && !roster.some(r=>r.profession===step.profLock)) {
      cashOut=true; break;
    }

    topUp(); // fresh full hand for this step
    let have = hand.filter(c=>c===step.skill).length;

    while (have < step.req) {
      // GDD §6: "your hand is visible" — hand out the actual cards in hand (not just the raw
      // shortfall count) plus how much draw pile is left, so a policy can weigh the real odds of
      // the gamble instead of a bare number.
      const handInfo = { hand: hand.slice(), deckRemaining: deck.length, discardRemaining: discard.length };
      if (!(await policy.shouldOverclock(player, step.req-have, si, card, game, handInfo))) {
        cashOut=true; break outer;
      }
      // Overclock: +1 instability (persists beyond this trip), +1 live Trace shuffled into the
      // REMAINING draw deck (GDD §6: "add +1 Trace to your deck" — not the discard, which would sit
      // out of play until the next reshuffle), and draw 1 extra card beyond the hand cap — the gamble.
      player.instability++;
      overclocks++;
      deck.splice(game.rng.int(0, deck.length), 0, 'T');
      const drawn = draw();
      if (drawn !== null) { hand.push(drawn); if (drawn===step.skill) have++; }
      // Shutdown check
      if (player.instability >= player.machine.stab) {
        game.integrity = Math.max(0, game.integrity-1);
        applyCons(drawCons(game), player, game, card.eraIdx);
        player.shutdowns++;
        shutdown=true;
        if (have>=step.req) cleared++;
        break outer;
      }
    }

    if (have >= step.req) {
      cleared++;
      // Play the required cards → discard (they recycle via reshuffle, not consumed)
      let toSpend = step.req;
      hand = hand.filter(c => {
        if (toSpend > 0 && c === step.skill) { toSpend--; discard.push(c); return false; }
        return true;
      });
    } else {
      break;
    }
  }

  player.overclocks  += overclocks;
  if (player.overclocksByEra) player.overclocksByEra[card.eraIdx] += overclocks; // era-distribution (full game only)
  if (player.expeditionsByEra) player.expeditionsByEra[card.eraIdx]++;
  player.expeditions++;
  if (cleared < card.steps.length && !shutdown) player.cashOuts++;
  for (const r of roster) gainExp(r, cfg); // expedition = researcher used

  return { cleared, total:card.steps.length, overclocks, shutdown, cashOut,
           success: cleared===card.steps.length };
}

// Abstract-model reward tally: find→Cash, objective→rep now (record) or Artefacts (plunder). Used by
// the per-card probe (era-card-content-based.js). The full game does NOT use this — it routes cleared
// steps through Data/Artefact zones with deferred Publishing (see game/actions.js).
function applyImmediateRewards(player, card, cleared, policy, game) {
  const cfg = game.cfg;
  let cashGained=0, repGained=0;
  for (let i=0; i<cleared; i++) {
    const step = card.steps[i];
    if (step.type==='find') {
      cashGained += step.cash||0;
    } else if (!step.isArtefact) {
      repGained += step.rep||0;       // pure-knowledge prize: record-only
      player.papersWritten++;         // a recorded finding IS a paper
    } else {
      if (recordOrPlunder(policy, player, step, game) === 'record') {
        repGained += step.rep||0;
        player.papersWritten++;
      } else {
        player.plunders++;
        if (!step.isDoomed) {
          const imp = (cfg.plunderImprint[card.eraIdx] ?? 1);
          game.integrity = Math.max(0, game.integrity - imp);
        }
        player.artefacts.push({ rep: step.rep||0, isDoomed: !!step.isDoomed });
      }
    }
  }
  player.cash += cashGained;
  player.rep   = Math.max(0, player.rep + repGained);
}

// Convenience wrapper preserving the probe's original one-call behaviour.
async function runExpedition(player, card, roster, policy, game) {
  const outcome = await resolveSteps(player, card, roster, policy, game);
  applyImmediateRewards(player, card, outcome.cleared, policy, game);
  return outcome;
}

// Probe-only heuristic (era-card-content-based.js) — NOT used by the full game (game/actions.js has
// its own claimObjective that calls the policy's actual recordOrPlunder). Dispatches on policy.name,
// so it only knows 'cautious'/'balanced'; anything else (e.g. an LLM policy pointed at this probe)
// silently falls through to the greedy branch below — flagging that explicitly rather than leaving
// it a silent landmine, since this function's whole contract depends on that name matching.
function recordOrPlunder(policy, player, step, game) {
  if (!['greedy', 'cautious', 'balanced'].includes(policy.name)) {
    throw new Error(`resolution.js's recordOrPlunder only knows greedy/cautious/balanced policy names, got "${policy.name}" — this probe-only heuristic doesn't support other policies (the full game's game/actions.js does, via policy.recordOrPlunder).`);
  }
  const doomed     = !!step.isDoomed;
  const integFrac  = game.integrity / Math.max(1, game.integrityMax);
  const considers  = policy.name === 'cautious' ? doomed
                   : policy.name === 'balanced' ? (doomed || integFrac >= 0.6)
                   : true; // greedy
  if (!considers) return 'record';
  const others = game.players.filter(p => p !== player);
  const avg = sel => others.reduce((s,p)=>s+p[sel],0) / Math.max(1, others.length);
  if (player.rep  < avg('rep'))  return 'record';   // behind on rep -> record (priority)
  if (player.cash < avg('cash')) return 'plunder';  // behind on cash -> plunder & sell
  return 'record';                                   // ahead on both -> stay clean
}

module.exports = { makePRNG, SKILLS, genConsDeck, buildBag, totalPips, gainExp, drawCons, applyCons,
                   resolveSteps, applyImmediateRewards, runExpedition, recordOrPlunder };
