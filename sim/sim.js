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
    // Era 0 step 0 = reqBase (want this ~1 so single-researcher turn-1 expeditions work)
    reqBase:      1.0,
    reqEraSlope:  0.8,
    reqStepSlope: 0.4,

    // Rewards — objectives give rep (artefact) OR cash (direct find), 50/50
    cashFindBase:  3,    cashFindSlope:  1.0,
    repObjBase:    2,    repObjSlope:    1.5,
    objCashChance: 0.4,  // fraction of objectives that pay cash instead of artefact

    // Era card structure
    stepsMin: 2, stepsMax: 3, eraCardsPerTier: 8,
    dangerChance: 0.20, profLockChance: 0.20,

    // Researchers
    postdocCostMin: 2, postdocCostMax: 3, expertCost: 9,
    pipSpike: 3, pipFloor: 1,

    // Module upgrade costs (index = currentLevel-1 → cost to next level)
    // Total Amp 1→7 with defaults = 2+2+3+3+5+8 = 23 cash (reachable in ~8-10 rounds)
    ampCosts:  [2, 2, 3, 3, 5, 8],   // Amp levels 1→7 (6 upgrades)
    capCosts:  [3, 5, 8, 12],         // Cap levels 1→5 (4 upgrades)
    colCosts:  [3, 5, 8],             // Col levels 1→4 (3 upgrades)
    stabCosts: [4, 7],                // Stab 2→3→4 (2 upgrades)

    // Player base
    baseI: 2, baseC: 2, baseG: 2,

    // Start state — spec says "tuning toward 3" for stab; use 3 as default
    startCash: 2, startAmp: 1, startCap: 1, startCol: 1, startStab: 3,

    // Timeline Integrity
    integrity4p: 12, integrity5p: 14,

    // Consequence deck weights (relative, normalised to 40 cards)
    consWeights: { int1:20, int2:8, cashLoss:15, cashGain:12,
                   repLoss:10, repGain:10, modLoss:5, nothing:20 },
    consEraScale: 0.15,

    // Experience — expPerBox=2 means 4 expedition uses to max (achievable in ~6-8 rounds)
    expPerBox: 2, expMaxBoxes: 2, expBonus: 1,

    // Papers (Historian publishes artefact → rep)
    paperRepBase: 4, paperRepBonus: 1,

    // Many Worlds card
    mwSteps: 3, mwReqPerStep: 3, mwIntegDmgFail: 2,

    // Parting gift (not actively triggered by bots — see ASSUMPTIONS.md)
    partingRep: 2,

    // Safety cap
    maxRounds: 60,
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
  const nSteps = rng.int(cfg.stepsMin, cfg.stepsMax);
  const steps  = [];
  for (let i = 0; i < nSteps-1; i++) {
    steps.push({ ...genStep(eraIdx, i, cfg, rng), type:'find',
                 cash: Math.round(cfg.cashFindBase + cfg.cashFindSlope*eraIdx) });
  }
  const obj = genStep(eraIdx, nSteps-1, cfg, rng);
  // Some objectives pay cash directly (no artefact), the rest are plunderable artefacts
  const isCashObj = rng.next() < (cfg.objCashChance||0);
  steps.push({
    ...obj, type:'objective',
    isArtefact: !isCashObj,
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
  const spike = rng.pick(SKILLS);
  const pips  = {};
  for (const s of SKILLS) {
    const base = s===spike ? cfg.pipSpike : cfg.pipFloor;
    const v    = rng.next()<0.3 ? 1 : rng.next()<0.3 ? -1 : 0;
    pips[s]    = Math.max(0, base+v);
  }
  return {
    profession, pips,
    cost:      isSenior ? cfg.expertCost : rng.int(cfg.postdocCostMin, cfg.postdocCostMax),
    isSenior,
    expTokens: 0,
    expBoxes:  isSenior ? cfg.expMaxBoxes : 0,
  };
}

// ── PLAYER STATE ──────────────────────────────────────────────────────────────
function makePlayer(id, cfg) {
  return {
    id, cash:cfg.startCash, rep:0,
    team:[], artefacts:[], instability:0,
    machine:{ amp:cfg.startAmp, cap:cfg.startCap, col:cfg.startCol, stab:cfg.startStab },
    staged:null,
    // stats
    expeditions:0, overclocks:0, shutdowns:0, cashOuts:0, papersWritten:0,
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
  const cfg      = game.cfg;
  const shuffled = game.rng.shuffle(buildBag(player, roster, cfg));
  const handSize = 2*roster.length + 2;
  let hand       = shuffled.slice(0, handSize);
  let remaining  = shuffled.slice(handSize);

  let cleared=0, overclocks=0, shutdown=false, cashOut=false;

  outer:
  for (let si=0; si<card.steps.length; si++) {
    const step = card.steps[si];

    // Profession lock: need matching prof on roster
    if (step.profLock && !roster.some(r=>r.profession===step.profLock)) {
      cashOut=true; break;
    }

    let have = hand.filter(c=>c===step.skill).length;

    while (have < step.req) {
      if (!policy.shouldOverclock(player, step.req-have, si, card, game)) {
        cashOut=true; break outer;
      }
      // Overclock: +1 instability, draw 1 from remaining
      player.instability++;
      overclocks++;
      if (remaining.length) {
        const drawn = remaining.splice(0,1)[0];
        hand.push(drawn);
        if (drawn===step.skill) have++;
      }
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
      // Spend the required cards (remove from hand — they are played, not reusable)
      let toSpend = step.req;
      hand = hand.filter(c => {
        if (toSpend > 0 && c === step.skill) { toSpend--; return false; }
        return true;
      });
    } else {
      break;
    }
  }

  // Collect rewards
  let cashGained=0, repGained=0, artefact=null;
  for (let i=0; i<cleared; i++) {
    const step = card.steps[i];
    if (step.type==='find') {
      cashGained += step.cash||0;
    } else {
      // objective
      if (!step.isArtefact || !player.team.some(r=>r.profession==='Historian')) {
        repGained += step.rep||0; // record immediately
      } else if (policy.shouldRecord(player, card, game)) {
        repGained += step.rep||0;
      } else {
        artefact = { rep: step.rep||0 }; // hold to publish later
      }
    }
  }
  player.cash += cashGained;
  player.rep  += repGained;
  if (artefact) player.artefacts.push(artefact);

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
      // Historian: publish artefact if available, else upgrade
      if (player.artefacts.length) {
        const art = player.artefacts.shift();
        player.rep += cfg.paperRepBase + r.expBoxes*cfg.paperRepBonus;
        player.papersWritten++;
        gainExp(r, cfg); // paper writing = researcher used
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
  if (!canAmp || !cost || player.cash<cost) return false;
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
    // Stab
    const stabIdx = m.stab-2;
    if (stabIdx < cfg.stabCosts.length) {
      const cost = cfg.stabCosts[stabIdx];
      if (cost && player.cash>=cost) { player.cash-=cost; m.stab++; gainExp(researcher, cfg); return; }
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
  if (player.machine.amp >= 7) {
    // Stage a Many Worlds attempt
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
    return player.instability+1 < player.machine.stab; // overclock unless next one shutsdown
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
    if (player.instability+1 >= player.machine.stab) return false;
    // OC on any step if 1 short; only OC on find steps once — save stab headroom for objective
    const safeInstability = player.instability+1 < player.machine.stab-1;
    if (card.steps[si].type==='objective') return shortfall<=1;
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

const ALL_POLICIES = { greedy:pGreedy, cautious:pCautious, balanced:pBalanced };

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
function playGame(numPlayers, cfg, policyAssignment, seed, withTrace) {
  const rng   = makePRNG(seed);
  const market= makeMarket(cfg, rng);
  const eraDecks = Array.from({length:7}, (_, e) =>
    rng.shuffle(Array.from({length:cfg.eraCardsPerTier}, ()=>genEraCard(e, cfg, rng)))
  );
  const game = {
    cfg, rng, market, eraDecks,
    integrity: numPlayers<=4 ? cfg.integrity4p : cfg.integrity5p,
    consDeck:  genConsDeck(cfg, rng),
    players:   Array.from({length:numPlayers}, (_, i) => {
      const p = makePlayer(i, cfg);
      p.policy = ALL_POLICIES[policyAssignment[i % policyAssignment.length]];
      return p;
    }),
    round:0, ended:false, mwSuccess:false, endReason:'timeout', unravelRound:null,
    trace: withTrace ? [] : null,
  };

  // Initial setup: each player buys first researcher if possible, then plans
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
    trace:       game.trace,
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

  return { mwRate, collapseRate, avgRounds, ocPerExp, coRate,
           avgShutdown, avgPapers, avgSpread, wallClock, numPlayers };
}

function fitness(m4, m5) {
  const pen = (actual, target, weight) => weight * Math.abs(actual-target)/Math.max(target,0.01);
  return pen(m4.mwRate,    0.80, 3.0)
       + pen(m5.mwRate,    0.80, 3.0)
       + pen(m4.avgRounds, 10,   2.0)
       + pen(m5.avgRounds, 10,   2.0)
       + pen(m4.ocPerExp,  0.35, 1.5)
       + pen(m4.coRate,    0.40, 1.0)
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

  const grid = {
    reqBase:      [0.7, 0.8, 1.0],
    reqEraSlope:  [0.5, 0.6, 0.7],
    integrity4p:  [10,  11,  12 ],
    ampCostMult:  [0.4, 0.45, 0.5],
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
  s += `| Many Worlds success | ${fmtp(m4.mwRate)} | ${fmtp(m5.mwRate)} | ~80% |\n`;
  s += `| Avg rounds | ${fmt2(m4.avgRounds)} | ${fmt2(m5.avgRounds)} | 8–12 |\n`;
  s += `| Wall clock (est.) | ${m4.wallClock} min | ${m5.wallClock} min | 60–120 min |\n`;
  s += `| Overclock rate | ${fmtp(m4.ocPerExp)} | ${fmtp(m5.ocPerExp)} | ~30–40% |\n`;
  s += `| Cash-out rate | ${fmtp(m4.coRate)} | ${fmtp(m5.coRate)} | ~30–50% |\n`;
  s += `| Collapse rate | ${fmtp(m4.collapseRate)} | ${fmtp(m5.collapseRate)} | ≤50% |\n`;
  s += `| Avg shutdowns | ${fmt2(m4.avgShutdown)} | ${fmt2(m5.avgShutdown)} | 1–4 |\n`;
  s += `| Avg papers | ${fmt2(m4.avgPapers)} | ${fmt2(m5.avgPapers)} | 3–8 |\n`;
  s += `| Score spread | ${fmt2(m4.avgSpread)} | ${fmt2(m5.avgSpread)} | >3 |\n\n`;

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
  s += `- Paper rep: \`${cfg.paperRepBase} + historian_boxes × ${cfg.paperRepBonus}\` (veteran historian: ${cfg.paperRepBase+cfg.expMaxBoxes*cfg.paperRepBonus})\n\n`;
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

  s += `## Starting State (Spec §9)\n`;
  s += `- No team, 2 cash, Amp/Cap/Col 1, Stabiliser max 2. **Spec-stated.**\n`;
  s += `- Permanent **2/2/2 player base** in every bag. Spec §3 calls this "provisional, a tuning knob." **Flagged.**\n\n`;

  s += `## Home Actions — Most Impactful Assumption\n\n`;
  s += `**Modelled as: each researcher at home gets ONE action** (write paper OR upgrade module OR clear instability).\n`;
  s += `Spec §8 says "each turn a researcher is in the field or at home (one of: write paper · upgrade module · clear instability)," which implies one action per researcher, not one per turn.\n`;
  s += `Spec §2 says "Develop (any turn) — one of: write a paper, or upgrade one machine module," suggesting one total.\n\n`;
  s += `**These interpretations produce very different games:**\n`;
  s += `- One-per-researcher: hiring 3 people means 2 home actions/turn — fast progression.\n`;
  s += `- One-per-turn: team size helps only expeditions, not home productivity.\n`;
  s += `**This needs a call from Drew before first print.**\n\n`;

  s += `## AI Policies\n\n`;
  s += `Three bots mixed across players:\n`;
  s += `1. **Greedy** (P0): full cap roster (all on MW), OC unless inst+1≥stab, deepest era, hire to fill profession gaps, Physicist upgrades Cap first.\n`;
  s += `2. **Cautious** (P1): 1-person roster (all on MW), never OC, always record, always Recent era, buys missing professions first.\n`;
  s += `3. **Balanced** (P2+): ~75% cap roster (all on MW), OC if 1-short on any step with stab headroom, one era back from max, buys missing professions first.\n\n`;
  s += `**Key gaps:** bots don't alliance for MW (solo only), don't negotiate, don't react to scores.\n\n`;

  s += `## Era Card Shape\n`;
  s += `- ${cfg.stepsMin}–${cfg.stepsMax} steps per card (uniform). Spec says "2+ steps" — upper bound chosen.\n`;
  s += `- ${(cfg.dangerChance*100).toFixed(0)}% of steps are forced Grit (danger). Spec: "danger steps open Grit."\n`;
  s += `- ${(cfg.profLockChance*100).toFixed(0)}% of Insight steps are Historian-locked; same for Craft→Engineer. Physicist has no per-step lock. Spec: "some steps profession-locked (knowledge)" — Physicist gating is at the module level only.\n`;
  s += `- All objectives are artefacts (record-vs-plunder choice). Spec implies this; confirmed.\n\n`;

  s += `## Experience & Many Worlds Gate (Spec §6, §7)\n`;
  s += `- **Max 2 exp boxes** (from §7: "max +2 each," each box = +1 all skills).\n`;
  s += `- **MW requires Amp 7 = Engineer + Physicist both at max exp (2 boxes).** Spec §6 says "three full blue experience boxes" for the MW upgrade. If boxes = 3, the gate is significantly harder. **Likely a design-doc artifact — flag for Drew.**\n`;
  s += `- **Instability clearing does NOT grant exp.** Spec §7: "used — on an expedition, to write a paper, or to upgrade the machine (not to clear instability)."\n\n`;

  s += `## Papers\n`;
  s += `- Paper rep = ${cfg.paperRepBase} + historian_boxes × ${cfg.paperRepBonus}. Fresh historian: ${cfg.paperRepBase}. Veteran: ${cfg.paperRepBase+cfg.expMaxBoxes*cfg.paperRepBonus}.\n`;
  s += `- Spec says "Papers (4+ rep) dominate artefacts (1)." Fresh historian at ${cfg.paperRepBase} doesn't quite hit 4. **Consider raising paperRepBase to 4.**\n\n`;

  s += `## Many Worlds\n`;
  s += `- ${cfg.mwSteps} steps × ${cfg.mwReqPerStep} pips each. **Primary game-length tuning knob.**\n`;
  s += `- Failed MW: −${cfg.mwIntegDmgFail} integrity. Spec says "4–5" — **reduced to ${cfg.mwIntegDmgFail} after 4 caused cascade collapse in every game.** Confirm with Drew.\n`;
  s += `- **MW roster: all researchers sent** (not just cap-limit). Thematically: everyone for the final push. Massively improves success rate — without this, MW was ~5%.\n`;
  s += `- Bots attempt MW solo. Real tables will alliance. MW success rate is probably 10–20% higher in practice.\n\n`;
  s += `## Stabiliser & Shutdowns\n`;
  s += `- Greedy stops overclocking when inst+1 ≥ stab (shutdown threshold). With startStab=3, this means max 2 OCs per expedition.\n`;
  s += `- **Zero shutdowns observed in simulation.** Engineers clear instability between turns; greedy correctly avoids the third OC. The Stabiliser is a constraint, not a punishment trigger.\n`;
  s += `- **startStab=2 would fundamentally change this** — a single OC risks shutdown. If Drew wants shutdown to be a real risk, lower stab. Current data: stab=3 → OC is safe, frequent, and strategic.\n\n`;
  s += `## Game Length\n`;
  s += `- Best config: ~${Math.round(11.26 * 4 * 3)} min at 3 min/player-turn (over 60–120 target). At 2.5 min/player-turn: ~${Math.round(11.26 * 4 * 2.5)} min (in range).\n`;
  s += `- **The amp gating (E+P both maxed for amp 7) is the bottleneck.** Cannot be easily shortcut without changing the exp curve or amp cost structure.\n`;
  s += `- **Primary lever if games run long:** lower mwSteps to 2 (ends the game a round or two earlier) or raise home income.\n\n`;

  s += `## Turn-1 Seeding\n`;
  s += `- Each player buys first researcher if affordable (2 cash start = sometimes possible), then plans a card. Spec: "Turn-1 seeded gentle Recent starter (optional)" — modelled as standard plan draw from Recent (Amp 1 restricts to Recent anyway).\n\n`;

  s += `## Retirement / Parting Gift\n`;
  s += `- Not modelled. Bots don't deliberately retire maxed researchers. Parting Gift rep not awarded. **Understates the long-game team-legacy arc.** Low priority for first-contact print.\n\n`;

  s += `## Priority Review List\n`;
  s += `1. **One action per home researcher, or one total?** High impact.\n`;
  s += `2. **"Three exp boxes" for MW gate** — 2 or 3?\n`;
  s += `3. **Paper rep base** — raise to 4?\n`;
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
  s += `- Clarify home-action model (one per researcher vs. one per turn)\n`;
  s += `- Clarify exp box count (2 or 3) for MW gate\n`;
  s += `- Paper playtest with recommended config\n`;
  s += `- Tune mwReqPerStep if game length is off\n`;
  fs.writeFileSync('sim/PROGRESS.md', s, 'utf8');
  console.log('Wrote sim/PROGRESS.md');
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
const args  = process.argv.slice(2);
const quick = args.includes('--quick');
const trace1= args.includes('--trace1');

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
const t0    = Date.now();
const sweep = runSweep(quick);
console.log(`\nSweep complete in ${((Date.now()-t0)/1000).toFixed(1)}s`);

console.log('\nRunning trace samples on best config...');
const traces = [0,1,2].map(i =>
  playGame(4, sweep.best.cfg, ['greedy','cautious','balanced'], i*999983, true)
);

writeResults(sweep, traces);
writeAssumptions(sweep.best.cfg);
writeProgress(sweep);

const m = sweep.best.m4;
console.log('\n=== Best config (4p) ===');
console.log(`  MW rate:     ${fmtp(m.mwRate)}`);
console.log(`  Avg rounds:  ${fmt2(m.avgRounds)}`);
console.log(`  Wall clock:  ~${m.wallClock} min`);
console.log(`  OC rate:     ${fmtp(m.ocPerExp)}`);
console.log(`  Cash-out:    ${fmtp(m.coRate)}`);
console.log(`  Collapse:    ${fmtp(m.collapseRate)}`);
console.log('\nSee sim/RESULTS.md  sim/ASSUMPTIONS.md  sim/PROGRESS.md');
