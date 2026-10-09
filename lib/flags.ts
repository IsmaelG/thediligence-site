/**
 * Feature flags — backed by Vercel Global Config.
 *
 * All flags default to false. Toggle them in the Vercel dashboard →
 * Storage → Global Config → the store connected to this project.
 *
 * In local development (no GLOBAL_CONFIG set) every flag returns false.
 * Behaviour is documented in docs/LAUNCH.md.
 */

import { flag } from "@vercel/flags/next";
import { get } from "@vercel/global-config";

async function readFlag(key: string): Promise<boolean> {
  try {
    return (await get<boolean>(key)) ?? false;
  } catch {
    return false;
  }
}

/** `/app/:path*` proxy to the platform. Off → 404 with maintenance message. */
export const appProxy = flag<boolean>({
  key: "app_proxy",
  defaultValue: false,
  async decide() {
    return readFlag("app_proxy");
  },
});

/** Contact form and early-access form. Off → static copy only. */
export const formsLive = flag<boolean>({
  key: "forms_live",
  defaultValue: false,
  async decide() {
    return readFlag("forms_live");
  },
});

/** "Start free" CTA points to /app. Off → CTA points to early-access form. */
export const platformOpen = flag<boolean>({
  key: "platform_open",
  defaultValue: false,
  async decide() {
    return readFlag("platform_open");
  },
});

/** "Open source / stays free" copy visible. Off → copy hidden (c-stays-free). */
export const repoPublic = flag<boolean>({
  key: "repo_public",
  defaultValue: false,
  async decide() {
    return readFlag("repo_public");
  },
});

/** Partner / reference logos on Landing, Solutions, About. Off → logos hidden. */
export const logosVisible = flag<boolean>({
  key: "logos_visible",
  defaultValue: false,
  async decide() {
    return readFlag("logos_visible");
  },
});

/** Prices shown in plans table. Off → prices hidden ("Talk to the team"). */
export const pricingPublished = flag<boolean>({
  key: "pricing_published",
  defaultValue: false,
  async decide() {
    return readFlag("pricing_published");
  },
});
