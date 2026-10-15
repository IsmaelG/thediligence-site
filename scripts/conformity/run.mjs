// The conformity gate. Compares a running site with the frozen reference in spec/.
//   BASE_URL=http://localhost:3000 node scripts/conformity/run.mjs [--pages=Main,Team] [--widths=1280,768,390]
//        [--no-visual] [--no-behaviour] [--only=G1,G2,...] [--routes=Main:/,Team:/team] [--out=.conformity]
//        [--sections=<css selector>]  (validation against the prototype only)
// Exit code 1 when any counted gate fails. Writes <out>/report.json and <out>/report.md.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { ROOT, SPEC, readJSON, writeJSON, pagesConfig, norm } from './lib.mjs';
import { compareText, compareBoxes, compareShape, behaviourScore } from './compare.mjs';
import { launch, loadPage } from './browser.mjs';

const measure = createRequire(import.meta.url)('./measure.cjs');
const arg = (k) => process.argv.find((a) => a.startsWith(`--${k}=`))?.split('=').slice(1).join('=');
const flag = (k) => process.argv.includes(`--${k}`);
const BASE = (process.env.BASE_URL || 'http://localhost:3000').replace(/\/$/, '');
const cfg = pagesConfig();
// --sections overrides the section selector, only to validate the gate against the prototype itself (no data-page there).
if (arg('sections')) cfg.sectionSelector = arg('sections');
const th = readJSON(path.join(SPEC, 'thresholds.json'));
const behaviour = readJSON(path.join(SPEC, 'behaviour.json'));
const pages = cfg.pages.filter((p) => !arg('pages') || arg('pages').split(',').includes(p.name));
const widths = arg('widths') ? arg('widths').split(',').map(Number) : cfg.widths;
const only = arg('only') ? arg('only').split(',') : null;
const routes = Object.fromEntries((arg('routes') || '').split(',').filter(Boolean).map((s) => s.split(':')));
const OUT = path.resolve(ROOT, arg('out') || '.conformity');
const counts = (g) => !only || only.includes(g);
const CONTROL_SEL = 'button, [role=tab], [role=switch], summary';

function crop(png, [x, y, w, h], W, H) {
  const out = new PNG({ width: W, height: H });
  for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) {
    const sx = x + i; const sy = y + j; const o = (j * W + i) * 4;
    if (sx < 0 || sy < 0 || sx >= png.width || sy >= png.height) { out.data[o + 3] = 255; continue; }
    const s = (sy * png.width + sx) * 4;
    out.data[o] = png.data[s]; out.data[o + 1] = png.data[s + 1]; out.data[o + 2] = png.data[s + 2]; out.data[o + 3] = png.data[s + 3];
  }
  return out;
}

function pixelGate(refPng, candPng, refSecs, candSecs) {
  return refSecs.map((r, i) => {
    const c = candSecs[i];
    if (!c) return { i, text: r.text, ratio: 1, note: 'section missing' };
    const [, , rw, rh] = r.rect; const [, , cw, ch] = c.rect;
    if (Math.abs(ch - rh) / rh > th.G7_heightTolerance) return { i, text: r.text, ratio: 1, note: `height ${ch} vs ${rh}` };
    const W = Math.max(1, Math.min(rw, cw)); const H = Math.max(1, Math.min(rh, ch));
    const a = crop(refPng, r.rect, W, H); const b = crop(candPng, c.rect, W, H);
    const diff = pixelmatch(a.data, b.data, null, W, H, { threshold: th.G7_pixelThreshold });
    return { i, text: r.text, ratio: diff / (W * H) };
  });
}

