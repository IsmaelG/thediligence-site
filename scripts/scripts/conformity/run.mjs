// run.mjs — `pnpm conformity`. Checks a running site against the frozen reference in spec/.
// Usage: BASE_URL=http://localhost:3000 node scripts/conformity/run.mjs [--pages=Main,Platform] [--no-visual] [--no-behaviour] [--out=.conformity]
// Exit code 1 when any gate in spec/thresholds.json fails. Writes <out>/report.json and <out>/report.md.
import fs from 'node:fs'; import { createRequire } from 'node:module';
import { PNG } from 'pngjs'; import pixelmatch from 'pixelmatch';
import { launch, PAGES, WIDTHS, settle, route } from './browser.mjs';
import { compareRedline, similarity } from './compare.mjs';
const measure = createRequire(import.meta.url)('./measure.cjs');
const arg = k => (process.argv.find(a => a.startsWith(`--${k}=`)) || '').split('=')[1];
const BASE = (process.env.BASE_URL || 'http://localhost:3000').replace(/\/$/, '');
const OUT = arg('out') || '.conformity'; fs.mkdirSync(OUT, { recursive: true });
const only = arg('pages') ? arg('pages').split(',') : Object.keys(PAGES);
const T = JSON.parse(fs.readFileSync('spec/thresholds.json', 'utf8'));
const BEH = JSON.parse(fs.readFileSync('spec/behaviour.json', 'utf8'));
const b = await launch(); const rep = {}; let failed = 0;
const SEC = 'body header, main > *, body footer';
for (const name of only) {
  rep[name] = {};
  for (const w of WIDTHS) {
    const ref = JSON.parse(fs.readFileSync(`spec/redlines/${name}.${w}.json`, 'utf8'));
    const ctx = await b.newContext({ viewport: { width: w, height: 900 }, colorScheme: 'light', reducedMotion: 'reduce' }); const page = await ctx.newPage();
    const r = { fails: [] };
    try {
      const resp = await page.goto(BASE + route(name), { waitUntil: 'networkidle' });
      if (!resp || resp.status() !== 200) { r.fails.push(`HTTP ${resp && resp.status()}`); }
      else {
        await settle(page);
        const got = await page.evaluate(measure);
        Object.assign(r, compareRedline(ref, got, T));
        // visual: one crop per section, aligned by order
        if (T.visual.widths.includes(w) && !process.argv.includes('--no-visual') && ref.sections.length === got.sections.length) {
          const refPng = PNG.sync.read(fs.readFileSync(`spec/reference/${name}-${w}.png`)); r.visual = [];
          const gotPng = PNG.sync.read(await page.screenshot({ fullPage: true }));
          for (let i = 0; i < ref.sections.length; i++) {
            const [x, y, sw, sh] = ref.sections[i].rect; const [gx, gy, gw, gh] = got.sections[i].rect;
            const crop = (png, X, Y, Wd, Ht) => { const cw = Math.max(1, Math.min(Wd, png.width - X)), ch = Math.max(1, Math.min(Ht, png.height - Y)); const o = new PNG({ width: cw, height: ch }); PNG.bitblt(png, o, X, Y, cw, ch, 0, 0); return o; };
            const a = crop(refPng, x, y, sw, sh), c = crop(gotPng, gx, gy, gw, gh);
            const W = Math.min(a.width, c.width), H = Math.min(a.height, c.height);
            const trim = (p) => { const o = new PNG({ width: W, height: H }); PNG.bitblt(p, o, 0, 0, W, H, 0, 0); return o; };
            const diff = pixelmatch(trim(a).data, trim(c).data, null, W, H, { threshold: T.visual.pixelThreshold });
            const sizePenalty = Math.abs(sh - gh) > sh * 0.03 ? 100 : 0;
            r.visual.push({ i, label: ref.sections[i].text.slice(0, 30), diffPct: Math.max(sizePenalty, Math.round(1000 * diff / (W * H)) / 10) });
          }
          const bad = r.visual.filter(v => v.diffPct > T.visual.maxDiffPct);
          if (bad.length) r.fails.push(`visual: ${bad.length}/${r.visual.length} sections above ${T.visual.maxDiffPct}% (${bad.slice(0, 4).map(v => `#${v.i} ${v.diffPct}%`).join(', ')})`);
        }
      }
    } catch (e) { r.fails.push('error: ' + e.message.slice(0, 120)); }
    await ctx.close(); rep[name][w] = r;
    if (r.fails.length) failed++;
    console.log(`${name.padEnd(10)} ${String(w).padStart(4)}  ${r.fails.length ? 'FAIL  ' + r.fails.join(' | ') : 'ok'}`);
  }
  // behaviour (desktop only)
  if (!process.argv.includes('--no-behaviour')) {
    const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' }); const out = { fails: [], checked: 0 };
    for (const c of BEH[name] || []) {
      if (!c.changed) continue; out.checked++;
      const page = await ctx.newPage();
      try {
        await page.goto(BASE + route(name), { waitUntil: 'networkidle' }); await settle(page);
        const found = await page.evaluate(({ label, aria, occ }) => {
          const n = s => s.replace(/\s+/g, ' ').trim();
          const els = [...document.querySelectorAll('main button, main [role=tab], main [role=switch], main summary')].filter(e => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0; });
          const hits = els.filter(e => { const t = n(e.innerText || e.getAttribute('aria-label') || ''); return (aria && e.getAttribute('aria-label') === aria) || t === label || (label.length >= 60 && t.startsWith(label.slice(0, 40))); });
          const hit = hits[occ] || hits[0]; if (hit) hit.setAttribute('data-probe', '1'); return !!hit;
        }, { label: c.label, aria: c.aria || '', occ: c.occurrence || 0 });
        if (!found) { out.fails.push(`control missing: "${c.label.slice(0, 40)}"`); await page.close(); continue; }
        const loc = page.locator('[data-probe="1"]');
        await loc.click({ timeout: 3000 }); await page.waitForTimeout(250);
        const txt = await loc.evaluate(e => (e.closest('section') || document.querySelector('main')).innerText.replace(/\s+/g, ' ').trim().slice(0, 4000));
        const s = similarity(c.afterText.slice(0, 1400), txt.slice(0, 1400)); if (s < T.behaviour.minSimilarity) out.fails.push(`"${c.label.slice(0, 40)}" gives a different section (${Math.round(s * 100)}% similar)`);
      } catch (e) { out.fails.push(`"${c.label.slice(0, 40)}": ${e.message.slice(0, 60)}`); }
      await page.close();
    }
    await ctx.close(); rep[name].behaviour = out; if (out.fails.length > T.behaviour.maxMissingControls) failed++;
    console.log(`${name.padEnd(10)} behaviour  ${out.checked} controls  ${out.fails.length ? 'FAIL  ' + out.fails.length + ' (' + out.fails.slice(0, 2).join('; ') + ')' : 'ok'}`);
  }
}
await b.close();
fs.writeFileSync(`${OUT}/report.json`, JSON.stringify(rep, null, 1));
const md = ['# Conformity report', '', `Target: ${BASE}`, '', '| Page | Width | Text | Type | Position | Boxes | Height | Result |', '|---|---|---|---|---|---|---|---|'];
for (const [p, v] of Object.entries(rep)) for (const [w, r] of Object.entries(v)) { if (w === 'behaviour') continue; md.push(`| ${p} | ${w} | ${r.coveragePct ?? '-'}% | ${r.stylePct ?? '-'}% | ${r.positionPct ?? '-'}% | ${r.boxesPct ?? '-'}% | ${r.heightDiffPct ?? '-'}% | ${r.fails.length ? 'FAIL' : 'ok'} |`); }
fs.writeFileSync(`${OUT}/report.md`, md.join('\n') + '\n');
console.log(failed ? `\nCONFORMITY FAILED (${failed} checks). See ${OUT}/report.md` : '\nCONFORMITY OK');
process.exit(failed ? 1 : 0);
