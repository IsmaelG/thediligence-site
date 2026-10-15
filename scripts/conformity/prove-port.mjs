// Prove that html-to-jsx.mjs keeps every page identical: convert each golden page, render the component with
// React (renderToStaticMarkup), wrap it in the frozen CSS, and run the gate (G1 to G7) on the result.
//   node scripts/conformity/prove-port.mjs        (needs the dev dependencies esbuild, react, react-dom)
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync, spawn } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { build } from 'esbuild';
import { ROOT, SPEC, pagesConfig, wrapperHtml } from './lib.mjs';
import { startServer } from './serve.mjs';

const tmp = path.join(ROOT, '.conformity', 'prove-port');
fs.rmSync(tmp, { recursive: true, force: true }); fs.mkdirSync(path.join(tmp, 'site'), { recursive: true });
fs.writeFileSync(path.join(tmp, 'links.ts'), 'export const links = { CAL_URL: "#", START_FREE: "#", REPO_URL: "#" };\n');
execFileSync(process.execPath, [path.join(ROOT, 'scripts', 'spec-css.mjs'), '--out', path.join(tmp, 'site')], { stdio: 'ignore' });
const { renderToStaticMarkup } = await import('react-dom/server');
const { createElement } = await import('react');
for (const p of pagesConfig().pages) {
  const tsx = path.join(tmp, `${p.name}.tsx`);
  execFileSync(process.execPath, [path.join(ROOT, 'scripts', 'html-to-jsx.mjs'), path.join(SPEC, 'markup', `${p.name}.html`), tsx, `${p.name}Page`], { stdio: 'ignore' });
  const js = path.join(tmp, `${p.name}.mjs`);
  await build({ entryPoints: [tsx], outfile: js, bundle: true, format: 'esm', platform: 'node', jsx: 'automatic',
    external: ['react', 'react-dom'], alias: { '@/lib/links': path.join(tmp, 'links.ts') }, logLevel: 'silent', nodePaths: [path.join(ROOT, 'node_modules')] });
  const mod = await import(pathToFileURL(js).href);
  const markup = renderToStaticMarkup(createElement(mod.default));
  const dir = path.join(tmp, 'site', p.route.replace(/^\//, '')); fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), wrapperHtml({ title: p.title, markup }));
  console.log(`${p.name}: ${fs.statSync(tsx).size} bytes of TSX, rendered ${markup.length} chars`);
}
const srv = await startServer(path.join(tmp, 'site'), 0);
// The gate runs in a child process (async, so this process keeps serving the pages).
const status = await new Promise((resolve) => spawn(process.execPath, [path.join(ROOT, 'scripts', 'conformity', 'run.mjs'), '--no-behaviour', `--out=${path.join(tmp, 'report')}`],
  { env: { ...process.env, BASE_URL: srv.url }, stdio: 'inherit' }).on('exit', resolve));
await srv.close();
process.exit(status);
