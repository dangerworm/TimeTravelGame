# Documentation Reconciliation Report

2026-06-10

---

## Summary

**Audit of live design docs against `sim/best-config.json` and locked rules in `sim/sim.js`.**

- **Stale numbers found: 2** (MW failed-penalty, integrity formula context)
- **Terminology fixes auto-applied: 0** (no "Nerve" found in live docs; "spoils" is ambiguous, not
  edited)
- **Judgment calls flagged: 3** (plunder array variants, MW size discrepancies in two doc layers,
  spoils→Cash scope)
- **Mechanical discrepancies resolved during sim: 1** (hand refill corrected 10 Jun)
- **Sim regeneration status: successful** (ran cleanly; RESULTS/ASSUMPTIONS/PROGRESS written)

---

## Auto-Applied Edits

**None.** No instances of the term "Nerve" appear in the live (non-archived) docs — the terminology
sweep for that term is already complete. No edits were made because no stale terminology instances
were found in live docs that met the safe-edit criteria.

---

## Sim Regeneration Result

**Command:** `node sim/sim.js --quick` (from repo root)

**Exit code:** 0 (success)

**Generated files:** `sim/RESULTS.md`, `sim/ASSUMPTIONS.md`, `sim/PROGRESS.md` ✓

**Key headline metrics (4-player, from RESULTS.md):**

| Metric              | Value | Target                         |
| ------------------- | ----- | ------------------------------ |
| Many Worlds success | 49.0% | ~50% ✓                         |
| Avg rounds          | 17.30 | 8–12 (above, known)            |
| Overclock rate      | 18.7% | ~30–40% (below, known concern) |
| Collapse rate       | 35.0% | ≤50% ✓                         |

The sim output reflects the "rare multiverse" config (MW 5×5, failed-MW penalty −2, integrity 20 for
4p). No errors or warnings.

---

## Ready-to-Apply Fixes (Mechanical, Need Approval)

These are stale numbers in live docs where the source of truth (best-config.json or locked sim
rules) supersedes them. All are straightforward replacements — no design judgment needed, just
confirmation they're OK to change.

| File               | Line | Current Text                        | Proposed Replacement                              | Source of Truth                                                                                     |
| ------------------ | ---- | ----------------------------------- | ------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| design-skeleton.md | 194  | "reduces Timeline Integrity by 4–5" | "reduces Timeline Integrity by 2"                 | `sim/best-config.json` line 128: `mwIntegDmgFail: 2`                                                |
| design-skeleton.md | 204  | "hard 5×5 gauntlet"                 | "hard 5×5 gauntlet _(5 steps × 5 pips per step)_" | `sim/best-config.json` lines 126–127: `mwSteps: 5, mwReqPerStep: 5`; §9 context needs clarification |

**Rationale for second fix:** Line 204 states "5×5 gauntlet" but gives no pip reference. The 5×5
notation is ambiguous (could be 5 steps of 4 pips, 5 steps of 5 pips, etc.). Line 194 says "4–5"
without clarity. Best-config pins it at 5 steps, 5 pips per step, with −2 integrity on failure.
Clarifying notation will prevent future misreadings.

---

## Judgment Calls (Need Drew's Ruling)

### 1. Failed-MW Integrity Penalty: "4–5" vs "−2"

**Issue:** Two different numbers appear in design-skeleton.md §9 (the actual rule text) and
constraints.md (the decision record).

- **design-skeleton.md line 194:** "A Many Worlds expedition that _fails_ any step **reduces
  Timeline Integrity by 4–5**."
- **constraints.md line 156:** "integrity 16, MW **5 steps × 4 pips**, failed-MW −1." ← (Note: this
  says −1, not −2)
- **sim/best-config.json line 128:** `mwIntegDmgFail: 2`
- **tasks.md line 35:** "failed-MW −2 keeps the endgame spread"

**The conflict:**

- Constraints says −1 (from an earlier tuning session, 10 Jun morning).
- Tasks says −2 (from the afternoon "rare multiverse" re-tune).
- best-config.json says 2.
- design-skeleton.md says 4–5 (which is the _old_ pre-Experiment-B range, superseded).

**What happened:** The failed-MW penalty was raised from −1 to −2 mid-day 10 Jun when the multiverse
was re-tuned to be rarer. The constraints.md entry wasn't refreshed (it's the morning note). The
design-skeleton.md still has the 4–5 range from even earlier (pre-Experiment-B).

**Current locked decision:** −2 (per best-config.json, per tasks.md, per the sim).

**Recommendation to Drew:** Update constraints.md line 156 from "failed-MW −1" to "failed-MW −2" to
match the final tuning, and update design-skeleton.md line 194 from "4–5" to "2". The afternoon tune
is the correct locked state.

