# PAGES — content inventory for thediligence.app

**Version 1.0 · 2026-10-09 · s0-docs output.**
Source: `prototypes/site-v3/src/pages/` + partials. Checked against SPEC.md criterion S1 and the copy rules.

---

## Cited-file integrity check

All files cited by SPEC.md are present in the repository:

| File | Status |
|---|---|
| `docs/INTERFACE.md` | ✅ |
| `docs/STRATEGY.md` | ✅ |
| `docs/DESIGN-SYSTEM.md` | ✅ |
| `docs/tokens.css` | ✅ |
| `docs/diligence-map-SPEC.md` | ✅ |
| `docs/ARCH.md` | ✅ |
| `prototypes/site-v3/` | ✅ |
| `scripts/contrast.py` | ⚠️ **Missing** — created by s0-scaffold |

---

## Copy-rule violations found in prototypes

These sentences must **not** appear in the Next.js pages. The replacement wording is in SPEC.md "Copy rules".

| File | Line | Violation | Rule broken |
|---|---|---|---|
| `src/pages/Platform.html` | 57 | "We never collect or store your key, and you can revoke access from your provider at any time." | Forbidden: "never collect or store" |
| `src/pages/Platform.html` | 91 | "We do not collect or store your keys, and you can revoke access whenever you like." | Forbidden: "do not collect or store" |
| `src/pages/Platform.html` | 57 | "through a secure third-party connection" | Forbidden: "third-party connection" |
| `src/pages/Platform.html` | 91 | "through a secure third-party connection" | Forbidden: "third-party connection" |
| `src/pages/Security.html` | 21 | Section heading: "No key to paste. No key near an agent." | Forbidden: "no key to paste" |
| `src/pages/Security.html` | 22 | "You connect your provider through a third party" | Forbidden: "third-party connection" |
| `src/pages/Security.html` | 64 | "We do not collect or store your keys" | Forbidden: "do not collect or store" |
| `src/pages/Solutions.html` | 97 | "We never collect or store your key, and it never reaches an agent." | Forbidden: "never collect or store" |
| `src/pages/Products.html` | 172 | "No key to paste, none to store." | Forbidden: "no key to paste" |
| `src/pages/Method.html` | 124 | `[REPOSITORY LINK AND LICENCE TO ADD]` | Placeholder — replace with flag-gated repo link per s3-licence |
| `src/pages/About.html` | 47 | "The method is open source and stays free." (Principles section, always shown) | Forbidden until `repo_public` flag is on — must be flag-gated |
| `src/pages/Platform.html` | 173 | "Prices are agreed with you, not posted." (plans section small print) | ⚠️ Check: this may be compatible if prices remain `published: false`; preserve wording but hide plan prices per `pricing_published` flag |

**Correct replacement for key sentences** (from SPEC copy rules):
> *Sign in with your provider where the provider allows it, on the provider's own screen. Where it does not, you can paste a key as a last resort. It is encrypted, never visible to agents, and you can delete it in one click.*

---

## Page inventory (all 13 pages of criterion S1)

### 1. Landing — `/`

**Route:** `/` · **Prototype:** `src/pages/Main.html` · **Title:** TheDiligence: diligence built by operator-investors

| # | Section | aria-label | Key content | Data source | CTAs | Status tags |
|---|---|---|---|---|---|---|
| 1 | Hero | Introduction | H1 "Diligence." + "Built by operator-investors, for operator-investors." + lead | — | "Start free" → /app (flag `platform_open`), "Book time with us" → CAL_URL | — |
| 2 | Logos | They trust us | 4 fund logos | — | — | Hidden behind `logos_visible` flag |
| 3 | Agents | Run by skilled agents | H2 "Orchestrated for evidence, not for chat." + flow diagram + 4 pillars | `@@INC:flow@@` | — | — |
| 4 | Memo | Evidence-graded memo | H2 "Every claim graded." + memo-ui illustration | `@@INC:memo-ui@@`, grade legend (A/B/C) | — | — |
| 5 | Evidence | More evidence, a better memo | H2 "The more evidence you add, the better the memo." + evidence slider | `@@INC:evidence-ui@@` | "Run it", "Book time with us" | "Illustrative" caption |
| 6 | Cost | Cost control | (read from Main.html lines 120+) | — | — | — |
| 7 | Map | The method | H2 + subway map of 11 stations | `lib/stack.ts` | — | — |
| 8 | CTA band | Start | Closing band | — | "Start free", "Book time with us" | — |

