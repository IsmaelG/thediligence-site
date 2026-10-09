# INTERFACE — the contract between the website and the platform

**Version 1.1 · 9 Oct 2026.** This file is identical in both repositories (`thediligence-site` and `diligence-platform`). Only Ismael changes it: edit one copy, then copy it to the other, and log the change in both Decisions logs. If a SPEC and this file disagree, the SPEC of the workspace you are in wins and you add a line to its Decisions log.

## 1. Topology (default adopted on 8 Oct 2026, to confirm)

| | Website | Platform |
|---|---|---|
| Repository and Intent workspace | `thediligence-site` | `diligence-platform` |
| Vercel project | owns `thediligence.app`, `www.` and `status.` | no custom domain; its `*.vercel.app` URL is for previews |
| Serves | the public pages | the product, under `basePath: '/app'` |
| Reaches the other | rewrites `/app/:path*` to `${PLATFORM_ORIGIN}/app/:path*` | never calls the site |

- One origin, `https://thediligence.app`. The browser sees `/app/...` as part of the same site, so cookies and forms need no CORS.
- Auth.js cookies are scoped to the path `/app`. The site never reads, sets or forwards them.
- `AUTH_URL` of the platform is `https://thediligence.app/app/api/auth`.
- The proxy must be switchable without a rebuild: the site implements it in its request proxy (`proxy.ts` in Next.js 16), reading the flag `app_proxy`, not in a build-time `next.config` rewrite. With the flag off, `/app` shows a branded "coming soon" page and the waitlist form (a signed engagement request of kind `waitlist`; the site stores nothing and uses no third-party form).
- Vercel Deployment Protection is off for the platform deployment the proxy targets (no bypass secret crosses the boundary).
- Alternative if the proxy proves awkward: serve the platform on `app.thediligence.app`. It changes `AUTH_URL`, the rewrite and the links, nothing else in this file.

## 2. DNS ownership

- Site workspace: the apex (A/ALIAS), `www` (redirect to the apex, 301), `status` (CNAME to the status page).
- Platform workspace: the mail records (Resend SPF, DKIM, DMARC and return path, and the MX and merged SPF for the `hello@` mailbox). They are added in the same Vercel DNS zone; neither workspace edits the other's records. The status page vendor and its health feed (`/app/api/health`) are the platform's (`p0-observability`); the site only owns the `status` CNAME and the link.

## 3. Shared secret and environment

| Variable | Where | What |
|---|---|---|
| `PLATFORM_ORIGIN` | site | URL of the platform deployment the proxy targets (production or a preview) |
| `CAL_URL` | site | the Cal.com booking link behind "Book time with us" |
| `DD_SITE_FORMS_SECRET` | both | HMAC secret for signed form posts; defined once as a team-level Shared Environment Variable and linked to both projects |

No other secret crosses the boundary. No API key of any model provider exists in the site project.

## 4. Public request endpoints (platform side, task `p4-demand`)

The browser posts to the **site** (`POST /api/forms/connector` or `/api/forms/engagement`). The site validates, rate-limits per IP, signs and forwards **server to server** to:

- `POST ${PLATFORM_ORIGIN}/app/api/public/connector-requests`
- `POST ${PLATFORM_ORIGIN}/app/api/public/engagement-requests`

Headers: `X-DD-Timestamp` (Unix seconds, accepted within ±300 s) and `X-DD-Signature` = hex HMAC-SHA256 of `timestamp + "." + rawBody` with `DD_SITE_FORMS_SECRET`. Body: JSON, UTF-8, at most 8 KB. No cookie is sent or accepted.

`connector-requests` body: `{ "kind": "model" | "vault", "name": string (1..80), "email"?: string, "source": string (page path, 1..120), "consent": true }`.

`engagement-requests` body: `{ "kind": "book" | "security_review" | "hire" | "waitlist" | "other", "name": string (1..80), "email": string, "company"?: string (..120), "message"?: string (..2000), "source": string, "consent": true }`.

Both: a honeypot field `website` must be absent or empty; `consent` must be `true`; unknown fields are rejected. Responses: `201 {"id": string}`, `400 {"error": code}` (invalid), `401` (bad or stale signature), `429` (rate limit, with `Retry-After`), `503` when the platform flag `public_requests` is off. The platform stores the row, emails the founders for engagement requests and never echoes user text in an error.

The site stores nothing and logs no message body or email. With the site flag `forms_live` off, or on any `503`, the form shows "Preview: this form is not connected yet." and offers the Cal.com link.

## 5. Shared data (copied by hand in v1)

| File | Source of truth | Copy | What it drives |
|---|---|---|---|
| `plans.json` | platform `data/plans.json` | site `content/plans.json` | plan names, limits, prices on the Platform page; prices stay hidden until `published: true` |
| `providers.json` | platform `data/providers.json` (`oauth_status`) | site `content/providers.json` | the provider tags (At launch, Next, Later) and the key wording |
| `stack.ts` | `docs/diligence-map-SPEC.md` §3 | site `lib/stack.ts`, platform `lib/stack.ts` | the eleven stations and the map |

`providers.json` (platform, created by `p2-broker`) holds per provider `oauth_status`, `retention_class`, `checked_at`, `sources`; the site copy keeps only `provider`, `oauth_status` and the editorial `tag`. `plans.json` (platform, seeded in `p0-scaffold`) holds names, limits and prices; the site copy strips Stripe ids and adds `published`. Prices have one switch: the site flag `pricing_published` and `published: true` must both hold. Until a public plans endpoint exists, Ismael copies the files after a change.

## 6. Design system

Both repositories copy `docs/tokens.css` and `docs/DESIGN-SYSTEM.md` unchanged and run `scripts/contrast.py` in CI. A token change is made once (here: the platform workspace's copy is the master), then copied.

## 7. Who ticks what

| Item | Built in | Ticked by Ismael when |
|---|---|---|
| Platform criteria 16 (pages) and 17 (landing) | website | the site's criteria S1 to S7 hold on `thediligence.app`; the mail half of criterion 16 (SPF, DKIM, DMARC) is verified in the platform's `p5-launch` |
| Platform criterion 23 | website | the public skills repository is live and linked |
| Platform tasks `p4-public`, `p4-licence` | website | the lines above are ticked |
| Site criterion S8 (forms) | both | a test form reaches `/admin` → Requests on the platform |

## 8. Launch order

1. Site: `s0` to `s3` (shop window, forms in Preview, Cal.com link). Gate 1 of the 30/60/90 calendar.
2. Platform: Phases 0 to 3 in parallel; the proxy flag `app_proxy` turns on when `/app` serves a login.
3. Site `forms_live` turns on when the platform flag `public_requests` is on and one test request is processed in `/admin`.
4. Site `platform_open` turns on only when the platform's acceptance criteria 1 to 23 hold.
5. After `p4-billing` or a change of a provider's `oauth_status`, Ismael copies `plans.json` or `providers.json` to the site and sets `pricing_published` when prices are confirmed.
