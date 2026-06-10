'use strict';
// Time Travel Board Game — Balance Simulator
// Usage: node sim/sim.js [--quick]
// Outputs: sim/RESULTS.md  sim/ASSUMPTIONS.md  sim/PROGRESS.md

const fs = require('fs');

// ── PRNG ──────────────────────────────────────────────────────────────────────
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

// ── CONSTANTS ─────────────────────────────────────────────────────────────────
const SKILLS = ['I', 'C', 'G'];
const PROF   = ['Historian', 'Engineer', 'Physicist'];
const ERAS   = ['Recent','Modern','EarlyModern','Medieval','Ancient','Prehistoric','ManyWorlds'];

// ── DEFAULT CONFIG ────────────────────────────────────────────────────────────
function defaultConfig() {
  return {
    // Step requirement: max(1, round(reqBase + reqEraSlope*eraIdx + reqStepSlope*stepIdx))
    reqBase: 0.6, reqEraSlope: 0.2, reqStepSlope: 0.0,

    // Rewards
    cashFindBase: 3, cashFindSlope: 1.0,
    repObjBase: 2,   repObjSlope: 1.5,
    objCashChance: 0.40,
    findPayoutMult: 2.0,  // penultimate find pays 2× — reaches MW ~75% (10 Jun)

    // Plunder / record — non-doomed plunder scars the timeline (greed dial); doomed grabs clean.
    doomedChance: 0.35,
    plunderImprint: [1,1,1,2,2,3,3],

    // Early-step relief spoils
    earlySpoilChance: 0.15, earlySpoilCashMin: 1, earlySpoilCashMax: 2, earlySpoilEraMax: 4,

    // Era card structure — growth bands by era: Recent 3, Modern 3, EarlyMod 4, Medieval 4,
    // Ancient 5, Prehistoric 5, (Many Worlds 5 via mwSteps).
    eraStepBands: [[3,3],[3,3],[4,4],[4,4],[5,5],[5,5],[5,5]],
    stepsMin: 4, stepsMax: 5, eraCardsPerTier: 12,
    dangerChance: 0.20, profLockChance: 0.33,

    // Researchers — specialist (SS) / non-specialist (NSS) pip model (10 Jun).
    // SS = Insight for Historian/Physicist, Craft for Engineer; NSS the other; Grit always random.
    // Each skill rolls in [floor, ceiling]; SS = min(ceiling, NSS + spike); spike random 0/1/2.
    // Cost = total pips (+1 if any skill is at the ceiling), clamped to [costMin, costMax].
    postdocCostMin: 3, postdocCostMax: 7, expertCostMin: 9, expertCostMax: 16,
    postdocPipFloor: 0, postdocPipCeiling: 3,
    expertPipFloor:  3, expertPipCeiling:  5,
    postdocTotalMin: 3, postdocTotalMax: 6,  // postdocs: 3–6 total pips (experts run 9–15 via floor 3)

    // Module upgrade costs (index = currentLevel-1 → cost to next level)
    ampCosts:  [0, 1, 2, 4, 6, 9], // Amp 1→7; 1→2 is free, so the first upgrade only needs a researcher
    capCosts:  [3, 4, 6, 9],      // Cap 1→5
    colCosts:  [3, 5, 8],         // Col 1→4
    stabCosts: [4, 7],            // Stab 2→4→6 (+2 max-instability each upgrade)

    // Player base
    baseI: 2, baseC: 2, baseG: 2,

    // Hand draw = handPerResearcher × (researchers on expedition) + handBase
    handPerResearcher: 2, handBase: 2,

    // Start state
    startCash: 3, startAmp: 1, startCap: 1, startCol: 1, startStab: 2,

    // Timeline Integrity = (players + 1) × integrityPerPlayerPlus1
    integrityPerPlayerPlus1: 4,

    // Consequence deck weights (relative, normalised to 40 cards)
    consWeights: { int1:20, int2:8, cashLoss:15, cashGain:12,
                   repLoss:10, repGain:10, modLoss:5, nothing:20 },
    consEraScale: 0,  // consequences do NOT scale with era (keep the table maths light)

    // Experience — expPerBox=2 → 4 uses to fully mature (2 earnable boxes)
    expPerBox: 2, expMaxBoxes: 2, expBonus: 1,

    // Papers — vestigial (publishing pays the artefact's printed rep, not these)
    paperRepBase: 4, paperRepBonus: 1,

    // Many Worlds card — 5×5 makes the multiverse rare (~50%) and the final push genuinely perilous;
    // failed-MW −2 keeps the endgame spread ~53% triumph / 33% collapse / 14% legacy (not all collapse).
    mwSteps: 5, mwReqPerStep: 5, mwIntegDmgFail: 2,

    partingRep: 2,
    maxRounds: 30,
  };
}

// ── CARD GENERATOR ────────────────────────────────────────────────────────────
function genStep(eraIdx, stepIdx, cfg, rng) {
  const req = Math.max(1, Math.round(cfg.reqBase + cfg.reqEraSlope*eraIdx + cfg.reqStepSlope*stepIdx));
  if (rng.next() < cfg.dangerChance) return { skill:'G', req, profLock:null };
  const skill = rng.pick(SKILLS);
  const profLock = (skill==='I' && rng.next()<cfg.profLockChance) ? 'Historian'
                 : (skill==='C' && rng.next()<cfg.profLockChance) ? 'Engineer'
                 : null;
  return { skill, req, profLock };
}

