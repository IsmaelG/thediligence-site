#!/usr/bin/env python3
"""WCAG 2.x contrast audit for tokens.css.

Usage:  python3 scripts/contrast.py [path/to/tokens.css] > contrast-report.md   (default: docs/tokens.css, then tokens.css next to the script)
Reads the light and dark token sets from tokens.css (resolving var() chains), then computes the
contrast ratio of every text/background and graphic/background pair that the components use.
Thresholds: N = normal text 4.5, L = large text 3, U = graphical object or UI boundary 3 (WCAG 1.4.11),
D = decorative or aria-hidden (reported, never failed).
Exit code 1 if any token pair fails in either theme (CI-friendly).
"""
import re
import sys
import os

HERE = os.path.dirname(os.path.abspath(__file__))
_DEFAULTS = [os.path.join(HERE, '..', 'docs', 'tokens.css'), os.path.join(HERE, 'tokens.css')]
SRC = sys.argv[1] if len(sys.argv) > 1 else next((p for p in _DEFAULTS if os.path.exists(p)), _DEFAULTS[0])
NEED = {'N': 4.5, 'L': 3.0, 'U': 3.0, 'D': 0.0}


# ---------- colour maths ----------
def hx(c):
    c = c.strip().lstrip('#')
    if len(c) == 3:
        c = ''.join(ch * 2 for ch in c)
    return tuple(int(c[i:i + 2], 16) for i in (0, 2, 4))


def lin(v):
    v /= 255
    return v / 12.92 if v <= 0.03928 else ((v + 0.055) / 1.055) ** 2.4


def lum(c):
    r, g, b = hx(c)
    return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)


def ratio(a, b):
    la, lb = lum(a), lum(b)
    if la < lb:
        la, lb = lb, la
    return (la + 0.05) / (lb + 0.05)


def blend(fg, bg, a):
    f, b = hx(fg), hx(bg)
    return '#%02X%02X%02X' % tuple(round(f[i] * a + b[i] * (1 - a)) for i in range(3))


# ---------- token parsing ----------
css = open(SRC).read()
css = re.sub(r'/\*.*?\*/', '', css, flags=re.S)


def decls(block):
    return dict(re.findall(r'--([a-z0-9-]+)\s*:\s*([^;]+);', block))


def grab(start_pat):
    """return the text between the braces that follow start_pat (balanced)"""
    m = re.search(start_pat, css)
    i = css.index('{', m.end() - 1)
    depth, j = 0, i
    while True:
        if css[j] == '{':
            depth += 1
        elif css[j] == '}':
            depth -= 1
            if depth == 0:
                return css[i + 1:j]
        j += 1


root = decls(grab(r'(?m)^:root\{'))
dark_media = grab(r'@media \(prefers-color-scheme:dark\)\{')
dark = decls(dark_media)
dark_forced = decls(grab(r':root\[data-theme="dark"\]\{'))
assert dark == dark_forced, 'the two dark blocks differ'

LIGHT = dict(root)
DARK = dict(root)
DARK.update(dark)


def resolve(name, theme, depth=0):
    v = theme[name].strip()
    m = re.fullmatch(r'var\(--([a-z0-9-]+)\)', v)
    if m and depth < 10:
        return resolve(m.group(1), theme, depth + 1)
    return v


def val(x, theme):
    """x is 't:name' (token) or '#hex'"""
    if x.startswith('t:'):
        return resolve(x[2:], theme)
    return x


