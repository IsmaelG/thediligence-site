# TheDiligence public site — Spec

**Version 1.0 · 8 Oct 2026 (late night).** Reading order and precedence: this SPEC (what and when) → `AGENTS.md` (rules) → `docs/INTERFACE.md` (the contract with the platform) → `docs/DESIGN-SYSTEM.md` (how it looks) → `docs/ARCH.md` (platform facts, read-only). The prototypes in `prototypes/site-v3/` are the visual and copy reference; where a prototype and this SPEC disagree on a claim, this SPEC wins.

> This note is the source of truth for the website workspace in Intent. Agents read it before working, write decisions back into the Decisions log, and tick the task blocks below. The platform is built in another workspace and another repository; do not touch it. Conventions every agent must follow are in `AGENTS.md`.

## Goal

A public site on `thediligence.app` that explains Ismael's diligence method and sells two things: **Team** (fixed-price sprints, "Book time with us") and **Platform** ("Start free", a waitlist until the platform opens). It opens with the words "Diligence." and "Built by operator-investors, for operator-investors." A partner or a fund reviewer must understand in two minutes what it is, what it costs, what is real today and what is not, and how to reach us. It also hosts the open method: the eleven skills on a subway map, and the link to the public skills repository.

## Context

- Strategy, prices (proposals marked [C]), the 30/60/90 calendar and the open questions: `docs/STRATEGY.md` (the section "Night of 8 Oct 2026" wins over older sections).
- Method and station graph: `docs/diligence-map-SPEC.md` §3 (data) and §4 to §9 (the map, its behaviour and its acceptance). Today's explainer is https://the-diligence-stack.vercel.app, which this site replaces; it stays live until the Method page ships, then redirects (301) to `/method`.
- Look and feel: `docs/DESIGN-SYSTEM.md` with `docs/tokens.css`. The reference is `prototypes/site-v3/`: screenshots of every page at 1280 and 390 px (`screenshots/`), the pages themselves (`preview/*.dc.html`, viewable with `python3 -m http.server` in that folder, see its README) and their sources (`src/`); the design system cites `src/base.css` and `src/ui.css` by line.
- Platform facts the pages state (plans, providers, security, status tags): `docs/ARCH.md` §3b, §10b, §11b, §12 and §13e. Read-only; the platform workspace owns it.
- Contract with the platform (proxy, forms, shared data, DNS, who ticks what): `docs/INTERFACE.md`.
- Domain: `thediligence.app`, bought through Vercel. This project owns the apex, `www` (301 to the apex) and `status.`. Product name "TheDiligence" is subject to a trademark search; "The Diligence Stack" is the name of the method.
- Skills: the eleven stations on the map. `investordeck` is deferred and not on the map.

## Non-goals (v1)

- Any product feature, account, login, database, payment or model call. The platform does that, under `/app`.
- A CMS. Insights and Changelog are MDX files in the repository.
- Third-party scripts beyond Vercel Web Analytics. The Cal.com booking is a link, not an embed.
- The public read-only MCP server and directory listings (a separate small project, STRATEGY days 31 to 60).
- Claims that cannot be shown: certifications, accuracy percentages, customer logos without consent, a per-memo price.

## Acceptance criteria (site; all must hold on the production deployment)

