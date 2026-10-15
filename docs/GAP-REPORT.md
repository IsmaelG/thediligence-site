# Gap report: live site against the V5 reference

**Measured 14 Oct 2026, 18:43 Paris** against reference v2.1 on https://www.thediligence.app (same build as https://thediligence-app.vercel.app; the apex `thediligence.app` did not answer from the test machine) with `node scripts/conformity/run.mjs` at 1280, 768 and 390 px, light theme, reduced motion. Machine output: `docs/gap/report-live.json` and `report-live.md`; the Team page measured against `/about` (the nearest page) is in `report-live-about-as-team.json`. The harness scores 100 % on the reference itself (section 4), so every number here is the build's.

**Verdict: the live site is the v3 design, not V5.** It has the nine v3 pages (Products, Solutions, Method, Platform, Security, About, Insights, Book), the v3 hero ("Diligence. Built by operator-investors, for operator-investors.") and the v3 product mock-ups. V5 is a different, shorter site: two pages, a new hero, a new palette use and new copy. Nothing in the build can be kept as is; the port replaces the pages.

## 1. Scores

| Page (route) | Width | G1 copy | G2 type | G3 position | G4 boxes | G5 height | G6 sections | G7 pixels | G8 behaviour |
|---|---|---|---|---|---|---|---|---|---|
| Main (`/`) | 1280 | 15.7 % | 0 % | 3.7 % | 7.3 % | +24.6 % | 0 vs 10 | 100 % | 0 of 7 |
| Main (`/`) | 768 | 15.7 % | 0 % | 7.7 % | 7.3 % | +19.8 % | 0 vs 10 | — | — |
| Main (`/`) | 390 | 15.7 % | 0 % | 11.5 % | 7.3 % | +29.1 % | 0 vs 10 | 100 % | — |
| Team (`/team`) | all | HTTP 404 | | | | | | | |
| Team measured on `/about` | 1280 | 17.5 % | 0 % | 9.1 % | 0 % | −0.9 % | 0 vs 6 | 100 % | — |

Gates (`spec/thresholds.json`): G1 ≥ 99 %, G2 ≥ 97 %, G3 ≥ 97 %, G4 ≥ 95 %, G5 within ±3 % and no sideways overflow, G6 equal, G7 ≤ 1.5 % per section, G8 every control. **Every gate fails on both pages at every width.** No sideways overflow at 390 px on `/` (the v3 overflow found on 9 Oct is fixed).

## 2. What differs, by cause

| # | Difference | V5 reference | Live build | Gates hit |
|---|---|---|---|---|
| 1 | Page set | `/` and `/team` | Nine v3 pages; `/team` is 404 | all on Team |
| 2 | Hero | "Investment diligence, built by investor-operators." over the Paris-to-London photo cross-fade | "Diligence. Built by operator-investors, for operator-investors." with a product window | G1, G7 |
| 3 | Copy | 172 text runs at 1280 on `/` | 27 of them found (header links, buttons, the three evidence labels, a few memo words); 145 missing, for example "Good diligence is slow, expensive, or impossible to check.", "How a diligence runs", "Two investor-operators, both halves of the question.", "Use it on your own, *or with us alongside.*" | G1 |
| 4 | Typography of the 27 shared runs | e.g. labels Overpass Mono 12 px uppercase, tracking 0.72 px; card titles Newsreader 36 px | Overpass 15 px, no transform, no tracking; Overpass Mono where V5 has Newsreader; line-height set in px where V5 is `normal` | G2 (0 of 27 equal) |
| 5 | Buttons | "Start free" outline on the dark hero, "Book time with us" filled `#ECEAE4` | "Start free" filled `#14161A`, "Book time with us" outline | G4 |
| 6 | Structure | Root `<div data-page="Main">` with 10 blocks (hero, 7 sections, closing band, footer) | No `data-page` root, so no section of the reference can be located | G6, G7, G8 |
| 7 | Height | 8 719 px at 1280 | about 10 870 px (+24.6 %) | G5 |
| 8 | Behaviour | Currency switch (€ / £) and six FAQ answers | Neither exists on `/` | G8 |
| 9 | Copy rules | Logos row off until consent; footer "TheDiligence is a working name." | To be checked when the port lands; the legal review of 11 Oct listed `/app` showing "€149" and "$15–25" against the copy rules | — |

## 3. Differences that are correct (do not "fix")

- The fund names row ("Advisors to …") is absent from the reference on both pages: flag `logos_visible` stays off until the four funds agree in writing. The blocks are in `spec/markup/_logos-strip.Main.html` and `_logos-strip.Team.html`.
- Two sentences of the design are replaced by the claims register (`spec/copy-overrides.json`): the footer line and the "Free, open source" price line, both because the repository is not public yet.
- The links of the design that point to `#` go to `lib/links.ts` (`CAL_URL`, `START_FREE`, `REPO_URL`); the Team page's menu links point to `/#how`, `/#ways`, `/#security` (`spec/links.json`). Hrefs are not measured.

## 4. Harness validation (14 Oct 2026)

| Run | Result |
|---|---|
| Golden markup inside the generated CSS vs the original design, before overrides | 0.0000 % to 0.0005 % of pixels different, both pages, three widths |
| Golden markup served as a static site | G1 to G7: 100 % / 0.00 % pixels on both pages at 1280, 768 and 390. G8: the six FAQ controls pass (native `<details>`); the currency switch fails, as it must without JavaScript |
| Original V5 design served with its runtime (`--sections` set to the design's root) | G8: 7 of 7 controls pass. The other gates show exactly the approved differences: one extra section (the logos strip) and 97.7 % copy (the two overridden sentences and the fund names) |
| Pages generated by `scripts/html-to-jsx.mjs`, rendered by React (`renderToStaticMarkup`, React 18.3 and 19.2) inside `app/spec.css` | G1 to G7: 100 % / 0.00 % pixels on both pages at all three widths, with both React versions |
| `build-reference.mjs` run twice | Markup and redlines identical byte for byte |
| Live build | Fails every gate (sections 1 and 2) |

## 5. Remediation plan (order of leverage)

1. Install the gate and the spec (`s0-conformity`); the first red report is the table above.
2. Root layout, CSS and fonts (`s1-port-css`, `s1-shell`): `app/spec.css` from `pnpm spec:css`, self-hosted fonts under their own family names, nothing else in the layout.
3. Port Main (`s2-port-main`), the larger gap, then Team (`s2-port-team`), each green at the three widths before the next.
4. Currency switch (`s2-interactions`), the only control that needs JavaScript.
5. Redirect the v3 routes to their V5 places (`s2-redirects`), then the pages without a design (`s2-trust`), dark theme (`s2-dark`) and the remaining SPEC tasks.
