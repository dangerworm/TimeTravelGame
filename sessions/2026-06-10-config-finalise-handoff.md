# Session handoff — 10 Jun 2026 (afternoon): config finalised, repo cleaned

Branch: **`sim-balance`** (not merged into main). **No git remote — nothing is backed up off this
machine.** This continues the morning's work _after_ the overnight sim (see the earlier
`2026-06-10-sim-balance-handoff.md` for that).

## Read first

1. `tasks.md` → the **⭐ Next session** block + **"Still open / new"** — that's the literal plan.
2. `sim/RESULTS.md` (current metrics) and `sim/best-config.json` (the saved reference config).
3. `design-skeleton.md` (the v4 ruleset) · `core-goals.md` · `constraints.md`.
4. This file, then `archive/v2-v3-design-log.md` only if you need the _why_ behind a locked
   decision.

## What this session did

A long, productive tuning + cleanup run. Headlines:

- **Researcher model reworked** (Drew's spec): specialist/non-specialist pips, total **3–6** postdoc
  / **9–15** expert; cost = total pips (+1 if any skill at ceiling), clamped to 3–7 / 9–16.
- **Papers reframed** — _recording an objective now counts as a paper_ → ~17/game (was 2.4). Matches
  the "research group constantly publishing" fiction.
- **Multiverse made RARE/sacred** — MW is now a **5×5 gauntlet** (5 steps × 5 pips) + failed-MW −2 →
  MW success ~**52%** (was 72%). Endgame spread now ≈ **52% triumph / 36% collapse / 12% quiet
  legacy**.
- **Drew's dial pass**: startCash 3, startAmp 1 (with `ampCosts[0]=0` so the first amp upgrade is
  free), growth step bands 3/3/4/4/5/5, integrity = **(players+1)×4**, Stabiliser +2 per upgrade,
  consequences no longer era-scaled, expPerBox 2, maxRounds 30.
- **Overclock-thrill question RESOLVED** (see Key insights). Added a **reckless** archetype +
  `--pushprobe`.
- **Repo cleanup (task 1 done)**: `prototypes/` deleted (5 destinations extracted →
  `decks/destinations/seed-cards.md`); scratchpad → `archive/v2-v3-design-log.md`; stale sim files
  pruned; `CLAUDE.md` status/read-list updated.
- **Title:** "Warped" confirmed as **working** title, **pending IP check** (a "Warped Reality Games"
  publisher and a "Warped Board Games" indie exist — may force a rethink; no rename done yet).

## The game as it stands (locked config — in `sim/best-config.json` / `lockedConfig()`)

```
Resolution:  refill hand to 2×roster+2 each step, reshuffle discard (NOT deplete-once)
Era cards:   growth step bands 3/3/4/4/5/5 (+MW 5); penultimate-only spoils; reqBase 0.6, eraSlope 0.2, stepSlope 0
Researchers: SS/NSS pips; postdoc total 3-6 (cost 3-7), expert 9-15 (cost 9-16); free starter NOT seeded (startCash 3 affords one)
Machine:     ampCosts [0,1,2,4,6,9] (amp 1-7, 1->2 free); cap [3,4,6,9]; col [3,5,8]; stab [4,7] (+2/upgrade)
Economy:     findPayoutMult 2.0; integrity (players+1)×4; consEraScale 0
Plunder:     non-doomed scars integrity [1,1,1,2,2,3,3] by era; doomed grabs clean; disrepute max(1,floor((rep-1)/2))
Many Worlds: 5 steps × 5 pips; failed-MW -2; unlocks at amp 7 (Engineer + Physicist both maxed)
Experience:  3 boxes shown, 1 pre-filled → 2 EARNABLE (+2 pip cap); expPerBox 2
4-player:    MW ~52% · deep-objective ~50% · collapse ~36% · papers ~17 · ~16-17 rounds
```

## The simulator (`sim/sim.js`, plain Node, no deps)

