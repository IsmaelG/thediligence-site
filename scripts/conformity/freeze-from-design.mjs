// Freeze the approved design as data: golden markup, interaction states, CSS, fonts.
// Run only when Ismael changes the reference on purpose (docs/CONFORMITY.md section 7).
//   1. serve the design: cd prototypes/site-v5 && node ../../scripts/conformity/serve.mjs . 8766
//   2. DESIGN_URL=http://localhost:8766 node scripts/conformity/freeze-from-design.mjs
//   3. node scripts/conformity/build-reference.mjs
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { chromium } from 'playwright';
import {
  ROOT, SPEC, readJSON, writeJSON, pagesConfig, norm, slug, parse, toHtml, walk, isEl,
  applyOverrides, removeSeams, rewriteImages, stripRuntime,
} from './lib.mjs';

const DESIGN_URL = process.env.DESIGN_URL || 'http://localhost:8766';
const PROTO = path.join(ROOT, 'prototypes', 'site-v5');
const cfg = pagesConfig();
const overrides = readJSON(path.join(SPEC, 'copy-overrides.json')).overrides;
const seams = readJSON(path.join(SPEC, 'seams.json'));
const images = readJSON(path.join(SPEC, 'assets.json')).images;
const executablePath = process.env.CHROMIUM_PATH || undefined;

// In-page: the root element of a design page and its controls.
const ROOT_SEL = '#dc-root .sc-host > div';
const CONTROL_SEL = 'button, [role=tab], [role=switch], summary';

function cleanFragment(html, page, { isRoot }) {
  const frag = parse(html);
  stripRuntime(frag);
  const saved = isRoot ? removeSeams(frag, page, seams) : [];
  const applied = applyOverrides(frag, page, overrides);
  rewriteImages(frag, images);
  if (isRoot) {
    const root = frag.childNodes.find(isEl);
    root.attrs.unshift({ name: 'data-page', value: page });
  }
  return { html: toHtml(frag), saved, applied };
}

async function open(browser, url) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce', locale: 'en-US' });
  const pg = await ctx.newPage();
  const errors = [];
  pg.on('pageerror', (e) => errors.push(e.message));
  pg.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  const fontCss = [];
  pg.on('response', async (r) => { if (r.url().startsWith('https://fonts.googleapis.com/css2')) fontCss.push(await r.text()); });
  await pg.goto(url, { waitUntil: 'networkidle' });
  await pg.evaluate(() => document.fonts.ready);
  await pg.waitForTimeout(1500);
  return { ctx, pg, errors, fontCss };
}

const browser = await chromium.launch({ executablePath });
const behaviour = { source: cfg.source, generatedAt: new Date().toISOString(), controls: [] };
let googleCss = null;
const report = [];

