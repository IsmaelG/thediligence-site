// compare.mjs — reference redline vs candidate redline. Pure functions, no browser.
const n = s => s.toLowerCase().replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, ' ').trim();
const num = v => parseFloat(v) || 0; const col = c => (c || '').replace(/\s/g, '');
export function compareRedline(ref, got, T) {
  const pool = new Map(); got.text.forEach(t => { const k = n(t.text); (pool.get(k) || pool.set(k, []).get(k)).push(t); });
  const used = new Set(); const out = { missing: [], style: [], pos: [], matched: 0 };
  for (const t of ref.text) {
    const k = n(t.text); let m = (pool.get(k) || []).find(x => !used.has(x));
    if (!m) { out.missing.push(t.text.slice(0, 90)); continue; }
    used.add(m); out.matched++;
    const d = [];
    if (t.ff !== m.ff) d.push(`font ${t.ff} -> ${m.ff}`);
    if (Math.abs(num(t.fs) - num(m.fs)) > 0.5) d.push(`size ${t.fs} -> ${m.fs}`);
    if (t.fw !== m.fw) d.push(`weight ${t.fw} -> ${m.fw}`);
    if (t.fst !== m.fst) d.push(`style ${t.fst} -> ${m.fst}`);
    if (col(t.color) !== col(m.color)) d.push(`color ${t.color} -> ${m.color}`);
    if (t.tt !== m.tt) d.push(`transform ${t.tt} -> ${m.tt}`);
    if (t.ls !== 'normal' && m.ls !== 'normal' && Math.abs(num(t.ls) - num(m.ls)) > 0.3) d.push(`tracking ${t.ls} -> ${m.ls}`);
    if (t.lh !== 'normal' && m.lh !== 'normal' && Math.abs(num(t.lh) - num(m.lh)) > 1.5) d.push(`leading ${t.lh} -> ${m.lh}`);
    if (d.length) out.style.push({ text: t.text.slice(0, 60), d });
    const dx = Math.abs(t.rect[0] - m.rect[0]), dw = Math.abs(t.rect[2] - m.rect[2]);
    if (dx > T.position.xTolPx || dw > Math.max(T.position.widthTolPx, t.rect[2] * T.position.widthTolPct / 100)) out.pos.push({ text: t.text.slice(0, 60), ref: t.rect.slice(0, 3), got: m.rect.slice(0, 3) });
  }
  const bp = new Map(); got.boxes.forEach(b => { const k = n(b.key); (bp.get(k) || bp.set(k, []).get(k)).push(b); });
  let bt = 0, bok = 0; const bd = [];
  for (const b of ref.boxes) { if (!b.key) continue; bt++; const m = (bp.get(n(b.key)) || []).shift(); if (!m) { bd.push(`${b.key.slice(0, 40)}: absent`); continue; }
    const e = []; if (col(b.bg) !== col(m.bg)) e.push(`bg ${b.bg} -> ${m.bg}`); if (b.r !== m.r) e.push(`radius ${b.r} -> ${m.r}`); if ((b.sh ? 1 : 0) !== (m.sh ? 1 : 0)) e.push(`shadow ${b.sh ? 'yes' : 'no'} -> ${m.sh ? 'yes' : 'no'}`);
    if (!e.length) bok++; else bd.push(`${b.key.slice(0, 40)}: ${e.join(', ')}`); }
  const pct = (a, b) => b ? Math.round(1000 * a / b) / 10 : 100;
  const r = {
    coveragePct: pct(ref.text.length - out.missing.length, ref.text.length),
    stylePct: pct(out.matched - out.style.length, out.matched),
    positionPct: pct(out.matched - out.pos.length, out.matched),
    boxesPct: pct(bok, bt),
    heightDiffPct: Math.round(1000 * (got.docH - ref.docH) / ref.docH) / 10,
    overflowX: Math.max(0, got.docW - ref.docW),
    sections: { ref: ref.sections.length, got: got.sections.length },
    missing: out.missing, style: out.style, pos: out.pos, boxDiffs: bd
  };
  r.fails = [];
  if (r.coveragePct < T.text.minCoveragePct) r.fails.push(`text coverage ${r.coveragePct}% < ${T.text.minCoveragePct}%`);
  if (r.stylePct < T.style.minExactPct) r.fails.push(`typography exact ${r.stylePct}% < ${T.style.minExactPct}%`);
  if (r.positionPct < T.position.minOkPct) r.fails.push(`position ${r.positionPct}% < ${T.position.minOkPct}%`);
  if (r.boxesPct < T.boxes.minExactPct) r.fails.push(`boxes ${r.boxesPct}% < ${T.boxes.minExactPct}%`);
  if (Math.abs(r.heightDiffPct) > T.height.maxDiffPct) r.fails.push(`page height ${r.heightDiffPct}% (limit ${T.height.maxDiffPct}%)`);
  if (r.overflowX > T.overflowX.maxPx) r.fails.push(`horizontal overflow ${r.overflowX}px`);
  if (T.sections.mustEqual && r.sections.ref !== r.sections.got) r.fails.push(`sections ${r.sections.got} vs ${r.sections.ref}`);
  return r;
}
export const similarity = (a, b) => { const A = new Set(n(a).split(' ')), B = new Set(n(b).split(' ')); let i = 0; A.forEach(x => B.has(x) && i++); return A.size + B.size - i ? i / (A.size + B.size - i) : 1; };
