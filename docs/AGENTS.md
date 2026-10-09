# AGENTS.md — conventions for every agent working in this repo

Read `SPEC.md` first. It is the source of truth (precedence: SPEC, then this file, then `docs/INTERFACE.md`, then `docs/DESIGN-SYSTEM.md`); write decisions back into its *Decisions log*. This repository is the **public website** of TheDiligence. The platform is another repository and another Intent workspace: never edit or build it, and never copy platform code here. `docs/ARCH.md` is a read-only copy of the platform's architecture, used only for the facts the pages state. Before any UI work read `docs/DESIGN-SYSTEM.md` §0.

## Stack (do not substitute)

- **Next.js 16** App Router, **TypeScript strict**, pnpm, Biome for lint and format. Static generation by default; React Server Components; client components only for interaction (the map, the evidence slider, the theme toggle, forms).
- **Vercel**: hosting, Flags SDK, Web Analytics (no cookie). **MDX** through `@next/mdx` for Insights and Changelog. **zod** for data files and form bodies.
- No database, no authentication, no CMS, no payment, no model call, no UI kit (Tailwind, shadcn, MUI, Radix themes), no animation library, no third-party script, no embed (Cal.com is a link).
- Python is used for one thing only: `scripts/contrast.py`.
- Any other dependency needs a line in the Decisions log and a reason.

## Layout

```
app/                 routes: / , products, solutions, method, platform, security, about, insights/[slug], contact, changelog, status, privacy, terms; api/forms/{connector,engagement}; app-coming-soon
components/          shell, map, windows, forms (class names of DESIGN-SYSTEM Appendix A)
content/             plans.json, providers.json, claims.json, site.ts, insights/*.mdx, changelog/*.mdx
lib/stack.ts         the eleven stations, lines, routes, geometry (from docs/diligence-map-SPEC.md §3, §4)
lib/forms.ts         signing and forwarding (INTERFACE §4)
scripts/             contrast.py, copy-lint
docs/                SPEC-cited reference: INTERFACE, STRATEGY, DESIGN-SYSTEM, tokens.css, diligence-map-SPEC, ARCH (read-only), PAGES, LAUNCH, QUALITY (created by tasks)
prototypes/site-v3/  the approved pages: screenshots/ (1280 and 390 px), preview/ (built .dc.html, runnable), src/ (sources and CSS): visual and copy reference, never imported
tests/               Playwright (smoke, map, screenshots), axe, Lighthouse CI config
```

## Rules that are also code rules

1. **The prototypes are a reference, not a template.** Rebuild each page with the design system's components; do not paste prototype markup, inline styles or data URIs. Where a prototype breaks a copy rule of the SPEC, the SPEC wins.
2. **Copy rules are enforced by code.** `pnpm copy:lint` runs in CI. Never write a claim that is not in `content/claims.json`, a price while `plans.json` has `published: false`, or a provider tag that differs from `content/providers.json`.
3. **Honest status.** Everything unbuilt wears At launch, Next or Later, or says Preview. Plan, memo and run windows say illustrative. A control that does nothing yet says so.
4. **No credential in this project** except `DD_SITE_FORMS_SECRET` (a team-level Shared Environment Variable) and the Marketplace-provisioned flag variables. No model-provider key, no database URL, no Stripe key. Never ask for a secret in chat or in a prompt; the owner enters secrets only in Vercel.
5. **Forms store nothing.** The site validates, rate-limits, signs and forwards (INTERFACE §4); it logs no message body or email; it sets no cookie.
6. **The site never reads platform cookies** and never calls a platform endpoint from the browser.
7. **Every feature that is not ready sits behind a flag** (`app_proxy`, `forms_live`, `platform_open`, `repo_public`, `logos_visible`, `pricing_published`); the default is off.
8. **One source per fact.** Stations come from `lib/stack.ts`; plans from `content/plans.json`; providers from `content/providers.json`. Pages render from them, never repeat them by hand.
9. **The shared files are not edited here**: `docs/INTERFACE.md`, `docs/tokens.css`, `docs/DESIGN-SYSTEM.md`, `docs/ARCH.md`. If one is wrong, add a line to the Decisions log and tell Ismael.

## UI conventions

- `docs/DESIGN-SYSTEM.md` is the UI contract. Use only the tokens of `docs/tokens.css`; never hard-code a colour, radius, font, size, spacing, shadow, duration or z-index. Light and dark both required. Type in `rem`. The serif is for documents, the verdict word and the brand.
- Status language is fixed: product status `At launch · Next · Later`; grades `A/B/C`; confidence `High/Medium/Low`.
- Copy: short, no exclamation marks, operator-investor wording, the CTA "Book time with us" (no names) and "Start free", "evidence-graded analysis, not investment advice" wherever a verdict appears.
- Accessibility: all interactive elements keyboard-reachable, focus visible, contrast ≥ 4.5:1 (`scripts/contrast.py` exits 0), chips never the only carrier of meaning, `prefers-reduced-motion` respected, nothing scrolls sideways at 375 px.
- Images: AVIF or WebP, explicit width and height, `next/image`. Fonts: `next/font`, no layout shift.

## Engineering conventions

- Server-side validation with zod on every form body; text escaped wherever shown.
- Performance budget: first-load JS ≤ 150 KB gzip per page, the map included; Lighthouse mobile ≥ 90 on Landing, Platform and Method.
- Tests: unit (stack data, claims, copy lint), Playwright (every route 200, the map's eight checks, flag states of the proxy and the forms, screenshots at 375, 768 and 1280 px in both themes), axe on every route. CI under 10 minutes.
- Commit messages: `area: what, why` (e.g. `map: pause on hover, closes s1-map`). Reference the task key.

## Definition of done for any task

Code + tests + the `## Done` lines of the task verified + a one-line entry in `SPEC.md` *Decisions log* if a choice was made + `pnpm copy:lint` and `python scripts/contrast.py` green + the DESIGN-SYSTEM §0.3 checklist passed (or a note explaining the deviation).
