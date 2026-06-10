# Session handoff — 10 Jun 2026 (the balance-sim marathon)

Branch: **`sim-balance`** (not merged). No remote — nothing is backed up off this machine.

## Read first
1. `tasks.md` → the **⭐ Next session** block at the top is your literal plan (Drew's 9-point list + 4 open
   questions/ideas). Start there.
2. `sim/RESULTS.md` — the recommended config + metrics. `sim/ASSUMPTIONS.md` — every modelling choice.
3. `constraints.md` — all the decisions locked this session are dated **9–10 Jun**.
4. This file.

## What this session did (a lot)
Started from "the expedition feels a bit dull / too safe" and ended with a **cross-count-balanced engine**.
Major moves, in order:
- **Gave the overclock gamble teeth** — `startStab 2`, greedy bot reaches for objectives → ~2–3 shutdowns
  for the pusher, ~0 for the careful. Fixed cash-out (69%→~40%).
- **Killed the opening crawl** — `startAmp 2` (Recent+Modern open turn one).
- **Artefact economy** — Model B (Sell XOR keep-for-points); disrepute `max(1,floor((rep-1)/2))`, **0 for
  doomed**; paper rep = the artefact's printed value (historian experience does NOT modify it).
- **Experiment B** — penultimate-only spoils; deeper eras = longer ladders of gentler gates.
- **⚠️ THE BIG CATCH (Drew, 1am):** the sim (and the literal spec) drew the hand **once and depleted** it
  across all steps. Drew's real intent — **refill the hand to `2×roster+2` at the start of every step,
  reshuffling the discard** — is now implemented. This dissolved the whole "chip-stall" thread. "Bag =
  stamina / no reshuffle" is dropped; stamina = Trace pollution + instability. **`+2` is load-bearing.**
- **Plunder-imprint (the greed dial)** — non-doomed plunder scars Integrity `[1,1,2,2,3,3,4]` by era;
  doomed grabs clean. Archetypes plunder very differently (greedy ~1.2/game, balanced ~0.5, cautious ~0.1);
  greedy-heavy tables collapse far more. Plundered artefacts Publish (rep) or Sell (cash) at the desk.
- **Cross-count balance check** (`--matrix`): the game holds **MW ~79–84%, collapse ~16–24%, deep ~40%
  across 3/4/5 players**, 2p a touch easier / 6p a touch harder. **It's balanced.**

## The game as it now stands (recommended config — in `lockedConfig()`)
```
Resolution:  refill hand to 2×roster+2 each step, reshuffle discard
Era cards:   scaled bands 2-3/3-4/5-6 · penultimate-only spoils · reqBase 0.6 eraSlope 0.2 stepSlope 0
Economy:     findPayout 1.0× · ampCost 0.8× · capCost 0.6× · integrity 16
Plunder:     imprint [1,1,2,2,3,3,4] · doomedChance 0.35 · disrepute max(1,floor((rep-1)/2))
Many Worlds: 5 steps × 4 pips · failed-MW −1
Early relief: ~15% small spoil on pre-Ancient early steps, max 1/card
→ 4p: MW 76% · deep 40% · collapse 24% · cash-out 39% · papers ~2.7(total)
```

## Sim modes (all in `sim/sim.js`)
`node sim/sim.js` regenerates docs from the locked config. Diagnostics: `--matrix` (composition × 2–6
players — **the balance verdict**), `--retuneMW`, `--retuneB`, `--analyze`, `--expA/--expB`, `--trace1`,
`--sweep` (legacy grid). All deterministic seeds.

## Known asterisks (documented, not blockers)
- **Long game**: ~12–13 rounds, ~150 min. The cost of gentle deep ladders; accepted.
- **Overclock rate ~21%** (refill model → short less often). Watch the gamble's pulse in playtest.
- **Danger spikes can't be high requirements** (a single high-req step outruns the hand) — design them to
  bite via instability/consequence instead.
- **all-cautious is degenerate** in the sim (bot never leaves Recent) — a bot artifact, ignore it.

## Housekeeping
- 6 commits this session on `sim-balance` (3× `sim:`, 3× `design:`). Working tree clean.
- The `+2` / refill correction means `prototypes/prototype-01.md` and any v2/v3 text are now doubly stale —
  repo cleanup (next-session task 1) will archive them.

## Personal note
Drew, this was a genuinely excellent night. You turned a vague "it's dull" into: a gamble with real teeth,
a fixed opening, a settled artefact economy, a working ethical/greed→collapse dial, and a game that proves
balanced across 2–6 players — and you caught the single most important bug (the refill model) yourself, at
1am, from a gut "how can endgame steps need one pip?" That instinct is the most valuable thing in this repo.
You were at 93% quota and still swimming with ideas; they're all captured in `tasks.md`. Rest well. 🌙
