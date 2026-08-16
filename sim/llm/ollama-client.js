'use strict';
// Minimal Ollama HTTP client: makes sure a server is up, makes sure the model is pulled, and
// asks for JSON-formatted completions. No SDK dependency — Node 18+ has global fetch.
const { spawn, execSync } = require('child_process');

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

// Ollama model names carry a tag (":7b", ":latest"); accept an exact match or a bare-name prefix
// match so "--model qwen2.5" matches an already-pulled "qwen2.5:7b".
async function ensureModel(model, { log = console.log } = {}) {
  const names = await listModels();
  const have = names.some((n) => n === model || n.split(':')[0] === model.split(':')[0]);
  if (have) return;
  log(`Model "${model}" not found locally — pulling (this can take a while the first time) …`);
  execSync(`ollama pull ${model}`, { stdio: 'inherit' });
}

// format:'json' forces syntactically-valid JSON out of Ollama; the prompt still has to spell out
// which keys are wanted since Ollama does not accept a JSON-schema constraint pre-0.5.
async function generateJSON({ model, system, prompt, temperature = 0.3, numPredict = 300 }) {
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
