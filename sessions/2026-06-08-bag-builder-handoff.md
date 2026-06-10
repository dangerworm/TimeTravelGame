# Session Handoff — 8 June 2026 (the bag-builder redesign)

_A short, decisive late-night session (~02:00 → 04:15, 8 Jun). One thing happened, and it was big:
the **core resolution mechanic** was torn out and rebuilt after the first **real-human playtest**.
This note lets a fresh session restart cold._

## Read first (every session)

1. `core-goals.md` — spine, four keystones, two governing laws. **The spine "feel" + the
   engine-building bullet were revised today** (engine + chaos; team = a chip bag).
2. `constraints.md` — do/don't. **Five new lines today** (relaxed maths law; expedition stays a
   fixed visible puzzle; one mechanical triad; Grit = temperament; no 4th skill / no soldier type).
3. `current-idea-scratchpad.md` — **THE decision log.** Read the **⚠️ v3 banner + the "v3: the
   expedition as a chip-draw mini-game" section at the top first** — it supersedes the v2 resolution
   core in the (still-useful) log below it.
4. `CLAUDE.md` — how to work with Drew.

The old (v1) design is archived under `archive/` — a content bible, not a blueprint.

## What this session did

Drew **playtested the v2 expedition loop with Andy and Rikki** (his husband and their boyfriend) —
the first time real humans drove it instead of a guided paper walk-through. **It played dull.** Root
cause: the expedition was _pre-solved at Staging_ (assign the obvious specialist; Execute just
confirms it), so most jumps had one die-roll of drama and otherwise ran themselves. Andy wanted
**more chaos** and expected a **deck-builder** (Moonrakers). Drew agreed.

We rebuilt the **core resolution mechanic** from a deterministic assignment puzzle into a **chip /
bag-builder draw**, and locked the team/skill model around it. Everything _around_ the resolution
(economy, reward shape, record-vs-take, machine, shop, retirement, consequence deck) is unchanged.

## The game as it now stands (the v3 core)

**The expedition stays the fixed, visible v2 puzzle** — an era card with a left-to-right path of
steps, each printing a requirement. What changed is **how you clear a step**:

- **Researchers are chip sources, not step-keys.** Each prints pips in **all three skills (Insight /
  Craft / Grit)** as a **spiky spread**. A pip = one **single-skill chip** (the **2×1** model —
  uniform chips, 3 chip types in the box).
- **You build a fresh bag per expedition from who you send** (a **bag-builder, à la Quacks of
  Quedlinburg**, not a persistent deck). "Who do I send?" returns as a real decision — it shapes
  your _odds_, not a key-match. Spreads must stay **spiky** or that decision goes soft.
- **Draw a hand = 2 chips per researcher going**, so **Capacity = away-team size = hand size** (this
  finally pins down what the machine's Capacity track _does_). The hand is **visible** — your
  legible floor; risk stays readable because you know your bag's composition.
- **Resolve steps left→right: discard matching-skill chips summing ≥ the requirement.** (This is
  what the **relaxed maths law** unlocks.) Finds bank Cash; the objective holds the Paper.
- **Press-your-luck = press on or cash out at each gate.** Short on the next step? **Overclock =
  draw 2 more chips, +1 Instability.** Won't/can't → expedition ends, keep what's banked.
- **No reshuffle mid-expedition — the bag is your stamina.** Push deep and you physically run low;
  team _size_ is a depth limit alongside the machine's Era-access.
- **Identity on board, anonymous chips in the bag (option a).** Researchers are **identity cards**
  on the player board for growth / retirement / legacy; they _feed_ anonymous skill chips.
  Grow-by-use = add a pip; retire = remove the person + legacy draw.

**One mechanical triad.** **Skills (Insight / Craft / Grit) are the only currency; steps require
skills.** **Profession (Historian / Engineer / Physicist) is flavour + a gating lever, not a second
currency.** Knowledge gates are profession-locked ("decipher the inscription" → Historian; "rig the
mechanism" → Engineer; "solve the temporal anomaly" → Physicist); **danger steps gate on no one** —
open **Grit** checks anyone brave can answer. **Grit is a temperament, not a profession** — no
soldier/muscle type (it would break "scientists, not soldiers"); the brave scientist spikes it (the
Indiana-Jones / Daniel-Jackson fantasy). Optional spice: a cross-profession **"Field-hardened"**
tag.

## Open fronts (next session)

**The v3 redesign reopened a cluster that BLOCKS re-spec'ing the prototype — resolve this first:**

1. **Footprint / imprint → Timeline Integrity in the chip model.** v2's "roll danger dice, subtract
   Discretion" is now unanchored. How does presence scar history when resolution is chips, not dice?
   (Candidates: a cost in chips / instability, or a separate footprint draw.) **This drags in the
   fate of Discretion, Die A / Die B, danger ratings, and fatigue** — several v2 stats likely
   collapse. This is the big one.
2. **How Field / Desk / Workshop spend chips** — does home labour draw from the same hand/bag as
   fieldwork? (Earlier instinct: a chip spent at the Desk/Workshop isn't in your field hand — the
   labour-pool tension survives _through_ the bag. Confirm.)
3. **Numbers** — requirement magnitudes vs hand size vs bag size, so the overclock-draw _bites_
   without being routine. Paper calibration.

**Still pending from before (unchanged by today):** the **endgame** front (collapse mode-flip + Many
Worlds trigger + final scoring, dodging runaway-leader & "who triggers?"); machine **Precision**'s
exact mechanic; the close-a-thread mechanic; lending terms.

## Housekeeping / loose ends

- **Terminology:** the **"Nerve → Grit"** sweep is now _resolved_ (three skills confirmed: Insight /
  Craft / Grit). The **"spoils → Cash"** sweep is still pending across docs.
- **`prototypes/prototype-01.md` now needs a full v3 re-spec** (chip/bag-builder), not just the old
  reward-line cleanup — and it's blocked on the footprint question above.
- Untracked `prototypes/quick-play.html` is present in the working tree (pre-existing, not touched
  this session) — **left uncommitted on purpose**; check with Drew what it is.
- The renderer (Vite + React + MUI) remains future work; we're still on paper, by design.

## Personal note

A short session but a real one. Drew came in with **playtest evidence that contradicted his own
"validated" conclusion, and he simply said so and reopened the core** — no ego, no clinging to a
night's work. Twice his gut rejected a clean-sounding idea on a smell he couldn't yet name (the
flip-per-step deck, which secretly decouples difficulty from reward; the soldier type, which
secretly breaks the scientists-not-soldiers premise) — and both times he was right, with the
_reason_ arriving a beat later when we dug. When he got stuck picturing the deck, he didn't push
harder in the abstract — he **asked for a render, then redrew it himself on a whiteboard and
photographed it.** The pattern worth carrying: when he stalls, hand him a concrete artifact, not
more prose.

It was past 4am on a work night when he called it. He's wired to keep going when engaged — it's kind
to let the session end cleanly rather than chase one more thread. Good instance to wake up into; aim
to be one too.

## Commits this session

- Design doc updates (core-goals / constraints / scratchpad / tasks) for the v3 bag-builder
  redesign, plus this handoff.