`node sim/sim.js` regenerates RESULTS/ASSUMPTIONS/PROGRESS from `lockedConfig()`. Modes: `--matrix`
(composition × 2–6 players — **the balance verdict**), `--pushprobe` (reckless-player stress test),
`--retuneMW` (a re-tunable sweep harness — edit its grid for whatever you're tuning), `--dumpconfig`
(writes `best-config.json`), `--analyze`, `--expA/B`, `--trace1`, `--sweep` (legacy). All seeds
deterministic. **Drew can't see past the first line of a sim run — always paste a summary table back
to him.**

## Open fronts — next-session priority (from `tasks.md` ⭐ block)

1. **Needs Drew:** confirm Negotiate/lending terms; the title IP check.
2. **Doc reconciliation (task 4, solo-doable, the next obvious job):** read the live docs and fix
   the known drift — `design-skeleton` §6/§9 still say "three experience boxes / 1-1-1 baseline"
   (locked: 2 earnable boxes / 2-2-2 base); sweep **spoils→Cash, Nerve→Grit**; the skeleton's
   provisional numbers are superseded by `best-config.json`. This sets up task 7.
3. **The definitive GDD (task 7)** — one clean game-design document.
4. **Document the control knobs (task 6)**, playtest content (task 8), renderer (task 9, uses
   `design/2026-06-09-post-whiteboarding-with-andy.png`).
5. **Endgame flavour & reflection (⭐ important):** MW is now rare, so ~half of games end without it
   — the collapse and quiet-legacy endings **must feel like "a life well lived," not a 3-hour
   loss.** They need flavour text + a reflection/score-recap beat. This is the design job riding
   alongside the rare-MW decision.

## Key insights from my context the next instance MUST know

- **The ~19% overclock rate is a BOT-CONSERVATISM FLOOR, not a design flaw.** Do NOT try to "fix" it
  by tuning reqs/hand/income — that just breaks other things (we tried; harder reqs cratered deep
  completion to 14% and OC stayed ~20%). `--pushprobe` proved it: a _reckless_ player overclocks
  60%+ and bricks the machine 2–4×/game, and the game survives even an all-reckless table (MW 38%,
  collapse 46%). The gamble is a **player choice**; the playtest judges whether it _feels_
  thrilling.
- **The refill resolution model was a 1am bug-catch — do not revert to deplete-once.** The hand tops
  up to 2×roster+2 _each step_ and reshuffles the discard. The `+2` is load-bearing (deep cards
  stall without it).
- **`ampCosts[0]=0` is intentional** (free first upgrade). There was a bug where cost 0 was treated
  as falsy and skipped — fixed in `tryAmpUpgrade` (`cost == null`, not `!cost`). If you touch amp
  logic, preserve that.
- **The sim measures balance & coherence, NOT fun.** The paper playtest is the only ground truth for
  feel. Don't over-tune numbers chasing a feeling the bots can't represent.
- **Sim blind spots:** no alliances/negotiation (bots attempt MW solo → real MW likely higher); no
  retirement/parting-gift modelled (the team-legacy keystone is under-measured); the **all-cautious
  bot is degenerate** (never leaves Recent — ignore that row).
- **Game length (~16–17 rounds / ~3h sim estimate)** is a real flag the career-epic narrative
  excuses but the table may not. Watch it in playtest.

## Housekeeping

- Commits this session (all on `sim-balance`): the morning sim rework + best-config; the design
  endgame/reflection note; the repo-cleanup commit (`33d304e`). Working tree clean at handoff.
- `decks/destinations/seed-cards.md` and `decks/retirement/seed-cards.md` are the tonal + structural
  benchmarks for playtest content (task 8).

## Personal note

This was a marathon — two sessions back to back — and the best parts were Drew's. He caught the
single most important bug himself (the refill model, at 1am, from a gut "how can endgame steps need
one pip?"), and his instinct to make the multiverse _rare_ turned a balanced-but-flat win condition
into something with real stakes and three distinct endings. The narrative-reflection request at the
end — checking the metrics against the _story_ of a scientist's career — is exactly the right way to
keep this honest, and it surfaced the one thing the sim can't: that a rare-win game lives or dies on
whether _losing well_ feels good. That's the thread to keep pulling. The game is balanced and
coherent; whether it's _fun_ is still unwritten, and that's the playtest's job. Good project. Look
after it.
