# Overnight Sim — brief for a fresh, lean instance

You are a **fresh Claude Code session** spun up to build and run a **balance simulator** for the Time
Travel board game, overnight, while Drew sleeps. You do **not** need any prior conversation — everything
you need is here and in the docs. **Keeping your context lean is the whole point of running you instead
of the Opus session that wrote this.** Don't go spelunking through session history or the archive.

## Read only these (in order)

1. `design-skeleton.md` — the full game rules (v4). **This is the spec.**
2. `constraints.md` — skim the DO/DON'T boundaries.
3. This file.
4. `draw.js` — Drew's throwaway sketch of the draw mechanic. A reference, **not** a foundation.

## Your job

Build a simulator that finds **equation-seeded starting numbers** for the game, then run it to hit the
targets below. Where the spec is silent, **make a documented assumption and flag it — never stall, never
ask** (Drew is asleep).

## Objective function (make these measurable)

Across many simulated games at **4–5 players**, a config "passes" if:

- **(a) Smooth progression** — no player mathematically locked out of winning by mid-game; score and
  era-depth climb gradually, not in one spike.
- **(b) Sensible length** — target a full game around **60–120 min** (this is Arnak/Clank weight).
  Report the **round count** and a rough wall-clock at ~3–5 min/turn. **⚠️ Known risk to test hard:** one
  Develop action per turn may make climbing the Amplifier (6 upgrades) + papers + other modules take too
  many turns. **If games run >2h, that's a headline finding** — likely needs more Develop actions/turn or
  cheaper upgrades. Surface it, don't paper over it.
- **(c) ~80% of games reach a successful Many Worlds ending** (the triumphant finish) rather than
  collapse/timeout. **Also report the per-*attempt* Many Worlds success rate** — Drew didn't specify
  which "80%" he meant, so report both. Consistent with the "collapse threatens ≤50% of games" keystone.
- **Also watch:** overclock actually bites (used but not spammed); voluntary cash-out is *sometimes* the
  right call (or the press-your-luck is hollow); no soft-locks; no runaway-leader inevitability.

## Architecture (the efficient shape)

- A **config object of equation parameters**, not hand-authored cards: e.g. step requirement =
  f(era, step-index; base, slope, noise); reward curve = back-loaded convex (objective ≈ 40–50% of an
  expedition's value); researcher pip-spread = spiky (spike height, off-spike floor, variance); hire &
  upgrade costs; thresholds.
- A **generator** that stamps a full card set from the config (researchers, era cards per tier,
  consequence deck, experts).
- A **game engine** playing full games per the skeleton: turn order (React/Negotiate/Jump/Process/
  Develop/Plan), per-expedition bag build (roster pips + 2/2/2 player base + 1 Trace per instability),
  hand = 2×roster+2, step resolution (play matching cards summing ≥ requirement), overclock (+1
  instability, +1 Trace, **draw 1**), Stabiliser shutdown, the three cleanup paths (incl. the early-game
  vent), banked/back-loaded rewards + voluntary cash-out, Develop (one action), four modules + gating,
  experience (4 tokens → +1 all skills/box, max +2), retirement/parting gift, endgame (**first successful
  Many Worlds ends it**, OR Integrity 0 → the one-round "Unravelling" fuse), scoring (rep + max module
  level + unresearched artefacts@1).
- **2–3 AI policies** (greedy / cautious / balanced). **Document them — they're your biggest assumption.**
- A **sweep harness**: vary parameters over a grid, run N games each, rank configs by target-fit. **Push
  the search into the program** — one Node run should evaluate a whole grid over thousands of games — so
  each working pass *steers* (changes equation forms, fixes modelling gaps) rather than nudging single
  numbers. This is what keeps you cheap.

## Assumptions to just make (flag each in `sim/ASSUMPTIONS.md`)

- 4–5 players. Start: no team, 2 cash, 2/2/2 player base, Amp/Cap/Collimator 1, Stabiliser max 2.
- Era card shape: 2–4 steps; mix of gates (obstacle) and finds (bank cash); objective holds the paper;
  some steps profession-locked (knowledge), danger steps open Grit.
- Costs: postdocs ~2–3 cash, experts ~8–10; module upgrades escalate.
- Consequence deck: mixed valence per skeleton §4.
- One home job per researcher per turn.
- Turn-1 seeded gentle Recent starter expedition (optional — note if you model it).
- Anything else the spec doesn't pin: pick a sane value, parameterise it, flag it.

## Working discipline

- Branch **`sim-balance`** off development. Commit each working increment (`rtk git ...` per the repo's
  CLAUDE.md). Never touch `main`/`development` directly with WIP sim code.
- Stack: plain **JS or TypeScript + Node**, no heavyweight deps. (Drew's stack is TS; either is fine.)
- Keep a compact **`sim/PROGRESS.md`** (what's built, current best config, what's next) so each loop
  iteration resumes **without re-reading everything** — that's how you stay lean.
- Put every modelling decision in **`sim/ASSUMPTIONS.md`** — the file Drew reads first.

## Deliverables by morning (all under `sim/`)

- The working sim (engine + generator + policies + sweep).
- **`sim/RESULTS.md`** — recommended config (the equations + their parameters), the metrics it hits, and
  **2–3 sample game traces** (turn-by-turn) Drew can eyeball.
- **`sim/ASSUMPTIONS.md`** — every decision needing his eye, especially the AI policies and card shapes.
- A short "what this does **not** tell us" note (it's a numbers tool; *fun* needs the paper playtest;
  balanced-for-a-bot ≠ balanced-for-humans).

## The one rule about honesty

The output is **"numbers good enough to print and paper-test," not "the game is balanced."** Flag
everything uncertain. Drew would far rather a smaller honest result than an impressive-looking one built
on hidden guesses. He reads diffs and he'll spot a fudge.