**Forms:** none (all CTAs are links).

---

### 2. Products — `/products`

**Route:** `/products` · **Prototype:** `src/pages/Products.html` · **Title:** Products | TheDiligence

| # | Section | aria-label | Key content | Data source | CTAs |
|---|---|---|---|---|---|
| 1 | Hero | Products | H1 "One platform, built around the evidence." | — | "Start free", "Book time with us" |
| 2 | Plan | Plan (01) | Plan-and-price details + plan-ui illustration | `@@INC:plan-ui@@` | — |
| 3 | Run | Run (02) | Specialist agents + ui-run illustration | `@@INC:ui-run@@` | — |
| 4 | Memo | Memo (03) | memo-ui + 3 pillars | `@@INC:memo-ui@@` | — |
| 5 | Evidence | Evidence and lineage (04) | ledger-ui + 5 bullets | `@@INC:ledger-ui@@` | — |
| 6 | Vault | Vault (05) | Encrypted vault + vault-ui | `@@INC:vault-ui@@` | "Suggest it" → Platform connectors |
| 7 | Workflow | Agents and people (06) | 8-step ordered flow + 6 cards | — | — |
| 8 | Models | Models (07) | "Your models, connected, not pasted." + provider list | `content/providers.json` | "Ask for it" → Platform connectors |
| 9 | CTA band | Start | "See your first plan in minutes." | — | "Start free", "Book time with us" |

**Copy violations:** section 7 (Models) text. **Subnav:** Plan · Run · Memo · Evidence · Vault · Workflow · Models.

---

### 3. Solutions — `/solutions`

**Route:** `/solutions` · **Prototype:** `src/pages/Solutions.html` · **Title:** Solutions | TheDiligence

| # | Section | aria-label | Key content | Data source | CTAs |
|---|---|---|---|---|---|
| 1 | Hero | Solutions | H1 "Three ways to run a diligence." | — | subnav |
| 2 | Fit | Which fits you | Interactive role-selector → recommendation card | `Solutions.js` | Dynamic per selection |
| 3 | Timeline | Before, at and after the deal | 3-column: Before / At committee / After | — | — |
| 4 | Download | Download the method (Solution 1) | "Read it. Run it yourself." + terminal-style command list | — | "Get the method" → /method#get |
| 5 | Run | Run on the platform (Solution 2) | 3-step onboarding | — | "Start free", "See the products" |
| 6 | Hire | Hire us (Solution 3) | Scope chips + what-you-receive + engagement timeline | — | "Book time with us", "Who we are" |
| 7 | CTA band | Start | "Start where you are." | — | "Start free", "Book time with us" |

**Copy violations:** section 5, step 1 text "We never collect or store your key". **Subnav:** Which fits you · Download · Run · Hire.

---

### 4. Method — `/method`

**Route:** `/method` · **Prototype:** `src/pages/Method.html` · **Title:** The method | TheDiligence

| # | Section | aria-label | Key content | Data source | CTAs |
|---|---|---|---|---|---|
| 1 | Hero | The method | H1 "The method is open." + 3 tags (Open source, Transparent, Free) | — | "Get the method", "Run it on the platform" |
| 2 | Stages | The five stages | 5 scrolling chapters with inline claim examples + live memo sidebar | `Method.js`, `lib/stack.ts` | — |
| 3 | Rules | Evidence rules | "No source, no claim." + 3 bullets + grade table (A/B/C) + source ids + confidence formula | — | — |
| 4 | Skills | The eleven skills | 11 skill cards | `lib/stack.ts` | — |
| 5 | Get | Get the method | "Install it in your own assistant." + 3-step install + **repo block** | — | "Get the method" (download) |
| 6 | CTA band | Next | "Prefer it done for you?" | — | "Start free", "Book time with us" |

**Copy violations:**
- Placeholder `[REPOSITORY LINK AND LICENCE TO ADD]` at section 5 (Get) — replace with flag-gated block per `repo_public`: if off, say "Repository link: coming"; if on, show link and Apache-2.0 licence.
- Hero tags: "Open source" tag must be flag-gated (`repo_public`).

