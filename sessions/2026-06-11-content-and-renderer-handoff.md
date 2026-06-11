# Handoff — overnight content + renderer (11 Jun 2026)

_Drew asked, just before bed, for "a full game's worth of content so I can playtest tomorrow," then
expanded the ask to a **printable web app** (Vite/React/MUI) for the cards — especially **double-sided
era cards** — and told me to **set up a loop** and keep going autonomously. This is the state + how to
continue. **If you're a resumed instance: this file is your source of truth for the loop.**_

## Confirmed with Drew this session

- **Source of truth = `game-design-document.md`** (the ruleset). `intentions.md` = spirit/why.
- **Numbers: GDD wins over the whiteboard** (start Cash 3, Stabiliser start 2, failed-MW −2, 2 earnable
  XP boxes). The whiteboard PNG is layout-only.
- **Data zone confirmed**: Record → era card to **Data** zone (kept, not discarded); a Historian who
  didn't jump **Publishes** it later for the rep. Plunder → **Artefacts** zone. **No instant rep
  anywhere.** Built into the content + renderer.
- **Decisions Drew made this session:** (1) Many Worlds — leave minimal, write a kingmaker proposal to
  `kingmaker-rule-suggestion.md` (DONE). (2) **Quantity over polish** — make enough that a 4-player game
  can't run dry. (3) **Real history** is the content tone.
- **New rule (Drew, 11 Jun):** early-relief spoil **extended to ALL eras** (was shallow-only). Each step
  _before the last two_ has ~15% chance of a 1–2 Cash drop, max one per card. Applied to docs + content
  (baked onto ~9 of 60 eligible gate-steps); flagged as a playtest-watch (deep back-load).

## Done this session

