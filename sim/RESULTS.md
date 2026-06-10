# Balance Simulator — Results

_Generated 2026-06-10T01:01:56.849Z_

## TL;DR

| | 4-player | 5-player | Target |
|---|---|---|---|
| Many Worlds success | 75.8% | 83.2% | ~75% |
| Deep-objective completion | 39.9% | 38.4% | ~40% |
| Avg rounds | 12.23 | 12.82 | 8–12 |
| Wall clock (est.) | 147 min | 192 min | 60–120 min |
| Overclock rate | 21.5% | 17.3% | ~30–40% |
| Cash-out rate | 38.8% | 41.5% | ~30–50% |
| Collapse rate | 24.2% | 16.8% | ≤50% |
| Avg shutdowns (table total) | 2.93 | 2.98 | pusher-heavy → see ↓ |
| Avg papers | 2.67 | 3.17 | 3–8 |
| Score spread | 32.27 | 34.78 | >3 |

### Shutdowns by archetype (4-player, per player per game)

_The gamble should concentrate in the pusher, not spread evenly._

| Archetype | Shutdowns/game | Overclocks/game | Plunders/game | OC rate | Cash-out rate |
|---|---|---|---|---|---|
| greedy | 1.06 | 4.24 | 1.22 | 35.8% | 40.4% |
| balanced | 0.80 | 1.67 | 0.48 | 14.3% | 35.7% |
| cautious | 0.00 | 0.00 | 0.10 | 0.0% | 44.8% |

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

- Postdocs: 2–3 | Experts: 9
- Amplifier: [2, 2, 2, 2, 4, 6] (levels 1→2 through 6→7, total 18 cash)
- Capacitor: [2, 3, 5, 7]
- Collimator: [3, 5, 8]
- Stabiliser: [4, 7]
- Timeline Integrity: 16 (4p) / 19 (5p)

## Sample Game Traces (4-player)

### Trace 1 — ends: collapse, 15 rounds

Scores: 9 / 19 / 30 / 26

