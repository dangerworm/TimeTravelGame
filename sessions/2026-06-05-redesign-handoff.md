# Session Handoff — 5 June 2026 (the redesign session)

_A long overnight session (~23:18 4 Jun → 06:30 5 Jun). The game was rebuilt from the ground up
around a new spine, and the core loop was playtested and validated. This note lets a fresh session
restart cold._

## Read first (every session)

1. `core-goals.md` — the spine + the four keystones + the two governing laws.
2. `constraints.md` — explicit do/don't, including the narrative-coherence and accessibility laws.
3. `current-idea-scratchpad.md` — **the full decision log for this redesign lives here.** Read the
   "Decisions made" + "Wrapper decisions" + "Develop & lifecycle" sections; the log is
   chronological, later entries win where they conflict.
4. `CLAUDE.md` — how to work with Drew (gut-first, processes slowly, wants brutal honesty, ~80%
   enjoyment / ~20% "you made this", keep the overclock + team-legacy thrills).

The old (v1) design is archived under `archive/` — a content bible to mine, not a blueprint.

## What this session did

Drew came in feeling v1 had "lost its way" (point-salad, downtime, routinised). We agreed to keep
the soul (fiction, real-history hook, keystones) and rebuild the skeleton. Then we designed and
**playtested the core loop on paper** (two expeditions, guided), and it works.

## The game as it now stands

**Premise:** rival scientists who co-discovered time travel; build a team + machine; run
**expeditions** to real historical mysteries; **publish** for reputation (the score); race toward
**Many Worlds** while the shared timeline frays.

**Turn = Execute → Develop → Stage** (staging kills downtime — you prep during others' turns):

- **Execute** the expedition staged last turn. An expedition is a **left-to-right path of steps**;
  each step needs the right **specialism + Skill**. Prepared (Skill ≥ req) → auto-success. Short by
  exactly 1 → **overclock** (the rewind): danger +1, Instability +1, roll Skill+1 dice, pips ≥ req
  (~60%, "reliable stretch"); short by 2+ is impossible. **Footprint** on every danger≥1 step: roll
  danger-many dice, pips − **Discretion** = **imprint** → Timeline Integrity drops (capped per era).
  Steps run in order; reward sits at the objective. Clean run (0 imprint) scores a bonus, even if
  you overclocked.
- **Develop:** spend **spoils** on three competing jobs — hire (shop), upgrade machine (capacity /
  era access / instability tolerance / precision), repair **instability** (a debt you must actively
  pay — it doesn't self-drain, and it adds danger as it climbs). Researchers **grow by use** and
  **retire into legacies** (see below).
- **Stage:** pick & prep the next expedition; assign team; broker loans.

**Two researcher stats:** **Skill** (can they do the job) and **Discretion** (how little trace they
leave). A person may work multiple steps of their specialism; each extra step = −1 Discretion
(fatigue). Two custom dice: **A** `0·1·1·1·1·2` (steady) and **B** `0·0·1·1·2·2` (volatile — same
mean, double variance, for deep/volatile expeditions).

**Team-legacy lifecycle (the keystone):** hire junior → they earn experience by _working_
expeditions → advance at thresholds (stat/ability bumps) → **retire**. Below an experience
threshold, retiring just frees the slot. At/above it, **draw 2 from the Retirement deck, keep 1**
(flat reward) — upgrade / boon / reputation / **protégé** (a lineage), each with flavour explaining
how it came about. Seed cards + tonal benchmark: `decks/retirement/seed-cards.md`.

**Shared layer:** one **Timeline Integrity** track = slow march to collapse; a **consequence deck**
fires whenever an expedition leaves an imprint (effects must MATTER, scale with era, mixed valence,
can target the table — the home for real-history ripples). Collapse is a **third-act mode-flip**
(race into Many Worlds), never a Pandemic-style dead stop.

**Turn 1:** everyone starts with a seeded **starter expedition** (gentle Recent-era jump) so turn 1
is productive and teaches the loop.

## Playtest result (Prototype 01, Exps 1–2)

Validated: the assign → push → footprint decision is tense and fun; the overclock delivered the
keystone thrill (Nuremberg, torchlit courtyard); twist, fatigue, Discretion, era-cap all pulled
weight. Final state after 2 expeditions: Integrity 8/10, Instability 2/5, Reputation 9, Spoils 3.
**The core loop is the proven spine.**

## Open fronts (next sessions — pick either)

1. **The endgame** — the collapse mode-flip in detail, how Many Worlds triggers, and **final
   scoring** (reputation is the score; needs a model that avoids v1's runaway-leader risk and the
   "who wants to trigger it?" problem flagged in `archive/`/the original review).
2. **The Develop economy specifics** — sell-vs-publish (does the objective force a choice between
   spoils and reputation?), the shop's shape, machine upgrade tracks, exact instability numbers.

Also parked: lending **terms** (must not let a leader farm reputation); a v1-style "React" before
Execute; whether intermediate steps can ever yield their own paper.

## Housekeeping / loose ends

- `prototypes/prototype-01.md` was updated mid-session for the locked rules (Discretion, overclock
  +1 cap, era-capped imprint, steps-in-order) but its **expedition reward lines still read "N
  spoils + Paper"** from before "reward sits at the objective" — worth a cleanup pass before the
  next play, and Exps 3–5 (thread/hidden/Die-B) are still unplayed.
- The prototyping **renderer** (Vite + React + MUI, JSON → printable cards) is still future work
  (`tasks.md`); we've been on paper by design. Good first real content for it: the destination,
  researcher, consequence, and retirement decks.
- Commits this session: `fc957f2` (reset + archive v1), `f50f0b4` (core loop + wrapper), and the
  handoff commit.
