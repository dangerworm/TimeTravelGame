# Balance Simulator — Control-Knob Manual

_A technical reference for `sim/sim.js`. Pairs with `RESULTS.md` (current metrics), `ASSUMPTIONS.md`
(modelling choices) and `best-config.json` (the saved reference config). For the **game** itself read
`../game-design-document.md`; this file is about the **tuning model**._

> **The single source of numeric truth is `lockedConfig()` in `sim/sim.js`** (mirrored to
> `best-config.json` via `--dumpconfig`). Every design doc defers to it. If a number here and the code
> disagree, the code wins — fix this file.

---

## 1. What the sim is — and isn't

A plain-Node Monte-Carlo model (no dependencies) that plays thousands of games with policy-driven
bots to check that the **economy is coherent and balanced** across player counts. It answers
"_is this reachable / winnable / survivable?_", not "_is this fun?_".

**It does not model:** fun, alliances, the Negotiate phase, retirement timing, disrepute-as-tokens
(it nets ethics costs straight off Reputation — same arithmetic, no separate pile), or the en-route
Sell-or-Publish choice. Those are design decisions the **paper playtest** judges. Treat every number
as a _starting grid_, not proof.

**Drew can't see past the first line of a run — always paste a summary table back.**

---

## 2. Running it

```bash
node sim/sim.js              # regenerate RESULTS / ASSUMPTIONS / PROGRESS from lockedConfig()
node sim/sim.js --quick      # same, fewer games (fast iteration)
node sim/sim.js --matrix     # composition × 2–6 players → THE balance verdict
node sim/sim.js --pushprobe  # reckless-player stress test (does the gamble have teeth?)
node sim/sim.js --retuneMW   # re-tunable sweep harness — edit its grid for whatever you're tuning
node sim/sim.js --dumpconfig # write lockedConfig() → best-config.json
node sim/sim.js --analyze    # per-archetype breakdown
node sim/sim.js --expA/--expB/--trace1/--sweep   # legacy diagnostic modes
```

All seeds are **deterministic** — same config in, same numbers out. Re-running an unchanged config
tells you nothing new; change a knob (or use `--matrix`/`--pushprobe`) to learn something.

---

## 3. The config object — every knob

Era indices are **0-based**: `0 Recent · 1 Modern · 2 Early Modern · 3 Medieval · 4 Ancient ·
5 Prehistoric · 6 Many Worlds`.

### 3.1 Expedition difficulty

| Knob | Value | Meaning |
|---|---|---|
| `reqBase` | 0.6 | base skill requirement per step |
| `reqEraSlope` | 0.2 | added per era of depth |
| `reqStepSlope` | 0 | added per step along a card (deliberately flat) |
| `eraStepBands` | `3·3·4·4·5·5·5` | **steps per card** by era (length of the ladder) |
| `dangerChance` | 0.20 | a step is a **Grit danger** check (any brave scientist answers) |
| `profLockChance` | 0.33 | an Insight step is Historian-locked / a Craft step Engineer-locked (knowledge gate) |

**Requirement formula:** `req = max(1, round(reqBase + reqEraSlope·era + reqStepSlope·step))`.

| Era | Recent | Modern | E.Mod | Medieval | Ancient | Prehist | ManyW |
|---|---|---|---|---|---|---|---|
| steps/card | 3 | 3 | 4 | 4 | 5 | 5 | (MW: see §3.10) |
| req/step | 1 | 1 | 1 | 1 | 1 | **2** | — |

So deep eras are **long ladders of gentle gates**, not high walls — the challenge is the length of
the climb and the final gamble. ⚠️ **A danger spike can't just be a high requirement** — a single
high-req step outruns the hand; make danger bite via instability/consequence instead.

### 3.2 Rewards

| Knob | Value | Meaning |
|---|---|---|
| `cashFindBase` / `cashFindSlope` | 3 / 1.0 | the en-route **find** value before the multiplier |
| `findPayoutMult` | 2.0 | global multiplier on **find** cash (not on rep) |
| `repObjBase` / `repObjSlope` | 2 / 1.5 | the **objective**'s Reputation (artefact's printed value) |
| `objCashChance` | 0.40 | share of objectives that pay **Cash** instead of being a plunderable artefact |
| `paperRepBase` / `paperRepBonus` | 4 / 1 | _largely vestigial_ — recording/publishing now pays the objective's **printed** rep, not a flat paper value |
| `partingRep` | 2 | Reputation from a retirement Parting Gift |

