// html-to-jsx.mjs — turn a golden markup file (spec/markup/<Page>.html) into a React Server Component.
// Usage: node html-to-jsx.mjs spec/markup/Main.html app/(site)/page.tsx PageName
// Mechanical only: class -> className, style string -> object, SVG attributes camelCased, links *.dc.html -> routes.
// It never changes a class name, a text or the order of elements. Behaviour (tabs, accordions, forms) is added afterwards by hand, see docs/UI-SPEC.md §Interactions.
import fs from 'node:fs';
import { parseFragment } from 'parse5';
const ROUTES = { 'Main.dc.html': '/', 'Products.dc.html': '/products', 'Solutions.dc.html': '/solutions', 'Method.dc.html': '/method', 'Platform.dc.html': '/platform', 'Security.dc.html': '/security', 'About.dc.html': '/about', 'Insights.dc.html': '/insights', 'Book.dc.html': '/book', 'Logos.dc.html': '/logos' };
const ATTR = { class: 'className', for: 'htmlFor', novalidate: 'noValidate', autocomplete: 'autoComplete', colspan: 'colSpan', rowspan: 'rowSpan', tabindex: 'tabIndex', maxlength: 'maxLength', readonly: 'readOnly', 'fill-rule': 'fillRule', 'clip-rule': 'clipRule', 'stroke-width': 'strokeWidth', 'stroke-linecap': 'strokeLinecap', 'stroke-linejoin': 'strokeLinejoin', 'stroke-dasharray': 'strokeDasharray', 'stroke-dashoffset': 'strokeDashoffset', 'stroke-opacity': 'strokeOpacity', 'fill-opacity': 'fillOpacity', 'stop-color': 'stopColor', 'stop-opacity': 'stopOpacity', viewbox: 'viewBox', preserveaspectratio: 'preserveAspectRatio', 'xlink:href': 'xlinkHref', 'text-anchor': 'textAnchor', 'font-size': 'fontSize', 'font-family': 'fontFamily', 'font-weight': 'fontWeight', 'letter-spacing': 'letterSpacing' };
const BOOL = new Set(['novalidate', 'readonly', 'disabled', 'checked', 'required', 'hidden', 'autofocus', 'multiple', 'selected', 'focusable']);
const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
const camel = s => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
const styleObj = css => '{' + css.split(';').map(x => x.trim()).filter(Boolean).map(x => { const i = x.indexOf(':'); const k = x.slice(0, i).trim(); const v = x.slice(i + 1).trim(); const key = k.startsWith('--') ? JSON.stringify(k) : camel(k); return `${key}:${JSON.stringify(v)}`; }).join(',') + '}';
const esc = t => t.replace(/[{}<>]/g, c => `{${JSON.stringify(c)}}`);
function attrs(node) {
  const out = [];
  for (const a of node.attrs) {
    if (a.name === 'data-dc-tpl') continue;
    let name = ATTR[a.name] || a.name; let val = a.value;
    if (a.name === 'style') { out.push(`style={${styleObj(val)}}`); continue; }
    if (a.name === 'href' && ROUTES[val.split('#')[0]] !== undefined) val = ROUTES[val.split('#')[0]] + (val.includes('#') ? '#' + val.split('#')[1] : '');
    if (a.name === 'value' && node.nodeName === 'input') name = 'defaultValue';
    if (BOOL.has(a.name) && (val === '' || val === a.name)) { out.push(name); continue; }
    if (name.startsWith('aria-') || name.startsWith('data-') || !name.includes('-')) out.push(`${name}=${JSON.stringify(val)}`);
    else out.push(`${camel(name)}=${JSON.stringify(val)}`);
  }
  return out.length ? ' ' + out.join(' ') : '';
}
function node(n, d) {
  if (n.nodeName === '#text') { const t = n.value; return t.trim() === '' && t.includes('\n') ? '' : esc(t); }
  if (n.nodeName === '#comment') return '';
  const tag = n.nodeName; const kids = (n.content ? n.content.childNodes : n.childNodes) || [];
  if (VOID.has(tag) || (!kids.length && n.namespaceURI && n.namespaceURI.endsWith('svg') && tag !== 'svg' && !['g', 'defs', 'symbol', 'text'].includes(tag))) return `<${tag}${attrs(n)} />`;
  return `<${tag}${attrs(n)}>${kids.map(k => node(k, d + 1)).join('')}</${tag}>`;
}
export function convert(html, name = 'Page') {
  const frag = parseFragment(html);
  const body = frag.childNodes.map(c => node(c, 0)).join('\n');
  return `// Generated from spec/markup by scripts/html-to-jsx.mjs. Do not restyle: change the markup in spec/ first.\nexport default function ${name}() {\n  return (\n    <>\n${body}\n    </>\n  );\n}\n`;
}
if (process.argv[1] && process.argv[1].endsWith('html-to-jsx.mjs') && process.argv[2]) {
  const [, , src, out, name] = process.argv;
  fs.mkdirSync(out.replace(/\/[^/]*$/, '') || '.', { recursive: true });
  fs.writeFileSync(out, convert(fs.readFileSync(src, 'utf8'), name || 'Page'));
  console.log('wrote', out);
}
