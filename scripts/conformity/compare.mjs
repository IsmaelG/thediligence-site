// Pure comparison functions of the gate (no browser, no file access). Unit-testable.
import { norm } from './lib.mjs';

const px = (v) => (v === 'normal' ? 0 : parseFloat(v));
const lineHeight = (v, fs) => (v === 'normal' ? 1.2 * parseFloat(fs) : parseFloat(v));

// Pair each reference run with the candidate run of the same normalised text, in document order.
export function matchRuns(refRuns, candRuns) {
  const queues = new Map();
  for (const c of candRuns) { const k = norm(c.text); if (!queues.has(k)) queues.set(k, []); queues.get(k).push(c); }
  return refRuns.map((r) => [r, queues.get(norm(r.text))?.shift() || null]);
}

export function typographyDiffs(r, c, tol) {
  const d = [];
  if (norm(r.ff) !== norm(c.ff)) d.push(['font-family', r.ff, c.ff]);
  if (Math.abs(parseFloat(r.fs) - parseFloat(c.fs)) > tol.fontSizePx) d.push(['font-size', r.fs, c.fs]);
  if (String(r.fw) !== String(c.fw)) d.push(['font-weight', r.fw, c.fw]);
  if (r.fst !== c.fst) d.push(['font-style', r.fst, c.fst]);
  if (r.color !== c.color) d.push(['color', r.color, c.color]);
  if (r.tt !== c.tt) d.push(['text-transform', r.tt, c.tt]);
  if (Math.abs(px(r.ls) - px(c.ls)) > tol.letterSpacingPx) d.push(['letter-spacing', r.ls, c.ls]);
  if (Math.abs(lineHeight(r.lh, r.fs) - lineHeight(c.lh, c.fs)) > tol.lineHeightPx) d.push(['line-height', r.lh, c.lh]);
  return d;
}

export function positionOk(r, c, tol) {
  const [rx, , rw] = r.rect; const [cx, , cw] = c.rect;
  return Math.abs(rx - cx) <= tol.xPx && Math.abs(rw - cw) <= Math.max(tol.widthPx, tol.widthRatio * rw);
}

export function compareText(ref, cand, tol) {
  const pairs = matchRuns(ref.text, cand.text);
  const matched = pairs.filter(([, c]) => c);
  const missing = pairs.filter(([, c]) => !c).map(([r]) => r.text);
  const typo = []; let typoOk = 0; let posOk = 0; const pos = [];
  for (const [r, c] of matched) {
    const d = typographyDiffs(r, c, tol);
    if (d.length === 0) typoOk += 1; else typo.push({ text: r.text.slice(0, 60), diffs: d });
    if (positionOk(r, c, tol)) posOk += 1; else pos.push({ text: r.text.slice(0, 60), ref: r.rect, cand: c.rect });
  }
  const n = matched.length || 1;
  return {
    G1: matched.length / (ref.text.length || 1), G2: matched.length ? typoOk / n : 0, G3: matched.length ? posOk / n : 0,
    missing, typography: typo, position: pos,
  };
}

export function compareBoxes(ref, cand) {
  const queues = new Map();
  for (const b of cand.boxes) { const k = `${b.tag}|${norm(b.key)}`; if (!queues.has(k)) queues.set(k, []); queues.get(k).push(b); }
  let ok = 0; const diffs = [];
  for (const r of ref.boxes) {
    const c = queues.get(`${r.tag}|${norm(r.key)}`)?.shift();
    if (!c) { diffs.push({ key: r.key || `(${r.tag}, no text)`, issue: 'missing' }); continue; }
    const d = [];
    if (r.bg !== c.bg) d.push(['background', r.bg, c.bg]);
    if (r.r !== c.r) d.push(['radius', r.r, c.r]);
    if (Boolean(r.sh) !== Boolean(c.sh)) d.push(['shadow', r.sh || 'none', c.sh || 'none']);
    if (d.length) diffs.push({ key: r.key || `(${r.tag}, no text)`, diffs: d }); else ok += 1;
  }
  return { G4: ok / (ref.boxes.length || 1), boxes: diffs };
}

export function compareShape(ref, cand, th) {
  const dh = (cand.docH - ref.docH) / ref.docH;
  return {
    G5: Math.abs(dh) <= th.G5_heightTolerance && cand.docW <= ref.docW,
    heightDelta: dh, overflow: Math.max(0, cand.docW - ref.docW),
    G6: cand.sections.length === ref.sections.length, sections: [ref.sections.length, cand.sections.length],
  };
}

// G8 for one control: the section after the click must resemble the reference (Jaccard on word sets) AND show
// the words the click adds in the reference, and no longer show the words it removes (a price symbol, an answer).
export function behaviourScore(ref, candAfter, minJaccard) {
  const words = (s) => new Set(norm(s).split(' ').filter(Boolean));
  const before = words(ref.textBefore || ''); const after = words(ref.textAfter); const got = words(candAfter);
  const added = [...after].filter((w) => !before.has(w)); const removed = [...before].filter((w) => !after.has(w));
  const missingAdded = added.filter((w) => !got.has(w)); const stillThere = removed.filter((w) => got.has(w));
  const j = jaccard(ref.textAfter, candAfter);
  return { score: j, missingAdded, stillThere, ok: j >= minJaccard && !missingAdded.length && !stillThere.length };
}

export function jaccard(a, b) {
  const A = new Set(norm(a).split(' ').filter(Boolean)); const B = new Set(norm(b).split(' ').filter(Boolean));
  if (!A.size && !B.size) return 1;
  let inter = 0; for (const x of A) if (B.has(x)) inter += 1;
  return inter / (A.size + B.size - inter);
}
