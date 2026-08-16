'use strict';
// Serializes game state into short, readable prompts for each of the 8 policy decision points
// (see sim/game/policies.js for the interface). Every prompt ends with an explicit JSON shape —
// Ollama's format:'json' only guarantees syntactically valid JSON, not these particular keys.

const SYSTEM = (playerId) =>
  `You are Player ${playerId + 1} in "Warped", a competitive time-travel expedition board game. ` +
  `You co-discovered time travel and are racing rival scientists for the greatest legacy. ` +
  `Play sharply and in your own self-interest, within the rules given. ` +
  `Respond with ONLY a single JSON object — no markdown, no commentary outside the JSON.`;

const fmtResearcher = (r, idx) =>
  `  [${idx}] ${r.name} (${r.profession}) pips I${r.pips.I}/C${r.pips.C}/G${r.pips.G}` +
  `${r.expBoxes ? ` +${r.expBoxes} exp` : ''}${r.cost != null ? ` cost $${r.cost}` : ''}`;

const fmtMachine = (m) => `Amp ${m.amp} · Cap ${m.cap} · Col ${m.col} · Stab ${m.stab}`;

const fmtCard = (c) => {
  const steps = c.steps
    .map((s, i) => {
      const bits = [`step ${i + 1}: need ${s.req}×${s.skill}`];
      if (s.profLock) bits.push(`requires a ${s.profLock} on the roster`);
      if (s.type === 'objective') {
        const kind = s.isArtefact ? (s.isDoomed ? 'doomed artefact (plunder only)' : 'artefact (record or plunder)') : 'record-only knowledge';
        bits.push(`OBJECTIVE — ${kind}, worth ${s.rep} rep if recorded`);
      }
      return '  ' + bits.join(', ');
    })
    .join('\n');
  const find = c.find ? `\n  en-route find: sell for $${c.find.cash}, or publish for +${c.find.publishRep} rep` : '';
  return `${c.name} [era: ${c.era}]\n${steps}${find}`;
};

const fmtSelf = (p) =>
  `You: cash $${p.cash}, reputation ${p.rep}, disrepute ${p.disrepute}, instability ${p.instability}/${p.machine.stab}, ` +
  `machine [${fmtMachine(p.machine)}], deepest era reached ${p.deepestEra}, ` +
  `unpublished data ${p.data.length}, unpublished artefacts ${p.artefacts.length}\n` +
  `Team:\n${p.team.length ? p.team.map(fmtResearcher).join('\n') : '  (no team)'}`;

const fmtOpponents = (game, self) =>
  game.players
    .filter((p) => p !== self)
    .map(
      (p) =>
        `  Player ${p.id + 1}${p.retired ? ' (retired)' : ''}: cash $${p.cash}, rep ${p.rep}, disrepute ${p.disrepute}, machine [${fmtMachine(p.machine)}]`
    )
    .join('\n');

const header = (player, game) =>
  `Round ${game.round}. Timeline integrity ${game.integrity}/${game.integrityMax}.\n` +
  `${fmtSelf(player)}\n` +
  `Opponents:\n${fmtOpponents(game, player)}`;

function shouldRetire(player, game) {
  return {
    system: SYSTEM(player.id),
    prompt:
      `${header(player, game)}\n\n` +
      `You may retire instead of taking a turn — this ends your career now and locks in your current score. ` +
      `Retiring is usually only wise if you have no realistic path to improve further this game. ` +
      `Decide whether to retire this turn.\n\n` +
      `Respond as JSON: {"retire": true|false, "reason": "one short sentence"}`,
  };
}

function selectRoster(player, card, game) {
  return {
    system: SYSTEM(player.id),
    prompt:
      `${header(player, game)}\n\n` +
      `Your staged expedition card:\n${fmtCard(card)}\n\n` +
      `Choose which team members to SEND on this expedition (by index). You may send up to ${player.machine.cap} ` +
      `(your machine's Capacity). Researchers you don't send stay home this turn to do Develop actions instead. ` +
      `You may send zero (skip the jump) if you'd rather everyone develop.\n\n` +
      `Respond as JSON: {"send": [indices...], "reason": "one short sentence"}`,
  };
}

