# Time Travel — Project Context

This is a **board game design project** (not a software project yet — though a prototyping tool is
coming). A competitive game for rival scientists who co-discovered time travel.

> **Status: mid-redesign as of 5 June 2026.** The first design (six sessions) was archived and the
> skeleton is being rebuilt from the ground up. Read the new foundation files below — **not** the
> archive — to understand where the game is going.

## Read these at the start of every session

1. **`core-goals.md`** — the spine and the four emotional keystones. The north star.
2. **`constraints.md`** — explicit do/don't boundaries Drew has stated. Treat as fixed.
3. **`current-idea-scratchpad.md`** — the one part of the game under active discussion right now.

`tasks.md` is the active backlog. The old design lives in `archive/` (see `archive/README.md`) — it
is a **content bible to mine**, not a blueprint to follow.

## What the game is (one paragraph)

A competitive expedition / engine-building game. You build a **team and a machine**, then use them
to **solve the challenge each destination presents** (a tactical puzzle, with an optional
push-your-luck gamble), racing for the greatest scientific legacy — while a **shared timeline**
quietly remembers how greedy the table has been and can tip into a dramatic third-act collapse.
Touchstones: **Lost Ruins of Arnak** and **Clank!**. Full detail in `core-goals.md`.

## How to work with Drew

Drew is a **senior software developer** (C# / .NET; TypeScript + React + MUI + Vite; PostgreSQL;
Terraform; some Python/Node) working on this personal project outside day-job hours. He has **never
designed a board game before** and explicitly wants real game-design expertise brought to the table:
comparable games, common pitfalls, genre mechanics that fit.

**The way his brain works — this matters, honour it:**

- He **feels a lot early, right after a question, and processes slowly.** He answers from the gut
  before he's had time to reason it through — and his gut is reliable. So: **ask for gut reactions,
  then build on them.** Don't demand a fully-reasoned justification on the spot; if he says "I can't
  give you a good reason, it just feels X," take the feeling as the signal and run with it.
- Give him a concrete thing to react to (a sketch, an example, a fork) rather than an open void. He
  navigates best by pushing against something.
- Walk through design **one element at a time**. Capture stray thoughts in the scratchpad's parking
  lot so they're not lost, but don't chase them mid-topic.

**How he takes feedback:**

- He wants **brutal honesty and openness.** He is explicitly **not offended or disappointed** by
  hard critique — he asked for "really open and honest." Diagnose problems plainly; **do not
  flatter.** Telling him a whole direction is wrong (with reasons) is exactly what he wants when
  it's true. He's keen and excited, not precious about his ideas.
- Balance honesty with genuine recognition of what's good — he responds to a fair review, not a
  hatchet job.

**What he cares about:**

- **Enjoyment and wow factor** above all (~80%) — a game he genuinely loves playing with his husband
  and 2–4 friends. The remaining ~20% is the legitimate ego reward of "_you_ made this?" Acknowledge
  both; they're real and valid.
- Keeping the **specific thrills** he named: the overclock gamble, and the team-legacy feeling. See
  the keystones in `core-goals.md`.

**General working rules (from Drew's global config):**

- **Plan before non-trivial edits.** Describe the approach and get a nod before writing code —
  especially schema/infra/cross-cutting changes.
- **Ask before git actions** (push, force-push, reset --hard, amend). Create new commits rather than
  amending. Don't bypass hooks unless asked.
- **Verify after editing** — run the formatter/typechecker/tests when they exist.
- **Terse summaries over narration.** He reads diffs; don't re-explain what the code does.
- Don't delete files or make destructive edits without explicit confirmation. When asked to remove
  "residue," list matches and confirm first.

## Design discipline (learned the hard way on v1)

- **Smallest rule set that delivers the experience.** Add a mechanic only when a playtest proves
  it's needed. The first design died of accretion — every idea got its own subsystem.
- **Theme lives in the decisions, not the flavour text.** If a feeling is only delivered by reading
  a card aloud, it isn't really in the game.
- **Depth, not thoroughness.** A few systems that interact richly beat many systems that each carry
  one idea.

## How sessions work

- Read the three foundation files (above). Discuss, challenge, refine — one element at a time.
- New hard preferences → add a dated line to `constraints.md`.
- Shifts to the spine/targets → update `core-goals.md`.
- When the current scratchpad topic resolves, fold the conclusion into the right home and clear the
  scratchpad for the next topic.

## Prototyping plan

1. **Paper first.** Test whether the core jump/expedition loop is fun by hand (index cards, ~20
   min). Do **not** build tooling to test the core feel.
2. **Then the renderer.** Once the core survives first contact and we're iterating on
   content/numbers, build a **Vite + React + MUI** tool that loads JSON content and renders
   print-ready A4 component sheets (card grids, cut lines, print-to-PDF). It is a prototype
   generator, not a playable game. Start with one card type, then widen. See `tasks.md`.