S1. The public pages exist and are indexed on `thediligence.app`: Landing, Products, Solutions, Method, Platform (plans and prices), Security, About, Insights, Contact (Book time), Changelog, Status (link to `status.thediligence.app`), Privacy, Terms. `www` redirects (301) to the apex; `/pricing` redirects to the plans section of Platform; `sitemap.xml`, `robots.txt`, canonical URLs and Open Graph images exist.
S2. Each page keeps the structure and copy of its prototype in `prototypes/site-v3/preview/` after the copy rules below are applied, checked side by side with `prototypes/site-v3/screenshots/` at 1280 px and 390 px (Ismael reviews your screenshots).
S3. The subway map on Landing renders from `lib/stack.ts` (eleven stations) and passes the eight checks of `docs/diligence-map-SPEC.md` §9.
S4. Only tokens from `docs/tokens.css` are used (a test finds no hard-coded colour, size, font, radius, shadow, duration or z-index); light and dark both render; `scripts/contrast.py` exits 0 in CI.
S5. Lighthouse mobile ≥ 90 for Performance, Accessibility, Best Practices and SEO on Landing, Platform and Method; axe reports no serious or critical issue on any page; every control is keyboard-reachable with a visible focus; `prefers-reduced-motion` is respected; no horizontal page scroll at 375 px.
S6. Honest status: every capability that is not live carries At launch, Next or Later, or the word Preview; plan, memo and run windows are labelled illustrative; a form that is not connected says "Preview: this form is not connected yet." and offers the Cal.com link.
S7. Copy rules: `pnpm copy:lint` fails the build on any forbidden phrase (at least: "never collect or store", "do not collect or store", "nothing to paste", "no key to paste", "third-party connection", "SOC 2" without a status tag, "$15 to 25"), any number without an entry in `content/claims.json`, any provider tag that differs from `content/providers.json`, and any price while `plans.json` has `published: false`.
S8. Forms: "Book time with us" opens the Cal.com link. The connector-request and engagement forms post to the site's Route Handlers, which validate, rate-limit, sign and forward to the platform (`docs/INTERFACE.md` §4) when the flag `forms_live` is on; otherwise they show the Preview notice. The site stores nothing and logs no message body or email.
S9. Privacy: Vercel Web Analytics only, no cookie set by the site; the cookie banner component exists but stays dormant until a cookie-setting tool is added. Privacy and Terms are drafts marked "Draft: pending legal review" until counsel confirms, and Terms say "evidence-graded analysis, not investment advice".
S10. Proxy: with the flag `app_proxy` on, `/app/*` reaches the platform (`docs/INTERFACE.md` §1); with it off, `/app` shows a branded "coming soon" page with the waitlist form. The site never reads platform cookies.
S11. Licence: the public skills repository is prepared (task `s3-licence`) and, once Ismael confirms counsel's read, linked from Method and the footer. Until then Method shows no placeholder text: it says the repository link is coming.
S12. Launch operations: apex, `www` and `status.` configured; Search Console verified; custom 404 and 500 pages; security headers including a nonce-based CSP; Web Analytics on; a status page live; the old explainer redirects to `/method` once Method ships.
S13. Gates before public launch, ticked by Ismael: trademark search result; counsel read of the site (AI Act Article 50, GDPR, Terms); consent of the four funds for their logos (the logos row is hidden until then, flag `logos_visible`); named operators and the specialties that can be proved; the commitments "reply within one business day" and "written answers to security questionnaires" confirmed or removed; entity and VAT status settled before the first sprint is sold.

## Copy rules (the claims register)

These override the prototypes.

**Never write**
- "We never collect or store your key", "nothing to paste" or any sentence implying that a pasted key does not exist. Say instead: *Sign in with your provider where the provider allows it, on the provider's own screen. Where it does not, you can paste a key as a last resort. It is encrypted, never visible to agents, and you can delete it in one click.* (Decision of 8 Oct 2026, late night.)
- "SOC 2" as achieved, "certified", "compliant" without a status tag. SOC 2 Type I is Later.
- Any accuracy percentage, any "$15 to 25 per memo" figure, any promise of savings. Cost is shown as control (plan priced before launch, cap, estimate versus actual).
- That Instinct has an MCP interface. The MCP interface for the user's own agents is Next, and a proposal to confirm.
- "Open source" for the method until the repository is public. The footer line reads "TheDiligence is a working name." until the trademark search is back; "The method is open source (Apache-2.0) and stays free." only once the repository is public.
- Fund names or logos without consent, a price that is not yet published, or a commitment not yet confirmed (S13).
- Exclamation marks. Chat or "AI assistant" framing: the product is a management interface.

