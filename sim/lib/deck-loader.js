'use strict';
// ── Real-deck loader + adapters ───────────────────────────────────────────────
// Single source of truth for turning the real decks/*.json into the internal shapes the kernel and
// the game engine consume. Shared by era-card-content-based.js (per-card probe) and full-game.js.

const path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const SKILL = { Insight: 'I', Craft: 'C', Grit: 'G' };

// Real destination card → internal card. Carries BOTH the kernel/probe step fields (skill/req/
// profLock/type + cash/rep/isArtefact on the relevant steps) AND card-level reward objects
// (find / objective) the full game routes through Data/Artefact zones. `pattern` (optional) overrides
// step requirements positionally — used to A/B a proposed difficulty spread.
function adaptCard(c, pattern, opts = {}) {
  // Depth-graded gating rule under test (Drew, 11 Jun): Recent+Modern have NO profession gates,
  // Early Modern has Historian-only gates, and deeper eras carry AT MOST TWO gates of any type — so
  // a small team can always cover a card and the Capacity-1 lone-researcher trap eases with depth.
  let lockedKept = 0;
  const steps = c.steps.map((s, i) => {
    let profLock = s.lock || null;
    if (opts.gateTiers && profLock) {
      if (c.eraIndex <= 1) profLock = null;                 // Recent/Modern: no researcher gates
      else if (c.eraIndex === 2) profLock = 'Historian';    // Early Modern: historian-only
      else if (lockedKept < 2) lockedKept++;                // Medieval+: keep at most two (any type)
      else profLock = null;
    } else if (opts.shallowHistLock && c.eraIndex <= 1 && profLock && profLock !== 'Historian') {
      profLock = 'Historian';                               // (older single-rule flag, still supported)
    }
    // A pattern entry may be a fixed req (number) or a [min,max] range rolled per card from the game
    // RNG — so a card's numbers can track its narrative within a band, not a flat mechanical pattern.
    let req = s.req;
    const p = pattern && pattern[i];
    if (p != null) req = Array.isArray(p) ? (opts.rng ? opts.rng.int(p[0], p[1]) : Math.round((p[0] + p[1]) / 2)) : p;
    const st = {
      n: s.n,
      skill: SKILL[s.skill],
      req,
      profLock,
      type: s.objective ? 'objective' : 'find', // kernel/probe: every non-objective step is a 'find'
    };
    if (s.objective) {
      const o = c.objective || {};
      st.isArtefact = (o.mode === 'plunder-or-record' || o.mode === 'doomed-grab');
      st.isDoomed   = (o.mode === 'doomed-grab') || !!o.doomed;
      st.rep = o.rep || 0;
      st.cash = 0;
    } else {
      let cash = 0;
      if (s.find || s.n === c.findStep) cash = (c.find && c.find.cash) || 0;
      if (c.earlySpoil && c.earlySpoil.step === s.n) {
        // No current card does this, but if a future one puts earlySpoil on the find step, this
        // silently overwrites the find's cash rather than adding to it — flag it instead of guessing.
        if (s.n === c.findStep) console.warn(`deck-loader: card "${c.id}" has earlySpoil.step === findStep (${s.n}) — earlySpoil cash is overwriting the find's cash, probably not intended.`);
        cash = c.earlySpoil.cash || 0;
      }
      st.cash = cash;
    }
    return st;
  });
  const o = c.objective || {};
  return {
    id: c.id, name: c.name, era: c.era, eraIdx: c.eraIndex, isMW: c.eraIndex === 6,
    mysteryTier: c.mysteryTier,
    steps,
    findStepIndex: steps.findIndex(s => s.n === c.findStep),
    find: c.find ? { cash: c.find.cash || 0, publishRep: c.find.publishRep || 0 } : null,
    earlySpoil: c.earlySpoil ? { step: c.earlySpoil.step, cash: c.earlySpoil.cash || 0 } : null,
    objective: {
      mode: o.mode || 'record-only',
      isArtefact: (o.mode === 'plunder-or-record' || o.mode === 'doomed-grab'),
      isDoomed:   (o.mode === 'doomed-grab') || !!o.doomed,
      rep: o.rep || 0, sellCash: o.sellCash || 0, scar: o.scar || 0, disrepute: o.disrepute || 0,
    },
  };
}

// Real researcher/expert card → internal teammate template. Experts (`noExp`) start at their printed
// pips and never gain experience; juniors start at 0 earned boxes and grow via gainExp.
function adaptResearcher(c, expBoxes) {
  const senior = c.deck === 'Experts';
  return {
    id: c.id, name: c.name, profession: c.profession,
    pips: { I: c.pips.insight || 0, C: c.pips.craft || 0, G: c.pips.grit || 0 },
    totalPips: c.totalPips ?? ((c.pips.insight || 0) + (c.pips.craft || 0) + (c.pips.grit || 0)),
    cost: c.cost,
    isSenior: senior, noExp: senior,
    earnableBoxes: c.earnableBoxes ?? (senior ? 0 : 2),
    boughtBelowMax: !senior,                 // only juniors can retire for a Parting Gift
    expBoxes: expBoxes || 0, expTokens: 0,
  };
}
const cloneResearcher = r => ({ ...r, pips: { ...r.pips } });

// Load every real deck. `opts`: { patternMap?: {era:[reqs...]}, shallowHistLock?: bool }.
function loadDecks(rng, opts = {}) {
  const { patternMap, shallowHistLock, gateTiers } = opts;
  const dest         = require(path.join(ROOT, 'decks/destinations/cards.json')).cards;
  const juniorPool   = require(path.join(ROOT, 'decks/researchers/cards.json')).cards.map(c => adaptResearcher(c, 0));
  const expertPool   = require(path.join(ROOT, 'decks/experts/cards.json')).cards.map(c => adaptResearcher(c, 0));
  const partingGifts = require(path.join(ROOT, 'decks/retirement/cards.json')).cards;

  const eraDecks = Array.from({ length: 7 }, () => []);
  for (const c of dest) eraDecks[c.eraIndex].push(adaptCard(c, patternMap && patternMap[c.era], { shallowHistLock, gateTiers, rng }));
  for (let e = 0; e < 7; e++) eraDecks[e] = rng.shuffle(eraDecks[e]);

  return { eraDecks, juniorPool, expertPool, partingGifts };
}

module.exports = { SKILL, adaptCard, adaptResearcher, cloneResearcher, loadDecks };
