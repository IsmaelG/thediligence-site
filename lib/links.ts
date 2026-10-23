/**
 * Canonical link targets — single source of truth (SPEC S8, AGENTS rule 10).
 *
 * CAL_URL      — set via Vercel environment variable; placeholder used in preview.
 * APP_URL      — the product deployment (app.thediligence.app). Set via
 *                NEXT_PUBLIC_APP_URL in Vercel env; fallback keeps previews working.
 * START_FREE   — root of the product: logged-out → /login, logged-in → workspace.
 * REPO_URL     — set via Vercel environment variable when repo_public flag is on;
 *                empty string = href="#" (inert) until then.
 */

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://app.thediligence.app";

export const links = {
  CAL_URL:
    process.env.CAL_URL ?? "https://cal.com/thediligence/book",
  APP_URL,
  START_FREE: APP_URL,
  REPO_URL: process.env.REPO_URL ?? "#",
} as const;