# ---------- token pairs (fg, bg, size, use, source) ----------
T = [
    ('Page', None),
    ('fg on bg', 't:fg', 't:bg', 'N', 'body text', 'base.css:9'),
    ('fg2 on bg', 't:fg2', 't:bg', 'N', '.lead, .body', 'base.css:27,28'),
    ('mut on bg', 't:mut', 't:bg', 'N', '.eyebrow, .small, .tiny, footer, .legend', 'base.css:21,29,30'),
    ('fg on bg2', 't:fg', 't:bg2', 'N', '.alt sections, current nav link', 'base.css:16,82'),
    ('fg2 on bg2', 't:fg2', 't:bg2', 'N', 'body copy in .alt, .st-plan', 'base.css:16, ui.css:196'),
    ('mut on bg2', 't:mut', 't:bg2', 'N', 'eyebrow in .alt, .cmp .grp', 'ui.css:391'),
    ('fg on surf', 't:fg', 't:surf', 'N', 'card text, inputs', 'base.css:94,169'),
    ('fg2 on surf', 't:fg2', 't:surf', 'N', '.body in cards, .tbl td', 'base.css:162'),
    ('mut on surf', 't:mut', 't:surf', 'N', '.lay .lw, gr-c, small in cards', 'ui.css:522, base.css:109'),
    ('fg on surf2', 't:fg', 't:surf2', 'N', 'rail panels', 'DERIVED'),
    ('mut on surf2', 't:mut', 't:surf2', 'N', 'rail captions, tabs', 'DERIVED'),
    ('blue-t on bg', 't:blue-t', 't:bg', 'N', '.bt, text links in blue', 'base.css:31'),
    ('blue-t on surf', 't:blue-t', 't:surf', 'N', '.tr b, .md a', 'ui.css:102,146'),
    ('orange-t on bg', 't:orange-t', 't:bg', 'N', '.ot, form error text', 'base.css:31, Book.html:32'),
    ('orange-t on surf', 't:orange-t', 't:surf', 'N', '.bk-no .bk-k, .never .x', 'ui.css:430-442'),
    ('green-t on bg', 't:green-t', 't:bg', 'N', '.gt, .tbl .yes', 'base.css:31,164'),
    ('green-t on bg2', 't:green-t', 't:bg2', 'N', '.cmp .yes in .alt', 'base.css:164'),
    ('green-t on surf', 't:green-t', 't:surf', 'U', '.chk .ic check icons', 'base.css:103'),
    ('Buttons and inverse surface', None),
    ('inv-fg on inv-bg', 't:inv-fg', 't:inv-bg', 'N', '.btn-p, verdict word, skip link', 'base.css:54'),
    ('inv-fg on btn-p-hover', 't:inv-fg', 't:btn-p-hover', 'N', '.btn-p:hover', 'base.css:55,60'),
    ('btn-s-bd on bg', 't:btn-s-bd', 't:bg', 'U', '.btn-s border', 'base.css:56,61'),
    ('inv-fg2 on inv-bg', 't:inv-fg2', 't:inv-bg', 'N', '.door-dark .body, .fl-key .small', 'ui.css:75,170'),
    ('inv-mut on inv-bg', 't:inv-mut', 't:inv-bg', 'N', '.verdict .lab, .v-d', 'ui.css:85,88'),
    ('inv-line on inv-bg', 't:inv-line', 't:inv-bg', 'U', 'outline button on inverse surface', 'ui.css:172'),
    ('Tones, washes, grades', None),
    ('tn-green fg on bg', 't:tn-green-fg', 't:tn-green-bg', 'N', '.st-live, conf-high, .ok, .who-t', 'ui.css:194,95'),
    ('tn-amber fg on bg', 't:tn-amber-fg', 't:tn-amber-bg', 'N', '.st-build, conf-medium', 'ui.css:195,96'),
    ('tn-orange fg on bg', 't:tn-orange-fg', 't:tn-orange-bg', 'N', 'conf-low, .n-tag, .who-p', 'ui.css:97'),
    ('tn-blue fg on bg', 't:tn-blue-fg', 't:tn-blue-bg', 'N', '.ch-b Running, .who', 'base.css:140'),
    ('mut on bg2 (st-plan border)', 't:mut', 't:bg2', 'U', '.st-plan dashed border', 'ui.css:196'),
    ('fg on wash-warn', 't:fg', 't:wash-warn-bg', 'N', 'gate title, banner, new ledger row', 'ui.css:52,130,134'),
    ('mut on wash-warn', 't:mut', 't:wash-warn-bg', 'N', '.gate-t span', 'ui.css:57'),
    ('fg on wash-stale', 't:fg', 't:wash-stale-bg', 'N', 'stale ledger row, .stk .st', 'ui.css:131,140'),
    ('mut on wash-stale', 't:mut', 't:wash-stale-bg', 'N', '.stk .mut', 'ui.css:138'),
    ('fg on wash-ok', 't:fg', 't:wash-ok-bg', 'N', 'banner-g, .stk .ok', 'ui.css:135,141'),
    ('tn-green fg on wash-ok', 't:tn-green-fg', 't:wash-ok-bg', 'N', '.lock', 'ui.css:147'),
    ('gr-a-fg on fg', 't:gr-a-fg', 't:fg', 'N', '.gr-a chip', 'base.css:108,110'),
    ('fg2 on chip', 't:fg2', 't:chip', 'N', '.src, .ch', 'base.css:112,139'),
    ('Graphics and boundaries', None),
    ('blue on bg', 't:blue', 't:bg', 'U', 'line dot, stn, bar', 'base.css:115'),
    ('orange on bg', 't:orange', 't:bg', 'U', 'line dot, stn, meter marker', 'base.css:116'),
    ('green on bg', 't:green', 't:bg', 'U', 'line dot, stn', 'base.css:116'),
    ('blue on surf', 't:blue', 't:surf', 'U', 'agent bars on cards', 'ui.css:21'),
    ('orange on surf', 't:orange', 't:surf', 'U', 'agent bars on cards', 'ui.css:24'),
    ('green on surf', 't:green', 't:surf', 'U', 'agent bars on cards', 'ui.css:26'),
    ('amber on bg', 't:amber', 't:bg', 'U', '.rd.n rule and dot (stale, Next)', 'ui.css:396,416'),
    ('amber on surf', 't:amber', 't:surf', 'U', 'stale dot in a card', 'DERIVED'),
    ('mut on bg (idle dot)', 't:mut', 't:bg', 'U', 'idle / planned dot', 'DERIVED'),
    ('focus on bg', 't:focus', 't:bg', 'U', 'focus ring on page', 'base.css:65'),
    ('focus on bg2', 't:focus', 't:bg2', 'U', 'focus ring on alt section', 'base.css:65'),
    ('focus on surf', 't:focus', 't:surf', 'U', 'focus ring inside cards', 'base.css:65'),
    ('focus on surf2', 't:focus', 't:surf2', 'U', 'focus ring in rail', 'DERIVED'),
    ('line-ui on bg', 't:line-ui', 't:bg', 'U', 'input and control border', 'base.css:169'),
    ('line-ui on surf', 't:line-ui', 't:surf', 'U', 'input border inside a card', 'base.css:169'),
    ('line on surf (card edge)', 't:line', 't:surf', 'D', 'card border: decorative, text carries the meaning', 'base.css:94'),
    ('sw-knob on sw-off', 't:sw-knob', 't:sw-off', 'U', 'switch knob on the off track', 'base.css:155,156'),
    ('sw-knob on sw-on', 't:sw-knob', 't:sw-on', 'U', 'switch knob on the on track', 'base.css:157'),
    ('sw-off on surf', 't:sw-off', 't:surf', 'U', 'switch track against its panel', 'base.css:155'),
    ('fg on track (meter)', 't:fg', 't:track', 'U', 'meter and bar fill on its track', 'ui.css:60,61'),
    ('ev-a on bg2', 't:ev-a', 't:bg2', 'D', 'evidence bar A (aria-hidden, legend carries the numbers)', 'ui.css:524,526'),
    ('ev-b on bg2', 't:ev-b', 't:bg2', 'D', 'evidence bar B (aria-hidden)', 'ui.css:524,527'),
    ('ev-b on ev-c1', 't:ev-b', 't:ev-c1', 'D', 'B segment against the C stripe (aria-hidden)', 'ui.css:527,528'),
    ('Terminal (always dark)', None),
    ('term-fg on term-bg', 't:term-fg', 't:term-bg', 'N', '.term body', 'ui.css:273'),
    ('term-mut on term-bg', 't:term-mut', 't:term-bg', 'N', '.term .out', 'ui.css:279'),
    ('term-acc on term-bg', 't:term-acc', 't:term-bg', 'N', '.term b (command)', 'ui.css:278'),
    ('term-mut on term-bar', 't:term-mut', 't:term-bar', 'N', '.term-bar span', 'ui.css:276'),
]

