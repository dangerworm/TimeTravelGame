# Time Travel — Project Context

This is a **board game design project** (not a software project yet — though a prototyping tool is
coming). A competitive game for rival scientists who co-discovered time travel.

> **Status: v4, balance-validated, pre-playtest, docs consolidated (10 June 2026).** A balance
> simulator (`sim/`) has tuned the game across 2–6 players. The design now lives in two foundations
> — **`intentions.md`** (spirit + why) and **`game-design-document.md`** (the game). Next up:
> paper-playtest content → the renderer; one open design thread (the Many Worlds "kingmaker"
> question). Read the foundation files below — **not** the archive — to understand where the game
> is.

## Read these at the start of every session

1. **`intentions.md`** — the spirit (spine + four keystones + the two laws) and the _why_ behind
   every decision. The north star + the rationale ledger. _(Consolidates the former
   `core-goals.md` + `constraints.md`, now in `archive/`.)_
2. **`game-design-document.md`** — the game itself: the full ruleset, one place. _(Supersedes the
   archived `design-skeleton.md`.)_
3. **`tasks.md`** — the live backlog (done items in `archive/completed-tasks.md`).

The old design lives in `archive/` — a **content bible to mine**, not a blueprint. It includes
`archive/v2-v3-design-log.md` (the rationale behind every locked v2/v3 decision) and the v1
material.

## What the game is (one paragraph)

A competitive expedition / engine-building game. You build a **team and a machine**, then use them
to **solve the challenge each destination presents** (a tactical puzzle, with an optional
push-your-luck gamble), racing for the greatest scientific legacy — while a **shared timeline**
quietly remembers how greedy the table has been and can tip into a dramatic third-act collapse.
Touchstones: **Lost Ruins of Arnak** and **Clank!**. Full detail in `intentions.md`.

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
  the keystones in `intentions.md`.

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

- Read the foundation files (above). Discuss, challenge, refine — one element at a time.
- New hard preferences / decisions → add a dated entry to `intentions.md` (Part II — Decisions).
- Shifts to the spine/keystones → update `intentions.md` (Part I — Spirit); rule changes →
  `game-design-document.md`.
- Capture decisions in their home doc and open threads in `tasks.md` (the live scratchpad is retired
  — its history is `archive/v2-v3-design-log.md`).

## Prototyping plan

1. **Paper first.** Test whether the core jump/expedition loop is fun by hand (index cards, ~20
   min). Do **not** build tooling to test the core feel.
2. **Then the renderer.** Once the core survives first contact and we're iterating on
   content/numbers, build a **Vite + React + MUI** tool that loads JSON content and renders
   print-ready A4 component sheets (card grids, cut lines, print-to-PDF). It is a prototype
   generator, not a playable game. Start with one card type, then widen. See `tasks.md`.

## Standing orders

- **Keep an up-to-date PDF set committed.** Whenever the renderer is updated (content or design)
  **and is in a known working state** (build + typecheck pass, eyeballed), regenerate PDFs for **all**
  components — every card deck, the player board, tokens, and the machine level diamonds — and **commit
  them to the repo** so a current set is always available from the cloud (GitHub). Steps: ensure the
  app is being served (`npm run dev`, port 5173), run `node renderer/scripts/export-pdfs.mjs`, then
  commit the refreshed `renderer/exports/*.pdf`. The set is overwritten in place (one folder, no dated
  subfolders) — **git history is the snapshot trail**, so each export's date lives in its commit.
  _(Drive was considered and dropped: the MCP `create_file` tool only takes inline base64, far too
  large for these multi-MB PDFs.)_
