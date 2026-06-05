# Session 6 Handoff (4 June 2026)

`game-design.md` is current and clean. Two commits this session: `58e5b93` and `b10e80b`.

## Key decisions made this session

- **3-action specials finalised:** Three distinct specials unlocked by team composition:
  - **Breakthrough** — quantum physicist + structural engineer → install one module for free into
    any existing empty slot (slots are never locked; the module cost is waived)
  - **Landmark Paper** — researcher + matching specialist postdoc (physicist/physics postdoc,
    historian/history postdoc, engineer/materials postdoc) → career-defining reputation gain.
    Generalist postdoc cannot trigger this.
  - **Temporal Anchor** — quantum physicist + any historian + advanced fabrication engineer +
    generalist postdoc → stabilises a parallel timeline entry point; required before Many Worlds
    upgrade can be purchased
  - All specials: player's 3 actions consumed + all named team members exhaust; jump replaced
- **React mechanic clarified:** Costs 1 action; limits draw to top card only (no card burned or
  destroyed). Action cost represents effort of setting up a jump even without preparation. If no
  jump was staged, team instability token added.
- **Postdoc role clarified:** Card backs always accessible. Postdocs free player actions rather than
  unlocking anything.
- **Terminology rename:** "reputation points" → "reputation"; "disrespect tokens" → "disrepute
  tokens" throughout.
- **Satellite slots → modules:** "Satellite ability slots" → "module slots"; "ability cards" →
  "modules" throughout the document.
- **Consequence deck fully specified:** 42 cards (14 positive, 28 negative); face-up discard pile;
  shuffled when exhausted. Three difficulty tiers:
  - Easy: draws reduced by 1 (min 0) + 1 shared end-of-round draw (active player → all players)
  - Normal: draw as specified on destination card
  - Hard: all draws +1 (min 1 per jump)
  - Four targeting types: active player, all other players, all players, conditional
  - Easy round-end expansion only applies to active-player-targeted cards; conditional targeting
    always resolves as written
- **Lending mechanic formalised:**
  - Initiated at beginning of a jump (React or normal)
  - Reputation gain automatic when borrower completes a jump using lender's machine (machine only;
    not for team member loans)
  - React case: instability token goes on whichever machine is used
  - Normal case: no instability added to lender
  - Loan = one jump, team member returns automatically, no age adjustment
  - Transfer = permanent move, -5 year age adjustment
- **Unified instability system:** Single pool, two areas:
  - Machine tokens (overclock → machine stack): mitigated by experimental physicists; removed only
    by Reliability Engineers (1/turn, non-overclock turns)
  - Team tokens (React/consequences → near team slots): removed naturally 1/turn; React tokens
    active for current turn only and gone by end of turn
  - Total across both areas fires the effect table on ANY jump when total > 0 (not just overclock)
  - Table moved to its own `### Instability` section within The Time Machine
- **Stage feels added** to machine stages table Notes column (Stage 0: discovery/amazement; Stage 1:
  peak personal danger; Stage 2: busier, more complex; Stage 3: routine, lending peaks; Stage 4:
  smooth but volatile, race to Many Worlds intensifies)
- **Document review completed:** Cleaned up stale terminology, typos, and structural issues
  throughout. Notably: 'butterfly effect' → 'consequence' in destination card description; 'credits'
  → 'currency'; 'overclock tokens' → 'instability tokens'; typo 'additonal' fixed; footer updated;
  instability token removal scope clarified.

## Still to resolve (all are playtesting calibration — no design decisions pending)

- Exact reputation score values — weighting of papers vs team vs machine vs disrepute penalty
- Machine failure consequence mix — range of outcomes per destination tier
- Researcher shop visible count — starting point 4–6
- Exact token denominations — 1/3/7 starting point
- Game length calibration — targeting 3–5 hours
- Instability token thresholds — calibration of the 1/2/3/4+ breakpoints

## Active items in thoughts.md

- **Intentional abandonment / planted agent** — undecided; complex
- **Sabotage card** — undecided; balance risk flagged
- **Visitation (Stage 1) as peak risk** — confirmed as intended feel; note for content design that
  Stage 1-accessible destinations should carry more Die 1/Die 2 risk
- Many Worlds as intermediate unlock (Option B) — deferred; revisit during playtesting

## Active items in ideas.md

- **Undo expedition** — multi-player consequence reversal; four open questions about trigger,
  resource pooling, cost, and timing
- **Consequence card: end of capitalism** — needs duration rule, threshold modifier, scope
- **Real historical stuff** — reference bank for destination card content design
- **Named researchers / sci-fi IP** — use real names for prototype; homages if/when commercial
- Machine cards visual stacking — deferred to production design
- Future era — deferred to expansion
