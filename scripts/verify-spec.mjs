// Verify (default) or rewrite (--write) spec/SHA256SUMS: the hash of every file of the frozen reference.
// CI runs the verify step; a change to spec/ without a dated Decisions-log line in SPEC.md is refused in review.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

// Standalone (no dependency): runs before `pnpm install`.
const SPEC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'spec');

const files = [];
(function list(d) { for (const f of fs.readdirSync(d).sort()) { const p = path.join(d, f); if (fs.statSync(p).isDirectory()) list(p); else if (f !== 'SHA256SUMS') files.push(p); } })(SPEC);
const lines = files.map((f) => `${crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex')}  ${path.relative(SPEC, f).split(path.sep).join('/')}`);
const sums = path.join(SPEC, 'SHA256SUMS');
if (process.argv.includes('--write')) { fs.writeFileSync(sums, lines.join('\n') + '\n'); console.log(`spec/SHA256SUMS written (${lines.length} files)`); process.exit(0); }
const want = new Map(fs.readFileSync(sums, 'utf8').trim().split('\n').map((l) => { const [h, ...p] = l.split('  '); return [p.join('  '), h]; }));
const got = new Map(lines.map((l) => { const [h, ...p] = l.split('  '); return [p.join('  '), h]; }));
const bad = [];
for (const [p, h] of want) if (got.get(p) !== h) bad.push(got.has(p) ? `changed: ${p}` : `missing: ${p}`);
for (const p of got.keys()) if (!want.has(p)) bad.push(`not listed: ${p}`);
if (bad.length) { console.error(`spec/ does not match spec/SHA256SUMS:\n  ${bad.join('\n  ')}`); process.exit(1); }
console.log(`spec/ verified: ${got.size} files match spec/SHA256SUMS`);
