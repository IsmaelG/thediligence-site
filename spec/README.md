# spec/ — the frozen reference

Everything in this folder is data derived from the approved prototype and is **read-only for agents**. `SHA256SUMS` fixes it; CI runs `pnpm spec:verify`. The rules for using it are in `docs/CONFORMITY.md`.

| Path | Content |
|---|---|
| `markup/<Page>.html` | Rendered DOM of each page, initial state, copy overrides applied. `_logos-strip.*.html` is the logos row kept for the flag `logos_visible`. `ol.metro` carries `data-conformity-skip="map"`. |
| `states/<Page>/NN-<control>.html` | DOM of the control's section after the click (52 controls, 40 of them change the DOM). |
| `styles/` | `base.css`, `ui.css` (the prototype's CSS, unchanged) and `logos.css` (generated logo sizes). |
| `redlines/<Page>.<1280\|768\|390>.json` | Measured text runs, boxes and sections. |
| `reference/<Page>-<1280\|390>.png` | Full-page screenshots of the golden markup, light theme. |
| `behaviour.json` | For each control: label, whether it changes the section, resulting text, state file. |
| `copy-overrides.json` | Prototype sentences replaced by the claims register, with the reason. |
| `thresholds.json` | The gates G1 to G8. |

Regenerate the measured files only on purpose: `pnpm conformity:ref` (needs network for the Google Fonts stylesheet that the reference was rendered with, or the same fonts installed), then update `SHA256SUMS` and add a Decisions-log line.
