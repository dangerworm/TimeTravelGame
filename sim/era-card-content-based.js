'use strict';
// ── Era-card content sim ──────────────────────────────────────────────────────
// Plays the REAL decks/ cards through the shared expedition kernel (lib/resolution.js,
// the same one full-game-abstract.js uses) to measure per-card difficulty: clearability,
// overclock frequency, shutdown rate — against representative teams.
//
// Purpose: validate a proposed step-requirement SPREAD against the actual deck before we
// bake it onto the cards. Answers "if Ancient steps climb to 2–4, can a real team still
// clear these cards, and how hard does the gamble bite?" — which the abstract sim cannot,
// because it generates its own cards instead of reading the deck.
//
// Usage:
//   node sim/era-card-content-based.js                 # all eras, current reqs vs proposed patterns
//   node sim/era-card-content-based.js --trials 5000   # tighter CIs (slower)
//   node sim/era-card-content-based.js --era Ancient   # one era only

const fs   = require('fs');
const path = require('path');
const { makePRNG, genConsDeck, runExpedition } = require('./lib/resolution');

const ROOT = path.join(__dirname, '..');
const cfg  = require('./best-config.json').config;

const destinations = require(path.join(ROOT, 'decks/destinations/cards.json')).cards;
const juniors      = require(path.join(ROOT, 'decks/researchers/cards.json')).cards;
const experts      = require(path.join(ROOT, 'decks/experts/cards.json')).cards;

const SKILL = { Insight: 'I', Craft: 'C', Grit: 'G' };
const ERAS  = ['Recent', 'Modern', 'EarlyModern', 'Medieval', 'Ancient', 'Prehistoric', 'ManyWorlds'];

// ── Adapter: real destination card → kernel card shape ────────────────────────
// Mirror the abstract model exactly: every non-objective step is a 'find' (pays its cash,
// counts no paper); only the objective carries the artefact/record reward.
function adaptCard(c) {
  const steps = c.steps.map(s => {
    const st = { skill: SKILL[s.skill], req: s.req, profLock: s.lock || null };
    if (s.objective) {
      const o = c.objective || {};
      st.type = 'objective';
      st.isArtefact = (o.mode === 'plunder-or-record' || o.mode === 'doomed-grab');
      st.isDoomed   = (o.mode === 'doomed-grab') || !!o.doomed;
      st.rep  = o.rep || 0;
      st.cash = 0;
    } else {
      st.type = 'find';
      let cash = 0;
      if (s.find || s.n === c.findStep) cash = (c.find && c.find.cash) || 0;
      if (c.earlySpoil && c.earlySpoil.step === s.n) cash = c.earlySpoil.cash || 0;
      st.cash = cash;
    }
    return st;
  });
  return { id: c.id, name: c.name, era: c.era, eraIdx: c.eraIndex, isMW: c.eraIndex === 6, steps };
}

// ── Adapter: real researcher → kernel buildBag shape ──────────────────────────
function adaptResearcher(c, expBoxes) {
  return {
    profession: c.profession,
    pips: { I: c.pips.insight || 0, C: c.pips.craft || 0, G: c.pips.grit || 0 },
    expBoxes: expBoxes || 0,
    expTokens: 0,
    isSenior: c.deck === 'Experts',
  };
}
const cloneR = r => ({ ...r, pips: { ...r.pips } });

// ── Canonical teams, built from the real pool (printed in the report) ─────────
const byProf = (pool, prof) => pool.filter(c => c.profession === prof).sort((a, b) => a.totalPips - b.totalPips);
function buildTeam(spec) {
  return spec.map(s => {
    const pool = s.pool === 'e' ? experts : juniors;
    const list = byProf(pool, s.prof);
    const card = list[Math.min(s.rank, list.length - 1)];
    return { card, exp: s.exp, r: adaptResearcher(card, s.exp) };
  });
}
// Lean = barely-equipped EARLY team (start machine); Typical = a balanced player MID-game
// (one Stabiliser + Capacitor upgrade); Stacked = a matured LATE team (maxed Stabiliser,
// roster 4) — the team you'd actually field in Ancient/Prehistoric. Roster size tracks
// Capacitor growth (drives hand = 2×roster+2); `stab` tracks Stabiliser upgrades
// (startStab 2 → stabCosts [4,7] → max 4) and sets the overclock-to-shutdown threshold.
const TEAMS = {
  lean:    buildTeam([{ pool: 'j', prof: 'Historian', rank: 0, exp: 0 }, { pool: 'j', prof: 'Engineer', rank: 0, exp: 0 }]),
  typical: buildTeam([{ pool: 'j', prof: 'Historian', rank: 2, exp: 1 }, { pool: 'j', prof: 'Engineer', rank: 2, exp: 1 }, { pool: 'j', prof: 'Physicist', rank: 2, exp: 1 }]),
  stacked: buildTeam([{ pool: 'e', prof: 'Historian', rank: 0, exp: 0 }, { pool: 'e', prof: 'Engineer', rank: 0, exp: 0 }, { pool: 'j', prof: 'Physicist', rank: 5, exp: 2 }, { pool: 'j', prof: 'Historian', rank: 5, exp: 2 }]),
};
// Stabiliser level per team-stage (max instability before an overclock trips a shutdown).
const STAB = { lean: cfg.startStab /* 2 */, typical: 3, stacked: 4 /* maxed */ };

