# Balance Simulator — Results

_Generated 2026-06-10T00:31:56.322Z_

## TL;DR

| | 4-player | 5-player | Target |
|---|---|---|---|
| Many Worlds success | 68.4% | 80.6% | ~75% |
| Deep-objective completion | 41.2% | 43.4% | ~40% |
| Avg rounds | 13.10 | 13.33 | 8–12 |
| Wall clock (est.) | 157 min | 200 min | 60–120 min |
| Overclock rate | 21.0% | 16.9% | ~30–40% |
| Cash-out rate | 37.2% | 38.4% | ~30–50% |
| Collapse rate | 31.6% | 19.4% | ≤50% |
| Avg shutdowns (table total) | 3.11 | 2.96 | pusher-heavy → see ↓ |
| Avg papers | 10.78 | 11.32 | 3–8 |
| Score spread | 33.64 | 37.95 | >3 |

### Shutdowns by archetype (4-player, per player per game)

_The gamble should concentrate in the pusher, not spread evenly._

| Archetype | Shutdowns/game | Overclocks/game | OC rate | Cash-out rate |
|---|---|---|---|---|
| greedy | 1.12 | 4.41 | 34.7% | 37.4% |
| balanced | 0.88 | 1.85 | 14.8% | 33.5% |
| cautious | 0.00 | 0.00 | 0.0% | 44.3% |

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
- Timeline Integrity: 14 (4p) / 17 (5p)

## Sample Game Traces (4-player)

### Trace 1 — ends: collapse, 14 rounds

Scores: 40 / 11 / 25 / 31