**En-route find cash** = `round((cashFindBase + cashFindSlope·era) · findPayoutMult)`:

| Era | Recent | Modern | E.Mod | Medieval | Ancient | Prehist |
|---|---|---|---|---|---|---|
| find Cash | 6 | 8 | 10 | 12 | 14 | 16 |

**Objective rep** (artefact) = `round(repObjBase + repObjSlope·era)`: Recent **2** → Ancient **8** →
Prehistoric **10/11**. A cash-objective (40%) instead pays `round((3+era)·1.5)` Cash. Publishing or
Recording pays this printed rep; **historian experience does not change it** (decided 10 Jun).

### 3.3 Early-relief spoils

| Knob | Value | Meaning |
|---|---|---|
| `earlySpoilChance` | 0.15 | per-step chance (steps before the penultimate) of a small extra Cash drop |
| `earlySpoilCashMin/Max` | 1 / 2 | size of that drop |
| `earlySpoilEraMax` | 4 | only eras with index **< 4** (Recent–Medieval) get them |

Rolls step-by-step and **stops at the first hit → max one per card**. Card-level incidence ≈ 28%
(3-step) to 39% (5-step) in shallow eras. **Pure Cash, no paper.** A shallow-era sweetener; deep
ladders stay lean.

### 3.4 Plunder & the ethics dial

| Knob | Value | Meaning |
|---|---|---|
| `doomedChance` | 0.35 | share of artefact objectives that are **doomed** (clean to grab/sell) |
| `plunderImprint` | `[1,1,1,2,2,3,3]` | Timeline Integrity scarred by plundering a **non-doomed** artefact, by era |

Doomed artefacts grab clean (no scar, no disrepute). Sell disrepute (a non-doomed artefact) =
`max(1, floor((rep−1)/2))`. In the sim this is netted off Reputation; in the **game** it is a
separate **disrepute token** pile (§9 of the skeleton) — same arithmetic, visible portrait.

### 3.5 Researchers (the market)

