'use strict';
// Serializes game state into short, readable prompts for each policy decision point (see
// sim/game/policies.js for the interface). Every prompt ends with an explicit JSON shape — Ollama's
// format:'json' only guarantees syntactically valid JSON, not these particular keys.

const ERAS = ['Recent', 'Modern', 'Early Modern', 'Medieval', 'Ancient', 'Prehistoric', 'Many Worlds'];

const SYSTEM = (playerId) =>
  `You are Player ${playerId + 1} in "Warped", a competitive time-travel expedition board game. ` +
  `You co-discovered time travel and are racing rival scientists for the greatest legacy. ` +
  `Play sharply and in your own self-interest, within the rules given. ` +
  `HOW YOU WIN: at game end your score = Reputation − Disrepute + your highest machine module level ` +
  `+ 1 point per unpublished data/artefact you're still holding. The game ends when someone completes ` +
  `a Many Worlds expedition (triumph, the best ending), when everyone retires (quiet legacy), or when ` +
  `Timeline Integrity is drained to 0 and the "Unravelling" plays out (collapse — everyone still scores, ` +
  `but the table let the timeline fray). Reaching machine Amplifier level 7 opens the door to a Many ` +
  `Worlds attempt. Respond with ONLY a single JSON object — no markdown, no commentary outside the JSON.`;

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
        if (!s.isArtefact) {
          bits.push(`OBJECTIVE — record-only knowledge, +${s.rep} rep (added to your unpublished data, a Historian publishes it later)`);
        } else if (s.isDoomed) {
          bits.push(`OBJECTIVE — a DOOMED artefact: grabbed automatically if you clear this step (no choice, no scar) — later worth +${s.rep} rep published or $${s.sellCash} sold (+${s.disrepute} disrepute)`);
        } else {
          bits.push(`OBJECTIVE — an artefact: RECORD it (clean, +${s.rep} rep added to unpublished data) or PLUNDER it (−${s.scar} Timeline Integrity now, added to unpublished artefacts — later worth +${s.rep} rep published or $${s.sellCash} sold + ${s.disrepute} disrepute)`);
        }
      }
      return '  ' + bits.join(', ');
    })
    .join('\n');
  const find = c.find ? `\n  en-route find: sell for $${c.find.cash} now, or publish for +${c.find.publishRep} rep now` : '';
  return `${c.name} [era: ${c.era}]\n${steps}${find}`;
};

const fmtSelf = (p) =>
  `You: cash $${p.cash}, reputation ${p.rep}, disrepute ${p.disrepute}, instability ${p.instability}/${p.machine.stab}, ` +
  `machine [${fmtMachine(p.machine)}], deepest era reached: ${ERAS[p.deepestEra]}, ` +
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

function shouldVent(player, game) {
  return {
    system: SYSTEM(player.id),
    prompt:
      `${header(player, game)}\n\n` +
      `You have no Engineer and your Stabiliser is still at its starting level, so you're eligible for the ` +
      `early-game safety valve: spend this turn's jump on venting instead — clear ALL ${player.instability} ` +
      `instability for free. Your team still gets its normal Develop actions at home this turn either way ` +
      `(venting only replaces the jump, not Develop). If you decline, you'll jump/develop normally this turn.\n\n` +
      `Respond as JSON: {"vent": true|false, "reason": "one short sentence"}`,
  };
}

function declareManyWorlds(player, game) {
  return {
    system: SYSTEM(player.id),
    prompt:
      `${header(player, game)}\n\n` +
      `Your Amplifier just reached 7 — the door to Many Worlds is open. You may DECLARE a Many Worlds ` +
      `attempt now: every player commits their whole team to a full-table alliance gauntlet (5 tough steps), ` +
      `using YOUR current instability (${player.instability}/${player.machine.stab}) as the ` +
      `base risk for the whole attempt. Success ends the game in triumph (the best ending) and pays every ` +
      `contributing player reputation by how many researchers they committed. Failure costs Timeline ` +
      `Integrity equal to roughly 2×(your instability+1) — the higher your instability going in, the worse ` +
      `a failure hits everyone. Or you may HOLD BACK this turn — develop/vent/rebuild normally and ` +
      `reconsider declaring next turn with a calmer machine.\n\n` +
      `Respond as JSON: {"declare": true|false, "reason": "one short sentence"}`,
  };
}

