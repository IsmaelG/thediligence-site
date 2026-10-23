# AGENTS.md — conventions for every agent working in this repo

Read `SPEC.md` first. It is the source of truth (precedence: SPEC, this file, `docs/CONFORMITY.md`, `docs/UI-SPEC.md`, `docs/INTERFACE.md`, `docs/DESIGN-SYSTEM.md`); write decisions back into its *Decisions log*. This repository is the **public website** of TheDiligence. The platform is another repository and another Intent workspace: never edit or build it. `docs/ARCH.md` is a read-only copy of the platform's architecture, used only for facts the pages state.

## Rules that are also code rules

1. **Port, do not reinterpret.** The two approved pages (Home `/` = `Main`, Team `/team` = `Team`, design V5) are frozen in `spec/`. Pages are **generated** from `spec/markup/` with `pnpm port` and styled by `app/spec.css`, which `pnpm spec:css` generates from the unchanged `spec/styles/`. "Reference" here means *source to port*, never *inspiration*: you do not re-type a page, re-draw a block, rename a class, "improve" a heading or change a size, weight, colour, spacing or font. A page is done only when `pnpm conformity --pages=<Page>` is green at 1280, 768 and 390 px, and you paste its last line in the commit message. The first build ignored this and scored about 10 %; the live site scores 0 to 16 % against V5 (`docs/GAP-REPORT.md`).
2. **Never edit `spec/`, `scripts/conformity/`, a generated file (`app/spec.css`, `*-golden.tsx`, `docs/UI-SPEC.md`, `docs/pages/*.md`) or a threshold.** CI verifies `spec/SHA256SUMS`. If the reference looks wrong, stop, write a line in the Decisions log and tell Ismael or Mazen (mazwaz7); only they change the reference (`docs/CONFORMITY.md` §7). 
3. **Additions live in seams.** Anything the reference lacks (skip link, theme toggle, cookie banner, preview notice, legal links, the fund-names block when its flag is on) sits in an element carrying `data-conformity-skip="<reason>"`, at most five per page (`docs/CONFORMITY.md` §6).
4. **Copy rules are enforced by code.** `pnpm copy:lint` runs in CI. Approved replacements of design sentences are already in the golden markup (`spec/copy-overrides.json`); never put the original wording back.
5. **Report before claiming.** Never say a page matches the design without the `pnpm conformity` summary line; never mark a task done on a visual impression.
6. **Fonts and images as in the reference.** Fonts come from `app/spec.css` (self-hosted, same family names); do not add `next/font`. Images are plain `<img>` from `public/images`; do not swap in `next/image` on the two pages.
7. **No credential in this project** except the team-level `DD_SITE_FORMS_SECRET` and the Marketplace-provisioned flag variables. Never ask for a secret in chat; the owner enters secrets only in Vercel.
8. **Forms store nothing**; the site sets no cookie and never reads platform cookies.
9. **Every feature that is not ready sits behind a flag** (`app_proxy`, `forms_live`, `platform_open`, `repo_public`, `logos_visible`); the default is off.
10. **One source per fact.** Prices from `content/plans.json`, numbers from `content/claims.json`, link targets from `lib/links.ts`.

## Stack (do not substitute)

- **Next.js 16** App Router, **TypeScript strict**, pnpm, Biome. Static generation; React Server Components; one client component on the two pages (the currency switch).
- **Vercel**: hosting, Flags SDK with Edge Config, Web Analytics (no cookie). **zod** for data files.
- Conformity tooling (dev only): `playwright`, `pngjs`, `pixelmatch`, `parse5`, `esbuild` (proof script). Plain Node ESM scripts, no build step.
- No database, authentication, CMS, payment, model call, UI kit (Tailwind, shadcn, MUI), animation library, third-party script or embed. Python only for `scripts/contrast.py`.
- Any other dependency needs a line in the Decisions log and a reason.

## Layout

```
app/                 layout.tsx (imports spec.css, nothing else), page.tsx + (site)/main-golden.tsx, team/page.tsx + team-golden.tsx,
                     privacy, terms, legal, app (coming soon), not-found, error; spec.css (GENERATED)
lib/links.ts         CAL_URL, START_FREE, REPO_URL
components/          currency-switch (client), skip-link, theme-toggle, cookie-banner (dormant)
content/             plans.json, claims.json
public/              fonts/, images/ (GENERATED from spec/)
spec/                THE REFERENCE (frozen, hashed): pages.json, markup/, states/, styles/, fonts/, assets/, redlines/, reference/,
                     behaviour.json, copy-overrides.json, seams.json, links.json, thresholds.json, SHA256SUMS, README.md
scripts/             html-to-jsx.mjs (pnpm port), spec-css.mjs, verify-spec.mjs, contrast.py, copy-lint
scripts/conformity/  run.mjs (the gate), compare.mjs, measure.cjs, browser.mjs, build-reference.mjs, golden-site.mjs, serve.mjs,
                     freeze-from-design.mjs, prove-port.mjs, gen-docs.mjs, lib.mjs
prototypes/site-v5/  the V5 design pages with their runtime (read for behaviour, never imported)
docs/                CONFORMITY, UI-SPEC, pages/*.md, GAP-REPORT, gap/ (supplied or generated); INTERFACE, STRATEGY, DESIGN-SYSTEM,
                     tokens.css, ARCH (read-only); LAUNCH, QUALITY, CONFORMITY-LOG (created by tasks)
tests/               Playwright (smoke, redirects, flags), axe, Lighthouse CI config
```

## UI conventions

- For `/` and `/team`, `spec/` and `docs/UI-SPEC.md` are the UI contract (measured). For pages with no design, reuse the V5 patterns listed in `docs/CONFORMITY.md` §6 and the colours of `docs/UI-SPEC.md` §4; `docs/DESIGN-SYSTEM.md` and `docs/tokens.css` govern what V5 does not cover and the dark theme.
- Copy: short, no exclamation marks, "investor-operator", the CTAs "Book time with us" and "Start free", "evidence-graded analysis, not investment advice" in every footer.
- Accessibility: every control keyboard-reachable with a visible focus, contrast ≥ 4.5:1, `prefers-reduced-motion` respected (the design already stops its hero animation), nothing scrolls sideways at 375 px.

## Engineering conventions

- Performance budget: first-load JS ≤ 150 KB gzip per page; Lighthouse mobile ≥ 90 on `/` and `/team`.
- Tests: unit (data, claims, copy lint), Playwright (routes, redirects, flags), axe on every route, the conformity gate. CI under 10 minutes.
- Commit messages: `area: what, why` with the task key, and for page work the conformity summary line.

## Definition of done for any task

Code + tests + `pnpm conformity` green for every page the task touches (last line in the commit message) + the task's `## Done` lines verified + a Decisions-log line if a choice was made + `pnpm copy:lint`, `pnpm spec:verify` and `python scripts/contrast.py` green.