for (const p of cfg.pages) {
  const url = `${DESIGN_URL}/${p.design}`;
  const { ctx, pg, errors, fontCss } = await open(browser, url);
  if (errors.length) throw new Error(`${p.name}: console errors on the design: ${errors.join(' | ')}`);
  googleCss = googleCss || fontCss[0];

  // 1. Golden markup (initial state).
  const rootHtml = await pg.evaluate((sel) => document.querySelector(sel).outerHTML, ROOT_SEL);
  const g = cleanFragment(rootHtml, p.name, { isRoot: true });
  fs.mkdirSync(path.join(SPEC, 'markup'), { recursive: true });
  fs.writeFileSync(path.join(SPEC, 'markup', `${p.name}.html`), g.html.trim() + '\n');
  for (const s of g.saved) fs.writeFileSync(path.join(SPEC, s.save), s.html);
  report.push(`${p.name}: golden markup ${g.html.length} chars; seams removed ${g.saved.map((s) => s.save).join(', ') || 'none'}; overrides applied ${g.applied.length}`);

  // 2. Controls: one fresh load per control, click, record the enclosing section.
  const controls = await pg.evaluate(({ rootSel, controlSel }) => {
    const root = document.querySelector(rootSel);
    const n = (s) => (s || '').replace(/\s+/g, ' ').trim();
    const vis = (e) => { const r = e.getBoundingClientRect(); const c = getComputedStyle(e); return r.width > 0 && r.height > 0 && c.visibility !== 'hidden' && c.display !== 'none'; };
    const seen = {};
    return [...root.querySelectorAll(controlSel)].filter(vis).map((e, i) => {
      const label = n(e.innerText).slice(0, 60); seen[label] = (seen[label] || 0) + 1;
      return { i, label, ariaLabel: e.getAttribute('aria-label') || '', occurrence: seen[label] - 1, tag: e.tagName.toLowerCase() };
    });
  }, { rootSel: ROOT_SEL, controlSel: CONTROL_SEL });
  await ctx.close();

  let nState = 0;
  for (const c of controls) {
    const o = await open(browser, url);
    const res = await o.pg.evaluate(async ({ rootSel, controlSel, i, overrides, page }) => {
      const root = document.querySelector(rootSel);
      const n = (s) => (s || '').replace(/\s+/g, ' ').trim();
      const vis = (e) => { const r = e.getBoundingClientRect(); const c = getComputedStyle(e); return r.width > 0 && r.height > 0 && c.visibility !== 'hidden' && c.display !== 'none'; };
      const el = [...root.querySelectorAll(controlSel)].filter(vis)[i];
      const kids = [...root.children];
      let sec = el; while (sec && sec.parentElement !== root) sec = sec.parentElement;
      // Approved copy first (same rule as lib.applyOverrides), so the recorded text is the one the site must show.
      const tw = document.createTreeWalker(sec, NodeFilter.SHOW_TEXT);
      for (let t = tw.nextNode(); t; t = tw.nextNode()) {
        const v = n(t.nodeValue).toLowerCase(); if (!v) continue;
        const o = overrides.find((x) => (!x.page || x.page === page) && (x.onlyExact ? v === x.match : v.startsWith(x.match)));
        if (o) t.nodeValue = t.nodeValue.match(/^\s*/)[0] + o.use + t.nodeValue.match(/\s*$/)[0];
      }
      // Index among sections, counting only blocks that stay in the golden markup (the logos strip is removed).
      const kept = kids.filter((k) => !k.classList.contains('proof'));
      const sectionIndex = kept.indexOf(sec);
      const before = n(sec.innerText);
      const ariaBefore = { pressed: el.getAttribute('aria-pressed'), selected: el.getAttribute('aria-selected'), open: el.parentElement?.tagName === 'DETAILS' ? el.parentElement.open : null };
      el.click();
      await new Promise((r) => setTimeout(r, 250));
      const after = n(sec.innerText);
      const ariaAfter = { pressed: el.getAttribute('aria-pressed'), selected: el.getAttribute('aria-selected'), open: el.parentElement?.tagName === 'DETAILS' ? el.parentElement.open : null };
      return { sectionIndex, before: before.slice(0, 1500), after: after.slice(0, 1500), changed: before !== after, ariaBefore, ariaAfter, html: sec.outerHTML };
    }, { rootSel: ROOT_SEL, controlSel: CONTROL_SEL, i: c.i, overrides, page: p.name });
    await o.ctx.close();
    const entry = { page: p.name, control: c.tag, label: c.label, ariaLabel: c.ariaLabel, occurrence: c.occurrence,
      sectionIndex: res.sectionIndex, ariaBefore: res.ariaBefore, ariaAfter: res.ariaAfter, changed: res.changed,
      effect: res.changed ? 'section changes' : 'no visible change (already in this state)',
      textBefore: res.before.slice(0, 1400), textAfter: res.after.slice(0, 1400) };
    if (res.changed) {
      nState += 1;
      const s = cleanFragment(res.html, p.name, { isRoot: false });
      const file = `states/${p.name}/${String(nState).padStart(2, '0')}-${slug(c.label)}.html`;
      fs.mkdirSync(path.join(SPEC, 'states', p.name), { recursive: true });
      fs.writeFileSync(path.join(SPEC, file), s.html.trim() + '\n');
      entry.state = file;
    }
    behaviour.controls.push(entry);
  }
  report.push(`${p.name}: ${controls.length} controls, ${nState} change their section`);

  // 3. CSS: the page's own stylesheet, verbatim.
  const src = fs.readFileSync(path.join(PROTO, p.design), 'utf8');
  const css = src.match(/<helmet>[\s\S]*?<style>([\s\S]*?)<\/style>[\s\S]*?<\/helmet>/)[1];
  fs.mkdirSync(path.join(SPEC, 'styles'), { recursive: true });
  fs.writeFileSync(path.join(SPEC, 'styles', `${p.name}.css`), css.trim() + '\n');
}
writeJSON(path.join(SPEC, 'behaviour.json'), behaviour);

// 4. Fonts: the exact files Google served to the design, self-hosted under the same family names.
if (!googleCss) throw new Error('no Google Fonts stylesheet seen');
fs.mkdirSync(path.join(SPEC, 'fonts'), { recursive: true });
// Keep the latin and latin-ext subsets (every character of the site is in them).
const blocks = [...googleCss.matchAll(/\/\* ([\w-]+) \*\/\s*(@font-face \{[^}]*\})/g)].filter((m) => ['latin', 'latin-ext'].includes(m[1]));
let fontsCss = '/* Generated by scripts/conformity/freeze-from-design.mjs from the Google Fonts stylesheet the design loads (latin and latin-ext subsets). Same files, served from /fonts under the same family names. */\n'
  + blocks.map((m) => `/* ${m[1]} */\n${m[2]}\n`).join('');
const urls = [...new Set([...fontsCss.matchAll(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g)].map((m) => m[1]))];
const fetcher = await (await browser.newContext()).newPage();
await fetcher.goto(`${DESIGN_URL}/${cfg.pages[0].design}`);
for (const u of urls) {
  const b64 = await fetcher.evaluate(async (url) => {
    const buf = new Uint8Array(await (await fetch(url)).arrayBuffer());
    let s = ''; for (let i = 0; i < buf.length; i += 0x8000) s += String.fromCharCode(...buf.subarray(i, i + 0x8000));
    return btoa(s);
  }, u);
  const name = `${u.split('/s/')[1].split('/')[0]}-${crypto.createHash('sha1').update(u).digest('hex').slice(0, 10)}.woff2`;
  fs.writeFileSync(path.join(SPEC, 'fonts', name), Buffer.from(b64, 'base64'));
  fontsCss = fontsCss.split(u).join(`/fonts/${name}`);
}
fs.writeFileSync(path.join(SPEC, 'styles', 'fonts.css'), fontsCss);
report.push(`fonts: ${urls.length} files`);

// 5. Images, renamed.
fs.mkdirSync(path.join(SPEC, 'assets'), { recursive: true });
for (const [id, name] of Object.entries(images)) fs.copyFileSync(path.join(PROTO, '_blob', id), path.join(SPEC, 'assets', name));

await browser.close();
console.log(report.join('\n'));