| Rnd | P | Policy | Era | Team | Cash | Rep | Instab | Integr | Amp | Expedition |
|-----|---|--------|-----|------|------|-----|--------|--------|-----|------------|
| 1 | 0 | greedy | Modern | 2 | 1 | 0 | 0 | 14 | 2 | 2/2 oc=0 |
| 1 | 1 | cautious | Recent | 2 | 0 | 0 | 0 | 14 | 2 | 3/3 oc=0 |
| 1 | 2 | balanced | Recent | 2 | 0 | 0 | 1 | 13 | 2 | 2/2 oc=1 |
| 1 | 3 | greedy | Modern | 2 | 2 | 3 | 1 | 13 | 2 | 3/3 oc=1 |
| 2 | 0 | greedy | Modern | 2 | 1 | 0 | 1 | 13 | 2 | 1/3 oc=1 |
| 2 | 1 | cautious | Recent | 2 | 3 | 2 | 0 | 13 | 2 | 3/3 oc=0 |
| 2 | 2 | balanced | Recent | 2 | 3 | 2 | 2 | 12 | 2 | 2/2 oc=1 |
| 2 | 3 | greedy | Modern | 3 | 0 | 3 | 1 | 12 | 2 | 0/3 oc=0 |
| 3 | 0 | greedy | Modern | 3 | 2 | 0 | 2 | 10 | 2 | 1/2 oc=1 |
| 3 | 1 | cautious | Recent | 3 | 3 | 2 | 0 | 10 | 2 | 2/3 oc=0 |
| 3 | 2 | balanced | Recent | 2 | 3 | 2 | 2 | 10 | 2 | 0/3 oc=0 |
| 3 | 3 | greedy | Modern | 3 | 0 | 3 | 1 | 10 | 2 | 0/2 oc=0 |
| 4 | 0 | greedy | EarlyModern | 4 | 3 | 0 | 2 | 9 | 3 | 1/2 oc=1 |
| 4 | 1 | cautious | Recent | 3 | 4 | 2 | 0 | 9 | 2 | 2/3 oc=0 |
| 4 | 2 | balanced | Recent | 3 | 4 | 2 | 2 | 9 | 2 | 3/3 oc=0 |
| 4 | 3 | greedy | EarlyModern | 4 | 0 | 3 | 1 | 9 | 3 | 2/2 oc=0 |
| 5 | 0 | greedy | Medieval | 4 | 1 | 0 | 1 | 9 | 4 | 1/4 oc=0 |
| 5 | 1 | cautious | Recent | 3 | 4 | 2 | 0 | 9 | 2 | 2/3 oc=0 |
| 5 | 2 | balanced | Recent | 4 | 3 | 2 | 2 | 9 | 2 | 2/2 oc=0 |
| 5 | 3 | greedy | Medieval | 4 | 1 | 3 | 1 | 9 | 4 | 4/4 oc=0 |
| 6 | 0 | greedy | Ancient | 5 | 1 | 7 | 1 | 9 | 5 | 4/4 oc=0 |
| 6 | 1 | cautious | Recent | 3 | 2 | 2 | 0 | 9 | 2 | 2/3 oc=0 |
| 6 | 2 | balanced | Modern | 4 | 1 | 4 | 2 | 9 | 3 | 2/2 oc=0 |
| 6 | 3 | greedy | Medieval | 5 | 2 | 3 | 1 | 9 | 4 | 4/4 oc=0 |
| 7 | 0 | greedy | Ancient | 6 | 2 | 15 | 0 | 9 | 5 | 6/6 oc=0 |
| 7 | 1 | cautious | Recent | 3 | 2 | 2 | 0 | 9 | 2 | 0/2 oc=0 |
| 7 | 2 | balanced | Modern | 4 | 0 | 4 | 2 | 9 | 3 | 3/3 oc=0 |
| 7 | 3 | greedy | Medieval | 6 | 6 | 10 | 1 | 9 | 4 | 4/4 oc=0 |
| 8 | 0 | greedy | Prehistoric | 6 | 0 | 23 | 0 | 9 | 6 | 6/6 oc=0 |
| 8 | 1 | cautious | Recent | 3 | 1 | 2 | 0 | 9 | 2 | 2/2 oc=0 |
| 8 | 2 | balanced | Modern | 4 | 0 | 4 | 2 | 9 | 3 | 0/2 oc=0 |
| 8 | 3 | greedy | Ancient | 7 | 8 | 17 | 1 | 9 | 5 | 4/4 oc=0 |
| 9 | 0 | greedy | Prehistoric | 6 | 0 | 23 | 1 | 9 | 6 | 3/6 oc=1 |
| 9 | 1 | cautious | Recent | 3 | 4 | 2 | 0 | 9 | 2 | 1/2 oc=0 |
| 9 | 2 | balanced | Modern | 4 | 0 | 8 | 2 | 9 | 3 | 2/2 oc=0 |
| 9 | 3 | greedy | Prehistoric | 8 | 8 | 25 | 1 | 9 | 6 | 6/6 oc=0 |
| 10 | 0 | greedy | ManyWorlds | 7 | 0 | 33 | 1 | 9 | 7 | 6/6 oc=0 |
| 10 | 1 | cautious | Recent | 3 | 0 | 4 | 0 | 9 | 2 | 2/2 oc=0 |
| 10 | 2 | balanced | EarlyModern | 4 | 2 | 12 | 2 | 9 | 4 | 2/2 oc=0 |
| 10 | 3 | greedy | Prehistoric | 9 | 5 | 25 | 1 | 9 | 6 | 1/5 oc=0 |
| 11 | 0 | greedy | ManyWorlds | 7 | 0 | 33 | 2 | 4 | 7 | 5/6 oc=1 |
| 11 | 1 | cautious | Recent | 3 | 0 | 4 | 0 | 4 | 2 | 1/3 oc=0 |
| 11 | 2 | balanced | Medieval | 4 | 0 | 12 | 2 | 4 | 5 | 0/3 oc=0 |
| 11 | 3 | greedy | Prehistoric | 10 | 3 | 25 | 1 | 4 | 6 | 1/6 oc=0 |
| 12 | 0 | greedy | ManyWorlds | 7 | 0 | 33 | 2 | 2 | 7 | 3/6 oc=0 |
| 12 | 1 | cautious | Recent | 3 | 3 | 4 | 0 | 2 | 2 | 2/2 oc=0 |
| 12 | 2 | balanced | Ancient | 4 | 2 | 19 | 2 | 2 | 6 | 4/4 oc=0 |
| 12 | 3 | greedy | Prehistoric | 11 | 0 | 25 | 1 | 2 | 6 | 0/5 oc=0 |
| 13 | 0 | greedy | ManyWorlds | 7 | 0 | 33 | 2 | 0 | 7 | 1/6 oc=0 |
| 13 | 1 | cautious | Recent | 4 | 4 | 6 | 0 | 0 | 2 | 2/2 oc=0 |
_(2 rows omitted)_

### Trace 2 — ends: collapse, 11 rounds

Scores: 28 / 12 / 7 / 33