---

### 5. Platform — `/platform`

**Route:** `/platform` · **Prototype:** `src/pages/Platform.html` · **Title:** Platform | TheDiligence

| # | Section | aria-label | Key content | Data source | CTAs |
|---|---|---|---|---|---|
| 1 | Hero | Platform | H1 "Start free. Read your first memo today." | — | "See how it starts" |
| 2 | Get started | Get started | 4-step onboarding stepper + product window illustrations | `Platform.js` | "Talk to the team" |
| 3 | Connectors | Connectors | Model list + vault list + "Ask for another" chips | `content/providers.json` | "Ask" chips → POST /api/forms/connector |
| 4 | Plans | Plans | Free / Pro / Fund plan cards | `content/plans.json` | "Start free" or "Talk to the team" |
| 5 | Compare | Compare plans | Feature comparison table | `content/plans.json` | — |
| 6 | Roadmap | Roadmap | Status-tagged items | — | — |
| 7 | FAQ | Questions | Accordion (models, key wording, data, billing) | — | — |
| 8 | CTA band | Start | Dark closing band | — | "Start free", "Book time with us" |

**Copy violations:**
- Step 2 (connect model) window: "We never collect or store your key" and "through a secure third-party connection".
- Connectors section lead: "We do not collect or store your keys" and "through a secure third-party connection".
- Plans section: prices hidden until `pricing_published` flag + `plans.json` `published: true`.

**Forms:** "Ask for another" chips → `POST /api/forms/connector` (flag `forms_live`). **Subnav:** Get started · Connectors · Plans · Compare · Roadmap · Questions.

---

### 6. Security — `/security`

**Route:** `/security` · **Prototype:** `src/pages/Security.html` · **Title:** Security and compliance | TheDiligence

| # | Section | aria-label | Key content | Data source | CTAs |
|---|---|---|---|---|---|
| 1 | Hero | Security and compliance | H1 "Built for data that cannot leave the building." + 3 tags | — | "Request a security review" → /contact, "Compliance status" |
| 2 | Keys | How keys are protected | Broker diagram + 3 bullets | `@@INC:broker@@` | — |
| 3 | Data | Data classes | 3-class table (Public / Target-confidential / Fund-internal) | `docs/ARCH.md §12` | — |
| 4 | Controls | Controls | 9 control cards with status tags | — | — |
| 5 | Agents | What agents cannot do | 6 "never" items | — | — |
| 6 | Compliance | Compliance status | "We hold no certification today." + table + subprocessors list | `docs/ARCH.md §13e` | — |
| 7 | CTA band | Request a security review | "Bring your questionnaire." | — | "Request a security review", "See the roadmap" |

**Copy violations:**
- Section 2 heading: "No key to paste. No key near an agent." → replace with correct key wording.
- Section 2 body: "You connect your provider through a third party" → replace.
- Control card "Provider connections": "We do not collect or store your keys" → replace.

**Subprocessors:** Vercel, Neon, Resend, Stripe, Sentry, Axiom, PostHog EU, Connection service, User providers.

---

### 7. About — `/about`

**Route:** `/about` · **Prototype:** `src/pages/About.html` · **Title:** About us | TheDiligence

| # | Section | Key content | Notes |
|---|---|---|---|
| 1 | Hero | H1 "Built by operator-investors, for operator-investors." | |
| 2 | In numbers | 40 years, 4 continents, 2 cities, 5 stages | Numbers need entries in `content/claims.json` |
| 3 | Story | H2 "A diligence is only as good as its worst claim." | |
| 4 | Principles | 4 principles: Evidence before opinion, Open by default, You stay in charge, Operators in the room | "Open by default / The method is open source and stays free." must be flag-gated (`repo_public`) |
| 5 | Team | Ismael Ghozael + Mazen Wazni | Photos and bios are placeholders — marked Draft |
| 6 | Logos | They trust us | Hidden behind `logos_visible` flag |
| 7 | CTA band | "Let us look at your next deal together." | |

---

### 8. Insights — `/insights`

