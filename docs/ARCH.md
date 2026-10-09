# ARCH — The Diligence Platform (v0 thinking)

> **Copy for the website workspace. Read-only.** This is the platform's architecture, kept here only for the facts the public pages state (plans §10b, providers §3b, security §11b, status tags §12, public site §13e). The `SPEC.md`, `AGENTS.md` and task keys (`p0-…`) it mentions belong to the platform workspace, not to this repository. Do not edit it and do not build what it describes.

> Companion to `specs/diligence-map-SPEC.md`. Input: a company name. Output: the memo pack the Diligence Stack describes, produced by orchestrated agents, deployed on Vercel.

> **Revision 8 Oct 2026 (night).** Added: §10e billing (Stripe Managed Payments through Payment Links), §15 continuous improvement (next iteration, hooks in v1), the domain `thediligence.app` (§13e), the design system (`docs/DESIGN-SYSTEM.md`), and consistency fixes (connections instead of credentials, Auth.js, skill count). Precedence: SPEC.md, then AGENTS.md, then this document. Where this document differs from AGENTS.md (Stack, Layout) or from the SPEC tasks, AGENTS.md and the SPEC win; in particular: Eve in §1 to §4 and §8 (the coordinator is an AI SDK `Agent`), the repository layout of §4, the navigation details of §3c, and the build order of §7.

> **Two workspaces (8 Oct 2026, late night).** The public site (§13e) is built in a separate repository; the platform repository has no public page and runs under `basePath: '/app'`.

> **Revision 8 Oct 2026 (late night).** §3b: a pasted API key is allowed as a last resort, only while no complete sign-in route exists for a provider (Ismael, 23:47); the weekly provider watch (task `p2-providerwatch`) re-checks the routes.

## 1. The shape of the thing

Three layers, deliberately separated:

| Layer | Job | Built with | Why |
|---|---|---|---|
| **Skills** (11 stations on the map) | The *how* of each station. Unchanged SKILL.md files. | Markdown + the scripts they already ship (`build_memo.py`, docx builders) | Already work in Claude Code; the platform must not fork them. |
| **Orchestrator** | Reads the route, spawns specialists in the right order, holds the evidence ledger, pauses at gates, verifies. | Vercel **Workflow DevKit** (`DurableAgent`, steps) + Vercel **Eve** for the agent shell | Durable execution is the hard part: runs last 15–40 min, survive redeploys, need pause/resume for human gates. |
| **Surface** | The UI you pick from the 5 protos. | Next.js 16 + AI SDK UI (streaming), AI Elements | Streams tool-call events from the workflow; same domain as the-diligence-stack. |

## 2. Orchestration model (borrowed from Intent, adapted)

Intent (intentapp.dev, open source at github.com/intent-hq/intent) is the reference. What it actually does, and what we take from it:

| Intent primitive | What it is | Diligence-platform equivalent |
|---|---|---|
| **Spec note** = source of truth: goals, tasks, acceptance criteria, non-goals | One markdown note all agents read | `diligence.spec.md` per run: purpose, route, budget, gates, one TODO key per station, evidence rules as the acceptance criteria |
| **`@@@task` blocks** with `key=`, `dependsOn=`, `conflictsWith=`, `effort=` | Tasks live *inside* the spec as text; dependencies are attributes | Each station is a task block; `dependsOn` comes straight from `feeds` in the stack data object; `effort` = budget per station |
| **Specialists** = name + behaviour prompt + provider + model | Roles (Coordinator, Implementor, Verifier…) are just config | One specialist per skill: behaviour prompt = SKILL.md verbatim; provider/model chosen per station |
| **Providers** are swappable CLI agents (Claude Code, Codex, OpenCode…) | Intent does not run the model itself; it drives an agent CLI | Same: the platform drives a **provider** inside a sandbox. Runner #1 = Claude Agent SDK (the skills are Claude Code skills, so this is the most faithful runner); Codex SDK and a generic AI SDK runner cover OpenAI, Mistral, Gemini… (§3b) |
| **Workspace** = isolated branch + file copy per task | Agents never collide | One Vercel Sandbox per specialist, with the run's shared folder mounted read-only |
| **Verifier** checks against the definition of done | Separate agent, clean context | Verifier reads the spec's evidence rules and the memo; deterministic checks first |
| Agents watch changes and **auto-trigger downstream tasks** | Event-driven, no manual kick | Workflow step completes → dependents start; spec write-back is the event |
| **AGENTS.md / skills/ auto-scanned** as shared context | Repo conventions become context | `AGENTS.md` at repo root holds the evidence rules and citation format once, for every specialist |

Map it 1:1:

- **Coordinator** = one Eve agent. Takes `{company, purpose}`, resolves the route (`first | invest | after | full`), drafts `diligence.spec.md` (targets, budget, gates, TODO keys per station), waits for approval.
- **Specialists** = one **task block per skill** in the spec, executed by a provider (Claude Agent SDK first) with the SKILL.md as its behaviour prompt. Clean context each. Isolation = one **Vercel Sandbox** per specialist (the "git worktree" equivalent): its own filesystem for downloads, CSVs, generated .docx.
- **Living spec** = a Postgres row (Neon) + a rendered markdown view. Specialists write back only the keys they own. This is the hand-off mechanism instead of passing whole documents between agents.
- **Verifier** = last step. Checks every filled key against the evidence rules ([A]/[B]/[C], S-/I-/P- ids, budget), emits warnings and the "data still needed" appendix.
- **Gates** = Workflow `pause()` before `/productdd` verdict and before any outreach (`/targetpeople`). Approval comes from the UI or Slack (Chat SDK).

Dependency graph is data, not code — it is already in the SPEC data model (`feeds`). The orchestrator runs a topological fan-out: stations with no upstream start immediately and the others follow `feeds` (`diligence-map-SPEC.md` §3).

## 3. Stack, with the reason for each choice

| Concern | Choice | Reason |
|---|---|---|
| Language | **TypeScript** everywhere except the existing Python doc builders | Vercel's agent tooling is TS-first; Python scripts run inside the Sandbox, called as tools. |
| Model access | **Credential broker** calling each provider directly through the user's connection, multi-provider (§3b). AI Gateway only for platform-paid calls (managed trial) | No third-party gateway (extra cost); a pasted user key only as a last resort, as ciphertext inside the broker; per-station model routing (Opus for productdd/verdict, Sonnet for research fan-out, cheap model for personapanel loops), cost tracking per run in our own ledger. |
| Durable runs | **Workflow DevKit** | Event-log replay: a 30-min run survives cold starts and deploys; `pause/resume` is native, which is exactly what gates need. |
| Agent shell | **Runner abstraction** (§3b): Claude Agent SDK, Codex SDK, or generic AI SDK `Agent` — all in a Sandbox; **Eve** optional | Intent's lesson: the orchestrator should drive an agent runtime, not be one. The 11 skills are Claude Code skills, so the Agent SDK runs them unchanged (`.claude/skills/` mounted in the sandbox). Eve is the alternative if you want everything in Vercel's stack; keep the DAG in plain Workflow steps so the provider is one file. |
| Isolation / compute | **Vercel Sandbox** | Firecracker microVM per specialist: run `cohortlab` pandas, render docx, browse the product for `personapanel`. |
| Browsing | `agent-browser` in the sandbox, or Claude in Chrome for logged-in product access | personapanel "Use" runs and technicaldd probes need a real browser. |
| Search | Exa or Tavily via a `search` tool | Cheap, citable results with URLs → feeds the S- ledger. |
| State | **Neon Postgres** (runs, spec, ledger, artifacts index) + **Vercel Blob** (docx/pdf/csv) | Ledger needs relational queries ("every claim graded [C]"); files need signed URLs. |
| Streaming to UI | AI SDK `UIMessageStream` from the workflow → `useChat`/custom hooks | Tool-call events become agent cards, spec diffs, memo sections. |
| Human-in-the-loop | UI buttons + optional **Chat SDK** Slack channel | Approve verdict from the phone. |
| Auth | **Auth.js** with Resend (email OTP); Clerk's email-code strategy is the fallback | Private by default; runs are per-fund; no passwords. |
| Scheduling | Vercel Cron → Workflow | "Re-run cohortlab when the founder uploads the 24-month export." |

## 3b. Bring your own model provider (required, multi-model)

> **[rev 2026-10-08, late night] Connect first, paste only as a last resort; no gateway.** Users connect their model accounts through a sign-in, a cloud role or a local runner. When no complete route exists for a provider, a pasted API key is allowed as a last resort (Ismael, 8 Oct 23:47), stored only as ciphertext inside the broker. An OpenRouter-style gateway is rejected (extra cost, Ismael, 8 Oct evening). The mechanism is one `connection` interface with several methods, chosen per provider after checking what each provider allows (tables below, checked 8 Oct 2026) and re-checked every week ("Weekly watch" below). Run tokens and the credential broker stay. Where this section says "BYOK", it means a connection by any of these methods.

Apart from the managed trial and the capped coordinator calls of workspaces with no connection, the platform never pays for model calls, and it is not tied to one vendor. A user connects one or more providers; each station in the spec names the provider and model it runs on; the verifier runs on a different family than the writer by default. With only one provider connected the verifier runs on it and the memo says "same-family check".

**Providers (the launch set is whatever passes the checks below)**

| Provider | Credential behind the connection (a pasted key only as a last resort) | Runner inside the Sandbox | Notes |
|---|---|---|---|
| **Anthropic** | No OAuth for third parties. Cloud role (Bedrock or Vertex) for funds; local runner later; a pasted API key as a last resort (the route for most users at launch) | Claude Agent SDK — loads `.claude/skills/` natively | Most faithful runner: the 11 skills are Claude Code skills |
| **OpenAI / Codex** | "Sign in with ChatGPT" (plan usage), by approval; a pasted key until it is approved | Codex SDK (or Codex CLI, as Intent does) with `AGENTS.md` + skills folder as context | Codex reads `AGENTS.md`; SKILL.md files are passed as instructions |
| **Mistral** | No OAuth found. A pasted API key as a last resort; or through a cloud the user already has (to verify) | Generic runner: AI SDK `Agent` via the broker, skills injected as system context | No native skills loader; the generic runner handles it |
| **Google Gemini**, **xAI**, others | Google OAuth for Gemini (to prototype), a pasted key until then; others on request | Generic runner | Same path as Mistral |
| **Cloud-hosted** (Bedrock, Vertex, Azure Foundry) | A role the user grants us (cross-account or impersonation), no static secret | Same runners, endpoint switched | For funds that buy models through their cloud |
| **Local / OpenCode** (later) | none | OpenCode is model-agnostic and already speaks Mistral, Ollama… | Option for on-prem or air-gapped runs |

