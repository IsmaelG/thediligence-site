# SPEC — Diligence Stack Map (animated subway diagram)

> Build spec for the "Read me" page of **the-diligence-stack.vercel.app**.
> Reference implementation: `diligence-map.html` (single file, vanilla HTML/CSS/JS). When this spec and the reference disagree, **this spec wins**.

---

## 1. Purpose

One page that explains how the 11 diligence skills chain together, shown as a subway map.

- **At rest:** the visitor sees only two things per station: **the skill name** and **the question it answers**.
- **Motion:** a "train" moves progressively from station to station, and the current stop is emphasized.
- **On hover/tap:** full detail appears (inputs, outputs, what it feeds, and the code behind it).

**Design principle:** low cognitive load first, full transparency one hover away. Nothing important is hidden, but nothing extra is shown until asked for.

**Audience:** fund partners, VCs, operators. They skim first and go deeper only if interested.

---

## 2. Page structure (top to bottom)

| # | Block | Content |
|---|---|---|
| 1 | Header | Eyebrow `THE DILIGENCE STACK · READ ME`, H1 "The Diligence Stack", one-line lede: *"Eleven skills, four lines. The train walks the route; hover or tap any station for what it takes, what it produces and the code behind it."* |
| 2 | Control bar | Left: route selector (4 toggle buttons). Right: `◀` `Pause/Play` `▶` |
| 3 | "Now" panel | Large stop number · full question of the current stop (large) · chip `/skill` + line name + "stop X of N" · thin progress bar (fills over the dwell time) |
| 4 | Map | SVG subway diagram inside a bordered card. Hover cards float over it. |
| 5 | Legend | 4 line colors + interchange glyph |
| 6 | Evidence rules footer | `[A]` verified · `[B]` reported · `[C]` estimated · Claims sourced `S-` `I-` `P-` · Effort 70% research · 20% argument · 10% document · What couldn't be checked goes to the appendix |

Max content width: **1180px**, centered, 16px minimum side gutter.

---

## 3. Data model (single source of truth)

All content lives in **one data object**. Every UI element renders from it, with nothing hard-coded in the markup.

### 3.1 Lines

```json
{
  "company": { "name": "Company diligence",   "color": "--l-co" },
  "product": { "name": "Product diligence",   "color": "--l-pr" },
  "tech":    { "name": "Technical diligence", "color": "--l-te" },
  "shared":  { "name": "Shared line",         "color": "--l-sh" }
}
```

### 3.2 Stations

Fields: `id` · `step` (main-trunk number 1–5, optional) · `line` · `hub` (interchange, true/false) · `isNew` · `sq` (short question, shown on map) · `q` (full question, shown in Now panel and card) · `takes` · `produces` · `feeds` (ids) · `why` · `run` (command) · `out` (output format).

