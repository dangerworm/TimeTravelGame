# Balance Simulator — Results

_Generated 2026-06-10T11:04:30.666Z_

## TL;DR

| | 4-player | 5-player | Target |
|---|---|---|---|
| Many Worlds success | 51.8% | 55.8% | ~75% |
| Deep-objective completion | 50.2% | 49.5% | ~40% |
| Avg rounds | 16.62 | 17.29 | 8–12 |
| Wall clock (est.) | 199 min | 259 min | 60–120 min |
| Overclock rate | 18.8% | 16.8% | ~30–40% |
| Cash-out rate | 39.1% | 39.4% | ~30–50% |
| Collapse rate | 35.6% | 29.2% | ≤50% |
| Avg shutdowns (table total) | 1.74 | 1.72 | pusher-heavy → see ↓ |
| Avg papers | 17.35 | 19.09 | 3–8 |
| Score spread | 27.47 | 29.30 | >3 |

### Shutdowns by archetype (4-player, per player per game)

_The gamble should concentrate in the pusher, not spread evenly._

| Archetype | Shutdowns/game | Overclocks/game | Plunders/game | OC rate | Cash-out rate |
|---|---|---|---|---|---|
| greedy | 0.69 | 3.09 | 1.10 | 34.4% | 43.6% |
| balanced | 0.37 | 1.03 | 0.48 | 14.7% | 40.2% |
| cautious | 0.00 | 0.00 | 0.17 | 0.0% | 54.3% |

## Recommended Equations

### Step Requirements

`req(eraIdx, stepIdx) = max(1, round(0.6 + 0.2×eraIdx + 0×stepIdx))`

| Era | depth | step0 | step1 | step2 | step3 |
|---|---|---|---|---|---|
| Recent | 1 | 1 | 1 | 1 | 1 |
| Modern | 2 | 1 | 1 | 1 | 1 |
| EarlyModern | 3 | 1 | 1 | 1 | 1 |
| Medieval | 4 | 1 | 1 | 1 | 1 |
| Ancient | 5 | 1 | 1 | 1 | 1 |
| Prehistoric | 6 | 2 | 2 | 2 | 2 |
| ManyWorlds | 7 | 2 | 2 | 2 | 2 |

### Rewards

- Find step cash: `3 + 1×eraIdx` → Recent: 3, Prehistoric: 8
- Objective rep: `2 + 1.5×eraIdx` → Recent: 2, Prehistoric: 10
- Publishing an artefact pays its **printed Reputation** (= the objective rep, 2–10 by era); historian experience does **not** modify it (DECIDED 10 Jun)

### Costs

- Postdocs: 3–7 | Experts: undefined
- Amplifier: [0, 1, 2, 4, 6, 9] (levels 1→2 through 6→7, total 22 cash)
- Capacitor: [3, 4, 6, 9]
- Collimator: [3, 5, 8]
- Stabiliser: [4, 7]
- Timeline Integrity: undefined (4p) / undefined (5p)

## Sample Game Traces (4-player)

### Trace 1 — ends: timeout, 30 rounds

Scores: 2 / 2 / 2 / 2

| Rnd | P | Policy | Era | Team | Cash | Rep | Instab | Integr | Amp | Expedition |
|-----|---|--------|-----|------|------|-----|--------|--------|-----|------------|
| 1 | 0 | greedy | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 1 | 1 | cautious | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 1 | 2 | balanced | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 1 | 3 | greedy | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 2 | 0 | greedy | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 2 | 1 | cautious | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 2 | 2 | balanced | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 2 | 3 | greedy | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 3 | 0 | greedy | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 3 | 1 | cautious | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 3 | 2 | balanced | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 3 | 3 | greedy | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 4 | 0 | greedy | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 4 | 1 | cautious | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 4 | 2 | balanced | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 4 | 3 | greedy | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 5 | 0 | greedy | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 5 | 1 | cautious | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 5 | 2 | balanced | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 5 | 3 | greedy | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 6 | 0 | greedy | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 6 | 1 | cautious | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 6 | 2 | balanced | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 6 | 3 | greedy | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 7 | 0 | greedy | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 7 | 1 | cautious | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 7 | 2 | balanced | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 7 | 3 | greedy | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 8 | 0 | greedy | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 8 | 1 | cautious | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 8 | 2 | balanced | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 8 | 3 | greedy | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 9 | 0 | greedy | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 9 | 1 | cautious | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 9 | 2 | balanced | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 9 | 3 | greedy | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 10 | 0 | greedy | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 10 | 1 | cautious | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 10 | 2 | balanced | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 10 | 3 | greedy | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 11 | 0 | greedy | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 11 | 1 | cautious | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 11 | 2 | balanced | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 11 | 3 | greedy | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 12 | 0 | greedy | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 12 | 1 | cautious | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 12 | 2 | balanced | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 12 | 3 | greedy | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 13 | 0 | greedy | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 13 | 1 | cautious | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
_(70 rows omitted)_