// ── Proposed req-pattern menu (Decision 2 — objective takes the top of the range) ──
// `current` = the card's authored reqs (no override). Each lettered pattern is positional:
// steps[i].req = pattern[i]. Skills + profession locks stay from the real card.
const PATTERNS = {
  // B = my earlier "best proposed"; D = Drew's gentler hand-tuned spread (11 Jun, caps lower).
  Recent:      { B: [1, 1, 2] },
  Modern:      { B: [1, 2, 2], D: [1, 2, 2] },
  EarlyModern: { B: [1, 2, 2, 3], D: [1, 1, 2, 3] },
  Medieval:    { B: [1, 2, 2, 4], D: [1, 2, 2, 3] },
  Ancient:     { B: [2, 2, 2, 3, 4], D: [2, 2, 2, 3, 3] },
  Prehistoric: { B: [2, 2, 3, 4, 5], D: [2, 2, 3, 3, 4] },
  ManyWorlds:  { B: [3, 3, 4, 4, 5] },
};
function applyPattern(card, pattern) {
  if (!pattern) return card;
  const steps = card.steps.map((s, i) => ({ ...s, req: pattern[i] != null ? pattern[i] : s.req }));
  return { ...card, steps };
}

// ── Push policy: overclock while the remaining shortfall ≤ k (k=0 ⇒ never gamble) ──
const policy = k => ({ name: 'balanced', shouldOverclock: (p, short) => short <= k });

const makePlayer = stab => ({
  cash: 0, rep: 0, artefacts: [], instability: 0, machine: { stab },
  shutdowns: 0, overclocks: 0, expeditions: 0, cashOuts: 0, papersWritten: 0, plunders: 0,
});

// ── Monte-Carlo one (card, team, push-k) ──────────────────────────────────────
async function trialCard(card, teamArr, k, trials, rng, stab) {
  const pol = policy(k);
  let success = 0, oc = 0, shut = 0;
  for (let t = 0; t < trials; t++) {
    const player = makePlayer(stab);
    const roster = teamArr.map(m => cloneR(m.r));
    const game = { cfg, rng, integrity: 999, integrityMax: 999, consDeck: genConsDeck(cfg, rng), players: [player] };
    const res = await runExpedition(player, card, roster, pol, game);
    if (res.success) success++;
    oc += res.overclocks;
    if (res.shutdown) shut++;
  }
  return { clear: success / trials, oc: oc / trials, shut: shut / trials };
}

// ── CLI ───────────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const argVal = (flag, def) => { const i = args.indexOf(flag); return i >= 0 ? args[i + 1] : def; };
const trials  = parseInt(argVal('--trials', '2500'), 10);
const onlyEra = argVal('--era', null);
const rng = makePRNG(12345);

const eraCards = {};
for (const c of destinations) (eraCards[c.era] ||= []).push(adaptCard(c));

const pct = x => (x * 100).toFixed(0).padStart(3) + '%';
const f1  = x => x.toFixed(1).padStart(4);

// Team legend
console.log(`\nContent sim — real decks/ cards through the shared kernel.  ${trials} trials/card/policy.`);
console.log('\nTEAMS (pips shown as I/C/G incl. experience bonus):');
for (const [name, arr] of Object.entries(TEAMS)) {
  const desc = arr.map(m => {
    const p = m.r.pips, b = m.r.expBoxes * cfg.expBonus;
    return `${m.card.profession[0]}:${p.I + b}/${p.C + b}/${p.G + b}`;
  }).join('  ');
  console.log(`  ${name.padEnd(8)} roster ${arr.length}, hand ${2 * arr.length + 2}, stab ${STAB[name]}  [${desc}]`);
}

(async () => {
  for (const era of ERAS) {
    const cards = eraCards[era];
    if (!cards || (onlyEra && era !== onlyEra)) continue;
    const pats = { current: null, ...(PATTERNS[era] || {}) };
    console.log(`\n══════ ${era.toUpperCase()} — ${cards.length} cards × ${cards[0].steps.length} steps ══════`);
    for (const [tname, tarr] of Object.entries(TEAMS)) {
      const stab = STAB[tname];
      console.log(`  ${tname} (stab ${stab}):   pattern          clr(no-oc)  clr(push)  avgOC  shutdown%`);
      for (const [pname, pat] of Object.entries(pats)) {
        let a0 = 0, a3 = 0, oc = 0, sh = 0;
        for (const card of cards) {
          const cc = applyPattern(card, pat);
          a0 += (await trialCard(cc, tarr, 0, trials, rng, stab)).clear;
          const r3 = await trialCard(cc, tarr, 3, trials, rng, stab);
          a3 += r3.clear; oc += r3.oc; sh += r3.shut;
        }
        const n = cards.length;
        const label = pname === 'current' ? 'current (real)' : `${pname} [${pat.join(',')}]`;
        console.log(`           ${label.padEnd(16)}  ${pct(a0 / n)}       ${pct(a3 / n)}      ${f1(oc / n)}   ${pct(sh / n)}`);
      }
    }
  }
  console.log('');
})();