```json
[
  {"id":"marketdd","step":"1","line":"company","sq":"How big is the market?",
   "q":"How big is the market, how fast does it grow, who plays, and what are the 5 trends?",
   "takes":"A sector or software category",
   "produces":"Word + PDF deep dive in 10 fixed sections: sizing, value chain, players, M&A, segments, 5 trends",
   "feeds":["duediligence","personapanel","productdd"],
   "why":"Runs first inside /duediligence. Its segments seed /personapanel and its sizing builds the /productdd pyramid.",
   "run":"/marketdd \"<sector>\"","out":".docx + .pdf"},

  {"id":"duediligence","step":"2","line":"company","hub":true,"sq":"Is it a good company?",
   "q":"Is this a good company? Financials, strategy, ownership, founders?",
   "takes":"A company name",
   "produces":"2-page Word memo with exhibits: financials (or proxy signals), SWOT, ownership, org chart with the digital leader",
   "feeds":["companypeople","productdd"],
   "why":"Together with /marketdd it forms Report 1. It is the entry point for both the people line and the product line.",
   "run":"/duediligence \"<company>\"","out":".docx"},

  {"id":"companypeople","line":"company","sq":"Who actually decides?",
   "q":"Who really decides, and how do I reach them?",
   "takes":"A company name or an existing DD memo",
   "produces":"Word people map: org chart, one card per person, email with confidence score, opening message",
   "feeds":["targetpeople"],
   "why":"Turns the org chart into named people you can act on.",
   "run":"/companypeople \"<company or memo>\"","out":".docx"},

  {"id":"targetpeople","line":"company","sq":"How do I get in front of them?",
   "q":"How do I actually get a meeting with these people?",
   "takes":"Names plus the angle you are pursuing",
   "produces":"Outreach plan: routes ranked by odds of landing, timed message sequence",
   "feeds":[],
   "why":"End of the company line. The output is a meeting, not a memo.",
   "run":"/targetpeople \"<names>\" --angle \"<why>\"","out":".docx"},

  {"id":"cohortlab","line":"product","sq":"Does retention flatten?",
   "q":"Does retention flatten? How good is the revenue?",
   "takes":"Customer revenue or MRR export",
   "produces":"Retention triangles, NRR/GRR bridge, concentration, ready-made chart specs",
   "feeds":["productdd"],
   "why":"Hard numbers behind the /productdd verdict. Called automatically when raw data exists.",
   "run":"/cohortlab revenue_export.csv","out":"charts + tables"},

  {"id":"personapanel","line":"product","isNew":true,"sq":"Would a real user adopt it?",
   "q":"Would real buyers and users discover, buy and use it?",
   "takes":"Market segments, ICP, product access",
   "produces":"Discover / Buy / Use scores from 1 to 5, a typical day, top irritants, simulated verbatims",
   "feeds":["productdd"],
   "why":"Feeds /productdd. Recalibrated by real interviews from /interviewlog.",
   "run":"/personapanel \"<product>\" --segments \"<ICP>\"","out":"scores + verbatims"},

  {"id":"productdd","step":"3","line":"product","hub":true,"sq":"Does it grow? What breaks at 10x?",
   "q":"Does the product keep growing? What breaks at 10x?",
   "takes":"DD memo, cohorts, personas, interviews",
   "produces":"Word memo: Invest / Conditional / Pass verdict, weighted scorecard, pyramid, positioning map, red flags, data-needed appendix",
   "feeds":["technicaldd","valuecreation"],
   "why":"The decision memo. Everything on the product line converges here.",
   "run":"/productdd \"<company>\"","out":".docx"},

  {"id":"technicaldd","step":"4","line":"tech","sq":"Does the tech back the claims?",
   "q":"Does the technology back the claims? How deep is the debt?",
   "takes":"Target and its product claims, optional CTO kits",
   "produces":"6-axis scorecard (APIs, MCP readiness, integration time, architecture, SLA, security), same verdict scale",
   "feeds":["valuecreation"],
   "why":"Checks what /productdd could only take on trust.",
   "run":"/technicaldd \"<target>\"","out":".docx"},

  {"id":"valuecreation","step":"5","line":"tech","hub":true,"sq":"What do we fix first?",
   "q":"What do we fix first after investing, and how do we prove it?",
   "takes":"Product and tech findings",
   "produces":"Sized levers, 100-day plan, metrics that prove it worked, board asks",
   "feeds":[],
   "why":"Turns red flags into a board pack.",
   "run":"/valuecreation \"<company>\"","out":".docx (board pack)"},

  {"id":"interviewlog","line":"shared","sq":"What did people actually say?",
   "q":"What did people actually say, in citable form?",
   "takes":"Notes, voice memos, VTT/SRT transcripts, emails",
   "produces":"Source log: one entry per call, verbatims, I-xx rows",
   "feeds":["duediligence","productdd","personapanel"],
   "why":"Feeds evidence into every memo. Usable at any stop.",
   "run":"/interviewlog notes/*.vtt","out":"source log"},

  {"id":"onbrand","line":"shared","sq":"Will it land as theirs?",
   "q":"Can this land as if it came from inside their house?",
   "takes":"Any finished Word memo plus the target website",
   "produces":"Re-skinned, co-branded document in the target palette",
   "feeds":[],
   "why":"Ships any memo as a work sample. Usable at any stop.",
   "run":"/onbrand memo.docx --site \"<target.com>\"","out":".docx"}
]
```

