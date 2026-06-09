# Tasks

_The active backlog for the redesign. The old task list lives in `archive/tasks.md`._

## Now

> **⚠️ v3 core-resolution redesign (8 Jun 2026):** a real-human playtest found the v2 loop dull; the
> core flipped from deterministic specialist-assignment to a **chip / bag-builder draw** (see
> `current-idea-scratchpad.md` → v3). Items below that predate this still stand for the
> _economy/wrapper_, but the resolution mechanic is now different.

> **⚠️ v4 whole-game skeleton (9 Jun 2026):** Drew's post-whiteboard session with Andy consolidated the
> turn structure, machine modules, economy, experience, retirement, endgame and scoring into one
> skeleton — now captured in **`design-skeleton.md`** (the new foundation). Items below are updated to it.

- [x] **Footprint / imprint resolved (9 Jun).** Trace cards (1:1 with instability tokens) are the
      footprint in the bag model; engineers clear them. Discretion / Die A-B / danger ratings / fatigue
      retired into this model.
- [x] **Field / Desk / Workshop resolved (9 Jun).** Sent researchers can't work at home; the team is the
      action economy (one Develop action/turn).
- [x] **Capture the v4 skeleton → `design-skeleton.md` (9 Jun).**
- [x] **Timeline-collapse-as-loss resolved (9 Jun): the "Unravelling" fuse.** Integrity 0 → one final
      round (settle affairs, or ally for a last Many Worlds escape) → score; deterrent lives in the
      personal overclock costs. Keystone #3 reconciled in `core-goals.md`; skeleton §9/§10 updated.
- [ ] Confirm the small open mechanics: overclock draw amount; whether clearing instability costs the
      Develop action (see `design-skeleton.md` §10).
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
