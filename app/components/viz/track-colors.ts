import type { Track } from "@/lib/orchestration";

// Reuses the site's existing evidence-mark palette (--mark-a/b/c) for
// track colors instead of introducing new colors — company = green,
// product = amber (the site accent), technical = red-orange, shared
// utilities stay neutral since they touch every track.
export const trackColor: Record<Track, string> = {
  company: "var(--mark-a)",
  product: "var(--mark-b)",
  technical: "var(--mark-c)",
  shared: "var(--muted)",
};

export const trackLabel: Record<Track, string> = {
  company: "Company track",
  product: "Product track",
  technical: "Technical layer",
  shared: "Shared utility",
};