**Connection methods per provider (checked 8 Oct 2026)** `[rev 2026-10-08, evening]`

Question from Ismael: what would native OAuth give us, with no OpenRouter-style gateway? Provider by provider:

| Provider | Native OAuth for a third-party product? | What it would give | Limits found | v1 decision |
|---|---|---|---|---|
| **OpenAI** | Yes. "Sign in with ChatGPT" (announced 29 Sep 2026): the scope `chatgpt.tokens.use.direct` lets an app spend the user's ChatGPT plan allowance. Access token 1 h, refresh token 30 days | No key anywhere; the user's plan pays, not a card | Open-source partners and selected commercial partners only (request a client ID, approval); Plus and Pro subscribers only; Responses API with restrictions (`store:false`, `stream:true`, no explicit system message, no hosted MCP connectors, file search or code interpreter); a weekly cap per app and a shared five-hour window, so a long diligence can meet `429 subscription_sharing_usage_limit_exceeded`; OpenAI does not tell the app when a user disconnects | Apply for a client ID now. At launch if approved; until then a pasted key (last resort). The broker pauses the run on a 429 and tells the user |
| **Anthropic (Claude)** | No. As reported, Claude Free, Pro and Max OAuth tokens may not be used in third-party products (documentation update of 19 Feb 2026); developers use an API key from the Console or a cloud provider | Nothing through OAuth | Offering "sign in with your Claude plan" would breach the consumer terms (reports differ on the Agent SDK with Max: treat as not allowed for a hosted product) | No OAuth. Keyless routes: **cloud role** (the user's Bedrock or Vertex account grants us a role, no static secret; to verify per cloud) for funds, and **local runner** (agents run on the user's computer with their own Claude Code login, the Intent model) later. For everyone else, a **pasted key** as a last resort |
| **Google (Gemini)** | Technically yes: OAuth with the scopes `generative-language.retriever` and `cloud-platform` | No key; the user's Google account | The documentation calls it "appropriate for a testing environment"; an external app needs Google's verification of its scopes; the documentation does not say who is billed (a project id travels in the `x-goog-user-project` header: to test) | Prototype before promising: billing project, verification delay. Fallback: a Vertex role, or a pasted key as a last resort |
| **Mistral** | None documented (API keys; SAML SSO for enterprise sign-in) | — | — | No OAuth found. A **pasted key** as a last resort; or through a cloud the user already has (availability to verify). The "ask for it" request stays open |

