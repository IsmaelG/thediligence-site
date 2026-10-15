/**
 * Canonical link targets — single source of truth (SPEC S8, AGENTS rule 10).
 *
 * CAL_URL  — set via Vercel environment variable; placeholder used in preview.
 * START_FREE — /app (shows coming-soon when platform_open flag is off).
 * REPO_URL — set via Vercel environment variable when repo_public flag is on;
 *            empty string = href="#" (inert) until then.
 */
export const links = {
  CAL_URL:
    process.env.CAL_URL ?? "https://cal.com/thediligence/book",
  START_FREE: "/app",
  REPO_URL: process.env.REPO_URL ?? "#",
} as const;
