// measure.cjs — runs inside the page. Returns a "redline": every text run with its typography and rectangle,
// every decorated box, and the page sections. Elements marked data-conformity-skip are removed first.
module.exports = function measure() {
  document.querySelectorAll('[data-conformity-skip]').forEach(e => { e.style.display = 'none'; });
  const norm = s => s.replace(/\s+/g, ' ').trim();
  const R = e => { const r = e.getBoundingClientRect(); return [Math.round(r.left + scrollX), Math.round(r.top + scrollY), Math.round(r.width), Math.round(r.height)]; };
  const vis = e => { const c = getComputedStyle(e); const r = e.getBoundingClientRect(); return c.display !== 'none' && c.visibility !== 'hidden' && r.width > 0 && r.height > 0; };
  const T = [], B = [], S = [];
  document.querySelectorAll('body header, main > *, body footer').forEach((s, i) => { if (!vis(s)) return; const c = getComputedStyle(s); S.push({ i, tag: s.tagName.toLowerCase(), rect: R(s), bg: c.backgroundColor, pt: c.paddingTop, pb: c.paddingBottom, text: norm(s.innerText).slice(0, 60) }); });
  const walk = e => {
    if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'SVG', 'PATH'].includes(e.tagName.toUpperCase())) return;
    if (!vis(e)) return;
    const c = getComputedStyle(e);
    const own = norm([...e.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent).join(' '));
    if (own) T.push({ tag: e.tagName.toLowerCase(), text: own.slice(0, 140), rect: R(e), ff: c.fontFamily.split(',')[0].replace(/["']/g, ''), fs: c.fontSize, fw: c.fontWeight, fst: c.fontStyle, lh: c.lineHeight, ls: c.letterSpacing, color: c.color, tt: c.textTransform, ta: c.textAlign });
    const hasBox = c.backgroundColor !== 'rgba(0, 0, 0, 0)' || parseFloat(c.borderTopWidth) > 0 || parseFloat(c.borderBottomWidth) > 0 || c.boxShadow !== 'none';
    if (hasBox && e !== document.body && e !== document.documentElement) B.push({ tag: e.tagName.toLowerCase(), key: norm(e.innerText).slice(0, 60), rect: R(e), bg: c.backgroundColor, bd: c.borderTopWidth + ' ' + c.borderTopStyle + ' ' + c.borderTopColor, bdb: c.borderBottomWidth, r: c.borderRadius, sh: c.boxShadow === 'none' ? '' : c.boxShadow.slice(0, 60), pad: c.padding, gap: c.gap });
    [...e.children].forEach(walk);
  };
  walk(document.body);
  return { title: document.title, docH: document.documentElement.scrollHeight, docW: document.documentElement.scrollWidth, sections: S, text: T, boxes: B };
};