function shouldOverclock(player, shortfall, stepIndex, card, game) {
  const step = card.steps[stepIndex];
  return {
    system: SYSTEM(player.id),
    prompt:
      `${header(player, game)}\n\n` +
      `Expedition in progress: ${card.name} [${card.era}], step ${stepIndex + 1} of ${card.steps.length} ` +
      `(${step.type === 'objective' ? 'the OBJECTIVE' : 'an en-route step'}).\n` +
      `You are ${shortfall} card(s) short of the ${step.req}×${step.skill} needed to clear this step. ` +
      `You may OVERCLOCK: gamble an extra draw. Each overclock adds +1 instability (permanent for the trip) ` +
      `and dilutes your deck with a Trace card. Your current instability is ${player.instability}, and your ` +
      `Stabiliser shuts the machine down at ${player.machine.stab} — a shutdown ends the expedition, costs an ` +
      `extra consequence, and Timeline Integrity −1. If you decline, you cash out with whatever you've already cleared.\n\n` +
      `Respond as JSON: {"overclock": true|false, "reason": "one short sentence"}`,
  };
}

function recordOrPlunder(player, card, game) {
  const o = card.objective;
  return {
    system: SYSTEM(player.id),
    prompt:
      `${header(player, game)}\n\n` +
      `You cleared the objective on ${card.name} [${card.era}]: ${o.isDoomed ? 'a DOOMED artefact (already lost to history — no scar for taking it)' : `an artefact worth ${o.rep} rep clean, or plunder for $${o.sellCash} cash + ${o.disrepute} disrepute (and −${o.scar} Timeline Integrity, since it's not doomed)`}.\n` +
      `RECORD it cleanly (copy/measure — adds to your unpublished data, safe), or PLUNDER it (takes the physical ` +
      `artefact — adds to your unpublished artefacts, sellable later for cash but morally and historically costly).\n\n` +
      `Respond as JSON: {"choice": "record"|"plunder", "reason": "one short sentence"}`,
  };
}

function publishFind(player, card, game) {
  const f = card.find;
  return {
    system: SYSTEM(player.id),
    prompt:
      `${header(player, game)}\n\n` +
      `You picked up an en-route find on ${card.name} [${card.era}]. PUBLISH it now for +${f.publishRep} reputation ` +
      `(a minor paper, clean), or SELL it for $${f.cash} cash instead.\n\n` +
      `Respond as JSON: {"choice": "publish"|"sell", "reason": "one short sentence"}`,
  };
}

function pickEraIdx(player, maxEraIdx, game) {
  const ERAS = ['Recent', 'Modern', 'Early Modern', 'Medieval', 'Ancient', 'Prehistoric', 'Many Worlds'];
  return {
    system: SYSTEM(player.id),
    prompt:
      `${header(player, game)}\n\n` +
      `Plan phase: choose which era tier to draw your next destination card from. Your Amplifier lets you reach ` +
      `as deep as tier ${maxEraIdx} (${ERAS[maxEraIdx]}). Deeper eras are harder (more skill required) but pay ` +
      `more reputation/cash and are worth more toward the deepest-era track. Tier 0 is Recent (easiest).\n\n` +
      `Respond as JSON: {"eraIdx": 0-${maxEraIdx}, "reason": "one short sentence"}`,
  };
}

// Note: policies.js's pickCard is called as (player, drawn) — no `game` reference, so this prompt
// is self-contained (no opponents/round context).
function pickCard(player, drawn) {
  const list = drawn.map((c, i) => `Option ${i}:\n${fmtCard(c)}`).join('\n\n');
  return {
    system: SYSTEM(player.id),
    prompt:
      `${fmtSelf(player)}\n\n` +
      `Plan phase: you drew ${drawn.length} destination card option(s). Choose ONE to stage as your next jump.\n\n` +
      `${list}\n\n` +
      `Respond as JSON: {"option": 0-${drawn.length - 1}, "reason": "one short sentence"}`,
  };
}

// Note: the economy calls buyResearcher as (player, market, cfg) — no `game` reference is
// threaded through, so this prompt is self-contained (no opponents/round context).
function buyResearcher(player, market) {
  const list = market.map((r, i) => fmtResearcher(r, i)).join('\n');
  return {
    system: SYSTEM(player.id),
    prompt:
      `${fmtSelf(player)}\n\n` +
      `Market (available to recruit, if you can afford it):\n${list || '  (empty)'}\n\n` +
      `Recruit one researcher this turn if it's worth it, or skip (null). Bigger teams mean more roster options ` +
      `and more Develop actions, but recruits cost cash you could spend on machine upgrades.\n\n` +
      `Respond as JSON: {"buy": index-or-null, "reason": "one short sentence"}`,
  };
}

module.exports = {
  shouldRetire,
  selectRoster,
  shouldOverclock,
  recordOrPlunder,
  publishFind,
  pickEraIdx,
  pickCard,
  buyResearcher,
};
