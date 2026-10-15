# spec/ — the frozen reference (V5)

Do not edit by hand. This folder is the design "TheDiligence website V5" turned into data: Claude Design canvas https://claude.ai/artifact/F6HhKPkW6MfBGJ8h5wb4qH, version 1791995958-bea2, frozen on 14 Oct 2026. Contract and procedures: `docs/CONFORMITY.md`.

| Path | Content | Made by |
|---|---|---|
| `pages.json` | Pages (Main `/`, Team `/team`), titles, section selector, widths | hand (Ismael) |
| `markup/Main.html`, `markup/Team.html` | Golden markup: rendered DOM, overrides applied, flag-off blocks removed | `freeze-from-design.mjs` |
| `markup/_logos-strip.*.html` | Fund-names blocks (flag `logos_visible`) | `freeze-from-design.mjs` |
| `states/Main/*.html` | Section 5 in £ (`01`), section 6 after each FAQ toggle (`02` to `07`) | `freeze-from-design.mjs` |
| `behaviour.json` | Controls, ARIA before and after, text before and after | `freeze-from-design.mjs` |
| `styles/Main.css`, `styles/Team.css` | Each page's CSS, verbatim | `freeze-from-design.mjs` |
| `styles/fonts.css`, `fonts/` | Google Fonts faces of the design, self-hosted (latin, latin-ext) | `freeze-from-design.mjs` |
| `assets/`, `assets.json` | The six photos, renamed | `freeze-from-design.mjs` / hand |
| `copy-overrides.json`, `seams.json`, `links.json`, `thresholds.json` | Claims-register replacements, flagged blocks, link targets, gates | hand (Ismael) |
| `redlines/<Page>.<width>.json` | Measured sections, text runs, boxes at 1280, 768, 390 | `build-reference.mjs` |
| `reference/<Page>-<width>.png` | Full-page screenshots at 1280 and 390 | `build-reference.mjs` |
| `SHA256SUMS` | Hash of every file here | `verify-spec.mjs --write` |

Validation of 14 Oct 2026: the golden markup inside the generated CSS differs from the live design by 0.0000 % to 0.0003 % of pixels before overrides; the gate scores 100 % on it; `build-reference.mjs` reproduces the redlines byte for byte.
