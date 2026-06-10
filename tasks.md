# Tasks

_The active backlog for the redesign. The old task list lives in `archive/tasks.md`._

## ⭐ Next session (10 Jun handoff) — priority order

_The sim is now cross-count balanced (see `sim/RESULTS.md`, `--matrix`). Drew's plan from here:_

> **Status (10 Jun eve):** 1–6 ✅ done · **7** (definitive doc → `rules.md`) **in progress** ·
> **8** (playtest content) and **9** (renderer) are the remaining future work. The one unfinished
> *design* thread is the **"who triggers Many Worlds / kingmaker"** question (§10 #5).

1. **Clean up the repo.** Remove what we don't need, consolidate docs where possible, **archive v2
   and v3**, delete `prototypes/`. _(List matches before deleting — confirm with Drew per scope
   discipline.)_
2. **Answer / discuss the open questions & ideas** (below).
3. **Run the sim** with any changes that come out of (2).
4. **Read all _live_ (non-archived) docs end-to-end** and fix inconsistencies, duplication,
   contradiction, and stale content — add/edit/remove as needed.
5. **Finish every task we can** — all must be signed off before a paper playtest.
6. **Document the parameters & control knobs** — each dial, what it does, and worked implications
   ("a factor of X means Y looks like M/N/O/P/Q at successive points in the game").
7. **Produce one clean, definitive game-design document.**
8. **Create enough content for a full playtest.**
9. **Build a way to print that content** — using the layout sketch in
   `design/2026-06-09-post-whiteboarding-with-andy.png`. (Vite + React + MUI per the renderer plan.)

### Resolved this session (10 Jun, cont.)

- **Papers fixed** — recording an objective now *is* a paper (~16/game, was 2.4); the research-group
  lifeblood is in. _(Still below Drew's "once per turn late game" ideal — a second tier of minor
  outputs from en-route finds could go higher, if wanted.)_
- **Researcher model reworked** (SS/NSS pips, total 3–6 postdoc / 9–15 expert), economy re-tuned.
- **Failed-MW lifted, plunder-imprint `[1,1,1,2,2,3,3]`, growth step bands** all done.
- **Overclock "softness" RESOLVED — it's a player CHOICE, not a flaw.** The cautious bots fold when
  short; a *reckless* player overclocks 60%+ of expeditions and bricks the machine 2–4×/game
  (validated `--pushprobe`). The game survives heavy pushing (even all-reckless: MW 38%, collapse
  46%), and pushing *summons* collapse — keystone #3 working. The gamble is there for the taking.
- **MW lowered to ~50% (the multiverse is rare/sacred)** via a 5×5 gauntlet + failed-MW −2. Endgame
  spread ≈ **52% triumph / 36% collapse / 12% quiet legacy.** Current best in `sim/best-config.json`.

### Resolved this session (10 Jun, evening — endgame + economy + doc reconciliation)

- **✅ Endgame reflection keystone — DONE.** Score-recap = a two-band **portrait scoresheet** (_what
  you discovered_ × _how you did it_); ethics **un-baked** into visible **disrepute tokens** (score =
  Rep − disrepute, netted at scoring; Reputation can still dip honestly, but a discredited paper is
  *peer review, not* disrepute). Ending structure = **individual retirement** (the 3rd end-trigger) +
  the *three-fates* framing; quiet-legacy flavour drafted (skeleton §9 — polish before print).
  Optional told-aloud Epilogue = a rulebook first-plays variant.
- **✅ Negotiate = researcher rental, Cash-only, no loans.** Kills the leader rep-farm; doubles as the
  endgame-alliance handle (lend specialists for the MW gauntlet).
- **✅ En-route find is now Sell-or-Publish (a minor paper)** — lifts paper cadence even for cautious
  cash-outs, and writing it seasons a researcher. Early-relief spoil (15%, shallow eras, 1–2 Cash,
  max 1/card) pinned from the sim + documented (skeleton §4/§5).
- **✅ Doc reconciliation pass.** Threaded all the above into `design-skeleton.md`
  (§1/§2/§4/§5/§6/§7/§8/§9/§10) + `constraints.md`; fixed stale numbers (failed-MW **−2**, plunder
  **`[1,1,1,2,2,3,3]`**, start cash **3**, integrity **(players+1)×4**, experience **2 tokens/box · 2
  earnable**); spoils→Cash done **selectively** (Cash = currency · *find* = convertible reward ·
  "spoils" = flavour only). Full findings: `sessions/2026-06-10-doc-reconciliation-report.md`.

### Still open / new

- **✅ Endgame flavour & reflection — RESOLVED (10 Jun eve).** See the evening resolved block above.
  Remaining = *content polish*, not design: tighten the quiet-legacy speech and write the collective
  vs per-player epilogue variants (skeleton §9).
- **⚠️ Who triggers Many Worlds / kingmaker — the one open *design* thread.** The endgame is built
  around a full-table alliance for the MW gauntlet, but the alliance-ending *mechanics* are
  unspecified: who makes the **winning** jump, and how is the payoff shared, so it's neither a
  foregone conclusion nor a kingmaker handing one player the game? Rental-Cash-only + individual
  retirement + visible disrepute soften the *runaway-leader* worry, but not this. Design before
  playtest (skeleton §10 #5).
- **Negotiation / alliances** — still the biggest sim blind spot (bots don't ally for the MW push;
  real MW rate likely higher than the sim shows). _(The Negotiate **terms** are now designed — rental,
  Cash-only — but the bots still don't model alliances.)_
- **Game length** — ~16–17 rounds / ~3h. The career-epic earns it narratively, but the table may
  not; revisit if the playtest drags.
- **Title — "Warped" CONFIRMED as the working title (10 Jun)**, but **pending an IP/legal check.**
  Rikki's suggestion; works on four levels (spacetime warp · imprints warping history · the moral
  "warped scientist" dial · the loom's _warp_ threads). ⚠️ **Conflicts to clear first:** an existing
  publisher **"Warped Reality Games"** and an indie maker **"Warped Board Games"** — may force a
  rethink. **Hold the project-wide rename** (repo/`CLAUDE.md` still say "Time Travel") until IP clears.
- **✅ Negotiate / lending terms — RESOLVED (10 Jun eve).** Researcher rental, **Cash-only, no
  loans** — see the evening resolved block + `constraints.md` + skeleton §2/§7/§8.

## Now

> **⚠️ v3 core-resolution redesign (8 Jun 2026):** a real-human playtest found the v2 loop dull; the
> core flipped from deterministic specialist-assignment to a **chip / bag-builder draw** (see
> `current-idea-scratchpad.md` → v3). Items below that predate this still stand for the
> _economy/wrapper_, but the resolution mechanic is now different.

> **⚠️ v4 whole-game skeleton (9 Jun 2026):** Drew's post-whiteboard session with Andy consolidated
> the turn structure, machine modules, economy, experience, retirement, endgame and scoring into one
> skeleton — now captured in **`design-skeleton.md`** (the new foundation). Items below are updated
> to it.

- [x] **Footprint / imprint resolved (9 Jun).** Trace cards (1:1 with instability tokens) are the
      footprint in the bag model; engineers clear them. Discretion / Die A-B / danger ratings /
      fatigue retired into this model.
- [x] **Field / Desk / Workshop resolved (9 Jun).** Sent researchers can't work at home; the team is
      the action economy (one Develop action/turn).
- [x] **Capture the v4 skeleton → `design-skeleton.md` (9 Jun).**
- [x] **Timeline-collapse-as-loss resolved (9 Jun): the "Unravelling" fuse.** Integrity 0 → one
      final round (settle affairs, or ally for a last Many Worlds escape) → score; deterrent lives
      in the personal overclock costs. Keystone #3 reconciled in `core-goals.md`; skeleton §9/§10
      updated.
- [x] **Small open mechanics resolved (9 Jun, §10).** Overclock draws **1** card per push; clearing
      instability **is** a researcher's home/Develop job (one per researcher/turn), so an engineer who
      cleans can't also paper/upgrade that turn.
- [x] Spec the **minimal paper prototype** of the core expedition loop. →
      `prototypes/prototype-01.md`
- [x] Playtest the core loop (guided, Exps 1–2). **Validated** — the spine is fun. Rules refined
      heavily during play (see `current-idea-scratchpad.md`).
- [x] Design the wrapper (turn shape, consequence deck, instability, team-legacy lifecycle).
- [x] Play Exps 3–5 (thread / hidden / Die-B). **Done 5 Jun.** Two new design threads spun out: the
      **Record-vs-Take prize fork** and the **banked / back-loaded / cash-out reward shape** (both
      in `current-idea-scratchpad.md`, folded into `core-goals.md`).
- [x] **Develop economy — core designed (5 Jun).** Two currencies (Cash + Reputation) bridged only
      by the Sell-vs-Publish choice on a Find; the team is the single labour pool (field vs desk),
      publishing is deskwork, all reputation traces to a researcher's work. See scratchpad +
      core-goals + constraints.
- [x] **Shop & roster designed (5 Jun).** Two decks (Postdocs / Experts) as two ends of one
      lifecycle; shared field, instant refill; [N] postdoc slots + round-thirds expert slots
      (0→1→2); bought experts = capability without earned legacy; roster cap 8 (anti-runaway, forces
      retire-to-hire). Retirement gains a consolation tier (~3 expeditions → small rep).
- [x] **Machine upgrade tracks done** (skeleton §6 + `best-config.json`): Amplifier (era-access),
      Capacitor (capacity), Collimator (cards drawn at Plan), Stabiliser (instability tolerance) —
      all costed; Stabiliser starts max 2, +2/upgrade. _Precision-as-discretion (footprint
      reduction) stays parked in **Later**._
- [x] **Endgame front done.** Collapse = the Unravelling fuse (§9/§10); MW trigger = complete the MW
      card; final scoring = Rep − disrepute + module + artefacts via the portrait scoresheet (10 Jun
      eve). Runaway-leader softened (rental Cash-only · visible disrepute · individual retirement).
      ⚠️ **Still genuinely open:** the **"who triggers Many Worlds" / kingmaker** concern for the
      full-table-alliance ending (§10 #5) — see *Still open* below.
- [x] **Terminology swept (10 Jun eve).** **Nerve→Grit** already clean (no live occurrences);
      **spoils→Cash** done **selectively** — Cash = currency, *find* = the convertible reward,
      "spoils" kept only as occasional flavour.
- [x] **Repo cleanup (10 Jun).** `prototypes/` deleted (its 5 destination ideas extracted to
      `decks/destinations/seed-cards.md` in the v4 model); `current-idea-scratchpad.md` archived as
      `archive/v2-v3-design-log.md` (open items lifted here); stale sim files removed
      (INSTRUCTIONS, note-to-next-instance, debug.js, trace_single.js); `CLAUDE.md` read-list + status
      updated.
- [x] **Sell disrepute now scales with artefact value (10 Jun).** Non-doomed sell cost =
      `max(1, floor((rep − 1) / 2))` Reputation (1 for rep 2–4, up to 4 for rep 9–10); **doomed =
      0**. Locked in `constraints.md`. _Prototype with the formula; promote to printed per-card
      values only if playtests want bespoke numbers._
- [x] **Plunder-imprint implemented (10 Jun) — greed dial complete.** Non-doomed plunder scars
      Timeline Integrity `[1,1,2,2,3,3,4]` by era; doomed grabs clean. Archetypes plunder
      differently (greedy ~1.2/game, balanced ~0.5, cautious ~0.1) and greedy-heavy tables now
      collapse far more. Field choice Record vs Plunder; plundered artefacts Publish (rep) or Sell
      (cash) at the desk (papers preserved). Re-tuned MW to ~75% across 3/4/5 players (integrity 16,
      MW 5×4, failed-MW −1). Added `--matrix` and `--retuneMW` sim modes + early-step relief spoils
      (eras <Ancient, ~15% chance, 1 per card).
- [x] **Doc drift reconciled (10 Jun eve).** §6 "three full boxes"→"both fully experienced"; §9
      "1/1/1"→"2/2/2 base" + start cash **3** + integrity formula `(players+1)×4`; §7 "4th
      token"→"every 2nd token, 2 earnable boxes". Skeleton now matches the locked rules +
      `best-config.json`.

- [x] **Experiment B re-tuned + RESOLUTION MODEL CORRECTED (10 Jun).** The "chip-stall" that drove
      the re-tune turned out to be a **bug**: the sim (and the literal spec) drew the hand once and
      depleted it across all steps. Drew's real intent — **refill the hand to `2×roster+2` at the
      start of every step, reshuffling the discard** — is now implemented. With that fixed: scaled
      bands + penultimate spoils + gentle reqs (eraSlope 0.2) + MW 6×4 gauntlet land **MW ~72%,
      deep-objective completion ~42%, cash-out ~37%**. Recommended config baked into
      `lockedConfig()` / `sim/RESULTS.md`. handBase `+2` confirmed required. core-goals +
      design-skeleton + constraints all updated.
- [x] **Open from B → now playtest-watch, not open design.** (a) **danger spikes can't be high
      reqs** — documented (skeleton §4 + `sim/README.md`); bite via instability/consequence instead.
      (b) **game length** ~16–17 rounds / ~200 min — accepted; shrink deep bands / ease the Amp-7
      gate only if the playtest drags. (c) **overclock ~19%** — a bot-conservatism floor
      (`--pushprobe`); judge the gamble's *feel* at the table. All three ride into the playtest.

## Next (once the core loop proves fun)

- [ ] Define the minimal JSON content schema (one card type to start).
- [ ] Scaffold the prototype renderer: Vite + React + MUI. Loads JSON, renders print-ready A4 sheets
      (3×3 card grids, cut lines, page breaks, print-to-PDF). Start with one card type, one sheet,
      then widen.

## Later

- [x] **Scoring model done (10 Jun eve)** — two-axis legacy via the portrait scoresheet (_what you
      discovered_ × _how you did it_): Rep − disrepute + highest module level + unresearched artefacts.
- [x] **Collapse mode-flip — cheap version done** (the Unravelling round, §9/§10). A *richer*
      third-act Many-Worlds-scramble remains parked until a playtest proves it's wanted.
- [ ] Re-evaluate parked darlings (age track, instability variety, specials) — add back only what
      playtest proves necessary. _From the archived v2/v3 log:_ **conspicuousness** (bigger party =
      harder to hide), **intervention "threads"** (open/close a change across steps), **multi-turn
      expeditions** for deep late jumps, and a concrete mechanic for **Precision / the Collimator as
      the machine's "discretion"** (cleaner drops = less footprint).
- [ ] Mine `archive/game-design.md` for reusable content (mystery tiers, real-history finds,
      fiction).
