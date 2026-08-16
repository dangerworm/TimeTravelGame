"use strict";
// ── Warped — full-game simulator ──────────────────────────────────────────────
// Plays whole games of Warped on the REAL decks/ cards: team-building, the machine economy, era
// pacing, instability, consequences, the Many Worlds alliance, collapse and retirement — so the
// difficulty curve is EMERGENT, not assumed. Reuses the shared expedition kernel (lib/resolution.js).
//
// Usage:
//   node sim/full-game.js                                   # best-config.json, current reqs
//   node sim/full-game.js --config sim/configs/foo.json     # a saved test config
//   node sim/full-game.js --reqs proposed --gates           # CLI flags override the config file
//   node sim/full-game.js --games 400 --players 4
//
// A test config (.json) carries the economy overrides + run options so every experiment is
// reproducible: { "label": "...", "overrides": { startCash, ... }, "options": { gateTiers, reqs,
// findMult } }. Defaults come from best-config.json; CLI flags win over the file.
const fs = require("fs");
const path = require("path");
const { makePRNG } = require("./lib/resolution");
const { playGame } = require("./game/engine");
const { getPlayerCombinations } = require("./lib/combination-builder");
const { PROPOSED } = require("./lib/patterns");

const args = process.argv.slice(2);
const has = (f) => args.includes(f);
const argVal = (f, d) => {
  const i = args.indexOf(f);
  return i >= 0 ? args[i + 1] : d;
};
const games = parseInt(argVal("--games", "2000"), 10);
const playerCounts = argVal("--players", "2,3,4,5").split(",").map(Number);

// Config: best-config.json is the base; a --config file deep-overrides it and supplies run options.
const BEST = JSON.parse(fs.readFileSync(path.join(__dirname, "best-config.json"), "utf8")).config;
const configPath = argVal("--config", null);
const fileCfg = configPath ? JSON.parse(fs.readFileSync(configPath, "utf8")) : {};
const cfg = { ...BEST, ...(fileCfg.config || fileCfg.overrides || {}) };
const fopts = fileCfg.options || {};
const reqs = argVal("--reqs", fopts.reqs || "current");
const findMult = parseFloat(argVal("--findmult", String(fopts.findMult ?? 1)));
const gateTiers = has("--gates") ? true : has("--nogates") ? false : !!fopts.gateTiers;
const patternMap = reqs === "proposed" ? PROPOSED : null;
const opts = { patternMap, findMult, gateTiers };
const configLabel = fileCfg.label || (configPath ? path.basename(configPath) : "best-config");

async function runCombo(n, combo) {
  const out = [];
  for (let g = 0; g < games; g++) {
    const rng = makePRNG(g * 7919 + n * 104729 + 1);
    out.push(await playGame(n, combo, cfg, rng, opts));
  }
  return out;
}

function metrics(results, n) {
  const N = results.length;
  const rate = (pred) => results.filter(pred).length / N;
  const avg = (fn) => results.reduce((s, r) => s + fn(r), 0) / N;
  const sumP = (r, fn) => r.players.reduce((s, p) => s + fn(p), 0);
  return {
    triumph: rate((r) => r.endReason === "triumph"),
    collapse: rate((r) => r.endReason === "collapse"),
    quiet: rate((r) => r.endReason === "quietlegacy"),
    timeout: rate((r) => r.endReason === "timeout"),
    rounds: avg((r) => r.round),
    overclocks: avg((r) => sumP(r, (p) => p.overclocks)),
    overclocksByEra: Array.from({ length: 7 }, (_, e) =>
      avg((r) => sumP(r, (p) => p.overclocksByEra[e]))
    ),
    expeditionsByEra: Array.from({ length: 7 }, (_, e) =>
      avg((r) => sumP(r, (p) => p.expeditionsByEra[e]))
    ),
    shutdowns: avg((r) => sumP(r, (p) => p.shutdowns)),
    papers: avg((r) => sumP(r, (p) => p.papersWritten)),
    deepest: avg((r) => Math.max(...r.players.map((p) => p.deepestEra))),
    spread: avg((r) => {
      const s = r.players.map((p) => p.score);
      return Math.max(...s) - Math.min(...s);
    }),
    wallClock: Math.round(avg((r) => r.round) * n * 3),
  };
}

const pct = (x) => (x * 100).toFixed(0).padStart(3) + "%";
const f1 = (x) => x.toFixed(1).padStart(5);
const comboLabel = (combo) => {
  const c = { greedy: 0, cautious: 0, balanced: 0 };
  for (const a of combo) c[a]++;
  return `G${c.greedy} C${c.cautious} B${c.balanced}`;
};

// Unweighted mean of the per-composition rows (each table composition counts once).
function meanRows(rows) {
  const m = {};
  const keys = [
    "triumph",
    "collapse",
    "quiet",
    "timeout",
    "rounds",
    "overclocks",
    "shutdowns",
    "papers",
    "deepest",
    "spread",
    "wallClock",
  ];
  for (const k of keys) m[k] = rows.reduce((s, r) => s + r[k], 0) / rows.length;
  for (const arrKey of ["overclocksByEra", "expeditionsByEra"])
    m[arrKey] = Array.from(
      { length: 7 },
      (_, e) => rows.reduce((s, r) => s + r[arrKey][e], 0) / rows.length
    );
  return m;
}

const ERA_ABBR = ["Rec", "Mod", "EM", "Med", "Anc", "Pre", "MW"];
const byEraLine = (label, arr) =>
  `  ${label} │ ` + arr.map((v, e) => `${ERA_ABBR[e]} ${v.toFixed(1)}`).join("  ");
// Intensity = overclocks per expedition in each era (volume-independent) — how mechanically tight the era is.
const ocIntensity = (m) =>
  m.overclocksByEra.map((oc, e) => (m.expeditionsByEra[e] ? oc / m.expeditionsByEra[e] : 0));

const row = (label, m) =>
  `  ${label} │    ${pct(m.triumph)}     ${pct(m.collapse)}  ${pct(m.quiet)}    ${pct(m.timeout)} │ ` +
  ` ${f1(m.rounds)}   ${f1(m.deepest)} ${f1(m.overclocks)}  ${f1(m.shutdowns)}  ${f1(m.papers)}  ${f1(m.spread)} ${String(Math.round(m.wallClock)).padStart(5)}`;

(async () => {
  console.log(
    `\nWarped full-game sim — ${games} games/composition — config: ${configLabel}  (reqs:${reqs} gates:${gateTiers} findMult:${findMult})\n`
  );
  const HEAD =
    "  table    │ triumph collapse quiet timeout │ rounds deepest  OC/g shut/g papers spread  ~min";
  for (const n of playerCounts) {
    console.log(`── ${n} players ${"─".repeat(80)}`);
    console.log(HEAD);
    const rows = [];
    for (const combo of getPlayerCombinations(n)) {
      const m = metrics(await runCombo(n, combo), n);
      rows.push(m);
      console.log(row(comboLabel(combo), m));
    }
    const mean = meanRows(rows);
    console.log(row("─ mean  ", mean));
    console.log(byEraLine("exped/g ", mean.expeditionsByEra)); // volume: how often you're in each era
    console.log(byEraLine("OC/exped", ocIntensity(mean))); // intensity: how hard the gamble bites there
  }
  console.log(
    "\n  (table = composition G/C/B counts · deepest 0 Recent…6 ManyWorlds · mean = unweighted over all compositions)\n"
  );
})();