// The Amplifier ladder's specialist gate (GDD §8) — the single most consequential roster constraint
// past the early game: it isn't just "own one", the acting researcher has to BE it, and past Amp 4
// you need an Engineer AND a Physicist home the SAME turn. Shared text so selectRoster/chooseUpgrade
// never drift on how they describe it.
const ampGateNote = (m) =>
  m.amp <= 1 ? 'Amplifier upgrades so far: free, no specialist needed.'
  : m.amp <= 3 ? 'Amplifier upgrades from here need an Engineer to be the one HOME doing the upgrade (not just owned — if your Engineer is off on an expedition, nobody else can push it).'
  : `Amplifier upgrades from here (Amp ${m.amp}→${m.amp + 1}) need an Engineer AND a Physicist BOTH home the same turn — if either is sent on an expedition, the upgrade can't happen that turn no matter who else is home.`;

function selectRoster(player, card, game) {
  return {
    system: SYSTEM(player.id),
    prompt:
      `${header(player, game)}\n\n` +
      `Your staged expedition card:\n${fmtCard(card)}\n\n` +
      `Choose which team members to SEND on this expedition (by index). You may send up to ${player.machine.cap} ` +
      `(your machine's Capacity). This is the central trade-off of the game: a researcher is EITHER in the ` +
      `field this turn OR does one home Develop action (write/publish a paper, upgrade a machine module, or ` +
      `clear instability) — never both. Sending everyone means nobody develops this turn: no module upgrades, ` +
      `no papers published, no instability cleared. ${ampGateNote(player.machine)} Your hand for the expedition ` +
      `is built from the sent roster's skill pips (Insight/Craft/Grit) plus a small base, sized 2×roster+2 cards ` +
      `— a bigger roster draws a bigger, more reliable hand but leaves fewer researchers free to develop. You ` +
      `may send zero (skip the jump entirely) if you'd rather everyone develop this turn instead.\n\n` +
      `Respond as JSON: {"send": [indices...], "reason": "one short sentence"}`,
  };
}

const tally = (cards) => {
  const counts = { I: 0, C: 0, G: 0, T: 0 };
  for (const c of cards) counts[c] = (counts[c] || 0) + 1;
  return `I:${counts.I} C:${counts.C} G:${counts.G} Trace:${counts.T}`;
};

function shouldOverclock(player, shortfall, stepIndex, card, game, handInfo) {
  const step = card.steps[stepIndex];
  const hand = handInfo ? `Your current hand: ${tally(handInfo.hand)} (${handInfo.hand.length} cards). ` +
    `Draw deck remaining: ${handInfo.deckRemaining}, discard: ${handInfo.discardRemaining}. ` : '';
  return {
    system: SYSTEM(player.id),
    prompt:
      `${header(player, game)}\n\n` +
      `Expedition in progress: ${card.name} [${card.era}], step ${stepIndex + 1} of ${card.steps.length} ` +
      `(${step.type === 'objective' ? 'the OBJECTIVE' : 'an en-route step'}).\n` +
      `You are ${shortfall} card(s) short of the ${step.req}×${step.skill} needed to clear this step. ${hand}\n` +
      `You may OVERCLOCK: gamble one extra draw. Each overclock adds +1 instability that PERSISTS BEYOND ` +
      `THIS TRIP — it pollutes every future expedition's deck with a Trace card until a home Engineer spends ` +
      `a Develop action to clear it. The extra draw itself can also come up a Trace (wasted). Your current ` +
      `instability is ${player.instability}, and your Stabiliser shuts the machine down at ${player.machine.stab} ` +
      `— a shutdown ends the expedition immediately, costs Timeline Integrity −1, AND draws an extra ` +
      `consequence card on top of the one every overclocked turn already draws (so a shutdown draws two ` +
      `consequences total). If you decline, you cash out with whatever you've already cleared.\n\n` +
      `Respond as JSON: {"overclock": true|false, "reason": "one short sentence"}`,
  };
}