| Knob | Value | Meaning |
|---|---|---|
| `postdocTotalMin/Max` | 3 / 6 | total pips on a junior |
| `postdocPipFloor/Ceiling` | 0 / 3 | per-skill range for a junior |
| `postdocCostMin/Max` | 3 / 7 | hire cost (≈ total pips, +1 if any skill at ceiling, clamped) |
| `expertTotal…` / `expertPip…` | 9–15 / 3–5 | experts: more total, higher floor (always capable) |
| `expertCostMin/Max` | 9 / 16 | experts buy capability, not legacy (can't be retired) |

### 3.6 The machine (cumulative cash to climb)

| Module | `*Costs` (per upgrade) | Gates |
|---|---|---|
| **Amplifier** | `[0,1,2,4,6,9]` | max era. Cumulative: Modern 0 · E.Mod 1 · Medieval 3 · Ancient 7 · Prehist 13 · **ManyWorlds 22** |
| **Capacitor** | `[3,4,6,9]` | roster size → hand size. Cumulative 3·7·13·22 |
| **Collimator** | `[3,5,8]` | era cards drawn at Plan. Cumulative 3·8·16 |
| **Stabiliser** | `[4,7]` (+2 cap each) | instability before shutdown. Starts max 2 → 4 → 6 |

`ampCosts[0] = 0` is **intentional** (first upgrade free). Beware a `!cost` falsy-zero bug — the code
uses `cost == null`; preserve that if you touch amp logic.

### 3.7 The bag & hand (the resolution engine)

| Knob | Value | Meaning |
|---|---|---|
| `baseI/baseC/baseG` | 2 / 2 / 2 | permanent **player base** in every bag (the early floor) |
| `handPerResearcher` | 2 | hand size contribution per researcher sent |
| `handBase` | 2 | flat add to hand size — **load-bearing, see §4** |

**Hand size = `handPerResearcher × roster + handBase`**, refilled to that size at the **start of
every step** (reshuffling the discard). Overclock draws **+1** beyond the cap.

### 3.8 Experience

| Knob | Value | Meaning |
|---|---|---|
| `expPerBox` | 2 | uses (expedition / paper / upgrade) to fill one box |
| `expMaxBoxes` | 2 | **earnable** boxes (a 3rd is shown but pre-filled) |
| `expBonus` | 1 | +1 to all three skills per earned box |

So **4 uses** take a fresh recruit to max (+2 all skills). An engineer at base clears
`Craft pips + earned boxes` instability per turn.

### 3.9 Timeline Integrity & consequences

| Knob | Value | Meaning |
|---|---|---|
| `integrityPerPlayerPlus1` | 4 | **Integrity pool = (players + 1) × 4** → 12 (2p) · 16 (3p) · **20 (4p)** · 24 (5p) · 28 (6p) |
| `consWeights` | see below | weighted draw table for a consequence card |
| `consEraScale` | 0 | era-scaling of consequence severity (currently off) |

`consWeights`: `int1 20 · int2 8 · cashLoss 15 · cashGain 12 · repLoss 10 · repGain 10 · modLoss 5 ·
nothing 20`. A consequence is drawn at the end of **any turn with ≥1 overclock** (clean runs draw
none). `repLoss` here is an honest setback (peer review), **not** disrepute.

### 3.10 Many Worlds — the win-rate brake

| Knob | Value | Meaning |
|---|---|---|
| `mwSteps` | 5 | steps on the Many Worlds card |
| `mwReqPerStep` | 5 | pips required per step (a flat wall, unlike normal eras) |
| `mwIntegDmgFail` | 2 | Integrity lost when an MW attempt fails a step |

**Tune MW difficulty here — not the era economy — to move the win rate.** The 5×5 gauntlet + `−2`
fail is what makes the multiverse **rare/sacred** (~50%); a gentler gauntlet floods it, a harder one
starves the deep ladders of a payoff.

### 3.11 Start state & game length

| Knob | Value | Meaning |
|---|---|---|
| `startCash` | 3 | enough for one cheap postdoc turn one |
| `startAmp/Cap/Col` | 1 / 1 / 1 | Amplifier free first upgrade opens Modern immediately |
| `startStab` | 2 | overclock is a genuine gamble from turn one |
| `maxRounds` | 30 | **a backstop only** — the game ends by Triumph / all-retired / Collapse, not a round cap |

---

## 4. Load-bearing knobs — change with care

- **`handBase = 2`** — the `+2` is what makes deep ladders climbable. At `handBase 0` (`2×roster`)
  deep completion **craters to ~21%** and folding spikes to ~62%. Don't drop it.
- **`startStab = 2`** — gives the gamble teeth: a carried instability + one push for the objective can
  trip a shutdown. Raising it neuters the overclock thrill.
- **`startAmp` first-upgrade-free (`ampCosts[0]=0`)** — removes the dead opening crawl (Recent+Modern
  open turn one). Don't let a falsy-zero bug skip it.
- **`mwSteps`/`mwReqPerStep`** — the **only** dial you should use to move the win rate. Touching the
  era economy to chase MW% breaks deep-completion instead (tried; it doesn't work).
- **`plunderImprint`** — the shared half of the greed dial. Flattening it disconnects greed from
  collapse.

---

## 5. Tuning cheat-sheet (which knob moves which metric)

| Want to move… | Primary knob(s) | Watch for collateral |
|---|---|---|
| **MW success rate** | `mwSteps`, `mwReqPerStep`, `mwIntegDmgFail` | deep-completion if you touch the economy instead |
| **Collapse rate** | `integrityPerPlayerPlus1`, `plunderImprint`, `consWeights.int1/2` | overclock feeling |
| **Game length** | `eraStepBands`, `ampCosts` (Amp-7 gate) | deep objectives becoming unreachable |
| **Deep reachability** | `handBase`, `reqEraSlope`, `eraStepBands` | cash-out rate, MW rate |
| **Overclock frequency** | (mostly bot policy, not a knob) `reqEraSlope` | a floor ~19% is bot conservatism — see `--pushprobe` |
| **Cash flow** | `findPayoutMult`, `cashFindBase/Slope`, `earlySpoil*` | the cash-vs-legacy tension |

---

## 6. Blind spots (what the sim cannot tell you)

- **Fun** is not modelled. A bot maximising EV ≠ a human having a good night.
- **No alliances / Negotiate** — bots attempt MW solo, so the real MW rate at a human table is
  likely **higher** than the sim shows.
- **No retirement/Parting-Gift modelling** — the team-legacy keystone is under-measured.
- **The all-cautious row is degenerate** (the bot never leaves Recent) — ignore it in `--matrix`.
- **Overclock ~19% is a bot-conservatism floor**, not a design flaw — `--pushprobe` shows a reckless
  player overclocks 60%+ and bricks 2–4×/game. The gamble is a _choice_; the playtest judges its feel.

**The paper playtest is the ground truth.** These numbers are where to start, not what to defend.
