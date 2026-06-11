# Handoff — full-game sim + content/balance (11 Jun 2026, afternoon)

_Resumes the morning content+renderer session. This session: visual-checked the renderer, resolved
the Many Worlds kingmaker question, built a card-driven full-game simulator, and started balancing._

## Decisions locked this session (Drew)
- **Many Worlds alliance RESOLVED** (the one open GDD question). Open declared jump at Amp 7;
  everyone commits (Capacity ignored); **co-author rep = +1 per committed researcher per owner, cap
  +6**; **host-only traces**; **fail = −2×(host instability + 1) Integrity**; no objective on MW (the
  door is the prize); 2+ players at Amp 7 = first success wins. Written into **GDD §14 + §12 +
  Appendix A** and **intentions.md** (Part II, timeline/endgame).
- **Step-req spread**: Drew's gentler hand-tuned "D" spread beats the steeper "B" — caps reqs at 3
  (Med/Anc) / 4 (Pre), lands deep cards near the "good" zone (~80% clear / ~20% shutdown for a maxed
  team). Wired as `--reqs proposed` in the full sim. NOT yet baked onto the cards (pending balance).
- **Renderer**: visually checked in Chrome — all 5 decks render cleanly, no overflow even on 5-step
  cards. Good to print.

## Built this session
- **`sim/era-card-content-based.js`** — per-card probe (clear% / shutdown% per era/team/req-pattern).
  Proved the stab-vs-req insight: difficulty lives in the **overclock margin** (hand−req vs stab).
- **`sim/full-game.js` + `sim/game/*` + `sim/lib/*`** — the **full card-driven game sim**. Modular:
  `lib/resolution.js` (kernel: resolveSteps/applyImmediateRewards), `lib/deck-loader.js` (real-deck
  adapters), `game/{config,state,economy,actions,policies,manyworlds,engine}.js`, `full-game.js`
  (CLI/report). Models everything: economy, Amp ladder, instability, consequences, Data/Artefact
  zones + deferred publish, separate disrepute, MW alliance (Drew's rule), collapse, retirement,
  two-band scoring. `--reqs current|proposed`, `--games`, `--players`.
- **Archived** the old abstract sim → `sim/archive/sim-abstract-v1.js` (+ its docs). `best-config.json`
  stays (shared constants). Original refactor (`full-game-abstract.js`) removed.

## THE headline finding (why balance is the next job)
On the **real cards**, the current economy **snowballs**: ~19% triumph, ~78% quiet-legacy, deepest
era only **~1.3** (most players stall at Recent/Modern while one early-break player runs to MW). Two
root causes the sim isolated:
1. **Income ~half the tuned economy.** Validated config used `findPayoutMult: 2` (Recent find ≈ 6
   Cash); **real cards pay `3 + era`** (Recent = 3). Players can't accumulate cash → can't build
   teams → stall. **Leading balance lever: raise find cash toward ~2× (or re-tune).**
2. **Finite market too thin for 4–5p.** 18 juniors ÷ 4 players ≈ coverage-starved once a leader
   hoards; era decks reshuffle ~10×/game (small real decks).

## BALANCE — root cause found (afternoon, conclusive)
The snowball is **gated entirely at the early game**, not income. Diagnosis chain (4p, full sim):
- Income dial (`--findmult`) lifts triumph 17%→~30% then **plateaus**, and *worsens* the snowball
  (score spread grows). Not the lever.
- **80%+ of players never leave Amp 1.** Root cause: **Capacity starts at 1**, so you send ONE
  researcher; the real cards are **profession-lock-dense** (most have a Historian *and* an Engineer
  lock), so a lone researcher **cashes out at the second lock**, earns nothing, can't afford a 2nd
  hire → stuck forever. The ~9–17% "triumph" games are just lucky early breaks (a Recent card that
  matched the lone researcher's profession).
- **Proof:** `cap2 + startCash 8` (a viable 2-profession team from turn one) → **triumph 97%,
  deepest 4.8, stuck-Amp1 22%**. The logjam vanishes; the game then *overshoots* (tune down from there).
- **Why the real cards differ from the tuned model:** the abstract sim used procedural cards with
  ~33% lock chance (often 0–1 locks on a Recent card → lone-researcher-clearable). The hand-authored
  real cards put **2 locks on most shallow cards**, breaking the Cap-1 bootstrap the economy assumed.

**Balance path (next session):** (1) fix the early bootstrap — pick from: start **Cap 2**, more
start Cash, a **free starting researcher**, and/or **thin shallow-card locks to ≤1** (Recent is meant
to be the gentle on-ramp per GDD — this is the most theme-aligned fix). (2) Then tune *down* from the
resulting ~97% toward the GDD target (~52% triumph) via MW difficulty / the `--reqs proposed` spread /
income. The sim has the dials: `--findmult`, `--reqs`, and cfg overrides (startCap/startCash) — see
the inline experiments. These are **design decisions for Drew**, not unilateral changes.

## Remaining TODO (Drew's order: bots ✓ → cards ✓(53→89) → balance ◑ diagnosed)
- **Bots**: a first pass DONE (cautious now advances + everyone retires by round 30 → timeout 0%).
  Still want: a non-snowballing buy/era policy once income is fixed; the poverty-trap recovery.
- **Write more cards (~double)**: target ~doubling the destination deck (see the morning handoff's
  per-era targets) so 4–5p doesn't run the era decks dry. Same calibration cheat-sheet as
  `sessions/2026-06-11-content-and-renderer-handoff.md`. Also widens the junior/expert pool worth
  considering (18→more) to ease market thinness.
- **Balance**: with more income + cards, sweep find cash / market size / the `--reqs proposed`
  spread / MW cap+rate, targeting the GDD outcome (~52% triumph / ~36% collapse / ~12% quiet,
  ~16–17 rounds). The full sim is the tool.

## How to run
```
node sim/full-game.js                  # current reqs, 3/4/5p
node sim/full-game.js --reqs proposed  # Drew's gentler spread
node sim/era-card-content-based.js     # per-card clear%/shutdown% probe
```
Nothing committed (Drew's rule). Foundation docs (GDD/intentions) edited; sim/ has new files.
