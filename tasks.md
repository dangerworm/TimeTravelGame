# Tasks

_The active backlog for the redesign. The old task list lives in `archive/tasks.md`._

## ⭐ Next session (10 Jun handoff) — priority order

_The sim is now cross-count balanced (see `sim/RESULTS.md`, `--matrix`). Drew's plan from here:_

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

### Still open / new

- **⭐ Endgame flavour & reflection (NEW — important).** With MW now rare, **~half of games end
  WITHOUT the multiverse** (collapse or quiet legacy). Those endings MUST feel like *"a life well
  lived,"* not failure — they need **flavour text + a reflection / score-recap moment** so players
  feel what they built (the team they grew, papers published, eras reached, artefacts saved). The
  collapse ending especially must read as a **dramatic mode-flip**, not a loss. This is the design
  job that *rides alongside* the rare-MW decision — without it, half the playthroughs feel like a
  3-hour loss.
- **Negotiation / alliances** — still the biggest sim blind spot (bots don't ally for the MW push;
  real MW rate likely higher than the sim shows).
- **Game length** — ~16–17 rounds / ~3h. The career-epic earns it narratively, but the table may
  not; revisit if the playtest drags.

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
- [ ] Confirm the small open mechanics: overclock draw amount; whether clearing instability costs
      the Develop action (see `design-skeleton.md` §10).
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
- [ ] **Economy — last piece:** the **machine upgrade tracks** (capacity / era-access /
      instability-tolerance / precision); then exact instability numbers.
- [ ] **Then the endgame front:** collapse mode-flip + Many Worlds trigger + final scoring (dodge
      runaway-leader & "who triggers?" problems).
- [ ] Sweep terminology across docs once it settles: **"spoils" → "Cash"** and **"Nerve" → "Grit"**
      (scratchpad, core-goals, prototype-01, retirement seed cards).
- [ ] Cleanup: **re-spec `prototypes/prototype-01.md`** for the new reward model — banked escalating
      finds, objective-holds-the-paper, voluntary cash-out, Record-vs-Take prize. (The old "N
      spoils + Paper at the objective only" lines are now superseded, not just mis-worded.)
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
- [ ] **Doc drift to reconcile (noticed 9 Jun):** §6/§9 still say "three full blue experience boxes"
      and "skills baseline 1/1/1" while §7 + the locked decision are **2 earnable boxes (1
      pre-filled)** and a **2/2/2 player base**; §7's "4th token advances a box" vs the sim's
      2-uses-per-box. Align the skeleton wording with the locked rules.

- [x] **Experiment B re-tuned + RESOLUTION MODEL CORRECTED (10 Jun).** The "chip-stall" that drove
      the re-tune turned out to be a **bug**: the sim (and the literal spec) drew the hand once and
      depleted it across all steps. Drew's real intent — **refill the hand to `2×roster+2` at the
      start of every step, reshuffling the discard** — is now implemented. With that fixed: scaled
      bands + penultimate spoils + gentle reqs (eraSlope 0.2) + MW 6×4 gauntlet land **MW ~72%,
      deep-objective completion ~42%, cash-out ~37%**. Recommended config baked into
      `lockedConfig()` / `sim/RESULTS.md`. handBase `+2` confirmed required. core-goals +
      design-skeleton + constraints all updated.
- [ ] **Open from B (next):** (a) **danger spikes** can't be high requirements (a single high-req
      step outruns the hand) — design them to bite via instability / consequence instead; (b) **game
      is long (~13 rounds / ~157 min 4p, ~200 min 5p)** — accepted for now, but shrink deep bands /
      ease the Amp-7 gate if playtest agrees; (c) **overclock frequency dipped to ~21%** — watch the
      gamble's pulse in play, nudge reqs up if it feels thin.

## Next (once the core loop proves fun)

- [ ] Define the minimal JSON content schema (one card type to start).
- [ ] Scaffold the prototype renderer: Vite + React + MUI. Loads JSON, renders print-ready A4 sheets
      (3×3 card grids, cut lines, page breaks, print-to-PDF). Start with one card type, one sheet,
      then widen.

## Later

- [ ] Build out the scoring model (multiple visible axes; two-axis legacy).
- [ ] Design the collapse mode-flip (third act) in detail.
- [ ] Re-evaluate parked darlings (age track, instability variety, specials) — add back only what
      playtest proves necessary.
- [ ] Mine `archive/game-design.md` for reusable content (mystery tiers, real-history finds,
      fiction).
