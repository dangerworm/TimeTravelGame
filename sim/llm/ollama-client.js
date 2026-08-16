'use strict';
// Minimal Ollama HTTP client: makes sure a server is up, makes sure the model is pulled, and
// asks for JSON-formatted completions. No SDK dependency — Node 18+ has global fetch.
const { spawn, spawnSync } = require('child_process');

const BASE = (process.env.OLLAMA_HOST || 'http://127.0.0.1:11434').replace(/\/$/, '');

async function isRunning() {
  try {
    const res = await fetch(`${BASE}/api/tags`, { signal: AbortSignal.timeout(1500) });
    return res.ok;
  } catch {
    return false;
  }
}

async function ensureServerRunning({ log = console.log } = {}) {
  if (await isRunning()) return;
  log(`Ollama not responding at ${BASE} — starting "ollama serve" …`);
  const child = spawn('ollama', ['serve'], { detached: true, stdio: 'ignore' });
  child.unref();
  for (let i = 0; i < 30; i++) {
    await new Promise((r) => setTimeout(r, 1000));
    if (await isRunning()) {
      log('Ollama is up.');
      return;
    }
  }
  throw new Error(`Ollama did not come up at ${BASE} after 30s. Is "ollama" on PATH?`);
}

async function listModels() {
  const res = await fetch(`${BASE}/api/tags`);
  if (!res.ok) throw new Error(`GET /api/tags failed: ${res.status}`);
  const data = await res.json();
  return (data.models || []).map((m) => m.name);
}

// Exact tag match only. A bare-name prefix match (e.g. accepting a pulled "llama3.1:8b" for a
// requested "llama3.1:70b") would silently run the WRONG model — every call would then 404 against
// /api/generate, get eaten by llm-policy's retry-then-fallback, and produce a fully heuristic game
// mislabelled as an LLM run. If the exact tag isn't local, pull it (or let the user fix a typo).
async function ensureModel(model, { log = console.log } = {}) {
  const names = await listModels();
  if (names.includes(model)) return;
  log(`Model "${model}" not found locally (have: ${names.join(', ') || 'none'}) — pulling (this can take a while the first time) …`);
  const res = spawnSync('ollama', ['pull', model], { stdio: 'inherit' });
  if (res.status !== 0) throw new Error(`"ollama pull ${model}" failed (exit ${res.status}) — check the model tag is correct.`);
}

// format:'json' forces syntactically-valid JSON out of Ollama; the prompt still has to spell out
// which keys are wanted since Ollama does not accept a JSON-schema constraint pre-0.5.
async function generateJSON({ model, system, prompt, temperature = 0.3, numPredict = 300, timeoutMs = 120000 }) {
  const res = await fetch(`${BASE}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      system,
      prompt,
      format: 'json',
      stream: false,
      options: { temperature, num_predict: numPredict },
    }),
    // Without this, a hung Ollama request stalls an unattended multi-hour game indefinitely with no
    // output — better to fail the attempt (retried by llm-policy, then falls back) than hang forever.
    signal: AbortSignal.timeout(timeoutMs),
  });
  if (!res.ok) throw new Error(`Ollama /api/generate failed: ${res.status} ${await res.text()}`);
  const data = await res.json();
  try {
    return JSON.parse(data.response);
  } catch (e) {
    throw new Error(`Model did not return valid JSON: ${data.response?.slice(0, 200)}`);
  }
}

module.exports = { ensureServerRunning, ensureModel, generateJSON, BASE };