async function behaviourGate(browser, url, page) {
  const results = [];
  for (const c of behaviour.controls.filter((x) => x.page === page.name && x.changed)) {
    const { ctx, page: pg } = await loadPage(browser, url, 1280);
    const res = await pg.evaluate(async ({ c, controlSel, sectionSel }) => {
      const n = (s) => (s || '').replace(/\s+/g, ' ').trim().toLowerCase();
      const vis = (e) => { const r = e.getBoundingClientRect(); const s = getComputedStyle(e); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none'; };
      const all = [...document.querySelectorAll(controlSel)].filter(vis);
      const same = all.filter((e) => (c.ariaLabel ? e.getAttribute('aria-label') === c.ariaLabel : n(e.innerText).slice(0, 60) === n(c.label)));
      const el = same[c.occurrence];
      if (!el) return { found: false };
      const sections = new Set(document.querySelectorAll(sectionSel));
      let sec = el; while (sec && !sections.has(sec)) sec = sec.parentElement;
      el.click();
      await new Promise((r) => setTimeout(r, 250));
      return { found: true, text: (sec || document.body).innerText.replace(/\s+/g, ' ').trim().slice(0, 1400) };
    }, { c, controlSel: CONTROL_SEL, sectionSel: cfg.sectionSelector });
    await ctx.close();
    if (!res.found) { results.push({ label: c.label, found: false, score: 0, ok: false }); continue; }
    const s = behaviourScore(c, res.text, th.G8_jaccard);
    results.push({ label: c.label, found: true, score: s.score, ok: s.ok, missingAdded: s.missingAdded.slice(0, 10), stillThere: s.stillThere.slice(0, 10) });
  }
  return results;
}

const browser = await launch();
const report = { base: BASE, at: new Date().toISOString(), thresholds: th, pages: [] };
let failed = false;
for (const p of pages) {
  const route = routes[p.name] || p.route;
  const url = BASE + route;
  for (const w of widths) {
    const ref = readJSON(path.join(SPEC, 'redlines', `${p.name}.${w}.json`));
    const row = { page: p.name, width: w, url, gates: {} };
    const { ctx, page, status } = await loadPage(browser, url, w);
    if (status >= 400 || status === 0) {
      row.error = `HTTP ${status}`;
      for (const g of ['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7']) row.gates[g] = { pass: false, value: `HTTP ${status}` };
    } else {
      const cand = await page.evaluate(measure, cfg.sectionSelector);
      const t = compareText(ref, cand, th.tolerances);
      const b = compareBoxes(ref, cand);
      const s = compareShape(ref, cand, th);
      row.gates.G1 = { pass: t.G1 >= th.G1_textCoverage, value: t.G1 };
      row.gates.G2 = { pass: t.G2 >= th.G2_typography, value: t.G2 };
      row.gates.G3 = { pass: t.G3 >= th.G3_position, value: t.G3 };
      row.gates.G4 = { pass: b.G4 >= th.G4_boxes, value: b.G4 };
      row.gates.G5 = { pass: s.G5, value: s.heightDelta, overflow: s.overflow };
      row.gates.G6 = { pass: s.G6, value: s.sections };
      row.details = { missing: t.missing.slice(0, 80), typography: t.typography.slice(0, 80), position: t.position.slice(0, 40), boxes: b.boxes.slice(0, 40),
        counts: { missing: t.missing.length, typography: t.typography.length, position: t.position.length, boxes: b.boxes.length } };
      if (cfg.visualWidths.includes(w) && !flag('no-visual')) {
        const candPng = PNG.sync.read(await page.screenshot({ fullPage: true }));
        const refPng = PNG.sync.read(fs.readFileSync(path.join(SPEC, 'reference', `${p.name}-${w}.png`)));
        const secs = pixelGate(refPng, candPng, ref.sections, cand.sections);
        const worst = Math.max(...secs.map((x) => x.ratio));
        row.gates.G7 = { pass: worst <= th.G7_pixelRatioPerSection, value: worst, sections: secs };
        fs.mkdirSync(path.join(OUT, 'shots'), { recursive: true });
        fs.writeFileSync(path.join(OUT, 'shots', `${p.name}-${w}.png`), PNG.sync.write(candPng));
      }
    }
    await ctx.close();
    if (w === 1280 && !flag('no-behaviour') && !row.error) {
      const beh = await behaviourGate(browser, url, p);
      if (beh.length) row.gates.G8 = { pass: beh.every((x) => x.ok), value: `${beh.filter((x) => x.ok).length}/${beh.length}`, controls: beh };
    }
    for (const [g, v] of Object.entries(row.gates)) if (!v.pass && counts(g)) failed = true;
    report.pages.push(row);
    const brief = Object.entries(row.gates).map(([g, v]) => `${g} ${typeof v.value === 'number' ? (g === 'G5' || g === 'G7' ? (100 * v.value).toFixed(2) + '%' : (100 * v.value).toFixed(1)) : Array.isArray(v.value) ? v.value.join('/') : v.value}${v.pass ? '' : '✗'}`).join(' · ');
    console.log(`${p.name} @${w}: ${brief}`);
  }
}
await browser.close();

// Report
writeJSON(path.join(OUT, 'report.json'), report);
const fmt = (g, v) => (!v ? '—' : `${v.pass ? '✓' : '✗'} ${typeof v.value === 'number' ? (['G5', 'G7'].includes(g) ? (100 * v.value).toFixed(2) + ' %' : (100 * v.value).toFixed(1) + ' %') : Array.isArray(v.value) ? v.value.join(' vs ') : v.value}`);
let md = `# Conformity report\n\n${report.at} · ${BASE}\n\n| Page | Width | G1 copy | G2 type | G3 position | G4 boxes | G5 height | G6 sections | G7 pixels (worst section) | G8 behaviour |\n|---|---|---|---|---|---|---|---|---|---|\n`;
for (const r of report.pages) md += `| ${r.page} | ${r.width} | ${['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8'].map((g) => fmt(g, r.gates[g])).join(' | ')} |\n`;
for (const r of report.pages.filter((x) => x.details)) {
  const d = r.details; if (!d.counts.missing && !d.counts.typography && !d.counts.boxes) continue;
  md += `\n## ${r.page} @${r.width}\n\n`;
  if (d.missing.length) md += `**Missing text (${d.counts.missing})**: ${d.missing.slice(0, 15).map((x) => `"${x.slice(0, 50)}"`).join(', ')}\n\n`;
  if (d.typography.length) md += `**Typography (${d.counts.typography})**: ${d.typography.slice(0, 10).map((x) => `"${x.text.slice(0, 30)}": ${x.diffs.map((y) => `${y[0]} ${y[1]} → ${y[2]}`).join(', ')}`).join('; ')}\n\n`;
  if (d.boxes.length) md += `**Boxes (${d.counts.boxes})**: ${d.boxes.slice(0, 10).map((x) => `"${String(x.key).slice(0, 30)}": ${x.issue || x.diffs.map((y) => `${y[0]} ${y[1]} → ${y[2]}`).join(', ')}`).join('; ')}\n\n`;
  const g7 = r.gates.G7?.sections?.filter((s) => s.ratio > th.G7_pixelRatioPerSection);
  if (g7?.length) md += `**Pixels**: ${g7.map((s) => `section ${s.i} ("${s.text.slice(0, 25)}") ${(100 * s.ratio).toFixed(1)} %${s.note ? ` (${s.note})` : ''}`).join('; ')}\n\n`;
}
const summary = `conformity ${failed ? 'FAIL' : 'PASS'} · ${pages.map((p) => p.name).join(', ')} · ${widths.join('/')} px${only ? ` · gates ${only.join(',')}` : ''}`;
md += `\n${summary}\n`;
fs.writeFileSync(path.join(OUT, 'report.md'), md);
console.log(summary);
process.exit(failed ? 1 : 0);