**Route today, per provider** (v1 writers run on Claude; the other providers run the independent check). Say it plainly: *In v1 the memo writers run on Claude; OpenAI, Gemini and Mistral run the independent check.* Claude: pasted key or cloud role (no sign-in exists). OpenAI: pasted key; sign-in is Next until approved. Gemini: pasted key; sign-in is Next until prototyped. Mistral: pasted key. A sign-in route is tagged Next until `oauth_status` is `available` and shipped. "Managed keys at cost plus 30 %" is Later (only a single trial diligence is managed in v1).

**Always say**
- "Evidence-graded analysis, not investment advice" wherever a verdict appears.
- "Illustrative" on plan, memo and run windows and on the evidence slider.
- Free plan = one diligence per rolling 7 days. Sign-in first; a pasted key only as a last resort. "We never train or fine-tune a model on customer data; with your opt-in, redacted feedback may inform changes to prompts, skills and tests."
- Product status words: At launch, Next, Later (nothing else); "Preview" for a control that is not connected.
- Provider tags (Claude, OpenAI, Mistral, Gemini) follow `content/providers.json`, whose `tag` is derived from `oauth_status` and the route above. "We never train or fine-tune a model on customer data" and "stays free" have entries in `content/claims.json` with their source (ARCH §11b; counsel read of S13). Team-sprint prices follow the same `published` rule as plan prices. Prices follow `content/plans.json` and appear only when `published` is true.
- "Operator-investor" wording; the CTA "Book time with us" everywhere (no names); "Start free" for the platform.

## Decisions log

Agents append here, dated, one line each: what was decided and why.

- 2026-10-08 — Domain `thediligence.app` (bought through Vercel) for the public site; the platform lives under `/app` (INTERFACE §1).
- 2026-10-08 — Two Intent workspaces (Ismael): this one builds the site; the platform has its own SPEC. Contract: `docs/INTERFACE.md`.
- 2026-10-08 — Hero reads "Diligence." then "Built by operator-investors, for operator-investors." (round 3, point 0). CTA "Book time with us" everywhere.
- 2026-10-08 — Free plan = one diligence a week. Hosted vault by default, Obsidian plugin from Pro, both tagged At launch in the prototypes; confirm against the platform SPEC before launch.
- 2026-10-08 — Logos validated on the Logos board, but consent of the four funds is still to be collected; the row stays hidden until then.
- 2026-10-08 (late night) — Keys: sign-in first, a pasted key as a last resort (Ismael, 23:47). The prototypes' sentences "We never collect or store your key" and "Nothing to paste" (Platform page, broker diagram) are replaced (copy rules).
- 2026-10-08 (late night) — Answers of Ismael: entity, VAT and accountant OK (before the first euro); outside-activity terms and named operators not a problem for now; trademark search and counsel read launched in parallel, results pending; Fund sold by hand in v1.
- 2026-10-09 — Waitlist = signed engagement request of kind `waitlist` (no third-party form, nothing stored on the site). Proxy implemented at runtime in `proxy.ts`. Rate limit by Vercel Firewall rule. Flags through Edge Config.
- 2026-10-08 (late night) — Prices in STRATEGY are proposals [C]; the site shows none until `content/plans.json` has `published: true`.

## Tasks

Effort scale: `small` ≤ ½ day · `medium` ≤ 2 days · `large` ≤ 5 days. Each task's body says what *done* means; verify it before ticking.

### Phase 0 — foundation

@@@task key=s0-docs effort=small
# Page inventory and content map
## Scope
- Grep every prototype page (not only Platform: also Security, Solutions, Main, Products and `src/partials/broker.html`) for the key sentences ("never collect or store", "do not collect or store", "no key to paste", "nothing to paste", "third-party connection", the FAQ answer "No.") and for provider claims that break the route-today rule.
- Create `docs/PAGES.md` from `prototypes/site-v3/preview/*.dc.html`: for each page its route, purpose, sections in order, the data each section reads (`lib/stack.ts`, `content/*.json`), CTAs, status tags and forms. Note every sentence that breaks a copy rule (Platform and the broker diagram carry the key sentences; Method carries the placeholder `[REPOSITORY LINK AND LICENCE TO ADD]`; the footer carries "TheDiligence is a working name.").
- Check that every file this SPEC cites exists (`docs/INTERFACE.md`, `docs/STRATEGY.md`, `docs/DESIGN-SYSTEM.md`, `docs/tokens.css`, `docs/diligence-map-SPEC.md`, `docs/ARCH.md`, `scripts/contrast.py`, `prototypes/site-v3/`); if one is missing, stop and ask.
- Do not invent pages, sections or claims that the prototypes and STRATEGY do not contain.
## Done
- `docs/PAGES.md` lists all thirteen pages of criterion S1 and every copy-rule breach found in the prototypes.
@@@

