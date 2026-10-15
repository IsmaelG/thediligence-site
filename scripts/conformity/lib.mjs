// Shared helpers for the conformity scripts. Plain Node ESM, no build step.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseFragment, serialize } from 'parse5';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
export const SPEC = path.join(ROOT, 'spec');
export const readJSON = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
export const writeJSON = (p, v) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, JSON.stringify(v, null, 1) + '\n'); };
export const pagesConfig = () => readJSON(path.join(SPEC, 'pages.json'));

// Normalise text for matching: whitespace collapsed, case folded, quotes and dashes unified.
export const norm = (s) => String(s ?? '')
  .replace(/[‘’‛′]/g, "'")
  .replace(/[“”‟″]/g, '"')
  .replace(/ /g, ' ')
  .replace(/\s+/g, ' ')
  .trim()
  .toLowerCase();

export const slug = (s) => norm(s).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || 'control';

// The HTML document every reference page is rendered in: the golden markup inside the frozen CSS.
export function wrapperHtml({ title, markup }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<link rel="stylesheet" href="/spec.css">
</head>
<body>
${markup}
</body>
</html>
`;
}

// ---------- CSS scoping ----------
// Each page of the design ships its own stylesheet, and two of them disagree inside the same media query
// (.h1 is 48px on Main, 64px on Team). Rules are therefore scoped under [data-page="<Page>"]; the source
// files stay unchanged. html/body rules stay global (they are identical on every page).
export function splitTop(css) {
  const out = []; let i = 0; let start = 0; let depth = 0; let prelude = null;
  while (i < css.length) {
    const ch = css[i];
    if (ch === '/' && css[i + 1] === '*') { const e = css.indexOf('*/', i + 2); i = e < 0 ? css.length : e + 2; continue; }
    if (ch === '"' || ch === "'") { const q = ch; i++; while (i < css.length && css[i] !== q) i += css[i] === '\\' ? 2 : 1; i++; continue; }
    if (ch === '{') { if (depth === 0) { prelude = css.slice(start, i).trim(); start = i + 1; } depth++; }
    else if (ch === '}') { depth--; if (depth === 0) { out.push({ prelude, body: css.slice(start, i) }); start = i + 1; } }
    else if (ch === ';' && depth === 0) { out.push({ raw: css.slice(start, i + 1).trim() }); start = i + 1; }
    i++;
  }
  return out;
}
export function splitSelectors(s) {
  const out = []; let depth = 0; let cur = '';
  for (const ch of s) { if (ch === '(') depth++; if (ch === ')') depth--; if (ch === ',' && depth === 0) { out.push(cur.trim()); cur = ''; } else cur += ch; }
  if (cur.trim()) out.push(cur.trim());
  return out;
}
export function scopeCss(css, page) {
  const scope = `[data-page="${page}"]`;
  return splitTop(css.replace(/\/\*[\s\S]*?\*\//g, '')).map((b) => {
    if (b.raw) return b.raw;
    const p = b.prelude.replace(/\s+/g, ' ');
    if (/^@(media|supports|container)\b/.test(p)) return `${p}{\n${scopeCss(b.body, page)}\n}`;
    if (p.startsWith('@')) return `${p}{${b.body}}`;
    const sels = splitSelectors(p).map((s) => (/^(html|body|:root)\b/.test(s) ? s : `${scope} ${s}`));
    return `${sels.join(',')}{${b.body.trim()}}`;
  }).join('\n');
}

// ---------- parse5 tree helpers ----------
export const parse = (html) => parseFragment(html);
export const toHtml = (frag) => serialize(frag);
export const isEl = (n) => n && typeof n.tagName === 'string';
export const attr = (n, name) => n.attrs?.find((a) => a.name === name)?.value;
export const hasClass = (n, c) => (attr(n, 'class') || '').split(/\s+/).includes(c);
export function walk(node, fn, parent = null) {
  fn(node, parent);
  const kids = node.tagName === 'template' ? node.content.childNodes : node.childNodes;
  if (kids) for (const k of [...kids]) walk(k, fn, node);
}
export function textOf(node) {
  if (node.nodeName === '#text') return node.value;
  if (node.tagName === 'br') return ' ';
  return (node.childNodes || []).map(textOf).join('');
}
export function removeNode(node) {
  const p = node.parentNode; if (!p) return;
  p.childNodes.splice(p.childNodes.indexOf(node), 1);
}
export function nextElementSibling(node) {
  const sibs = node.parentNode.childNodes; let i = sibs.indexOf(node) + 1;
  while (i < sibs.length && !isEl(sibs[i])) i++;
  return sibs[i] || null;
}

// Apply the copy overrides to every text node of a fragment. Returns the list of applied overrides.
export function applyOverrides(frag, page, overrides) {
  const applied = [];
  walk(frag, (n) => {
    if (n.nodeName !== '#text') return;
    const t = norm(n.value); if (!t) return;
    for (const o of overrides) {
      if (o.page && o.page !== page) continue;
      const hit = o.onlyExact ? t === o.match : t.startsWith(o.match);
      if (!hit) continue;
      const lead = n.value.match(/^\s*/)[0]; const trail = n.value.match(/\s*$/)[0];
      n.value = lead + o.use + trail; applied.push(o.match); break;
    }
  });
  return applied;
}

// Remove the flag-off blocks of spec/seams.json; returns their HTML for the fragment files.
export function removeSeams(frag, page, seams) {
  const saved = [];
  for (const s of seams.removed.filter((x) => x.page === page)) {
    let found = null;
    walk(frag, (n) => {
      if (found || !isEl(n)) return;
      if (s.match.class && hasClass(n, s.match.class)) found = n;
      else if (s.match.text && norm(textOf(n)) === norm(s.match.text) && !(n.childNodes || []).some(isEl)) found = n;
    });
    if (!found) throw new Error(`seam not found on ${page}: ${JSON.stringify(s.match)}`);
    const nodes = [found]; if (s.withNextSibling) nodes.push(nextElementSibling(found));
    const holder = parse(''); holder.childNodes = nodes.map((x) => ({ ...x, parentNode: holder }));
    saved.push({ save: s.save, html: toHtml(holder) + '\n' });
    nodes.forEach(removeNode);
  }
  return saved;
}

// Point image sources at /images/<name>.
export function rewriteImages(frag, images) {
  walk(frag, (n) => {
    if (!isEl(n)) return;
    for (const a of n.attrs) {
      if (a.name !== 'src') continue;
      const m = a.value.match(/\/_blob\/([0-9a-f]{32})/);
      if (m && images[m[1]]) a.value = `/images/${images[m[1]]}`;
    }
  });
}

// Strip attributes the design runtime adds.
export const RUNTIME_ATTRS = ['data-dc-tpl', 'data-sc-name', 'data-probe'];
export function stripRuntime(frag) {
  walk(frag, (n) => {
    if (n.nodeName === '#comment') { removeNode(n); return; }
    if (!isEl(n)) return;
    if (['script', 'style'].includes(n.tagName)) { removeNode(n); return; }
    n.attrs = n.attrs.filter((a) => !RUNTIME_ATTRS.includes(a.name));
  });
  // Unwrap the runtime's interpolation spans (<span class="sc-interp">€149</span> -> €149) and merge text.
  walk(frag, (n) => {
    if (!isEl(n) || n.tagName !== 'span' || !(attr(n, 'class') || '').split(/\s+/).some((c) => c.startsWith('sc-'))) return;
    const p = n.parentNode; const i = p.childNodes.indexOf(n);
    const kids = n.childNodes.map((k) => ({ ...k, parentNode: p }));
    p.childNodes.splice(i, 1, ...kids);
  });
  walk(frag, (n) => {
    if (!n.childNodes) return;
    const out = [];
    for (const k of n.childNodes) {
      const last = out[out.length - 1];
      if (k.nodeName === '#text' && last && last.nodeName === '#text') last.value += k.value; else out.push(k);
    }
    n.childNodes = out;
  });
}

// Where a link of the design goes in the site (spec/links.json, then *.dc.html -> route). Shared by html-to-jsx and the docs.
export function linkTarget(page, text, href, rules, routeOf) {
  const rule = rules.find((r) => (!r.page || r.page === page) && norm(r.text) === norm(text) && (!r.fromHref || r.fromHref === href));
  if (rule) return rule.href;
  if (routeOf[href]) return routeOf[href];
  if (/\.dc\.html(#.*)?$/.test(href)) return (routeOf[href.split('#')[0]] || '/') + (href.includes('#') ? '#' + href.split('#')[1] : '');
  return href;
}
