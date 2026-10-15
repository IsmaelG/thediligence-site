// Build the golden site: each page of spec/markup inside the frozen CSS, as a static site.
// It is what the reference is measured on, and what the gate must score 100 % on (self-test).
//   node scripts/conformity/golden-site.mjs [outDir=.conformity/golden-site]
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { ROOT, SPEC, pagesConfig, wrapperHtml } from './lib.mjs';

export function buildGoldenSite(outDir = path.join(ROOT, '.conformity', 'golden-site')) {
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });
  execFileSync(process.execPath, [path.join(ROOT, 'scripts', 'spec-css.mjs'), '--out', outDir], { stdio: 'ignore' });
  for (const p of pagesConfig().pages) {
    const markup = fs.readFileSync(path.join(SPEC, 'markup', `${p.name}.html`), 'utf8').trim();
    const dir = path.join(outDir, p.route.replace(/^\//, ''));
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), wrapperHtml({ title: p.title, markup }));
  }
  return outDir;
}

if (process.argv[1] && process.argv[1].endsWith('golden-site.mjs')) {
  console.log(`golden site in ${buildGoldenSite(process.argv[2] ? path.resolve(process.argv[2]) : undefined)}`);
}
