# Conformity contract

**Version 2.1 · 14 Oct 2026.** Binding for every agent that builds or changes a page of the public site. Replaces version 1.0 (9 Oct, nine v3 pages): the approved design is now **V5**, two pages, Claude Design canvas "TheDiligence website V5" (https://claude.ai/artifact/F6HhKPkW6MfBGJ8h5wb4qH, version 1791995958-bea2).

Why it exists: the first Intent build re-drew the v3 prototype and reached about 10 % typographic conformity; the live site today scores 0 to 16 % against V5 (`docs/GAP-REPORT.md`). The rule is **port, do not reinterpret**: the approved pages are frozen as data in `spec/`, the pages are generated from that data, and a test fails the build when the result drifts.

## 1. What is frozen, and who can change it

| Artefact | What it is | Changes |
|---|---|---|
| `spec/pages.json` | The two pages (Main `/`, Team `/team`), their titles, the section selector and the widths. | Ismael or Mazen, with a Decisions-log line |
| `spec/markup/<Page>.html` | The rendered DOM of each page (initial state, € prices, first FAQ answer open), copy overrides applied, flag-off blocks removed, images at `/images/…`. Root: `<div data-page="<Page>">`. The single source for structure, classes, inline styles and copy. | Same |
| `spec/markup/_logos-strip.<Page>.html` | The fund-names blocks, off until flag `logos_visible` (consent of the four funds). | Same |
| `spec/states/Main/*.html` | The section after each control: `01-pound.html` (prices in £), `02` to `07` (each FAQ answer toggled). | Regenerated |
| `spec/styles/Main.css`, `Team.css` | Each page's stylesheet, copied verbatim from the design. | Ismael or Mazen |
| `spec/styles/fonts.css`, `spec/fonts/*.woff2` | The exact font files the design loads from Google Fonts (Newsreader with italic and the optical-size axis, Overpass 400 to 700, Overpass Mono 400 and 500; latin and latin-ext), self-hosted under the same family names. | Regenerated |
| `spec/assets/*.jpg` | The six photos, renamed (`assets.json`). | Ismael or Mazen |
| `spec/redlines/<Page>.<1280\|768\|390>.json` | Measured sections, text runs (font, size, weight, style, leading, tracking, colour, transform, rectangle) and decorated boxes. | Regenerated, never edited |
| `spec/reference/<Page>-<1280\|390>.png` | Full-page reference screenshots. | Regenerated |
| `spec/behaviour.json` | Each control: label, occurrence, section, ARIA before and after, text before and after the click. | Regenerated |
| `spec/copy-overrides.json` | Design sentences that the claims register replaces, with the reason and the flag-on text. | Ismael or Mazen |
| `spec/seams.json` | Blocks removed by a flag. | Ismael or Mazen |
| `spec/links.json` | Where the design's links go in the site (hrefs are not measured). | Ismael, Mazen or an agent, with a Decisions-log line |
| `spec/thresholds.json` | The gates of section 3. | Ismael or Mazen |
| `spec/SHA256SUMS` | Hash of every file above. `pnpm spec:verify` runs in CI. | Rewritten only with a reference change |

## 2. How a page is built (the port)

1. **CSS, fonts, images.** `pnpm spec:css` writes `app/spec.css` (the font faces, then each page's stylesheet scoped under `[data-page="<Page>"]`, because Main and Team disagree on `.h1` inside the same media query) and copies `spec/fonts` to `public/fonts`, `spec/assets` to `public/images`. It runs before every build. Never edit the outputs, never add a rule that targets their classes. **Do not use `next/font`**: it renames the families, and the golden CSS and inline styles name them literally (`.serif{font-family:'Newsreader',Georgia,serif}`, root `font-family: Overpass, system-ui, …`). This supersedes `docs/DESIGN-SYSTEM.md` §10.3 for the site.
2. **Root layout.** `<html lang="en"><body>{children}</body></html>`, importing `app/spec.css` once, plus metadata. No wrapper element, no padding, no global rule of your own on `html` or `body`. The header and the footer are part of each golden page (the header sits inside the hero).
3. **Page.** `pnpm port spec/markup/Main.html app/(site)/main-golden.tsx MainPage` writes a server component: `class` → `className`, style strings → objects, booleans and camel-cased attributes, `*.dc.html` links → routes, placeholder links → `lib/links.ts` (`spec/links.json`). Text is emitted as string literals, so spacing is exact. `app/page.tsx` renders `MainPage`; `app/team/page.tsx` renders `TeamPage`. Metadata lives in `page.tsx`, never in the generated file. Tested: both pages render with 100 % on G1 to G6 and 0.00 % pixel difference at 1280, 768 and 390, with React 18.3 and 19.2 (`pnpm conformity:prove`).
4. **Links.** `lib/links.ts` exports `CAL_URL` (Cal.com booking), `START_FREE` (`/app` when `platform_open` is on, else the waitlist) and `REPO_URL` (the method repository, `#` until `repo_public`).
5. **Interactions.** One control needs JavaScript: the currency switch in section 5 of Main (`€ Euro` / `£ Pound`). Build it as a client component that renders exactly the golden markup in the € state and exactly `spec/states/Main/01-pound.html` in the £ state (two prices, `aria-pressed`, and the button colours: the pressed one `#14161A` with `#F5F3EE` text, the other transparent with `#14161A` text). It may default to £ when the browser language is en-GB, as the design does, but must render € first on the server (the reference is €). The FAQ uses native `<details>`; keep it native.
6. **Images.** Plain `<img>` with the files of `public/images`, as in the golden markup. `next/image` is not used on these two pages (it changes markup and pixels).
7. **Seams.** The only places where something other than the golden markup may appear are listed in section 6. Anything the reference lacks sits in an element carrying `data-conformity-skip="<reason>"`; the gate hides those in the candidate.

Forbidden: re-typing a page, editing a generated file, "improving" a heading, merging classes, changing a width, gap, colour or size "for consistency", replacing a block with a library component.

## 3. The gates (`spec/thresholds.json`)

Every page, at 1280, 768 and 390 px, Chromium, light theme, reduced motion, en-US:

| Gate | Pass when | Catches |
|---|---|---|
| G1 Copy | ≥ 99 % of the reference text runs found, word for word (case, quotes and spaces normalised) | rewritten or missing copy |
| G2 Typography | ≥ 97 % of matched runs equal in font family, size (±0.5 px), weight, style, colour, transform, tracking (±0.3 px), leading (±1.5 px) | wrong scale, lost italics, wrong font |
| G3 Position | ≥ 97 % of matched runs within 8 px (x) and 12 px or 8 % (width) | wrong grid or gutters |
| G4 Boxes | ≥ 95 % of decorated boxes (matched by their text) equal in fill, radius and shadow presence | cards, chips, buttons |
| G5 Height and overflow | page height within ±3 %; no horizontal overflow | broken responsive layout |
| G6 Sections | same number of blocks under `[data-page]` (a style-less `<main>` around them is allowed) | merged or invented sections |
| G7 Pixels | each section ≤ 1.5 % different pixels (pixelmatch threshold 0.1) at 1280 and 390, cropped from one full-page screenshot; 100 % if its height differs by more than 3 % | everything the other gates miss |
| G8 Behaviour | each control of `spec/behaviour.json` that changes its section is found (label and occurrence), clicked, and its section then (a) has a word-set Jaccard ≥ 0.8 with the reference, (b) shows every word the click adds in the reference (e.g. `£149`) and (c) no longer shows the words it removes (e.g. `€149`) | static mock-ups, dead switches |

The harness scores 100 % (G1 to G7, 0.00 % pixels) on the golden markup and on the generated React pages, and G8 7/7 on the original design (validated 14 Oct 2026, `docs/GAP-REPORT.md` §4), so any failure is the candidate's.

## 4. Running it

```bash
pnpm add -D playwright@1.56.0 pngjs@7.0.0 pixelmatch@6.0.0 parse5@7.3.0 esbuild@0.25.10
pnpm exec playwright install chromium        # or set CHROMIUM_PATH
pnpm build && pnpm start &                     # or BASE_URL=<preview url>
pnpm conformity                                # BASE_URL=http://localhost:3000 by default
pnpm conformity --pages=Main --no-visual       # one page, no screenshots
pnpm conformity --only=G1,G2 --widths=1280     # some gates, one width
```

Output: `.conformity/report.md` (table per page and width, then the first missing texts, typography and box differences, failing sections) and `.conformity/report.json` (everything, with before and after values); candidate screenshots in `.conformity/shots/`. The last line is the summary to paste into the commit message. Protected Vercel previews: set `VERCEL_AUTOMATION_BYPASS_SECRET`.

Other scripts: `pnpm spec:css` (CSS, fonts, images), `pnpm spec:verify` (hashes), `pnpm port` (html-to-jsx), `pnpm conformity:prove` (re-proves the port), `pnpm conformity:docs` (regenerates `docs/UI-SPEC.md` and `docs/pages/*.md`), `pnpm conformity:ref` and `pnpm conformity:freeze` (reference changes only, section 7).

## 5. Process for an agent

1. Read `docs/pages/<Page>.md` and open `spec/reference/<Page>-1280.png` and `-390.png`.
2. Generate the page with `pnpm port`, render it from `page.tsx`, run `pnpm conformity --pages=<Page>`.
3. Fix the first failing gate in report order (G1, G2, …). Never lower a threshold, never edit `spec/` or a generated file.
4. A page is done only when it is green at the three widths and, for Main, G8 passes.
5. Commit with the summary line: `site: Main conforms (conformity PASS · Main · 1280/768/390 px), closes s2-port-main`.

## 6. Seams and permitted additions

| Seam | Where | Rule |
|---|---|---|
| Fund names row | Main (under the hero), Team (top of the closing section) | Rendered only when `logos_visible` is on, from `spec/markup/_logos-strip.<Page>.html`; absent from the reference. When consent is in, Ismael or Mazen puts it back into the golden markup and regenerates the reference (section 7). |
| Repository wording | Main, footer line and the "The method" price line | Golden text is the flag-off text (`spec/copy-overrides.json`). With `repo_public` on, the flag-on text of the same file is shown; regenerate the reference when the flag is on for good. |
| Currency switch | Main, section 5 | Client component, section 2.5. |
| Theme toggle, cookie banner, preview notices, skip link | anywhere | Wrapped in `data-conformity-skip="<reason>"`, at most five per page, must not move the golden markup when hidden. A skip link must be visually hidden until focused. |
| `<main>` landmark | Main and Team | Allowed around the blocks between the hero and the footer, with no class and no style. |
| Pages with no design | `/privacy`, `/terms`, `/legal`, 404, 500, `/app` coming soon | Built from the V5 patterns (section padding, `max-width: 1200px` container, Newsreader headings, Overpass body, the colours of `docs/UI-SPEC.md` §4). No reference screenshot: reviewed by a human. |
| Dark theme | both pages | Not covered by the reference (V5 has no dark theme). Task `s2-dark` maps the colours to `docs/tokens.css` while the light run stays green. |

## 7. Changing the reference on purpose

1. Edit the design on the canvas (or `spec/copy-overrides.json`, `spec/seams.json`), then copy the pages into `prototypes/site-v5/`.
2. `node scripts/conformity/serve.mjs prototypes/site-v5 8766 &` then `DESIGN_URL=http://localhost:8766 pnpm conformity:freeze`.
3. `pnpm conformity:ref`, `pnpm conformity:docs`, `pnpm conformity:prove`, review the diff of `spec/redlines` and the screenshots.
4. `node scripts/verify-spec.mjs --write`, and one dated line in the SPEC Decisions log with Ismael's or Mazen's approval. A change to `spec/` without that line is refused in review.

## 8. What this cannot guarantee

- Hover and focus rendering (they come from the ported CSS, so they match by construction, but nothing measures them), the dark theme, and the pages with no design.
- The hero cross-fade and drift: the gate runs with reduced motion, where they are off by the design's own rule. The animation is the design's CSS, ported unchanged.
- Other engines: the reference is Chromium. Firefox and Safari use the same CSS and fonts but are not measured.
- Not tested here: a real Next.js 16 build (its streaming render, `<head>` handling and CSS pipeline). The port was proven with `renderToStaticMarkup` under React 18.3 and React 19.2 (Next.js 16 ships React 19): 100 % and 0.00 % pixels with both. The first CI run on a preview is the proof for Next itself.