| Rnd | P | Policy | Era | Team | Cash | Rep | Instab | Integr | Amp | Expedition |
|-----|---|--------|-----|------|------|-----|--------|--------|-----|------------|
| 1 | 0 | greedy | Modern | 1 | 0 | 0 | 0 | 16 | 2 | 0/3 oc=0 |
| 1 | 1 | cautious | Recent | 1 | 0 | 0 | 0 | 16 | 2 | 1/3 oc=0 |
| 1 | 2 | balanced | Recent | 2 | 0 | 2 | 0 | 16 | 2 | 3/3 oc=0 |
| 1 | 3 | greedy | Modern | 1 | 1 | 0 | 1 | 16 | 2 | 0/3 oc=1 |
| 2 | 0 | greedy | Modern | 1 | 0 | 0 | 1 | 16 | 2 | 0/2 oc=1 |
| 2 | 1 | cautious | Recent | 1 | 0 | 0 | 0 | 16 | 2 | 0/2 oc=0 |
| 2 | 2 | balanced | Recent | 2 | 3 | 4 | 0 | 15 | 2 | 2/2 oc=0 |
| 2 | 3 | greedy | Modern | 1 | 1 | 0 | 1 | 15 | 2 | 0/2 oc=0 |
| 3 | 0 | greedy | Modern | 1 | 0 | 0 | 1 | 15 | 2 | 1/3 oc=0 |
| 3 | 1 | cautious | Recent | 2 | 0 | 2 | 0 | 15 | 2 | 2/2 oc=0 |
| 3 | 2 | balanced | Modern | 3 | 1 | 6 | 0 | 15 | 3 | 2/2 oc=0 |
| 3 | 3 | greedy | Modern | 1 | 1 | 0 | 1 | 15 | 2 | 1/3 oc=0 |
| 4 | 0 | greedy | Modern | 1 | 0 | 0 | 1 | 15 | 2 | 0/2 oc=0 |
| 4 | 1 | cautious | Recent | 2 | 3 | 4 | 0 | 15 | 2 | 2/2 oc=0 |
| 4 | 2 | balanced | Modern | 3 | 3 | 10 | 0 | 14 | 3 | 2/2 oc=0 |
| 4 | 3 | greedy | Modern | 2 | 2 | 4 | 1 | 14 | 2 | 3/3 oc=0 |
| 5 | 0 | greedy | Modern | 1 | 0 | 0 | 1 | 14 | 2 | 1/3 oc=0 |
| 5 | 1 | cautious | Recent | 3 | 4 | 6 | 0 | 14 | 2 | 2/2 oc=0 |
| 5 | 2 | balanced | Modern | 4 | 1 | 10 | 0 | 14 | 3 | 2/2 oc=0 |
| 5 | 3 | greedy | Modern | 3 | 3 | 8 | 1 | 14 | 2 | 2/2 oc=0 |
| 6 | 0 | greedy | Modern | 1 | 0 | 0 | 1 | 14 | 2 | 0/2 oc=0 |
| 6 | 1 | cautious | Recent | 3 | 5 | 8 | 0 | 14 | 2 | 3/3 oc=0 |
| 6 | 2 | balanced | Modern | 5 | 2 | 14 | 0 | 13 | 3 | 2/2 oc=0 |
| 6 | 3 | greedy | EarlyModern | 4 | 2 | 12 | 0 | 13 | 3 | 3/3 oc=0 |
| 7 | 0 | greedy | Modern | 2 | 4 | 4 | 1 | 13 | 2 | 3/3 oc=0 |
| 7 | 1 | cautious | Recent | 3 | 5 | 10 | 0 | 13 | 2 | 2/2 oc=0 |
| 7 | 2 | balanced | EarlyModern | 6 | 2 | 18 | 0 | 12 | 4 | 2/2 oc=0 |
| 7 | 3 | greedy | EarlyModern | 4 | 0 | 12 | 0 | 12 | 3 | 2/4 oc=1 |
| 8 | 0 | greedy | Modern | 3 | 5 | 4 | 1 | 12 | 2 | 2/2 oc=0 |
| 8 | 1 | cautious | Recent | 3 | 3 | 10 | 0 | 12 | 2 | 1/2 oc=0 |
| 8 | 2 | balanced | Ancient | 6 | 1 | 23 | 0 | 12 | 6 | 3/3 oc=0 |
| 8 | 3 | greedy | EarlyModern | 4 | 0 | 12 | 0 | 12 | 3 | 1/4 oc=1 |
| 9 | 0 | greedy | EarlyModern | 4 | 5 | 4 | 2 | 9 | 3 | 2/3 oc=1 |
| 9 | 1 | cautious | Recent | 3 | 2 | 12 | 0 | 9 | 2 | 2/2 oc=0 |
| 9 | 2 | balanced | ManyWorlds | 6 | 2 | 23 | 0 | 9 | 7 | 6/6 oc=0 |
| 9 | 3 | greedy | Ancient | 5 | 0 | 12 | 1 | 8 | 5 | 2/3 oc=2 |
| 10 | 0 | greedy | Ancient | 4 | 1 | 4 | 2 | 8 | 5 | 2/4 oc=0 |
| 10 | 1 | cautious | Recent | 3 | 5 | 12 | 0 | 8 | 2 | 2/2 oc=0 |
| 10 | 2 | balanced | ManyWorlds | 6 | 2 | 23 | 0 | 7 | 7 | 3/5 oc=0 |
| 10 | 3 | greedy | Ancient | 5 | 0 | 12 | 0 | 7 | 5 | 3/6 oc=0 |
| 11 | 0 | greedy | Ancient | 4 | 1 | 4 | 2 | 7 | 5 | 0/5 oc=0 |
| 11 | 1 | cautious | Recent | 3 | 1 | 12 | 0 | 7 | 2 | 2/3 oc=0 |
| 11 | 2 | balanced | ManyWorlds | 6 | 2 | 23 | 0 | 6 | 7 | 2/5 oc=0 |
| 11 | 3 | greedy | Prehistoric | 6 | 1 | 20 | 1 | 4 | 6 | 5/5 oc=2 |
| 12 | 0 | greedy | Ancient | 4 | 1 | 4 | 2 | 4 | 5 | 3/6 oc=0 |
| 12 | 1 | cautious | Recent | 3 | 4 | 14 | 0 | 4 | 2 | 3/3 oc=0 |
| 12 | 2 | balanced | ManyWorlds | 6 | 2 | 23 | 0 | 3 | 7 | 1/5 oc=0 |
| 12 | 3 | greedy | Prehistoric | 6 | 1 | 20 | 0 | 3 | 6 | 0/5 oc=0 |
| 13 | 0 | greedy | Ancient | 4 | 1 | 4 | 2 | 3 | 5 | 1/5 oc=0 |
| 13 | 1 | cautious | Recent | 3 | 0 | 14 | 0 | 3 | 2 | 2/3 oc=0 |
_(6 rows omitted)_

