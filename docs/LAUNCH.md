# Launch checklist: flags and environment variables

> Owner and team members set these in the Vercel dashboard. Never share or commit values.

---

## Feature flags (Vercel Global Config)

All flags live in a single Global Config store. They are **all off by default**.
Toggle them in the Vercel dashboard → Storage → Global Config → the store connected to this project.

| Flag key | SDK constant | Controls | Gate behaviour when off |
|---|---|---|---|
| `app_proxy` | `FLAGS.appProxy` | `/app/:path*` proxy to the platform | 404 with maintenance message |
| `forms_live` | `FLAGS.formsLive` | Contact form and early-access form | Form hides, static copy only |
| `platform_open` | `FLAGS.platformOpen` | "Start free" CTA points to `/app` | CTA points to early-access form |
| `repo_public` | `FLAGS.repoPublic` | "Open source / stays free" copy visible | Copy hidden (c-stays-free claim) |
| `logos_visible` | `FLAGS.logosVisible` | Partner / reference logos on Solutions and About | Logos hidden |
| `pricing_published` | `FLAGS.pricingPublished` | Prices shown in plans table | Prices hidden ("Talk to the team") |

> **Note:** `pricing_published` is also gated by `content/plans.json#published: true`.
> Both the flag and the JSON value must be true before prices render.

---

## Environment variables

### Required at runtime

| Variable | Scope | Where to set | Notes |
|---|---|---|---|
| `GLOBAL_CONFIG` | All environments | Vercel → Storage → Global Config → Connect | Connection string injected by Vercel after you connect the store |

### Required for forms (when `forms_live = true`)

| Variable | Scope | Where to set | Notes |
|---|---|---|---|
| `DD_SITE_FORMS_SECRET` | Production + Preview | Vercel → Settings → Environment Variables → **Shared** | Used to sign form payloads sent to the platform. HMAC-SHA256. Never expose to the browser. See `docs/INTERFACE.md §4`. |

### Required for the `/app` proxy (when `app_proxy = true`)

| Variable | Scope | Where to set | Notes |
|---|---|---|---|
| `PLATFORM_ORIGIN` | Production + Preview | Vercel → Settings → Environment Variables | Platform base URL, e.g. `https://app.thediligence.app`. No trailing slash. Never expose to the browser. |

### Injected by the Vercel Flags SDK (automatic)

These are provisioned by the Marketplace integration and do **not** need manual entry.

| Variable | Notes |
|---|---|
| `FLAGS_SECRET` | Used by `@vercel/flags` to sign flag overrides |
| `EDGE_CONFIG` / `GLOBAL_CONFIG` | Injected when you connect the Global Config store |

---

## Security rules (must remain in effect after launch)

- **No model-provider key** (no `ANTHROPIC_API_KEY`, `OPENAI_API_KEY`, etc.) in this project.
- **No database URL** in this project.
- **No Stripe key** in this project.
- `DD_SITE_FORMS_SECRET` is the only secret the site ever reads. Set it as a team-level Shared Environment Variable so it applies to all branches.
- Forms store nothing. The site validates, rate-limits, signs and forwards (INTERFACE §4). It logs no message body or email. It sets no cookie.
- The site never reads platform cookies and never calls a platform endpoint from the browser.

---

## S13 gates — must clear before launch

| ID | Copy / claim | Action required |
|---|---|---|
| c-reply-one-day | "We reply within one business day" (Contact page) | Confirm with founders or remove |
| c-no-train | "never train or fine-tune" (Platform, Privacy, Security) | Counsel read required |
| c-stays-free | "open source and stays free" (Method, Solutions) | Gated by `repo_public` flag; counsel read required |

---

## Pre-launch CI checklist

```
pnpm build          # must exit 0 on Vercel
pnpm typecheck      # must exit 0
pnpm lint           # Biome — must exit 0
pnpm copy:lint      # forbidden-phrase scanner — must exit 0
python scripts/contrast.py  # WCAG contrast — must exit 0
```
