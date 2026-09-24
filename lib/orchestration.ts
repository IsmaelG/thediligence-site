// Shared data model for the 5 orchestration-visualization protos, so every
// direction draws from the same accurate relationships instead of 5
// hand-drawn, possibly-inconsistent versions of the same graph.
//
// Ground truth (matches lib/content.ts + the public skills repo):
//   Company track:   duediligence (auto-runs marketdd) -> companypeople -> targetpeople
//   Product track:   cohortlab + interviewlog -> productdd -> valuecreation
//   Technical layer: technicaldd chains after duediligence OR productdd
//   Shared utilities: interviewlog feeds evidence into any track,
//                      onbrand restyles any final deliverable

export type Track = "company" | "product" | "technical" | "shared";

export type OrchestrationSkill = {
  slug: string;
  command: string;
  title: string;
  track: Track;
  short: string;
};

export const orchestrationSkills: OrchestrationSkill[] = [
  {
    slug: "duediligence",
    command: "/duediligence",
    title: "Due Diligence",
    track: "company",
    short: "Company brief: financials, strategy, ownership, SWOT, org chart.",
  },
  {
    slug: "marketdd",
    command: "/marketdd",
    title: "Market Due Diligence",
    track: "company",
    short: "Sector deep-dive — runs automatically from duediligence.",
  },
  {
    slug: "companypeople",
    command: "/companypeople",
    title: "Company People",
    track: "company",
    short: "Org chart and a dossier on each decision-maker.",
  },
  {
    slug: "targetpeople",
    command: "/targetpeople",
    title: "Target People",
    track: "company",
    short: "Every realistic route to the named people, ranked.",
  },
  {
    slug: "cohortlab",
    command: "/cohortlab",
    title: "Cohort Lab",
    track: "product",
    short: "Real retention, recomputed from a raw sales export.",
  },
  {
    slug: "productdd",
    command: "/productdd",
    title: "Product Due Diligence",
    track: "product",
    short: "Will the product keep growing, and what breaks at 10x?",
  },
  {
    slug: "valuecreation",
    command: "/valuecreation",
    title: "Value Creation",
    track: "product",
    short: "Sized levers, a 100-day plan, the board ask.",
  },
  {
    slug: "technicaldd",
    command: "/technicaldd",
    title: "Technical Due Diligence",
    track: "technical",
    short: "Vendor claims verified across 6 technical axes.",
  },
  {
    slug: "interviewlog",
    command: "/interviewlog",
    title: "Interview Log",
    track: "shared",
    short: "Call notes and transcripts into a citable source log.",
  },
  {
    slug: "onbrand",
    command: "/onbrand",
    title: "On-Brand",
    track: "shared",
    short: "Re-skins any finished report in the target's own colours.",
  },
];

export type EdgeKind = "sequence" | "auto" | "feeds" | "restyles";

export type OrchestrationEdge = {
  from: string; // slug, or "ACME" for the start
  to: string;
  kind: EdgeKind;
  label?: string;
};

export const START = "ACME";

export const orchestrationEdges: OrchestrationEdge[] = [
  { from: START, to: "duediligence", kind: "sequence", label: "start here" },
  { from: "duediligence", to: "marketdd", kind: "auto", label: "auto, if no recent report" },
  { from: "duediligence", to: "companypeople", kind: "sequence" },
  { from: "companypeople", to: "targetpeople", kind: "sequence" },
  { from: START, to: "cohortlab", kind: "sequence" },
  { from: "cohortlab", to: "productdd", kind: "sequence" },
  { from: "productdd", to: "valuecreation", kind: "sequence" },
  { from: "duediligence", to: "technicaldd", kind: "sequence", label: "once target identified" },
  { from: "productdd", to: "technicaldd", kind: "sequence", label: "once target identified" },
  { from: "interviewlog", to: "duediligence", kind: "feeds" },
  { from: "interviewlog", to: "productdd", kind: "feeds" },
  { from: "onbrand", to: "duediligence", kind: "restyles" },
  { from: "onbrand", to: "productdd", kind: "restyles" },
  { from: "onbrand", to: "technicaldd", kind: "restyles" },
  { from: "onbrand", to: "valuecreation", kind: "restyles" },
];

export function skillBySlug(slug: string): OrchestrationSkill | undefined {
  return orchestrationSkills.find((s) => s.slug === slug);
}