### Trace 2 — ends: timeout, 30 rounds

Scores: 2 / 2 / 2 / 2

| Rnd | P | Policy | Era | Team | Cash | Rep | Instab | Integr | Amp | Expedition |
|-----|---|--------|-----|------|------|-----|--------|--------|-----|------------|
| 1 | 0 | greedy | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 1 | 1 | cautious | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 1 | 2 | balanced | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 1 | 3 | greedy | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 2 | 0 | greedy | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 2 | 1 | cautious | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 2 | 2 | balanced | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 2 | 3 | greedy | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 3 | 0 | greedy | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 3 | 1 | cautious | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 3 | 2 | balanced | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 3 | 3 | greedy | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 4 | 0 | greedy | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 4 | 1 | cautious | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 4 | 2 | balanced | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 4 | 3 | greedy | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 5 | 0 | greedy | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 5 | 1 | cautious | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 5 | 2 | balanced | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 5 | 3 | greedy | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 6 | 0 | greedy | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 6 | 1 | cautious | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 6 | 2 | balanced | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 6 | 3 | greedy | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 7 | 0 | greedy | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 7 | 1 | cautious | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 7 | 2 | balanced | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 7 | 3 | greedy | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 8 | 0 | greedy | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 8 | 1 | cautious | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 8 | 2 | balanced | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 8 | 3 | greedy | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 9 | 0 | greedy | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 9 | 1 | cautious | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 9 | 2 | balanced | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 9 | 3 | greedy | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 10 | 0 | greedy | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 10 | 1 | cautious | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 10 | 2 | balanced | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 10 | 3 | greedy | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 11 | 0 | greedy | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 11 | 1 | cautious | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 11 | 2 | balanced | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 11 | 3 | greedy | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 12 | 0 | greedy | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 12 | 1 | cautious | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 12 | 2 | balanced | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 12 | 3 | greedy | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 13 | 0 | greedy | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 13 | 1 | cautious | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
_(70 rows omitted)_

### Trace 3 — ends: collapse, 18 rounds

Scores: 13 / 15 / 14 / 23

