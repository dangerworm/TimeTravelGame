# Completed Tasks (archived)

_Resolved items lifted out of the live [`../tasks.md`](../tasks.md) on **10 Jun 2026 (evening)**,
kept for the record. The live backlog is what remains ahead; this file is the done pile._

---

## The 10 Jun handoff's 9-point plan — 1–7 done

1. **Clean up the repo** ✅ — `prototypes/` removed, scratchpad archived, stale sim files pruned;
   foundation docs later consolidated to `intentions.md` + `game-design-document.md`.
2. **Answer / discuss the open questions** ✅ (10 Jun eve).
3. **Run the sim** ✅ — `--matrix` confirms cross-count balance.
4. **Read all live docs end-to-end + fix inconsistencies** ✅ (reconciliation pass + read-through).
5. **Finish every task we can** ✅ — signed off; the remainder is content / tooling / playtest.
6. **Document the parameters & control knobs** ✅ → `sim/README.md`.
7. **Produce one clean, definitive game-design document** ✅ → `game-design-document.md`.

_(8 = playtest content, 9 = renderer — still in the live backlog.)_

---

## Resolved this session (10 Jun, daytime)

- **Papers fixed** — recording an objective now *is* a paper (~16/game, was 2.4); the research-group
  lifeblood is in.
- **Researcher model reworked** (SS/NSS pips, total 3–6 postdoc / 9–15 expert), economy re-tuned.
- **Failed-MW lifted, plunder-imprint, growth step bands** all done.
- **Overclock "softness" RESOLVED — it's a player CHOICE, not a flaw.** Cautious bots fold when
  short; a *reckless* player overclocks 60%+ and bricks the machine 2–4×/game (validated
  `--pushprobe`). The game survives heavy pushing (all-reckless: MW 38%, collapse 46%), and pushing
  *summons* collapse — keystone #3 working.
- **MW lowered to ~50% (the multiverse is rare/sacred)** via a 5×5 gauntlet + failed-MW −2. Endgame
  spread ≈ **52% triumph / 36% collapse / 12% quiet legacy.** Config in `sim/best-config.json`.

## Resolved this session (10 Jun, evening — endgame + economy + doc reconciliation)

- **✅ Endgame reflection keystone — DONE.** Score-recap = a two-band **portrait scoresheet** (_what
  you discovered_ × _how you did it_); ethics **un-baked** into visible **disrepute tokens** (score =
  Rep − disrepute, netted at scoring; Reputation can still dip honestly, but a discredited paper is
  *peer review, not* disrepute). Ending structure = **individual retirement** (the 3rd end-trigger) +
  the *three-fates* framing; quiet-legacy flavour drafted.
- **✅ Negotiate = researcher rental, Cash-only, no loans.** Kills the leader rep-farm; doubles as the
  endgame-alliance handle (lend specialists for the MW gauntlet).
- **✅ En-route find is now Sell-or-Publish (a minor paper)** — lifts paper cadence even for cautious
  cash-outs, and writing it seasons a researcher. Early-relief spoil (15%, shallow eras, 1–2 Cash,
  max 1/card) pinned from the sim + documented.
- **✅ Doc reconciliation pass.** Fixed stale numbers (failed-MW **−2**, plunder **`[1,1,1,2,2,3,3]`**,
  start cash **3**, integrity **(players+1)×4**, experience **2 tokens/box · 2 earnable**);
  spoils→Cash done **selectively** (Cash = currency · *find* = convertible reward · "spoils" =
  flavour only). Findings: `../sessions/2026-06-10-doc-reconciliation-report.md`.
- **✅ Endgame flavour & reflection** — RESOLVED; remaining is *content polish* (now in the live
  backlog).
- **✅ Negotiate / lending terms** — RESOLVED (researcher rental, Cash-only, no loans).

## Resolved 9 Jun (the v4 skeleton session)

- **Footprint / imprint** — Trace cards (1:1 with instability tokens) are the footprint in the bag
  model; engineers clear them. Discretion / Die A-B / danger ratings / fatigue retired into this.
- **Field / Desk / Workshop** — sent researchers can't work at home; the team is the action economy
  (one Develop action/turn).
- **Captured the v4 skeleton** → `design-skeleton.md` (later superseded by `game-design-document.md`).
- **Timeline-collapse-as-loss → the "Unravelling" fuse.** Integrity 0 → one final round → score;
  deterrent lives in the personal overclock costs. Keystone #3 reconciled.
- **Small open mechanics** — overclock draws **1** card per push; clearing instability **is** a
  researcher's home/Develop job (one per researcher/turn).
- **Machine upgrade tracks** — Amplifier (era-access), Capacitor (capacity), Collimator (cards at
  Plan), Stabiliser (instability tolerance); all costed; Stabiliser starts max 2, +2/upgrade.
- **Endgame front** — collapse fuse + complete-the-MW-card trigger + final scoring via the portrait
  scoresheet. _(The kingmaker sub-thread stayed open — now the one live design item.)_
- **Scoring model** — two-axis legacy via the portrait scoresheet.

## Resolved 5–8 Jun (core loop + economy)

- **Minimal paper prototype** spec'd and **playtested (Exps 1–2): the spine is fun.** (Exps 3–5 spun
  out the Record-vs-Take fork and the back-loaded cash-out reward shape.)
- **The wrapper** — turn shape, consequence deck, instability, team-legacy lifecycle.
- **Develop economy** — two currencies (Cash + Reputation) bridged only by the Sell-vs-Publish
  choice; the team is the single labour pool (field vs desk); all reputation traces to a
  researcher's work.
- **Shop & roster** — Postdocs / Experts as two ends of one lifecycle; shared field, instant refill;
  roster cap forces retire-to-hire; bought experts = capability without earned legacy.
- **Sell disrepute scales with artefact value** — `max(1, floor((rep−1)/2))`; doomed = 0. _(Later
  reframed as disrepute **tokens**, 10 Jun eve.)_
- **Plunder-imprint / greed dial** — non-doomed plunder scars Integrity by era; doomed grabs clean;
  greedy-heavy tables collapse far more. Added `--matrix` / `--retuneMW` sim modes + early-relief
  spoils.
- **Terminology** — Nerve→Grit (clean); spoils→Cash done selectively.

## Resolved 10 Jun — Experiment B + the resolution-model bug-catch

- **Experiment B re-tuned + RESOLUTION MODEL CORRECTED.** The "chip-stall" was a **bug**: the sim
  (and the literal spec) drew the hand once and depleted it across all steps. Drew's real intent —
  **refill the hand to `2×roster+2` at the start of every step, reshuffling the discard** — is now
  implemented. `handBase +2` confirmed load-bearing.
- **Doc drift reconciled** — §6/§7/§9 wording aligned to the locked rules (2 earnable boxes / 2-2-2
  base / start cash 3 / integrity formula).
- **Open-from-B items** reclassified as **playtest-watch** (danger spikes documented; game length and
  overclock feel ride into the playtest).

---

_Historical version markers (for context):_

- **v3 (8 Jun):** a real-human playtest found the v2 deterministic loop dull; the core flipped to a
  **chip / bag-builder draw**.
- **v4 (9 Jun):** Drew's post-whiteboard session with Andy consolidated turn structure, modules,
  economy, experience, retirement, endgame and scoring into one skeleton.