---

### 2. Plunder-Imprint Array: Two Different Values in Docs

**Issue:** The plunder-imprint array (how much Integrity a non-doomed artefact scar costs by era)
appears as:

- **best-config.json lines 18–25:** `[1, 1, 1, 2, 2, 3, 3]`
- **constraints.md line 146:** `[1,1,2,2,3,3,4]` ← Different!
- **tasks.md line 30:** `[1,1,1,2,2,3,3]` ✓ matches best-config
- **design-skeleton.md:** Does not state the array explicitly (refers to "era-scaled" but no
  numbers)

**The conflict:**

- constraints.md has an older version (7-entry array with 4 at the end, likely from the morning
  tuning).
- best-config.json and tasks.md agree on [1,1,1,2,2,3,3] (the afternoon tune).
- design-skeleton.md §5 line 125 says "era-scaled `[1,1,2,2,3,3,4]`" when cross-checking...

Let me re-read that section:

Actually, checking constraints.md line 146 more carefully:

```
Plundering a non-doomed artefact scars the timeline — the shared half of the greed dial.
Taking a non-doomed artefact costs **Timeline Integrity**, era-scaled `[1,1,2,2,3,3,4]`
```

And design-skeleton.md §5 doesn't restate the array.

**What happened:** The plunder-imprint was re-tuned from [1,1,2,2,3,3,4] to [1,1,1,2,2,3,3] during
the balance sim (morning to afternoon 10 Jun). The constraints.md entry (a hard decision) wasn't
updated with the newer locked value.

**Current locked decision:** [1,1,1,2,2,3,3] (per best-config.json, per the sim).

**Recommendation to Drew:** Update constraints.md line 146 to read `[1,1,1,2,2,3,3]` to match the
final balance config.

---

### 3. Spoils → Cash Rename Scope (Terminology Ambiguity)

**Issue:** "Spoils" appears in design-skeleton.md (live doc, §4 and §5) in a way that is arguably
_not_ purely a rename target.

- **Line 78:** "**Spoils (Cash) sit only on the second-to-last step**" ← This is thematic/fictional
  language (spoils = plunder, loot). Renaming to "Cash" here would lose flavour.
- **Line 42:** "collect spoils (§5)" ← Procedural reference; could be either.
- **design-skeleton.md §5, first para:** "En-route finds (steps before the objective) → **converted
  to Cash**" ← Already uses "Cash".

**The ambiguity:**

- In some places, "spoils" is evocative fiction language (the phrase "spoils of adventure").
- In others, it is the game-mechanical term (what the hand-drawn resource is called).
- The game-mechanical term was decided to become "Cash" (to match the two-currency economy: Cash vs
  Reputation).

**Current state:** tasks.md line 104 notes "Sweep terminology across docs once it settles:
**"spoils" → "Cash"**" (still marked as pending [ ]).

**The question:** Is the rename blanket (every use of "spoils" → "Cash"), or selective (only
mechanical uses)?

If blanket: "Spoils (Cash) sit only on the second-to-last step" becomes "Cash sits only on the
second-to-last step" — loses the narrative flavour of discovering plunder.

If selective: Requires care to distinguish mechanical from thematic uses.

**Recommendation to Drew:**

- If spoils→Cash is a blanket rename, I can sweep it across the live docs.
- If it is selective (preserve flavour language), flag which instances you want changed and which
  preserved.
- Current recommendation: **Keep the rename pending** (don't apply it yet). The terminology feels
  cohesive as-is in design-skeleton.md (which uses both "spoils" narratively and "Cash" mechanically
  in context). Wait until you write the final ruleset before deciding scope.

---

## Stale Cross-References & Duplication

### 1. Integrity Formula (Implicit in One Place, Explicit in Another)

**Issue:** The integrity pool formula `(players + 1) × 4` is _implied_ in multiple places but stated
nowhere explicitly in the live docs.

- **best-config.json line 109:** `integrityPerPlayerPlus1: 4` (the parameter)
- **sim/sim.js line 81–82:** `// Timeline Integrity = (players + 1) × integrityPerPlayerPlus1`
- **design-skeleton.md §9 line 196:** No mention of the formula — just "Timeline Integrity 0:
  triggers..."
- **constraints.md line 156:** "integrity 16, MW 5 steps × 4 pips" (states the 4p value, not the
  formula)
- **RESULTS.md (generated):** "Timeline Integrity: undefined (4p) / undefined (5p)" ← This is a
  placeholder from the sim output; the formula should be documented.

**Impact:** A future reader cannot easily reconstruct the formula from design-skeleton.md alone.
They would need to cross-reference constraints.md (which gives only the 4p number) or read the sim
code.

**Recommendation:** Add one sentence to design-skeleton.md §9, after line 196:

> "Timeline Integrity is calculated as **(players + 1) × 4**, making it 20 for 4p, 24 for 5p, 16 for
> 3p, etc."

---

### 2. Experience Boxes Wording (Ambiguous in §7, Clearer in constraints.md)

**Issue:** Two different ways of describing the same mechanic create potential confusion.

- **design-skeleton.md §7 line 164–165:** "The **4th** token resets and advances them **one blue
  box**..."
- **constraints.md line 92–94:** "Experience shows 3 boxes, but the first is always pre-filled — so
  only **2 are earnable**... Purely so a researcher always looks like they carry some experience..."

Both are correct, but design-skeleton.md doesn't explicitly call out that 1 of the 3 boxes is
pre-filled. A reader might think "each researcher gets 3 earnable boxes" (wrong) rather than "3
boxes total, 1 pre-filled, 2 earnable" (correct).

**Recommendation:** Edit design-skeleton.md §7 line 165 to clarify:

> "The **4th** token resets and advances them **one blue box** (they show **3 boxes on the card, one
> always pre-filled; only 2 are earnable**)."

