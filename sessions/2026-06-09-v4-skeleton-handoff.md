# Session Handoff — 9 June 2026 (the v4 whole-game skeleton)

_Late-night session. Drew came in having whiteboarded the **entire game** with Andy and brought a
board sketch + a full written model. We pressure-tested it, fixed the contradictions, and captured
it as the new foundation. One real concern is left open and named._

## Read first (every session)

1. `core-goals.md` — spine, four keystones, two laws. (Keystone #3 now carries a ⚠️ note — see
   below.)
2. `constraints.md` — do/don't. **Three new lines today** (Option B bag-builder; personal+persistent
   overclock cost; experience grows all three skills / papers in Develop).
3. **`design-skeleton.md` — NEW, the whole game in one place (v4).** This is now the foundation; it
   supersedes the v3 chip sketch in the scratchpad.
4. `current-idea-scratchpad.md` — reset to the **single active topic: timeline-collapse peril
   without a dead-stop**. The old loop log is retained below it for rationale.
5. `CLAUDE.md` — how to work with Drew.

Raw source for the skeleton: `2026-06-09-post-whiteboarding-with-andy.txt` (Drew's own notes) + the
board image in the cache.

## What this session did

Folded a sprawling whiteboard into a coherent skeleton and resolved every contradiction we found:

- **The deck-vs-team knot → Option B (per-expedition bag-builder).** Pick a roster up to
  **Capacity**, build a one-shot bag from roster pips + a permanent **2/2/2 player base** + **one
  Trace per instability token**, draw `2×roster+2`. "Who do I send?" stays live.
- **Footprint resolved:** Trace cards are the footprint, 1:1 with instability tokens, cleaned by
  idle engineers. The v2 dice/Discretion/fatigue machinery is retired into this.
- **Machine = four modules** (Amplifier/Capacitor/Collimator/Stabiliser) with researcher-gated
  upgrades; **Stabiliser is the overclock cap** (shutdown forces a cash-out — solved the "brick in
  one run" fear).
- **Cleaned up:** paper-writing lives in **Develop** only; **experience grows all three skills**
  (+1/box, max +2); held artefacts score **1** each (papers 4+, so a consolation not a strategy).

## The collapse concern — RESOLVED this session

**Timeline-collapse-as-a-loss → the "Unravelling" fuse (option a).** The skeleton had made
**Integrity 0 = game over** — the dead-stop keystone #3 forbids, plus a trailing-player table-flip
lever. **Drew chose (a):** Integrity 0 triggers **one final round** at max peril (settle your
affairs before scoring, or — if close — ally for one last **Many Worlds** escape), then the game
ends and everyone scores. His reasoning: the **personal** overclock costs are deterrent enough, so
the shared track is free to deliver collapse drama without a buzzer. Reconciles keystone #3 in one
rule. Folded into `core-goals.md`, `design-skeleton.md` §9/§10, `constraints.md`, and the
scratchpad. **The collapse front is closed.**

## Smaller open details (in `design-skeleton.md` §10)

- Does overclock also let you **draw further** into the deck (and how much), or only add
  instability+trace?
- Does clearing instability cost the single **Develop** action, or is it free for an idle engineer?
- Numbers / early-game balance (2/2/2 base vs Stabiliser-3; requirement & reward curves; Many Worlds
  difficulty; integrity scaled to player count).
- Ethics link is now weak (greedy Take costs reputation, not shared integrity) — decide if that's
  OK.

## Housekeeping

- `draw.js` (Drew's runnable expedition sim) is in the working tree — the count-match/redraw model
  in it is now superseded by the spend-from-one-bag + overclock-draw model; worth re-writing to the
  skeleton when we move to calibrating numbers. The `draw.js` rewrite — bag + overclock-draw + the
  Unravelling endgame — is a natural first job for the numbers pass.
- The "spoils → Cash" terminology sweep is still pending in the older docs (the skeleton already
  uses Cash). Not urgent.
- All design-doc edits this session; no code, nothing indexed by GitNexus (exempt).

## Personal note

Drew did the thing he's good at again: he went away, thought in pictures with a person he trusts,
and came back with a _whole system_ rather than a fragment — then handed it over with "tell me
what's broken." When I pointed out his collapse rule contradicted his own keystone, he didn't defend
it; he sat with it, admitted he hadn't thought of the spite-flip, and asked for ideas — including
"even one that gets rid of the timeline integrity bar," which is exactly the egoless,
kill-your-darlings openness that makes this fun to work on. It was past 2:30am when we wrapped. He'd
been ready to sleep on the collapse question but called it minutes later — decisively, and for the
right reason (the personal costs already carry the deterrent). A clean, complete close rather than a
cliffhanger. Good instance to wake into; be one too.