### Trace 2 — ends: manyworlds, 10 rounds

Scores: 20 / 13 / 15 / 36

| Rnd | P | Policy | Era | Team | Cash | Rep | Instab | Integr | Amp | Expedition |
|-----|---|--------|-----|------|------|-----|--------|--------|-----|------------|
| 1 | 0 | greedy | Modern | 2 | 1 | 4 | 0 | 16 | 2 | 3/3 oc=0 |
| 1 | 1 | cautious | Recent | 2 | 0 | 0 | 0 | 16 | 2 | 2/3 oc=0 |
| 1 | 2 | balanced | Recent | 2 | 0 | 2 | 0 | 16 | 2 | 2/2 oc=0 |
| 1 | 3 | greedy | Modern | 2 | 3 | 0 | 0 | 16 | 2 | 3/3 oc=0 |
| 2 | 0 | greedy | Modern | 2 | 1 | 5 | 1 | 16 | 2 | 0/3 oc=1 |
| 2 | 1 | cautious | Recent | 2 | 1 | 0 | 0 | 16 | 2 | 1/3 oc=0 |
| 2 | 2 | balanced | Recent | 2 | 0 | 2 | 0 | 16 | 2 | 0/2 oc=0 |
| 2 | 3 | greedy | EarlyModern | 3 | 3 | 4 | 1 | 16 | 3 | 3/3 oc=1 |
| 3 | 0 | greedy | Modern | 3 | 3 | 9 | 1 | 16 | 2 | 3/3 oc=0 |
| 3 | 1 | cautious | Recent | 2 | 1 | 0 | 0 | 16 | 2 | 1/3 oc=0 |
| 3 | 2 | balanced | Recent | 2 | 3 | 4 | 0 | 16 | 2 | 2/2 oc=0 |
| 3 | 3 | greedy | EarlyModern | 3 | 1 | 4 | 0 | 16 | 3 | 1/4 oc=0 |
| 4 | 0 | greedy | EarlyModern | 4 | 3 | 9 | 0 | 15 | 3 | 2/3 oc=1 |
| 4 | 1 | cautious | Recent | 2 | 2 | 2 | 0 | 15 | 2 | 2/2 oc=0 |
| 4 | 2 | balanced | Recent | 3 | 4 | 4 | 0 | 15 | 2 | 2/3 oc=0 |
| 4 | 3 | greedy | EarlyModern | 4 | 2 | 9 | 0 | 15 | 3 | 3/3 oc=0 |
| 5 | 0 | greedy | Prehistoric | 4 | 0 | 14 | 0 | 15 | 6 | 4/4 oc=0 |
| 5 | 1 | cautious | Recent | 2 | 2 | 4 | 0 | 15 | 2 | 2/2 oc=0 |
| 5 | 2 | balanced | Modern | 4 | 3 | 4 | 0 | 14 | 3 | 3/3 oc=1 |
| 5 | 3 | greedy | Medieval | 5 | 4 | 14 | 0 | 14 | 4 | 3/3 oc=0 |
| 6 | 0 | greedy | Prehistoric | 4 | 0 | 14 | 0 | 14 | 6 | 0/5 oc=1 |
| 6 | 1 | cautious | Recent | 2 | 0 | 4 | 0 | 14 | 2 | 2/3 oc=0 |
| 6 | 2 | balanced | EarlyModern | 4 | 1 | 4 | 0 | 14 | 4 | 0/3 oc=0 |
| 6 | 3 | greedy | Ancient | 6 | 0 | 14 | 1 | 14 | 5 | 0/4 oc=1 |
| 7 | 0 | greedy | Prehistoric | 4 | 1 | 14 | 0 | 14 | 6 | 0/6 oc=1 |
| 7 | 1 | cautious | Recent | 2 | 3 | 4 | 0 | 14 | 2 | 1/2 oc=0 |
| 7 | 2 | balanced | Ancient | 4 | 0 | 9 | 0 | 14 | 6 | 4/4 oc=0 |
| 7 | 3 | greedy | Ancient | 6 | 0 | 14 | 0 | 14 | 5 | 1/6 oc=0 |
| 8 | 0 | greedy | Prehistoric | 4 | 1 | 14 | 0 | 13 | 6 | 1/6 oc=1 |
| 8 | 1 | cautious | Recent | 2 | 0 | 6 | 0 | 13 | 2 | 3/3 oc=0 |
| 8 | 2 | balanced | Ancient | 5 | 2 | 9 | 0 | 13 | 6 | 5/5 oc=0 |
| 8 | 3 | greedy | Prehistoric | 7 | 1 | 14 | 0 | 13 | 6 | 5/5 oc=0 |
| 9 | 0 | greedy | Prehistoric | 4 | 1 | 14 | 0 | 12 | 6 | 0/6 oc=1 |
| 9 | 1 | cautious | Recent | 2 | 3 | 6 | 0 | 12 | 2 | 1/2 oc=0 |
| 9 | 2 | balanced | Ancient | 5 | 2 | 9 | 0 | 12 | 6 | 2/6 oc=0 |
| 9 | 3 | greedy | ManyWorlds | 8 | 0 | 14 | 0 | 12 | 7 | 5/5 oc=0 |
| 10 | 0 | greedy | Prehistoric | 5 | 0 | 14 | 0 | 12 | 6 | 2/6 oc=1 |
| 10 | 1 | cautious | Recent | 2 | 2 | 8 | 0 | 12 | 2 | 3/3 oc=0 |
| 10 | 2 | balanced | Ancient | 5 | 2 | 9 | 0 | 12 | 6 | 1/5 oc=0 |