@@@task key=s0-scaffold dependsOn=s0-docs effort=medium
# Scaffold the site on Vercel
## Scope
- Next.js 16 (App Router), TypeScript strict, pnpm, Biome; static generation by default; MDX through `@next/mdx` for Insights and Changelog; folders `app/`, `components/`, `content/`, `lib/`, `scripts/`, `tests/`.
- Design tokens: `docs/tokens.css` pasted into `app/globals.css` (DESIGN-SYSTEM §10.2); fonts Newsreader, Overpass and Overpass Mono through `next/font` (§10.3); light and dark with `prefers-color-scheme` and `[data-theme]` (§10.6).
- Vercel project linked, preview deployments on every PR, production on `main`. Ismael attaches the domain (apex production, `www` redirecting to it): write the exact steps in `docs/LAUNCH.md` and do not guess at the account or team.
- Flags (Vercel Flags SDK, togglable without a redeploy through Edge Config provisioned from the Marketplace, with the `FLAGS_SECRET` it needs): `app_proxy`, `forms_live`, `platform_open`, `repo_public`, `logos_visible`, `pricing_published`. Environment variables of INTERFACE §3, with `DD_SITE_FORMS_SECRET` as a team-level Shared Environment Variable. No other secret beyond Marketplace-provisioned ones.
- The proxy `/app/:path*` → `${PLATFORM_ORIGIN}/app/:path*` lives in `proxy.ts` (runtime, reads `app_proxy`), not in a build-time rewrite; `next.config` holds the redirects; redirects `www` → apex, `/pricing` → `/platform#plans`; security headers with a nonce-based CSP (no inline script).
- CI: lint, typecheck, build, `python scripts/contrast.py` (must exit 0), Playwright smoke (every route returns 200), under 10 minutes.
## Done
- `pnpm build` is green on Vercel; `/` renders a placeholder with the tokens in both themes; CI is green; the flags and env vars are listed in `docs/LAUNCH.md`.
@@@

### Phase 1 — shell, data, map

@@@task key=s1-shell dependsOn=s0-scaffold effort=medium
# Shell: navigation, footer, theme, components
## Scope
- Navigation (Products, Solutions, Method, Security, About; Platform and Insights in the mobile menu; "Start free" and "Book time with us"), footer (links, status, licence line per copy rules), mobile drawer, skip link, theme toggle, dormant cookie-banner component.
- The components of DESIGN-SYSTEM §5 that the pages use (buttons, tags and status chips, chips, cards, tables, FAQ, forms, hero, closing band, logos row, workflow lanes, process diagrams, product windows), keeping the class names of Appendix A so a page can be diffed against its prototype. Props as in §10.5.
- Logos row rendered only when the flag `logos_visible` is on.
## Done
- Every component renders in light and dark; keyboard navigation works through the shell; DESIGN-SYSTEM §0.3 passed.
@@@

@@@task key=s1-data dependsOn=s0-scaffold effort=small
# Content data: stack, plans, providers, claims
## Scope
- `lib/stack.ts`: the eleven stations, lines, routes and geometry from `docs/diligence-map-SPEC.md` §3 and §4, typed; `prototypes/site-v3/preview/stack-data.js` carries the same data to check against. The `run` commands there are placeholder syntax: keep them marked as placeholders.
- `content/plans.json` (Free, Pro, Fund; limits; prices with `published: false`), `content/providers.json` (Claude, OpenAI, Mistral, Gemini with `oauth_status` and the site tag), `content/claims.json` (every number or factual claim on the site, its source and its grade), `content/site.ts` (strings shared by several pages, from `prototypes/site-v3/preview/site-data.js`).
- Validate the files with zod at build time.
## Done
- The build fails on a malformed data file; `lib/stack.ts` has eleven stations and the `feeds` graph matches the map spec.
@@@