function recordOrPlunder(player, card, game) {
  const o = card.objective;
  return {
    system: SYSTEM(player.id),
    prompt:
      `${header(player, game)}\n\n` +
      `You cleared the objective on ${card.name} [${card.era}]. Neither option pays out immediately — both ` +
      `are banked for a Historian to Publish later at home:\n` +
      `  RECORD it (clean copy/measure): added to your unpublished DATA. A Historian publishing it later pays +${o.rep} rep. No integrity cost.\n` +
      `  PLUNDER it (take the physical artefact): −${o.scar} Timeline Integrity right now (a scar on history), added to your unpublished ARTEFACTS. ` +
      `A Historian can later either publish it for the SAME +${o.rep} rep, or sell it for $${o.sellCash} cash + ${o.disrepute} disrepute instead.\n` +
      `Plundering only pays off over Recording if you (or your Historian, later) intend to sell it for cash — ` +
      `publishing a plundered artefact scores no more than just recording it would have, for a real Integrity cost.\n\n` +
      `Respond as JSON: {"choice": "record"|"plunder", "reason": "one short sentence"}`,
  };
}

function publishFind(player, card, game) {
  const f = card.find;
  return {
    system: SYSTEM(player.id),
    prompt:
      `${header(player, game)}\n\n` +
      `You picked up an en-route find on ${card.name} [${card.era}]. This one pays out immediately (unlike ` +
      `the objective): PUBLISH it now for +${f.publishRep} reputation (a minor paper, clean), or SELL it for ` +
      `$${f.cash} cash instead.\n\n` +
      `Respond as JSON: {"choice": "publish"|"sell", "reason": "one short sentence"}`,
  };
}

function sellOrPublishArtefact(player, artefact, game) {
  return {
    system: SYSTEM(player.id),
    prompt:
      `${header(player, game)}\n\n` +
      `Your Historian at home can act on your best held artefact ("${artefact.name}"): PUBLISH it for +${artefact.rep} ` +
      `reputation (clean, no disrepute), or SELL it for $${artefact.sellCash} cash + ${artefact.disrepute} disrepute ` +
      `(Cash XOR Reputation — the game's central moral fork). Disrepute nets against your final Reputation at ` +
      `game end, so selling is visible on the scoresheet, not free.\n\n` +
      `Respond as JSON: {"choice": "sell"|"publish", "reason": "one short sentence"}`,
  };
}

function chooseUpgrade(player, researcher, order, game) {
  const { cfg } = game, m = player.machine;
  const stabIdx = (m.stab - cfg.startStab) / 2;
  const describe = {
    cap: () => `cap (Capacitor, roster/hand size): level ${m.cap} → ${m.cap + 1}, costs $${cfg.capCosts[m.cap - 1] ?? '—'}`,
    stab: () => `stab (Stabiliser, max instability before shutdown): ${m.stab} → ${m.stab + 2}, costs $${cfg.stabCosts[stabIdx] ?? '—'}`,
    amp: () => `amp (Amplifier, max era reachable — opens Many Worlds at 7): ${m.amp} → ${m.amp + 1}, costs $${cfg.ampCosts[m.amp - 1] ?? '—'}`,
    col: () => `col (Collimator, era cards drawn at Plan): level ${m.col} → ${m.col + 1}, costs $${cfg.colCosts[m.col - 1] ?? '—'}`,
  };
  return {
    system: SYSTEM(player.id),
    prompt:
      `${header(player, game)}\n\n` +
      `${researcher.name} (${researcher.profession}) is home this turn and can attempt ONE machine upgrade. ` +
      `${ampGateNote(m)} Options, in order of what a ${researcher.profession} can normally reach:\n` +
      order.map((k) => `  ${describe[k]()}`).join('\n') + '\n' +
      `Your cash: $${player.cash}. If your pick isn't currently affordable or legal, the turn automatically ` +
      `falls back to the next option in the list above rather than being wasted, so pick your real priority.\n\n` +
      `Respond as JSON: {"upgrade": "${order.join('"|"')}", "reason": "one short sentence"}`,
  };
}

function pickEraIdx(player, maxEraIdx, game) {
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
  shouldVent,
  declareManyWorlds,
  selectRoster,
  shouldOverclock,
  recordOrPlunder,
  publishFind,
  sellOrPublishArtefact,
  chooseUpgrade,
  pickEraIdx,
  pickCard,
  buyResearcher,
};
