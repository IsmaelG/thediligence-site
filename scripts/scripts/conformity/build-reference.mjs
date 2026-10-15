// build-reference.mjs — regenerate spec/redlines/*.json and spec/reference/*.png from spec/markup/*.html (the golden markup).
// Run it only when the golden markup or the CSS changes on purpose, and commit the result. Usage: node scripts/conformity/build-reference.mjs
import fs from 'node:fs'; import { createRequire } from 'node:module';
import { launch, PAGES, WIDTHS, settle } from './browser.mjs';
const measure = createRequire(import.meta.url)('./measure.cjs');
const css = ['spec/styles/base.css', 'spec/styles/ui.css', 'spec/styles/logos.css'].map(f => fs.readFileSync(f, 'utf8')).join('\n');
const FONTS = 'https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&family=Overpass:wght@400;500;600;700&family=Overpass+Mono:wght@400;500;600&display=swap';
fs.mkdirSync('spec/redlines', { recursive: true }); fs.mkdirSync('spec/reference', { recursive: true });
const b = await launch();
for (const name of Object.keys(PAGES)) for (const w of WIDTHS) {
  const page = await (await b.newContext({ viewport: { width: w, height: 900 }, colorScheme: 'light' })).newPage();
  const markup = fs.readFileSync(`spec/markup/${name}.html`, 'utf8');
  await page.setContent(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${name}</title><link href="${FONTS}" rel="stylesheet"><style>${css}</style></head><body><div class="td" id="top"><div>${markup}</div></div></body></html>`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600); await settle(page);
  const d = await page.evaluate(measure);
  fs.writeFileSync(`spec/redlines/${name}.${w}.json`, JSON.stringify(d));
  if (w !== 768) await page.screenshot({ path: `spec/reference/${name}-${w}.png`, fullPage: true });
  console.log(name, w, `${d.text.length} texts, ${d.boxes.length} boxes, ${d.sections.length} sections, ${d.docW}x${d.docH}`);
  await page.context().close();
}
await b.close();
