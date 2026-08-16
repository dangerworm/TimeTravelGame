# LLM playtest — Warped

Plays one full game of Warped end-to-end, on the real `decks/` content, with every player's
decisions made by a **local Ollama model** instead of tokens-burning Claude and instead of the
balance sim's fixed heuristic bots. It reuses the exact same validated rules engine the balance sim
(`sim/full-game.js`) uses — `sim/game/*` + `sim/lib/*` — so this is not a re-implementation of the
rules, it's the same engine with an LLM sitting in the "policy" seat at each decision point.

## Run it

```bash
node sim/llm/play-llm-game.js
```

That starts `ollama serve` if it isn't already running, pulls the model if you don't have it, then
plays a 4-player game to completion, printing a turn-by-turn log and a final scoreboard.

### Useful flags

| Flag            | Default                          | What it does                                                             |
| ---------------- | --------------------------------- | -------------------------------------------------------------------------- |
| `--model`         | `llama3.1:8b`                     | Any Ollama model tag. See "Picking a model" below.                        |
| `--players`       | `4`                                | Table size.                                                                |
| `--seed`          | current time                      | Fix it to replay the exact same deck shuffle/market/RNG.                  |
| `--temperature`    | `0.3`                              | Lower = more consistent/legal answers; higher = more varied play.         |
| `--policies`       | `llm,llm,llm,llm`                 | Comma list, e.g. `llm,balanced,balanced,balanced` — mix in fast heuristic bots for a quick debug run without waiting on 4 model calls every decision. |
| `--config`         | `sim/best-config.json`            | Point at an alternate economy-tuning config (see `sim/configs/`).         |

Example: a fast sanity run with one model seat and 3 heuristics —

```bash
node sim/llm/play-llm-game.js --policies llm,balanced,balanced,balanced --seed 7
```

## Picking a model

Any instruction-following model that handles JSON output reasonably well works, since every
decision is asked for as strict `{"key": ...}` JSON. `llama3.1:8b` is the default because you
already have it pulled; `qwen2.5:7b-instruct` and `mistral-nemo` are also good choices if you want
to try something else — pass `--model <tag>` or set `TT_SIM_MODEL`.

Bigger models will make sharper decisions but each of the ~10-15 decisions per player-turn is a
separate model call, so speed matters more than raw smarts here. If a turn feels painfully slow,
drop to a smaller/faster model first before assuming something's broken.

## What "closely following the rules" means here

Every decision the model makes is validated against the actual legal options before it's applied —
roster size can't exceed Capacity, you can't recruit a researcher you can't afford, era/card/option
picks have to be in range, etc. An invalid answer gets sent back to the model with a note on what
was wrong, up to 3 attempts; if it still can't produce something legal, that one decision falls back
to the sim's "balanced" heuristic bot (and prints a `⚠` line so you can see it happened) rather than
crashing or stalling the game.

**Known simplification** (shared with the balance sim — see the comment at the top of
`sim/game/engine.js`): the **React** and **Negotiate** turn phases (cancelling a jump when a
consequence invalidates it, renting a rival's teammate) aren't modelled. Every turn goes straight
**Jump → Process → Develop → Plan**. This matches how the game has been balance-tested so far; it's
a real fidelity gap against the full GDD turn order, not a bug.

## How it fits together

- `ollama-client.js` — thin fetch wrapper: checks/starts the Ollama server, pulls the model if
  missing, asks for JSON completions.
- `prompts.js` — turns game state into a short prompt per decision (one function per entry in the
  policy interface in `sim/game/policies.js`).
- `llm-policy.js` — implements that same policy interface, backed by the model: ask → validate →
  retry → fall back to `balanced`. Also does the turn-by-turn narration you see in the log.
- `play-llm-game.js` — the CLI driver. Sets up a game with `sim/game/*` directly (not through
  `sim/game/engine.js`'s `playGame()`, so it can snapshot/diff player state each turn for the log)
  and runs it to an end condition (triumph / collapse / quiet-legacy / timeout / 40-round safety cap).

Getting this working required one structural change to the shared engine: `sim/game/engine.js`,
`sim/game/actions.js`, `sim/game/economy.js`, `sim/game/manyworlds.js`, and
`sim/lib/resolution.js` had every function that reaches a policy decision converted to `async`/
`await`, all the way up to `playGame()`. For the balance sim's synchronous heuristic bots this is a
no-op (awaiting a plain value just resolves immediately) — verified with
`node sim/full-game.js --games 5 --players 4` and `node sim/era-card-content-based.js --trials 20`
before and after, output unchanged. It's what lets this folder's policy make a real network
round-trip to Ollama at each decision point without those calls landing as unresolved Promises.

## Performance expectations

A full 4-player game is roughly 16-17 rounds at 4 players once the economy is tuned (it currently
snowballs into quiet-legacy most games — see `tasks.md`), and each player-turn can trigger a dozen
or more model calls (buy decision, era pick × Collimator, card pick, roster pick, one overclock call
per gambled draw, publish/sell, record/plunder). On an 8B local model on ordinary hardware, expect
single-digit minutes for a full 4-LLM game — it is not fast. Use `--policies llm,balanced,balanced,balanced`
while iterating on prompts/model choice, then switch to all-`llm` for the real playtest run.