| Rnd | P | Policy | Era | Team | Cash | Rep | Instab | Integr | Amp | Expedition |
|-----|---|--------|-----|------|------|-----|--------|--------|-----|------------|
| 1 | 0 | greedy | Modern | 2 | 1 | 0 | 0 | 14 | 2 | 2/2 oc=0 |
| 1 | 1 | cautious | Recent | 2 | 1 | 0 | 0 | 14 | 2 | 1/2 oc=0 |
| 1 | 2 | balanced | Recent | 2 | 1 | 0 | 0 | 14 | 2 | 3/3 oc=0 |
| 1 | 3 | greedy | Modern | 2 | 2 | 4 | 0 | 14 | 2 | 3/3 oc=0 |
| 2 | 0 | greedy | Modern | 3 | 2 | 4 | 0 | 14 | 2 | 2/2 oc=0 |
| 2 | 1 | cautious | Recent | 2 | 1 | 0 | 0 | 14 | 2 | 0/2 oc=0 |
| 2 | 2 | balanced | Recent | 3 | 1 | 0 | 0 | 14 | 2 | 2/3 oc=0 |
| 2 | 3 | greedy | Modern | 3 | 3 | 8 | 0 | 14 | 2 | 3/3 oc=0 |
| 3 | 0 | greedy | EarlyModern | 4 | 1 | 8 | 0 | 14 | 3 | 3/3 oc=0 |
| 3 | 1 | cautious | Recent | 2 | 1 | 0 | 0 | 14 | 2 | 0/3 oc=0 |
| 3 | 2 | balanced | EarlyModern | 3 | 0 | 0 | 0 | 14 | 4 | 3/3 oc=0 |
| 3 | 3 | greedy | Modern | 4 | 2 | 12 | 0 | 14 | 2 | 3/3 oc=0 |
| 4 | 0 | greedy | Ancient | 5 | 0 | 13 | 0 | 14 | 5 | 4/4 oc=0 |
| 4 | 1 | cautious | Recent | 2 | 4 | 2 | 0 | 14 | 2 | 3/3 oc=0 |
| 4 | 2 | balanced | EarlyModern | 3 | 0 | 0 | 0 | 14 | 4 | 2/4 oc=0 |
| 4 | 3 | greedy | Modern | 5 | 1 | 16 | 0 | 14 | 2 | 2/2 oc=0 |
| 5 | 0 | greedy | Prehistoric | 5 | 1 | 21 | 1 | 13 | 6 | 6/6 oc=1 |
| 5 | 1 | cautious | Recent | 2 | 4 | 2 | 0 | 13 | 2 | 0/3 oc=0 |
| 5 | 2 | balanced | EarlyModern | 4 | 2 | 1 | 2 | 12 | 4 | 3/4 oc=2 |
| 5 | 3 | greedy | Medieval | 5 | 1 | 16 | 0 | 12 | 4 | 2/2 oc=0 |
| 6 | 0 | greedy | Prehistoric | 5 | 1 | 21 | 0 | 12 | 6 | 0/6 oc=0 |
| 6 | 1 | cautious | Recent | 3 | 4 | 2 | 0 | 12 | 2 | 3/3 oc=0 |
| 6 | 2 | balanced | Ancient | 4 | 1 | 1 | 2 | 12 | 6 | 3/3 oc=0 |
| 6 | 3 | greedy | Prehistoric | 5 | 1 | 16 | 0 | 12 | 6 | 3/3 oc=0 |
| 7 | 0 | greedy | ManyWorlds | 5 | 0 | 21 | 0 | 12 | 7 | 5/5 oc=0 |
| 7 | 1 | cautious | Recent | 3 | 0 | 2 | 0 | 12 | 4 | 1/3 oc=0 |
| 7 | 2 | balanced | Ancient | 4 | 1 | 1 | 2 | 12 | 6 | 1/5 oc=0 |
| 7 | 3 | greedy | ManyWorlds | 6 | 2 | 26 | 1 | 12 | 7 | 5/5 oc=1 |
| 8 | 0 | greedy | ManyWorlds | 5 | 0 | 21 | 1 | 10 | 7 | 0/6 oc=1 |
| 8 | 1 | cautious | Recent | 3 | 1 | 2 | 0 | 10 | 5 | 1/2 oc=0 |
| 8 | 2 | balanced | Ancient | 4 | 1 | 1 | 2 | 10 | 6 | 0/6 oc=0 |
| 8 | 3 | greedy | ManyWorlds | 7 | 0 | 26 | 1 | 8 | 7 | 2/6 oc=0 |
| 9 | 0 | greedy | ManyWorlds | 5 | 0 | 21 | 1 | 6 | 7 | 3/6 oc=0 |
| 9 | 1 | cautious | Recent | 3 | 2 | 4 | 0 | 6 | 5 | 2/2 oc=0 |
| 9 | 2 | balanced | Ancient | 4 | 1 | 1 | 2 | 6 | 6 | 1/5 oc=0 |
| 9 | 3 | greedy | ManyWorlds | 7 | 0 | 26 | 1 | 4 | 7 | 1/6 oc=0 |
| 10 | 0 | greedy | ManyWorlds | 5 | 0 | 21 | 1 | 2 | 7 | 2/6 oc=0 |
| 10 | 1 | cautious | Recent | 3 | 1 | 6 | 0 | 2 | 6 | 2/2 oc=0 |
| 10 | 2 | balanced | Ancient | 4 | 1 | 1 | 2 | 2 | 6 | 0/5 oc=0 |
| 10 | 3 | greedy | ManyWorlds | 7 | 0 | 26 | 1 | 0 | 7 | 4/6 oc=0 |

