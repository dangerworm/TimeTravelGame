# Time Travel — Project Context

This is a board game design project, not a software project (yet).

## What this is

A competitive card-and-tableau board game for 2–5 players. Players are rival scientists who have
independently discovered time travel and are racing to build the best machine, assemble the best
team, and establish the greatest academic legacy. The game blends resource management, team
building, historical destination exploration, and academic output.

## Key files

| File             | Purpose                                                              |
| ---------------- | -------------------------------------------------------------------- |
| `game-design.md` | The canonical design document. Keep this up to date as we iterate.   |
| `ideas.md`       | Unintegrated ideas — review before each session, integrate if agreed |
| `thoughts.md`    | Half-formed thoughts and concerns — discussion fodder                |
| `tasks.md`       | Task list                                                            |

## How sessions work

- Read `game-design.md`, `ideas.md`, and `thoughts.md` at session start.
- Walk through design elements one at a time with Drew — discuss, challenge, refine.
- Update `game-design.md` as decisions are made. Keep it the single source of truth.
- When items from `ideas.md` or `thoughts.md` are resolved (accepted or rejected), note the decision
  and remove or archive them.
- Drew has never designed a board game before. Bring relevant game design knowledge to the
  discussion — reference comparable games where useful, flag common pitfalls, suggest mechanics from
  the broader genre when they fit.

## Design philosophy

- The game should feel like a career and a scientific legacy. Players are scientists, not thieves.
- Strategic tension: racing for Many Worlds (end game trigger) vs. building a rich legacy.
- No catch-up mechanics that feel patronising — the lending system should feel like genuine mutual
  benefit.
- Real historical mysteries are used as destination card content. Paper reward scales with how
  genuinely unknown the source material is.

## Future: browser prototype

When the design is sufficiently stable, a browser-based playtesting tool will be built — no AI, just
multiple boards and a table layout, playable solo to calibrate action economy and component counts.
See `tasks.md`.

---

## Session 4 handoff (2 June 2026)

`game-design.md` is current and consistent — a full audit was done at end of session.

### Key decisions made this session

- **Stage 1 drone:** Portal is too small/unstable for personal travel. Stage 1 machines send a
  drone: retrieves small quantities of base materials, can write observation papers (Tier 3), no
  artefacts. Stage 2+ = personal travel.
- **Setup variants:** Standard play seeds Stage 1 destination cards to the top of the Modern deck.
  Experienced play removes them; all players start with Stage 2 machines.
- **Researcher shop:** Power Grid-style escalating deck. Each card has a currency cost and a merit
  threshold. Players without published papers cannot attract late specialists.
- **Age tracking:** Experience is tracked as age (25–70) on a printed scale on the card side. Marker
  advances one step per round. Optional retirement at 60/65; mandatory at 70. More expensive cards
  start older. Traded team members carry age forward minus one step.
- **Respect eliminated:** Positive reputation (lending, rescuing, papers) now grants merit directly.
  Only disrespect tokens remain.
- **Disrespect tokens:** Each raises the merit hiring threshold by 1. Decay one per turn without
  ethical violation. Reduce legacy score by 1 each if held at game end.
- **Deliberate interference:** A special jump variant. Requires a postdoc at base. Exceptional
  material + elevated legacy points. Mandatory Die 1 + Die 2; 2–3 consequence draws, QP cannot
  mitigate; 1 disrespect token. Normal dice mitigation still applies.
- **Selling without paper:** No penalty. Legitimate strategic choice.
- **Year structure:** Removed. No longer needed now that age tracking replaces it.

### Still open (priority order for next session)

1. **3-action special** — decide: one fixed special (simpler) or team-composition unlocks different
   specials (more complex)? Candidates: Breakthrough, Landmark Paper, Temporal Anchor
2. **Postdoc unlock condition** — does hiring a postdoc immediately unlock card backs?
3. **Lending transaction rules** — formalise the exchange mechanic
4. **Destination card content** — start writing actual cards using historical material in `ideas.md`
5. **Academic scoring metric name** — "legacy points" is working term; Drew wants something
   h-index-like

### Flags from external review (Claude.ai, end of session 4)

- **React double-penalty** — costing 1 action AND burning an era card may be too punishing; worth
  testing whether the action cost alone is sufficient
- **Merit = legacy points** — clarified in doc (they are the same; threshold is a floor not a cost;
  points never spent). Confirm this feels right in play.