> ⚠️ The `run` commands are placeholder syntax. Replace them with the real invocations before launch.
> Skill file path shown in cards is derived: `~/.claude/skills/<id>/SKILL.md`.

### 3.3 Routes (tours)

```json
{
  "full":   {"name":"Full tour","stops":["marketdd","duediligence","companypeople","targetpeople","interviewlog","cohortlab","personapanel","productdd","technicaldd","valuecreation","onbrand"]},
  "first":  {"name":"First meeting","stops":["marketdd","duediligence","companypeople","targetpeople"]},
  "invest": {"name":"Investment decision","stops":["duediligence","interviewlog","cohortlab","personapanel","productdd","technicaldd"]},
  "after":  {"name":"After the deal","stops":["productdd","valuecreation","onbrand"]}
}
```

Default route on load: **full**.

---

## 4. Map geometry

SVG `viewBox="0 0 1100 580"`, width 100%, height auto. Coordinates are in viewBox units.

### 4.1 Station positions and label side

| Station | x | y | Labels | Glyph |
|---|---|---|---|---|
| marketdd | 80 | 280 | below | circle |
| duediligence | 250 | 280 | below | **interchange** |
| companypeople | 400 | 130 | above | circle |
| targetpeople | 600 | 130 | above | circle |
| productdd | 520 | 280 | above | **interchange** |
| technicaldd | 720 | 280 | above | circle |
| valuecreation | 920 | 280 | above | **interchange** |
| cohortlab | 440 | 410 | below | circle |
| personapanel | 610 | 410 | below | circle + `NEW` tag |
| interviewlog | 300 | 500 | below | circle |
| onbrand | 960 | 500 | below | circle |

### 4.2 Track paths (draw order: shared → company → product → feeders → tech)

| Line | Path `d` | Style |
|---|---|---|
| Shared | `M40 500 H1060` | 4px, dotted (`stroke-dasharray: 2 9`, round caps) |
| Company | `M80 280 H250 L400 130 H600` | 7px, round caps/joins |
| Product trunk | `M250 284 H920` | 7px |
| Product feeders | `M440 410 H480 L520 370 V288 M610 410 H560 L520 370` | 7px |
| Tech | `M520 276 H920` | 7px |

Product (y=284) and Tech (y=276) run as **parallel double track** from productdd to valuecreation.

### 4.3 Glyphs and labels

- **Circle station:** r=9, fill = card background, stroke 3px in the line color.
- **Interchange:** rounded rect 30×22, rx=11, stroke 3px in **ink** (neutral), fill = card background.
- **Label stack:** line 1 is `/skillname` (mono 13px, semibold, line color). Lines 2–3 are the short question `sq` (body 13px, muted), wrapped at about 20 characters, max 2 lines.
  - *below:* first line at y+32, then +17 per line.
  - *above:* last line at y−24, stacked upward 17px per line.
- **Hit area** (invisible rect for hover/tap): 132×98 covering glyph + labels.

---

## 5. Behavior

### 5.1 Auto tour (the "progressive focus")

- The train is a filled ink dot (r=7) with a pulsing halo (r=18, opacity pulsing 0.15 → 0.03, 1.6s loop).
- **Dwell:** 3.6s per stop. The progress bar in the Now panel fills linearly during the dwell.
- **Move:** the train glides to the next station in 0.9s, `cubic-bezier(.6,0,.3,1)`, in a straight line.
- **Loop:** after the last stop it returns to the first.
- **Current station:** glyph scales ×1.45 and its question text switches from muted to ink.
- **Stations not in the selected route:** opacity 0.28, still hoverable.
- The **Now panel** updates on every stop: number, full question `q`, chip, "stop X of N" (announced via `aria-live="polite"`).

### 5.2 Controls

- **Route buttons:** 4 toggles, pressed state inverted (ink background). Selecting one resets to stop 1 and starts playing.
- **◀ / ▶:** step backward or forward one stop, and **pause** the tour.
- **Pause / Play:** toggles. When resuming, the progress bar continues from where it stopped.

### 5.3 Hover card (details on demand)

Trigger: mouse enters a station hit area, or keyboard focus on a station.