# ---------- literal pairs as hard-coded in the CSS today (always-light product window and others) ----------
# (label, fg, bg, size, source, recommended fg token, recommended bg token)  alpha pairs use ('alpha', a)
L = [
    ('.app text', '#15171C', '#F2F3EF', 'N', 'base.css:119', 'fg', 'bg'),
    ('.app-bar title and note', '#555B66', '#E8EAE4', 'N', 'base.css:124,125', 'mut', 'bg2'),
    ('.app-side .lab (10px mono)', '#6A7079', '#ECEEE8', 'N', 'base.css:129', 'mut', 'bg2'),
    ('.app-side item', '#2A2E36', '#ECEEE8', 'N', 'base.css:130', 'fg', 'bg2'),
    ('.app-side .on item', '#2A2E36', '#FFFFFF', 'N', 'base.css:130,131', 'fg', 'surf'),
    ('.n-tag "Needs you" (10.5px)', '#8B3D00', '#FBE9D9', 'N', 'ui.css:38', 'tn-orange-fg', 'tn-orange-bg'),
    ('.app .mut on window', '#5A606A', '#F2F3EF', 'N', 'base.css:136', 'mut', 'bg'),
    ('.app .mut on rail', '#5A606A', '#F7F8F4', 'N', 'base.css:134,136', 'mut', 'surf2'),
    ('.app .mut on panel', '#5A606A', '#FFFFFF', 'N', 'base.css:138,136', 'mut', 'surf'),
    ('.app .lab on window (10.5px mono)', '#6A7079', '#F2F3EF', 'N', 'base.css:137', 'mut', 'bg'),
    ('.app .lab on panel', '#6A7079', '#FFFFFF', 'N', 'base.css:137,138', 'mut', 'surf'),
    ('.app .lab on rail', '#6A7079', '#F7F8F4', 'N', 'base.css:137,134', 'mut', 'surf2'),
    ('.app .ch', '#2A2E36', '#E7E9E3', 'N', 'base.css:139', 'fg2', 'chip'),
    ('.ch-b Running', '#1B3F94', '#E3EBFA', 'N', 'base.css:140', 'tn-blue-fg', 'tn-blue-bg'),
    ('.ch-g', '#0B5B3C', '#DFF1E8', 'N', 'base.css:140', 'tn-green-fg', 'tn-green-bg'),
    ('.ch-o', '#8B3D00', '#FBE9D9', 'N', 'base.css:140', 'tn-orange-fg', 'tn-orange-bg'),
    ('.ch-k, .btn-a', '#FFFFFF', '#15171C', 'N', 'base.css:140,141', 'inv-fg', 'inv-bg'),
    ('.btn-a.o', '#15171C', '#FFFFFF', 'N', 'base.css:142', 'fg', 'surf'),
    ('.tabs inactive', '#5A606A', '#F7F8F4', 'N', 'base.css:144', 'mut', 'surf2'),
    ('.seg button', '#3A3F47', '#FFFFFF', 'N', 'base.css:147', 'fg2', 'surf'),
    ('.app th (10.5px mono)', '#6A7079', '#F2F3EF', 'N', 'base.css:152', 'mut', 'bg'),
    ('.ag-n .mono (10.5px)', '#6A7079', '#F2F3EF', 'N', 'ui.css:45', 'mut', 'bg'),
    ('.ag-t', '#4A505A', '#F2F3EF', 'N', 'ui.css:47', 'fg2', 'bg'),
    ('.ag.wait name, opacity .55', ('alpha', '#15171C', '#F2F3EF', .55), '#F2F3EF', 'N', 'ui.css:49', 'mut', 'bg'),
    ('.ag.wait sublabel, opacity .55', ('alpha', '#6A7079', '#F2F3EF', .55), '#F2F3EF', 'N', 'ui.css:45,49', 'mut', 'bg'),
    ('.gate-t span', '#5A606A', '#FFF6E8', 'N', 'ui.css:57', 'mut', 'wash-warn-bg'),
    ('.gate-t b', '#15171C', '#FFF6E8', 'N', 'ui.css:56', 'fg', 'wash-warn-bg'),
    ('.gate-i icon on orange', '#FFFFFF', '#D9640F', 'U', 'ui.css:53', 'bg', 'orange'),
    ('.meter-l (10.5px)', '#6A7079', '#FFFFFF', 'N', 'ui.css:62', 'mut', 'surf'),
    ('.meter-l estimate in orange (10.5px)', '#D9640F', '#FFFFFF', 'N', 'ui.css:237', 'orange-t', 'surf'),
    ('.verdict .lab', '#9AA1AB', '#15171C', 'N', 'ui.css:85', 'inv-mut', 'inv-bg'),
    ('.v-n', '#DDE0E4', '#15171C', 'N', 'ui.css:87', 'inv-fg2', 'inv-bg'),
    ('.v-d (11px mono)', '#9AA1AB', '#15171C', 'N', 'ui.css:88', 'inv-mut', 'inv-bg'),
    ('.conf-high', '#0B5B3C', '#DFF1E8', 'N', 'ui.css:95', 'tn-green-fg', 'tn-green-bg'),
    ('.conf-medium', '#6E4300', '#FBF0D6', 'N', 'ui.css:96', 'tn-amber-fg', 'tn-amber-bg'),
    ('.conf-low', '#8B3D00', '#FBE9D9', 'N', 'ui.css:97', 'tn-orange-fg', 'tn-orange-bg'),
    ('.tr b (11px mono)', '#2356C4', '#FFFFFF', 'N', 'ui.css:102', 'blue-t', 'surf'),
    ('.stk .mut on stale cell', '#5A606A', '#FDF1E4', 'N', 'ui.css:138,140', 'mut', 'wash-stale-bg'),
    ('.lock', '#0B5B3C', '#E9F5EE', 'N', 'ui.css:147', 'tn-green-fg', 'wash-ok-bg'),
    ('.md a wikilink', '#2356C4', '#FFFFFF', 'N', 'ui.css:146', 'blue-t', 'surf'),
    ('.mrow-n (12px)', '#6A7079', '#F2F3EF', 'N', 'ui.css:317', 'mut', 'bg'),
    ('.pv .ico', '#3A3F47', '#ECEEE8', 'N', 'ui.css:366', 'fg2', 'bg2'),
    ('.lgbox figcaption (10.5px)', '#8A9096', '#FFFFFF', 'N', 'ui.css:244', 'mut', 'surf'),
    ('.input border (mini .inp)', '#C2C6BD', '#FFFFFF', 'U', 'ui.css:359', 'line-ui', 'surf'),
    ('.field input border', '#D8D4C9', '#FFFFFF', 'U', 'base.css:169', 'line-ui', 'surf'),
    ('.sw off track', '#B9BDB4', '#FFFFFF', 'U', 'base.css:155', 'sw-off', 'surf'),
    ('focus ring on page', '#E8A33D', '#F5F3EE', 'U', 'base.css:65', 'focus', 'bg'),
    ('focus ring on white card', '#E8A33D', '#FFFFFF', 'U', 'base.css:65', 'focus', 'surf'),
]


