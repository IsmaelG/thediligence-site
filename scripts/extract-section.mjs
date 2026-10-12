// extract-section.mjs — extract a <section id="..."> block from a golden HTML file.
// Usage: node scripts/extract-section.mjs spec/markup/Solutions.html fit
// Outputs the OUTER HTML of <section id="fit"> to stdout.
import fs from 'node:fs';
import { parseFragment } from 'parse5';

const [, , src, id] = process.argv;
if (!src || !id) { console.error('Usage: node extract-section.mjs <file> <id>'); process.exit(1); }

const html = fs.readFileSync(src, 'utf8');
const frag = parseFragment(html);

function serialize(node) {
  if (node.nodeName === '#text') return node.value;
  if (node.nodeName === '#comment') return '';
  const kids = (node.content ? node.content.childNodes : node.childNodes) || [];
  const attrs = (node.attrs || []).map(a => ` ${a.name}="${a.value.replace(/"/g, '&quot;')}"`).join('');
  const inner = kids.map(serialize).join('');
  return `<${node.nodeName}${attrs}>${inner}</${node.nodeName}>`;
}

function find(node, targetId) {
  if (node.attrs && node.attrs.some(a => a.name === 'id' && a.value === targetId)) return node;
  for (const child of (node.childNodes || [])) {
    const found = find(child, targetId);
    if (found) return found;
  }
  return null;
}

const root = { childNodes: frag.childNodes };
const sec = find(root, id);
if (!sec) { console.error(`Section #${id} not found in ${src}`); process.exit(1); }
process.stdout.write(serialize(sec));