- Hovering **pauses** the tour. Leaving (180ms grace delay, which lets the pointer travel onto the card) hides the card and **resumes** the tour if it was playing.
- **Click/tap pins** the card (the mobile path). A second tap, a click outside, or `Esc` closes it.
- **Card position:** anchored to the station.
  - Stations with x > 620: the card opens to the **left**. Otherwise it opens to the right (22px offset).
  - Stations with y < 350: the card opens **downward**. Otherwise it opens upward.
- **Card size:** width 330px (max viewport − 48px), radius 10, soft shadow, above the map (z-index).

**Card content, in order:**
1. Chip `● /skill` (line color dot) + muted "Line name · step N"
2. Full question `q` (display face, 17px, bold)
3. Definition list: **TAKES** → `takes`, **GIVES** → `produces`
4. **FEEDS INTO**: chips for each `feeds` id (each with its own line dot). If empty, show "End of line".
5. `why` sentence (muted)
6. Collapsed `<details>` **"Under the hood"**, a mono block:
   ```
   # run
   /productdd "<company>"
   # skill file
   ~/.claude/skills/productdd/SKILL.md
   # output
   .docx
   ```

---

## 6. Visual system

### 6.1 Tokens

| Token | Light | Dark |
|---|---|---|
| `--bg` | `#F2F3EF` | `#111317` |
| `--card` | `#FFFFFF` | `#1A1D23` |
| `--ink` | `#15171C` | `#ECEEF1` |
| `--muted` | `#5B616C` | `#9AA1AC` |
| `--rule` | `#D3D6CF` | `#2C3038` |
| `--soft` | `#E7E9E3` | `#20242B` |
| `--l-co` Company | `#2356C4` | `#6F97F2` |
| `--l-pr` Product | `#D9640F` | `#F49A4C` |
| `--l-te` Technical | `#12855A` | `#42C28B` |
| `--l-sh` Shared | `#7C828C` | `#8A919C` |

Theme follows `prefers-color-scheme`, plus an explicit `[data-theme]` override. Line colors are the only accents on the page.

### 6.2 Typography

- **Overpass** (Google Fonts, weights 400/600/800) for display and body. It is road-signage lettering, which fits the transit metaphor.
- **Overpass Mono** (400/600) for skill names, eyebrows, chips and code.
- **H1:** 800, `clamp(26px, 4vw, 38px)`. **Now-panel question:** 800, `clamp(18px, 2.4vw, 24px)`. **Body:** 15px/1.5.
- Eyebrows: mono 11px, uppercase, letter-spacing .12em.

---

## 7. Responsive

- ≥ 980px: the map fits in full.
- < 980px: the map keeps a min-width of 980px inside a horizontally scrollable card. **The page itself never scrolls sideways.**
- Control bar wraps onto two rows on narrow screens.
- Touch devices use tap-to-pin in place of hover.

## 8. Accessibility

- Each station is `role="button"`, `tabindex="0"`, `aria-label="/id: full question"`. Enter/Space pins it.
- Visible focus ring (2px company-blue outline on the glyph).
- `prefers-reduced-motion`: the tour starts **paused**, and all transitions and the halo pulse are disabled.
- Text contrast of at least 4.5:1 in both themes.

## 9. Acceptance criteria

- [ ] On load, the full tour autoplays from stop 1 and the Now panel shows the question for `/marketdd`.
- [ ] Each station shows only `/name` + short question at rest.
- [ ] Selecting "Investment decision" dims the 5 stations outside that route and restarts at `/duediligence`.
- [ ] Hovering any station pauses the train and shows the card. Leaving resumes it.
- [ ] Cards never overflow the map edge, whichever station is hovered.
- [ ] Tapping works on mobile (pin/unpin), and `Esc` closes.
- [ ] Light and dark themes both render correctly, with no hard-coded colors.
- [ ] All content comes from the data object in §3, and editing one entry updates the map, card and Now panel.

## 10. Tech notes

- Vanilla HTML/CSS/JS, no framework required. If the site uses React, keep the data object as a separate `stack.ts` and render the SVG from it.
- Animation uses CSS transitions (train movement, glyph scale) plus one `requestAnimationFrame` loop for the progress bar and dwell timer.
- No external calls apart from Google Fonts.