function genEraCard(eraIdx, cfg, rng) {
  const band   = cfg.eraStepBands && cfg.eraStepBands[eraIdx];
  const nSteps  = band ? rng.int(band[0], band[1]) : rng.int(cfg.stepsMin, cfg.stepsMax);
  const steps  = [];
  for (let i = 0; i < nSteps-1; i++) {
    // Spoils (Cash) only on the SECOND-TO-LAST step (10 Jun): every earlier step is a pure
    // gate paying nothing, so you can't get rich bailing after 1-2 steps — you must climb the
    // ladder to the cache, then decide whether to gamble the final objective.
    const isPenultimate = (i === nSteps-2);
    const findCash = Math.round((cfg.cashFindBase + cfg.cashFindSlope*eraIdx) * (cfg.findPayoutMult||1));
    steps.push({ ...genStep(eraIdx, i, cfg, rng), type:'find',
                 cash: isPenultimate ? findCash : 0 });
  }
  // Early-step relief spoils: eras below earlySpoilEraMax may carry one small extra spoil on a
  // step before the penultimate (which already holds the main find), max one per card.
  if (eraIdx < (cfg.earlySpoilEraMax||0)) {
    for (let i = 0; i < nSteps-2; i++) {   // steps before the penultimate
      if (rng.next() < (cfg.earlySpoilChance||0)) {
        steps[i].cash = rng.int(cfg.earlySpoilCashMin, cfg.earlySpoilCashMax);
        break;                              // at most one extra spoil
      }
    }
  }

  const obj = genStep(eraIdx, nSteps-1, cfg, rng);
  // Some objectives pay cash directly (no artefact), the rest are plunderable artefacts.
  const isCashObj = rng.next() < (cfg.objCashChance||0);
  steps.push({
    ...obj, type:'objective',
    isArtefact: !isCashObj,
    isDoomed:   !isCashObj && rng.next() < (cfg.doomedChance||0), // clean to take/sell
    rep:  isCashObj ? 0 : Math.round(cfg.repObjBase + cfg.repObjSlope*eraIdx),
    cash: isCashObj ? Math.round((cfg.cashFindBase + cfg.cashFindSlope*eraIdx)*1.5) : 0,
  });
  return { eraIdx, steps };
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

function genResearcher(profession, isSenior, cfg, rng) {
  const floor = isSenior ? cfg.expertPipFloor   : cfg.postdocPipFloor;
  const ceil  = isSenior ? cfg.expertPipCeiling : cfg.postdocPipCeiling;
  let pips, total, atCeil;
  for (let tries=0; ; tries++) {
    const spike = rng.int(0, 2);                 // 0/1/2 equal — the specialist's edge over NSS
    const nss   = rng.int(floor, ceil);          // non-specialist skill
    const ss    = Math.min(ceil, nss + spike);   // specialist ≥ non-specialist, capped at ceiling
    const grit  = rng.int(floor, ceil);
    pips = {};
    if (profession === 'Engineer') { pips.C = ss; pips.I = nss; } // Engineer specialises in Craft
    else                           { pips.I = ss; pips.C = nss; } // Historian & Physicist → Insight
    pips.G = grit;
    total  = pips.I + pips.C + pips.G;
    atCeil = (pips.I===ceil || pips.C===ceil || pips.G===ceil);
    // Postdocs: keep total pips in [postdocTotalMin, postdocTotalMax]. Experts use floor/ceiling as-is.
    if (isSenior || (total>=cfg.postdocTotalMin && total<=cfg.postdocTotalMax) || tries>50) break;
  }
  const costMin = isSenior ? cfg.expertCostMin : cfg.postdocCostMin;
  const costMax = isSenior ? cfg.expertCostMax : cfg.postdocCostMax;
  const cost    = Math.max(costMin, Math.min(costMax, total + (atCeil ? 1 : 0)));
  return { profession, pips, cost, isSenior, expTokens:0, expBoxes: isSenior ? cfg.expMaxBoxes : 0 };
}

// ── PLAYER STATE ──────────────────────────────────────────────────────────────
function makePlayer(id, cfg) {
  return {
    id, cash:cfg.startCash, rep:0,
    team:[], artefacts:[], instability:0,
    machine:{ amp:cfg.startAmp, cap:cfg.startCap, col:cfg.startCol, stab:cfg.startStab },
    staged:null,
    // stats
    expeditions:0, overclocks:0, shutdowns:0, cashOuts:0, papersWritten:0, plunders:0,
  };
}

// ── BAG BUILDER ───────────────────────────────────────────────────────────────
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

// ── HELPERS ───────────────────────────────────────────────────────────────────
function totalPips(r, expBonus) {
  return SKILLS.reduce((s,sk) => s+(r.pips[sk]||0)+r.expBoxes*expBonus, 0);
}

function gainExp(r, cfg) {
  if (r.expBoxes >= cfg.expMaxBoxes) return;
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

// ── EXPEDITION ────────────────────────────────────────────────────────────────
function runExpedition(player, card, roster, policy, game) {
  const cfg = game.cfg;

  // Refill model (Drew's intent, 10 Jun): a persistent draw deck + discard. The hand is topped
  // back up to handSize at the START of every step; when the deck empties it is refilled by
  // reshuffling the discard (played cards + live Trace cards) back in. Overclock draws beyond the
  // cap. "Stamina" lives in accumulating Trace pollution + instability, not in hard depletion.
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
      if (!policy.shouldOverclock(player, step.req-have, si, card, game)) {
        cashOut=true; break outer;
      }
      // Overclock: +1 instability (persists), +1 live Trace into the deck (dilutes the rest of
      // this expedition too), and draw 1 extra card beyond the hand cap — the gamble.
      player.instability++;
      overclocks++;
      discard.push('T');
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

  // Collect rewards
  let cashGained=0, repGained=0;
  for (let i=0; i<cleared; i++) {
    const step = card.steps[i];
    if (step.type==='find') {
      cashGained += step.cash||0;
    } else if (!step.isArtefact) {
      repGained += step.rep||0;       // pure-knowledge prize: record-only
      player.papersWritten++;         // a recorded finding IS a paper
    } else {
      // Artefact objective: record (rep now, clean) vs plunder (take it → scar now, then at the
      // desk a historian publishes it for rep, or sells it for cash if cash-starved).
      if (recordOrPlunder(policy, player, step, game) === 'record') {
        repGained += step.rep||0;
        player.papersWritten++;       // recording evidence in the field IS a paper
      } else {
        player.plunders++;
        if (!step.isDoomed) {                        // taking a non-doomed artefact scars history
          const imp = (cfg.plunderImprint[card.eraIdx] ?? 1);
          game.integrity = Math.max(0, game.integrity - imp);
        }
        player.artefacts.push({ rep: step.rep||0, isDoomed: !!step.isDoomed });
      }
    }
  }
  player.cash += cashGained;
  player.rep   = Math.max(0, player.rep + repGained);

  player.overclocks  += overclocks;
  player.expeditions++;
  if (cleared < card.steps.length && !shutdown) player.cashOuts++;
  for (const r of roster) gainExp(r, cfg); // expedition = researcher used

  return { cleared, total:card.steps.length, overclocks, shutdown, cashOut,
           success: cleared===card.steps.length };
}

// ── HOME ACTIONS (one per researcher not on expedition) ───────────────────────
function doHomeActions(player, home, game) {
  const cfg = game.cfg;
  for (const r of home) {
    if (r.profession==='Engineer') {
      if (player.instability > 0) {
        // Clear instability (does NOT grant exp — spec §7)
        const cleared = Math.min((r.pips['C']||0)+r.expBoxes*cfg.expBonus, player.instability);
        player.instability = Math.max(0, player.instability-cleared);
      } else {
        upgradeModule(player, r, game);
      }
    } else if (r.profession==='Physicist') {
      upgradeModule(player, r, game);
    } else {
      // Historian: dispose a held (plundered) artefact — publish for Reputation, or sell for Cash
      // if cash-starved — else upgrade. Publishing pays the artefact's PRINTED rep (experience
      // does not modify it); selling pays Cash but costs disrepute (doomed artefacts sell clean).
      if (player.artefacts.length) {
        const art = player.artefacts.shift();
        const others = game.players.filter(p=>p!==player);
        const avgCash = others.reduce((s,p)=>s+p.cash,0) / Math.max(1, others.length);
        if (player.cash < avgCash) {
          const V = art.rep||0;
          const disrepute = art.isDoomed ? 0 : Math.max(1, Math.floor((V-1)/2));
          player.cash += V;
          player.rep   = Math.max(0, player.rep - disrepute);
        } else {
          player.rep += art.rep||0;
          player.papersWritten++;
        }
        gainExp(r, cfg); // researcher used (grows pips, not the paper's rep)
      } else {
        upgradeModule(player, r, game);
      }
    }
  }
}

function tryAmpUpgrade(player, researcher, game) {
  const cfg = game.cfg;
  const m   = player.machine;
  if (m.amp >= 7) return false;
  const nextAmp = m.amp+1;
  const hasEng  = player.team.some(r=>r.profession==='Engineer');
  const hasPhy  = player.team.some(r=>r.profession==='Physicist');
  const eng     = player.team.find(r=>r.profession==='Engineer');
  const phy     = player.team.find(r=>r.profession==='Physicist');
  const engMaxed= eng?.expBoxes >= cfg.expMaxBoxes;
  const phyMaxed= phy?.expBoxes >= cfg.expMaxBoxes;
  const canAmp  = nextAmp<=2 ? true
                : nextAmp<=4 ? hasEng
                : nextAmp<=6 ? hasEng && hasPhy
                : hasEng && hasPhy && engMaxed && phyMaxed;
  const cost = cfg.ampCosts[m.amp-1];
  if (!canAmp || cost == null || player.cash<cost) return false; // cost 0 (free 1→2) is valid
  player.cash -= cost; m.amp++; gainExp(researcher, cfg); return true;
}

function upgradeModule(player, researcher, game) {
  const cfg = game.cfg;
  const m   = player.machine;

  // Profession-aware upgrade priority:
  // Physicist: Cap → Stab → Amp (Cap is critical for hand size)
  // Engineer:  Amp → Col (Engineer drives progression)
  // Historian: Amp only

  if (researcher.profession==='Physicist') {
    // Cap
    if (m.cap-1 < cfg.capCosts.length) {
      const cost = cfg.capCosts[m.cap-1];
      if (cost && player.cash>=cost) { player.cash-=cost; m.cap++; gainExp(researcher, cfg); return; }
    }
    // Stab — each upgrade lifts the max-instability ceiling by +2 (start 2 → 4 → 6)
    const stabIdx = (m.stab-2)/2;
    if (stabIdx < cfg.stabCosts.length) {
      const cost = cfg.stabCosts[stabIdx];
      if (cost && player.cash>=cost) { player.cash-=cost; m.stab+=2; gainExp(researcher, cfg); return; }
    }
    // Amp (fallback)
    tryAmpUpgrade(player, researcher, game);
  } else if (researcher.profession==='Engineer') {
    // Amp first
    if (tryAmpUpgrade(player, researcher, game)) return;
    // Col
    if (m.col-1 < cfg.colCosts.length) {
      const cost = cfg.colCosts[m.col-1];
      if (cost && player.cash>=cost) { player.cash-=cost; m.col++; gainExp(researcher, cfg); return; }
    }
  } else {
    // Historian: Amp only
    tryAmpUpgrade(player, researcher, game);
  }
}

// ── PLAN PHASE ────────────────────────────────────────────────────────────────
function planStage(player, game) {
  const cfg = game.cfg;
  // Many Worlds = Amp 7 (the 6→7 upgrade itself is gated on E+P fully experienced, in tryAmpUpgrade).
  if (player.machine.amp >= 7) {
    player.staged = { eraIdx:6, isMW:true, steps: genMWSteps(cfg, game.rng) };
    return;
  }
  const maxEraIdx = player.machine.amp - 1; // 0-based, amp-1 is deepest reachable normal era
  const n = player.machine.col;
  const drawn = [];
  for (let i=0; i<n; i++) {
    // Choose era: policy says which; default = deepest accessible
    const eraIdx = player.policy.pickEraIdx(player, maxEraIdx);
    if (game.eraDecks[eraIdx].length===0) {
      // Reseed this era
      game.eraDecks[eraIdx] = game.rng.shuffle(
        Array.from({length:cfg.eraCardsPerTier}, ()=>genEraCard(eraIdx, cfg, game.rng))
      );
    }
    drawn.push(game.eraDecks[eraIdx].pop());
  }
  player.staged = drawn.length ? player.policy.pickCard(player, drawn) : null;
}

function genMWSteps(cfg, rng) {
  return Array.from({length:cfg.mwSteps}, (_, i) => ({
    skill: rng.pick(SKILLS), req: cfg.mwReqPerStep, profLock: null,
    type: i===cfg.mwSteps-1 ? 'objective' : 'find',
    rep: i===cfg.mwSteps-1 ? 15 : 0, isArtefact: false,
  }));
}

// ── AI POLICIES ───────────────────────────────────────────────────────────────
function selectRosterDefault(player, card, maxSend) {
  if (!player.team.length) return [];
  const needed = new Set(card.steps.filter(s=>s.profLock).map(s=>s.profLock));
  return [...player.team]
    .sort((a,b) => (needed.has(b.profession)?10:0)-(needed.has(a.profession)?10:0)
                || totalPips(b,1)-totalPips(a,1))
    .slice(0, Math.min(maxSend, player.team.length));
}

const pGreedy = {
  name: 'greedy',
  selectRoster(player, card) {
    // MW attempt: send everyone (all researchers for the final push)
    const max = card.isMW ? player.team.length : player.machine.cap;
    return selectRosterDefault(player, card, max);
  },
  shouldOverclock(player, shortfall, si, card, game) {
    // Reach for the prize: push the objective even into a shutdown if we're close
    // (models a human gambling for the headline reward — this is what produces shutdowns).
    const isObjective = si === card.steps.length-1;
    if (isObjective && shortfall <= 3) return true;
    return player.instability+1 < player.machine.stab; // otherwise stop before a shutdown
  },
  shouldRecord(player) {
    return !player.team.some(r=>r.profession==='Historian'); // plunder if historian can publish
  },
  pickEraIdx(player, maxEraIdx) { return maxEraIdx; },
  pickCard(player, drawn) {
    return drawn.reduce((a,b)=>(a.eraIdx>=b.eraIdx)?a:b);
  },
  buyResearcher(player, market, cfg) {
    const have = new Set(player.team.map(r=>r.profession));
    const prio = PROF.filter(p=>!have.has(p));
    const avail = market.filter(r=>r && player.cash>=r.cost);
    if (!avail.length) return null;
    return avail.find(r=>prio.includes(r.profession)) || avail[0];
  },
};

const pCautious = {
  name: 'cautious',
  selectRoster(player, card) {
    return selectRosterDefault(player, card, card.isMW ? player.team.length : 1);
  },
  shouldOverclock() { return false; },
  shouldRecord() { return true; },
  pickEraIdx() { return 0; }, // always Recent
  pickCard(player, drawn) { return drawn.reduce((a,b)=>(a.eraIdx<=b.eraIdx)?a:b); },
  buyResearcher(player, market, cfg) {
    // Always buy if team is empty and can afford; conservative otherwise
    const avail = market.filter(r=>r && player.cash>=r.cost);
    if (!avail.length) return null;
    if (player.team.length < 2) return avail[0]; // must have at least 2 to function
    if (player.cash <= 5) return null;
    const avail2 = market.filter(r=>r && player.cash>=r.cost+3);
    if (!avail2.length) return null;
    // Prioritize missing professions so we get Engineers (amp) and Physicists (cap)
    const have = new Set(player.team.map(r=>r.profession));
    const prio = PROF.filter(p=>!have.has(p));
    return avail2.find(r=>prio.includes(r.profession)) || avail2[0];
  },
};

const pBalanced = {
  name: 'balanced',
  selectRoster(player, card) {
    // MW: send everyone. Normal: 75% of cap (at least 1)
    if (card.isMW) return selectRosterDefault(player, card, player.team.length);
    const send = Math.max(1, Math.ceil(player.machine.cap * 0.75));
    return selectRosterDefault(player, card, send);
  },
  shouldOverclock(player, shortfall, si, card, game) {
    const isObjective = si === card.steps.length-1;
    // Balanced will gamble the objective — but only when one short (mild risk appetite).
    if (isObjective && shortfall <= 1) return true;
    if (player.instability+1 >= player.machine.stab) return false;
    // Otherwise OC only with headroom, and never into a shutdown.
    const safeInstability = player.instability+1 < player.machine.stab-1;
    return shortfall<=1 && safeInstability;
  },
  shouldRecord(player) {
    return !player.team.some(r=>r.profession==='Historian') || player.instability>=2;
  },
  pickEraIdx(player, maxEraIdx) { return Math.max(0, maxEraIdx-1); },
  pickCard(player, drawn) {
    const score = c => { const o=c.steps[c.steps.length-1]; return (o.rep||0)*2+(o.cash||0); };
    return drawn.reduce((a,b)=>score(a)>=score(b)?a:b);
  },
  buyResearcher(player, market, cfg) {
    const avail = market.filter(r=>r && player.cash>=r.cost);
    if (!avail.length) return null;
    if (player.team.length < 2) return avail[0]; // bootstrap: always hire up to 2
    if (player.cash < 4) return null;
    const have  = new Set(player.team.map(r=>r.profession));
    const prio  = PROF.filter(p=>!have.has(p));
    return avail.find(r=>prio.includes(r.profession)) || avail[0];
  },
};

// Reckless: greedy in every respect, but it LOVES the gamble — it overclocks on ANY step when
// up to 3 short, charging into shutdowns rather than folding. Models the keystone-#1 player.
const pReckless = { ...pGreedy, name:'reckless',
  shouldOverclock(player, shortfall) { return shortfall <= 3; } };

const ALL_POLICIES = { greedy:pGreedy, cautious:pCautious, balanced:pBalanced, reckless:pReckless };

// Record-vs-plunder decision (10 Jun). Each archetype has a different GATE on whether it will
// consider plundering at all; the sub-decision (need rep -> record, need cash -> plunder) is shared.
//   cautious  — only ever plunders a DOOMED artefact (never scars the timeline)
//   balanced  — considers plunder if the timeline is healthy (>=60%) OR the artefact is doomed
//   greedy    — always considers plunder (non-doomed too, scarring the timeline)
function recordOrPlunder(policy, player, step, game) {
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

// ── MARKET HELPERS ────────────────────────────────────────────────────────────
function makeMarket(cfg, rng) {
  return rng.shuffle(PROF.flatMap(p =>
    Array.from({length:4}, ()=>genResearcher(p, false, cfg, rng))
  ));
}

function replenishMarket(market, cfg, rng) {
  // Refill any null slots with new postdocs (market is treated as infinite supply)
  for (let i=0; i<market.length; i++) {
    if (!market[i]) market[i] = genResearcher(PROF[i % PROF.length], false, cfg, rng);
  }
}

function buyIfAffordable(player, market, game) {
  replenishMarket(market, game.cfg, game.rng);
  const pick = player.policy.buyResearcher(player, market.filter(Boolean), game.cfg);
  if (!pick) return;
  player.cash -= pick.cost;
  player.team.push(pick);
  const idx = market.indexOf(pick);
  if (idx>=0) market[idx]=null;
}

// ── TURN SIMULATION ───────────────────────────────────────────────────────────
function doTurn(player, game, withTrace) {
  const policy = player.policy;
  let expResult = null;

  if (player.staged && player.team.length>0) {
    const card   = player.staged;
    const roster = policy.selectRoster(player, card);
    const home   = player.team.filter(r=>!roster.includes(r));

    expResult = runExpedition(player, card, roster, policy, game);

    // Era-by-round diagnostic (only allocated in --analyze/--expB mode)
    if (game.eraLog) game.eraLog.push({
      round: game.round, eraIdx: card.eraIdx, amp: player.machine.amp, policy: policy.name,
      cleared: expResult.cleared, total: expResult.total, success: expResult.success,
      steps: card.steps.length,
    });

    // Consequence if any overclock (and not already drawn on shutdown)
    if (expResult.overclocks>0 && !expResult.shutdown) {
      applyCons(drawCons(game), player, game, card.eraIdx);
    }

    // Many Worlds outcome
    if (card.isMW) {
      if (expResult.success) { game.ended=true; game.mwSuccess=true; game.endReason='manyworlds'; }
      else game.integrity = Math.max(0, game.integrity - game.cfg.mwIntegDmgFail);
    }

    player.staged = null;
    doHomeActions(player, home, game);
  } else {
    // No expedition this turn — all researchers at home
    doHomeActions(player, player.team, game);
  }

  if (game.ended) return;

  // Integrity — Unravelling fuse: all players get one more full round
  if (game.integrity<=0) {
    if (game.unravelRound===null) game.unravelRound=game.round;
    else if (game.round > game.unravelRound) {
      game.ended=true; game.endReason='collapse'; return;
    }
  }

  // Buy researcher (after collecting expedition income)
  buyIfAffordable(player, game.market, game);

  // Plan for next turn
  planStage(player, game);

  if (withTrace && game.trace) {
    game.trace.push({
      round: game.round, player: player.id, policy: policy.name,
      era: player.staged ? ERAS[player.staged.eraIdx] : '-',
      teamSz: player.team.length, cash: player.cash, rep: player.rep,
      instab: player.instability, integrity: game.integrity, amp: player.machine.amp,
      cap: player.machine.cap, stab: player.machine.stab,
      exp: expResult ? `${expResult.cleared}/${expResult.total} oc=${expResult.overclocks}` : 'skip',
    });
  }
}

// ── SINGLE GAME ───────────────────────────────────────────────────────────────
function playGame(numPlayers, cfg, policyAssignment, seed, withTrace, logEras) {
  const rng   = makePRNG(seed);
  const market= makeMarket(cfg, rng);
  const eraDecks = Array.from({length:7}, (_, e) =>
    rng.shuffle(Array.from({length:cfg.eraCardsPerTier}, ()=>genEraCard(e, cfg, rng)))
  );
  const game = {
    cfg, rng, market, eraDecks,
    integrity:    (numPlayers + 1) * cfg.integrityPerPlayerPlus1,
    integrityMax: (numPlayers + 1) * cfg.integrityPerPlayerPlus1,
    consDeck:  genConsDeck(cfg, rng),
    players:   Array.from({length:numPlayers}, (_, i) => {
      const p = makePlayer(i, cfg);
      p.policy = ALL_POLICIES[policyAssignment[i % policyAssignment.length]];
      return p;
    }),
    round:0, ended:false, mwSuccess:false, endReason:'timeout', unravelRound:null,
    trace: withTrace ? [] : null,
    eraLog: logEras ? [] : null,
  };

  // Initial setup: each player buys first researcher if possible, then plans.
  // (startCash 3 affords the cheapest postdoc; the free Amp 1→2 upgrade does the rest.)
  for (const p of game.players) {
    buyIfAffordable(p, game.market, game);
    planStage(p, game);
  }

  while (!game.ended && game.round < cfg.maxRounds) {
    game.round++;
    for (const p of game.players) {
      if (game.ended) break;
      doTurn(p, game, withTrace);
    }
  }

  for (const p of game.players) {
    const maxMod = Math.max(...Object.values(p.machine));
    p.score = p.rep + maxMod + p.artefacts.length;
  }

  // Per-policy breakdown (player-games) — lets us see the gamble concentrate in the pusher
  const byPolicy = {};
  for (const p of game.players) {
    const k = p.policy.name;
    (byPolicy[k] ||= { shutdowns:0, overclocks:0, expeditions:0, cashOuts:0, plunders:0, playerGames:0 });
    byPolicy[k].shutdowns   += p.shutdowns;
    byPolicy[k].overclocks  += p.overclocks;
    byPolicy[k].expeditions += p.expeditions;
    byPolicy[k].cashOuts    += p.cashOuts;
    byPolicy[k].plunders    += p.plunders;
    byPolicy[k].playerGames += 1;
  }

  return {
    rounds:      game.round,
    mwSuccess:   game.mwSuccess,
    endReason:   game.endReason,
    integrity:   game.integrity,
    scores:      game.players.map(p=>p.score),
    overclocks:  game.players.reduce((s,p)=>s+p.overclocks,0),
    expeditions: game.players.reduce((s,p)=>s+p.expeditions,0),
    cashOuts:    game.players.reduce((s,p)=>s+p.cashOuts,0),
    shutdowns:   game.players.reduce((s,p)=>s+p.shutdowns,0),
    papers:      game.players.reduce((s,p)=>s+p.papersWritten,0),
    byPolicy,
    trace:       game.trace,
    eraLog:      game.eraLog,
  };
}

// ── METRICS ───────────────────────────────────────────────────────────────────
function computeMetrics(results, numPlayers) {
  const n    = results.length;
  const avg  = key => results.reduce((s,r)=>s+r[key],0)/n;
  const rate = pred => results.filter(pred).length/n;

  const mwRate       = rate(r=>r.mwSuccess);
  const collapseRate = rate(r=>r.endReason==='collapse');
  const avgRounds    = avg('rounds');
  const ocPerExp     = results.reduce((s,r)=>s+(r.expeditions>0?r.overclocks/r.expeditions:0),0)/n;
  const coRate       = results.reduce((s,r)=>s+(r.expeditions>0?r.cashOuts/r.expeditions:0),0)/n;
  const avgShutdown  = avg('shutdowns');
  const avgPapers    = avg('papers');
  const avgSpread    = results.reduce((s,r)=>s+Math.max(...r.scores)-Math.min(...r.scores),0)/n;
  // Wall clock: 3 min/player-turn × players × rounds
  const wallClock    = Math.round(avgRounds * numPlayers * 3);

  // Per-policy shutdowns & overclocks, normalised to per-player-per-game
  const polAgg = {};
  for (const r of results) for (const [k,v] of Object.entries(r.byPolicy)) {
    (polAgg[k] ||= { shutdowns:0, overclocks:0, expeditions:0, cashOuts:0, plunders:0, playerGames:0 });
    polAgg[k].shutdowns   += v.shutdowns;
    polAgg[k].overclocks  += v.overclocks;
    polAgg[k].expeditions += v.expeditions;
    polAgg[k].cashOuts    += v.cashOuts;
    polAgg[k].plunders    += v.plunders;
    polAgg[k].playerGames += v.playerGames;
  }
  const byPolicy = {};
  for (const [k,v] of Object.entries(polAgg)) {
    byPolicy[k] = {
      shutdownsPerGame:  v.shutdowns  / v.playerGames,
      overclocksPerGame: v.overclocks / v.playerGames,
      plundersPerGame:   v.plunders   / v.playerGames,
      ocRate:            v.expeditions ? v.overclocks / v.expeditions : 0,
      coRate:            v.expeditions ? v.cashOuts   / v.expeditions : 0,
    };
  }

  return { mwRate, collapseRate, avgRounds, ocPerExp, coRate,
           avgShutdown, avgPapers, avgSpread, wallClock, numPlayers, byPolicy };
}

function fitness(m4, m5) {
  const pen = (actual, target, weight) => weight * Math.abs(actual-target)/Math.max(target,0.01);
  // Band penalty: zero inside [lo,hi], linear outside (normalised by hi)
  const band = (actual, lo, hi, weight) =>
    weight * (actual<lo ? (lo-actual) : actual>hi ? (actual-hi) : 0) / hi;
  return pen(m4.mwRate,    0.75, 3.0)   // MW target 75% (Drew, 9 Jun)
       + pen(m5.mwRate,    0.75, 3.0)
       + band(m4.avgRounds, 8, 14, 1.5) // 8–12 ideal, up to 14 fine if fun — no penalty in-band
       + band(m5.avgRounds, 8, 14, 1.5)
       + pen(m4.ocPerExp,  0.35, 1.5)
       + pen(m4.coRate,    0.40, 2.0)   // weighted harder: push cash-out down toward ~40%
       + (m4.collapseRate > 0.50 ? (m4.collapseRate-0.50)*4 : 0)
       + (m5.collapseRate > 0.50 ? (m5.collapseRate-0.50)*4 : 0);
}

// ── SWEEP HARNESS ─────────────────────────────────────────────────────────────
function buildGrid(grid) {
  const keys = Object.keys(grid);
  const out  = [];
  function rec(i, cur) {
    if (i===keys.length) { out.push({...cur}); return; }
    for (const v of grid[keys[i]]) { cur[keys[i]]=v; rec(i+1, cur); }
  }
  rec(0, {});
  return out;
}

function runSweep(quick) {
  const G = quick ? 200 : 500;
  const POLICIES_MIX = ['greedy','cautious','balanced'];
  const defCosts = defaultConfig().ampCosts;

  // Widened 9 Jun after stab=2 + objective-push dropped MW to 62%: sweep pinned at
  // integrity=12 (max) and ampMult=0.4 (min), so push the grid toward more integrity
  // headroom, cheaper amp, and an easier reqBase to claw MW back toward ~80%.
  const grid = {
    reqBase:      [0.6, 0.7, 0.8],
    reqEraSlope:  [0.4, 0.5, 0.6],
    integrity4p:  [12,  14,  16 ],
    ampCostMult:  [0.35, 0.4, 0.45],
  };
  const configs = buildGrid(grid);
  console.log(`Sweep: ${configs.length} configs × ${G} games × [4p + 5p]`);

  let best = null;
  const all = [];

  for (let ci=0; ci<configs.length; ci++) {
    const params = { ...configs[ci] };
    const cfg    = { ...defaultConfig(), ...params };
    cfg.integrity5p = Math.round(cfg.integrity4p * 1.2);
    const mult   = params.ampCostMult || 1.0;
    cfg.ampCosts = defCosts.map(c=>Math.max(1,Math.round(c*mult)));
    delete cfg.ampCostMult;

    const r4=[],r5=[];
    for (let g=0; g<G; g++) {
      r4.push(playGame(4, cfg, POLICIES_MIX, g+ci*1000, false));
      r5.push(playGame(5, cfg, POLICIES_MIX, g+ci*1000+500000, false));
    }

    const m4=computeMetrics(r4,4), m5=computeMetrics(r5,5);
    const f =fitness(m4,m5);
    const entry={ params, cfg, m4, m5, fitness:f, rawParams:{...params} };
    all.push(entry);
    if (!best || f<best.fitness) best=entry;

    process.stdout.write(
      `  [${String(ci+1).padStart(3)}/${configs.length}]`+
      ` mw4=${(m4.mwRate*100).toFixed(0)}%`+
      ` r4=${m4.avgRounds.toFixed(1)}`+
      ` oc=${(m4.ocPerExp*100).toFixed(0)}%`+
      ` co=${(m4.coRate*100).toFixed(0)}%`+
      ` fit=${f.toFixed(3)}`+
      ` [best=${best.fitness.toFixed(3)}]\n`
    );
  }
  all.sort((a,b)=>a.fitness-b.fitness);
  return { best:all[0], top5:all.slice(0,5), all };
}

// ── OUTPUT WRITERS ────────────────────────────────────────────────────────────
function fmt2(n) { return isNaN(n)?'?':n.toFixed(2); }
function fmtp(n) { return isNaN(n)?'?':(n*100).toFixed(1)+'%'; }

function writeResults(sweep, traces) {
  const { cfg, m4, m5 } = sweep.best;
  let s = `# Balance Simulator — Results\n\n_Generated ${new Date().toISOString()}_\n\n`;

  s += `## TL;DR\n\n`;
  s += `| | 4-player | 5-player | Target |\n|---|---|---|---|\n`;
  s += `| Many Worlds success | ${fmtp(m4.mwRate)} | ${fmtp(m5.mwRate)} | ~50% (rare/sacred) |\n`;
  s += `| Deep-objective completion | ${m4.deepComplete!=null?fmtp(m4.deepComplete):'?'} | ${m5.deepComplete!=null?fmtp(m5.deepComplete):'?'} | ~40% |\n`;
  s += `| Avg rounds | ${fmt2(m4.avgRounds)} | ${fmt2(m5.avgRounds)} | 8–12 |\n`;
  s += `| Wall clock (est.) | ${m4.wallClock} min | ${m5.wallClock} min | 60–120 min |\n`;
  s += `| Overclock rate | ${fmtp(m4.ocPerExp)} | ${fmtp(m5.ocPerExp)} | ~30–40% |\n`;
  s += `| Cash-out rate | ${fmtp(m4.coRate)} | ${fmtp(m5.coRate)} | ~30–50% |\n`;
  s += `| Collapse rate | ${fmtp(m4.collapseRate)} | ${fmtp(m5.collapseRate)} | ≤50% |\n`;
  s += `| Avg shutdowns (table total) | ${fmt2(m4.avgShutdown)} | ${fmt2(m5.avgShutdown)} | pusher-heavy → see ↓ |\n`;
  s += `| Avg papers | ${fmt2(m4.avgPapers)} | ${fmt2(m5.avgPapers)} | 3–8 |\n`;
  s += `| Score spread | ${fmt2(m4.avgSpread)} | ${fmt2(m5.avgSpread)} | >3 |\n\n`;

  s += `### Shutdowns by archetype (4-player, per player per game)\n\n`;
  s += `_The gamble should concentrate in the pusher, not spread evenly._\n\n`;
  s += `| Archetype | Shutdowns/game | Overclocks/game | Plunders/game | OC rate | Cash-out rate |\n|---|---|---|---|---|---|\n`;
  for (const k of ['greedy','balanced','cautious']) {
    const b = m4.byPolicy[k]; if (!b) continue;
    s += `| ${k} | ${fmt2(b.shutdownsPerGame)} | ${fmt2(b.overclocksPerGame)} | ${fmt2(b.plundersPerGame)} | ${fmtp(b.ocRate)} | ${fmtp(b.coRate)} |\n`;
  }
  s += `\n`;

  s += `## Recommended Equations\n\n`;
  s += `### Step Requirements\n\n`;
  s += `\`req(eraIdx, stepIdx) = max(1, round(${cfg.reqBase} + ${cfg.reqEraSlope}×eraIdx + ${cfg.reqStepSlope}×stepIdx))\`\n\n`;
  s += `| Era | depth | step0 | step1 | step2 | step3 |\n|---|---|---|---|---|---|\n`;
  for (let e=0; e<7; e++) {
    const r = [0,1,2,3].map(si=>Math.max(1,Math.round(cfg.reqBase+cfg.reqEraSlope*e+cfg.reqStepSlope*si)));
    s += `| ${ERAS[e]} | ${e+1} | ${r.join(' | ')} |\n`;
  }
  s += `\n### Rewards\n\n`;
  s += `- Find step cash: \`${cfg.cashFindBase} + ${cfg.cashFindSlope}×eraIdx\` → Recent: ${cfg.cashFindBase}, Prehistoric: ${Math.round(cfg.cashFindBase+cfg.cashFindSlope*5)}\n`;
  s += `- Objective rep: \`${cfg.repObjBase} + ${cfg.repObjSlope}×eraIdx\` → Recent: ${cfg.repObjBase}, Prehistoric: ${Math.round(cfg.repObjBase+cfg.repObjSlope*5)}\n`;
  s += `- Publishing an artefact pays its **printed Reputation** (= the objective rep, ${cfg.repObjBase}–${Math.round(cfg.repObjBase+cfg.repObjSlope*5)} by era); historian experience does **not** modify it (DECIDED 10 Jun)\n\n`;
  s += `### Costs\n\n`;
  s += `- Postdocs: ${cfg.postdocCostMin}–${cfg.postdocCostMax} | Experts: ${cfg.expertCost}\n`;
  s += `- Amplifier: [${cfg.ampCosts.join(', ')}] (levels 1→2 through 6→7, total ${cfg.ampCosts.reduce((a,b)=>a+b,0)} cash)\n`;
  s += `- Capacitor: [${cfg.capCosts.join(', ')}]\n`;
  s += `- Collimator: [${cfg.colCosts.join(', ')}]\n`;
  s += `- Stabiliser: [${cfg.stabCosts.join(', ')}]\n`;
  s += `- Timeline Integrity: ${cfg.integrity4p} (4p) / ${cfg.integrity5p} (5p)\n\n`;

  s += `## Sample Game Traces (4-player)\n\n`;
  for (let i=0; i<traces.length; i++) {
    const t = traces[i];
    s += `### Trace ${i+1} — ends: ${t.endReason}, ${t.rounds} rounds\n\n`;
    s += `Scores: ${t.scores.join(' / ')}\n\n`;
    s += `| Rnd | P | Policy | Era | Team | Cash | Rep | Instab | Integr | Amp | Expedition |\n`;
    s += `|-----|---|--------|-----|------|------|-----|--------|--------|-----|------------|\n`;
    for (const r of (t.trace||[]).slice(0,50)) {
      s += `| ${r.round} | ${r.player} | ${r.policy} | ${r.era} | ${r.teamSz} | ${r.cash} | ${r.rep} | ${r.instab} | ${r.integrity} | ${r.amp} | ${r.exp} |\n`;
    }
    if ((t.trace?.length||0)>50) s += `_(${t.trace.length-50} rows omitted)_\n`;
    s += '\n';
  }

  s += `## What This Does NOT Tell Us\n\n`;
  s += `- **Fun is not modelled.** A bot that maximises EV ≠ a human having a good time.\n`;
  s += `- **No alliance mechanic.** Bots attempt Many Worlds solo. Human tables will coordinate; real MW success rate is likely higher.\n`;
  s += `- **No negotiation.** The Negotiate phase (cash loans, deals) is absent.\n`;
  s += `- **Bots don't respond to social dynamics** — a trailing human will take wild risks; a bot stays policy-compliant.\n`;
  s += `- **Paper playtest is the ground truth.** These numbers are starting points, not proof of balance.\n`;

  fs.writeFileSync('sim/RESULTS.md', s, 'utf8');
  console.log('Wrote sim/RESULTS.md');
}

function writeAssumptions(cfg) {
  let s = `# Simulator Assumptions\n\n_Every modelling decision that needs Drew's eye._\n\n`;

  s += `## Resolution model — REFILL (corrected 10 Jun 2026)\n`;
  s += `- The hand is **topped up to [2×roster + ${cfg.handBase}] at the start of every step**; when the draw\n`;
  s += `  deck empties it is refilled by **reshuffling the discard** (played cards + live Trace cards). Overclock\n`;
  s += `  draws beyond the cap. _This replaced an earlier bug where the hand was drawn ONCE and depleted across\n`;
  s += `  all steps (matching the literal text of the post-whiteboard note but not Drew's intent)._\n`;
  s += `- "Bag = stamina / no reshuffle" is **dropped**; stamina now lives in accumulating Trace pollution +\n`;
  s += `  instability climbing toward shutdown.\n`;
  s += `- **handBase = ${cfg.handBase} is needed:** at handBase 0 (\`[2×roster]\`) deep completion craters to ~21% and\n`;
  s += `  cash-out spikes to ~62% (constant folding). The +2 is what makes deep ladders climbable.\n\n`;

  s += `## Experiment B — era step-scaling (DECIDED 10 Jun 2026)\n`;
  s += `- Deeper eras are **longer ladders**: step bands ${JSON.stringify(cfg.eraStepBands)} (eras 0..5).\n`;
  s += `- **Spoils only on the second-to-last step** (every earlier step pays nothing); the last step is the objective.\n`;
  s += `- Req curve is gentle: \`max(1, round(${cfg.reqBase} + ${cfg.reqEraSlope}×era + ${cfg.reqStepSlope}×step))\` → shallow req-1,\n`;
  s += `  deep req-2. **Caveat:** "danger spikes" can't be much higher than req-2 — a single high-req step still\n`;
  s += `  outruns the hand, so danger should bite some *other* way (instability / consequence), not via big reqs.\n`;
  s += `- **Many Worlds is the win brake:** ${cfg.mwSteps} steps × ${cfg.mwReqPerStep} pips — tuned to land MW success ~50% (rare multiverse) without\n`;
  s += `  touching the era economy.\n\n`;

  s += `## Plunder / record & the greed→collapse dial (10 Jun 2026)\n`;
  s += `- **Field decision (per archetype):** _cautious_ plunders only DOOMED artefacts; _balanced_ considers plunder if integrity ≥60% OR doomed; _greedy_ always considers. Sub-decision: behind on rep → **record** (clean), behind on cash → **plunder**.\n`;
  s += `- **Plundering a NON-doomed artefact scars Timeline Integrity** by \`${JSON.stringify(cfg.plunderImprint)}\` by era (deeper = worse) — the shared half of the greed dial. **Doomed artefacts grab clean** (no scar, no disrepute).\n`;
  s += `- **At the desk a held artefact is published** (Reputation) **or sold** (Cash − disrepute) **if cash-starved** (model b — papers stay alive).\n`;
  s += `- **Result (per game, 4p):** greedy ~1.2 plunders, balanced ~0.5, cautious ~0.1. Greedy-heavy tables collapse far more (matrix: ~35–43% vs balanced ~20%) — the ethical axis is now *in the sim*, not just the fiction.\n\n`;

  s += `## Cross-count balance (the --matrix verdict)\n`;
  s += `- Std mix holds **MW ~79–84% across 3/4/5 players** with collapse ~16–24% and deep ~38–44% — little variance by player count. **2p plays a touch easier, 6p a touch harder**, both still work (FYI, not tuning targets).\n`;
  s += `- Composition matters thematically: **all-greedy** trends to collapse, **all-balanced** is the healthiest game, **all-cautious is degenerate** (the bot never leaves Recent and bashes MW — a bot artifact, not a game flaw). Real tables sit near the std mix.\n\n`;

  s += `## Starting State\n`;
  s += `- No team, 2 cash, **Amp 2** (Recent + Modern open turn one — DECIDED 9 Jun, Experiment A), Cap/Col 1, **Stabiliser 2** (gamble — DECIDED 9 Jun).\n`;
  s += `- Permanent **2/2/2 player base** in every bag. Spec §3 calls this "provisional, a tuning knob." **Flagged.**\n\n`;
  s += `## Era pacing — Experiment A (DECIDED 9 Jun 2026)\n`;
  s += `- Starting at Amp 1 pinned even the fastest (greedy) player in Recent for ~4 rounds before the eras opened, then rushed the middle — the "slow start, sudden end-game" smell.\n`;
  s += `- **Amp 2 fixes the opening** (open in Modern, mid-eras reached ~1 round sooner) at negligible balance cost (MW 75→71%, rounds 10→9.4, both still on target).\n`;
  s += `- **Still open:** the *late* plateau (rounds 8–12 hover at era 4–5 waiting for E+P to mature for Amp 7) is a separate end-game-gate pacing issue, not addressed by A.\n\n`;

  s += `## Home Actions — DECIDED (9 Jun 2026)\n\n`;
  s += `**Each researcher at home gets ONE action** (write paper OR upgrade module OR clear instability). Drew's call. Team size therefore drives home productivity as well as expedition strength.\n\n`;

  s += `## AI Policies\n\n`;
  s += `Three bots mixed across players:\n`;
  s += `1. **Greedy** (P0): full cap roster, deepest era, hire to fill profession gaps, Physicist upgrades Cap first. **Pushes the objective into shutdown range when ≤3 short** (the reckless gambler).\n`;
  s += `2. **Cautious** (P1): 1-person roster, never overclocks, always record, always Recent era, buys missing professions first.\n`;
  s += `3. **Balanced** (P2+): ~75% cap roster, one era back from max, buys missing professions first. **Gambles the objective only when 1 short**, otherwise stops before a shutdown.\n\n`;
  s += `**Key gaps:** bots don't alliance for MW (solo only), don't negotiate, don't react to scores.\n\n`;

  s += `## Era Card Shape\n`;
  s += `- ${cfg.stepsMin}–${cfg.stepsMax} steps per card (uniform). Spec says "2+ steps" — upper bound chosen.\n`;
  s += `- ${(cfg.dangerChance*100).toFixed(0)}% of steps are forced Grit (danger). Spec: "danger steps open Grit."\n`;
  s += `- ${(cfg.profLockChance*100).toFixed(0)}% of Insight steps are Historian-locked; same for Craft→Engineer. Physicist has no per-step lock. Spec: "some steps profession-locked (knowledge)" — Physicist gating is at the module level only.\n`;
  s += `- All objectives are artefacts (record-vs-plunder choice). Spec implies this; confirmed.\n\n`;

  s += `## Experience & Many Worlds Gate — DECIDED (9 Jun 2026)\n`;
  s += `- A researcher's card shows **3 experience boxes, but box 1 is always pre-filled** (aesthetic). So there are **2 earnable boxes** → **+2 pip cap**, matching constraints.md. The "three boxes" of spec §6 is the display, not three *earnable* fills — no extra gate, no game-length change.\n`;
  s += `- Each earnable box = +1 to all skills; **MW requires Amp 7 = Engineer + Physicist both fully experienced (both earnable boxes filled).**\n`;
  s += `- **Instability clearing does NOT grant exp.** Spec §7: "used — on an expedition, to write a paper, or to upgrade the machine (not to clear instability)."\n\n`;

  s += `## Papers — DECIDED (10 Jun 2026)\n`;
  s += `- **Publishing pays the artefact's PRINTED reputation** (= the objective's rep value, ${cfg.repObjBase}–${Math.round(cfg.repObjBase+cfg.repObjSlope*5)} by era). **Historian experience does NOT modify it** — any historian at base writes it up; experience grows their pips, not the paper's worth.\n`;
  s += `- This matches Record (which always paid the card's rep) and removes the sim's old flat "paperRepBase + boxes" invention. Deep finds are now worth their true significance; "Papers dominate held artefacts (1 each)" still holds.\n\n`;

  s += `## Many Worlds\n`;
  s += `- ${cfg.mwSteps} steps × ${cfg.mwReqPerStep} pips each. **Primary game-length tuning knob.**\n`;
  s += `- Failed MW: −${cfg.mwIntegDmgFail} integrity. Spec says "4–5" — **reduced to ${cfg.mwIntegDmgFail} after 4 caused cascade collapse in every game.** Confirm with Drew.\n`;
  s += `- **MW roster: all researchers sent** (not just cap-limit). Thematically: everyone for the final push. Massively improves success rate — without this, MW was ~5%.\n`;
  s += `- Bots attempt MW solo. Real tables will alliance. MW success rate is probably 10–20% higher in practice.\n\n`;
  s += `## Stabiliser & Shutdowns — DECIDED: startStab=2 (9 Jun 2026)\n`;
  s += `- **startStab=2 (locked):** overclock is a real gamble. A carried-over instability plus an objective push can trip a shutdown (instability ≥ stab → integrity −1, consequence draw, expedition aborts).\n`;
  s += `- **The gamble is tuned to concentrate in the pusher** (Drew's intent — one reckless player bricks often, the careful ones rarely):\n`;
  s += `  - **Greedy** pushes the *objective* into shutdown range when ≤3 short → **~2.3 shutdowns/game.**\n`;
  s += `  - **Balanced** gambles the objective only when 1 short → **~1.4 shutdowns/game.**\n`;
  s += `  - **Cautious** never overclocks → **0 shutdowns** (pure by character).\n`;
  s += `- Pushing greedy higher (also gambling the rich find step) was tried and **reverted** — it bricks before reaching the objective, dropping MW to ~62% and spiking collapse to ~38%. 2.3/1.4/0 is the sweet spot.\n`;
  s += `- The old "zero shutdowns" was a bot blind spot (no bot ever pushed into one), never evidence the gamble was safe.\n\n`;
  s += `## Cash-out — it's a cautious-bot artifact\n`;
  s += `- The headline cash-out rate (~42%) is dragged up by the **cautious bot folding ~60%** of expeditions (it never overclocks, so it folds the instant it draws short). The pushers fold far less: **greedy ~35%, balanced ~44%.**\n`;
  s += `- A human "cautious" player clears easy steps a timid bot folds, so **real-table cash-out will sit below the simulated figure.** Don't over-tune to this number.\n\n`;
  s += `## Game Length & the overclock frequency (watch items)\n`;
  s += `- **Experiment B runs longer: ~13 rounds, ~157 min (4p) at 3 min/player-turn**, and deep expeditions\n`;
  s += `  (5–6 steps) take longer per turn too. This is the cost of the gentle-ladder escalation — a long, epic\n`;
  s += `  game, over the original 60–120 target. Drew accepted this trade for the richer deep-era experience.\n`;
  s += `- **Overclock frequency dropped to ~21%** (vs ~35% pre-B): with a full hand refilled each step you're short\n`;
  s += `  less often, so the gamble fires less. Cash-out (~37%) keeps push-your-luck present, but if the overclock\n`;
  s += `  thrill feels thin in play, nudge the req curve up a touch to force more short-by-one moments.\n`;
  s += `- **Length levers if needed:** shrink the deep bands (4–5 not 5–6), drop an era tier, or ease the Amp-7 gate.\n\n`;

  s += `## Turn-1 Seeding\n`;
  s += `- Each player buys first researcher if affordable (2 cash start = sometimes possible), then plans a card. Spec: "Turn-1 seeded gentle Recent starter (optional)" — modelled as standard plan draw from Recent (Amp 1 restricts to Recent anyway).\n\n`;

  s += `## Retirement / Parting Gift\n`;
  s += `- Not modelled. Bots don't deliberately retire maxed researchers. Parting Gift rep not awarded. **Understates the long-game team-legacy arc.** Low priority for first-contact print.\n\n`;

  s += `## Priority Review List\n`;
  s += `_Home-action model, exp-box count, and startStab are now DECIDED (see sections above)._\n`;
  s += `1. **5-player wall clock** (~149 min @ 3 min/turn) — the one metric still over target. Lower mwSteps or raise home income if it bites in play.\n`;
  s += `2. **Shutdowns at ~4/game** — top of the 1–4 band. Tighten the greedy objective-push to "≤1 short" for ~2–3 if too punishing.\n`;
  s += `3. **Paper rep base** — raise to 4? (Fresh historian currently ${cfg.paperRepBase}.)\n`;
  s += `4. **MW difficulty** (${cfg.mwReqPerStep} pips × ${cfg.mwSteps} steps) — adjust if game length is off.\n`;
  s += `5. **Amplifier total cost** (${cfg.ampCosts.reduce((a,b)=>a+b,0)} cash 1→7) — feasible in ~10 rounds?\n`;

  fs.writeFileSync('sim/ASSUMPTIONS.md', s, 'utf8');
  console.log('Wrote sim/ASSUMPTIONS.md');
}

function writeProgress(sweep) {
  const b = sweep.best;
  let s = `# Sim Progress\n\n## Status: Complete\n\n`;
  s += `- ${sweep.all.length} configs swept\n`;
  s += `- Best fitness: ${b.fitness.toFixed(3)}\n`;
  s += `- 4p MW rate: ${fmtp(b.m4.mwRate)} | avg rounds: ${fmt2(b.m4.avgRounds)} | wall clock: ${b.m4.wallClock} min\n`;
  s += `- 5p MW rate: ${fmtp(b.m5.mwRate)} | avg rounds: ${fmt2(b.m5.avgRounds)} | wall clock: ${b.m5.wallClock} min\n\n`;
  s += `## Best Params\n\n\`\`\`json\n${JSON.stringify(b.rawParams, null, 2)}\n\`\`\`\n\n`;
  s += `## Next Steps (for Drew)\n`;
  s += `- Home-action / exp-box / startStab calls all made (9 Jun) — see ASSUMPTIONS.md.\n`;
  s += `- **Paper playtest with the recommended config** — the real test; sim gives the starting grid, not proof of fun.\n`;
  s += `- Watch 5-player length and shutdown frequency in play; both have a known dial if they bite.\n`;
  fs.writeFileSync('sim/PROGRESS.md', s, 'utf8');
  console.log('Wrote sim/PROGRESS.md');
}

// ── LOCKED CONFIG (the recommended balance point, refill model, 10 Jun 2026) ──
// The full Experiment-B config on the corrected refill resolution loop:
// scaled step bands · penultimate-only spoils · 2×roster+2 hand · MW 6×4 gauntlet.
function lockedConfig() {
  // defaultConfig now holds Drew's full hand-set spec (10 Jun), so the locked config is just that.
  return { ...defaultConfig() };
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
const args   = process.argv.slice(2);
const quick  = args.includes('--quick');
const trace1 = args.includes('--trace1');
const analyze= args.includes('--analyze');
const expA   = args.includes('--expA');
const expB   = args.includes('--expB');
const retuneB= args.includes('--retuneB');
const matrix = args.includes('--matrix');
const retuneMW = args.includes('--retuneMW');
const pushprobe = args.includes('--pushprobe');

if (pushprobe) {
  // Does the game survive players who LOVE the gamble? Pit the reckless archetype against baseline.
  const cfg = lockedConfig();
  const G = 400;
  const comps = [
    ['std-mix (base)', ['greedy','cautious','balanced']],
    ['1 reckless',     ['reckless','cautious','balanced','greedy']],
    ['reckless+bal',   ['reckless','balanced']],
    ['all reckless',   ['reckless']],
  ];
  console.log('=== Push probe (4p): what happens when players embrace the overclock ===\n');
  console.log('composition      |  MW  | coll | OC% | cash | shutdn/game | reckless OC% / shut');
  console.log('-----------------|------|------|-----|------|-------------|--------------------');
  for (const [name, assign] of comps) {
    const res=[];
    for (let g=0; g<G; g++) res.push(playGame(4, cfg, assign, g+424242, false));
    const m = computeMetrics(res, 4);
    const r = m.byPolicy.reckless;
    const recStr = r ? `${(r.ocRate*100).toFixed(0)}% / ${r.shutdownsPerGame.toFixed(1)}` : '—';
    console.log(
      `${name.padEnd(16)} | ${(m.mwRate*100).toFixed(0).padStart(3)}% | ${(m.collapseRate*100).toFixed(0).padStart(3)}% | `+
      `${(m.ocPerExp*100).toFixed(0).padStart(2)}% | ${(m.coRate*100).toFixed(0).padStart(3)}% | `+
      `${m.avgShutdown.toFixed(1).padStart(5)}       | ${recStr}`
    );
  }
  process.exit(0);
}

if (args.includes('--dumpconfig')) {
  // Snapshot the live config to a JSON reference (a jumping-off point for tweaking).
  const out = {
    _meta: {
      label: 'best-2026-06-10c',
      note: 'MULTIVERSE-IS-RARE config. MW ~52% (5×5 gauntlet, failed-MW −2) so the win is sacred; '
          + 'endgame spread ≈ 52% triumph / 36% collapse / 12% quiet legacy. Papers ~17/game (record = '
          + 'a paper). Deep ~50%, ~16-17 rounds. Overclock baseline ~19% is a bot-conservatism floor — '
          + 'a reckless player pushes 60%+ and bricks 2-4×/game (--pushprobe); the gamble is a CHOICE. '
          + 'TODO riding alongside: make the non-MW endings (collapse, legacy) FEEL worthy (flavour + reflection).',
      generated: '2026-06-10',
    },
    config: lockedConfig(),
  };
  fs.writeFileSync('sim/best-config.json', JSON.stringify(out, null, 2));
  console.log('Wrote sim/best-config.json');
  process.exit(0);
}

// Era-by-round curve for a given config (per-policy avg era index + avg amp)
function computeEraCurve(cfg, G, seedBase) {
  const byRoundPol = {};
  for (let g=0; g<G; g++) {
    const r = playGame(4, cfg, ['greedy','cautious','balanced'], g+seedBase, false, true);
    for (const e of r.eraLog) {
      ((byRoundPol[e.round] ||= {})[e.policy] ||= { sumEra:0, n:0, sumAmp:0 });
      const c = byRoundPol[e.round][e.policy];
      c.sumEra += e.eraIdx; c.n++; c.sumAmp += e.amp;
    }
  }
  return byRoundPol;
}

if (expA) {
  // Experiment A: does starting at Amp 2 compress the Recent-bound crawl?
  // Re-balance reqBase/integrity/ampCost around each startAmp, then compare.
  const G = 300;
  const knobGrid = buildGrid({ reqBase:[0.6,0.8,1.0], integrity4p:[12,14,16], ampCostMult:[0.45,0.6] });
  const MIX = ['greedy','cautious','balanced'];

  function bestAt(startAmp) {
    let best = null;
    for (const k of knobGrid) {
      const cfg = { ...defaultConfig(), reqBase:k.reqBase, reqEraSlope:0.4,
                    integrity4p:k.integrity4p, startAmp };
      cfg.integrity5p = Math.round(cfg.integrity4p*1.2);
      cfg.ampCosts    = defaultConfig().ampCosts.map(c=>Math.max(1,Math.round(c*k.ampCostMult)));
      const r4=[], r5=[];
      for (let g=0; g<G; g++) { r4.push(playGame(4,cfg,MIX,g+11,false)); r5.push(playGame(5,cfg,MIX,g+99777,false)); }
      const m4=computeMetrics(r4,4), m5=computeMetrics(r5,5), f=fitness(m4,m5);
      if (!best || f<best.f) best = { cfg, m4, m5, f, k };
    }
    return best;
  }

  console.log('=== Experiment A: startAmp 1 vs 2 (each re-balanced) ===\n');
  const results = {};
  for (const sa of [1,2]) results[sa] = bestAt(sa);

  console.log('startAmp | MW4  | MW5  | rounds | collapse | cashout | shutdn | knobs');
  console.log('---------|------|------|--------|----------|---------|--------|------');
  for (const sa of [1,2]) {
    const b = results[sa], m = b.m4;
    console.log(
      `   ${sa}     | ${(m.mwRate*100).toFixed(0).padStart(3)}% | ${(b.m5.mwRate*100).toFixed(0).padStart(3)}% | `+
      `${m.avgRounds.toFixed(1).padStart(5)}  | ${(m.collapseRate*100).toFixed(0).padStart(6)}%  | `+
      `${(m.coRate*100).toFixed(0).padStart(5)}%  | ${m.avgShutdown.toFixed(1).padStart(5)}  | `+
      `req${b.k.reqBase} int${b.k.integrity4p} amp×${b.k.ampCostMult}`
    );
  }

  console.log('\n=== Era reached by round — greedy (leading edge), amp1 vs amp2 ===');
  console.log('round | startAmp1 era (amp) | startAmp2 era (amp)');
  console.log('------|---------------------|--------------------');
  const c1 = computeEraCurve(results[1].cfg, G, 31313);
  const c2 = computeEraCurve(results[2].cfg, G, 31313);
  const g = (curve,rd) => { const c=curve[rd]&&curve[rd].greedy; return c&&c.n ? `${(c.sumEra/c.n).toFixed(1)} (a${(c.sumAmp/c.n).toFixed(1)})` : '   -   '; };
  for (let rd=1; rd<=12; rd++) {
    if (!c1[rd] && !c2[rd]) continue;
    console.log(`${String(rd).padStart(5)} | ${g(c1,rd).padEnd(19)} | ${g(c2,rd)}`);
  }

  process.exit(0);
}

if (expB) {
  // Experiment B: era step-scaling. Show what happens to objective completion when deep
  // eras get more steps WITHOUT re-tuning requirements (expected: deep cards go uncompletable).
  const G = 400;
  const MIX = ['greedy','cautious','balanced'];
  const base   = lockedConfig();
  const scaled = { ...lockedConfig(), eraStepBands: [[2,3],[2,3],[3,4],[3,4],[5,6],[5,6]] };

  function run(cfg) {
    const res=[], log=[];
    for (let g=0; g<G; g++) {
      const r = playGame(4, cfg, MIX, g+222333, false, true);
      res.push(r); for (const e of r.eraLog) if (e.eraIdx<=5) log.push(e);
    }
    const m = computeMetrics(res, 4);
    const band = los => {
      const es = log.filter(e=>los.includes(e.eraIdx)), n = es.length||1;
      return { n: es.length, succ: es.filter(e=>e.success).length/n,
               avgCleared: es.reduce((s,e)=>s+e.cleared,0)/n,
               avgSteps:   es.reduce((s,e)=>s+e.steps,0)/n };
    };
    return { m, shallow:band([0,1]), mid:band([2,3]), deep:band([4,5]) };
  }

  const U = run(base), S = run(scaled);

  console.log('=== Experiment B: era step-scaling (current reqs, UNtuned) ===\n');
  console.log('variant | MW%  | rounds | collapse | cashout | deep-obj completion');
  console.log('--------|------|--------|----------|---------|--------------------');
  const row = (lab,B) =>
    `${lab.padEnd(7)} | ${(B.m.mwRate*100).toFixed(0).padStart(3)}% | ${B.m.avgRounds.toFixed(1).padStart(5)}  | `+
    `${(B.m.collapseRate*100).toFixed(0).padStart(6)}%  | ${(B.m.coRate*100).toFixed(0).padStart(5)}%  | `+
    `${(B.deep.succ*100).toFixed(0)}%`;
  console.log(row('uniform', U));
  console.log(row('scaled',  S));

  console.log('\n=== Objective completion by era band (succ% — avg steps cleared / steps on card) ===');
  console.log('band        | uniform              | scaled');
  console.log('------------|----------------------|----------------------');
  for (const [name,key] of [['shallow 0-1','shallow'],['mid 2-3','mid'],['deep 4-5','deep']]) {
    const u=U[key], s=S[key];
    console.log(`${name.padEnd(11)} | ${(u.succ*100).toFixed(0).padStart(3)}%  (${u.avgCleared.toFixed(1)} / ${u.avgSteps.toFixed(1)})      | `+
                `${(s.succ*100).toFixed(0).padStart(3)}%  (${s.avgCleared.toFixed(1)} / ${s.avgSteps.toFixed(1)})`);
  }
  process.exit(0);
}

if (retuneB) {
  // Re-tune for the new reward model (penultimate-only spoils + scaled step bands).
  // Levers: flatten/lower per-step reqs (gentle ladder), boost the lone find payout.
  // Target: MW ~75%, deep-objective completion ~40%, rounds 8-14, collapse manageable.
  const G = 200;
  const MIX = ['greedy','cautious','balanced'];
  const BANDS = [[2,3],[2,3],[3,4],[3,4],[5,6],[5,6]];
  // MW-brake pass: lock the deep-completable era config (handBase 2, era-slope 0.2 → deep ~40%),
  // then brake MW success to ~75% via the Many Worlds card itself (steps × pips) — not the economy.
  const grid = buildGrid({
    mwSteps:      [5, 6, 7],     // pin the MW gauntlet length for ~75% win rate
    mwReqPerStep: [4],
    ampCostMult:  [0.6, 0.8],    // secondary progression brake
  });

  const mkCfg = p => {
    const cfg = { ...lockedConfig(), eraStepBands: BANDS,
      reqBase:0.6, reqEraSlope:0.2, reqStepSlope:0,
      findPayoutMult:1.0, handPerResearcher:2, handBase:2,
      mwSteps:p.mwSteps, mwReqPerStep:p.mwReqPerStep,
      integrity4p:14, integrity5p:17 };
    cfg.ampCosts = defaultConfig().ampCosts.map(c=>Math.max(1,Math.round(c*p.ampCostMult)));
    cfg.capCosts = defaultConfig().capCosts.map(c=>Math.max(1,Math.round(c*0.6)));
    return cfg;
  };

  function evalCfg(cfg) {
    const r4=[], r5=[], deepLog=[];
    for (let g=0; g<G; g++) {
      const a = playGame(4, cfg, MIX, g+555, false, true);
      r4.push(a); for (const e of a.eraLog) if (e.eraIdx>=4 && e.eraIdx<=5) deepLog.push(e);
      r5.push(playGame(5, cfg, MIX, g+888777, false));
    }
    const m4=computeMetrics(r4,4), m5=computeMetrics(r5,5);
    const deep = deepLog.length ? deepLog.filter(e=>e.success).length/deepLog.length : 0;
    return { m4, m5, deep };
  }
  function fit(e) {
    const pen  = (a,t,w)=>w*Math.abs(a-t)/Math.max(t,0.01);
    const band = (a,lo,hi,w)=>w*(a<lo?lo-a:a>hi?a-hi:0)/hi;
    return pen(e.m4.mwRate,0.75,3) + pen(e.m5.mwRate,0.75,3)
         + pen(e.deep,0.40,3)
         + band(e.m4.avgRounds,8,14,1.5) + band(e.m5.avgRounds,8,14,1.5)
         + pen(e.m4.coRate,0.40,1)
         + (e.m4.collapseRate>0.45 ? (e.m4.collapseRate-0.45)*4 : 0);
  }

  const results = grid.map(p => { const e=evalCfg(mkCfg(p)); return { p, e, f:fit(e) }; });
  results.sort((a,b)=>a.f-b.f);

  console.log('=== Re-tune B: configs (scaled bands + penultimate spoils) ===\n');
  console.log('rk | mwStp mwReq amp  | MW4 MW5 | rnd  | deep | coll cash | fit  (refill, handBase 2)');
  console.log('---|------------------|---------|------|------|-----------|-----');
  results.slice(0,12).forEach((r,i) => {
    const {p,e}=r;
    console.log(
      `${String(i+1).padStart(2)} | ${p.mwSteps}     ${p.mwReqPerStep}     ${p.ampCostMult} | `+
      `${(e.m4.mwRate*100).toFixed(0).padStart(3)}%${(e.m5.mwRate*100).toFixed(0).padStart(4)}% | `+
      `${e.m4.avgRounds.toFixed(1).padStart(4)} | ${(e.deep*100).toFixed(0).padStart(3)}% | `+
      `${(e.m4.collapseRate*100).toFixed(0).padStart(3)}%${(e.m4.coRate*100).toFixed(0).padStart(4)}% | ${r.f.toFixed(2)}`
    );
  });
  process.exit(0);
}

if (retuneMW) {
  // Re-tune MW success to ~75% on the STD MIX averaged over 3/4/5 players, after the era-scaled
  // plunder-imprint raised the integrity drain. Levers: integrity pool, MW length, failed-MW cost.
  const MIX = ['greedy','cautious','balanced'];
  const G = 250;
  // MW is 5×5 (~47%). Sweep the failed-MW penalty: it splits the non-triumph endings between
  // COLLAPSE (reality breaks) and LEGACY-timeout (a life well lived, no multiverse). We want a
  // healthy slice of BOTH, not collapse swallowing everything.
  const grid = buildGrid({ mwIntegDmgFail:[1,2,3] });
  const mkCfg = p => ({ ...lockedConfig(), mwIntegDmgFail:p.mwIntegDmgFail });
  const ev = (cfg,n) => { const r=[]; for(let g=0;g<G;g++) r.push(playGame(n,cfg,MIX,g+n*131+cfg.mwIntegDmgFail*97,false)); return computeMetrics(r,n); };
  const avg3 = (a,b,c,k) => (a[k]+b[k]+c[k])/3;
  const results = grid.map(p => {
    const cfg=mkCfg(p), m3=ev(cfg,3), m4=ev(cfg,4), m5=ev(cfg,5);
    const mw=avg3(m3,m4,m5,'mwRate'), coll=avg3(m3,m4,m5,'collapseRate'), rnd=avg3(m3,m4,m5,'avgRounds');
    return { p, mw, coll, legacy:Math.max(0,1-mw-coll), rnd };
  });
  console.log('=== Endgame spread vs failed-MW penalty (5×5 MW, std mix avg 3/4/5p) ===\n');
  console.log('failed-MW | triumph(MW) | collapse | legacy | rnd');
  console.log('----------|-------------|----------|--------|----');
  results.forEach(r => { const {p}=r;
    console.log(`   −${p.mwIntegDmgFail}     |    ${(r.mw*100).toFixed(0).padStart(3)}%     |   ${(r.coll*100).toFixed(0).padStart(3)}%   |  ${(r.legacy*100).toFixed(0).padStart(3)}%  | ${r.rnd.toFixed(1)}`);
  });
  process.exit(0);
}

if (matrix) {
  // The balance matrix: every composition × 2..6 players, on the locked config.
  // Tuning targets are 3/4/5 players; 2 & 6 are FYI (how far the game stretches at the edges).
  const cfg = lockedConfig();
  const G = 200;
  const counts = [2,3,4,5,6];
  const comps = [
    ['std-mix',  ['greedy','cautious','balanced']],
    ['greedy',   ['greedy']],
    ['cautious', ['cautious']],
    ['balanced', ['balanced']],
    ['grd+bal',  ['greedy','balanced']],
    ['grd+cau',  ['greedy','cautious']],
    ['bal+cau',  ['balanced','cautious']],
  ];
  const cells = {};
  comps.forEach(([name,assign], ci) => {
    counts.forEach(n => {
      const res=[], deep=[];
      for (let g=0; g<G; g++) {
        const r = playGame(n, cfg, assign, g + n*100003 + ci*1000003, false, true);
        res.push(r); for (const e of r.eraLog) if (e.eraIdx>=4 && e.eraIdx<=5) deep.push(e);
      }
      const m = computeMetrics(res, n);
      m.deep = deep.length ? deep.filter(e=>e.success).length/deep.length : 0;
      cells[name+'|'+n] = m;
    });
  });

  const grid = (title, fmt) => {
    console.log(`\n=== ${title} ===`);
    console.log('composition |    2      3      4      5      6');
    for (const [name] of comps) {
      let row = name.padEnd(11)+' |';
      for (const n of counts) row += '  '+fmt(cells[name+'|'+n]).padStart(5);
      console.log(row);
    }
  };
  console.log('=== Balance matrix (composition × players), locked config ===');
  console.log('Tuning targets: 3/4/5 players. [2] & [6] are FYI (edge stretch).');
  grid('Many Worlds success %', m=>`${(m.mwRate*100).toFixed(0)}%`);
  grid('Collapse rate %',        m=>`${(m.collapseRate*100).toFixed(0)}%`);
  grid('Avg rounds',             m=>m.avgRounds.toFixed(1));
  grid('Deep-objective compl. %',m=>`${(m.deep*100).toFixed(0)}%`);

  // Headline tuning number: std-mix MW averaged over 3/4/5 players.
  const stdAvg = [3,4,5].reduce((s,n)=>s+cells['std-mix|'+n].mwRate,0)/3;
  console.log(`\n>>> Std-mix MW, avg over 3/4/5 players = ${(stdAvg*100).toFixed(1)}%  (target ~50%, rare multiverse)`);
  process.exit(0);
}

if (analyze) {
  const cfg = lockedConfig();
  const G = 500;

  console.log('=== Composition analysis (4-player, locked config) ===\n');
  const comps = [
    ['standard mix',      ['greedy','cautious','balanced']],
    ['all greedy',        ['greedy']],
    ['all cautious',      ['cautious']],
    ['all balanced',      ['balanced']],
    ['greedy+balanced',   ['greedy','balanced']],
    ['greedy+cautious',   ['greedy','cautious']],
    ['balanced+cautious', ['balanced','cautious']],
  ];
  console.log('composition       |  MW%  | rounds | collapse% | shutdn | winScore');
  console.log('------------------|-------|--------|-----------|--------|---------');
  for (const [name, assign] of comps) {
    const res = [];
    for (let g=0; g<G; g++) res.push(playGame(4, cfg, assign, g+1234567, false));
    const m = computeMetrics(res, 4);
    const winScore = res.reduce((s,r)=>s+Math.max(...r.scores),0)/G;
    console.log(
      `${name.padEnd(17)} | ${(m.mwRate*100).toFixed(0).padStart(4)}% | `+
      `${m.avgRounds.toFixed(1).padStart(5)}  | ${(m.collapseRate*100).toFixed(0).padStart(8)}%  | `+
      `${m.avgShutdown.toFixed(1).padStart(5)}  | ${winScore.toFixed(1).padStart(7)}`
    );
  }

  console.log('\n=== Era progression by round (standard mix) ===');
  console.log('avg era index reached, 0=Recent .. 5=Prehistoric, 6=ManyWorlds; (aN)=avg amp\n');
  const byRoundPol = {};
  for (let g=0; g<G; g++) {
    const r = playGame(4, cfg, ['greedy','cautious','balanced'], g+7654321, false, true);
    for (const e of r.eraLog) {
      ((byRoundPol[e.round] ||= {})[e.policy] ||= { sumEra:0, n:0, sumAmp:0 });
      const c = byRoundPol[e.round][e.policy];
      c.sumEra += e.eraIdx; c.n++; c.sumAmp += e.amp;
    }
  }
  const cellStr = (row,pol) => {
    const c = row && row[pol];
    if (!c || !c.n) return '    -    ';
    return `${(c.sumEra/c.n).toFixed(1)} (a${(c.sumAmp/c.n).toFixed(1)})`;
  };
  console.log('round |   greedy    |  balanced   |  cautious');
  console.log('------|-------------|-------------|-----------');
  for (let rd=1; rd<=12; rd++) {
    const row = byRoundPol[rd]; if (!row) continue;
    console.log(`${String(rd).padStart(5)} | ${cellStr(row,'greedy').padEnd(11)} | ${cellStr(row,'balanced').padEnd(11)} | ${cellStr(row,'cautious')}`);
  }
  process.exit(0);
}

if (trace1) {
  // Run a single 4-player game with full trace and print diagnostics
  const cfg = defaultConfig();
  cfg.ampCosts = cfg.ampCosts.map(c=>Math.max(1,Math.round(c*0.6)));
  const result = playGame(4, cfg, ['greedy','cautious','balanced'], 42, true);
  console.log('=== Single game trace ===');
  console.log('endReason:', result.endReason, '  rounds:', result.rounds);
  console.log('scores:', result.scores, ' MW:', result.mwSuccess);
  console.log('\nTurns (first 80):');
  for (const r of (result.trace||[]).slice(0,80)) {
    console.log(`R${r.round} P${r.player}[${r.policy}] era=${r.era} team=${r.teamSz} amp=${r.amp} cap=${r.cap} stab=${r.stab} cash=${r.cash} rep=${r.rep} inst=${r.instab} integ=${r.integrity} | ${r.exp}`);
  }
  process.exit(0);
}

console.log('=== Time Travel — Balance Simulator ===');

let sweep;
if (args.includes('--sweep')) {
  // Exploratory grid sweep (legacy path; the balance is now hand-tuned via --retuneB).
  const t0 = Date.now();
  sweep = runSweep(quick);
  console.log(`\nSweep complete in ${((Date.now()-t0)/1000).toFixed(1)}s`);
} else {
  // Default: regenerate the docs from the LOCKED (recommended) config.
  const cfg = lockedConfig();
  const MIX = ['greedy','cautious','balanced'];
  const G = quick ? 200 : 500;
  const r4=[], r5=[], deep4=[], deep5=[];
  for (let g=0; g<G; g++) {
    const a = playGame(4, cfg, MIX, g, false, true);
    r4.push(a); for (const e of a.eraLog) if (e.eraIdx>=4 && e.eraIdx<=5) deep4.push(e);
    const b = playGame(5, cfg, MIX, g+500000, false, true);
    r5.push(b); for (const e of b.eraLog) if (e.eraIdx>=4 && e.eraIdx<=5) deep5.push(e);
  }
  const m4=computeMetrics(r4,4), m5=computeMetrics(r5,5);
  m4.deepComplete = deep4.length ? deep4.filter(e=>e.success).length/deep4.length : 0;
  m5.deepComplete = deep5.length ? deep5.filter(e=>e.success).length/deep5.length : 0;
  const best = { cfg, m4, m5, fitness:0, rawParams:{ config:'locked B (refill model)' } };
  sweep = { best, all:[best] };
}

console.log('\nRunning trace samples on locked config...');
const traces = [0,1,2].map(i =>
  playGame(4, sweep.best.cfg, ['greedy','cautious','balanced'], i*999983, true)
);

writeResults(sweep, traces);
writeAssumptions(sweep.best.cfg);
writeProgress(sweep);

const m = sweep.best.m4;
console.log('\n=== Locked config (4p) ===');
console.log(`  MW rate:     ${fmtp(m.mwRate)}`);
console.log(`  Avg rounds:  ${fmt2(m.avgRounds)}`);
console.log(`  Wall clock:  ~${m.wallClock} min`);
console.log(`  OC rate:     ${fmtp(m.ocPerExp)}`);
console.log(`  Cash-out:    ${fmtp(m.coRate)}`);
console.log(`  Collapse:    ${fmtp(m.collapseRate)}`);
console.log('\nSee sim/RESULTS.md  sim/ASSUMPTIONS.md  sim/PROGRESS.md');
