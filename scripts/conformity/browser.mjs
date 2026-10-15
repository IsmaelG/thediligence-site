// Load a page the same way for the reference and for the candidate: light theme, reduced motion,
// en-US, fonts ready, scrolled through once (lazy content) and back to the top.
import { chromium } from 'playwright';

export const launch = () => chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });

export async function loadPage(browser, url, width) {
  // Protected Vercel previews: set VERCEL_AUTOMATION_BYPASS_SECRET (Project settings > Deployment Protection).
  const bypass = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
  const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce', colorScheme: 'light', locale: 'en-US',
    extraHTTPHeaders: bypass ? { 'x-vercel-protection-bypass': bypass, 'x-vercel-set-bypass-cookie': 'true' } : undefined });
  const page = await ctx.newPage();
  const resp = await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.addStyleTag({ content: 'html{scroll-behavior:auto!important}*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}' });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 30)); }
    window.scrollTo(0, 0);
  });
  await page.evaluate(() => Promise.all([...document.images].map((i) => (i.complete ? null : new Promise((r) => { i.onload = i.onerror = r; })))));
  await page.waitForTimeout(300);
  return { ctx, page, status: resp ? resp.status() : 0 };
}