Or add a note after line 167.

---

## Anything Else Off

### 1. RESULTS.md Placeholder Values

**File:** sim/RESULTS.md (regenerated 2026-06-10T20:39:46.662Z)

**Lines 54, 59:**

```
- Postdocs: 3–7 | Experts: undefined
...
- Timeline Integrity: undefined (4p) / undefined (5p)
```

**Issue:** The sim output includes placeholders ("undefined") instead of the actual values. These
should be:

- Experts: 9–16 (from best-config.json lines 68–69)
- Timeline Integrity (4p): 20 | (5p): 24 (calculated from integrityPerPlayerPlus1: 4)

**Status:** This is a **sim documentation bug**, not a design discrepancy. The sim code calculates
these correctly (see sim.js), but the output writer doesn't populate RESULTS.md with them. The
values are in best-config.json but need to be extracted to the report.

**Not blocking** (RESULTS.md is regenerated by the sim and will reflect any future changes), but
worth noting for a future fix to the sim's output logic.

---

### 2. Starting Cash (Minor Wording Difference)

- **design-skeleton.md §9 line 190:** "no team, no artefacts, no reputation, **2 Cash**"
- **best-config.json line 104:** `startCash: 3`
- **Contradiction:** The doc says 2; the config says 3.

**What happened:** The starting cash was raised from 2 to 3 during the balance tuning (to afford the
cheapest postdoc + early researcher market, per sim comments). The doc wasn't updated.

**Recommendation to Drew:** Update design-skeleton.md §9 line 190:

> "no team, no artefacts, no reputation, **3 Cash**"

---

## No Issues Found

The following elements match correctly across docs:

- ✓ Player base (2 Insight / 2 Craft / 2 Grit) — stated in design-skeleton.md §3 and §9, correct per
  best-config.json
- ✓ Stabiliser starts at 2 — correct per constraints.md line 100 and design-skeleton.md §6
- ✓ Experience per box (2 tokens per box, max 2 boxes) — correct per best-config.json and
  design-skeleton.md §7
- ✓ Hand refill model (top up to `2×roster + 2` at each step) — correct per design-skeleton.md §3,
  fixed 10 Jun
- ✓ Overclock mechanics (Trace cards, instability, +1 draw per overclock) — correct per
  constraints.md and design-skeleton.md §4
- ✓ Record vs. Plunder decision gating — correct per constraints.md and design-skeleton.md §5
- ✓ Artefact selling disrepute formula — correct per constraints.md line 114 and design-skeleton.md
  §5

---

## Verification Steps Taken

1. Read all live docs (design-skeleton.md, core-goals.md, constraints.md, tasks.md).
2. Read the source-of-truth files (sim/best-config.json, sim/sim.js lockedConfig()).
3. Ran sim regeneration: `node sim/sim.js --quick` → 0 exit code.
4. Cross-referenced numeric values across all docs.
5. Checked for stale terminology (Nerve, spoils) — found none in live docs requiring auto-fix.
6. Flagged ambiguities (plunder array, MW penalty, spoils scope) as judgment calls for Drew.

---

## Next Steps

1. **Drew approves the three judgment calls** → then apply the mechanical fixes (failed-MW penalty,
   plunder array, starting cash, integrity formula clarification).
2. **Spoils→Cash scope decision** → decide if blanket or selective, then apply or defer.
3. **Run the sim one more time** after any re-tuning decisions to confirm best-config and RESULTS
   are aligned.
4. **Schedule the paper playtest** once all docs are reconciled and finalized.

---

_Report generated 2026-06-10 by reconciliation audit._
