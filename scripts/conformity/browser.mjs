// browser.mjs — shared launcher. Set CHROMIUM_PATH when the browser is not the one Playwright installed.
let pw; try { pw = await import('@playwright/test'); } catch { pw = await import('playwright-core'); }
export const chromium = pw.chromium;
export const launch = () => chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined, args: ['--no-sandbox'] });
export const PAGES = { Main: '/', About: '/about', Book: '/book', Insights: '/insights', Method: '/method', Platform: '/platform', Products: '/products', Security: '/security', Solutions: '/solutions' };
export const WIDTHS = [1280, 768, 390];
export async function settle(page) {
  await page.addStyleTag({ content: 'html{scroll-behavior:auto!important}*{animation:none!important;transition:none!important;caret-color:transparent!important}[data-conformity-skip]{display:none!important}' });
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { scrollTo(0, y); await new Promise(r => setTimeout(r, 40)); } scrollTo(0, 0); });
  await page.waitForTimeout(400);
}

// Test the harness against another host layout, e.g. PAGE_SUFFIX=.dc.html for the original prototype.
export const route = name => process.env.PAGE_SUFFIX ? `/${name}${process.env.PAGE_SUFFIX}` : PAGES[name];