@@@task key=s1-copylint dependsOn=s1-data effort=small
# Copy lint
## Scope
- `pnpm copy:lint` scans pages, MDX and data for the forbidden phrases of the copy rules, any number not listed in `content/claims.json`, any provider tag that differs from `content/providers.json`, any price while `published` is false, any exclamation mark, and any hard-coded token value; it runs in CI and fails the build.
- A fixture file with one violation of each kind proves the linter catches them.
## Done
- The linter is green on the repository and red on the fixture.
@@@

@@@task key=s1-map dependsOn=s1-shell,s1-data effort=large
# The subway map
## Scope
- Build the map exactly as `docs/diligence-map-SPEC.md` §4 to §8 say (geometry, tour, controls, hover card, responsive, accessibility), rendered from `lib/stack.ts`. Vanilla SVG with React state is fine; no animation library. `prototypes/site-v3/preview/Main.dc.html` shows the approved look inside the Landing page.
- Used on Landing; also available as a component for Method.
## Done
- Criterion S3: the eight checks of the map spec §9 pass in a Playwright test; the tour starts paused under `prefers-reduced-motion`.
@@@

### Phase 2 — pages and forms

@@@task key=s2-core dependsOn=s1-map,s1-copylint effort=large
# Core pages: Landing, Products, Solutions, Method, Platform
## Scope
- Port each page from its prototype with the copy rules applied: Landing (hero "Diligence." and "Built by operator-investors, for operator-investors.", the two doors, the map, "The more evidence you add, the better the memo" with the illustrative evidence slider, the workflow of agents and people), Products, Solutions, Method (eleven skills, the repository block per `s3-licence`), Platform (four-step onboarding, connectors with "Ask for another" chips, plans from `content/plans.json`, comparison, roadmap, FAQ with the corrected key answer).
- "Start free" leads to `/app` when `platform_open` is on, otherwise to the waitlist form of `s2-proxy`. "Book time with us" leads to `CAL_URL`.
## Done
- Criteria S2, S6 and S7 hold for these five pages; screenshots at 1280 and 390 px sent to Ismael.
@@@

@@@task key=s2-trust dependsOn=s1-shell,s1-data effort=medium
# Trust and legal pages: Security, About, Insights, Contact, Changelog, Privacy, Terms
## Scope
- Security (credential broker, data classes, controls with status tags, what agents can never do, subprocessors; the key wording of the copy rules), About (photos, bios and the story paragraph are placeholders for Ismael: label them Draft), Insights (MDX list and one draft note), Contact (Book time), Changelog (MDX), Privacy (data classes, retention defaults, providers, DPA on request) and Terms, both marked "Draft: pending legal review".
- Custom 404 and 500 pages; a Status page that links to `status.thediligence.app`.
## Done
- Criteria S1 (pages), S6 and S9 hold for these pages; no certification is claimed.
@@@

@@@task key=s2-proxy dependsOn=s0-scaffold effort=small
# Proxy to the platform and the waitlist
## Scope
- With `app_proxy` on, `/app/:path*` reaches the platform; with it off, `/app` renders a branded "coming soon" page with the waitlist form (Preview notice; an email and a consent line, sent as a signed engagement request of kind `waitlist` when `forms_live` is on, otherwise the Preview fallback).
- Document in `docs/LAUNCH.md` how to turn the proxy on, including the `PLATFORM_ORIGIN` for production and for previews.
## Done
- Criterion S10 holds in a Playwright test for both flag states; no platform cookie is read or set.
@@@