def lit_val(x):
    if isinstance(x, tuple):
        return blend(x[1], x[2], x[3])
    return x


def fmt(r):
    return '%.2f' % r


def pf(r, size):
    if size == 'D':
        return 'n/a'
    return 'pass' if r >= NEED[size] else 'FAIL'


def main():
    fails = []
    out = []
    out.append('# Contrast report (generated by contrast.py from tokens.css)\n')
    out.append('Thresholds: N normal text 4.5, L large text 3, U graphic or control boundary 3, D decorative (not scored). Ratios use WCAG 2.x relative luminance.\n')
    out.append('## A. Token pairs, light and dark\n')
    out.append('| Pair | Used for | Size | Light | Dark | Light AA | Dark AA | Source |')
    out.append('|---|---|---|---|---|---|---|---|')
    for row in T:
        if row[1] is None:
            out.append('| **%s** | | | | | | | |' % row[0])
            continue
        label, f, b, size, use, src = row
        rl = ratio(val(f, LIGHT), val(b, LIGHT))
        rd = ratio(val(f, DARK), val(b, DARK))
        if rl < NEED[size]:
            fails.append((label, 'light', rl))
        if rd < NEED[size]:
            fails.append((label, 'dark', rd))
        out.append('| %s | %s | %s | %s | %s | %s | %s | %s |' % (label, use, size, fmt(rl), fmt(rd), pf(rl, size), pf(rd, size), src))
    out.append('\n## B. Hard-coded pairs in the CSS today (no dark treatment) and the token pair that replaces them\n')
    out.append('| Pair | fg | bg | Size | Today | Today AA | Replace with | Light | Dark | Source |')
    out.append('|---|---|---|---|---|---|---|---|---|---|')
    lfail = 0
    for label, f, b, size, src, tf, tb in L:
        fv = lit_val(f)
        r = ratio(fv, b)
        if r < NEED[size]:
            lfail += 1
        rl = ratio(val('t:' + tf, LIGHT), val('t:' + tb, LIGHT))
        rd = ratio(val('t:' + tf, DARK), val('t:' + tb, DARK))
        fs = fv if not isinstance(f, tuple) else '%s @%d%%' % (f[1], int(f[3] * 100))
        out.append('| %s | %s | %s | %s | %s | %s | `%s` on `%s` | %s | %s | %s |' % (label, fs, b, size, fmt(r), pf(r, size), tf, tb, fmt(rl), fmt(rd), src))
        if rl < NEED[size]:
            fails.append(('replacement ' + label, 'light', rl))
        if rd < NEED[size]:
            fails.append(('replacement ' + label, 'dark', rd))
    out.append('\nToday: %d of %d hard-coded pairs fail their threshold.' % (lfail, len(L)))
    out.append('\n## C. Failures in tokens.css (should be empty)\n')
    if fails:
        for f in fails:
            out.append('- %s (%s): %s' % (f[0], f[1], fmt(f[2])))
    else:
        out.append('None. Every token pair and every recommended replacement passes in light and dark.')
    print('\n'.join(out))
    return 1 if fails else 0


if __name__ == '__main__':
    sys.exit(main())
