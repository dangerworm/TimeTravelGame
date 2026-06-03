# Time Travel - Project Context

This is a board game design project, not a software project (yet).

## What this is

A competitive card-and-tableau board game for 2–6 players. Players are rival scientists who have
independently discovered time travel and are racing to build the best machine, assemble the best
team, and establish the greatest academic legacy. The game blends resource management, team
building, historical destination exploration, and academic output.

## Key files

| File             | Purpose                                                              |
| ---------------- | -------------------------------------------------------------------- |
| `game-design.md` | The canonical design document. Keep this up to date as we iterate.   |
| `ideas.md`       | Unintegrated ideas - review before each session, integrate if agreed |
| `thoughts.md`    | Half-formed thoughts and concerns - discussion fodder                |
| `tasks.md`       | Task list                                                            |
| `sessions/`      | Per-session handoff notes (source of truth is always `game-design.md`) |

## How sessions work

- Read `game-design.md`, `ideas.md`, and `thoughts.md` at session start.
- `game-design.md` is the single source of truth.
- Walk through design elements one at a time with Drew - discuss, challenge, refine.
- Occurring thoughts are added to `thoughts.md` to come back to.
- When items from `thoughts.md` are picked up, they are transferred to `ideas.md` and edited as the
  discussion continues so that `game-design.md` (a very large file) doesn't get polluted.
- When items from `ideas.md` have the relevant detail (fully formed and resolved), `game-design.md`
  is checked for inconsistency, contradiction, and duplication.
  - If any is found, the idea is reworked until it is suitable for the design document.
  - If the idea is 'clean', `game-design.md` is updated.
- When items from `ideas.md` or `thoughts.md` are resolved (accepted or rejected), note the decision
  and remove or archive them.
- Drew has never designed a board game before. Bring relevant game design knowledge to the
  discussion - reference comparable games where useful, flag common pitfalls, suggest mechanics from
  the broader genre when they fit.

## Design philosophy

- The game should feel like a career and a scientific legacy. Players are scientists, not thieves.
- Strategic tension: racing for Many Worlds (end game trigger) vs. building a rich legacy.
- No catch-up mechanics that feel patronising - the lending system should feel like genuine mutual
  benefit.
- Real historical mysteries are used as destination card content. Paper reward scales with how
  genuinely unknown the source material is.

## Future: browser prototype

When the design is sufficiently stable, a browser-based playtesting tool will be built - no AI, just
multiple boards and a table layout, playable solo to calibrate action economy and component counts.
See `tasks.md`.