**The `connection` interface.** `connection.method` is one of `oauth_plan` (OpenAI), `oauth_google` (Gemini), `cloud_role`, `local_runner` (later), `api_key` (last resort), `managed` (the platform-paid trial: AI Gateway with the platform's OIDC token). The broker resolves a run token into a provider call through the method; runners and the spec do not change when a method is added. The runners point at the broker as their API base URL, so the Claude Agent SDK and the Codex SDK work unchanged. A plan-usage connection spends the user's plan allowance, not dollars: the wizard shows tokens and the equivalent list price. A refresh token or, for `api_key`, the pasted key itself are the only secrets kept for a user: encrypted under a KMS data key, scoped to one provider, revocable (a token at the provider; a pasted key by deleting it in Settings), never in a sandbox, a log, a trace or an export, and never returned to the browser after saving. A pasted key is write-only: no API ever returns it.

**Connect first, paste last (decision of 8 Oct 2026, late night).** A pasted key is offered for a provider only while `data/providers.json` gives it an `oauth_status` other than `available` (`available` | `partial` | `pending` | `none`; a partial route such as OpenAI's Plus-and-Pro-only sign-in counts as not available), to workspace owners, behind the flag `key_fallback`. Handling: an HTTPS Route Handler only; a write-only field; never in a URL, log, trace, Sentry or PostHog event (scrubbers on the field name and on the `sk-`, `sk-ant-` and `AIza` patterns); one cheap validation call; AES-256-GCM ciphertext under a per-connection data key wrapped by **AWS KMS**, reached through Vercel OIDC federation so that no static cloud key exists (`connections.secret_ciphertext`, `wrapped_key`, `key_id`, `last4`); revoke destroys the wrapped key (crypto-shredding), so copies in backups become undecryptable; decrypted only inside the broker at call time; revoke, member removal and workspace deletion delete it for good; a rotation reminder at 90 days; the user is advised to create a dedicated key with a spend limit; the broker enforces the run budget. The honest costs: the platform again holds a customer credential (the worst case is a leak of the connections table together with the KMS key, so the data key is rotated weekly and the table is reachable only from the broker); the Terms must say who answers for the use of a key (counsel); public copy must not say "we never store a key". The set that ships at launch is whatever passes the checks above, and the public site's status tags follow.

**Weekly watch (decision of 8 Oct 2026, late night).** The universal path is solved by the last-resort key, not by a gateway or by prepaid credits (still possible later). Each week the platform checks whether a provider's terms or documentation changed and whether a sign-in route became possible (OpenAI's approval of the client id, Gemini verification and billing, Anthropic's terms for third-party products, Mistral): task `p2-providerwatch` (Vercel Cron, a hash of each source page in `provider_watch`, an email to the owner, an `/admin` card). The job never changes `oauth_status` by itself; when a human sets a provider to `available`, the key form closes for new connections and `/admin` lists the workspaces to migrate. Before the platform runs, the same check is done weekly by hand or by a scheduled task (`docs/PROVIDER-WATCH.md`).

Sources checked 8 Oct 2026: OpenAI developer documentation (Sign in with ChatGPT quickstart) and the WorkOS write-up of the plan-usage scope; reports of Anthropic's 19 Feb 2026 consumer-terms update (Winbuzzer, AlternativeTo); Google's Gemini API OAuth quickstart (ai.google.dev); Mistral documentation (API keys).

Two runner types, one interface `[rev: v1 ships the Claude Agent SDK runner for writers and the generic runner for the verifier; multi-model writers in v2]`: `run(station, taskSpec, runToken) → { markdown, json, files[], evidenceRefs[], events[] }` (SPEC `p2-runner`).
- **Native agent runners** (Claude Agent SDK, Codex SDK): tool loop, file system and skills handled by the vendor.
- **Generic runner** (Vercel AI SDK `Agent`, calls routed through the broker): our own tool loop (search, fetch, sandbox, ledger, docx) so any model the broker can reach works. Slightly less capable with the Python scripts in the skills, so cohortlab/onbrand default to a native runner.

Subscription logins, checked 8 Oct 2026 (table above): Anthropic does not allow a Claude plan login in a third-party product; OpenAI opened a plan-usage OAuth on 29 Sep 2026, by approval. Re-check before launch.

**Routing lives in the spec** (Intent's `@@@task` attributes, extended):

```
@@@task key=productdd dependsOn=duediligence,cohortlab,personapanel provider=anthropic model=opus-5-5 effort=high
@@@task key=marketdd  provider=openai    model=gpt-5.2      effort=medium
@@@task key=personapanel provider=mistral model=mistral-large effort=low
@@@task key=verify    provider!=writer                        # cross-family check
```

Defaults per station ship in `lib/stack.ts` (`provider`, `model`, `fallback`); the coordinator overrides from the user's connected providers and budget. If a station's default provider is not connected, the coordinator picks the connected one with the same runner type and says so in the spec.

**Flow**

1. Onboarding: "Connect providers" — one card per vendor and method (approve access on the provider's own screen, grant a cloud role, or pair a local runner), one cheap test call, shows the resolved account/workspace. At least one provider is required to draft a spec.
2. `[rev 2026-10-08, late night]` A connection is a reference per workspace (or user) and provider, the method, an account label and a status. The platform holds a pasted API key only for the `api_key` method, a last resort (§3b). Where a method needs a secret (an OAuth refresh token, or the pasted key), it is stored encrypted under a KMS data key, scoped to that provider and revocable (at the provider for a token; by deletion in Settings for a key); nothing secret is logged, sent to the browser or placed in a sandbox.
3. `[rev]` Per run, the workflow mints a short-lived **run token** (workspace, target, budget, allowed models). The sandbox calls the broker with that token only; the **credential broker** obtains access through the user's connection server-side and enforces the budget. Provider credentials never enter a sandbox.
4. `[rev 2026-10-08, evening]` No third-party gateway and no AI Gateway BYOK for user traffic: the broker calls each provider directly through the user's connection, and does the routing, fallback and per-station cost tracking itself (§9), so the bill lands in the user's own vendor account or plan. The AI Gateway is used only for platform-paid calls (the managed trial).
5. Cost is tracked per provider and rolled up to the spec's `budget:` line; the coordinator stops a run that exceeds it.
6. A run is refused, not degraded, when a required credential fails; revoke = disconnect (delete the connection reference and revoke at the provider or the connection service); in-flight sandboxes finish the current step and stop.

**Why multi-model**: cross-family verification catches vendor-specific blind spots; EU funds can insist on Mistral for data residency; cost tiers per station (cheap model for persona loops, frontier for the verdict); and no single-vendor outage kills a run. Intent's own provider list (Auggie, Claude Code, Codex, OpenCode, Antigravity, Grok…) is the precedent.

**Where it lives**: `db/connections(user, provider, method, connection_ref, label, status, workspace, secret_ciphertext, key_id, last4)` and `db/provider_watch` (task `p2-providerwatch`), `lib/providers/{anthropic,openai,mistral,generic}.ts` behind one `Runner` interface, onboarding route `app/connect`. The Living Spec proto gains a step 0: "Connect providers" before "Draft", and the spec view shows `provider · model` on each task line.

## 3c. Product model: workspaces, targets, artifacts, evidence, lineage

The platform is not "a run". It is a **workspace** (a fund or a solo advisor) holding many **targets** (companies), each target holding an **artifact stack** (outputs) fed by an **evidence ledger** (inputs), with explicit **lineage** between them so a new piece of evidence re-runs exactly what it touches.

### Identity & access

| Need | Decision | Why |
|---|---|---|
| Login | **Email + one-time code** (6 digits, 10-min expiry, single use, rate-limited). No passwords, no social login at v1. | Fund partners won't install anything; email is the identity they already share with LPs. Implemented with Auth.js (Resend provider) or Clerk's email-code strategy on Neon. |
| Context per user | A session binds `user → workspace → last target`; the UI reopens where you left. Model connections and preferences (language, default route) hang off the user. | "Keep my context" = user-scoped state, not browser state. |
| Invites | Workspace owner invites by email; invitee receives a magic link → OTP → lands in the workspace with role `viewer | analyst | owner`. Pending invites are visible and revocable. | One workspace per fund; analysts run targets, partners read memos. |
| Roles | `owner` (billing, providers, invites), `analyst` (create targets, run, drop evidence), `viewer` (read artifacts, comment). | Minimal — three roles cover the IC workflow. |
| Model connections | Per **workspace** by default (§3b), optionally per user. | A fund pays once; an advisor keeps his own. |

### Objects

```
Workspace ──< Member(user, role)
          ──< Connection(provider, method, connection_ref, label, status)
          ──< Target(company, purpose, status, created_by)
                 ──< Evidence(id S-/I-/P-, kind, grade, file|url, excerpt, added_by, added_at, supersedes?)
                 ──< Run(spec, status, cost, started_by)
                 ──< Artifact(station, version, file, verdict?, built_from: {evidence[], artifacts[]}, stale: bool)
                 ──< Comment(on: artifact|evidence, thread)
```

`built_from` is the lineage. It is recorded by the ledger tool at write time — every artifact knows which evidence ids and which upstream artifacts it read. `feeds` in `lib/stack.ts` gives the *static* graph (which station feeds which); `built_from` gives the *actual* graph for this target.

### Artifact stack (outputs) — "accessible easily" `[rev]`

- One page per target shows the stack as the subway map, each station a card: version, verdict chip, grade mix (`A 6 · B 9 · C 3`), stale flag, last built, who triggered it.
- Click → artifact viewer: rendered memo in-page (HTML from the docx), every claim shows its `[grade] S-xx` chip; hover a chip to see the evidence excerpt; click to jump to the ledger entry. Download `.docx / .pdf`, share link (workspace-scoped), version history with diff between versions.
- "Report 1 / 2 / 3" from the stack site are **bundles**: a bundle is a saved selection of artifacts, exported together.
- **Canonical form is Markdown + JSON**; `.docx`/`.pdf` are renders. Export targets: PDF, Google Doc, Notion page, and a note pushed to Affinity/Attio (v1.1).
- Each target carries a **deal stage** (screening · IC · passed · invested), independent of run status.

### Evidence ledger (inputs) — "drop in evidences" `[rev]`

- Same page, right rail or second tab: ledger table `id · kind · grade · source · added by · used by (artifacts)`. Filter by grade, by station, by "unused".
- **Drop zone** accepts files (pdf, docx, xlsx/csv, vtt/srt, png, eml), URLs, or pasted text. On drop: store in Blob, classify kind (`financials | interview | product demo | contract | deck | web`), extract text, propose a grade and an id (`P-07`), and ask one question: "which station(s) does this touch?" with the lineage's suggestion pre-ticked.
- **Email ingestion (v1.1)**: each target gets an address `evidence+<target-slug>@<domain>`; attachments and body become evidence rows, sender must be a workspace member. Built on Resend inbound webhooks → the same ingest function as the drop zone.
- A product demo (recording or live URL) is evidence of kind `demo`; it is what personapanel and technicaldd consume.
- Every evidence row has a **data class**: `public` · `target-confidential` · `fund-internal`. The plan shows which provider will read which class before launch; confidential classes go only to zero-retention providers under DPA.
- **Data requests**: an appendix item → *Request from founder* → email + per-target upload link (no account, expires, member-approved before ingestion) → status `requested · received · ingested` → delta run proposed. Evidence is treated as untrusted input throughout.

### Lineage & invalidation — "a new evidence triggers updates"

1. New evidence `E` is saved with the station tags chosen at drop time.
2. The lineage engine computes the **dirty set**: every artifact whose `built_from.evidence` or station tag intersects `E`, then every artifact downstream of those via `feeds` (transitive closure).
3. Those artifacts are flagged `stale` immediately — the UI shows an amber "stale: 3 artifacts" badge on the target, with the list and *why* (which evidence).
4. The coordinator proposes a **delta run**: only the dirty set, in topological order, with a cost estimate. The user approves (or sets the target to auto-rebuild for grade-A evidence only).
5. Each rebuilt artifact gets a new version; `built_from` is re-recorded; the previous version stays for diff. Nothing is rebuilt that the evidence did not touch.
6. The same path handles a **new product demo**: kind `demo` → touches personapanel + technicaldd → dirty set includes productdd, valuecreation, onbrand.

Lineage is shown in the right panel's Lineage tab (see below) with a plain-words sentence, so the "why is this stale" question answers itself.

### Right panel (context rail) — four tabs, always about the selected thing

Selecting a memo section, a stack card or a ledger row sets the rail's subject.

| Tab | Shows | Why it exists |
|---|---|---|
| **Preview** | The actual document being built for that station (rendered from the .docx/xlsx), not the memo summary. Editable in place while agents run; an edit is saved as a steering note applied on the next rebuild. Open .docx, History. For evidence: the extracted text / first page. | Partners read documents, not logs. Editing where you read keeps the human in the loop without a separate "feedback" form. |
| **Work** | The trace for that station: each tool call (`search · read · compute · decide · gate · write`) with what it read, what it decided and the *why* in one sentence, which evidence ids it produced, model, tokens, cost, wall time. | "Show me the work" — it is how you trust a [A] grade or catch a bad inference. Comes from the runner's event stream, stored per artifact version. |
| **Lineage** | Three columns: *built from* (evidence ids + upstream artifacts) → *this* → *feeds into*. Stale nodes highlighted. Ends with a plain-words sentence: what it read, what goes out of date if that changes. | Answers "why is this stale" and "what will a re-run touch" without reading a graph. |
| **Discuss** `[rev]` | Comments on the selected section: resolve, assign, "ask the agent to address this" (becomes a steering note). | The partner → analyst loop. |

### Planning before launch — "New target" wizard

No run starts without a plan the user has seen. Steps:

1. **Target** — company, website, purpose (picks the route), tick what you already have (deck, revenue export, interviews, product access).
2. **Plan** (coordinator, ~2 s, costs cents) — company lookup [B]; providers check; then:
   - **Sequence of actions**: every station in topological order, "starts immediately / after X", a model picker per station (changing it re-prices live), cost per station from token estimates × the user's provider prices, total `$ · minutes · gates`.
   - **Inputs**, split in three: **already available** (web sources the agents fetch themselves + what you ticked), **great to have** (changes verdict quality — filed accounts, ≥18-month revenue export, interviews, product access; without them the plan says which stations will carry [C] grades), **nice to have** (analyst PDFs, references, pen-test).
   - **What the coordinator found**, in prose, plus a steering-note box.
3. **Launch** or **save the plan and run later** — a saved plan is a target in state `planned`, visible in the left nav; the Run button launches it.

The plan is stored as the first version of `diligence.spec.md` for that target, so the spec view and the wizard are the same object.

### Home, Changes and navigation `[rev]`

- **Home** is an inbox across targets: *Needs you* (gates, stale decisions, data received, open comments), *Running*, *Delivered this week*. It is the landing page after login.
- **Changes** tab per target: a human-readable diff since the reader last looked — verdict moved/held, sections rewritten and because of which evidence, new evidence, cost delta. "Mark reviewed" stores the cursor per user.
- Work is shown **collapsed by default** (one line per running station), expandable, and stays reviewable after the result.
- Stations carry **human labels** first ("Product diligence"), slash names second.
- Each memo section shows a **confidence** (High/Medium/Low from the A/B/C mix); source chips sit behind a *Show sources* toggle.

### Multi-target navigation

- Left panel: workspace name, **targets list** (status dot: idle / running / stale / delivered, purpose, last activity), "+ New target", then workspace items (members, providers, bundles). Collapsible to icons.
- Main area: the selected target's stack page (artifacts) with a segmented control `Stack · Evidence · Runs · People`.
- Right rail: context for the selected item (agent log, evidence detail, lineage).
- Keyboard: `⌘K` to jump to a target or artifact; targets sorted needs-first (SPEC criterion 11), pinned ones on top.
- A target can run while you look at another; running targets show a progress ring in the left panel.

### What this changes elsewhere

- §2: the coordinator now takes `{target, purpose, delta?: artifact[]}`; a full run is just a delta run with everything dirty.
- §5: `sources` becomes `evidence` with `added_by`, `kind`, `supersedes`; `artifacts.built_from` added.
- §4: add `app/(auth)/`, `app/w/[workspace]/t/[target]/{stack,evidence,runs}`, `lib/lineage.ts`, `lib/ingest.ts`, `channels/email.ts`.
- §7 build order: step 1 becomes auth + workspace + target list + evidence drop (no agents yet) — the product is usable as an evidence binder before any agent runs.

## 4. Repository layout

```
diligence-platform/
  app/
    (auth)/login            # email + OTP
    w/[workspace]/
      t/[target]/{stack,evidence,runs,people}
      members, providers, bundles
  agent/                   # Eve
    agent.ts               # coordinator model + options
    instructions.md        # coordinator prompt (route, spec, gates)
    tools/                 # search.ts, fetch.ts, sandbox.ts, ledger.ts, blob.ts
    subagents/
      marketdd/instructions.md   ← SKILL.md, unchanged
      duediligence/…
      …(11)
    channels/http.ts       # POST /run {target, purpose, delta?}
    channels/email.ts      # evidence+<target>@domain → ingest
    channels/slack.ts      # gates via Slack (optional)
  workflows/
    diligence.ts           # DAG runner: fan-out, pause(), verify()
  lib/stack.ts             # the SPEC §3 data object — single source of truth, shared with the map site
  lib/lineage.ts           # dirty-set computation from feeds + built_from
  lib/analytics/events.ts  # typed product events (PostHog)
  lib/otel.ts              # AI SDK telemetry → Axiom
  app/admin/               # platform admin console (§13d)
  lib/ingest.ts            # drop zone + email share one path: store, classify, extract, grade, tag
  db/                      # drizzle schema: workspaces, members, invites, connections, provider_watch, targets, evidence, runs, spec_keys, artifacts, comments
```

`lib/stack.ts` is the same object the subway map renders from. One edit updates the map, the orchestrator's DAG and the UI.

## 5. Evidence model (what makes this different from "an agent that writes a memo")

- `evidence(target_id, id S-/I-/P-, kind, url|file, grade A|B|C, stations[], excerpt, added_by, added_at, supersedes?)`
- `spec_keys(run_id, key, value, station, evidence[])`
- `artifacts(target_id, station, version, file, verdict?, built_from{evidence[], artifacts[]}, stale, built_at, run_id)`
- Every specialist tool that returns text must return `{text, source_ids[]}`; the ledger tool rejects a write with no source unless grade = C.
- Verifier is deterministic first (schema checks), LLM second (reads the memo for unsourced claims).

## 6. Run lifecycle

`DRAFT → APPROVED → RUNNING → WAITING(gate) → VERIFYING → DELIVERED | PARTIAL | FAILED`

Budget and wall-clock caps are workflow inputs; the coordinator stops the run when exceeded and delivers what exists plus the appendix.

## 7. Build order

1. Auth (email OTP) + workspace + invites + target list + evidence drop zone + ledger view. No agents yet: the product is already an evidence binder.
1b. `lib/stack.ts` + `/run` endpoint that only drafts the spec. Ship proto 3's approval screen.
2. Two specialists end-to-end in Sandbox: `duediligence` (text) and `cohortlab` (Python + CSV). Prove docx out to Blob.
3. Workflow DAG with `pause()` at the productdd gate; stream events to the UI.
4. Remaining 9 specialists as folders. Verifier.
5. Lineage engine + stale flags + delta runs.
6. Slack gate, email ingestion, cron re-runs, `onbrand` as post-step.

## 8. Open questions

- Surface: v2 of protos 3 and 5 share one app shell (left target nav, stack/evidence tabs, right rail). Decide which main view is default: spec (3) or memo (5).
- Where product access credentials live for personapanel/technicaldd (per-run vault vs. Chrome session). Model credentials are settled in §3b.
- Eve beta risk: keep the DAG in Workflow steps so a fallback to plain AI SDK `Agent` classes is one file.
- Connections: which of the four providers ship in v1 depends on OpenAI's client-id approval, the Gemini prototype (billing project, Google app verification) and the Bedrock/Vertex role path for Claude and Mistral (§3b table; SPEC Decisions log, 8 Oct evening). Until then a pasted key (last resort) covers Claude and Mistral.
- Prepaid credits for the `managed` method: not needed in v1 now that a pasted key is the last resort (§3b); revisit if partners without any API account turn out to be the majority.

## 9. Economics

### 9a. How a run's cost is derived

The wizard's number is not a guess; it is a formula with four inputs the platform knows before launch:

```
cost(station) = fresh_input × price_in
              + fresh_input × 0.6 × price_cache_write      # prompts are cached once, re-read every turn
              + turns × avg_context × price_cache_read      # the agentic loop re-reads its context each tool call
              + output × price_out
              + searches × price_per_search
```

- `turns`, `avg_context`, `fresh_input`, `output`, `searches` come from a **profile per station**, seeded from the skills' real traces and updated from completed runs (rolling median per station × model; automatic from v1.1 through the cost tuner of §15, by hand from the eval report in v1). After ~20 runs the estimate is within ±20%.
- Prices come from the provider the user connected (the price table is per provider/model, refreshed monthly).
- Sandbox time is added at Vercel's metered rate (negligible, see below).
- The verifier and coordinator are their own line.
- The run shows **estimate vs. actual** afterwards, per station, so the profile self-corrects and the user sees the drift.

### 9b. What a full DD costs in model usage (Oct 2026 list prices, borne by the user)

Assumptions: 11 stations + coordinator/verifier; ~230 tool calls across the run; ~1.5 M input tokens of which ~85% are cache reads; ~370 k output tokens; ~165 web searches. Opus 5.5 $4/$20, Sonnet 5.5 $2/$10, GPT-5.2 ~$4/$16, Mistral Large ~$2/$6 per M in/out; cache reads $0.2/M; searches $10/1000.

| Routing | Full tour (11 stations) | Investment route (7 stations) | Notes |
|---|---|---|---|
| **Economy** — Sonnet 5.5 everywhere | **~$13** | ~$10.50 | Fine for first meetings and screening |
| **Default** — Opus for duediligence / productdd / valuecreation / verifier, GPT-5.2 for market & tech, Mistral for interviews & personas, Sonnet elsewhere | **~$19** | ~$15 | What the wizard proposes |
| **Frontier** — Opus 5.5 everywhere | **~$22** | ~$17.50 | Marginal quality gain is small outside productdd |

> v1 routing is Claude writers only (§12); the GPT and Mistral rows above describe the v2 multi-model routing.

Per station (default routing): productdd $3.5 · duediligence $2.7 · technicaldd $2.7 · marketdd $2.4 · personapanel $1.5 · valuecreation $1.5 · coordinator+verifier $1.5 · companypeople $1.1 · targetpeople $0.6 · interviewlog $0.5 · cohortlab $0.35 · onbrand $0.2.

Delta runs cost only the dirty set: a new revenue export typically re-runs cohortlab → productdd → valuecreation ≈ **$5.50**.

Rule of thumb for a fund: **$15–25 per company, $5 per update**. A human analyst day is 50–100× that; the model bill is not where the money is.

### 9c. What it costs *you* to host the platform — 1,000 DDs / year

Model calls are billed to the users' own provider accounts or plans, so the platform pays only for orchestration, compute, storage, email and search. Vercel Pro rates (iad1, Sep 2026): Sandbox active CPU $0.128/h, provisioned memory $0.0212/GB-h, creations $0.60/M; Fluid compute $0.128/CPU-h + $0.0106/GB-h; Blob ~$0.023/GB-month.

| Line | Driver | Unit cost | Per DD | Per year (1,000 DD + ~500 delta runs) |
|---|---|---|---|---|
| Sandbox compute (11 microVMs, 2 vCPU/4 GB, ~85 min total, 10% CPU) | metered | $0.0256 CPU-h + $0.085 GB-h | $0.16 | **$240** |
| Workflow / Fluid compute (orchestrator mostly waiting on I/O) | metered | ≈ $0.03–0.05 per run | $0.05 | **$75** |
| Blob storage (docx/pdf/xlsx + evidence; ~100 MB per target incl. one demo video), kept 3 years | $0.023/GB-mo | 100 GB growing | — | **$60 → $180 by year 3** |
| Postgres (Neon Launch / Vercel marketplace) | fixed | $19/mo | — | **$230** |
| Web search API (Exa/Tavily, ~165 searches per DD) | $5/1,000 | $0.83 | $0.83 | **$1,000** — or $0 if routed through the user's provider web-search tool, which the default routing does |
| Email (Resend Pro: OTP, invites, inbound evidence) | fixed | $20/mo | — | **$240** |
| Vercel Pro seats (you + 1) | fixed | $20/seat/mo | — | **$480** (includes $40/mo usage credit that absorbs most of the metered lines above) |
| Observability (Vercel Observability Plus or Axiom) | fixed | $10/mo | — | **$120** |
| Auth (Auth.js + Resend, or Clerk free tier < 10 k MAU) | — | $0 | — | **$0** |
| AWS KMS (wrapped data keys for refresh tokens and pasted keys; listed as a subprocessor), domain, Sentry free tier | — | ≈ $0 | — | **~$50** |
| **Total** | | | **≈ $1.1–2.5** | **≈ $1,500 – 2,700 / year** |

So roughly **$2 per DD** all-in, dominated by fixed SaaS seats, not by usage. At 10,000 DD/yr the variable lines scale linearly (~$5k) and the fixed ones barely move; at 100 DD/yr you still pay ~$1,200 of fixed cost. The only line worth engineering away is search: route it through the user's model provider (Anthropic's web search tool is $10/1,000 on their key) and the platform's variable cost drops to ~$0.25 per DD.

Not in the table: your time, and the **managed-keys option** (§10) where the platform fronts model cost and re-bills it — that turns $15–25 per DD into cost of goods and needs a margin.

## 10. Plans, admin, and the vault

### 10a. Workspace admin (owner role)

A settings page per workspace, editable by `owner`:

| Field | What it does downstream |
|---|---|
| **Name, logo** | Memo headers, bundles, emails, the `evidence+<target>@` address |
| **Thesis** (markdown, ~1 page) | Injected into the coordinator's context on every plan and into productdd's scorecard weights: "we back accountant-led distribution" shifts the Moat axis weight, changes the route defaults (e.g. always run personapanel), and shapes the verdict language. Versioned; a thesis change marks all verdicts as *built on thesis v1* without forcing a rebuild |
| **Defaults** | Purpose, model routing, budget cap per DD, memo language (EN/FR) |
| **Members & invites** | Roles, pending invites, removal |
| **Providers** | Workspace-level connections (§3b), per-member override toggle |
| **Plan & billing** | Current plan, usage this week/month, upgrade |
| **Data** | Export everything (zip of .docx/.md/.csv + ledger.json), delete workspace, EU-only sandbox region toggle |

### 10b. Plans (proposal)

Positioning anchors: an analyst-written memo costs €2–5k; AlphaSense/Grata/Harmonic seats run $10–30k/yr; the platform's own cost is ~$2 per DD plus the user's ~$15–25 model bill.

| | **Free** | **Pro** — €149 / month per workspace | **Fund** — €990 / month |
|---|---|---|---|
| DDs | 1 per week | Unlimited | Unlimited |
| Members | 3 | 10 | Unlimited; SSO/SAML (v2) |
| Targets kept | 10 | Unlimited + archive | Unlimited |
| Evidence | Drop zone | + email ingestion (v1.1), 50 GB | + 500 GB, data-room connectors (later) |
| Model access | Connect your own | Connect your own, or **managed keys** at cost + 30% | Connect your own, managed, or cloud-hosted (Bedrock/Vertex) |
| **Vault** (hosted, encrypted in the browser) | ✔ capped (cap to set) | ✔ | ✔ |
| **Obsidian plugin** | — | ✔ | ✔ |
| Thesis | 1 | Versioned | Versioned, per fund strategy |
| Region | US | US or EU sandboxes (v1.1) | EU-only, Mistral-only mode, audit log (v2), DPA |
| Support | Community | Email | Onboarding + Slack |

Why €149: a single partner who runs 2 DDs a week saves a day of analyst time per DD; price sits under a credit-card approval threshold and above "toy". The free tier is 1 DD per week (decision 2026-10-08, was 3), which keeps the cost of an active free workspace low — acceptable as acquisition. Managed keys at +30% covers payment fees, failed runs and a margin while staying below what a fund would pay an intern to copy-paste.

**Prices (proposal, 8 Oct 2026, night; to confirm).** Free €0 · Pro €149 a month or €1,490 a year (two months free) · Fund from €990 a month or €9,900 a year, sales-assisted. Prices are published: in the strategy research, price was the top reason evaluations were rejected (39 %) and no incumbent posts one. Test an annual or lower tier with about ten funds before fixing the Fund price. In v1 Fund is sold by hand as Pro plus onboarding and a DPA; rows tagged v1.1, v2 or later are not built in v1 (SPEC `p4-settings`). Prepaid credit packs for the `managed` method (§3b): proposal €25 and €100, sold as one-time Payment Links at cost + 30 %.

### 10c. The vault: hosted by default, Obsidian plugin from Pro `[rev 2026-10-08, evening]`

> Restores the hosted zero-knowledge vault as the default and keeps the Obsidian connector as an option from Pro (Ismael, 8 Oct 2026, 21:51). It supersedes the earlier revision of the same day, "the Obsidian connector replaces the hosted vault".

What it is: a per-workspace **markdown vault** for the things that must never leave the fund — term sheets, cap tables, partner notes, LP references, your own view of a founder.

**Default: the hosted vault (all plans; Free is capped, cap to set).**
- **Format**: plain `.md` files with `[[wikilinks]]`, folders per target, frontmatter tags. Import an existing Obsidian vault; export is a zip Obsidian opens unchanged. No lock-in is the feature.
- **Encryption**: client-side (zero-knowledge). WebCrypto, Argon2id from a passphrase the owner sets; members get the vault key through their own key-wrapped copy. The server stores ciphertext in Blob and an opaque index; it shows titles only if the owner allows "searchable titles". Recovery = a recovery code shown once. Lose both and the vault is gone; the UI says so plainly.
- **Editor (v1)**: a minimal in-app markdown editor with live preview, folders, wikilinks and backlinks. Graph view, daily notes and templates come in v1.1.
- **Storage/cost**: ciphertext in Blob, ~$0.02/GB-month; negligible.

**Option from Pro: the Obsidian plugin.**
- A workspace has one vault source at a time: `hosted` (default) or `obsidian`. Switching is an export then an import (proposal).
- A small community plugin pairs with the workspace by a one-time code and **pushes only the notes the member marks as shared**, so the platform can never reach into the user's vault and holds no key for it. Obsidian has no first-party cloud API or OAuth; the community REST plugins expose a local port protected by a per-vault key, which we do not use.
- Disconnect from either side revokes the pairing. A note already read into a finished run stays in that run's evidence, dated (proposal).

**Both sources**
- **Agents and the vault**: by default agents read nothing. A note enters a run only when a member marks it "share with agents for this target". For the hosted vault the member's browser decrypts that one note and hands a copy to the target as evidence of class `fund-internal`; the vault itself stays ciphertext. The share is logged in the Work tab; unsharing removes the copy from later runs. This is the line that lets a fund put anything in the vault.
- **Links across the product**: a note can `[[link]]` a target, an evidence id or an artifact; backlinks appear in the Lineage tab as a fourth column, *notes*. A shared note can be evidence (id `P-nn`; the note's hash is kept in its metadata).
- **Other vaults** (Notion, Google Drive, Logseq, Dropbox) are collected as connector requests (§13d) and built in the order they are asked for.

### 10d. Free-tier enforcement

`runs_started` per workspace per rolling 7 days; the wizard shows "0 of 1 this week" and, at the limit, offers "plan now, run Monday" or upgrade. Delta runs and the managed trial DD do not count against the limit. Plans are a `plan` column on the workspace plus a Stripe customer; limits are checked in the workflow's first step so a stale client can't bypass them.

### 10e. Billing: the easiest path `[new 2026-10-08, night]`

Goal: a first paying customer with the least code and no VAT filing. Facts checked on Stripe's pages on 8 Oct 2026 (confirm in the Dashboard before relying on them): Stripe Managed Payments makes Stripe the merchant of record, which collects and files sales tax and VAT; it costs 3.5 % on top of Stripe's card fees; France is a supported business location; software qualifies; it works through Checkout and Payment Links only (subscriptions included) and not with Connect, Elements, third-party tax or invoice items; professional services such as consulting are excluded.

| Step | What | Code? |
|---|---|---|
| 1 | In the Dashboard: Products Pro (monthly, yearly) and Fund (monthly) with the tax code for SaaS business use (`txcd_10103001`; `txcd_10105002` is the AI-service alternative); enable Managed Payments; pass the eligibility review | none |
| 2 | One Payment Link per price. The Upgrade button opens it with `client_reference_id=<workspace_id>` and `prefilled_email`; success URL `/app/settings/plan` | a link builder |
| 3 | Day 1: a founder sets `workspace.plan` in `/admin` when a payment arrives (built in `p4-admin`) | none |
| 4 | From the first recurring customers: `billing_enabled` on; `POST /api/webhooks/stripe` (signature verified, idempotent by event id) handles `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed` | one file (`p4-billing`) |
| 5 | Receipts are Stripe's. Cancellation by the customer portal if Managed Payments allows it (to verify), otherwise by email | none |

Cost: on a €990 payment about €50 of fees against about €27 direct (strategy research, [C], own arithmetic). The gap, about €23 per payment, is the price of not filing VAT; revisit when it exceeds the cost of a VAT service. Polar and Paddle charge 5 % + $0.50 and would add a second provider, so they are not used.

**Team sprints stay outside Managed Payments** (professional services): Payment Links or Invoices on the direct Stripe account (Invoices cost 0.4 %, capped at €2, per the research) or a SEPA transfer, with a deposit and a signed engagement letter. French e-invoicing: every business must be able to receive e-invoices from 1 Sep 2026 and small businesses must issue them through an approved platform from 1 Sep 2027; the accountant confirms.

**Fallback if the eligibility review fails:** Stripe Checkout + Stripe Tax + an OSS VAT registration, with an accountant. Never: card data on our servers, Stripe Elements, a custom checkout.

## 11. Challenge — BMAD review (PM · Architect · Designer/UX)

Each role reviewed §1–10 and returned **decisions**, not questions. Where a decision changes an earlier section, that section has been edited and carries a `[rev]` marker.

### 11a. PM review

**Who is the user, really.** Three people, in this order of priority:

| Persona | Job | How they use it | Device |
|---|---|---|---|
| **The doer** — solo advisor (the author), or the associate/principal in a 2–10 person seed/Series-A fund, or a corp-dev lead | Produce a defensible memo in a day instead of a week; keep it current until the decision | Creates targets, drops evidence, approves gates, edits, exports | Laptop |
| **The reader** — partner / IC member | Decide; challenge the verdict; know what changed since last time | Reads the memo, confidence per section, *Changes*, comments; answers a gate from email | Phone, then laptop |
| **The provider** — founder / CFO of the target | Answer the data request without friction | Receives a request with an upload link; no account | Email + browser |

Larger funds (compliance teams, data rooms, Chinese walls) are *not* the first market: uploads of confidential data to a bring-your-own-model product will be blocked by their security review. They are the Fund tier, later.

**What exists today instead (and why they'd switch).**

| Alternative | What it does well | What it lacks that we have |
|---|---|---|
| Analyst + Notion/Google Docs | Judgement, relationships | Speed, consistency, evidence discipline, cost ($2–5k/memo) |
| ChatGPT / Claude deep research | Fast first pass, cheap | No evidence ledger, no lineage, no gates, no team memory, hallucinated numbers unmarked |
| **Claude Code + these 11 skills on a laptop** (the author's current setup) | Same output quality, free | Single-user, no persistence, no lineage/delta, no partner-facing surface, requires a terminal |
| AlphaSense / PitchBook / Harmonic / Grata / Specter | Data breadth, sourcing | $10–30k/seat; they are *sources*, not the memo; no product/tech diligence |
| Tegus / expert networks | Primary interviews | Expensive; we ingest their transcripts via /interviewlog |
| Affinity / Attio (deal CRM) | Pipeline | No diligence; we should **export into them**, not compete |

The sharpest competitor is the third row. The platform earns its keep only with what a terminal cannot do: **team, persistence, lineage, the provider loop, and a reader surface.** That ordering drives the MVP cut below.

**What we forgot.**

1. **The provider loop** — the "data still needed" appendix is dead text today. Each item becomes an action: *Request from founder* → generates a data-request email + a per-target **upload link** (no account; expires; member-approved before ingestion) → received files land in the ledger → delta run proposed. This closes the loop that makes "keep it current" real. `[rev → §3c]`
2. **Export to where memos actually live** — Google Doc / Notion page / PDF with the evidence appendix, plus a one-line "push to Affinity/Attio note". Without this the memo stays locked in our app and adoption dies at the partner. `[rev → §3c artifacts]`
3. **Comments & review loop** — partners annotate a section, analysts resolve; the `Comment` object existed, the UX did not. `[rev → right panel: Discuss tab]`
4. **"What changed"** — a reader opening a target a week later needs a diff in human terms, not a version number. `[rev → Changes tab]`
5. **Deal stage ≠ run status** — screening / IC / passed / invested lives on the target, separate from idle/running/stale. `[rev → object model]`
6. **Activation** — connect-your-own-only kills first use: most partners have no API console account, and a pasted key is only a last resort for those who have one. Decision: **one trial DD on the platform's own account (`managed`), capped at $20**, then connect a model, buy credits or go Pro. Cost of acquisition ≈ $20 per new workspace.
7. **Legal exposure of two stations** — /companypeople infers personal emails of third parties and /targetpeople writes outreach: GDPR (lawful basis, retention, DSAR) and the ToS of LinkedIn. Decision: both stay **out of v1**; when they return, emails are shown but never stored beyond the run, and outreach is **draft-only** (never sent by the platform). /personapanel "Use" runs on a live product require the user to confirm they hold access rights. `[rev → §12 scope]`
8. **Liability framing** — every memo carries "evidence-graded analysis, not investment advice"; the A/B/C grades and the verifier report are the defence, so they must be visible, not buried.
9. **Metrics that tell us it works** — time to first verdict (target < 60 min from signup), % claims graded A in productdd, delta runs per target (≥ 2 means "kept current"), partner opens per memo, export rate.

**How to protect the data** (PM view; the mechanics are in 11b).

- Three classes, each with its own handling: **public** (web), **target-confidential** (what the founder shared), **fund-internal** (thesis, notes, the vault). Class is set at ingestion and shown on every evidence row.
- Target-confidential and fund-internal data go only to providers with **zero data retention / no training on API traffic**, under a DPA; the user sees which provider will read which class *in the plan*, before launch.
- Retention: evidence and artifacts are deleted when the target is deleted; a workspace export always works; default: kept until the target is deleted, with an optional auto-delete N months after "passed" (off by default); traces 30 days, aggregated metrics 90 days, `audit_log` kept.
- Sharing: links are workspace-scoped and expire; exports are watermarked with workspace + date; the audit log records who opened what.
- Evidence is **untrusted input**: a founder deck can contain instructions to the model. Specialists have no side-effecting tools, and nothing leaves the platform without a human gate.

### 11b. Architect review

**What we forgot, and the fix.**

| Gap | Decision |
|---|---|
| Provider keys injected as env vars into a sandbox that runs model-written code → exfiltration risk under prompt injection | **Credential broker.** The sandbox never holds a provider key. The workflow mints a short-lived **run token** (scoped: workspace, target, budget, allowed models); the sandbox calls the broker with that token; the broker obtains access through the user's connection and enforces the budget. No API key reaches a sandbox; a pasted key, the last resort, lives only as ciphertext in the broker's table (decisions 2026-10-08, evening and late night). |
| Sandbox can reach any host | **Egress allowlist** per station: search API, the target's domains, registries, docs. Everything else blocked. Evidence files are mounted read-only. |
| Artifacts are .docx, so diff / preview / edit / onbrand each need their own parser | **Canonical artifact = Markdown + JSON data** (scorecard, charts, ledger refs). `.docx` and `.pdf` are *renders* produced by the existing builders at the end of the station. Preview, Changes, inline edit, comments and onbrand all operate on the Markdown. Human edits create a new version flagged `human_edited`; the verifier sees the flag. |
| Multi-model doubles the QA surface before we have one working path | **v1 runner = Claude Agent SDK** (skills run verbatim). **Verifier = generic runner on a different provider** — no tools, cheap, cross-family. Multi-model *writers* (Codex, Mistral) arrive in v2 behind the same `Runner` interface. §3b's provider table stands; its rollout is sequenced. |
| No failure semantics | A station fails → its artifact is `failed`, its dependents `blocked`, other branches continue; the run ends `partial` with a clear list. Retries are idempotent: an artifact version is keyed by the hash of its inputs (evidence ids + upstream versions + spec keys + model), so re-running with identical inputs returns the cached version at zero cost. |
| "Live log" with no backing store | **Append-only `run_events`** (JSONL in Blob, indexed in Postgres): tool calls, decisions, costs, gate questions. It is the source for the Work tab, progress, replay, and cost reconciliation. The UI reads it through an SSE endpoint backed by a cursor — no pub/sub infrastructure. |
| One sandbox per station = 11 cold starts | **One sandbox per parallel branch**, started from a **prebuilt snapshot** with the skills, Python deps and docx builders installed. Typical run: 3–4 sandboxes, cold start < 3 s. |
| Multi-tenancy by convention | `workspace_id` on every table, **Postgres RLS** keyed by the session JWT, Blob paths prefixed by workspace, signed URLs ≤ 15 min, an `audit_log` table. |
| Email ingestion is spoofable | Inbound requires DKIM pass **and** sender ∈ members **and** a per-target secret in the address (`evidence+qonto-7f3a@`). Attachments are scanned, then held in *pending* until a member approves them into the ledger. |
| EU residency assumed | **EU mode** = Vercel `fra1` + sandbox EU region + Neon EU + model routing restricted to Bedrock (eu-west), Vertex (europe-west) or Mistral. Anthropic's own API does not guarantee EU residency; the plan says so when EU mode is on. |
| No test strategy for agents | **Recorded runs**: tool outputs captured once per fixture company, replayed in CI; an **eval set of 5 companies** with expected grades and verdict bands; an alarm when estimate-vs-actual cost drifts > 30%. |
| Vault key management hand-waved | Hosted vault keys are **client-side only** (WebCrypto; Argon2id from passphrase; per-member wrapped copies; one-time recovery code). The server stores ciphertext and an opaque index. Members who lose both passphrase and code lose the vault — stated in the UI. With the Obsidian plugin (Pro) the platform holds no vault key at all and receives only the notes a member marks as shared (§10c, restored 2026-10-08 evening). |

**Cost of structure, optimised.** The §9c floor assumed two Pro seats and paid tiers everywhere. With one seat, Neon free tier (0.5 GB covers ~2,000 targets of metadata), Resend free tier (3k emails/month covers 1,000 DD/yr of OTPs and invites), Vercel's $20 usage credit, and search routed through the user's provider, the hosting floor is **≈ $500/year**; the §9c $1.5–2.7k figure is the comfortable, monitored version. The first real step-change is a second engineer's seat, not usage.

**Security posture for v1** (no SOC 2 yet, but defensible): OTP rate-limited and single-use; CSP + no inline scripts in the app; secrets only in the broker (a pasted key as ciphertext); dependency scanning; weekly key rotation for the broker's KMS data key; audit log; a written incident process; DPAs with Anthropic/OpenAI/Mistral/Vercel/Neon/Resend; a data-processing register listing the three data classes. SOC 2 Type I is a Fund-tier prerequisite, budgeted at year 2.

### 11c. Designer / UX review (Intent + LukeW)

What the references say, in one line each. Intent: a **spec as source of truth** with task blocks, a **Changes** panel for review with accept/reject-with-feedback, **inline multiple-choice questions** from agents, a global sidebar grouping workspaces **by status**, and **streamed agent work** that can be muted while it continues in the background. LukeW (2025–26): agent products need **management interfaces, not chat** — start, schedule, scrutinise, steer, stop, share; **show the work as a progress indicator, collapsed by default**, expandable, reviewable after the fact; inboxes and task lists are the familiar patterns that work; and the product's own front-end should be governed by **design tokens + an AGENTS.md** so agent-built UI stays coherent.

Against that, the v3 skin gets these changes:

| # | Change | Why (reference) |
|---|---|---|
| 1 | **Home = inbox** across all targets: *Needs you* (gates, stale decisions, data received, comments), *Running* (one line + progress each), *Delivered this week*. Left nav sorts targets by needs-you first. | LukeW: inbox + task list; Intent: sidebar grouped by status |
| 2 | **Changes tab** per target: human-readable diff since you last looked / since the last IC — verdict moved or held, sections rewritten and *because of which evidence*, new evidence, cost. "Mark reviewed". | Intent's Changes panel, translated from code diffs to memo diffs |
| 3 | **Work, collapsed by default**: one line per station while running ("reading 3 interviews · $0.40"), expandable; after the result, the memo takes the focus and the trace stays one click away in the rail. | LukeW: show the work as progress, then collapse to a summary |
| 4 | **Human labels first**: "Product diligence", "Retention & revenue quality"; `/productdd` is secondary, monospace, for the doer. | Readers are partners, not developers |
| 5 | **Confidence per section** (High / Medium / Low from the A/B/C mix) shown in the heading; source chips hidden behind a **Show sources** toggle, on by default for the doer, off for the reader. | Aggregate then drill; reduce visual weight |
| 6 | **Inline questions** from the coordinator in the plan and in the memo ("Which segment matters most: accountants or SMB owners?") answered with one click; the answer is written to the spec. | Intent's clarifying questions |
| 7 | **Discuss tab** in the right panel: comments on the selected section, resolve, assign, "ask the agent to address this" → steering note. | The partner → analyst loop |
| 8 | **Data requests** as actions from the appendix, with status chips (requested · received · ingested). | 11a item 1 |
| 9 | **Mobile**: the memo is the page; the rail becomes a bottom sheet; gates are answerable from the notification email. | Readers are on phones |
| 10 | **Deal stage** chip on the target header (screening / IC / passed / invested), editable. | 11a item 5 |
| 11 | **Keyboard**: `⌘K` palette (targets, artifacts, evidence, actions), `⌘N` new target, `⌘J` next item that needs you. | Intent's global shortcuts |
| 12 | **Settings** page: workspace name, thesis, defaults, members, plan & usage, vault (hosted by default; Obsidian plugin from Pro). | §10a |
| 13 | **Design tokens + `AGENTS.md`** for the app's own front-end; the five skins already share one token set, make it explicit. | LukeW, Oct 2026 |

## 12. MVP scope (after review)

**In v1**: email OTP · workspace + invites · Home inbox · targets with deal stage · evidence drop zone + ledger (three data classes) · plan wizard · **investment route only** (`marketdd`, `duediligence`, `interviewlog`, `cohortlab`, `personapanel`, `productdd` + verifier) · memo with confidence + sources toggle · Changes · right panel (Preview / Work / Lineage / Discuss) · lineage + stale + delta runs · data requests with upload link · export to PDF, Google Doc, Notion · credential broker and provider connections · one managed trial DD, then connect a model · hosted vault (minimal editor, encrypted in the browser) · Obsidian plugin (Pro; the last item of v1, may slip to v1.1 behind a flag) · connector and engagement requests with an admin queue · Free/Pro plans · Stripe Payment Links checkout behind a flag (§10e) · the improvement hooks (§15.9) · the public skills repository under Apache-2.0.

**v1.1**: `technicaldd`, `valuecreation`, email ingestion, Affinity/Attio push, EU mode, MCP interface (§14), vault graph view, daily notes and templates.

**v2**: multi-model writers, `onbrand`, `investordeck` (not on the map), `companypeople`/`targetpeople` (draft-only, GDPR-reviewed), Fund tier, SOC 2 Type I.

**Next iteration (v1.1 onward, stage by stage)**: the continuous-improvement loop (§15).

Build order stands as §7 with step 1 extended by Home and data classes.

## 13. Operations: observability, analytics, feedback, admin, public site

### 13a. Observability (is the system healthy, is each run correct, what did it cost)

| Layer | Tool | What it captures | Why this one |
|---|---|---|---|
| Traces | **OpenTelemetry via AI SDK telemetry → Axiom** (Vercel marketplace; EU region available; free tier 500 GB/mo) | One trace per run; spans per station, per model call, per tool call; attributes: workspace, target, station, model, tokens, cost, evidence ids written | AI SDK emits OTel natively; Axiom ingests without an agent and is queryable for "all runs where estimate/actual > 1.3" |
| Errors | **Sentry** (free tier) on Next.js + workflow steps | Exceptions, failed steps, source maps | Standard; alerts to email |
| Runtime logs | Vercel logs → Axiom drain | Function and sandbox stdout | One place to search |
| Run ledger | `run_events` (our table) | Business truth: cost per station, gate timings, verifier findings | Observability vendors are not the system of record |
| Uptime | Vercel Checks + a cron ping of `/api/health` (DB, Blob, broker, one provider) | Status page at `status.<domain>` (Instatus free or a static page) | Partners will ask |
| Alerts | Axiom monitors → email/Slack | Run failure rate > 10 % / h; p95 run duration > 45 min; cost drift > 30 %; OTP failure spike; broker refusals | Five alerts, not fifty |

Every log line and span carries `workspace_id`, `target_id`, `run_id` — and **never** evidence content, prompts or keys (data classes §11a). Retention: 30 days traces, 90 days aggregated metrics.

### 13b. Product analytics (what users do)

- **PostHog** (EU cloud, free to 1M events) — product events, funnels, session replay **off by default** (on only for pages without evidence content: public site, settings, onboarding). Vercel Web Analytics for the public site only.
- Events are typed in one file (`lib/analytics/events.ts`) and emitted server-side where possible. Taxonomy (v1):

| Event | Properties |
|---|---|
| `signup_completed` | method=otp, invited:boolean |
| `workspace_created` / `member_invited` / `invite_accepted` | role |
| `provider_connected` | provider, mode=connected\|managed_trial |
| `target_created` | purpose, stage, has_deck, has_export |
| `plan_viewed` / `plan_launched` / `plan_saved` | stations, est_cost, est_minutes, models |
| `run_completed` | type=full\|delta, stations, actual_cost, duration, verdict, grade_mix |
| `gate_answered` | answer, seconds_waiting |
| `evidence_added` | kind, class, grade, source=drop\|email\|request |
| `data_request_sent` / `data_request_received` | item |
| `section_viewed` / `sources_toggled` / `work_opened` / `lineage_opened` | station |
| `comment_added` / `ask_agent` | station |
| `changes_viewed` / `changes_marked_reviewed` | count |
| `memo_exported` | format=pdf\|gdoc\|notion\|affinity |
| `feedback_sent` | kind, page |
| `plan_upgraded` / `plan_downgraded` | from, to |
| `connector_requested` | kind=model\|vault, name, source |
| `engagement_requested` | kind=book\|security_review\|hire\|other, source |
| `vault_created` / `vault_connected` / `vault_note_shared` | source=hosted\|obsidian; target (for a share) |

- Every event carries a `schema_version` (§15.9).
- North-star: **targets kept current** (≥ 2 delta runs). Activation: `run_completed` within 60 min of `signup_completed`. The funnel signup → provider → target → plan → run → export is the one dashboard that matters.

### 13c. Feedback and contact

- **In-app feedback** button in the right rail footer and on every empty state: kind (bug / idea / wrong fact / praise), free text, auto-attached context (route, target id, run id, browser), optional screenshot, and a box, unticked by default, that lets the redacted text be used to improve the product (`consent_to_improve`, §15). Stored in `feedback` table, emailed to the founders via Resend, visible in the admin console with status (new / replied / done).
- **"Wrong fact" on a claim**: hovering a source chip offers *Flag this claim* → feedback of kind `wrong_fact` with station, claim text, evidence id. This is the most valuable feedback the product can collect; it feeds the eval set.
- **Contact**: `/contact` page (public) with the same form + `hello@<domain>` and a Cal.com link for a 20-min call; replies from a shared inbox (Front or Gmail group). Response target: 1 business day.
- **Changelog** page (`/changelog`) and an in-app "what's new" dot — built from a markdown folder.
- NPS: one question after the third delivered memo, PostHog survey.

### 13d. Admin console (platform owners only)

Route `/admin`, gated by `platform_admin` role on the user (separate from workspace roles), 2FA via a second OTP, every action written to `audit_log` with the admin's id.

| Section | Shows | Actions |
|---|---|---|
| **Overview** | MRR, active workspaces (7/30 d), DDs this week, delta runs, cost/DD (est vs actual), provider mix, run failure rate, p95 duration, open feedback | — |
| **Funnel** | signup → provider → target → plan → run → export, by week and by cohort | — |
| **Workspaces** | list with plan, members, targets, runs, spend, last active, trial credit used | change plan, grant trial credit, extend limits, suspend, export data, delete (two-step) |
| **Runs** | all runs with status, cost, duration, stations, verifier findings; drill to `run_events` | retry a failed station, cancel, refund a managed-key run |
| **Costs** | hosting lines (Sandbox, Blob, Postgres, email, search) vs plan; managed-key spend vs re-billed | — |
| **Feedback** | inbox with context, `wrong_fact` items linked to the claim | reply (template → Resend), mark done, promote to eval case |
| **Requests** | connector demand aggregated by name (count; status new · planned · shipped · declined); engagement requests from Book time, security review and hire us (status, owner, notes) | notify requesters when a connector ships; move an engagement new → contacted → scoped → won or lost; every change in `audit_log` |
| **Evals** | the 5-company eval set, last scores per station, drift since last skill change | run evals, pin a skill version |
| **Flags** | feature flags (Vercel Flags SDK): EU mode, multi-model writers, vault, Obsidian plugin, email ingestion, billing, improvement-loop stages | toggle per workspace / per plan |
| **Improvements** (next iteration, §15) | signals, items, proposals with diff, eval delta and verifier verdict, rollouts, loop cost | approve, reject, roll back |
| **Health** | provider status, broker refusals, queue depth, sandbox concurrency, error feed | — |
| **Impersonate** | open a workspace read-only as support | always logged, banner shown, 30-min max |

Built as ordinary Next.js pages over the same Postgres with admin-only RLS policies; charts with the same tokens as the app; no third-party BI in v1 (Metabase is the v2 answer if the founders want ad-hoc SQL).

### 13e. Public site

`[rev 2026-10-08, late night]` The public site is a separate Next.js project in its own Intent workspace (SPEC `thediligence-site`), with the same design tokens, served on the root domain; the platform lives under `/app` and the site project proxies `/app/*` to it (`docs/INTERFACE.md`). This section is the reference for the website workspace; nothing in it is built in the platform repository. Pages: **Landing** (what it is, the subway map from the stack site, "run one diligence free"), **Pricing** (§10b), **About** (who we are: the author's method, the Diligence Stack, the advisory practice; why evidence grades), **Contact**, **Changelog**, **Status**, **Privacy** (data classes, retention, providers, DPA on request), **Terms** ("evidence-graded analysis, not investment advice"), **Security** (one page: broker, sandbox, encryption, what agents can and cannot read). **Domain (8 Oct 2026):** `thediligence.app`, bought through Vercel. The apex is production; `www` redirects to it; the status page is `status.thediligence.app`; mail is sent from the domain through Resend with SPF, DKIM and DMARC. The Method page of this site replaces the explainer at the-diligence-stack.vercel.app, which stays live until that page ships and then redirects (301) to `/method`. Page inventory: SPEC criterion 16 is authoritative; it adds Products, Solutions, Method, Platform and Insights, and Pricing is the plans section of the Platform page.

## 14. Interface for the user's own agents and assistants (MCP) `[new 2026-10-08, v1.1]`

The platform is the place where agents and people work on the same diligence. Today a person reaches it through the app and by email (gates are answered from the notification email). The next channel is an **MCP server**, so the agents and personal assistants a user already runs (Claude, ChatGPT, Instinct and other MCP-capable clients) can take part.

- **Acts as a member.** An MCP client authorises through OAuth as a workspace member, with that member's role. The same RLS applies; every call is written to `audit_log` and `run_events` with the member and the client name.
- **Tools (draft)**: `list_targets`, `get_plan`, `read_memo` (a section or all), `read_ledger`, `add_evidence` (lands as *pending* until a member approves it, like any upload), `list_gates`, `answer_gate` (off by default; a member must enable "my agents may answer gates"), `draft_delta_plan` (drafts a plan and its price; launching still needs a person).
- **Never**: no tool that sends, posts or emails; no tool that spends money without a person's approval; no access to the vault beyond notes already shared for a target.
- **Why v1.1**: email covers the partner on a phone; MCP is for the doer's agents. Instinct publicly describes email, messaging and device connections and no MCP interface (checked 8 Oct 2026), so compatibility must be verified; email stays the fallback.
- **Not to be confused with** the public, read-only discovery MCP server (the method, the skill catalogue and sprint booking; STRATEGY roadmap, days 31–60). It exposes no workspace data.

## 15. Continuous improvement: agents and orchestrators that improve the platform and the site `[new 2026-10-08, night — NEXT ITERATION, NOT v1]`

> **Scope.** v1 builds only the hooks of §15.9 (SPEC criterion 21, task `p4-hooks`). No improvement table, agent or orchestrator exists in v1. This section fixes the design so that turning the loop on later means adding code, not reshaping the platform. Stages and flags are in §15.8.

### 15.1 Principle

The product already follows one rule: agents draft, people decide. The improvement loop applies that rule to the product itself.

```
signals ─▶ triage ─▶ lane agents ─▶ verifier ─▶ [person] ─▶ release (flag, stages) ─▶ measure ─┐
   ▲                                                                                            │
   └────────────────────────────────────────────────────────────────────────────────────────────┘
```

Agents turn raw signal into reviewed change proposals. A person approves anything that matters. Every change ships behind a flag and is measured. Agents never touch the L3 list (§15.5).

### 15.2 Signals: what the loop reads

| Source | What it carries | Where it lives today | Collector (plain code, not an LLM) | Privacy rule |
|---|---|---|---|---|
| **User feedback** | bug / idea / wrong fact / praise, flagged claims, comments with *Ask the agent*, NPS | `feedback`, `comments` | `collect-feedback` | Text redacted; a flagged claim's text is kept only with `consent_to_improve` |
| **User interactions** | funnel drop-offs, abandoned plans, unused sections, `sources_toggled`, ⌘K searches with no result, time to first verdict | PostHog EU events | `collect-usage` | Aggregates; never evidence content |
| **Human edits** | the diff between the agent's text and the `human_edited` version, steering notes, gate answers, sections rewritten | `artifacts`, `run_events` | `collect-edits` | The strongest quality signal (a person fixed it). Text kept only for consenting workspaces; otherwise only the kind and size of the edit |
| **Run quality and cost** | verifier findings, grade mix, `partial` or failed runs, estimate versus actual, retries, p95 duration | `run_events`, Axiom | `collect-runs` | Metadata only |
| **Upstream** | GitHub activity on the skills repository and on adopted skills, SDK and framework releases (Claude Agent SDK, Workflow DevKit, Next.js), provider changes (models, prices, OAuth and terms; in v1 the weekly provider watch of task `p2-providerwatch` already covers OAuth and terms) | GitHub webhooks and releases; changelog pages by cron | `collect-upstream` | Public data |
| **Demand** | `connector_requests` counts, `engagement_requests` topics | tables | `collect-demand` | Minimal fields |
| **Market** (optional) | competitor changelogs and pricing pages | web fetch | `collect-market` | Public data |

Collectors write one normalised row to `signals` (§15.7). Redaction happens in the collector, before any model reads anything.

### 15.3 The agents: one job each

| Agent | Lane | Reads | Produces | Model tier |
|---|---|---|---|---|
| **Triage** | all | new signals | Clusters and dedupes signals into *improvement items*, tags the lane, scores impact × confidence ÷ effort, links the signals | cheap |
| **Skill curator** | skills | upstream diffs, wrong-fact clusters, human-edit patterns, eval failures | A pull request to the **skills repository** (never to `skills/` inside the platform repo, which stays read-only) or a version-pin bump, each with its eval delta | frontier, sandbox |
| **Eval curator** | quality | promoted wrong-fact flags, human edits, failed runs | New eval cases (recorded fixtures), updated expected bands, a drift report | mid |
| **Product improver** | app | friction clusters (funnel, empty states, errors), bug and idea feedback | Small pull requests (copy, defaults, empty states, accessibility); anything larger becomes a proposed `@@@task` block | frontier, sandbox, no production credential |
| **Cost and routing tuner** | economics | estimate versus actual, price-table and provider changes | Updated token profiles and price table (data, not code); routing suggestions per station, backed by evals | mid |
| **Site and content improver** | site | shipped changes, feedback on public pages, status tags versus flags | Copy patches, changelog and Insights drafts, status-tag corrections (a tag may be lowered automatically; raising one is a person's call) | mid |
| **Spec steward** | specs | merged pull requests, decisions made in review, the loop's own approvals | Decision-log lines, patches to SPEC, ARCH and AGENTS, and a recurring coherence check across the document set (the review done by hand on 8 Oct 2026) | mid |
| **Improvement verifier** | gate | every proposal | Independent pass or fail on a **different model family than the proposer**: lane respected, diff small, tests and evals pass, no secret or third-party personal data, licence check on third-party code, security scan | different provider |

### 15.4 The orchestrators

- **Loop orchestrator** (Workflow DevKit, weekly cron plus on demand). Collectors → triage → one agent per lane in parallel, each in its own sandbox from a prebuilt snapshot → verifier → **weekly improvement digest** (an `/admin` page and an email to the founders): top items, proposals with their eval deltas, risks, what shipped, what regressed. Same properties as the diligence workflow: durable, budget cap, a lane may fail without stopping the others, `pause()` at the human gate.
- **Upstream sync orchestrator** (event-driven). A GitHub webhook (`/api/hooks/github`) or a daily poll wakes the skill curator, which replays the eval set on the new skill version and files a proposal with the delta. It never adopts anything by itself. Third-party code is quarantined: pinned by commit SHA, egress denied in the sandbox during evals, scripts diffed line by line, licence scan.
- **Release orchestrator.** Takes an approved proposal, creates its flag, rolls out in stages (founders, then 10 % of workspaces, then everyone) behind a metric guard (error rate, cost drift, activation, wrong-fact rate), rolls back by flipping the flag, and writes the measured outcome back as a signal.
- **Intent as the builder of larger changes.** In stages I1 and I2 the loop does not write big features. It writes proposals to `BACKLOG.md` (task blocks inside a code fence, with a `signal:<id>` reference, so Intent does not build them by accident); a founder pastes one into `SPEC.md` and Intent builds it on the existing path.

### 15.5 Autonomy levels: what an agent may do alone

| Level | What the agent may do | Who approves | Examples |
|---|---|---|---|
| **L0 Observe** | Read, cluster, report | nobody (digest) | Weekly digest, drift report |
| **L1 Propose** | Open a pull request, spec patch, eval case or skill bump | a founder merges | Copy and accessibility fixes, new eval cases, a skill bump whose eval delta is ≥ 0 |
| **L2 Ship small** | Merge by itself behind a flag, canary, auto-rollback | a pre-approved allowlist; reported in the digest after the fact | Typos and copy on public pages (not claims; a status tag may only be lowered, and only when its flag is off), token-profile and price-table updates within ±15 %, patch-level dependency bumps with green CI, changelog entries |
| **L3 Never autonomous** | Propose only | always a person | Auth, billing, RLS, broker, vault and encryption, data classes and retention, plan limits and plan prices, legal pages, security or compliance claims, a status tag going up, the verdict logic and confidence formula, skill content that changes verdicts, anything sent to a user or a third party, any use of customer evidence to train or tune |

Stage defaults: I1 = L0, I2 = L1, I3 = L2 for the allowlist only. L3 does not move.

### 15.6 Guardrails

- **Privacy.** Evidence files and extracted evidence text never enter the loop. Memo text (claims, human edits) enters only if `workspace.improve_product` is on and the item has `consent_to_improve`, redacted, and never when a cited evidence row is `target-confidential` or `fund-internal`. `workspace.improve_product` is off by default. Feedback text is redacted with `lib/otel.ts#redact`. A flagged claim joins an eval set only when its flag carries `consent_to_improve`. Fixtures use public companies or written consent. We never train or fine-tune a model on customer data; with opt-in, redacted feedback may inform changes to prompts, skills and tests (the Security page says so). No customer claim text appears in the pull requests or diffs of the public skills repository; the verifier checks.
- **Untrusted input.** Feedback text, upstream repositories, release notes and competitor pages are data, wrapped as untrusted documents. Loop agents have no side-effecting tool (no email, no deploy, no merge). Each lane has a path allowlist, enforced by the verifier and by CI.
- **Supply chain.** Pin by SHA; quarantine skills that bundle scripts (the strategy research found 26.1 % of 31,132 agent skills with a vulnerability, and 2.12 times the risk when scripts are bundled); licence check; dependency-diff review.
- **Cost.** A monthly cap for the loop (proposal: $200, to set), paid on the platform's own account through the AI Gateway with the OIDC token, never on a user's connection. At the cap the orchestrator stops and says so in the digest.
- **Blast radius.** One lane per pull request, a size cap, every user-facing change behind a flag with per-workspace targeting, staged rollout, one-click rollback, the previous skill version stays selectable.
- **Honesty rules stay.** A public status tag may go down when its flag is off, never up without a person. No claim about security, compliance or accuracy changes without a person. "Illustrative" labels stay.
- **Audit.** Every agent action is written to `audit_log` with `actor_type = agent` and the proposal id; `improvement_runs` makes each digest reproducible.
- **Evaluate before shipping.** No skill bump without the eval set; a drop of more than 5 points on any station blocks it; the verifier checks the other stations' bands, not only the metric the proposer targeted.

### 15.7 Data model (next iteration; additive; `platform_admin` RLS only)

- `signals(id, source, kind, ref, workspace_id?, payload_redacted jsonb, consent bool, created_at)`
- `improvement_items(id, cluster_key, title, lane, impact, confidence, effort, status[new|triaged|proposed|verified|approved|shipped|measured|rejected|duplicate], signal_ids[], created_at)`
- `improvement_proposals(id, item_id, lane, agent, kind[pr|spec_patch|eval_case|skill_bump|copy_patch|data_update|flag_change], ref, eval_delta jsonb, risk[L0..L3], verifier_result jsonb, decided_by, decided_at)`
- `improvement_runs(id, trigger, started_at, ended_at, cost, status, summary)`
- `rollouts(id, proposal_id, flag_key, stage, metric_guard jsonb, outcome[ongoing|kept|rolled_back], measured jsonb)`

`/admin → Improvements`: the digest, the items queue, each proposal with its diff, eval delta and verifier verdict, rollouts, the loop's cost.

### 15.8 Stages, each behind its own flag

| Stage | Turns on | Autonomy | Entry check (proposal, to tune) |
|---|---|---|---|
| **I1 Observe** (from v1.1) | collectors, triage, digest, eval curator (drift report only) | L0 | Hooks of §15.9 verified; 10 consenting workspaces or the founders' own usage |
| **I2 Propose** | skill curator, eval curator (eval cases), cost and routing tuner, product improver, site and content improver, spec steward, verifier, upstream sync | L1 | Digest judged useful for 4 weeks; ≥ 70 % of items useful |
| **I3 Ship small** | release orchestrator, the L2 allowlist | L2 | ≥ 50 % of proposals accepted over 8 weeks, no lane violation, rollback drill passed |

The loop's own metrics: signal-to-ship time, acceptance rate per lane, rollback rate, share of feedback answered within 5 days, loop cost per accepted change. The outcomes it must move: wrong-fact rate per 1,000 claims, eval score trend, time to first verdict, activation, cost drift.

### 15.9 Hooks built in v1 (task `p4-hooks`, criterion 21), so nothing is migrated later

1. Artifacts and `run_events` record `skill_version` (commit SHA of the pinned skills) and `prompt_version` (hash of the coordinator and verifier instructions): a change in quality is attributable.
2. `feedback.consent_to_improve` and `workspace.improve_product` (default off). `pnpm signals:export` writes redacted JSONL for consenting workspaces only: the contract the collectors will use.
3. `audit_log.actor_type` ∈ `user | admin | agent | system`.
4. Every feature outside the v1 scope sits behind a Flags SDK flag with per-workspace targeting (already an AGENTS rule); the loop's own rollouts add flags the same way.
5. The eval harness runs headless: `pnpm eval --json` returns a stable report per station (task `p5-evals`).
6. Typed analytics events carry `schema_version`.
7. `/api/hooks/github`: a signed receiver (HMAC-SHA256) behind the flag `improve_ingest`; it stores raw event metadata and does nothing else.
8. Token profiles and the provider price table are versioned data (`data/token-profiles.json`, `data/prices.json`), not constants, so the cost tuner can propose a data change.
9. The skills live in a separate public repository (Apache-2.0, task `p4-licence`); the platform pins it by commit SHA.
10. The changelog is a markdown folder (exists), so release notes can be drafted.

Not built in v1: the five tables of §15.7, the agents, the orchestrators, the digest.