@@@task key=s2-forms dependsOn=s2-core,s2-trust effort=medium
# Forms: connector requests, engagement requests, Book time
## Scope
- Forms of the Platform page ("Ask for another" for models and vaults), Contact and Solutions (security review, hire us): client validation, honeypot `website`, consent line, per-IP rate limit (a Vercel Firewall rate-limit rule; the client IP travels inside the signed body), then `POST /api/forms/connector` or `/api/forms/engagement` signed and forwarded as in `docs/INTERFACE.md` §4. Text is escaped everywhere it is shown. No storage and no logging of bodies or emails on the site.
- With `forms_live` off, or on a `503`, show "Preview: this form is not connected yet." and the Cal.com link.
## Done
- Criterion S8: a test with a mock platform proves signing, the rate limit (50 posts in a minute) and the Preview fallback; with the real platform, one test request appears in `/admin` → Requests (ticked when the platform is live).
@@@

### Phase 3 — repository, search, quality

@@@task key=s3-licence dependsOn=s2-core effort=small
# Public skills repository and Apache-2.0 licence
## Scope
- Prepare, in a separate repository that stays private until Ismael confirms counsel's read of the licence change: `LICENSE` (Apache-2.0), `NOTICE` (names the project and keeps the MIT notice of the adopted tech-due-diligence skill verbatim), SPDX headers on every script, scripts in one documented `scripts/` folder, `SECURITY.md` (how to report a vulnerability, what a skill may do), `CONTRIBUTING.md` with DCO sign-off, a README saying what is open (skills, method) and what is not (platform, orchestration, data, templates, brand; name and logos are not licensed), a one-command install (`/plugin marketplace add` or a ZIP), release tags with a published SHA-256 of the archive. The skills themselves are Ismael's files: ask for them, do not write them.
- Run a dependency and third-party-code scan (`reuse lint` or equivalent) and look for any `CC BY-NC` string before the first release.
- On the site, behind the flag `repo_public`: Method shows the repository link and the licence; the footer reads "The method is open source (Apache-2.0) and stays free." with the link. With the flag off, Method says "Repository link: coming" and the footer keeps "TheDiligence is a working name."
## Done
- Criterion S11 and, once public, platform criterion 23; the scan is green; no `CC BY-NC` string remains in either repository.
@@@

@@@task key=s3-seo dependsOn=s2-core,s2-trust effort=small
# Search, sharing and structured data
## Scope
- `sitemap.xml`, `robots.txt`, canonical URLs, per-page title and description, Open Graph and Twitter images generated from the tokens, JSON-LD (`Organization`, `WebSite`; `Article` for Insights), 301 from `the-diligence-stack.vercel.app` pages to their new routes (Ismael adds the redirect on the old project; list the mapping in `docs/LAUNCH.md`).
## Done
- Criteria S1 (indexing) and S5 (SEO score) hold; the redirect map is written.
@@@

@@@task key=s4-quality dependsOn=s2-core,s2-trust,s2-forms,s3-seo effort=medium
# Quality pass
## Scope
- Lighthouse CI on Landing, Platform and Method (mobile); axe on every route; link checker; Playwright screenshots of every page at 375, 768 and 1280 px in both themes, compared with the prototypes; keyboard and reduced-motion walkthrough; bundle budget (first-load JS ≤ 150 KB gzip per page, the map included).
- Fix or log each finding with an owner and a date in `docs/QUALITY.md`.
## Done
- Criteria S2, S4 and S5 hold; `docs/QUALITY.md` has no open serious finding.
@@@

@@@task key=s4-launch dependsOn=s3-licence,s4-quality,s2-proxy effort=small
# Launch checklist
## Scope
- Walk `docs/LAUNCH.md` with Ismael: domain attached (apex, `www`, `status.`), Search Console, analytics on, status page live, flags at launch (`forms_live`, `platform_open`, `repo_public`, `pricing_published` and `logos_visible` stay off until their gate; `app_proxy` turns on when the platform serves a login), the old explainer redirected, the gates of criterion S13 each ticked or consciously deferred.
- A real visit on a phone: Landing, Platform, Book time, Security.
## Done
- Each of S1 to S13 is ticked with evidence (links or screenshots) in this note, or recorded as deferred with its reason and owner (S8 live half, S10 live half and the S13 gates may wait for the platform and counsel).
@@@