### Trace 3 — ends: collapse, 16 rounds

Scores: 14 / 16 / 17 / 24

| Rnd | P | Policy | Era | Team | Cash | Rep | Instab | Integr | Amp | Expedition |
|-----|---|--------|-----|------|------|-----|--------|--------|-----|------------|
| 1 | 0 | greedy | Modern | 2 | 0 | 0 | 1 | 14 | 2 | 2/2 oc=1 |
| 1 | 1 | cautious | Recent | 2 | 0 | 0 | 0 | 14 | 2 | 2/3 oc=0 |
| 1 | 2 | balanced | Recent | 2 | 1 | 0 | 0 | 14 | 2 | 3/3 oc=0 |
| 1 | 3 | greedy | Modern | 1 | 0 | 0 | 1 | 14 | 2 | 1/3 oc=1 |
| 2 | 0 | greedy | Modern | 3 | 0 | 0 | 1 | 14 | 2 | 2/3 oc=0 |
| 2 | 1 | cautious | Recent | 2 | 1 | 2 | 0 | 14 | 3 | 2/2 oc=0 |
| 2 | 2 | balanced | Recent | 3 | 1 | 2 | 0 | 14 | 2 | 2/2 oc=0 |
| 2 | 3 | greedy | Modern | 1 | 0 | 0 | 1 | 14 | 2 | 1/3 oc=0 |
| 3 | 0 | greedy | EarlyModern | 4 | 0 | 0 | 1 | 14 | 3 | 3/3 oc=0 |
| 3 | 1 | cautious | Recent | 2 | 2 | 4 | 0 | 14 | 4 | 3/3 oc=0 |
| 3 | 2 | balanced | Modern | 3 | 2 | 4 | 0 | 14 | 3 | 2/2 oc=0 |
| 3 | 3 | greedy | Modern | 2 | 1 | 1 | 2 | 13 | 2 | 1/2 oc=1 |
| 4 | 0 | greedy | EarlyModern | 4 | 0 | 0 | 0 | 13 | 3 | 0/4 oc=0 |
| 4 | 1 | cautious | Recent | 2 | 2 | 4 | 0 | 13 | 4 | 0/3 oc=0 |
| 4 | 2 | balanced | EarlyModern | 3 | 0 | 4 | 0 | 13 | 4 | 1/3 oc=0 |
| 4 | 3 | greedy | Modern | 2 | 1 | 1 | 2 | 13 | 2 | 0/3 oc=0 |
| 5 | 0 | greedy | Ancient | 4 | 1 | 0 | 0 | 13 | 5 | 3/3 oc=0 |
| 5 | 1 | cautious | Recent | 2 | 2 | 4 | 0 | 13 | 4 | 1/3 oc=0 |
| 5 | 2 | balanced | EarlyModern | 3 | 0 | 4 | 0 | 13 | 4 | 1/3 oc=0 |
| 5 | 3 | greedy | Modern | 2 | 1 | 1 | 2 | 13 | 2 | 0/2 oc=0 |
| 6 | 0 | greedy | Prehistoric | 5 | 1 | 8 | 0 | 13 | 6 | 5/5 oc=0 |
| 6 | 1 | cautious | Recent | 2 | 5 | 6 | 0 | 13 | 4 | 3/3 oc=0 |
| 6 | 2 | balanced | Medieval | 3 | 3 | 9 | 0 | 13 | 5 | 3/3 oc=0 |
| 6 | 3 | greedy | Modern | 2 | 1 | 1 | 2 | 13 | 2 | 1/3 oc=0 |
| 7 | 0 | greedy | Prehistoric | 5 | 1 | 8 | 0 | 12 | 6 | 3/5 oc=1 |
| 7 | 1 | cautious | Recent | 3 | 6 | 6 | 0 | 12 | 4 | 2/2 oc=0 |
| 7 | 2 | balanced | Ancient | 3 | 3 | 9 | 0 | 12 | 6 | 4/4 oc=0 |
| 7 | 3 | greedy | Modern | 3 | 2 | 5 | 2 | 12 | 2 | 2/2 oc=0 |
| 8 | 0 | greedy | Prehistoric | 5 | 1 | 8 | 1 | 12 | 6 | 0/5 oc=1 |
| 8 | 1 | cautious | Recent | 3 | 2 | 6 | 0 | 12 | 5 | 1/3 oc=0 |
| 8 | 2 | balanced | Ancient | 4 | 4 | 9 | 0 | 12 | 6 | 6/6 oc=0 |
| 8 | 3 | greedy | EarlyModern | 4 | 1 | 5 | 2 | 12 | 3 | 3/3 oc=0 |
| 9 | 0 | greedy | Prehistoric | 5 | 1 | 8 | 0 | 12 | 6 | 1/6 oc=0 |
| 9 | 1 | cautious | Recent | 3 | 2 | 6 | 0 | 12 | 5 | 0/2 oc=0 |
| 9 | 2 | balanced | ManyWorlds | 4 | 2 | 9 | 0 | 12 | 7 | 6/6 oc=0 |
| 9 | 3 | greedy | EarlyModern | 4 | 1 | 5 | 2 | 12 | 3 | 0/3 oc=0 |
| 10 | 0 | greedy | Prehistoric | 5 | 1 | 8 | 1 | 12 | 6 | 1/6 oc=1 |
| 10 | 1 | cautious | Recent | 3 | 1 | 6 | 0 | 12 | 6 | 2/2 oc=0 |
| 10 | 2 | balanced | ManyWorlds | 4 | 2 | 9 | 0 | 10 | 7 | 3/6 oc=0 |
| 10 | 3 | greedy | EarlyModern | 4 | 1 | 5 | 2 | 10 | 3 | 0/3 oc=0 |
| 11 | 0 | greedy | Prehistoric | 5 | 1 | 8 | 0 | 10 | 6 | 3/5 oc=0 |
| 11 | 1 | cautious | Recent | 3 | 1 | 6 | 0 | 10 | 6 | 0/3 oc=0 |
| 11 | 2 | balanced | ManyWorlds | 4 | 2 | 9 | 0 | 8 | 7 | 0/6 oc=0 |
| 11 | 3 | greedy | EarlyModern | 4 | 1 | 5 | 2 | 8 | 3 | 0/4 oc=0 |
| 12 | 0 | greedy | Prehistoric | 5 | 0 | 8 | 1 | 8 | 6 | 3/6 oc=1 |
| 12 | 1 | cautious | Recent | 3 | 1 | 6 | 0 | 8 | 6 | 1/2 oc=0 |
| 12 | 2 | balanced | ManyWorlds | 4 | 2 | 9 | 0 | 6 | 7 | 2/6 oc=0 |
| 12 | 3 | greedy | EarlyModern | 5 | 2 | 10 | 2 | 6 | 3 | 4/4 oc=0 |
| 13 | 0 | greedy | Prehistoric | 5 | 0 | 8 | 1 | 6 | 6 | 0/5 oc=0 |
| 13 | 1 | cautious | Recent | 3 | 0 | 8 | 0 | 6 | 6 | 2/2 oc=0 |
_(10 rows omitted)_

## What This Does NOT Tell Us

- **Fun is not modelled.** A bot that maximises EV ≠ a human having a good time.
- **No alliance mechanic.** Bots attempt Many Worlds solo. Human tables will coordinate; real MW success rate is likely higher.
- **No negotiation.** The Negotiate phase (cash loans, deals) is absent.
- **Bots don't respond to social dynamics** — a trailing human will take wild risks; a bot stays policy-compliant.
- **Paper playtest is the ground truth.** These numbers are starting points, not proof of balance.
