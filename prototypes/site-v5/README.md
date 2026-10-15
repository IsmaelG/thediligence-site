# prototypes/site-v5 — the V5 design, runnable

The two pages of the Claude Design canvas "TheDiligence website V5" (version 1791995958-bea2, 14 Oct 2026), as authored: `Main.dc.html`, `Team.dc.html`, their images in `_blob/` (named by asset id) and `support.js`, the design-component runtime (it bundles React) that renders them.

Read them for behaviour (the currency logic is in the `<script type="text/x-dc">` block at the end of `Main.dc.html`). Never import them into the site: the site is generated from `spec/`.

View them:

```bash
node scripts/conformity/serve.mjs prototypes/site-v5 8766
# open http://localhost:8766/Main.dc.html and http://localhost:8766/Team.dc.html
```

The pages load their fonts from Google Fonts, so viewing needs network access. They are also what `pnpm conformity:freeze` reads when Ismael changes the reference (`docs/CONFORMITY.md` §7). The design shows the fund names and "open source", which the reference removes (`spec/seams.json`, `spec/copy-overrides.json`).