| Rnd | P | Policy | Era | Team | Cash | Rep | Instab | Integr | Amp | Expedition |
|-----|---|--------|-----|------|------|-----|--------|--------|-----|------------|
| 1 | 0 | greedy | Recent | 1 | 0 | 0 | 0 | 20 | 1 | 1/3 oc=0 |
| 1 | 1 | cautious | Recent | 2 | 2 | 0 | 0 | 20 | 1 | 3/3 oc=0 |
| 1 | 2 | balanced | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 1 | 3 | greedy | Recent | 0 | 3 | 0 | 0 | 20 | 1 | skip |
| 2 | 0 | greedy | Recent | 2 | 2 | 0 | 0 | 19 | 1 | 3/3 oc=0 |
| 2 | 1 | cautious | Recent | 3 | 4 | 0 | 0 | 19 | 2 | 3/3 oc=0 |
| 2 | 2 | balanced | Recent | 1 | 0 | 0 | 0 | 19 | 1 | skip |
| 2 | 3 | greedy | Recent | 0 | 3 | 0 | 0 | 19 | 1 | skip |
| 3 | 0 | greedy | Recent | 3 | 0 | 0 | 1 | 19 | 1 | 1/3 oc=1 |
| 3 | 1 | cautious | Recent | 3 | 6 | 0 | 0 | 19 | 3 | 3/3 oc=0 |
| 3 | 2 | balanced | Recent | 2 | 1 | 0 | 0 | 19 | 1 | 3/3 oc=0 |
| 3 | 3 | greedy | Recent | 0 | 3 | 0 | 0 | 19 | 1 | skip |
| 4 | 0 | greedy | Modern | 3 | 0 | 0 | 0 | 19 | 2 | 0/3 oc=0 |
| 4 | 1 | cautious | Recent | 3 | 6 | 0 | 0 | 19 | 4 | 2/3 oc=0 |
| 4 | 2 | balanced | Recent | 3 | 0 | 2 | 0 | 18 | 1 | 3/3 oc=0 |
| 4 | 3 | greedy | Recent | 0 | 3 | 0 | 0 | 18 | 1 | skip |
| 5 | 0 | greedy | Modern | 3 | 0 | 0 | 0 | 18 | 2 | 1/3 oc=0 |
| 5 | 1 | cautious | Recent | 3 | 2 | 0 | 0 | 18 | 5 | 0/3 oc=0 |
| 5 | 2 | balanced | Recent | 3 | 3 | 2 | 0 | 17 | 2 | 3/3 oc=0 |
| 5 | 3 | greedy | Recent | 0 | 3 | 0 | 0 | 17 | 1 | skip |
| 6 | 0 | greedy | Modern | 3 | 0 | 0 | 0 | 17 | 2 | 0/3 oc=1 |
| 6 | 1 | cautious | Recent | 3 | 2 | 0 | 0 | 17 | 5 | 0/3 oc=0 |
| 6 | 2 | balanced | Modern | 3 | 2 | 2 | 0 | 17 | 3 | 1/3 oc=0 |
| 6 | 3 | greedy | Recent | 0 | 3 | 0 | 0 | 17 | 1 | skip |
| 7 | 0 | greedy | Modern | 3 | 0 | 0 | 0 | 17 | 2 | 0/3 oc=1 |
| 7 | 1 | cautious | Recent | 3 | 2 | 2 | 0 | 17 | 6 | 3/3 oc=0 |
| 7 | 2 | balanced | Modern | 4 | 2 | 2 | 0 | 17 | 3 | 3/3 oc=0 |
| 7 | 3 | greedy | Recent | 1 | 0 | 0 | 0 | 17 | 1 | skip |
| 8 | 0 | greedy | EarlyModern | 3 | 0 | 0 | 0 | 17 | 3 | 0/3 oc=1 |
| 8 | 1 | cautious | Recent | 3 | 1 | 2 | 0 | 17 | 6 | 2/3 oc=0 |
| 8 | 2 | balanced | EarlyModern | 4 | 0 | 2 | 0 | 17 | 4 | 0/3 oc=0 |
| 8 | 3 | greedy | Recent | 2 | 0 | 0 | 0 | 17 | 1 | 2/3 oc=0 |
| 9 | 0 | greedy | EarlyModern | 3 | 0 | 0 | 0 | 17 | 3 | 0/4 oc=0 |
| 9 | 1 | cautious | Recent | 3 | 3 | 4 | 0 | 17 | 6 | 3/3 oc=0 |
| 9 | 2 | balanced | EarlyModern | 5 | 4 | 4 | 0 | 17 | 4 | 4/4 oc=0 |
| 9 | 3 | greedy | Recent | 2 | 3 | 0 | 0 | 17 | 1 | 3/3 oc=0 |
| 10 | 0 | greedy | Medieval | 4 | 0 | 0 | 0 | 17 | 4 | 4/4 oc=0 |
| 10 | 1 | cautious | Recent | 3 | 1 | 4 | 0 | 17 | 6 | 2/3 oc=0 |
| 10 | 2 | balanced | Medieval | 5 | 0 | 4 | 0 | 17 | 5 | 2/4 oc=0 |
| 10 | 3 | greedy | Recent | 3 | 2 | 0 | 0 | 17 | 1 | 3/3 oc=0 |
| 11 | 0 | greedy | Medieval | 4 | 0 | 0 | 0 | 17 | 4 | 2/4 oc=1 |
| 11 | 1 | cautious | Recent | 3 | 1 | 4 | 0 | 17 | 6 | 1/3 oc=0 |
| 11 | 2 | balanced | Medieval | 6 | 7 | 7 | 0 | 16 | 5 | 3/4 oc=2 |
| 11 | 3 | greedy | Recent | 4 | 1 | 2 | 0 | 16 | 1 | 3/3 oc=0 |
| 12 | 0 | greedy | Medieval | 4 | 0 | 0 | 0 | 16 | 4 | 1/4 oc=1 |
| 12 | 1 | cautious | Recent | 3 | 1 | 6 | 0 | 16 | 6 | 3/3 oc=0 |
| 12 | 2 | balanced | ManyWorlds | 7 | 0 | 7 | 0 | 16 | 7 | 4/4 oc=0 |
| 12 | 3 | greedy | Modern | 5 | 0 | 2 | 0 | 16 | 2 | 3/3 oc=0 |
| 13 | 0 | greedy | Prehistoric | 4 | 2 | 7 | 0 | 16 | 6 | 4/4 oc=0 |
| 13 | 1 | cautious | Recent | 3 | 0 | 6 | 0 | 16 | 6 | 2/3 oc=0 |
_(18 rows omitted)_

## What This Does NOT Tell Us

- **Fun is not modelled.** A bot that maximises EV ≠ a human having a good time.
- **No alliance mechanic.** Bots attempt Many Worlds solo. Human tables will coordinate; real MW success rate is likely higher.
- **No negotiation.** The Negotiate phase (cash loans, deals) is absent.
- **Bots don't respond to social dynamics** — a trailing human will take wild risks; a bot stays policy-compliant.
- **Paper playtest is the ground truth.** These numbers are starting points, not proof of balance.