### Trace 3 — ends: collapse, 16 rounds

Scores: 22 / 20 / 24 / 42

| Rnd | P | Policy | Era | Team | Cash | Rep | Instab | Integr | Amp | Expedition |
|-----|---|--------|-----|------|------|-----|--------|--------|-----|------------|
| 1 | 0 | greedy | Modern | 2 | 1 | 0 | 0 | 16 | 2 | 2/2 oc=0 |
| 1 | 1 | cautious | Recent | 1 | 0 | 0 | 0 | 16 | 2 | 1/3 oc=0 |
| 1 | 2 | balanced | Recent | 2 | 0 | 0 | 0 | 16 | 2 | 3/3 oc=0 |
| 1 | 3 | greedy | Modern | 2 | 2 | 0 | 0 | 16 | 2 | 2/2 oc=0 |
| 2 | 0 | greedy | Modern | 3 | 3 | 0 | 1 | 16 | 2 | 3/3 oc=1 |
| 2 | 1 | cautious | Recent | 2 | 0 | 0 | 0 | 16 | 2 | 1/2 oc=0 |
| 2 | 2 | balanced | Modern | 2 | 1 | 0 | 0 | 16 | 3 | 3/3 oc=0 |
| 2 | 3 | greedy | Modern | 3 | 0 | 5 | 1 | 16 | 2 | 1/3 oc=1 |
| 3 | 0 | greedy | EarlyModern | 4 | 3 | 0 | 0 | 16 | 3 | 2/2 oc=0 |
| 3 | 1 | cautious | Recent | 2 | 0 | 0 | 0 | 16 | 3 | 1/3 oc=0 |
| 3 | 2 | balanced | Modern | 3 | 2 | 6 | 0 | 16 | 3 | 3/3 oc=0 |
| 3 | 3 | greedy | EarlyModern | 3 | 0 | 5 | 2 | 15 | 3 | 2/3 oc=1 |
| 4 | 0 | greedy | Prehistoric | 4 | 0 | 5 | 0 | 15 | 6 | 3/3 oc=0 |
| 4 | 1 | cautious | Recent | 2 | 1 | 2 | 0 | 15 | 4 | 3/3 oc=0 |
| 4 | 2 | balanced | EarlyModern | 3 | 2 | 10 | 0 | 15 | 4 | 2/2 oc=0 |
| 4 | 3 | greedy | EarlyModern | 4 | 2 | 10 | 2 | 15 | 3 | 4/4 oc=0 |
| 5 | 0 | greedy | Prehistoric | 4 | 0 | 5 | 1 | 15 | 6 | 1/5 oc=1 |
| 5 | 1 | cautious | Recent | 2 | 4 | 2 | 0 | 15 | 4 | 3/3 oc=0 |
| 5 | 2 | balanced | Medieval | 3 | 0 | 10 | 0 | 15 | 5 | 1/3 oc=0 |
| 5 | 3 | greedy | Medieval | 5 | 3 | 15 | 2 | 15 | 4 | 3/3 oc=0 |
| 6 | 0 | greedy | Prehistoric | 4 | 0 | 5 | 0 | 15 | 6 | 1/5 oc=0 |
| 6 | 1 | cautious | Recent | 2 | 4 | 2 | 0 | 15 | 4 | 1/3 oc=0 |
| 6 | 2 | balanced | Medieval | 3 | 3 | 10 | 2 | 13 | 5 | 2/3 oc=2 |
| 6 | 3 | greedy | Prehistoric | 6 | 0 | 15 | 2 | 13 | 6 | 3/3 oc=0 |
| 7 | 0 | greedy | Prehistoric | 4 | 0 | 5 | 0 | 13 | 6 | 1/6 oc=1 |
| 7 | 1 | cautious | Recent | 3 | 4 | 2 | 0 | 13 | 4 | 2/3 oc=0 |
| 7 | 2 | balanced | Medieval | 4 | 6 | 17 | 2 | 13 | 5 | 4/4 oc=0 |
| 7 | 3 | greedy | Prehistoric | 6 | 0 | 15 | 2 | 13 | 6 | 3/5 oc=0 |
| 8 | 0 | greedy | Prehistoric | 4 | 1 | 5 | 0 | 13 | 6 | 1/5 oc=1 |
| 8 | 1 | cautious | Recent | 3 | 3 | 4 | 0 | 13 | 5 | 2/2 oc=0 |
| 8 | 2 | balanced | Ancient | 5 | 4 | 17 | 3 | 12 | 6 | 3/4 oc=1 |
| 8 | 3 | greedy | Prehistoric | 6 | 0 | 15 | 2 | 12 | 6 | 1/6 oc=0 |
| 9 | 0 | greedy | Prehistoric | 5 | 0 | 5 | 0 | 12 | 6 | 0/5 oc=1 |
| 9 | 1 | cautious | Recent | 3 | 2 | 6 | 0 | 12 | 6 | 2/2 oc=0 |
| 9 | 2 | balanced | Ancient | 5 | 0 | 17 | 1 | 12 | 6 | 2/6 oc=0 |
| 9 | 3 | greedy | Prehistoric | 6 | 0 | 15 | 2 | 12 | 6 | 1/6 oc=0 |
| 10 | 0 | greedy | Prehistoric | 5 | 0 | 5 | 0 | 11 | 6 | 1/6 oc=1 |
| 10 | 1 | cautious | Recent | 3 | 2 | 6 | 0 | 11 | 6 | 2/3 oc=0 |
| 10 | 2 | balanced | Ancient | 6 | 2 | 17 | 2 | 11 | 6 | 5/5 oc=1 |
| 10 | 3 | greedy | Prehistoric | 6 | 0 | 15 | 0 | 11 | 6 | 0/6 oc=0 |
| 11 | 0 | greedy | Prehistoric | 5 | 0 | 5 | 0 | 10 | 6 | 0/6 oc=1 |
| 11 | 1 | cautious | Recent | 3 | 0 | 8 | 0 | 10 | 6 | 2/2 oc=0 |
| 11 | 2 | balanced | ManyWorlds | 6 | 1 | 17 | 3 | 9 | 7 | 6/6 oc=1 |
| 11 | 3 | greedy | Prehistoric | 6 | 0 | 15 | 1 | 9 | 6 | 4/6 oc=1 |
| 12 | 0 | greedy | Prehistoric | 6 | 4 | 5 | 0 | 8 | 6 | 5/6 oc=2 |
| 12 | 1 | cautious | Recent | 3 | 3 | 10 | 0 | 8 | 6 | 2/2 oc=0 |
| 12 | 2 | balanced | ManyWorlds | 6 | 1 | 17 | 3 | 7 | 7 | 0/5 oc=0 |
| 12 | 3 | greedy | Prehistoric | 6 | 0 | 15 | 1 | 7 | 6 | 4/6 oc=0 |
| 13 | 0 | greedy | Prehistoric | 6 | 1 | 6 | 0 | 7 | 6 | 3/5 oc=1 |
| 13 | 1 | cautious | Recent | 3 | 3 | 10 | 0 | 7 | 6 | 2/2 oc=0 |
_(10 rows omitted)_

## What This Does NOT Tell Us

- **Fun is not modelled.** A bot that maximises EV ≠ a human having a good time.
- **No alliance mechanic.** Bots attempt Many Worlds solo. Human tables will coordinate; real MW success rate is likely higher.
- **No negotiation.** The Negotiate phase (cash loans, deals) is absent.
- **Bots don't respond to social dynamics** — a trailing human will take wild risks; a bot stays policy-compliant.
- **Paper playtest is the ground truth.** These numbers are starting points, not proof of balance.
