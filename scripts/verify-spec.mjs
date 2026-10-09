// verify-spec.mjs — fails when a file of spec/ differs from spec/SHA256SUMS (CI, criterion S14).
import fs from 'node:fs'; import crypto from 'node:crypto';
const lines = fs.readFileSync('spec/SHA256SUMS', 'utf8').trim().split('\n'); let bad = 0;
for (const l of lines) { const [h, f] = l.split(/\s{2}/); if (!fs.existsSync(f)) { console.log('MISSING', f); bad++; continue; } if (crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex') !== h) { console.log('CHANGED', f); bad++; } }
console.log(bad ? `spec/ differs from SHA256SUMS in ${bad} file(s)` : `spec/ verified (${lines.length} files)`); process.exit(bad ? 1 : 0);
