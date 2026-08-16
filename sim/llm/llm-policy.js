'use strict';
// A policy object (same interface as sim/game/policies.js) backed by an Ollama model instead of a
// fixed heuristic. Every method is now legal to be `async` because sim/game/engine.js and friends
// were converted to await policy decisions — a no-op tick for the sync heuristic bots, but what
// lets this policy make a real network round-trip to Ollama at each decision point.
//
// Every decision: build a prompt, ask the model, validate the answer against the actual legal
// options for THIS decision, retry with a correction on an invalid answer, and fall back to the
// "balanced" heuristic bot if the model still can't produce something legal after a few tries —
// so a confused or slow model degrades gracefully instead of stalling the game.
const { generateJSON } = require('./ollama-client');
const prompts = require('./prompts');
const { balanced } = require('../game/policies');

const MAX_ATTEMPTS = 3;

function makeLlmPolicy({ model, log = console.log, temperature = 0.3 }) {
  async function ask(built, validate, label) {
    let { system, prompt } = built;
    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      try {
        const out = await generateJSON({ model, system, prompt, temperature });
        const err = validate(out);
        if (!err) return out;
        prompt = `${built.prompt}\n\nYour previous answer (${JSON.stringify(out)}) was invalid: ${err}. Answer again, valid JSON only, no extra text.`;
      } catch (e) {
        prompt = `${built.prompt}\n\n(Your previous attempt failed to parse as JSON: ${e.message}. Answer again, valid JSON only, no extra text.)`;
      }
    }
    log(`  ⚠ [${label}] model gave no valid answer after ${MAX_ATTEMPTS} attempts — falling back to the "balanced" heuristic`);
    return null;
  }

  const reasonTag = (out) => (out && out.reason ? ` — "${out.reason}"` : '');

  return {
    name: 'llm',

    async shouldRetire(player, game) {
      const out = await ask(
        prompts.shouldRetire(player, game),
        (o) => (typeof o.retire === 'boolean' ? null : 'retire must be true or false'),
        'shouldRetire'
      );
      if (out === null) return balanced.shouldRetire(player, game);
      if (out.retire) log(`  P${player.id + 1} retires${reasonTag(out)}`);
      return out.retire;
    },

    async shouldVent(player, game) {
      const out = await ask(
        prompts.shouldVent(player, game),
        (o) => (typeof o.vent === 'boolean' ? null : 'vent must be true or false'),
        'shouldVent'
      );
      const decision = out === null ? balanced.shouldVent(player, game) : out.vent;
      if (decision) log(`  P${player.id + 1} vents all instability instead of jumping this turn${reasonTag(out)}`);
      return decision;
    },

    async declareManyWorlds(player, game) {
      const out = await ask(
        prompts.declareManyWorlds(player, game),
        (o) => (typeof o.declare === 'boolean' ? null : 'declare must be true or false'),
        'declareManyWorlds'
      );
      const decision = out === null ? balanced.declareManyWorlds(player, game) : out.declare;
      log(`  P${player.id + 1} ${decision ? 'DECLARES a Many Worlds attempt' : 'holds back from declaring Many Worlds'}${reasonTag(out)}`);
      return decision;
    },

    async selectRoster(player, card, game) {
      const cap = player.machine.cap;
      const out = await ask(
        prompts.selectRoster(player, card, game),
        (o) => {
          if (!Array.isArray(o.send)) return 'send must be an array of indices';
          if (o.send.length > cap) return `send has ${o.send.length} entries but Capacity is ${cap}`;
          if (new Set(o.send).size !== o.send.length) return 'send has duplicate indices';
          if (o.send.some((i) => !Number.isInteger(i) || i < 0 || i >= player.team.length))
            return `each index must be an integer 0-${player.team.length - 1}`;
          return null;
        },
        'selectRoster'
      );
      if (out === null) return balanced.selectRoster(player, card, game);
      const roster = out.send.map((i) => player.team[i]);
      log(`  P${player.id + 1} jumps to ${card.name} [${card.era}] with ${roster.length ? roster.map((r) => r.name).join(', ') : 'nobody (skipping)'}${reasonTag(out)}`);
      return roster;
    },

    async shouldOverclock(player, shortfall, si, card, game, handInfo) {
      const out = await ask(
        prompts.shouldOverclock(player, shortfall, si, card, game, handInfo),
        (o) => (typeof o.overclock === 'boolean' ? null : 'overclock must be true or false'),
        'shouldOverclock'
      );
      const decision = out === null ? balanced.shouldOverclock(player, shortfall, si, card) : out.overclock;
      log(`  P${player.id + 1} ${decision ? 'OVERCLOCKS' : 'holds'} on step ${si + 1} of ${card.name}${reasonTag(out)}`);
      return decision;
    },

    async recordOrPlunder(player, card, game) {
      const out = await ask(
        prompts.recordOrPlunder(player, card, game),
        (o) => (o.choice === 'record' || o.choice === 'plunder' ? null : 'choice must be "record" or "plunder"'),
        'recordOrPlunder'
      );
      const choice = out === null ? balanced.recordOrPlunder(player, card, game) : out.choice;
      log(`  P${player.id + 1} chooses to ${choice.toUpperCase()} the ${card.name} objective${reasonTag(out)}`);
      return choice;
    },

    async publishFind(player, card, game) {
      const out = await ask(
        prompts.publishFind(player, card, game),
        (o) => (o.choice === 'publish' || o.choice === 'sell' ? null : 'choice must be "publish" or "sell"'),
        'publishFind'
      );
      const choice = out === null ? (balanced.publishFind(player) ? 'publish' : 'sell') : out.choice;
      log(`  P${player.id + 1} ${choice === 'publish' ? 'publishes' : 'sells'} the en-route find${reasonTag(out)}`);
      return choice === 'publish';
    },

    async sellOrPublishArtefact(player, artefact, game) {
      const out = await ask(
        prompts.sellOrPublishArtefact(player, artefact, game),
        (o) => (o.choice === 'sell' || o.choice === 'publish' ? null : 'choice must be "sell" or "publish"'),
        'sellOrPublishArtefact'
      );
      const choice = out === null ? balanced.sellOrPublishArtefact(player, artefact, game) : out.choice;
      log(`  P${player.id + 1} ${choice === 'sell' ? 'SELLS' : 'PUBLISHES'} the artefact "${artefact.name}"${reasonTag(out)}`);
      return choice;
    },

    async chooseUpgrade(player, researcher, order, game) {
      const out = await ask(
        prompts.chooseUpgrade(player, researcher, order, game),
        (o) => (order.includes(o.upgrade) ? null : `upgrade must be one of ${order.join(', ')}`),
        'chooseUpgrade'
      );
      const choice = out === null ? balanced.chooseUpgrade(player, researcher, order) : out.upgrade;
      log(`  P${player.id + 1}'s ${researcher.name} prioritises the "${choice}" upgrade${reasonTag(out)}`);
      return choice;
    },

    async pickEraIdx(player, maxEraIdx, game) {
      const out = await ask(
        prompts.pickEraIdx(player, maxEraIdx, game),
        (o) => (Number.isInteger(o.eraIdx) && o.eraIdx >= 0 && o.eraIdx <= maxEraIdx ? null : `eraIdx must be an integer 0-${maxEraIdx}`),
        'pickEraIdx'
      );
      return out === null ? balanced.pickEraIdx(player, maxEraIdx, game) : out.eraIdx;
    },

    async pickCard(player, drawn, game) {
      const out = await ask(
        prompts.pickCard(player, drawn, game),
        (o) => (Number.isInteger(o.option) && o.option >= 0 && o.option < drawn.length ? null : `option must be an integer 0-${drawn.length - 1}`),
        'pickCard'
      );
      const card = out === null ? balanced.pickCard(player, drawn) : drawn[out.option];
      log(`  P${player.id + 1} stages ${card.name} [${card.era}] for next turn${reasonTag(out)}`);
      return card;
    },

    async buyResearcher(player, market) {
      if (!market.length) return null;
      const out = await ask(
        prompts.buyResearcher(player, market),
        (o) => {
          if (o.buy === null) return null;
          if (!Number.isInteger(o.buy) || o.buy < 0 || o.buy >= market.length) return `buy must be null or an integer 0-${market.length - 1}`;
          if (market[o.buy].cost > player.cash) return `you only have $${player.cash}, but ${market[o.buy].name} costs $${market[o.buy].cost} — pick an affordable index or null`;
          return null;
        },
        'buyResearcher'
      );
      const pick = out === null ? balanced.buyResearcher(player, market) : out.buy === null ? null : market[out.buy];
      if (pick) log(`  P${player.id + 1} recruits ${pick.name} (${pick.profession}) for $${pick.cost}${reasonTag(out)}`);
      return pick;
    },
  };
}

module.exports = { makeLlmPolicy };
