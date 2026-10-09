# Online presence: Stack, Platform, Team (pointer and open decisions)

Created 2 Oct 2026, updated 8 Oct 2026 (night). Full strategy, evidence grades and sources are in the Claude Doc "Online presence: Stack, Platform, Team" (https://claude.ai/code/artifact/8810930f-136a-4d34-bf77-7226d3d921c2). Five visual prototypes of the Stack page are in the Design artifact "Diligence Stack: five prototypes" (https://claude.ai/artifact/RRrEbQwTpgHCrVejwc5uVJ).

> Where sections differ, the section "Night of 8 Oct 2026" at the end wins. The Site v2 and v3 sections describe the design as it stood on those dates (for example, plans without prices).

## Shape in one paragraph
Three doors, one shared deliverable (the evidence-graded memo): Stack (learn and install, free), Platform (run it, bring your own model, Free / Pro / Fund), Team (fixed-price sprints by industry specialty). One domain with paths /method, /install, /platform, /team, /about, /app. Handoffs are product features: Stack to Platform (run a first company free), Platform to Team (operator review of a section), Team to Platform (sprint delivered as a workspace kept current). Roadmap: Team door and free layer first, Platform door last.

## Decisions (status at 8 Oct 2026, night)
1. **Brand and domain: decided.** `thediligence.app`, bought through Vercel, is the production domain for the landing and the public site; "TheDiligence" is the product name; "The Diligence Stack" remains the name of the method. Open: a trademark search, and attaching the domain to the Vercel project (the Vercel account connected to this workspace listed neither the domain nor a platform project).
2. **Skills licence: decided.** Apache-2.0 for the skills and the method's docs; the adopted tech-due-diligence skill keeps its MIT notice; platform, orchestration, data, templates and brand stay proprietary. Task `s3-licence` of the website SPEC, criterion 23. Counsel to confirm; published versions stay under the licence they were published with.
3. **First sprint offer and prices: proposal below, to confirm.** The questions that still block money or launch are ranked in "Open questions".
4. **Platform checkout: decided.** Stripe Managed Payments through Payment Links; a founder flips the plan by hand on day 1; the webhook is a later switch. Sprints stay outside it. Task `p4-billing`, ARCH §10e.
5. **Sequence: decided.** Team door and free layer first, Platform door last; calendar in "30/60/90, explained".

## Prototype notes
- Five directions: 1 Metro (animated map per diligence-map-SPEC), 2 Route planner (dependency waves), 3 Periodic table (scan and filter), 4 Ask first (goal to route to pack), 5 Dossier (scroll builds an illustrative memo).
- All render from one shared data file (project/stack-data.js) transcribed from diligence-map-SPEC section 3 and 4.1. Skill counts on the live site disagree (9, 10, 11, 12); the prototypes use 11 from the SPEC.
- Run commands in the SPEC are placeholder syntax; the memo in prototype 5 is an illustrative composite, not a real company.

## Homepage versions (8 Oct 2026)
Two full-length homepage versions built from prototype 5 plus the "Inspiration for our website" doc, in the Design artifact "TheDiligence: two homepage versions" (https://claude.ai/artifact/Q9dpkKJy4cmctms7pasFza). Both keep: memo that builds as you scroll, A/B/C evidence grades, the verdict line, named stages. The 11 chapters and run commands are cut: five trunk stages only (Market, Company, Product, Technology, First 100 days). Primary CTA: book time with Ismael and Mazen.
- A, Calm authority (Harvey-like): dark, serif, enterprise buyer first; story is promise, proof, method, hire us, security, cost, team.
- B, Open and bold (Cohere-like): light, colour panels, free method first; story is three doors, method, open commitment, platform and cost, trust, hire and team.
- Shared copy lives in project/site-data.js (name "TheDiligence" is a placeholder). Plan prices are deliberately not shown; cost figures are labelled estimates.
- Open: choose A, B or a blend; logos for the four trusted names (text wordmarks for now), headshots, Mazen's title, booking link, repo link for the method download, final name and domain. Security claims (vault, Europe-only mode, cross-model check) mirror diligence-platform-ARCH and must match what ships.
- Superseded by Site v2 below (the A/B artifact is kept untouched for reference).

## Site v2, multi-page enterprise site (8 Oct 2026)
Replaces the A/B homepages after the feedback "not at the level of Cohere or Harvey". Design artifact "TheDiligence: site v2" (https://claude.ai/artifact/5JyBBPtoCQ3FoSHEhqkUWm), 10 boards on one canvas. Round 3 changes are in "Site v3" below and override the lines here where they differ.

**Goals, in order.** (1) Small investors onboard the platform: "Start free" in nav, hero and every closing band. (2) Larger funds hire Ismael and Mazen: "Book time with us" in nav, hero, "two doors" section and every closing band. (3) Convince an enterprise reviewer: depth pages, honest status tags.

**Main angle.** "Run by skilled agents, orchestrated for evidence": orchestration flow (plan, parallel agents, ledger, independent verifier, human gates) and four pillars.

**Cost.** Reframed as control, no "$15 to 25 per memo" stat: plan priced per agent before launch, re-priced by Economy / Balanced / Frontier, cap, estimate versus actual, delta runs priced ("Plan it. Price it. Then run it."). Plan and memo figures are illustrative, from ARCH section 9.

**Pages.** Home, Products (Plan, Run, Memo, Evidence, Vault, Workflow, Models), Solutions (which fits you, download the method, run it, hire us), Method (open, scroll-built memo, 11 skills), Platform (4-step onboarding, connectors, plans without prices, comparison, roadmap, FAQ), Security (credential broker, data classes, controls with status, what agents can never do, compliance and subprocessors), About, Insights (one draft note, planned titles), Book time (form not connected), Logos (French validation board).

**Honesty rules in the copy.** No certification claimed (SOC 2 Type I shown as Later, budgeted year 2). Every control and plan feature carries At launch / Next / Later, mirroring ARCH section 12 (v1 / v1.1 / v2): several writer models, SSO, audit log, Fund plan = Later; Europe sandboxes, email ingestion, technicaldd, valuecreation, MCP interface = Next; hosted vault and Obsidian plugin = At launch (Ismael, 8 Oct; revised in Site v3.1). Memo, plan and run windows are labelled illustrative. Insights marked Draft or Planned.

**Logos (validated by Ismael, 8 Oct 2026).** Taken from each official site and recoloured to one ink: PayPal = placeholder (PayPal wordmark; the PayPal Ventures page blocked the fetch), Quadrille Capital (site SVG), TomCat (site PNG vectorised; official name "TomCat Ventures"), The Good Ones (tgo.team SVG). PayPal Ventures lockup restored on 8 Oct (evening, see Site v3.1): the PayPal wordmark plus the word "Ventures" in text.

## Site v3, feedback round 3 (8 Oct 2026)
Same artifact (version 6). Ismael's feedback, point by point:

0. **Opening.** Hero is now "Diligence." then "Built by operator-investors, for operator-investors.", with "Run by skilled agents, orchestrated for evidence" as the lead. "Operator-investor" wording used across the site (About, team cards, footer).
1. **Market stage** now reads "A first-principles view of the market, then a sourced deep dive" (site-data, Solutions timeline, Method).
2. **CTA** is "Book time with us" everywhere (no names).
3. **Connection model** (changed on 8 Oct, late night: a pasted key is now a last resort, see "Night of 8 Oct 2026"; this line describes round 3). Models are connected through a third-party authorisation on the provider's own screen. The site sentence "We never collect or store your key" must be reworded before launch. At launch: Claude, OpenAI, Mistral, Gemini. A broker with a short-lived run token remains: agents never hold a credential. Platform page has a Connectors section with "ask for another" chips and a free-text field per category (models, vaults). Security, Products, Platform onboarding, FAQ and the broker diagram were reworded. The ask buttons are a preview: requests are not recorded yet.
4. **[Superseded in Site v3.1] Vault = Obsidian connector (At launch, Pro and Fund).** Notes stay in the user's Obsidian; no key held by us; an agent reads a note only when shared for one target, read logged. "Suggest another vault" on Platform (Notion, Google Drive, Logseq, Dropbox as chips). The earlier encrypted-in-browser vault, "customer-managed key" and "your own encryption key" claims are removed.
5. **Free plan = one diligence a week** (SPEC and ARCH section 10b said 3; both now say 1, decision of 8 Oct). Applied on Home, Platform (card, comparison, FAQ), Solutions.
6. **Workflow = agents and people, one workflow.** Products section rewritten as a step-by-step lane (Agent / You / Team / Your agents) with channels (app, email, MCP). MCP interface for the user's own agents is tagged Next and is a proposal, to confirm. Home pillar "Agents and people, one workflow". Instinct (instinct.com, an invite-only personal assistant reached by text, call and email) is named on Products as an example of an assistant that can take part through MCP; Instinct documents no MCP interface publicly, so compatibility is unverified.
7. **Evidence raises accuracy.** New Home section "The more evidence you add, the better the memo": toggle four layers (data room, loyal-customer interviews, churned-customer interviews, competitors' founders and teams) and watch an illustrative 60-claim A/B/C mix and the confidence label move (rule from the memo: (A + half of B) / all, High at 0.7, Medium at 0.45). Labelled illustrative, not measured accuracy. CTAs "Run it" and "Book time with us". Interviews also strengthened on Products (Evidence) and Solutions (hire us).

**Decisions taken (8 Oct 2026, evening).** Obsidian connector at launch (superseded in Site v3.1: hosted vault by default, Obsidian plugin from Pro). Free plan = 1 diligence a week and the specs are changed (SPEC, ARCH, AGENTS). Logos validated. Instinct = personal assistant (instinct.com). Connector requests and engagement requests ("orders") are recorded and processed in the back-office: SPEC criteria 19 and 20, task p4-demand, ARCH section 13d. The canvas overview crop (Home and Products frames capped at 8000 px) is cosmetic: the pages themselves are complete.

**Open items for Ismael.**
1. Repository link for the open method (licence decided 8 Oct, night: Apache-2.0; placeholder still on /Method until the repository is public).
2. Booking: the form is a preview, not wired; the connector request forms too (spec: tables and /admin queues). "Reply within one business day" and "we answer your questionnaire in writing" are commitments to confirm.
3. Platform "Start free" target URL (currently the onboarding section of the Platform page).
4. About: photos, bios, Mazen's role; the story paragraph is a draft for your edit.
5. Check every Security and Platform status against what ships; launch limits for plans.
6. Final name and domain: decided 8 Oct, night (`thediligence.app`); trademark search pending.
7. Insights: first real note.
8. **Connection mechanism.** (A) gateway rejected (extra cost). Native OAuth checked per provider, see Site v3.1: the public site still shows four providers "At launch", to review once OpenAI's approval and the Gemini prototype are known.
9. Keep or drop the managed trial diligence (capped at $20) now that Free is one a week.
10. Whether the MCP interface (ARCH section 14, v1.1) is named on the roadmap as is.

## Site v3.1 (8 Oct 2026, evening)
Same artifact, after Ismael's message of 21:51.

- **PayPal Ventures** is back on Home and About: the PayPal wordmark followed by "Ventures" in text, same ink. It is a lockup composed here, not the fund's own file (its page blocks the fetch); marked "to confirm" on the Logos board.
- **Vault.** Hosted by us and encrypted in the browser by default (zero-knowledge; "At launch"), with an Obsidian plugin as an option from Pro ("At launch"). Changed on Home, Products, Platform (connectors, plans, comparison, roadmap), Security (data classes, controls) and Solutions. Free gets the hosted vault, capped (my reading of "by default": cap to set).
- **OAuth, what native would give** (checked 8 Oct 2026, details in ARCH section 3b). OpenAI: "Sign in with ChatGPT" plan usage exists since 29 Sep 2026, by approval, Plus and Pro only, with API restrictions and plan limits. Gemini: OAuth possible, documented for testing, billing to confirm. Claude: none (consumer OAuth tokens barred in third-party products); a cloud role or a local runner instead. Mistral: none documented. No OpenRouter-style gateway.
- **Specs changed**: SPEC (criteria 3 and 18, decisions log, tasks p2-broker, p4-vault, new p4-obsidian), ARCH (sections 3, 3b, 8, 9c, 10b, 10c, 11b, 12, 13b, 13d), AGENTS (stack, rules 5 and 12, flags). A consolidated brief for Intentapp.dev is in `specs/diligence-platform-IMPLEMENTATION-BRIEF.md`.
- **Open**: the four providers are still tagged "At launch" on the site while only some have a verified keyless path; whether Free gets the hosted vault; the Free cap; whether the Obsidian plugin stays in v1.

## Night of 8 Oct 2026: decisions in detail

### Prices (proposals marked [C]; test with about ten funds)
**Platform** (ARCH §10b, §10e): Free €0 (one diligence per rolling 7 days) · Pro €149 a month or €1,490 a year · Fund from €990 a month or €9,900 a year, sales-assisted · prepaid credit packs €25 and €100: not needed in v1 now that a pasted key is the last resort, a later convenience. Publish them: price was the first reason evaluations were rejected in the research (39 %), and no incumbent posts one.

**Team sprints** [C]. The research shows the shape (a posted "from" price, a duration, a credit from the screen into the full sprint, a scoping-call button); peers post from €8,000 (Wavect), $10K to $30K tiered by client ARR (FletchPMM), £4,500 to £15,000 (Rocking Tech), $25K to $40K (AKF). Proposal:

| Offer | Duration | From (proposal) | Notes |
|---|---|---|---|
| Screen | about 1 week | €2,500 | Graded first-meeting pack; credited in full against a Full sprint within 30 days |
| Full | 2 to 3 weeks | €9,000 (deal up to €5M) · €15,000 (€5M to €20M) · €25,000 (above €20M) | Company, market, product and technical memos; a named operator signs off |
| After the deal | 100-day plan | €6,000 | The plan and the board asks |
| Retainer | monthly | from €2,500 | The workspace kept current by delta runs |

Expert calls are passed through at cost plus a flat fee. Tier by deal size because the founders are the bottleneck. These numbers are my estimates, not market data: one sprint page with "from €X" will teach more than any spreadsheet.

### 30/60/90, explained
Three bands of about a month each. The logic: sell first what needs no platform (the free layer and the sprints, which need only the skills, a sample memo and a booking page), while Intent builds the platform in parallel; open the Platform door last, when its acceptance criteria hold. Dates run from 9 Oct 2026; gates are proposals, their numbers [C].

| Band | Goal | What ships | Gate |
|---|---|---|---|
| **Days 1 to 30** (to 7 Nov) | Shop window | `thediligence.app` live with the public pages of SPEC criterion 16 ("Start free" leads to a Preview waitlist); Book time through a Cal.com link; skills repository public under Apache-2.0 with a one-command install; one teardown of a public company as the sample memo. Two Intent workspaces run in parallel: the website workspace builds the shop window (its tasks `s0` to `s3`), the platform workspace builds Phase 0 and Phase 1 (`p4-public` and `p4-licence` are delegated to the website) | Gate 1: the public pages and the booking link work; repository public |
| **Days 31 to 60** (to 7 Dec) | First paid work | Team page with "from" prices; three teardowns; the public read-only MCP server (method, skill catalogue, sprint booking; a small separate project, no task in the platform SPEC) and directory listings, each with a kill rule; first sprints sold by Payment Link or invoice. Platform: Phases 1 to 3, private alpha with 5 to 10 invited funds | Gate 2: at least 3 scoping calls booked and 1 sprint sold (numbers [C]); each listing kept or dropped; one real diligence run end to end by an invited fund |
| **Days 61 to 90** (to 6 Jan 2027) | Platform door | Public Free and Pro; Payment Links live (`p4-billing`); the quality and security passes | Gate 3: acceptance criteria 1 to 23 hold; first paying workspace, or the reason there is none |

### Open questions, ranked
**Before the first euro or the first public launch**
1. **The universal connection path: decided (8 Oct, 23:47).** A pasted key is allowed as a last resort, with a weekly check of the providers' sign-in routes (platform SPEC task `p2-providerwatch`). Prepaid credits are not needed in v1. Remaining: reword the site's key sentences before launch (website SPEC, copy rules).
2. **Entity, VAT status and accountant.** A Stripe account, invoices and French e-invoicing depend on the legal form. Acknowledged by Ismael on 8 Oct; to settle before the first euro.
3. **Outside-activity terms of your operating role,** before pricing paid work. Not a problem for now (8 Oct).
4. **Named operators** for the sprints (Mazen's role, a second operator) and the two or three specialties you can prove; label the rest "know-how, not track record". Not a problem for now (8 Oct).
5. **Logo consent** of the four funds, the exact name "TomCat Ventures", the PayPal lockup. OK on 8 Oct; consent is still to be collected before the row ships.
6. **Trademark search** for "TheDiligence" now that the domain is bought. Launched in parallel by Ismael on 8 Oct; result pending.
7. **Counsel read of the site** before launch (AI Act Article 50, GDPR). Launched in parallel by Ismael on 8 Oct; result pending.

**Can wait:** whether the public repository includes `investordeck` (a skill that is not on the map); Free vault cap; Obsidian plugin in v1 or v1.1; keep the $20 trial; the providers' tags; the public repository link; the Fund price test; photos and bios; the first Insights note.

### Documents added or changed on 8 Oct, night
`diligence-platform-SPEC.md` v1.3 (criteria 21 to 23, tasks `p0-docs`, `p2-providerwatch`, `p4-licence`, `p4-billing`, `p4-hooks`; `p4-public` and `p4-licence` delegated) · `thediligence-site-SPEC.md` and `-AGENTS.md` (new: the website workspace) · `-INTERFACE.md` and `-PROVIDER-WATCH.md` (new) · `-ARCH.md` (§10e billing, §15 continuous improvement) · `-AGENTS.md` · `-DESIGN-SYSTEM.md` and `-DESIGN-TOKENS.css` (new) · `-SPEC-DIFF.md` (new) · `-IMPLEMENTATION-BRIEF.md`.
