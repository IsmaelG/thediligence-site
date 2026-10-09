// Strings shared across multiple pages.
// Source: prototypes/site-v3/preview/site-data.js

export const SITE_NAME = "TheDiligence";
export const SITE_DOMAIN = "thediligence.app";
export const SITE_DESCRIPTION =
  "Diligence built by operator-investors, for operator-investors. Evidence-graded analysis for every deal.";

// CTA labels — fixed across the site (SPEC.md "Always say")
export const CTA_PRIMARY = "Start free";
export const CTA_SECONDARY = "Book time with us";
export const DISCLAIMER =
  "Evidence-graded analysis, not investment advice.";

// Status tags — only these three (AGENTS.md "UI conventions")
export const STATUS = {
  live: "At launch",
  next: "Next",
  later: "Later",
} as const;

// Evidence grades (AGENTS.md "UI conventions")
export const GRADE = {
  a: "A",
  b: "B",
  c: "C",
} as const;

// Founders
export const FOUNDERS = [
  {
    id: "ismael",
    name: "Ismael Ghozael",
    initials: "IG",
    role: "Operator-investor",
    bio: "Advisor to funds. Writes the method and builds the platform.",
    linkedin: "https://www.linkedin.com/in/ismaelghozael/",
    photoPlaceholder: true,
  },
  {
    id: "mazen",
    name: "Mazen Wazni",
    initials: "MW",
    role: "Operator-investor",
    bio: null, // Draft: to add
    linkedin: "https://www.linkedin.com/in/mazenwazni/",
    photoPlaceholder: true,
  },
] as const;

// Feature flags (server-side names, read via @vercel/flags)
export const FLAGS = {
  appProxy: "app_proxy",
  formsLive: "forms_live",
  platformOpen: "platform_open",
  repoPublic: "repo_public",
  logosVisible: "logos_visible",
  pricingPublished: "pricing_published",
} as const;

export type FlagKey = (typeof FLAGS)[keyof typeof FLAGS];
