# TheDiligence design system
Version 1.0, 2026-10-08. Extracted from the approved public site, to be reused by the Next.js 16 platform.

**Sources.** `src/base.css` (220 lines) and `src/ui.css` (550 lines), both scoped under `.td`; markup in `src/partials/*.html` and `src/pages/*.html`; renders in `shots/`; app rules in `AGENTS.md` ("UI conventions", "Layout"). Icons and logos in `canvas3/project/icons` and `canvas3/project/logos`. Companion files: `tokens.css` (drop-in tokens), `contrast.py` (recomputes every ratio from `tokens.css`; run `python3 contrast.py > contrast-report.md`), `contrast-report.md` (its latest output). In the platform repository: `docs/DESIGN-SYSTEM.md`, `docs/tokens.css`, `scripts/contrast.py` (SPEC task `p0-docs`); in the project they are `specs/diligence-platform-DESIGN-SYSTEM.md`, `specs/diligence-platform-DESIGN-TOKENS.css` and `specs/diligence-platform-contrast.py`.

**Notation.** `file:line` is a citation into those sources (base.css = `src/base.css`, ui.css = `src/ui.css`). **DERIVED** means taken from the AGENTS/SPEC conventions or inferred from the mock-ups, with no CSS behind it. **PROPOSED** means a recommendation of this document, with the reason given. Anything with neither mark is copied from the CSS. A class name written with a leading dot exists in the CSS; classes that do not exist yet are written without the dot and marked PROPOSED.

## 0. How to use this document
### 0.1 Rules for coding agents
1. **Never hard-code a colour, radius, font, size, spacing, shadow, duration or z-index.** Use a token from `tokens.css`. If no token fits, stop and read 0.2.
2. **Port the component classes, do not re-invent them.** Section 5 lists every class and its CSS source. Copy the rule, drop the `.td` scope (10.4), replace each literal with its token (Appendix D lists the literals).
3. **Light and dark are both required** (AGENTS.md). A component is not done until it renders in `data-theme="light"` and `data-theme="dark"` and passes `contrast.py`.
4. **Status words are fixed**: `idle · planned · running · stale · delivered · needs-you`; grades `A/B/C`; confidence `High/Medium/Low`; deal stage `screening · IC · passed · invested`; product status `At launch · Next · Later`. Never invent a synonym.
5. **Meaning is never carried by colour or a chip alone.** Pair every dot or tone with its word (AGENTS.md accessibility rule).
6. **Agent work is collapsed by default**: one line per step, expandable. Results first, traces one click away.
7. **No UI kit.** No Tailwind, shadcn, MUI, Radix themes. The component set is small and its CSS exists. Use the native `<dialog>` element and `inert` for the drawer, sheet and palette (7.4); add a headless primitive only for a behaviour the platform cannot do, and say so in the pull request.
8. **Copy follows section 8.** Sentence case, no exclamation marks, no em or en dashes, the standard disclaimer wherever a verdict is shown or exported.
9. **Serif is for documents and display, never for app chrome** (3.5).
10. **Do not touch the public-site files** (`src/`, `canvas3/`). The app copies; it does not import.

### 0.2 Where to look when something is missing
1. A token: `tokens.css`. Colour roles are in 2.1, spacing in 2.5.
2. A component: section 5, then the class index in Appendix A. If a similar one exists, extend it with a variant.
3. A behaviour or layout of the app: section 7, then `prototypes/platform-v4.html` (cited by earlier versions of the specs; never supplied, so section 7 is DERIVED from AGENTS, SPEC and the mock-ups).
4. Still missing: write the smallest PROPOSED addition, list it in the pull request under "New design decisions", and add one line to `SPEC.md` Decisions log (AGENTS.md definition of done).

### 0.3 Definition of done for any UI task
- [ ] Only tokens used (`grep -nE '#[0-9a-fA-F]{3,8}|rgba?\(' <file>` returns nothing outside `tokens.css`).
- [ ] Renders in light and dark; screenshots at 1280 and 390 attached (10.7).
- [ ] Keyboard: every control reachable, order matches visual order, focus ring visible (9.2).
- [ ] Contrast: `contrast.py` reports no failure; any new pair added to its list.
- [ ] States covered: default, hover, focus-visible, pressed or selected, disabled, loading, empty, error where they apply.
- [ ] Copy reviewed against section 8; the disclaimer is present where a verdict appears.
- [ ] Reduced motion honoured (durations are tokens; 9.5).
- [ ] 390 px: no horizontal page scroll, targets at least 44 px, one column.

## 1. Principles
Derived from the code and from the copy ("Evidence before opinion", "We would rather tell you what is not built yet", "Agents draft, people send").

1. **Calm authority.** Warm paper, near-black ink, one serif for display and a quiet sans for work. Large type, generous space, almost no decoration (`base.css:6-9`, `.sec` 128 px). The interface never shouts: no exclamation marks, no confetti, no gradients except one hero glow.
2. **Evidence first.** Every claim shows a source id and a grade (`.src`, `.gr`). The verdict leads, the proof is one click away (`ui.css:83-104`). Traces are collapsed by default.
3. **Honest status.** Everything unbuilt wears At launch, Next or Later (`ui.css:193-199`). A control that does not work yet says "Preview: not connected yet" (`Book.html:34`).
4. **Illustrative means labelled.** Any mock-up or sample number says so in the window bar and in a caption (`Illustrative`, `Illustrative composite. Not a real company.`).
5. **Low cognitive load.** One line per agent, one primary action per surface, at most three data-line colours, mono type only for ids, costs and labels.
6. **Colour is a line, not a decoration.** Blue, orange and green are the three lines of the Diligence Stack map (company, product, technology); ink is the shared line. They mark stages, never mood.
7. **People decide.** Gates, approvals and sends are human actions with explicit buttons. Agents draft; the UI never implies an agent acted on the world.
8. **Quiet motion.** Transitions of .2 to .5 s on colour, border and width; one looping animation (running bar); everything stops under reduced motion (`base.css:217-220`).

## 2. Tokens
All values below are in `tokens.css`, which is the source of truth when this table and the file disagree (they were checked against each other).

### 2.0 The three tensions, resolved
| Tension | Decision | Why |
|---|---|---|
| Two token sets (site vs older map) | **The site set is canonical.** Old names stay alive as CSS aliases (2.3) so existing code is re-pointed, not rewritten. | The site set is approved and complete (surfaces, text, lines, three lines in two forms). The older set is the same palette 1 to 6 levels per channel away; the site's own product window is painted with the old light values (`base.css:119-157` uses `#F2F3EF`, `#D3D6CF`, `#15171C`). |
| Fonts: site Newsreader + Overpass + Overpass Mono, app brief Overpass + Overpass Mono | **Keep all three families in the app, with the serif restricted** (3.5): allowed for document titles, the verdict word, memo section titles in a rendered memo, numerals in hero metrics and the brand mark; forbidden in nav, tables, forms, buttons, chips, rails and toasts. | The product mock-ups already use the serif exactly in those places (`.v-t`, `.note-t`, `.mini .t`, `.plan .pn`, `.brand`), so the app matches the approved renders without bringing display type into the chrome. |
| Dark mode only as `.night` sections | **Full theme built from every `.night` override** (2.4), completed with PROPOSED values where the CSS has none. `prefers-color-scheme` plus `[data-theme]`, selectors exactly as the brief requires. | `.night` overrides 12 tokens and 12 component rules; most of the component CSS has no dark treatment and is listed in 2.4. |

### 2.1 Colour roles
Light | dark. Dark values marked (P) are PROPOSED; unmarked dark values are `.night` overrides (`base.css:15`, `ui.css:197-199`) or the older map.

**Surfaces, text, lines** (`base.css:6,15`)

| Token | Light | Dark | Role |
|---|---|---|---|
| `--bg` | `#F5F3EE` | `#0F1216` | page |
| `--bg2` | `#ECE9E1` | `#161A20` | alternate section, hover wash, current nav item, window side |
| `--surf` | `#FFFFFF` | `#181C22` | cards, inputs, panels |
| `--surf2` | `#F8F7F3` | `#1E232A` | rail, quiet panels |
| `--chip` | `#E7E9E3` | `#20242B` (P) | neutral chip, source chip (`base.css:112,139`) |
| `--fg` | `#14161A` | `#ECEAE4` | text, primary button fill |
| `--fg2` | `#3A3F47` | `#C4C8CE` | body text |
| `--mut` | `#5A606A` | `#9AA1AB` | labels, captions |
| `--line` | `#D8D4C9` | `#2A3038` | card border, rules |
| `--line2` | `#E8E5DC` | `#222830` | quiet divider |
| `--line-ui` | `#7C828C` (P) | `#6B727C` | border of an interactive control; the site uses `#C2C6BD` (1.73:1) |
| `--focus` | `#8A5A00` (P) | `#E8A33D` | focus ring; the site uses `#E8A33D` in both themes (1.94:1 on light, `base.css:65`) |

**The three lines and their text forms** (`base.css:7`)

| Token | Light | Dark | Line / use |
|---|---|---|---|
| `--blue` | `#2356C4` | `#6F97F2` (P, older map `--l-co`) | company; fills, dots, bars, stations |
| `--orange` | `#D9640F` | `#F49A4C` (P, older map `--l-pr`) | product; needs-you accent |
| `--green` | `#12855A` | `#42C28B` (P, older map `--l-te`) | technology; success fill |
| `--blue-t` / `--orange-t` / `--green-t` | `#2356C4` / `#A84A00` / `#0E6B48` | `#8FAEF5` / `#F49A4C` / `#46C48E` | the same hues as text and icons (AA on bg and surf) |
| `--shared` | `var(--fg)` | follows | the shared line (Interviews, Verifier, Vault); `ui.js` `LINE.shared` |
| `--amber` | `#B7791F` | same | the Next / stale accent (`ui.css:396,416`) |

Rule: use `--blue`, `--orange`, `--green` for shapes (dot, bar, station ring, 4 px rule) and the `-t` forms for text and icons. The site's `.night` block leaves the shape colours unchanged (blue is 2.86:1 on the dark page); the dark values above fix that.

**Product status chips** (`.status`, `ui.css:193-199`)

| Status | Class | Light bg / fg | Dark bg / fg | Meaning |
|---|---|---|---|---|
| At launch | `.st-live` | `#DFF1E8` / `#0B5B3C` | `#12382A` / `#7BE0B4` | ships with the first release |
| Next | `.st-build` | `#FBF0D6` / `#6E4300` | `#3A2C10` / `#F2C877` | on the roadmap, not built; never described as done |
| Later | `.st-plan` | `var(--bg2)` / `var(--fg2)`, 1 px dashed `var(--mut)` | `.night` keeps `--bg2`, text `#C4C8CE` | planned, no date |

Tokens: `--tn-green-*` (At launch), `--tn-amber-*` (Next), Later has no token of its own: `.st-plan` is composed from `--bg2`, `--fg2` and `--mut`.

**Evidence grades** (`base.css:107-112`)

| Grade | Class | Look | Dark |
|---|---|---|---|
| A verified | `.gr .gr-a` | fill `--fg`, text `--gr-a-fg` (`#FFFFFF`), 1.5 px border | fill `#ECEAE4`, text `#0F1216` (`base.css:110`) |
| B reported | `.gr` | transparent, 1.5 px solid currentColor | unchanged |
| C estimated | `.gr .gr-c` | 1.5 px **dashed** border, text `--mut` | `#9AA1AB` (`base.css:111`) |

Grade is a shape as well as a letter: solid black, solid outline, dashed outline. Keep it that way for greyscale and colour-blind use.

**Confidence** (`.conf`, `ui.css:94-97`): High = `--tn-green-*` plus border `--tn-green-bd`; Medium = `--tn-amber-*`; Low = `--tn-orange-*`. Always written with the word ("Medium confidence"). Rule: (A + 0.5·B) / (A + B + C), High at 0.70 or more, Medium at 0.45 or more (`Method.html:92`, AGENTS rule 2).

**State language** (AGENTS "UI conventions"). The CSS has the pieces but no state vocabulary, so this mapping is DERIVED from the mock-ups and PROPOSED as the contract:

| State | Dot token | Chip tone | Evidence in the mock-ups | Never alone |
|---|---|---|---|---|
| idle | `--state-idle` (`--mut`), solid | `--chip` + `--fg2` (`.ch`) | `.ch` neutral (`base.css:139`) | word "Idle" |
| planned | `--state-planned`, hollow dashed ring | dashed, as `.st-plan` | `.ag.wait` rows at .55 opacity, "est. $3.50" (`ui.css:49`, `ui-run.html:27`) | word "Planned", "est." |
| running | `--state-running` (`--blue`) | `--tn-blue-*` (`.ch-b`) | "Running" chip, striped bar (`ui.css:50`, `ui-run.html:18`) | word "Running" |
| stale | `--state-stale` (`--amber`) | `--wash-stale-*` | `.ldg tr.stale`, `.stk .st` (`ui.css:131,140`) | word "Stale" |
| delivered | `--state-delivered` (`--green`) | `--tn-green-*` | `.banner-g`, `.stk .ok`, "Delivered" label (`ui.css:135,141`, `memo-ui.html:16`) | word "Delivered" |
| needs-you | `--state-needs-you` (`--orange`) | `--tn-orange-*` (`.n-tag`) | "Needs you" tag, gate (`ui.css:38,52`) | word "Needs you" |

Caution: the same three hues are also the stage lines. In the nav mock-up the dots beside targets are blue, orange and green (`ui-run.html:6-8`); the doc cannot tell whether they encode state or identity. **Decision (confirmed, Appendix E):** in the app, a target dot encodes *state only* using the table above; stage lines appear only inside a memo or plan, beside the stage name. Confirmed in Appendix E, decision 1.

**Tones and washes** (`tn-*`, `wash-*` in `tokens.css`): four tones (green, amber, orange, blue) each with bg, fg and border; three washes (`warn` for needs-you, `stale`, `ok`) for tinted panels. They cover every hard-coded chip and banner colour in `ui.css`.

**Inverse surface** (`inv-*`): primary button, verdict card, `.fl-key`, `.door-dark`. It flips with the theme (dark on light, light on dark), as the site's `.night .btn-p` already does (`base.css:59-62`). Verdict in dark is therefore a light card (confirmed, Appendix E, decision 2); alternative if a dark verdict is wanted in dark mode: set `--inv-bg:#15171C`, `--inv-fg:#FFFFFF`, `--inv-fg2:#DDE0E4`, `--inv-mut:#9AA1AB` in the dark blocks.

