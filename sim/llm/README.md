# LLM playtest — Warped

Plays one full game of Warped end-to-end, on the real `decks/` content, with every player's
decisions made by a **local Ollama model** instead of tokens-burning Claude and instead of the
balance sim's fixed heuristic bots. It reuses the exact same validated rules engine the balance sim
(`sim/full-game.js`) uses — `sim/game/*` + `sim/lib/*`, driven through the same `playGame()` — so
this is not a re-implementation of the rules, it's the same engine with an LLM sitting in the
"policy" seat at each decision point.

## Run it

```bash
node sim/llm/play-llm-game.js --config sim/configs/adopted.json
```

That starts `ollama serve` if it isn't already running, pulls the model if you don't have it, then
plays a 4-player game to completion, printing a turn-by-turn log and a final scoreboard.

**Pass `--config sim/configs/adopted.json`** (or another file from `sim/configs/`) for a real
playtest — without it you get `best-config.json`'s un-gated, un-patterned content, which is a
materially different (and harder-to-bootstrap) game than the one the balance work actually tuned.
`sim/full-game.js`'s default is the same, for the same reason: it's the baseline experiment, not the
recommended way to play.

### Useful flags

| Flag              | Default                   | What it does                                                                                                                                    |
| ------------------ | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--model`           | `llama3.1:8b`              | Any Ollama model tag, must be **exact** (see "Picking a model").                                                                                  |
| `--players`         | `4`                         | Table size.                                                                                                                                        |
| `--seed`            | current time                | Fix it to replay the exact same deck shuffle/market/RNG.                                                                                          |
| `--temperature`      | `0.3`                       | Lower = more consistent/legal answers; higher = more varied play.                                                                                 |
| `--policies`         | `llm,llm,llm,llm`           | Comma list, e.g. `llm,balanced,balanced,balanced` — mix in fast heuristic bots for a quick debug run without waiting on 4 model calls every decision. |
| `--config`           | none (→ `best-config.json`) | A config file from `sim/configs/` — same shape/semantics as `sim/full-game.js --config`.                                                          |
| `--reqs`             | `current` (or the config's) | `proposed` uses Drew's gentler hand-tuned step-req spread (`sim/lib/patterns.js`).                                                                |
| `--gates` / `--nogates` | the config's, else off      | Depth-graded profession-lock gating (Recent/Modern ungated, etc.) — overrides the config file.                                                    |
| `--findmult`         | `1` (or the config's)       | Scales en-route Cash income.                                                                                                                       |
| `--renewable`         | off (or the config's)       | Researcher market reshuffles from the pool instead of running dry.                                                                                |

Example: a fast sanity run with one model seat and 3 heuristics, on the tuned content —

```bash
node sim/llm/play-llm-game.js --policies llm,balanced,balanced,balanced --seed 7 --config sim/configs/adopted.json
```

## Picking a model

Any instruction-following model that handles JSON output reasonably well works, since every
decision is asked for as strict `{"key": ...}` JSON. `llama3.1:8b` is the default because you
already have it pulled; `qwen2.5:7b-instruct` and `mistral-nemo` are also good choices if you want
to try something else — pass `--model <tag>` or set `TT_SIM_MODEL`.

**The model tag must match exactly** what `ollama list` shows (e.g. `llama3.1:8b`, not
`llama3.1:70b` if only the 8b is pulled) — there's no fuzzy/prefix matching, so a typo'd tag fails
fast at startup with a pull attempt rather than silently running the wrong model.

Bigger models will make sharper decisions but each of the ~10-15 decisions per player-turn is a
separate model call, so speed matters more than raw smarts here. If a turn feels painfully slow,
drop to a smaller/faster model first before assuming something's broken.

## What "closely following the rules" means here

Every decision the model makes is validated against the actual legal options before it's applied —
roster size can't exceed Capacity, you can't recruit a researcher you can't afford, era/card/option
picks have to be in range, etc. An invalid answer gets sent back to the model with a note on what
was wrong, up to 3 attempts; if it still can't produce something legal, that one decision falls back
to the sim's "balanced" heuristic bot (and prints a `⚠` line so you can see it happened) rather than
crashing or stalling the game. Each Ollama call also has a 2-minute timeout so a hung model can't
stall an unattended multi-hour game indefinitely.

The model gets a real decision at every point the rules actually offer one: which team members to
send (Capacity-limited) vs. leave home to develop, whether to overclock (shown its actual hand, not
just a shortfall count), record vs. plunder an objective, publish vs. sell an en-route find *and* a
held artefact (the game's central Cash-XOR-Reputation moral fork), which machine module to
prioritise upgrading, whether to use the early-game instability safety valve, and whether to declare
(or hold back from) a Many Worlds attempt once Amp 7 is reached. Every prompt's system message also
states the score formula and the three end conditions, so the model is optimising toward an actual
stated goal rather than guessing at one.

**Known simplifications** (some shared with the balance sim — see the comment at the top of
`sim/game/engine.js`):
- **React / Negotiate aren't modelled.** Every turn goes straight **Jump → Process → Develop →
  Plan** — no cancelling a jump when a consequence invalidates it, no improvising a last-minute jump
  when nothing's staged, and no renting a rival's teammate (the game's only player-to-player cash
  transfer, and the seat of the endgame alliance per GDD §9). This means the sim always plays a
  closed economy.
- **No memory across decisions.** Every model call is a fresh, independent request — there's no
  continuity of "plan" between e.g. a buy decision this turn and a bench-a-specialist decision next
  turn. The model re-derives its situation from the prompt every time rather than remembering intent.
- **Explicit cash-out at a gate isn't a real choice.** A step auto-clears the moment you can afford
  it; voluntarily stopping when you *could* clear is a dominated play under the current (back-loaded)
  reward shape, so this wasn't worth building yet.
- **The Many Worlds alliance's hand-size scaling is untouched.** Hand size is `2×roster+2` computed
  over the WHOLE committed alliance roster (correctly Capacity-ignored per GDD §14), which can make
  the gauntlet close to automatic once anyone reaches Amp 7 — flagged as a design question, not
  fixed here (see the QA round-1 changelog).

## How it fits together

- `ollama-client.js` — thin fetch wrapper: checks/starts the Ollama server, pulls the model if
  missing (exact tag match only), asks for JSON completions with a timeout.
- `prompts.js` — turns game state into a short prompt per decision (one function per entry in the
  policy interface in `sim/game/policies.js`).
- `llm-policy.js` — implements that same policy interface, backed by the model: ask → validate →
  retry → fall back to `balanced`. Also does the turn-by-turn narration you see in the log.
- `play-llm-game.js` — the CLI driver. Builds `opts` (content/gating/economy flags) exactly like
  `sim/full-game.js` does, registers the `llm` policy onto `sim/game/policies.js`'s shared `ALL`
  object, and drives `sim/game/engine.js`'s `playGame()` directly via `opts.hooks` (onRoundStart /
  onTurnStart / onTurnEnd) for the turn-by-turn log — it no longer duplicates the round loop.

Getting this working required converting every function in the engine that reaches a policy
decision to `async`/`await`, all the way up to `playGame()`: `sim/game/engine.js`, `actions.js`,
`economy.js`, `manyworlds.js`, and `sim/lib/resolution.js`. For the balance sim's synchronous
heuristic bots this is a no-op (awaiting a plain value just resolves immediately) — verified with
`node sim/full-game.js --games 200 --players 4` (both un-gated and `--config sim/configs/adopted.json`)
and `node sim/era-card-content-based.js --trials 20` before and after, output shape unchanged.

## Performance expectations

A full 4-player game is roughly 16-30 rounds depending on config, and each player-turn can trigger a
dozen or more model calls. On an 8B local model on ordinary hardware, expect single-digit minutes
for a full 4-LLM game — it is not fast. Use `--policies llm,balanced,balanced,balanced` while
iterating on prompts/model choice, then switch to all-`llm` for the real playtest run.