**Route:** `/insights` · **Prototype:** `src/pages/Insights.html` · **Title:** Insights | TheDiligence

| # | Section | Key content | Data source |
|---|---|---|---|
| 1 | Hero | H1 "Notes on evidence, cost and the method." | |
| 2 | Featured | One draft note: "Why every claim gets a grade." | `content/insights/*.mdx` |
| 3 | Coming next | 6 planned notes with "Planned" status tags | `content/insights/*.mdx` |
| 4 | CTA band | "Read the method. Or run it." | |

**Note:** Status "Planned" is not in the approved product-status vocabulary (At launch / Next / Later). Prototype uses it for content articles — acceptable for editorial content with `st-plan` class.

---

### 9. Contact — `/contact`

**Route:** `/contact` · **Prototype:** `src/pages/Book.html` · **Title:** Book time | TheDiligence

| # | Section | Key content | Notes |
|---|---|---|---|
| 1 | Hero | H1 "Tell us about the deal. We will take it from there." | |
| 2 | Form | Name, work email, fund/company, topic selector (4 choices), message | `POST /api/forms/engagement` when `forms_live` on; Preview notice + LinkedIn links when off |
| 3 | Aside | What happens next: 3-step list + Security review card | |

**Copy in prototype:** "Preview: this form is not connected yet. Until it is, write to us on LinkedIn." — this is the correct Preview wording.
**CAL_URL:** the "Book time with us" CTA in the nav links to `CAL_URL`; this page is the contact form version for deal inquiries.

---

### 10. Changelog — `/changelog`

**Route:** `/changelog` · **Prototype:** none — simple MDX list.

| Content | Source |
|---|---|
| Changelog entries | `content/changelog/*.mdx` |

Start with one entry: "2026-10-09 — Site launched." Draft until first real entry.

---

### 11. Status — `/status`

**Route:** `/status` · **Prototype:** none — simple redirect/link page.

Links to `status.thediligence.app` (external status page, DNS CNAME owned by platform workspace). Page says: "System status is tracked at [status.thediligence.app](https://status.thediligence.app)."

---

### 12. Privacy — `/privacy`

**Route:** `/privacy` · **Prototype:** none — drafted page.

Marked "Draft: pending legal review". Covers: data classes, retention defaults, providers, DPA on request, no cookie set by the site, Vercel Web Analytics only. No certification without status tag.

---

### 13. Terms — `/terms`

**Route:** `/terms` · **Prototype:** none — drafted page.

Marked "Draft: pending legal review". Must include "evidence-graded analysis, not investment advice". No accuracy percentage, no savings promise.

---

## Redirects needed (criterion S1 + S12)

| From | To | Status |
|---|---|---|
| `/pricing` | `/platform#plans` | 301 |
| `www.thediligence.app/*` | `https://thediligence.app/*` | 301 |
| `the-diligence-stack.vercel.app/*` | `https://thediligence.app/method` | 301, **only after Method page ships** — listed in docs/LAUNCH.md, implemented on the old Vercel project by Ismael |

---

## Data dependencies per page

| Page | lib/stack.ts | content/plans.json | content/providers.json | content/claims.json | content/site.ts |
|---|---|---|---|---|---|
| Landing | Map section | — | — | Numbers in stats | Strings |
| Products | — | — | Provider list | — | — |
| Solutions | — | — | — | — | — |
| Method | Skills grid, map | — | — | — | — |
| Platform | — | Plan cards + compare | Connectors + tags | — | — |
| Security | — | — | — | Subprocessor list | — |
| About | — | — | — | 40 years, 4 continents, 2 cities, 5 stages | — |
| Insights | — | — | — | — | — |

---

## Forms and API routes

| Route | Kind | Flag gate | Destination |
|---|---|---|---|
| `POST /api/forms/connector` | connector-request | `forms_live` | `${PLATFORM_ORIGIN}/app/api/public/connector-requests` |
| `POST /api/forms/engagement` | engagement-request (book, security_review, hire, waitlist, other) | `forms_live` | `${PLATFORM_ORIGIN}/app/api/public/engagement-requests` |

Both: honeypot `website` field, zod validation, HMAC-SHA256 signature (INTERFACE §4), rate limit by Vercel Firewall rule. Preview notice when `forms_live` off.
