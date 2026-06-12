// Export every renderer view to PDF via headless Chrome — zero npm dependencies.
//
// Prereq: a server must be serving the app. Easiest: `npm run dev` (port 5173) in another terminal,
// or `npm run build && npm run preview`. Then:  node scripts/export-pdfs.mjs [baseUrl] [outDir]
//
// Each view is addressed by ?view=&face=&players= (see urlDefaults in App.tsx). Page size/orientation
// comes from the app's @page CSS (boards inject landscape). PDFs land in renderer/exports/ (tracked in
// git) and are committed so an up-to-date set is always available from the repo (CLAUDE.md → Standing
// orders). git history keeps every dated snapshot, so the folder is overwritten in place.
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const baseUrl = (process.argv[2] || 'http://localhost:5173').replace(/\/$/, '');
const outDir = process.argv[3] || path.resolve(here, '..', 'exports');

// view params → output filename. players=6 covers every game size.
const VIEWS = [
  { name: 'warped-destinations', q: 'view=destinations&face=duplex' },
  { name: 'warped-researchers', q: 'view=researchers' },
  { name: 'warped-experts', q: 'view=experts' },
  { name: 'warped-parting-gifts', q: 'view=retirement' },
  { name: 'warped-consequences', q: 'view=consequences' },
  { name: 'warped-skills', q: 'view=skills' },
  { name: 'warped-player-boards', q: 'view=boards&players=6' },
  { name: 'warped-tokens', q: 'view=tokens' },
  { name: 'warped-level-diamonds', q: 'view=levels&players=6' },
];

function findChrome() {
  if (process.env.CHROME_PATH && fs.existsSync(process.env.CHROME_PATH)) return process.env.CHROME_PATH;
  const candidates = [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    path.join(os.homedir(), 'AppData/Local/Google/Chrome/Application/chrome.exe'),
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ];
  const hit = candidates.find((c) => fs.existsSync(c));
  if (!hit) throw new Error('Chrome not found. Set CHROME_PATH env var to chrome.exe.');
  return hit;
}

function printOne(chrome, url, outFile) {
  return new Promise((resolve, reject) => {
    const args = [
      '--headless=new',
      '--disable-gpu',
      '--no-pdf-header-footer',
      '--run-all-compositor-stages-before-draw',
      '--virtual-time-budget=10000',
      `--print-to-pdf=${outFile}`,
      url,
    ];
    const ch = spawn(chrome, args, { stdio: 'ignore' });
    ch.on('error', reject);
    ch.on('exit', (code) =>
      code === 0 && fs.existsSync(outFile)
        ? resolve()
        : reject(new Error(`Chrome exited ${code} for ${url}`)),
    );
  });
}

const chrome = findChrome();
fs.mkdirSync(outDir, { recursive: true });
console.log(`[export] Chrome: ${chrome}`);
console.log(`[export] base:   ${baseUrl}`);
console.log(`[export] out:    ${outDir}\n`);

for (const v of VIEWS) {
  const url = `${baseUrl}/?${v.q}`;
  const outFile = path.join(outDir, `${v.name}.pdf`);
  process.stdout.write(`  ${v.name} … `);
  await printOne(chrome, url, outFile);
  const kb = (fs.statSync(outFile).size / 1024).toFixed(0);
  console.log(`${kb} KB`);
}

console.log(`\n[export] done → ${outDir}`);
console.log(`[export] OUTDIR=${outDir}`); // machine-readable for the upload step
