// Measure the golden markup (inside the frozen CSS) and write the redlines and reference screenshots.
//   node scripts/conformity/build-reference.mjs        (pnpm conformity:ref)
// Output: spec/redlines/<Page>.<width>.json, spec/reference/<Page>-<width>.png. Regenerated, never edited.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { SPEC, pagesConfig, writeJSON } from './lib.mjs';
import { buildGoldenSite } from './golden-site.mjs';
import { startServer } from './serve.mjs';
import { launch, loadPage } from './browser.mjs';

const measure = createRequire(import.meta.url)('./measure.cjs');
const cfg = pagesConfig();
const site = await startServer(buildGoldenSite(), 0);
const browser = await launch();
fs.mkdirSync(path.join(SPEC, 'redlines'), { recursive: true });
fs.mkdirSync(path.join(SPEC, 'reference'), { recursive: true });
for (const p of cfg.pages) {
  for (const w of cfg.widths) {
    const { ctx, page } = await loadPage(browser, site.url + p.route, w);
    const m = await page.evaluate(measure, cfg.sectionSelector);
    m.page = p.name; m.width = w; m.route = p.route;
    writeJSON(path.join(SPEC, 'redlines', `${p.name}.${w}.json`), m);
    if (cfg.visualWidths.includes(w)) await page.screenshot({ path: path.join(SPEC, 'reference', `${p.name}-${w}.png`), fullPage: true });
    console.log(`${p.name} @${w}: ${m.sections.length} sections, ${m.text.length} text runs, ${m.boxes.length} boxes, height ${m.docH}`);
    await ctx.close();
  }
}
await browser.close();
await site.close();