- **Content authored as JSON in `decks/`** (single source of truth):
  - `destinations/cards.json` — **32** cards (Recent 5 / Modern 5 / EarlyModern 5 / Medieval 5 /
    Ancient 5 / Prehistoric 5 / ManyWorlds 2), real historical mysteries, double-sided (front =
    expedition path, back = paper/prize).
  - `researchers/cards.json` — 18 juniors (6/6/6 by profession, a "brave" Grit-spike each).
  - `experts/cards.json` — 9 (3 per profession, maxed, no retire).
  - `retirement/cards.json` — 8 Parting Gifts (Drew's 4 seeds + 4 new).
  - `consequences/cards.json` — 18 designs, `copies` field → 24-card weighted deck.
  - `decks/SCHEMA.md` (schema) + `decks/PLAYTEST.md` (print-&-play assembly + setup + watch-list).
- **`renderer/`** — Vite + React + MUI. Loads the JSON (auto-synced via `scripts/sync-content.mjs`),
  renders A4 3×3 sheets with cut-line borders, all five decks, **duplex-mirrored era card backs**.
  `npm run build` ✅ and `npx tsc --noEmit` ✅. (Authored without a browser — Drew should eyeball it.)
- **`kingmaker-rule-suggestion.md`** — proposal for Drew to react to.
- Updated `tasks.md`, `game-design-document.md` §7 + `intentions.md` (early-spoil rule).

## THE LOOP TASK (what to keep doing): grow the destination deck

**Goal:** so a 4-player game won't run dry, bring each historical era toward the sim's intended
**~12 cards/era** (`eraCardsPerTier: 12`), **weighted to the shallow–mid eras that see the most jumps**.

Current → suggested target (append NEW real-history cards, don't duplicate existing ids/subjects):

| Era | have | target | tone |
|---|---|---|---|
| Recent | 5 | ~10 | most jumps |
| Modern | 5 | ~10 | most jumps |
| EarlyModern | 5 | ~10 | high |
| Medieval | 5 | ~8 | medium |
| Ancient | 5 | ~7 | lower |
| Prehistoric | 5 | ~6 | lowest |
| ManyWorlds | 2 | 2–3 | leave |

Work **one era per loop iteration**: author the batch, **append to `decks/destinations/cards.json`**,
validate, then continue. Stop the loop when the table above is met (or quota is clearly low) — then
**omit the wakeup** to end the loop and write a short closing note here.

### Calibration cheat-sheet (so new cards match the sim — DON'T re-read sim/)

eraIndex: Recent 0 · Modern 1 · EarlyModern 2 · Medieval 3 · Ancient 4 · Prehistoric 5 · ManyWorlds 6.

- **steps per card** (eraStepBands): Recent/Modern **3**, EarlyModern/Medieval **4**, Ancient/Prehistoric **5**.
- **layout:** gate steps, then **find** on the **second-to-last** step, **objective** on the **last**.
- **step req:** **1** for eraIndex 0–4, **2** for Prehistoric. (MW = 5.) Keep flat; danger spikes bite
  via instability/consequence, not big reqs (don't exceed req+1 on a danger step).
- **step skills/locks:** Insight knowledge steps may be `lock:"Historian"`; Craft knowledge →
  `lock:"Engineer"`; occasional `lock:"Physicist"` for a physics step; **danger steps = open Grit, no
  lock**. ~1/3 of knowledge steps locked. Ensure a card needs a mix so teams need all professions.
- **find cash** = `3 + eraIndex`. **find publishRep** = `max(1, round(objRep/3))`.
- **objective rep by mystery tier** (the real-history hook = more unknown → more rep), within era band:
  Recent {T2:2,T3:3,T4:4} · Modern {T2:3,T3:4,T4:5} · EM {T2:4,T3:5,T4:6} · Med {T2:6,T3:7,T4:8} ·
  Anc {T2:7,T3:8,T4:9} · Pre {T3:9,T4:10}.
- **objective mode:** `record-only` (pure knowledge, no sell, scar 0) · `plunder-or-record` (non-doomed:
  scar = `[1,1,1,2,2,3,3][eraIndex]`, sellable) · `doomed-grab` (doomed: scar 0, disrepute 0, sellable).
  Mix all three across each era; let the **fiction** signal which (doomed = about to burn/drown/be lost).
- **sellCash** (plunder/doomed) = `round(rep × 1.5)`. **disrepute** (non-doomed sell) =
  `max(1, floor((rep−1)/2))`; doomed = 0; record-only has no sell.
- **earlySpoil:** optionally on ~15% of gate-steps (before the last two), `{step, cash:1-2}`, max one/card.
- **id** = `<eraprefix>-<slug>` (rec/mod/em/med/anc/pre). Keep `fiction` to ~2 sentences, the
  doomed/record/plunder hint inside it. Real, genuinely-mysterious history (the marketable hook).

### Validate after each batch

```bash
cd "C:/Users/drewg/Documents/Local Projects/TimeTravelGame"
node -e "const d=require('./decks/destinations/cards.json');const byEra={};for(const c of d.cards){byEra[c.era]=(byEra[c.era]||0)+1;const last=c.steps.length;if(c.findStep&&c.findStep!==last-1)console.log('BAD findStep',c.id);if(!c.steps.at(-1).objective)console.log('BAD objective',c.id);}console.log('cards',d.cards.length,byEra);"
```

(Editing the big JSON by hand is error-prone — prefer **appending** new card objects before the closing
`]` of `"cards"`, or use a small node script that pushes to the array and re-serialises. If you
re-serialise, the file reformats — fine, it's uncommitted.) The renderer picks up changes on next
`npm run build`/`dev` (it re-syncs).

## For Drew when you wake

1. **`kingmaker-rule-suggestion.md`** — the one thing only you can decide. Gut-react to it.
2. **Open the renderer** (`cd renderer && npm install && npm run dev`) → print to PDF. **Eyeball the
   cards** — they were built without a browser in the loop, so check wrapping/fit.
3. The game is **fully playable from `decks/` alone** (see `decks/PLAYTEST.md`) even without the app.
4. Nothing was committed (per your "ask before git" rule) — review the diff at leisure.

_No blockers. Loop running to fill out the destination deck._

---

**LOOP COMPLETE (04:1x, 11 Jun).** Destination deck filled to target: **53 cards** — Recent 10 ·
Modern 10 · EarlyModern 10 · Medieval 8 · Ancient 7 · Prehistoric 6 · ManyWorlds 2. No dupes, all
findStep/objective valid, `renderer/ npm run build` ✅. Dev server was started at
**http://localhost:5173** for Drew to eyeball.

**Still open / for a Chrome-enabled instance:** (1) the **visual check** — screenshot each deck at
http://localhost:5173 and confirm no text overflow on the fixed-height (62×90mm) cards, especially the
**5-step deep cards** (Ancient/Prehistoric/MW) and the longest `fiction` strings; tighten font sizes in
`renderer/src/cards/*` if anything clips. (2) Drew to react to `kingmaker-rule-suggestion.md`. (3)
Nothing committed (Drew's rule). To drive Chrome, connect the **chrome-devtools MCP** and restart
(tools load at session start) — work is safe on disk + this handoff.