### 2.2 Controls
| Token | Light | Dark | Use |
|---|---|---|---|
| `--btn-p-hover` | `var(--fg2)` | `#FFFFFF` | `.btn-p:hover` (`base.css:55`, `60`) |
| `--btn-s-bd` | `var(--fg)` | `#6B727C` | `.btn-s` border (`base.css:56`, `61`) |
| `--sw-off` / `--sw-on` / `--sw-knob` | `--line-ui` / `--green` / `#FFFFFF` | same / same / `#0F1216` | `.sw` (`base.css:155-157`; the site's off track `#B9BDB4` is 1.91:1) |
| `--track` | `#E2E4DD` | `#2A3038` (P) | meter, bar, skeleton track |
| `--ev-a/b/c1/c2` | `--fg`, `#7E8AA6`, `#E9C9A8`, `#F5E4D0` | `--fg`, same, `#C99560` (P), `#8A6540` (P) | evidence bar (`ui.css:526-528`) |
| `--nav-bg`, `--glow-0/1` | `rgba(245,243,238,.9)`, `#FFFFFF`, `rgba(245,243,238,0)` | (P) from `--bg`, `--surf2` | sticky nav and hero glow, the only gradients (`base.css:74`, `ui.css:14`) |

### 2.3 Migration table: old name to new name
The deployed first version uses the older "Diligence Stack map" table. The site's own product window was painted with the same light values, so migrating moves most pixels by 1 to 6 levels out of 255. `tokens.css` section 12 defines every alias, so old code keeps working and is re-pointed by deleting the old `:root` block. Only values that change are shown in the last column.

| Old token (light / dark) | New token | New value (light / dark) | Change |
|---|---|---|---|
| `--bg` `#F2F3EF` / `#111317` | `--bg` (same name) | `#F5F3EE` / `#0F1216` | max 3 / 2 levels per channel |
| `--card` `#FFFFFF` / `#1A1D23` | `--surf` (alias `--card`) | `#FFFFFF` / `#181C22` | 0 / 2 |
| `--ink` `#15171C` / `#ECEEF1` | `--fg` (alias `--ink`) | `#14161A` / `#ECEAE4` | 2 / 13 (dark ink is slightly warmer) |
| `--muted` `#5B616C` / `#9AA1AC` | `--mut` (alias `--muted`) | `#5A606A` / `#9AA1AB` | 2 / 1 |
| `--rule` `#D3D6CF` / `#2C3038` | `--line` (alias `--rule`) | `#D8D4C9` / `#2A3038` | 6 / 2 (light rule is warmer) |
| `--soft` `#E7E9E3` / `#20242B` | `--chip` (alias `--soft`) | `#E7E9E3` / `#20242B` | none |
| `--l-co` `#2356C4` / `#6F97F2` | `--blue` (alias `--l-co`) | `#2356C4` / `#6F97F2` | none |
| `--l-pr` `#D9640F` / `#F49A4C` | `--orange` (alias `--l-pr`) | `#D9640F` / `#F49A4C` | none |
| `--l-te` `#12855A` / `#42C28B` | `--green` (alias `--l-te`) | `#12855A` / `#42C28B` | none |
| `--l-sh` `#7C828C` / `#8A919C` | `--shared` (alias `--l-sh`) | `--fg` | **value change**: the shared line becomes ink, as on the site (`ui.js` `LINE.shared`). If the first version needs the grey, keep `--l-sh` as a literal for one release. |
| Overpass 400/600/800 | `--sans` | Overpass 400/500/600/700 | weight 800 is not loaded on the site; map it to 700 |
| Overpass Mono 400/600 | `--mono` | Overpass Mono 400/500/600 | none |
| `[data-theme]` override + `prefers-color-scheme` | same | same | selectors unchanged |

Hard-coded greys that the product mock-ups use and the token each maps to (the app family is re-pointed at canonical tokens, there is no third palette): `#ECEEE8`, `#E8EAE4` to `--bg2`; `#F7F8F4` to `--surf2`; `#D3D6CF` to `--line`; `#E3E5DE` to `--line2`; `#6A7079`, `#555B66` to `--mut`; `#2A2E36` to `--fg`; `#4A505A` to `--fg2`; `#C2C6BD`, `#AEB3A9` to `--line-ui`; `#E2E4DD` to `--track`. The full list is in Appendix D.

### 2.4 Dark theme: every `.night` override, and what is missing
**Overrides present in the CSS (all carried into `tokens.css`):**

| Selector | Property | Value | Token now |
|---|---|---|---|
| `.night` (`base.css:15`) | `--bg --bg2 --surf --surf2 --fg --fg2 --mut --line --line2` | `#0F1216 #161A20 #181C22 #1E232A #ECEAE4 #C4C8CE #9AA1AB #2A3038 #222830` | canonical dark |
| `.night` | `--blue-t --orange-t --green-t` | `#8FAEF5 #F49A4C #46C48E` | `-t` dark |
| `.night .btn-p` (`:59-60`) | bg / hover | `#ECEAE4` on `#0F1216` / `#fff` | `--inv-*`, `--btn-p-hover` |
| `.night .btn-s` (`:61-62`) | border / hover | `#6B727C` / `#ECEAE4` | `--btn-s-bd` |
| `.night .gr-a`, `.gr-c` (`:110-111`) | fill, text | `#ECEAE4` on `#0F1216`; `#9AA1AB` | `--gr-a-fg`, `--mut` |
| `.night .st-live/.st-build/.st-plan` (`ui.css:197-199`) | bg / fg | `#12382A/#7BE0B4`, `#3A2C10/#F2C877`, text `#C4C8CE` | `--tn-green-*`, `--tn-amber-*` |
| `.night .feat .ic-b` (`ui.css:165`) | bg | `var(--surf2)` | unchanged, uses token |
| `.night .routes-svg` (`ui.css:238`) | color | `#ECEAE4` | `--fg` |
| `.night.band, .night.sec` (`ui.css:162`) | bg | `var(--bg)` | unchanged |
| `.door-dark` (`ui.css:169-175`) | inverse card on a light page | `--fg`/`--bg`, `#C4C8CE`, `#6B727C`, `#46C48E` | `--inv-*`, `--green-t` dark |

**Components with no dark treatment today** (colours are literals in the CSS; each is covered by a token in `tokens.css`, but the component CSS must be ported to use it):

1. The whole product-window family: `.app`, `.app-bar`, `.app-side`, `.app-main`, `.app-rail`, `.panel`, `.ch` with its tone variants, `.btn-a`, `.tabs`, `.seg`, `.bar`, `.app table`, `.it`, `.n-tag`, `.mini`/`.inp`/`.code`/`.pv`/`.mail`/`.runl` (`base.css:119-157`, `ui.css:33-66`, `345-379`). The site states "product window: always light" (`base.css:118`); the app cannot.
2. `.ag`, `.gate`, `.meter`, `.verdict`, `.msec`, `.conf`, `.trace`, `.lin`, `.ldg` rows, `.banner`, `.drop`, `.stk`, `.md`, `.lock`, `.tree`, `.mrow`, `.skel`, `.ptot`, `.pbar` (`ui.css:40-150`, `270-338`).
3. `.src` (`base.css:112`), `.who` chips (`ui.css:501-504`), `.evbar` segments (`ui.css:526-528`), `.rd.n` and its dot (`ui.css:396,416`).
4. Chrome: `.nav` background (`base.css:74`), `.hero-bg` glow (`ui.css:14`), every shadow (`base.css:97,119`, `ui.css:7,273,349`), `.routes-svg`/`.routes-low` stroke literals (`routes*.html`).
5. By design always light or dark, keep as is: `.lgbox` (white card for logo validation, `ui.css:242`), `.term` (terminal, `ui.css:273`, tokens `--term-*`), `.verdict` only if you choose the always-dark option in 2.1.

### 2.5 Spacing, radii, borders, shadows, motion, layers
**Spacing.** Every px value used in `gap`, `padding` and `margin`, by frequency: 10 (39), 8 (36), 12 (37), 16 (35), 14 (33), 6 (31), 24 (22), 18 (21), 28 (21), 22 (20), 20 (15), 9 (12), 32 (10), 40 (8), 4/7/44/56 (6 to 7 each), 64/72/36 (6 each), 26, 48 (4), 88, 80, 2, 3, 5 and a few one-offs (84, 96, 104, 128, 240). Tokens `--sp-N` exist for each. New code uses the 4-px-grid subset: **4, 8, 12, 16, 24, 32, 40, 48, 64, 72, 88, 128**; the off-grid values (6, 10, 14, 18, 22, 28, 36) are allowed only when porting an existing rule so it stays pixel-identical.

| Semantic | Value | Source |
|---|---|---|
| `--gap-s/m/l` | 12 / 24 / 40 | `.stack-s/m/l` `base.css:38-40` |
| `--gap-grid` | 24 | `.g2 .g3 .g4` `base.css:44-46` |
| `--gap-split` | 72 (40 at 960) | `.split` `base.css:47,198` |
| `--pad-card` | 36 (28 22 at 960) | `.card` `base.css:94,201` |
| `--sec-y`, `--sec-sm-y` | 128, 88 (80, 64 at 960) | `base.css:36,37,193,194` |
| `--head-mb` | 64 (40 at 960) | `.head` `base.css:41,195` |

**Radii** (`--r-N` for every value used): 999 pills and buttons; 50% dots and stations; 28 `.door`; 26 `.plan`, `.ok-card`; 22 `.card`; 20 `.fl`, `.bk-n`, `.evx-r`; 18 `.app`, `.menu-p`, `.stp`, `.term`; 16 `.choice`, `.lay`; 14 `.lgbox`, `.ic-b`, `.honest`; 12 inputs, `.panel`, `.msec`, `.gate`, `.banner`; 10 `.seg`, `.swb`, `.stk` cells; 9 side items; 7 `.ch`; 6 `.gr`, `.conf`; 5 `.src`; 2 to 4 bars. Roles: `--r-card` 22 (18 at 960), `--r-ctrl` 12, `--r-chip` 7, `--r-win` 18.

**Borders.** Cards and rules 1 px `--line`. Controls (`.btn`, `.field input`, `.choice`, `.ask`, `.cnf input`) 1.5 px. Dashed 1.5 px marks "not real yet" (`.ask`, `.drop`, `.st-plan` is 1 px, `.gr-c`). Station rings 3.5 px, 6 px in the metro. Selected state = border `--fg` (`.choice`, `.lay`, `.plan.hi`), never a colour change.

**Shadows** (all through `--sh-rgb`, so dark deepens them): `--sh-card` `0 24px 48px -28px .35` hover lift; `--sh-menu` `0 30px 60px -24px .4`; `--sh-win` two layers `0 60px 110px -40px .45, 0 22px 44px -22px .28`; `--sh-term`; `--sh-step`; `--sh-ring` / `--sh-ring-hi` `0 0 0 3px .08 / .06` selected halo; `--sh-lift` / `--sh-lift-2` 1 px lifts for the current nav item.

**Motion** (`--dur-*`): .2 s colour, border, background (buttons, choices, asks); .25 s card lift; .3 s mrow; .35 s chapter opacity; .45 s evidence bar width, `ease`; .5 s `fade` keyframe (`opacity 0, translateY(6px)` to rest); 1.4 s linear loop `slide` (striped running bar, `background-position` 24 px). Every other transition uses the browser default easing, which is `ease`. Reduced motion: `transition:none !important;animation:none !important;scroll-behavior:auto` (`base.css:217-220`); `tokens.css` also zeroes the durations.

**Layers** (`--z-*`): 1 and 2 inside hero stage; 30 nav; 40 menu popover; 50 skip link. PROPOSED for the app: 60 scrim, 61 drawer and sheet, 70 toast, 80 modal. The skip link at 50 sits below those; raise it to 100 in the app so it is visible on focus above a drawer (PROPOSED).

**Breakpoints** (the media queries actually in the CSS): `max-width:1100px` (product window loses its side column, flow and stats go 2 columns), `max-width:960px` (nav collapses, grids stack, rhythm shrinks), `max-width:760px` (`.hf` lanes stack, `ui.css:507`), `max-width:560px` (buttons full width, one column), `min-width:1101px` (vault window column widths, `ui.css:542`), `prefers-reduced-motion:reduce`. App shell breakpoint 900 px from AGENTS.md (DERIVED). QA width 390 px.

## 3. Typography
### 3.1 Families and loading
| Role | Family | Stack (`base.css:8`) | Weights used | Loaded by the site (`build.js`) |
|---|---|---|---|---|
| Display and documents | Newsreader | `'Newsreader',Georgia,'Times New Roman',serif` | 400, italic 400 | `ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400` (500 is loaded and never used) |
| Interface | Overpass | `'Overpass',system-ui,-apple-system,'Segoe UI',sans-serif` | 400, 500, 600, 700 | `wght@400;500;600;700` |
| Ids, costs, labels, code | Overpass Mono | `'Overpass Mono',ui-monospace,Menlo,monospace` | 400, 500, 600 | `wght@400;500;600` |

Base: `font:400 17px/1.55 var(--sans)`, `-webkit-font-smoothing:antialiased` (`base.css:9`). Headings reset margin to 0 (`base.css:11`); spacing comes from stacks, never from default margins.

### 3.2 Scale
| Style | Spec | Class | Used for |
|---|---|---|---|
| Display | serif 400, `clamp(46px,7.4vw,108px)`/.98, -.032em, `text-wrap:balance` | `.h1` | home hero word |
| Page title | serif, `clamp(44px,6.2vw,92px)` (same line-height and tracking) | `.page-hero .h1` | page heroes (`ui.css:23`) |
| Section title | serif, `clamp(36px,4.9vw,70px)`/1.03, -.026em | `.h2` | every section; compact variants set inline: `clamp(32px,3.8vw,52px)`, `clamp(34px,4.2vw,58px)`, `clamp(34px,4vw,54px)` (merge them, Appendix D) |
| Sub-title | serif, `clamp(26px,2.7vw,38px)`/1.1, -.016em | `.h3` | card titles; inline 28, 30 or 32 px on cards |
| Heading | sans 700 19px/1.3, -.005em | `.h4` | pillar and feature headings |
| Hero line | serif, `clamp(26px,3.3vw,48px)`/1.1, -.018em | `.hero-sub` | home sub-hero (`ui.css:481`) |
| Lead | sans 400 `clamp(18px,1.7vw,21px)`/1.5, `--fg2`, `text-wrap:pretty` | `.lead` | intro under a title; max 44ch in hero, 56ch in page hero |
| Body | 17px/1.55, `--fg2`, pretty | `.body` | paragraphs |
| Small | 14px/1.5, `--mut` | `.small` | secondary text |
| Tiny | mono 500 12px/1.4, `--mut` | `.tiny` | captions, "Illustrative" notes, "Preview" notes |
| Eyebrow | mono 600 12px/1.3, `.12em`, uppercase, `--mut` | `.eyebrow` | label above a title, footer headings, table headings |
| Numeral | serif 400 `clamp(44px,5vw,72px)`/1, -.03em | `.num` | step numbers; 56 px (40 at 960) in `.steps3`; 38 px in `.nx`, `.stp` (30 at 560); stats 64 px inline |
| Brand | serif 400 25px/1, -.02em | `.brand` | wordmark |
| Button | sans 600 16px/1 (15 px in `.btn-sm`) | `.btn` | |
| Text link | sans 600 16px | `.tl` | |
| Tag | mono 600 12px/1, `.08em`, uppercase | `.tag` | category labels |
| Status chip | mono 600 11.5px/1, `.04em` | `.status` | At launch, Next, Later |
| Grade | mono 600 12px/1 in a 24 px square | `.gr` | A, B, C |
| Source id | mono 500 11px/1.5 | `.src` | `S-07`, `P-01`, `I-04` |
| FAQ question | sans 600 19px/1.3 | `details.faq summary` | |

**Window scale** (product mock-ups; use in the app): base 14/1.45; row text 13.5; notes 12.5; meta 12; chips 11.5 mono 600; labels 10.5 mono 600 `.1em` uppercase; title `h4`/`.t` 700 17/1.25; `.big` mono 600 24/1.1 (cost); `.ptot-v` mono 600 34/1; verdict word serif 40/1.05 (34 at 560); note title serif 30/1.1; `.md` mono 400 13/1.7; mini-window title serif 28/1.15. Sizes below 12 px (10, 10.5, 11) exist in labels and meta; in the app keep labels at 10.5 px only when uppercase mono and at least 5:1 (the audit shows 4.48:1 failing, 9.4).

### 3.3 Eyebrow, mono labels, numerals
- **Eyebrow**: always above a title, one line, uppercase mono, `--mut`. Section eyebrows may carry a number ("01 · Plan") and a status chip (`Products.html:24,114`).
- **Mono is for identity, not emphasis**: ids (`P-05`, `S-07`), costs (`$3.85`), slash names (`/productdd`), labels, grades, code and markdown. Human labels first, slash name second in mono (AGENTS rule 10).
- **Numerals**: costs always two decimals with a dollar sign (`$7.65`, `est. $3.50`); counts as plain digits; dates `12 Oct`, times `10:42`; middle dot `·` separates label parts (`Investment route · plan v1`). Tabular figures are PROPOSED for tables: add `font-variant-numeric:tabular-nums` to `.ldg`, `.pr-c b`, `.ag-c` (not in the CSS today).
- **Emphasis in titles**: the second half of a display title is italic (`<em>`), `base.css:26`. One `<em>` per title, never in running text.

### 3.4 Wrapping
Titles `text-wrap:balance`; lead and body `text-wrap:pretty` (`base.css:22-28`). Long ids use `white-space:nowrap` (`.src`, `.ch`, `.status`). Measures: lead 44ch (hero) or 56ch (page hero), FAQ and prose 70ch.

### 3.5 Where the serif is allowed in the app (recommendation)
| Allowed (serif) | Not allowed (Overpass or Overpass Mono) |
|---|---|
| Brand wordmark in the nav header | Nav items, tabs, breadcrumbs, top bar |
| The verdict word in the verdict card (`.v-t`) | Chips, grade chips, confidence, status |
| Document titles: memo title, note title, plan name (`.note-t`, `.plan .pn`) | Table cells, ledger, run rows, costs |
| Empty-state and onboarding titles (`.mini .t`) | Buttons, form labels, inputs, errors, toasts |
| Display numerals in a hero metric (`.num`) | Rail headings, panel labels, settings, admin console |
| Rendered memo body headings (document view only), PROPOSED | Anything below 17 px |

Rule of thumb: **serif for what the user reads as a document or a decision, sans for what the user operates, mono for what the user checks.** At most one serif element per screen region.

## 4. Layout
### 4.1 Containers and rhythm
| Piece | Spec | Source |
|---|---|---|
| `.wrap` | `max-width:1240px`, centred, side padding 32 (24 at 960) | `base.css:34,192` |
| `.wrap-n` | `max-width:920px`, same padding; FAQ column | `base.css:35` |
| `.head` | column, gap 20, `max-width:820px`, margin-bottom 64 (40 at 960); `.head-c` centres | `base.css:41,42,195` |
| `.sec` | padding 128 0 (80 at 960) | `base.css:36,193` |
| `.sec-sm` | padding 88 0 (64) | `base.css:37,194` |
| `.band` | padding 128 0 (80); `.night.band` takes `--bg` | `ui.css:161,162,211` |
| `.alt` | background `--bg2`; sections alternate plain and alt | `base.css:16` |
| `.hero` | padding 84 0 0 (48 at 960); `.stage` margin-top 72, padding-bottom 96 (44 and 64) | `ui.css:13,19,208` |
| `.page-hero` | padding 104 0 88 (64 0 56) | `ui.css:22,210` |
| `.trust` | 40 0, hairline `--line2` above and below | `ui.css:28` |
| `.cta-band` | `padding-bottom:240px`; `.routes-low` art 1800 x 200 at the bottom | `ui.css:182-185` |
| `.foot` | padding 88 0 40; grid `1.6fr 1fr 1fr 1fr`, gap 48 | `base.css:179,180` |

Stacks: `.stack-s/m/l` (gap 12/24/40), `.row` (flex wrap, gap 12, centred, `base.css:43`).

### 4.2 Grids
| Class | Columns | Gap | At 960 | At 1100 | At 560 |
|---|---|---|---|---|---|
| `.g2` | 2 | 24 | 1 | | |
| `.g3` | 3 | 24 | 1 | | |
| `.g4` | 4 | 24 | 2 | | 1 |
| `.split` | `5fr 7fr`, centred vertically | 72 | 1 (gap 40) | | |
| `.split-r` | `7fr 5fr` | | 1 | | |
| `.flow` | 5 | 44 | | 2 (gap 32), arrows hidden | 1 |
| `.bk` | 5 | 26 | | 1, arrows turn vertical | |
| `.metro`, `.tline` | 5 | 28, 24 | vertical rail on the left | | |
| `.stats` | 4 | 32 | | 2 | 1 |
| `.evx` | `1.15fr 1fr` | 32 | 1, result first (`order:-1`) | | |
| `.fit` | `5fr 6fr` | 56 | 1 | | |
| `.onb` | `5fr 7fr` | 56 | | 1 | |
| `.msplit` | `1fr 480px` | 72 | 1 | | |

All grid tracks are `minmax(0,1fr)` so long words and mono ids never blow a column out; keep that.

### 4.3 Sticky and fixed
- `.nav` is `position:sticky;top:0;z-index:30` with `backdrop-filter:blur(14px)` and a `--line2` bottom hairline; inner row min-height 72.
- `.onb-win` sticky at `top:96px` (static at 1100); `.memo-aside` sticky at `top:104px` (hidden at 960 and replaced by `.inline-claim`).
- The rendered shots (`shots/v-vault.png`, `pl-conn-d.png`) show the sticky nav overlapping content mid-capture. That is a screenshot artefact of full-page capture, not a layout bug.

### 4.4 Mobile rules (390 px, and everything at or below 960)
1. Gutter 24, content width 342 at 390. No horizontal page scroll; only `.tbl-wrap` scrolls, the table inside keeps `min-width:640px` (`base.css:207-208`).
2. Type does not shrink below its `clamp` minimum: `.h1` stays 46 px, `.h2` 36, `.h3` 26 at 390.
3. Nav: `.links` and the outline button hide, the `<details class="menu">` burger appears; "Start free" stays visible, `width:auto` (`base.css:196-197,214`).
4. At 560 every `.btn` is full width, forms stack (`.cnf`), grids are one column, footer is one column, `.plan` padding 28 22, `.mini` padding 22 18 with `min-height:0`.
5. Product window: at 1100 the side column disappears; at 960 `.app-body` is one column and the rail drops below the main with a top border (`base.css:187-189,203-205`). `.ag` becomes `10px 1fr 60px` with the progress under the name; `.ph` and `.pr-s`, `.pr-t` hide; `.ldg` hides its third column at 560.
6. Targets: buttons 44 to 52 px, links 44 px, rows 64 px (`.choice`, `.stp`, `.mrow`, `summary`). In the window family some targets are 34 to 38 px (9.4).
7. Illustrative art hides on small screens (`.routes-svg{display:none}` at 960).
8. Order matters on mobile: the evidence result card comes first (`.evx-r{order:-1}`), then its controls.

## 5. Components catalogue
Format per component: purpose, classes (CSS source), variants, states, responsive, dark, accessibility, snippet. States the CSS does not define are PROPOSED. **Global focus** applies to every link, button, input, textarea and select: `outline:3px solid var(--focus);outline-offset:3px;border-radius:6px` (`base.css:65`; colour per 2.1). **Global disabled** is PROPOSED for all controls: `opacity:.5; cursor:not-allowed; pointer-events:none`, no hover; disabled controls are exempt from contrast rules (WCAG 1.4.3) but must keep their label. **Global pressed/active** is not styled in the CSS; PROPOSED: same as hover.

### 5.1 Buttons
- **Purpose.** Primary action, secondary action, compact action, window action.
- **Anatomy.** `.btn` (inline-flex, gap 10, min-height 52, padding 0 26, radius 999, 1.5 px transparent border, sans 600 16/1, `base.css:53`) plus a variant.
- **Variants.** `.btn-p` fill `--inv-bg`, text `--inv-fg`, hover `--btn-p-hover`. `.btn-s` transparent, border `--btn-s-bd`, hover fills `--fg`. `.btn-sm` min-height 44, padding 0 20, 15 px (nav). Trailing arrow: `<i class="ic ic-arrow">`. Window button `.btn-a` (radius 9, min-height 38, 13.5 px, fill ink) and `.btn-a.o` (white, 1 px border) exist only inside `.app`; they are `span`s in the mock-ups, so **use `<button>` in the app**.
- **States.** Default; hover (colour only, .2 s); focus global; pressed and disabled PROPOSED; loading PROPOSED: keep the label, set `aria-busy="true"`, show the striped bar treatment (`.ag.live .bar i` recipe) under the label, ignore clicks.
- **Responsive.** At 560 `.btn{width:100%}` except inside `.navr` (`base.css:213-214`).
- **Dark.** Token-driven through `--inv-*`, `--btn-p-hover`, `--btn-s-bd`.
- **A11y.** Links that look like buttons are `<a>`; actions are `<button type="button|submit">`. Icon-only buttons need `aria-label`.

```html
<a class="btn btn-p" href="Platform.dc.html#start">Start free<i class="ic ic-arrow"></i></a>
<a class="btn btn-s" href="Book.dc.html">Book time with us</a>
<a class="btn btn-s btn-sm" href="Book.dc.html">Book time</a>
```

**Pill link `.pill`** (hero announcement): inline-flex, padding 6 8 6 14, 1 px `--line`, radius 999, `--surf`, 14 px 600, with a 26 px `--fg` circle holding the arrow (`base.css:86-87`). **Pill navigation** `.links a` (padding 12 14, radius 999, `--fg2`; hover `--bg2` and `--fg`; current page `aria-current=page` same fill) and `.subnav a` (min-height 44, padding 0 18, 1 px `--line`, `--surf`; hover border `--fg`, `ui.css:253-255`) share the same shape language. Selected or current = filled `--bg2` (nav) or `--fg` border (subnav).

### 5.2 Text link `.tl`
Purpose: tertiary action, usually after a button. `inline-flex`, gap 8, min-height 44, 600 16, 1.5 px transparent bottom border that becomes `currentColor` on hover (`base.css:63-64`). Inline prose links use `text-decoration:underline` set inline in `Products.html` and `Platform.html` (6 occurrences, Appendix D); PROPOSED class `link-u` with `text-underline-offset:4px` (as `.evrs`, `.foot li a:hover`). Dark: inherits `currentColor`.

```html
<a class="tl" href="Products.dc.html#plan">See how the plan works<i class="ic ic-arrow"></i></a>
```

### 5.3 Eyebrow
`.eyebrow` (3.2). Always a `<p>` above a heading; may hold a status chip. Colour `--mut`.

```html
<p class="eyebrow">05 · Vault <span class="status st-live" style="margin-left:10px">At launch</span></p>
```

### 5.4 Tags and status chips
- **`.tag`** (`base.css:100`): inline-flex, gap 8, mono 600 12 uppercase `.08em`, padding 7 11, 1 px `--line`, radius 999, `--fg2`. With `.dot` (8 px circle, `background:currentColor`) coloured by line: `<i class="dot" style="color:var(--green)">`. Neutral label, not a status. `align-self:flex-start` inside columns (`ui.css:235`).
- **`.status`** (`ui.css:193-199`): inline-flex, gap 8, mono 600 11.5 `.04em`, padding 6 10, radius 999, nowrap. Variants `.st-live` At launch, `.st-build` Next, `.st-plan` Later (dashed). In `.cmp` cells they shrink to 11 px, padding 4 8, margin-left 8 (`ui.css:390`).
- **States.** None; chips are not interactive.
- **Dark.** `.night` rules exist (`ui.css:197-199`); tokens `--tn-green-*`, `--tn-amber-*`, `--bg2`/`--fg2`/`--mut`.
- **A11y.** The word is the meaning; the colour is reinforcement. Do not use `.status` for anything but At launch, Next, Later (the site also uses it for "Draft", "Planned", "Validé", "Message ready"; see Appendix D).

```html
<span class="status st-live">At launch</span> <span class="status st-build">Next</span> <span class="status st-plan">Later</span>
<span class="tag"><i class="dot" style="color:var(--green)"></i>Already available</span>
```

### 5.5 Chips
| Class | Purpose | Spec | Source |
|---|---|---|---|
| `.ch` (inside `.app`) | state, size, id, tier | mono 600 11.5, padding 6 9, radius 7, `--chip` + `--fg2`; tones `.ch-b` blue, `.ch-g` green, `.ch-o` orange, `.ch-k` inverse | `base.css:139-140` |
| `.ch-l` | flow chips on the site | same type, `--bg2` + `--fg2` | `ui.css:77` |
| `.chip` | scope label (Finance, Tech) | 1 px `--line`, radius 999, padding 8 16, 15 px 600, `--bg` | `ui.css:284-285` |
| `.ask` | "ask for another" toggle | min-height 44, padding 0 16, radius 999, 1.5 px **dashed** `--mut`, 14.5 px 600; hover `--bg2`; `aria-pressed=true` fills `--fg`, solid border, text `--bg`; label becomes "Asked: X" | `ui.css:490-492` |
| `.src` | source id | mono 500 11, padding 1 7, radius 5, `--chip` + `--fg2` | `base.css:112` |
| `.gr` | grade | 24 px square, radius 6 | `base.css:107` |
| `.conf` | confidence | mono 600 10.5, padding 5 8, radius 6, 1 px border, tone by `.conf-high/medium/low` | `ui.css:94-97` |

Ask-chip behaviour: toggles per name, shows "Noted: X. Thank you." in a `role="status"` line (`Platform.js:22,30`). In the app these requests are stored (AGENTS rule 11), so the confirmation must reflect a saved request.

```html
<button type="button" class="ask" aria-pressed="false">+ Amazon Bedrock</button>
<span class="gr gr-a">A</span> <span class="gr">B</span> <span class="gr gr-c">C</span> <span class="src">S-07</span>
<span class="conf conf-medium">Medium confidence</span>
```

### 5.6 Cards and blocks
| Class | Anatomy | Spec | Dark |
|---|---|---|---|
| `.card` | surface | `--surf`, 1 px `--line`, radius 22, padding 36 (28 22, radius 18 at 960) | tokens |
| `.card-t` | vertical stack | flex column, gap 18 | tokens |
| `.card-lift` | hover lift | `translateY(-3px)` and `--sh-card`, .25 s | shadow needs `--sh-rgb` |
| `.feat` | icon well + text | `.ic-b` 48 px, radius 14, `--bg2` (`--surf2` in `.night`) | tokens |
| `.pillar` | rule-led column | top 1 px `--line`, padding-top 22, gap 12 | tokens |
| `.plan` (+`.hi`) | plan card | `--surf`, radius 26, padding 36; `.hi` border `--fg` + `--sh-ring-hi`; `.pn` serif 40, `.pp` mono 13 | tokens |
| `.ctl` | control row | top rule, `.ic-b` 44 px radius 12 beside a `.status` | tokens |
| `.rd` (+`.n`,`.l`) | roadmap column | top rule 2 px `--fg` (At launch), `--amber` (Next, dot bullets), dashed `--mut` (Later) | amber literal in CSS, token now |
| `.stat` | number block | top rule, serif numeral | tokens |
| `.door`, `.door-dark` | two-way choice | radius 28, padding 44; dark = inverse surface with its own button and check colours | `--inv-*` |
| `.person` | team card | `.avatar` 72 px circle, serif initials | tokens |
| `.skill` | method card | `.skill-bar` 6 px top bar in a line colour | tokens |
| `.honest` | plain-speaking callout | `--surf`, 4 px left border `--orange`, radius 14, max 880 | tokens |
| `.ok-card` | confirmation | radius 26, padding 44 | tokens |

States: only `.card-lift` has hover; `.plan.hi` is the selected look. No card is a button; if a card is a link, wrap the heading in `<a>` and extend with `::after` (PROPOSED), never make `.card` itself focusable.

```html
<div class="card card-t card-lift"><i class="ic ic-gate ic-l"></i><h3 class="h4">Home is an inbox, and so is your email</h3><p class="body">What needs you, what is running, what was delivered, across every target.</p></div>
<div class="pillar"><h3 class="h4">A ledger, not a transcript</h3><p class="body">Every claim carries a source id and a grade, A, B or C.</p></div>
```

### 5.7 Checklist `.chk` and "never" list
`.chk li`: flex, gap 12, padding 6 0, check icon `--green-t` offset 3 px (`base.css:102-103`). `.rd.n` and `.rd.l` swap the check for a dot (`ui.css:414-417`). `.never`: two columns, 18 px rows with a 26 px orange circled X (`ui.css:440-443`; icon is an inline SVG, stroke 2). Both are lists (`ul`), check icons are decorative (`aria-hidden`).

```html
<ul class="chk"><li><i class="ic ic-check"></i><span><b>Priced per agent, before launch.</b> Costs come from each agent’s profile.</span></li></ul>
```

### 5.8 Tables
- **`.tbl`** (`base.css:160-164`): full width, header mono 12 uppercase `--mut`, cells padding 20, 1 px `--line` top border, first column `--fg` 600, other cells `--fg2`. `.yes` = `--green-t` 600, `.no` = `--mut`. **`.cmp`**: `table-layout:fixed`, first column 22 % min 170, 15 px cells; `tr.grp td` is a group row (`--bg2`, mono 12 uppercase). Wrapper `.tbl-wrap` scrolls below 960 and the table keeps `min-width:640px`.
- **Window tables**: `.app table` (10.5 mono headers, cells 10 padding, 13.5, `border-top` `--line2`); `.ldg` (cells 9 8; `tr.new` warn wash, `tr.stale` stale wash, `ui.css:128-131`).
- **States.** No row hover or selection exists; PROPOSED: hover `--bg2`, selected `--surf2` with a 2 px left `--fg` rule, `aria-selected` on grid rows.
- **A11y.** `scope="col"` on headers (used on the site). Status cells carry text, never colour alone.

```html
<div class="tbl-wrap"><table class="tbl cmp"><thead><tr><th scope="col">&nbsp;</th><th scope="col">Free</th></tr></thead>
<tbody><tr class="grp"><td colspan="2">Evidence</td></tr><tr><td>Email ingestion</td><td>Yes<span class="status st-build">Next</span></td></tr></tbody></table></div>
```

### 5.9 FAQ (details)
`details.faq`: top rule 1 px `--line`, last has a bottom rule; `summary` flex space-between, padding 24 0, 19 px 600, min-height 64, no marker; `::after` is "+" (serif 28) that becomes the minus sign U+2212 when open; answer `p` padding-bottom 28, max 70ch, `--fg2` (`ui.css:186-192`). Native `<details>` gives keyboard (Enter/Space), no JS. Dark: tokens. A11y: summary has a 64 px target; the plus/minus is decorative CSS content, so the open state is announced by the browser.

```html
<details class="faq"><summary>Do I have to paste an API key?</summary><p>Not if your provider lets you sign in: you approve access on the provider's own screen. Where it does not, you can paste a key as a last resort. It is encrypted, never visible to agents, and you can delete it in one click.</p></details>
```

### 5.10 Forms
| Control | Classes and spec | States |
|---|---|---|
| Text field | `.field` (column, gap 8): `label` 14 px 600; `input`/`textarea` `--surf`, 1.5 px `--line`, radius 12, min-height 52, padding 12 16, 16 px (iOS no-zoom), textarea min 140, `resize:vertical` (`base.css:167-171`) | focus: border `--fg` plus the global ring; error PROPOSED: border `--orange-t`, helper text `--orange-t` with `role="alert"`, `aria-invalid="true"`; disabled PROPOSED |
| Inline ask / search | `.cnf` (flex, gap 10, margin-top 6) input min-height 44, padding 0 14, radius 12, + `.btn.btn-s.btn-sm` | same; at 560 stacks, button full width (`ui.css:493-496`) |
| Choice (radio card) | `button.choice` with `.radio`: column or grid card, 1.5 px `--line`, radius 16, padding 18 20, min-height 64; `aria-pressed=true`: border `--fg`, `--sh-ring`, filled dot 10 px (`base.css:172-176`) | the site uses `aria-pressed` on a button group; in the app use `role="radiogroup"` with real radios (PROPOSED) |
| Switch | `button.swb` (inline-flex, min-height 38, padding 0 12, radius 10, 1 px `--line-ui`, 13 px 600) containing `span.sw` (36 x 20, radius 10, knob 16 px moving 16 px, .2 s) and a label; `.sw.on` green | `aria-pressed` carries the state; hover none; focus global |
| Segmented | `.seg` (inline-flex, 1 px border, radius 10, padding 3) with buttons min-height 34; `aria-pressed=true` = inverse fill | |
| Code | `.code i` boxes 52 max, aspect 1/1.1, mono 22 (illustration only) | production OTP: one input with `autocomplete="one-time-code"` PROPOSED |
| Error line | `<p class="small" role="alert" style="color:var(--orange-t);min-height:22px">` (`Book.html:32`) | reserve the line so the layout does not jump |

Validation copy: "Please tell us your name." "Please enter a valid work email." (`Book.js:22-23`): polite, specific, no blame. Preview notice under a not-yet-wired form: "Preview: this form is not connected yet." in `.tiny`.

```html
<div class="field"><label for="f-email">Work email</label><input id="f-email" type="email" autocomplete="email"></div>
<button class="swb" aria-pressed="false"><span class="sw"></span><span>Share with agents</span></button>
```

Known flaw: in the vault window `.swb` text wraps ("Share with agents for this target") because it lacks `white-space:nowrap` (`shots/v-vault.png`); add it.

### 5.11 Navigation and mobile menu
- **Anatomy.** `header.nav > .wrap.navin` with `.brand` (mark + wordmark), `nav.links` (5 links), `.navr` (outline "Book time", filled "Start free", `details.menu`). Sticky, blurred, `--nav-bg`, 1 px `--line2` bottom.
- **Brand mark** `.mark`: three bars, 5 px wide, radius 2, heights 12, 22, 16, colours blue, orange, green, baseline aligned (`base.css:77-78`, `nav.html:3`). It is the only place the three lines appear together without a label.
- **Mobile.** At 960 `.links` and the outline button hide; `details.menu` shows: `summary` 44 px circle with a CSS burger (18 x 2 bars) and `.menu-p` popover (right 0, top 54, min-width 250, radius 18, padding 8, `--sh-menu`, z 40) holding 7 links (`ui.css:3-10`).
- **States.** Link hover and `aria-current=page` = `--bg2` pill. Menu is open/closed through `<details>`.
- **A11y.** `aria-label` on the `nav` and on the summary; skip link `.skip` is the first element (`base.css:49-50`). The popover does not close on Escape or outside click; PROPOSED: add both and return focus to the summary. In the app the primary nav is a drawer at 900 px and below (7.4).

```html
<header class="nav"><div class="wrap navin">
<a class="brand" href="/" aria-label="TheDiligence, home"><span class="mark" aria-hidden="true"><i style="height:12px;background:var(--blue)"></i><i style="height:22px;background:var(--orange)"></i><i style="height:16px;background:var(--green)"></i></span>TheDiligence</a>
<nav class="links" aria-label="Main"><a href="Products.dc.html" aria-current="page">Products</a><a href="Solutions.dc.html">Solutions</a></nav>
<div class="navr"><a class="btn btn-s btn-sm" href="Book.dc.html">Book time</a><a class="btn btn-p btn-sm" href="Platform.dc.html#start">Start free</a>
<details class="menu"><summary aria-label="Open menu"><span class="burger" aria-hidden="true"></span></summary><div class="menu-p"><a href="Products.dc.html">Products</a></div></details></div>
</div></header>
```

### 5.12 Footer
`footer.foot`: grid `1.6fr 1fr 1fr 1fr`, gap 48 (2 columns at 960, 1 at 560); brand + tagline (max 34ch) + "Paris and London"; three link columns with `h4` mono 12 uppercase `--mut`; links 15 px `--fg2`, min-height 36, hover underline offset 4; bottom row `.footb` (14 px `--mut`, top rule, margin-top 64) carries the working-name notice and **"Evidence-graded analysis, not investment advice."** (`base.css:179-184`, `footer.html:38-39`). External links `target="_blank" rel="noopener"`. Footer links are 36 px high: acceptable for AA 2.5.8 (24 px); in the app use 44 px on touch.

### 5.13 Logos row
`.trust` strip (top and bottom `--line2`, padding 40 0) with centred `.eyebrow` and `.logos` (flex wrap, centred, gap 36 72 (28 44 at 960), `color:var(--fg)`, `opacity:.82`). Logos are inline SVG symbols, recoloured to `currentColor`; sizes are generated by `build.js` as `.lg-paypal` 106x38, `.lg-quadrille` 54x54, `.lg-tomcat` 128x35, `.lg-tgo` 158x18. The PayPal item is a lockup `.lgv`: wordmark + typeset "Ventures" (sans 700 25, `-.01em`; 17 in the board). Each logo is `role="img"` with `aria-label` (legal names: "PayPal Ventures", "Quadrille Capital", "TomCat", "The Good Ones"; the board asks to confirm "TomCat Ventures"). Originals `.og` keep their own colours and are used only on the validation board. Dark: works unchanged because `currentColor` follows `--fg`. Do not use logos without the fund's agreement (open item on `Logos.html`).

```html
<section class="trust" aria-label="They trust us"><div class="wrap"><p class="eyebrow">They trust us</p>
<div class="logos"><span class="lgv" role="img" aria-label="PayPal Ventures"><svg class="lg lg-paypal"><use href="#lg-paypal"/></svg><span class="lgv-t">Ventures</span></span></div></div></section>
```

### 5.14 Hero and page hero
Home `.hero`: relative, hidden overflow, `.hero-bg` radial glow (`--glow-0` at 50% 0%, 70% x 55%, fading to `--glow-1` at 72%), `.hero-copy` centred column gap 28 (pill, `.h1`, `.hero-sub`, `.lead` 44ch, buttons, `.hero-note` 14 px `--mut`), then `.stage` with the product window (max 1180) over decorative `.routes-svg` (four metro-style strokes, hidden at 960). Page hero `.page-hero`: left aligned, eyebrow + `.h1` (italic second half) + `.lead` 56ch + tags row + buttons + `.subnav`. One `h1` per page. The word "Diligence." alone as the home h1 is intentional.

### 5.15 Closing band
`section.band.night.cta-band`: dark band (token flip), centred stack (`.h2` max 14 to 18ch, optional `.lead`, two buttons), `.routes-low` art at the bottom (1800 x 200, `color:#ECEAE4`, opacity .7), `padding-bottom:240px`. Every page ends with one. In the app the dark band is not used; the equivalent is an empty-state or upsell card (6.5).

### 5.16 Workflow lanes `.hf`
Ordered list of steps: columns `150px 1fr 110px`, gap 24, row padding 18, bottom rule. `.who` chip (mono 600 11.5 uppercase `.06em`, radius 12): `.who` itself (blue; the markup also adds `who-a`, which has no rule) = Agent(s), `.who-p` orange = You, `.who-t` green = Team, `.who-k` inverse = your assistant (with a `Next` status inside). Right column `.via` mono 12 `--mut` right aligned: "In the app", "Email", "App or email", "MCP". At 760 the row stacks and `.via` aligns left (`ui.css:499-507`). Dark: chips are literals today; use `--tn-*`. This is the app's activity-feed grammar: who acted, what, through which channel.

```html
<ol class="hf"><li><span class="who who-a">Agent</span><p>The coordinator drafts the plan and its price.</p><span class="via">In the app</span></li></ol>
```

### 5.17 Evidence widget `.evx`
Interactive explainer on the site (`evidence-ui.html`), and the pattern for any "layers of evidence" control.

- **Left** `.evx-l`: stack of `.lay` rows (grid `26px 1fr auto`, min-height 84, 1.5 px `--line`, radius 16, padding 18 20). `.lay-base` is always on. `button.lay` toggles `aria-pressed`; on = border `--fg` and the 24 px `.ck` checkbox fills `--fg` with a check. Right text `.lw` mono 11.5 uppercase ("Agents", "You upload", "You or us", "We run it").
- **Right** `.evx-r` (`role="status" aria-live="polite"`): eyebrow, `.evbar` (34 px high, radius 10, three segments A, B, C with `width` transition .45 s), legend `.evleg` with grade chips and counts, `.evres` confidence chip + score, `.evmsg` serif sentence, reset `button.tl.evrs`.
- **Rules.** Confidence = (A + ½B)/total (2.1). Messages: High "Ready for the room. The few estimates left are flagged, not hidden."; Medium "A draft a committee can argue with, because each claim shows its source."; Low "A first read. Good for deciding where to dig, not for deciding." (`ui.js`).
- **Responsive.** At 960 the result card moves above the controls; at 560 `.lw` drops under the text and the card padding shrinks to 20.
- **A11y.** The bar is `aria-hidden`; counts are in the legend. Dark: segment colours are literals today (`--ev-*`).
- **Label.** The site says "Illustrative mix of 60 claims, not a measured accuracy." under it; keep that sentence whenever data is sample data.

### 5.18 Broker diagram `.bk`
Five numbered nodes in a row (`ol.bk`, grid 5, gap 26): `.bk-n` card (radius 20, padding 24 22) with key `.bk-k` (mono 11.5 uppercase "1 · You"), title (serif 25), paragraph 15 px, and a footer `.bk-h` (icon + 13 px 600 line, top rule). Arrows are `::after`/`::before` pseudo-elements (2 px line + triangle) in `--mut`; at 1100 the list becomes vertical and the arrows rotate. The sandbox node `.bk-no` has a 1.5 px dashed `--orange-t` border, orange key and icon: the one place where a secret must never be. Used on a `.night` band. This is a pure illustration (`aria-label` on the `ol`).

### 5.19 Process diagrams
- **`.flow` / `.fl`** (5 steps, numbered `01`, arrows via pseudo-elements, `.fl-key` inverse card for the key step with `.fl-ag` agent list on translucent rows). Hidden arrows at 1100.
- **`.metro`** (five stations on a three-colour rail: blue 0 to 40 %, orange 40 to 60 %, green 60 to 100 %, `ui.css:153-158`), **`.tline`** (same, blue to 40, orange to 80, green after, `ui.css:290-295`), **`.vmetro`** (vertical card, blue/orange/green/ink, `ui.css:262-268`). Stations are `.stn` (16 px circle, `--bg` fill, 3.5 px ring `--blue`; `.stn-o`, `.stn-g`, `.stn-k` ink; 24 to 26 px with 6 px rings in metros). At 960 all become vertical rails on the left.
- Use for: stages of the method and the plan route. Colours encode the line; the label always says the stage.

### 5.20 The product window family
The product mock-ups are one component with six pages. They are the visual contract for the app. All rules live under `.app` and are **light only today** (2.4); port them with tokens.

| Piece | Class | Spec (source) | Token mapping |
|---|---|---|---|
| Window | `.app` | bg `#F2F3EF`, 1 px `rgba(20,22,26,.14)`, radius 18, `--sh-win`, 14/1.45 (`base.css:119`) | `--bg`, `--line`, `--r-win`, `--sh-win` |
| Title bar | `.app-bar` | height 44, three 10 px dots, mono 12 title, right note ellipsised (`base.css:122-125`, `ui.css:342`) | `--bg2`, `--line` |
| Body | `.app-body` | grid `196px 1fr 288px`, min-height 460; `.app-body-2` has two columns | `--win-side`, `--win-rail` |
| Side | `.app-side` | padding 18 12, `--bg2`-like, `.lab` mono 10 uppercase, items min-height 36 radius 9, `.on` white with `--sh-lift` (`base.css:128-132`) | `--bg2`, `--surf` |
| Main | `.app-main` | padding 22 24, gap 16, min-width 0 | `--bg` |
| Rail | `.app-rail` | left border, padding 20, gap 14, `#F7F8F4` | `--surf2` |
| Panel | `.panel` | white, 1 px rule, radius 12, padding 14 16 | `--surf`, `--line` |
| Row header | `.rowh` | flex space-between, wrap, label above `h4` | |
| Tabs | `.tabs button` | min-height 40, bottom 2 px ink when `aria-selected=true` | `--fg`, `--mut` |
| Markdown | `.md` | mono 13/1.7, links blue with 1 px `--link-bd` underline | `--blue-t`, `--link-bd` |
| Note | `.note-t` (serif 30), `.mini .note` (13/1.5, top rule 14) | | |
| Meter and bar | `.meter` 8 px, `.big-meter` 10, `.bar` 8 px, `.pbar` 6 px, radius 3 to 4 | `--track`, `--fg` | |

Scrollbars and overflow: `overflow:hidden` on `.app`; inner columns use `min-width:0`. Labels in the window bar always include a note: `Illustrative`, `Northwind · illustrative`, `Encrypted in your browser · illustrative`.

```html
<div class="app"><div class="app-bar"><i></i><i></i><i></i><b>Northwind · Memo</b><span>Illustrative composite. Not a real company.</span></div>
<div class="app-body"><div class="app-side"><div class="lab">Northwind</div><div class="it on">Memo</div><div class="it">Evidence</div></div>
<div class="app-main"><div class="rowh"><div><div class="lab">Investment route · delivered</div><h4>Northwind</h4></div></div></div>
<div class="app-rail"><div class="panel"><div class="lab">Storage</div><p>Hosted by us, encrypted in your browser.</p></div></div></div></div>
```

### 5.21 Plan
`app-plan` window: header row with label "Investment route · About 25 min · 1 gate" and title "Plan before you build"; segmented `.seg` (Economy, Balanced, Frontier) with a one-line note; table `.ptab` of `.pr` rows (grid `1.5fr 1.1fr 92px 1.3fr`: dot + name + slash name | start condition | tier `.ch` | `.pbar` + cost mono) under a `.ph` header; total block `.ptot` (label, `.ptot-v` mono 34, `.meter.big-meter`, "$4.85 under your cap" and "cap $20"); actions `.pact` ("Approve and run", "Save the plan, run later", `.pdelta` "A new revenue export later: rebuild 2 of 8 for $3.85"). Mobile: `.ph`, `.pr-s`, `.pr-t` hide; `.ptot` stacks. State: preset change recomputes and animates `.pbar` (no transition today; PROPOSED .45 s width). A gate row is flagged in the plan data (`gate:true` for Product).

```html
<div class="pr"><span class="pr-n"><i class="s" style="background:var(--orange)"></i><b>Product</b><span class="mono">/productdd</span></span><span class="pr-s">After Cohorts, Panel</span><span class="pr-t"><span class="ch">Frontier</span></span><span class="pr-c"><span class="pbar"><i style="width:100%;background:var(--orange)"></i></span><b class="mono">$3.50</b></span></div>
```

### 5.22 Run
`app-run`: eight `.ag` rows in `.ags` (grid `10px 1.05fr 1.5fr 64px`, gap 14, padding 9 0, top rule): colour dot `.s`, name + mono "Sandbox 1 · Standard" (`.ag-n`), progress `.bar` + status text `.ag-t`, cost `.ag-c` mono. Modifiers: `.ag.live` (striped moving fill, 1.4 s linear), `.ag.wait` (opacity .55, "est. $3.50"). Gate `.gate` (warn wash, 34 px orange circle with gate icon, bold title, helper line, "Review" button). Rail: cost panel `.big` + `.meter` with a spent fill and an orange estimate marker `u` (2 x 16) + `.meter-l` ("spent", "estimate", "cap $20"); evidence panel with `.gmix` (A 14, B 9, C 3); verifier note. The mock-up root has `role="img"` and a long `aria-label`; in the app these are live regions and real lists. **Do not** express "waiting" with opacity (fails contrast, 9.3): use `--mut` text and the planned state.

### 5.23 Memo
`app-memo`: side list (Memo, Changes with a count tag, Evidence, Stack, Runs; "Deal stage" with dot); main: `.rowh` with label "Investment route · delivered", target name and the **Show sources** switch (`.swb`); `.verdict` (inverse card: label, serif `.v-t` "Conditional", `.v-n` "Invest if onboarding is fixed.", `.v-d` "Evidence-graded analysis, not investment advice."); then one `.msec` per section: header (`b` title + `.conf` "Medium confidence"), claim `.msec-c` 14.5/1.45, source line `.msec-s` (grade chip, `.src`, note) hidden when sources are off; final `.msec.msec-ap` "Data still needed" (dashed, `--surf2`) with a request row. Rail: `.tabs` Work | Lineage; Work = `.trace` of `.tr` rows (grid `62px 1fr`: mono verb in blue, text: search, read, compute, decide, gate); Lineage = `.lin` rows ("Built from", "This", "Feeds into") of `.src` and `.ch` chips plus a plain-words sentence: "If P-01 changes, Cohorts, Product and what they feed are rewritten. Nothing else is."

States: sources toggle on/off; tab selected; section hover none today (PROPOSED: selecting a section loads it into the rail, SPEC criterion 8). Verdict `Pending` renders in `#7C838D` before the stage completes (`Method.js:93`); token: `--mut`.

```html
<div class="msec"><div class="msec-h"><b>Product</b><span class="conf conf-medium">Medium confidence</span></div>
<p class="msec-c">Retention flattens after the ninth month.</p>
<div class="msec-s"><span class="gr gr-a">A</span><span class="src">P-01</span><span class="mut">data room export</span></div></div>
```

### 5.24 Ledger
`app-ledger`: header (label "Evidence ledger", title, `.ch` "5 sources"); drop zone `.drop` (1.5 px dashed, radius 12, `--surf2`, text + `.btn-a`); after a drop, `.banner.banner-w` ("P-05 added. It supersedes P-01." + "Rewrite only those · $3.85") and after rebuild `.banner.banner-g`; table `.ldg` (Id mono | Source | Class chip | Grade | Used by) with `tr.new` warn wash; row of four `.stk` cells (name, version) where `.st` = stale wash and `.ok` = delivered wash. Data classes shown as chips: `public`, `target-confidential`, `fund-internal`. Copy rule: say exactly what changed and what did not ("Six other sections untouched").

### 5.25 Vault
`app-vault`: side list (notes grouped Northwind and Fund); main: label "Note · fund-internal", serif `.note-t`, `.lock` badge ("Only you can read it", wash-ok, 14 px lock icon) and `.panel.md` markdown with `[[wikilinks]]`; rail: Storage panel, Agents panel with `.swb` "Share with agents" and a state sentence (Off: "Off. Agents cannot read this note, and cannot tell it exists." On: "On, for Northwind only. The note is decrypted into this run’s sandbox and the read is logged in the Work tab."), Backlinks chips. At 1101 and above the window uses narrower columns `132px 1fr 224px` (`ui.css:542`). `.tree .it.sub` indents 24 for folders.

### 5.26 Onboarding stepper and mini windows
`.onb` two columns: `.stps` list of `button.stp` (grid `44px 1fr`, padding 20 22, radius 18, `.num` serif 38 muted; `aria-pressed=true`: `--surf`, 1 px border, `--sh-step`, numeral `--fg`) and `.onb-win` sticky window with `.mini` content: label "Step 2", serif title, `.fld` + `.inp` (white, 1.5 px, radius 10, min-height 44; `.inp.f` = focused ink border), `.pv` provider rows (grid `36px 1fr auto`; status `.ok` "Connected" green, `.add` "Connect" outline, `.soon` "Ask" dashed), `.runl` run list, `.mail` email preview, `.code` OTP. These are screens of the platform's settings and sign-in; the app implements them for real (7.5, `settings`).

### 5.27 Other small pieces
`.legend` (flex wrap, 14 px `--mut`, grade chip + words), `.prov` (list of provider names serif 22 with a mono status at the right), `.cnl` (connector list rows, 18 px, status chip at the right), `.steps3` and `.nx` (numbered steps, serif numerals), `.iv` (stat pair, serif 28), `.meta` (definition list, 96 px mono term column, stacks at 960), `.term` (always-dark terminal window with `--term-*`), `.avatar` (72 px circle, serif initials), `.crumbs` (flex row gap 10, no other style).

## 6. Patterns
### 6.1 Status-tag semantics
| Word | Means | May be said | Must not be said | Class |
|---|---|---|---|---|
| At launch | ships with the first release | "Works today" copy, a live control | any date | `.status.st-live` |
| Next | on the roadmap, not built | "Next", a link to ask for it | "coming soon", "beta", a date, a verb in the past tense | `.status.st-build` |
| Later | planned, no date | "Later" | any commitment | `.status.st-plan` |

Rules. (1) One chip per feature, beside its title or eyebrow, never inside running text. (2) A Next or Later feature is never a working control; if it appears, it is disabled or wrapped in "Preview" copy (6.2). (3) The roadmap is closed to these three words in public copy; app states use the state language (2.1), not `.status`. (4) A feature moves to At launch only when its acceptance criterion passes; AGENTS keeps `vault` behind a flag until criterion 18 (a, b) passes and `vault_obsidian` until 18 (c). PROPOSED: in the app the chip is rendered from the feature flag, never typed by hand.

### 6.2 "Illustrative" and "Preview"
| Situation | Pattern | Source |
|---|---|---|
| A product mock-up on the public site | window bar note `Illustrative`, `Northwind · illustrative`, `Encrypted in your browser · illustrative`, or `Illustrative composite. Not a real company.`; a `.tiny` caption under interactive demos: `Illustrative. Toggle the sharing.`, `Illustrative. Drop the file to see what happens.`, `Illustrative plan. Try the routing.` | `ui-run.html:3`, `memo-ui.html:2`, `Products.html:37,89,129`, `Main.html:99` |
| Sample numbers | `Illustrative mix of 60 claims, not a measured accuracy.` under the evidence widget | `Main.html:76` |
| A form or control not wired yet | `Preview: this form is not connected yet.` (`.tiny`), plus the fallback channel ("write to us on ..."); after submit, `Preview: nothing was sent, because this form is not connected yet.` | `Book.html:34,42` |
| A request that is not stored yet | `Preview: requests are not recorded yet.` | `Platform.html:120` |

In the app: sample data is only used in the empty-state preview and onboarding. It carries the same words in the same place (window bar or `.tiny`), and never appears in a ledger, memo or export. Once a control is connected the "Preview" line is deleted, not hidden. A control for a Next feature is disabled with the `Next` chip, not removed.

### 6.3 Evidence grade chips and source lines
- **One claim, one source line**: grade chip, source id, a note. `A` solid, `B` outline, `C` dashed (2.1). Order is always grade, id, note (`.msec-s`, `.rules`, `.legend`).
- **Sourceless is allowed only at C**: the ledger tool rejects any other claim (AGENTS rule 2). The UI shows a `C` chip and the note "estimate, no source" rather than an empty id.
- **Confidence is derived, never typed**: (A + 0.5·B) / (A + B + C); High at 0.70 or more, Medium at 0.45 or more, else Low. The chip says "High confidence", "Medium confidence", "Low confidence".
- **Source ids** are mono and stable: `S-` web, `P-` provided, `I-` interview. A superseded source stays visible with its replacement ("P-05 added. It supersedes P-01.").
- **Show sources toggle** (`.swb`) hides every `.msec-s`; the default for the memo is on for the owner and off for a shared read-only link, PROPOSED.
- **Flag this claim** (SPEC criterion 15) is a text button at the end of the source line, PROPOSED class `claim-flag`, 44 px target on touch.

### 6.4 Verdict line
The verdict card `.verdict` is the first thing on a memo: label (`Verdict` in `.lab`), the word in serif 40 (`.v-t`), one plain sentence (`.v-n`, 14), then the disclaimer (`.v-d`, mono 11): **"Evidence-graded analysis, not investment advice."** Words: `Invest`, `Conditional`, `Pass`; before the stage completes, `Pending` in `--mut` (`Method.js:91`). Sentence form: "<Verdict word> if <condition>." ("Invest if onboarding is fixed."). The disclaimer is mandatory on screen, in the PDF header, in the Google Doc and in the shared-link view (AGENTS "UI conventions", SPEC criterion 10). The verdict colour is the inverse surface (2.1); the word is never coloured red or green, because the verdict is a judgement, not a state.

```html
<div class="verdict"><span class="lab">Verdict</span><span class="v-t">Conditional</span><span class="v-n">Invest if onboarding is fixed.</span><span class="v-d">Evidence-graded analysis, not investment advice.</span></div>
```

### 6.5 Empty states (PROPOSED, AGENTS: "say what to do next and carry a feedback link")
Anatomy, using the `.mini` window recipe: serif title (`.mini .t`, 28), one sentence in `.body`, one primary `.btn.btn-p.btn-sm`, optional `.tl` secondary, and a `.tiny` line "Something missing? Tell us" linking to the feedback form. No illustration, no emoji.

| Place | Title | Action |
|---|---|---|
| Home, no targets | "Add your first target" | New target (`⌘N`) |
| Evidence, no files | "Drop the first file" | Drop zone is the empty state; the `.drop` box itself |
| Memo before a run | "No memo yet" | "Review the plan" |
| Changes, nothing new | "Nothing changed since you last reviewed" | none; the page stays quiet |
| Rail, nothing selected | "Pick a section" | none |
| Discuss, no comments | "No comments on this section" | Comment field focused |

### 6.6 Loading (PROPOSED beyond what exists)
| Case | Pattern | Source |
|---|---|---|
| A running agent | `.ag.live` striped bar, 1.4 s linear loop (`slide`), plus the word "Running" and a live cost | `ui.css:50-51` |
| Content placeholder | `.skel`: stack of `i` bars 8 px high, radius 4, `--track`, gap 8; static in the CSS. PROPOSED: pulse opacity .6 to 1 over 1.4 s, off under reduced motion | `ui.css:323-324` |
| Content arrival | `.fade` .5 s ease, `translateY(6px)` to rest | `ui.css:325-326` |
| Button waiting on the server | label stays, `aria-busy="true"`, bar under the label, clicks ignored | PROPOSED |
| Page / route | Next.js `loading.tsx` renders the shell with skeletons in `main` and the rail; the nav never reflows | PROPOSED |

Rules: show a skeleton only after 200 ms (PROPOSED, avoids flashes); never block the shell; a long job shows the plan estimate and "About 25 min", not a spinner. Announce completion in a `role="status"` region.

### 6.7 Errors (PROPOSED, built on existing pieces)
| Level | Pattern | Tone |
|---|---|---|
| Field | border `--orange-t`, message under the field in `.small` `--orange-t`, `role="alert"`, `aria-invalid="true"`, line reserved (`Book.html:32`) | "Please enter a valid work email." |
| Section / panel | `.banner.banner-w` (warn wash), icon + sentence + one action | "The export failed. Try again, or download the Markdown." |
| Run failure | a failed station is `needs-you` with the reason and the options: retry, skip, edit the plan. A partial result is shown as delivered with a `partial` note and the blocked list (SPEC phase 2) | "Cohorts failed. Product and Panel ran. Retry Cohorts, or edit the plan." |
| Page | `error.tsx`: serif title "Something went wrong", the error id in mono, `Reload`, `Tell us` | no stack trace |
| Offline / 429 | banner at the top of `main`, the run pauses rather than fails (SPEC p2-broker) | "The provider paused the run. It resumes by itself." |

Never show a raw error string, a key, a prompt or third-party text (AGENTS "Engineering conventions": logs never carry evidence text).

### 6.8 Toasts (PROPOSED; none exist in the site)
A toast confirms a completed, reversible action ("Comment added", "Link copied", "Request saved"). Anatomy: inverse surface (`--inv-bg`), `--inv-fg` text 14 px, radius `--r-12`, padding 12 16, `--sh-menu`, bottom-centre on mobile and bottom-left of `main` on desktop, `z-index:var(--z-toast)`. `role="status"` (polite); an error toast does not exist: errors use 6.7. Auto-dismiss after 5 s, paused on hover and focus, and never the only record (the action also appears in the activity log). One toast at a time; an Undo `.tl` where the action is reversible. Under reduced motion: no slide, fade only.

### 6.9 Forms
Label above, helper under, error replaces the helper; required marked in the label text ("Work email (required)"), never by colour. One primary action; Enter submits. Preserve input on error. Server actions validate with zod (AGENTS); the message strings are written for people (8). Success replaces the form with a confirmation block in the `.ok-card` style on the site and with a toast plus the new state in the app. Autocomplete attributes are mandatory on email, name and one-time codes.

## 7. Platform app shell (DERIVED from AGENTS, SPEC and the mock-ups; PROPOSED where marked)
`prototypes/platform-v4.html` is the reference named by earlier versions of AGENTS and SPEC but was never supplied. Everything here is therefore built from (a) AGENTS "UI conventions" and "Layout", (b) SPEC criteria 8, 11, 12, 17 and the phase 1 to 3 tasks, (c) the six product windows on the site. When the prototype is available, diff it against this section and the prototype wins on layout, this document on tokens.

### 7.1 Shell
Three columns: **nav 232 | main (fluid) | rail 400** (AGENTS "Layout"). The mock-up window is the same grid at 196 / 288, scaled down for the site (`base.css:120-121`); the app uses `--shell-nav-w` and `--shell-rail-w`.

| Piece | Mock-up class | App class (PROPOSED) | Surface | Notes |
|---|---|---|---|---|
| Frame | `.app` | `shell` | `--bg` | `height:100dvh`, no page scroll; each column scrolls |
| Nav | `.app-side` | `shell-nav` | `--bg2` | right hairline `--line`; padding 18 12 |
| Main | `.app-main` | `shell-main` | `--bg` | padding 22 24 (mock-up), gap 16; `min-width:0`; content max 920 (`--wrap-n`) centred on wide screens |
| Rail | `.app-rail` | `shell-rail` | `--surf2` | left hairline; padding 20; gap 14 |
| Top bar (mobile only) | none | `topbar` | `--bg` | 56 high, burger, target name, rail button |

```css
/* PROPOSED. Media queries cannot read custom properties, so 900px is literal (= --bp-shell). */
.shell{display:grid;grid-template-columns:var(--shell-nav-w) minmax(0,1fr) var(--shell-rail-w);height:100dvh;background:var(--bg);color:var(--fg)}
.shell-nav{background:var(--bg2);border-right:1px solid var(--line);overflow:auto;padding:18px 12px}
.shell-main{overflow:auto;padding:22px 24px}
.shell-rail{background:var(--surf2);border-left:1px solid var(--line);overflow:auto;padding:20px}
@media (max-width:900px){
  .shell{grid-template-columns:minmax(0,1fr)}
  .shell-nav{position:fixed;inset:0 auto 0 0;width:min(320px,86vw);z-index:var(--z-drawer);transform:translateX(-100%);transition:transform var(--dur-fast) var(--ease)}
  .shell-nav[data-open="true"]{transform:none}
  .shell-rail{position:fixed;inset:auto 0 0 0;max-height:85dvh;z-index:var(--z-drawer);border-radius:var(--r-22) var(--r-22) 0 0;border-left:0;border-top:1px solid var(--line)}
}
```

Between 901 and about 1180 px the rail may narrow to 360 (PROPOSED; below that the main column would fall under 540 px). Between 960 and 1100 the public site hides its window side column for the same reason (`base.css:187`).

### 7.2 Left nav
Order top to bottom: workspace switcher (name, plan chip, `ic-users`), `Home`, search/palette trigger (`⌘K`), **Targets** (sorted needs-first, then running, stale, planned, idle, delivered; SPEC criterion 11), the current target's pages, then pinned `Vault`, `Settings`, feedback.

| Item | Spec | Source / status |
|---|---|---|
| Label | `.lab` mono 10 uppercase `--mut` ("Workspace", target name) | `base.css:129` |
| Row | `.it`: min-height 36, padding 0 10, radius 9, 13.5 px, no hover in the CSS (PROPOSED `--bg2`); current `.it.on`: `--surf`, `--sh-lift`, `aria-current="page"`; a second level (the page inside the current target) is `.it.on2`, fill `#E3E6DF` (`ui.css:39`), use `--chip` | `base.css:130-131` |
| State dot | 8 px `.s` circle before the name; colour from `--state-*` (2.1); `planned` hollow ring | dot exists; states PROPOSED |
| Needs you | `.n-tag` at the right: mono 10.5, padding 3 7, radius 6, tone `--tn-orange-*`; word "Needs you" | `ui.css:38` |
| Deal stage | `.ch` after the name or in the page header: `screening`, `IC`, `passed`, `invested` | AGENTS; `.ch` `base.css:139` |
| Count | `.ch`/`.n-tag` with a number ("Changes 2"), number first in the accessible name | PROPOSED |
| Target pages | Memo, Changes, Evidence, Stack, Runs (`t/[target]/{memo,changes,evidence,stack,runs}`) | AGENTS "Layout" |

Collapsing the nav on desktop is not required (not in the specs). Keyboard: `↑ ↓` between rows, `Enter` opens, `g h` Home (PROPOSED); the nav is a `nav` landmark with `aria-label="Workspace"`.

### 7.3 Right rail
Tabs **Preview · Work · Lineage · Discuss** (SPEC task p3-rail). The memo mock-up shows two (Work, Lineage); the other two are DERIVED from SPEC criterion 8.

| Tab | Content | Existing pieces |
|---|---|---|
| Preview | the selected section's rendered document; Edit in place saves a steering note and a `human_edited` version; `.docx` download; history with diff | `.md`, `.note-t`, `.panel`, `.btn-a`; edit mode PROPOSED |
| Work | the run trace, one line per step, collapsed, with cost | `.trace` and `.tr` (62 px mono verb in `--blue-t`, text), `.big` cost, `.meter` |
| Lineage | three columns "Built from", "This", "Feeds into", stale nodes highlighted, plain-words sentence | `.lin` rows, `.src`, `.ch`, `.stk .st` |
| Discuss | comments per section, resolve, assign, "Ask the agent" which becomes a steering note | PROPOSED: comment item = avatar 24, name, time (`.tiny`), body `.body`, actions `.tl` |

Tabs: `.tabs button`, min-height 40, selected underline 2 px `--fg` (`base.css:143-145`), as `role="tablist"` with arrow-key navigation and `aria-controls`. Footer of the rail: the feedback button (kind, text, auto context; SPEC p4-feedback). The rail has an empty state until a section is selected (6.5). Selecting a section in the main column loads it into the rail without moving focus; `Enter` on the section moves focus to the rail heading.

### 7.4 Mobile (at or below 900 px; SPEC criterion 17, memo usable at 390)
- **Top bar** `topbar`: burger (44 px circle as `.menu summary`, `base.css`/`ui.css:3-10`), target name (truncate), rail button with a count badge. Sticky, `--bg`, `--line2` hairline.
- **Drawer** (nav): slides from the left, scrim `color-mix(in srgb,var(--fg) 40%,transparent)` (PROPOSED, no new token), `z-index:var(--z-scrim)` and `--z-drawer`; opens from the burger and the left-edge swipe; closes on scrim tap, `Escape`, route change, and returns focus to the burger. Focus trap while open; `inert` on the page behind.
- **Bottom sheet** (rail): rises from the bottom; three heights PROPOSED: peek 72 px (tab bar visible), half 50dvh, full 85dvh; drag handle 36 x 4 `--line-ui`, centred; `role="dialog"` `aria-modal="false"` in peek and `true` when open; same tabs inside. A visible "Open details" button is always provided; gesture is an enhancement.
- **Content**: one column, gutter 24, tables scroll inside `.tbl-wrap`, hit targets 44 (4.4, 9.3). `padding-bottom` for the sheet's peek and `env(safe-area-inset-bottom)`.

### 7.5 Screens mapped onto the components
| Route | Content (SPEC criterion) | Built from | New pieces (PROPOSED) |
|---|---|---|---|
| `home` | Inbox across targets: Needs you (gates, stale, received uploads, open comments), Running, Planned, Delivered this week (11) | `.panel` per group, `.gate` row for a gate, `.ag` row for a run (progress, cost), `.stk` cell for a delivered item, `.n-tag`, `.ch`, `.eyebrow` group headings | `inbox-row`: dot + target + sentence + age, one action; group headings carry counts |
| `t/[target]/memo` | `.verdict`, then one `.msec` per station with `.conf`, claims, `.msec-s`; "Data still needed" `.msec-ap`; header with purpose, route, **Show sources** `.swb`, export menu (6, 10) | the Memo window (5.23) | TOC in the main column; export menu (`details.menu` pattern); section anchor links |
| `t/[target]/changes` | human-readable diff since last "Mark reviewed" (12) | `.banner.banner-g/-w`, `.ldg` rows, `.md` for the diff body | diff styling: added `--wash-ok-bg`, removed `--wash-warn-bg` with strike; "Mark reviewed" `.btn-s` |
| `t/[target]/evidence` | drop zone, ledger table: id, kind, class, grade, source, stations, added by, used by, supersedes; filters; row to rail (p1-evidence) | `.drop`, `.ldg`, `.gr`, `.src`, `.ch` for data class, `.banner` after a drop, `.stk` for stale cells | filter bar (`.seg`, `.chip`); row selection state 7.5; "unused" flag chip |
| `t/[target]/stack` | the six stations, dependencies, model per station, spec | `.metro`/`.vmetro` station grammar, `.pr` rows, `.stn` rings | stack editor: model select (`.field`), tier `.seg` |
| `t/[target]/runs` | list of runs, cost, duration, status | `.ags` rows, `.ch`, `.mrow` | run detail = Work tab full width |
| plan wizard (new target) | name, website, purpose; inputs in three buckets; plan with cost; approve (4) | Plan window (5.21): `.seg`, `.ptab`, `.pr`, `.ptot`, `.pact`; buckets as `.tag` with dots green, orange, mut ("Already available", "Great to have", "Nice to have") | stepper 1 to 3 using `.stps`/`.stp`; coordinator question answered inline: `.panel` with `.field` |
| `settings` | members and roles, model connections, data classes, plan, vault, requests | `.pv` provider rows (36 icon, name, status `.ok`/`.add`/`.soon`), `.cnl`, `.field`, `.swb`, `.ask` for "ask for another connector" (19) | roles table; invite form; destructive confirm dialog |
| `vault` | notes tree, editor with live preview, backlinks, share toggle (18) | Vault window (5.25): `.tree`, `.md`, `.lock`, `.swb`, `.chip` backlinks | editor pane (mono, `.md` preview split); "ciphertext only" `.lock` notice |
| `/admin` | Overview, Funnel, Workspaces, Runs, Costs, Feedback inbox, Requests (15, 19, 20) | `.stats`/`.stat` numerals, `.ldg`/`.tbl` tables, `.meter`, `.banner` for alerts, `.seg` status filter | charts use `--blue --orange --green --shared`; second-OTP interstitial; audit-log row detail |

**Selected row (ledger, runs, nav):** `--surf2` fill, 2 px left rule `--fg`, `aria-selected` (table grid) or `aria-current` (nav). **Density:** admin tables use the window scale (13.5 px, padding 9 8); marketing `.tbl` padding 20 is too loose for data.

### 7.6 Command palette and shortcuts (SPEC p1-targets)
`⌘K` palette (targets, sections, evidence, actions), `⌘N` new target, `⌘J` (jump, per the task text). Palette PROPOSED: centred dialog, radius `--r-18`, `--surf`, `--sh-win`, `z-index:var(--z-modal)`, input 52 px (`.field`), results as `.it` rows with a mono `.tiny` hint, grouped by `.lab`. Every shortcut has a visible alternative; list them in a "Keyboard" dialog opened by `?`. Do not trigger shortcuts while an input, textarea or `[contenteditable]` has focus.

### 7.7 What the app must not copy from the site
The sticky blurred `.nav` (the app has its own chrome), the closing band, hero glow, `.routes-svg` art, logos row, FAQ, and the decorative window dots in `.app-bar` (in the app the window is the screen). The three-bar `.mark` stays in the nav header.

## 8. Voice and copy
**Register.** Plain, specific, a little dry. Short sentences. Say what happened, what it cost, what to do next. Examples from the pages: "Evidence before opinion." "We would rather tell you what is not built yet." "Agents draft, people send." "Nothing is sent without a person."

| Rule | Do | Do not |
|---|---|---|
| Sentence case everywhere (titles, buttons, tabs, chips) except the mono uppercase eyebrow/tag/label styles, which are rendered by CSS | "Review the plan" | "Review The Plan" |
| No exclamation marks, no emoji, no "Oops" | "That email does not look right." | "Oops! Try again!" |
| No em dash and no en dash in copy; use a comma, a colon, a full stop or "to" | "10 to 12 minutes" | a range written with an en dash |
| No serial comma | "Product, Cohorts and Panel" | "Product, Cohorts, and Panel" |
| Middle dot as a separator inside a label | "Investment route · plan v1" | "Investment route - plan v1" |
| Curly apostrophe and quotes in typed copy | "the agent’s plan" | "the agent's plan" (6 straight vs 9 curly today, Appendix D) |
| Costs: dollar sign, two decimals; estimates prefixed "est."; caps shown as "cap $20" | "$7.65", "est. $3.50" | "7.65 USD", "about $3.5" |
| Dates `12 Oct`; times 24 h `10:42`; relative time only under 24 h ("12 min ago") | "12 Oct, 10:42" | "October 12th" |
| Human label first, slash name second in mono | "Product diligence `/productdd`" | "/productdd" alone (AGENTS rule 10) |
| Verbs on buttons name the result | "Approve and run", "Save the plan, run later", "Rewrite only those · $3.85" | "Submit", "OK" |
| Status words are the fixed vocabulary (0.1 rule 4) | "Needs you" | "Action required", "Blocked" |
| Honest about the product | "Preview: not connected yet." "Next." | "Coming soon" |
| Say what did not change | "Six other sections untouched." | silence |
| Never imply an agent acted on the world | "Draft ready. You send it." | "Email sent" for an agent action |
| Disclaimer wherever a verdict is shown or exported | "Evidence-graded analysis, not investment advice." | a shorter or altered variant |

**Language.** English. The only French on the site is the Logos validation board (`« »`, "8 oct. 2026"); the app has no localisation in v1 (flag `eu_mode` is about data residency, not language).

**Reuse verbatim.** Nothing is sent without a person. If P-01 changes, Cohorts, Product and what they feed are rewritten. Nothing else is. Off. Agents cannot read this note, and cannot tell it exists. Only you can read it. Counts as digits ("8 agents"); durations "About 25 min"; mono for ids, costs and slash names only (3.3).

## 9. Accessibility
Target: WCAG 2.2 AA. AGENTS.md: all interactive elements keyboard-reachable, focus visible, contrast at least 4.5:1, chips never the only carrier of meaning.

### 9.1 Contrast: method and results
`contrast.py` reads `tokens.css`, resolves `var()` chains, and computes the WCAG 2.x ratio for each pair in both themes. Thresholds: N normal text 4.5, L large text 3, U graphic or control boundary 3 (1.4.11), D decorative or `aria-hidden` (reported, not scored). Run `python3 contrast.py > contrast-report.md`; it exits 1 when a token pair fails, so it can gate CI. **Result: all 60 scored token pairs pass in light and dark.** The full output is `contrast-report.md`.

**A. Token pairs** (what the components use; add a row whenever a new pair appears)

| Pair | Used for | Size | Light | Dark | AA | Source |
|---|---|---|---|---|---|---|
| **Page** | | | | | | |
| fg on bg | body text | N | 16.33 | 15.61 | pass | base.css:9 |
| fg2 on bg | .lead, .body | N | 9.56 | 11.18 | pass | base.css:27,28 |
| mut on bg | .eyebrow, .small, .tiny, footer, .legend | N | 5.71 | 7.21 | pass | base.css:21,29,30 |
| fg on bg2 | .alt sections, current nav link | N | 14.93 | 14.51 | pass | base.css:16,82 |
| fg2 on bg2 | body copy in .alt, .st-plan | N | 8.73 | 10.39 | pass | base.css:16, ui.css:196 |
| mut on bg2 | eyebrow in .alt, .cmp .grp | N | 5.22 | 6.70 | pass | ui.css:391 |
| fg on surf | card text, inputs | N | 18.11 | 14.21 | pass | base.css:94,169 |
| fg2 on surf | .body in cards, .tbl td | N | 10.60 | 10.18 | pass | base.css:162 |
| mut on surf | .lay .lw, gr-c, small in cards | N | 6.33 | 6.56 | pass | ui.css:522, base.css:109 |
| fg on surf2 | rail panels | N | 16.90 | 13.13 | pass | DERIVED |
| mut on surf2 | rail captions, tabs | N | 5.91 | 6.06 | pass | DERIVED |
| blue-t on bg | .bt, text links in blue | N | 5.92 | 8.53 | pass | base.css:31 |
| blue-t on surf | .tr b, .md a | N | 6.56 | 7.77 | pass | ui.css:102,146 |
| orange-t on bg | .ot, form error text | N | 5.20 | 8.56 | pass | base.css:31, Book.html:32 |
| orange-t on surf | .bk-no .bk-k, .never .x | N | 5.76 | 7.80 | pass | ui.css:430-442 |
| green-t on bg | .gt, .tbl .yes | N | 5.89 | 8.54 | pass | base.css:31,164 |
| green-t on bg2 | .cmp .yes in .alt | N | 5.38 | 7.94 | pass | base.css:164 |
| green-t on surf | .chk .ic check icons | U | 6.53 | 7.77 | pass | base.css:103 |
| **Buttons and inverse surface** | | | | | | |
| inv-fg on inv-bg | .btn-p, verdict word, skip link | N | 16.33 | 15.61 | pass | base.css:54 |
| inv-fg on btn-p-hover | .btn-p:hover | N | 9.56 | 18.78 | pass | base.css:55,60 |
| btn-s-bd on bg | .btn-s border | U | 16.33 | 3.87 | pass | base.css:56,61 |
| inv-fg2 on inv-bg | .door-dark .body, .fl-key .small | N | 10.78 | 8.81 | pass | ui.css:75,170 |
| inv-mut on inv-bg | .verdict .lab, .v-d | N | 6.95 | 5.26 | pass | ui.css:85,88 |
| inv-line on inv-bg | outline button on inverse surface | U | 3.73 | 4.04 | pass | ui.css:172 |
| **Tones, washes, grades** | | | | | | |
| tn-green fg on bg | .st-live, conf-high, .ok, .who-t | N | 6.94 | 8.10 | pass | ui.css:194,95 |
| tn-amber fg on bg | .st-build, conf-medium | N | 7.52 | 8.60 | pass | ui.css:195,96 |
| tn-orange fg on bg | conf-low, .n-tag, .who-p | N | 6.42 | 6.76 | pass | ui.css:97 |
| tn-blue fg on bg | .ch-b Running, .who | N | 8.02 | 6.89 | pass | base.css:140 |
| mut on bg2 (st-plan border) | .st-plan dashed border | U | 5.22 | 6.70 | pass | ui.css:196 |
| fg on wash-warn | gate title, banner, new ledger row | N | 16.90 | 13.18 | pass | ui.css:52,130,134 |
| mut on wash-warn | .gate-t span | N | 5.91 | 6.08 | pass | ui.css:57 |
| fg on wash-stale | stale ledger row, .stk .st | N | 16.28 | 13.22 | pass | ui.css:131,140 |
| mut on wash-stale | .stk .mut | N | 5.69 | 6.10 | pass | ui.css:138 |
| fg on wash-ok | banner-g, .stk .ok | N | 16.18 | 12.83 | pass | ui.css:135,141 |
| tn-green fg on wash-ok | .lock | N | 7.28 | 9.67 | pass | ui.css:147 |
| gr-a-fg on fg | .gr-a chip | N | 18.11 | 15.61 | pass | base.css:108,110 |
| fg2 on chip | .src, .ch | N | 8.66 | 9.27 | pass | base.css:112,139 |
| **Graphics and boundaries** | | | | | | |
| blue on bg | line dot, stn, bar | U | 5.92 | 6.60 | pass | base.css:115 |
| orange on bg | line dot, stn, meter marker | U | 3.28 | 8.56 | pass | base.css:116 |
| green on bg | line dot, stn | U | 4.18 | 8.33 | pass | base.css:116 |
| blue on surf | agent bars on cards | U | 6.56 | 6.01 | pass | ui.css:21 |
| orange on surf | agent bars on cards | U | 3.63 | 7.80 | pass | ui.css:24 |
| green on surf | agent bars on cards | U | 4.64 | 7.59 | pass | ui.css:26 |
| amber on bg | .rd.n rule and dot (stale, Next) | U | 3.28 | 5.16 | pass | ui.css:396,416 |
| amber on surf | stale dot in a card | U | 3.64 | 4.70 | pass | DERIVED |
| mut on bg (idle dot) | idle / planned dot | U | 5.71 | 7.21 | pass | DERIVED |
| focus on bg | focus ring on page | U | 5.34 | 8.71 | pass | base.css:65 |
| focus on bg2 | focus ring on alt section | U | 4.89 | 8.10 | pass | base.css:65 |
| focus on surf | focus ring inside cards | U | 5.93 | 7.93 | pass | base.css:65 |
| focus on surf2 | focus ring in rail | U | 5.53 | 7.33 | pass | DERIVED |
| line-ui on bg | input and control border | U | 3.49 | 3.87 | pass | base.css:169 |
| line-ui on surf | input border inside a card | U | 3.87 | 3.52 | pass | base.css:169 |
| line on surf (card edge) | card border: decorative, text carries the meaning | D | 1.48 | 1.29 | n/a | base.css:94 |
| sw-knob on sw-off | switch knob on the off track | U | 3.87 | 3.87 | pass | base.css:155,156 |
| sw-knob on sw-on | switch knob on the on track | U | 4.64 | 8.33 | pass | base.css:157 |
| sw-off on surf | switch track against its panel | U | 3.87 | 3.52 | pass | base.css:155 |
| fg on track (meter) | meter and bar fill on its track | U | 14.12 | 11.06 | pass | ui.css:60,61 |
| ev-a on bg2 | evidence bar A (aria-hidden, legend carries the numbers) | D | 14.93 | 14.51 | n/a | ui.css:524,526 |
| ev-b on bg2 | evidence bar B (aria-hidden) | D | 2.85 | 5.05 | n/a | ui.css:524,527 |
| ev-b on ev-c1 | B segment against the C stripe (aria-hidden) | D | 2.20 | 1.31 | n/a | ui.css:527,528 |
| **Terminal (always dark)** | | | | | | |
| term-fg on term-bg | .term body | N | 14.90 | 14.90 | pass | ui.css:273 |
| term-mut on term-bg | .term .out | N | 6.88 | 6.88 | pass | ui.css:279 |
| term-acc on term-bg | .term b (command) | N | 8.15 | 8.15 | pass | ui.css:278 |
| term-mut on term-bar | .term-bar span | N | 6.14 | 6.14 | pass | ui.css:276 |

**B. What fails on the site today** (hard-coded literals with no token). 14 of the 48 pairs audited fail; the other 34 pass and are in `contrast-report.md`. Every replacement below passes in light and dark.

| Literal | Pair | Size | Today | Replace with | Light | Dark | Source |
|---|---|---|---|---|---|---|---|
| .app-side .lab (10px mono) | `#6A7079` on `#ECEEE8` | N | 4.27 | `mut` on `bg2` | 5.22 | 6.70 | base.css:129 |
| .app .lab on window (10.5px mono) | `#6A7079` on `#F2F3EF` | N | 4.48 | `mut` on `bg` | 5.71 | 7.21 | base.css:137 |
| .app th (10.5px mono) | `#6A7079` on `#F2F3EF` | N | 4.48 | `mut` on `bg` | 5.71 | 7.21 | base.css:152 |
| .ag-n .mono (10.5px) | `#6A7079` on `#F2F3EF` | N | 4.48 | `mut` on `bg` | 5.71 | 7.21 | ui.css:45 |
| .ag.wait name, opacity .55 | `#15171C @55%` on `#F2F3EF` | N | 3.87 | `mut` on `bg` | 5.71 | 7.21 | ui.css:49 |
| .ag.wait sublabel, opacity .55 | `#6A7079 @55%` on `#F2F3EF` | N | 2.08 | `mut` on `bg` | 5.71 | 7.21 | ui.css:45,49 |
| .meter-l estimate in orange (10.5px) | `#D9640F` on `#FFFFFF` | N | 3.63 | `orange-t` on `surf` | 5.76 | 7.80 | ui.css:237 |
| .mrow-n (12px) | `#6A7079` on `#F2F3EF` | N | 4.48 | `mut` on `bg` | 5.71 | 7.21 | ui.css:317 |
| .lgbox figcaption (10.5px) | `#8A9096` on `#FFFFFF` | N | 3.23 | `mut` on `surf` | 6.33 | 6.56 | ui.css:244 |
| .input border (mini .inp) | `#C2C6BD` on `#FFFFFF` | U | 1.73 | `line-ui` on `surf` | 3.87 | 3.52 | ui.css:359 |
| .field input border | `#D8D4C9` on `#FFFFFF` | U | 1.48 | `line-ui` on `surf` | 3.87 | 3.52 | base.css:169 |
| .sw off track | `#B9BDB4` on `#FFFFFF` | U | 1.91 | `sw-off` on `surf` | 3.87 | 3.52 | base.css:155 |
| focus ring on page | `#E8A33D` on `#F5F3EE` | U | 1.94 | `focus` on `bg` | 5.34 | 8.71 | base.css:65 |
| focus ring on white card | `#E8A33D` on `#FFFFFF` | U | 2.16 | `focus` on `surf` | 5.93 | 7.93 | base.css:65 |

Reading of the failures. (1) **Small mono labels** `#6A7079` on the `#F2F3EF` window: 4.48 against 4.5, a near miss on 5 selectors (`.app-side .lab` is 4.27); mapping the label to `--mut` (5.71) fixes all of them. (2) **Opacity .55** on the waiting agent rows leaves 3.87 and 2.08: opacity is not a design token for text, use `--mut` and the planned state. (3) **Estimate in orange at 10.5 px**: use `--orange-t`. (4) **Caption `#8A9096`**: use `--mut`. (5) **Control boundaries** (input 1.48 to 1.73, switch off track 1.91) fail 1.4.11 and are fixed by `--line-ui` and `--sw-off`. (6) **The focus ring** `#E8A33D` is 1.94:1 on the light page, which fails 2.4.11/1.4.11 on light; fixed by `--focus`.

### 9.2 Focus
- **Site rule (`base.css:65`)**: `a, button, input, textarea, select` on `:focus-visible` get `outline:3px solid #E8A33D; outline-offset:3px; border-radius:6px`. Text inputs also take a `--fg` border on `:focus` (`base.css:171`, `ui.css:495`).
- **Gap**: `summary` (FAQ questions and the menu burger) is not in that list and falls back to the browser default ring. The skip link and the tab buttons are covered (they are `a` and `button`).
- **App rule (PROPOSED)**: `:focus-visible{outline:3px solid var(--focus);outline-offset:3px;border-radius:6px}` on everything focusable, `--focus` = `#8A5A00` light (5.34 on `--bg`, 4.89 on `--bg2`, 5.93 on `--surf`) and `#E8A33D` dark (8.71 on `--bg`). `:focus-visible` only, so a mouse click shows no ring.
- Inside clipped containers (`overflow:hidden` in the window, tables, the drawer) use an inset ring: `outline-offset:-3px` (PROPOSED), otherwise the ring is cut off.
- Never `outline:none` without a replacement. Never remove the ring on inputs because the border already changes: the ring is the guaranteed signal.
- Focus order equals DOM order equals visual order. The one exception on the site is the evidence widget on mobile, where the result card is moved first with `order:-1` (`ui.css:537`) while its controls come first in the DOM. In the app put the result first in the DOM, or accept it because the result is an `aria-live` region.
- Skip link first in the DOM, visible on focus (`.skip`, `base.css:49-50`, z-index 50; use `--z-skip` raised to 100 in the app).

### 9.3 Keyboard
| Control | Native behaviour | Required additions |
|---|---|---|
| Button, `.swb`, `.lay`, `.choice`, `.ask`, `.seg` button | Enter and Space | `aria-pressed` carries the state (used on the site). Radio-like groups (`.choice`, `.seg`) become `role="radiogroup"` with arrow keys in the app (PROPOSED) |
| `details` (FAQ, menu) | Enter and Space toggle | Menu: close on Escape and on outside click, return focus to `summary` (PROPOSED; the site does neither) |
| Tabs (`.tabs`) | none (buttons) | `role="tablist"`, `aria-selected`, `aria-controls`, Left/Right/Home/End, roving `tabindex` (PROPOSED) |
| Drawer, sheet, palette, dialogs | none | focus trap, `Escape` closes, focus returns to the opener, `inert` on the page behind (7.4) |
| Table with selectable rows | none | a row action is a real button or link in the first cell; `aria-selected` only on `role="grid"` |
| Evidence widget | buttons | result is `role="status" aria-live="polite"` (`ui.css`/`evidence-ui.html`); the bar is `aria-hidden` |
| Shortcuts | none | never fire inside inputs; always have a visible equivalent (7.6) |

### 9.4 Hit targets (sizes from the CSS; WCAG 2.5.8 minimum is 24 px, recommended 44 on touch)
| Control | Height | Control | Height |
|---|---|---|---|
| `.btn` | 52 | `.btn-a` (window) | 38 |
| `.btn-sm`, `.tl`, `.subnav a`, `.ask`, `.cnf input`, `.menu-p a`, menu `summary` | 44 | `.swb`, `.pill` | 38 |
| `.links a` | about 47 | `.tabs button` | 40 |
| `.field input` | 52 | `.app-side` items | 36 |
| `.choice`, `.stp`, `.mrow`, FAQ `summary` | 64 | `.foot li a` | 36 |
| `.lay` | 84 | `.seg button` | 34 |

Everything passes 2.5.8. In the app give every touch control 44 px at 900 px and below (add vertical padding, not a bigger font): window items 36 to 44, `.seg` 34 to 44, `.foot` links 36 to 44, the burger and rail button 44 by 44.

### 9.5 Reduced motion
`@media (prefers-reduced-motion:reduce){*{transition:none !important;animation:none !important;scroll-behavior:auto}}` (`base.css:217-220`), and `tokens.css` zeroes every `--dur-*`. Consequences: the running bar stops (the word "Running" and the cost still change), `.fade` content appears at once, the evidence bar jumps. Nothing may be conveyed by motion alone. Toast and skeleton pulse (6.6, 6.8) must respect the same query. No parallax, no autoplay, no scroll-jacking.

### 9.6 Other requirements
- **Landmarks**: `header` (nav, `aria-label="Main"`), one `main`, `footer`; in the app `nav aria-label="Workspace"`, `main`, `aside aria-label="Details"` for the rail. One `h1` per page (the memo's `h1` is the target name). `lang="en"` on `html`.
- **Names**: icon-only controls need `aria-label`; decorative icons are `aria-hidden` and `focusable="false"` (what `build.js` emits); logos are `role="img"` with the legal name.
- **Colour independence**: states, grades and confidence always carry a word or a shape (dashed `C`, 6.3).
- **Mock-ups**: on the site each product window is one `role="img"` with a long `aria-label` because it is an illustration. In the app the same markup is real content: lists, tables, headings, live regions (5.22).
- **Reflow and zoom**: no horizontal page scroll at 320 or 390 px; only `.tbl-wrap` scrolls (allowed for data tables). Type is set in px, so page zoom works but a browser text-size-only setting does not; PROPOSED for the app: express `--fs-*` in `rem` (1rem = 16 px keeps every value identical at default). Tokens are in px today for pixel parity.
- **Text spacing (1.4.12)**: no fixed heights on text containers (`min-height` only), so user spacing overrides do not clip.
- **Forms**: visible label, `autocomplete`, error text associated by `aria-describedby`, `aria-invalid` on error (6.9).
- **390 px checklist**: Viewport meta present; gutter 24; no horizontal scroll (`scrollWidth <= innerWidth`); `.h1` never below 46 px; every control 44 px or more; one column; the nav is a drawer and the rail a sheet; tables inside `.tbl-wrap`; mono ids truncate with ellipsis or wrap, never push the layout (`min-width:0` on grid children); the soft keyboard does not hide the focused field (`scroll-margin`, `dvh`).
- **Time limits**: the OTP expires in 10 min (SPEC 1); the error says so and offers a new code.

## 10. Implementation guide (Next.js 16 App Router, TypeScript strict)
### 10.1 File layout (PROPOSED)
```
app/layout.tsx           fonts, <html lang data-theme className=...>, skip link
app/globals.css          @layer order, imports, font family override
styles/tokens.css        this deliverable, unmodified
styles/base.css          reset, type scale, focus, skip, reduced motion, .night
styles/components/*.css  one file per section-5 component; class names unchanged
components/ui/*.tsx      thin wrappers: props -> class names, no styling logic
components/ui/icons.tsx  the 16 icons as components (Appendix B)
```

Plain global CSS in cascade layers; class names are exactly the ones in this document so they stay greppable and match the prototypes. No CSS-in-JS, no Tailwind, no component kit (0.1 rule 7).

### 10.2 Tokens into `globals.css`
```css
@layer tokens, base, components, app;
@import "../styles/tokens.css" layer(tokens);
@import "../styles/base.css" layer(base);
@layer app {
  :root{
    --serif:var(--font-newsreader),Georgia,'Times New Roman',serif;
    --sans:var(--font-overpass),system-ui,-apple-system,'Segoe UI',sans-serif;
    --mono:var(--font-overpass-mono),ui-monospace,Menlo,monospace;
  }
}
body{margin:0;background:var(--bg);color:var(--fg);font:400 var(--fs-body)/1.55 var(--sans);-webkit-font-smoothing:antialiased}
```

`tokens.css` already carries the light set, the `prefers-color-scheme` set guarded by `:root:not([data-theme="light"])`, the explicit `:root[data-theme="dark"]` set, the compatibility aliases (2.3) and the reduced-motion zeroing. Do not copy values into components.

### 10.3 Fonts with `next/font/google`
```ts
// app/fonts.ts
import { Newsreader, Overpass, Overpass_Mono } from 'next/font/google'
export const serif = Newsreader({ subsets: ['latin'], style: ['normal', 'italic'], axes: ['opsz'], variable: '--font-newsreader', display: 'swap' })
export const sans = Overpass({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-overpass', display: 'swap' })
export const mono = Overpass_Mono({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-overpass-mono', display: 'swap' })
// app/layout.tsx: <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
```

Weights are exactly those the site requests (`build.js`). Newsreader is a variable font: leave `weight` out so Next loads the variable file (400 normal and italic cover everything used; the site's extra 500 is never used). `axes:['opsz']` needs a variable family and is the one line to verify at build time; if it fails, self-host with `next/font/local` using the same family names. Fonts are self-hosted by Next at build time, so there is no request to Google at runtime.

### 10.4 Porting the `.td`-scoped CSS
1. Copy rules from `src/base.css` and `src/ui.css` into `styles/base.css` and `styles/components/*.css` by the section map in Appendix A.
2. Delete the `.td ` prefix. The `.td{...}` rule becomes the `body` rule above.
3. Replace every literal by its token with the tables in 2.3, 2.4 and Appendix D. `grep -nE '#[0-9a-fA-F]{3,8}|rgba?\(' styles/components` must return nothing.
4. `.night` stays, because public pages still have dark bands in a light theme: `.night{color-scheme:dark; <the dark token block>}`. To avoid a third copy by hand, generate it from `tokens.css` in a prebuild script and extend `contrast.py` to assert all three dark sets are equal (PROPOSED).
5. Window family (`.app*`): keep the class names for the marketing mock-ups, and build the app shell from them as in 7.1 with new `shell*` classes. Remove the "always light" assumption.
6. Strip the `role="img"` wrappers from anything that becomes real UI.
7. Replace `<span class="btn-a">` with `<button class="btn-a">`.
8. Keep `min-width:0` on every grid child and the `minmax(0,1fr)` tracks (4.2).

### 10.5 Component list and props
| Component | Props | Renders |
|---|---|---|
| `Button`, `ButtonLink` | `variant: 'primary'\|'secondary'`, `size?: 'sm'`, `icon?: 'arrow'`, `loading?`, `disabled?` | `.btn .btn-p\|.btn-s .btn-sm` |
| `TextLink` | `href`, `icon?` | `.tl` |
| `Eyebrow` | `children`, `status?` | `.eyebrow` |
| `StatusChip` | `status: 'at-launch'\|'next'\|'later'` | `.status` with `.st-live`, `.st-build` or `.st-plan` (6.1) |
| `StateDot`, `StateChip` | `state: 'idle'\|'planned'\|'running'\|'stale'\|'delivered'\|'needs-you'` | dot with `--state-*` plus word |
| `StageChip` | `stage: 'screening'\|'IC'\|'passed'\|'invested'` | `.ch` |
| `Tag` | `dot?: 'blue'\|'orange'\|'green'\|'mut'` | `.tag` |
| `GradeChip`, `SourceChip` | `grade: 'A'\|'B'\|'C'`, `id: string` | `.gr .gr-a\|.gr-c`, `.src` |
| `ConfidenceChip` | `score: number` (computes band) | `.conf` with `.conf-high`, `.conf-medium` or `.conf-low` |
| `Card` | `lift?`, `as?` | `.card .card-t .card-lift` |
| `Field`, `TextArea` | `label`, `error?`, `hint?`, `required?` | `.field` |
| `Switch` | `checked`, `onChange`, `label` | `.swb .sw` with `aria-pressed` (or `role=switch`, PROPOSED) |
| `Segmented`, `ChoiceGroup` | `options`, `value`, `onChange` | `.seg`, `.choice` as radiogroup |
| `Tabs` | `tabs`, `value` | `.tabs` with roving tabindex |
| `DataTable` | `columns`, `rows`, `density: 'site'\|'app'`, `selectable?` | `.tbl` or `.ldg` inside `.tbl-wrap` |
| `Banner` | `tone: 'warn'\|'ok'`, `action?` | `.banner .banner-w\|.banner-g` |
| `Gate` | `title`, `help`, `onReview` | `.gate` |
| `Verdict` | `word: 'Invest'\|'Conditional'\|'Pass'\|'Pending'`, `sentence` | `.verdict` (disclaimer always rendered) |
| `MemoSection` | `title`, `confidence`, `claims`, `showSources` | `.msec` |
| `TraceRow`, `LineageColumns` | `verb`, `text`; `from`, `self`, `feeds`, `stale` | `.tr`, `.lin` |
| `Meter`, `ProgressBar` | `value`, `estimate?`, `cap?`, `live?` | `.meter`, `.bar`, `.ag.live` |
| `AgentRow` | `name`, `slash`, `state`, `cost`, `progress` | `.ag` |
| `DropZone` | `onFiles`, `state` | `.drop` |
| `ProviderRow` | `name`, `status: 'connected'\|'connect'\|'ask'` | `.pv` |
| `EmptyState`, `Toast`, `Drawer`, `Sheet`, `Shell`, `NavItem`, `CommandPalette` | PROPOSED, 6.5 to 6.8 and 7.1 to 7.6 | `shell*`, `topbar`, `drawer`, `sheet`, `toast` |
| `Icon` | `name` (Appendix B), `size: 20\|28` | inline SVG |
| `Logo` | `name`, `label` | `<svg class="lg lg-*"><use/></svg>` with `role="img"` |

Rules: components render the documented classes and take `className` only for layout; no inline `style` for colour; tones and states come through typed props, never free strings.

### 10.6 Theme switch
- Three values: **System** (default), **Light**, **Dark**. System sets no attribute and lets the media query decide; Light and Dark set `data-theme` on `<html>`.
- Persist in a cookie `theme` (1 year, `SameSite=Lax`, readable by the server). The root layout reads it and renders `<html data-theme>`; no inline script, no flash. System deletes the cookie. Do not use `localStorage` for it.
- Control: a three-button `.seg` ("System", "Light", "Dark", `aria-pressed`) in Settings > Appearance and a compact toggle in the nav footer. Words, not icons alone.
- `<meta name="color-scheme" content="light dark">` and two `theme-color` metas with media queries: `#F5F3EE` and `#0F1216` (the `--bg` values).
- PDF and DOCX exports render in the light set regardless of the viewer's theme (PROPOSED).
- Runtime: in System mode a change of the OS theme updates the page without reload (pure CSS).

### 10.7 Tests (Playwright)
Four projects: `desktop-light` and `desktop-dark` at 1280 x 800, `mobile-light` and `mobile-dark` at 390 x 844 (`isMobile`, `hasTouch`, `colorScheme` set per project). For every route in 7.5:

1. Screenshot per project (`toHaveScreenshot`, animations disabled, fonts awaited).
2. `@axe-core/playwright` with tags `wcag2a, wcag2aa, wcag21aa, wcag22aa`; zero violations.
3. No horizontal overflow at 390: `document.documentElement.scrollWidth <= window.innerWidth`.
4. Keyboard: Tab through the shell, drawer open and close with Escape, focus returns to the burger, tab key navigation on the rail tabs.
5. Theme: set the cookie to `dark` under a light OS scheme and assert the computed `--bg` equals `#0F1216`; remove it and assert the OS scheme wins.
6. Reduced motion: `page.emulateMedia({ reducedMotion: 'reduce' })`, assert computed `transition-duration` is `0s` on `.btn`.
7. Static: `contrast.py` exits 0; the literal grep returns nothing; every class used in TSX exists in the CSS.

## 11. Appendices
### Appendix A. Class index
Every class in `base.css` and `ui.css` (322), grouped by component. Many short names (`.on`, `.s`, `.l`, `.n`, `.st`, `.ok`) are modifiers or children that only exist inside a parent selector such as `.ag.live` or `.stk .ok`; they are listed with their component.

- **Scope, containers, rhythm, grids (4.1, 4.2)**: `.td` `.wrap` `.wrap-n` `.sec` `.sec-sm` `.alt` `.band` `.night` `.head` `.head-c` `.stack-s` `.stack-m` `.stack-l` `.row` `.g2` `.g3` `.g4` `.split` `.split-r` `.fit` `.fit-res` `.msplit` `.bk-form` `.bk3` `.bk-2` `.bk-ch` `.subp` `.ivs` `.cn` `.gmix-card` `.rule-top`
- **Type (3.2)**: `.h1` `.h2` `.h3` `.h4` `.lead` `.body` `.small` `.tiny` `.eyebrow` `.num` `.mono` `.mut` `.serif` `.bt` `.ot` `.gt`
- **Buttons and links (5.1, 5.2)**: `.btn` `.btn-p` `.btn-s` `.btn-sm` `.btn-a` `.pill` `.tl` `.links` `.subnav`
- **Chips, tags, status, grades (5.4, 5.5, 6)**: `.tag` `.dot` `.status` `.st-live` `.st-build` `.st-plan` `.chip` `.chips` `.ch` `.ch-b` `.ch-g` `.ch-k` `.ch-l` `.ch-o` `.chs` `.fl-chips` `.ask` `.asks` `.src` `.gr` `.gr-a` `.gr-c` `.conf` `.conf-high` `.conf-low` `.conf-medium` `.legend` `.who` `.who-k` `.who-p` `.who-t` `.n-tag`
- **Cards and blocks (5.6, 5.7)**: `.card` `.card-t` `.card-lift` `.feat` `.pillar` `.plan` `.plan-main` `.plan-note` `.pn` `.pp` `.hi` `.ctl` `.rd` `.n` `.l` `.stat` `.stats` `.door` `.door-dark` `.person` `.avatar` `.skill` `.skill-bar` `.honest` `.ok-card` `.iv` `.ic` `.ic-b` `.ic-l` `.chk` `.never` `.x`
- **Tables (5.8)**: `.tbl` `.tbl-wrap` `.cmp` `.grp` `.yes` `.no`
- **FAQ (5.9)**: `.faq`
- **Forms and controls (5.10)**: `.field` `.cnf` `.choice` `.radio` `.sw` `.swb` `.seg`
- **Nav, menu, footer (5.11, 5.12)**: `.nav` `.navin` `.navr` `.brand` `.mark` `.menu` `.menu-p` `.burger` `.skip` `.foot` `.footb` `.footg`
- **Logos (5.13, App. C)**: `.logos` `.logo-item` `.lg` `.lg-paypal` `.lgv` `.lgv-t` `.lgbox` `.lgrow` `.og`
- **Hero, bands, art (5.14, 5.15)**: `.hero` `.hero-bg` `.hero-copy` `.hero-note` `.hero-sub` `.page-hero` `.stage` `.cta-band` `.trust` `.routes` `.routes-low` `.routes-svg` `.crumbs`
- **Workflow lanes (5.16)**: `.hf` `.via`
- **Evidence widget (5.17)**: `.evx` `.evx-l` `.evx-r` `.lay` `.lay-base` `.lt` `.lw` `.ck` `.evbar` `.ea` `.eb` `.ec` `.evleg` `.evmsg` `.evres` `.evsc` `.evrs`
- **Broker diagram (5.18)**: `.bk` `.bk-h` `.bk-k` `.bk-n` `.bk-no`
- **Process diagrams (5.19)**: `.flow` `.fl` `.fl-ag` `.fl-key` `.fl-n` `.metro` `.tline` `.vmetro` `.stn` `.stn-g` `.stn-k` `.stn-o`
- **Window shell (5.20)**: `.app` `.app-bar` `.app-body` `.app-body-2` `.app-main` `.app-rail` `.app-side` `.it` `.on` `.on2` `.s` `.lab` `.panel` `.rowh` `.t` `.r` `.o`
- **Plan window (5.21)**: `.ptab` `.ph` `.pr` `.pr-c` `.pr-n` `.pr-s` `.pr-t` `.ptot` `.ptot-v` `.pact` `.pdelta` `.pbar`
- **Run window (5.22)**: `.app-run` `.ag` `.ag-c` `.ag-n` `.ag-p` `.ag-t` `.ags` `.live` `.wait` `.gate` `.gate-i` `.gate-t` `.meter` `.meter-l` `.big` `.big-meter` `.bar` `.gmix`
- **Memo window (5.23)**: `.verdict` `.v-d` `.v-n` `.v-t` `.msec` `.msec-ap` `.msec-c` `.msec-h` `.msec-s` `.ap-r` `.trace` `.tr` `.lin` `.tabs` `.mrow` `.mrow-c` `.mrow-n` `.mrow-s` `.mrow-t` `.chap` `.chap-h` `.memo-aside` `.inline-claim` `.skel` `.fade`
- **Ledger window (5.24)**: `.ldg` `.new` `.stale` `.stk` `.st` `.ok` `.drop` `.banner` `.banner-g` `.banner-w`
- **Vault window (5.25)**: `.app-vault` `.lock` `.md` `.note` `.note-f` `.note-t` `.tree` `.sub`
- **Onboarding and mini windows (5.26)**: `.onb` `.onb-win` `.stps` `.stp` `.d` `.mini` `.fld` `.inp` `.f` `.acts` `.pv` `.ico` `.add` `.soon` `.runl` `.mail` `.code`
- **Other small pieces and terminal (5.27)**: `.prov` `.cnl` `.steps3` `.nx` `.meta` `.todo` `.rules` `.term` `.term-b` `.term-bar` `.out`

### Appendix B. Icon set
16 inline SVG icons from `canvas3/project/icons`, each `viewBox="0 0 24 24"`, `fill="none"`, drawn with `currentColor`, **stroke-width 1.75, `stroke-linecap` and `stroke-linejoin` round**, no fills. Pages author them as `<i class="ic ic-NAME"></i>` and `build.js` replaces each with the inline SVG plus `aria-hidden="true" focusable="false"` (`build.js:66-73`); the `ic-NAME` classes therefore have no CSS rule. Sizes: `.ic` 20 px, `.ic-l` 28 px (`base.css:68-69`); container `.ic-b` 48 px well (44 in `.ctl`). The "never" X is a separate inline SVG, stroke 2. One size per context (20 inline, 28 as a card lead); colour is inherited, tone only through the parent (`--green-t` in `.chk`, `--orange-t` in `.honest`); an icon is never the only label of a control; new icons use the same grid, stroke and caps.

| Name | Used for on the site | App use (DERIVED) |
|---|---|---|
| `arrow` | trailing arrow on buttons and links (40 uses) | next, open |
| `check` | `.chk` lists, checked states (79 uses) | done, approved |
| `clock` | run log and retention, broker "Run" | run duration, schedule |
| `download` | sharing and export | export |
| `eye` | untrusted documents | preview, show sources |
| `file` | requests, broker "Model" | evidence file |
| `gate` | gate in the run, Home inbox | a gate waiting for the user |
| `git` | changes since you last looked | Changes, lineage |
| `globe` | Europe mode, web sources | S- source, region |
| `key` | provider connections | connections |
| `layers` | sandboxes, MCP | stack, stations |
| `lock` | vault, sandbox | encrypted, data class |
| `play` | present in the set, unused on the site | run |
| `search` | built for the keyboard | palette trigger |
| `shield` | honest callout, SSO and audit log | security, admin |
| `users` | access, many targets | members, workspace |

### Appendix C. Logo handling
- Files: harmonised single-colour versions `paypal.svg`, `quadrille.svg`, `tomcat.svg`, `thegoodones.svg`, built as `<symbol>` and used with `<use href="#lg-*">` and `fill="currentColor"`. Sizes (generated in `build.js:92`, not in the CSS): `.lg-paypal` 106 x 38, `.lg-quadrille` 54 x 54, `.lg-tomcat` 128 x 35, `.lg-tgo` 158 x 18. On the validation board `.lgbox .lgv .lg-paypal` is 68 x 24 (`ui.css:549`). The row is `--fg` at opacity .82 and follows `--fg` in dark; never recolour a logo in brand colours.
- Originals (`orig-paypal-wordmark.svg`, `orig-quadrille-color.svg`, `orig-thegoodones-white.svg`, `orig-tomcat.png`) appear only on the validation board (`Logos.html`, `.og`, white `.lgbox`), never in the product.
- PayPal is a lockup composed by the design (wordmark `.lg-paypal` plus typeset "Ventures", `.lgv`, `.lgv-t`), not an official asset.
- Accessibility: wrap in `role="img"` with the legal name; decorative `<svg>` inside is `aria-hidden`.
- Rights (open items on `Logos.html`): each fund's consent, the exact name "TomCat Ventures" versus "TomCat", the PayPal lockup. Do not ship the row to production before the owner confirms.

### Appendix D. Known inconsistencies and cleanup
| # | Where | Issue | Cleanup |
|---|---|---|---|
| 1 | `base.css`, `ui.css` | 75 distinct hex literals; `#FFF` 25 times, `#15171C` 16, `#ECEAE4` 13; many differ by a few levels from the tokens (`#15171C` vs `--fg` `#14161A`) | Replace by tokens (2.3); `tokens.css` covers each |
| 2 | `.hero` `base.css:88` (padding 72 0 0) and `ui.css:13` (84 0 0); responsive 44 (`base.css:202`) and 48 (`ui.css:207`) | duplicate rule, the later wins | Keep 84 and 48, delete the first |
| 3 | `.app .mut` `base.css:136` and `ui.css:34` | identical duplicate | Delete one |
| 4 | inline h2 clamps `32/3.8vw/52`, `34/4.2vw/58`, `34/4vw/54` | three near-identical compact titles | One `--fs-h2-s` (`tokens.css`), class `h2-s` PROPOSED |
| 5 | `Products.html`, `Platform.html` | 6 inline `text-decoration:underline` | Class `link-u` PROPOSED |
| 6 | Google Fonts link | Newsreader 500 loaded, never used | Drop it |
| 7 | `.status` | reused for labels that are not At launch, Next, Later: "Draft", "Planned", "Validé", "Rétabli", "Message ready" | Close the set (Appendix E, question 8) and use `.ch` for the rest |
| 8 | `.swb` (`ui.css:83`) | label wraps in the vault window | `white-space:nowrap` |
| 9 | `.btn-a` | rendered as `<span>` | `<button>` |
| 10 | mock-ups | whole window is `role="img"` | Real markup in the app (9.6) |
| 11 | `details.menu` | no Escape, no outside click | Add both (9.3) |
| 12 | `.skip` `base.css:49` | z-index 50 under future overlays | `--z-skip` 100 in the app |
| 13 | `.lgbox figcaption` `ui.css:244` | `#8A9096`, 3.23:1 | `--mut` |
| 14 | magic numbers | spacing 84, 240, 30, 34; sticky `top:96px`/`104px`; `.cta-band` bottom 240 | Tokens `--sp-*`, `--nav-h` plus 24/32 |
| 15 | copy | straight (6) and curly (9) apostrophes mixed | Curly (8) |
| 16 | controls | no `:disabled`, `:active`, `aria-invalid` styles; no placeholder colour | PROPOSED in 5 and 6.9; add `::placeholder{color:var(--mut)}` |
| 17 | focus | `summary` is outside the focus rule (`base.css:65`) | `summary:focus-visible` (9.2) |
| 18 | evidence widget on mobile | `order:-1` moves the result before its controls (`ui.css:537`) | DOM order (9.2) |

### Appendix E. Decisions on the open questions (8 Oct 2026, night)
Defaults adopted by the product owner's delegate so that the build is not blocked; each can be reversed by editing `tokens.css` and this section. Decisions are logged in `SPEC.md`.
1. **Nav dots**: they show state only, as the SPEC requires (task `p1-targets`: a status dot per target). The mock-up's blue, orange and green read as running, needs-you and delivered. The dot always comes with its word or chip; stage lines appear only inside a memo or plan.
2. **Dark verdict card**: flips to a light card in dark mode, as the site's `.night .btn-p` does. The `--inv-*` tokens stay defined but unused.
3. **Accessibility values that change pixels**: accepted (`--focus` `#8A5A00` in light, the `--line-ui` input borders, the switch off track). They are a floor, not a style choice.
4. **Missing inputs** (`prototypes/platform-v4.html`): never supplied. `docs/DESIGN-TOKENS.md` is replaced by this document and `docs/SCREENS.md` is derived by task `p0-docs`. Section 7 stays DERIVED; if the prototypes arrive they override section 7 only, never sections 2 to 6. `docs/SCREENS.md` is derived from ARCH by task `p0-docs`.
5. **Newsreader**: `next/font/google` with the `opsz` axis (10.3). Self-hosting is a later optimisation.
6. **`--l-sh`**: moves from grey to ink, as on the site. No grey release.
7. **Logos**: unchanged. Fund consent, "TomCat Ventures" versus "TomCat" and the PayPal lockup are open items for the owner; the logo row is not shipped to production before they are closed.
8. **`.status`**: closed to At launch, Next, Later. Other labels use `.ch`.
9. **Type in `rem`** in the app (16 px base), so browser zoom and text-size settings work.
10. **Pasted-key form** (decision 8 Oct, late night; SPEC task `p2-broker`). Inside a provider card, under the sign-in options, a collapsed `<details>` titled "No sign-in for <Provider> yet". Inside: a `.field` of `type=password` (write-only), a `.tiny` line advising a dedicated key with a spend limit, and a secondary button "Save key". After saving, only "…last4", the chip `.ch` "Last resort" and a "Delete key" button show. The dot for a key connection shows state only (connected or not), never "safe". When `oauth_status` becomes `available`, a banner on the card reads "A sign-in is now available. Switch."
11. **Two repositories, one design system.** The website workspace and the platform workspace both copy `docs/tokens.css` and `docs/DESIGN-SYSTEM.md` unchanged; a change is made in one place, then copied to the other. `scripts/contrast.py` runs in both CIs.
