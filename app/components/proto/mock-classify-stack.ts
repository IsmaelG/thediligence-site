// Proto-only stand-in for a real classifier. A real build would send the
// query + the 3 stacks' question/tagline to a small model via Vercel AI
// Gateway and get the slug back — this is a plain keyword-score heuristic
// so the interaction can be evaluated before committing to that build.

type Match = { slug: string; reason: string };

const SIGNALS: Record<string, { keywords: string[]; reason: string }> = {
  "company-diligence-stack": {
    keywords: [
      "company", "meeting", "board", "term sheet", "who", "talk to",
      "ownership", "owner", "competitor", "swot", "strategy", "acquisition",
      "customer wins", "leadership team",
    ],
    reason: "That's a company-level question — who runs it, who to talk to, is it a good company.",
  },
  "product-diligence-stack": {
    keywords: [
      "product", "growing", "growth", "retention", "cohort", "churn",
      "market size", "10x", "scale", "pricing", "nrr", "grr", "customers stay",
    ],
    reason: "That's about whether the product keeps growing — exactly what Product Diligence Stack answers.",
  },
  "technical-diligence-stack": {
    keywords: [
      "technical", "technology", "api", "architecture", "security",
      "compliance", "integration", "uptime", "sla", "engineering", "code",
      "vendor", "gdpr", "mfa", "latency", "monolith", "dependencies",
    ],
    reason: "That's a technical claim to verify — APIs, architecture, security — what Technical Diligence Stack checks.",
  },
};

export function mockClassifyStack(query: string): Match | null {
  const q = query.toLowerCase();
  let best: { slug: string; score: number; reason: string } | null = null;

  for (const [slug, { keywords, reason }] of Object.entries(SIGNALS)) {
    const score = keywords.filter((k) => q.includes(k)).length;
    if (score > 0 && (!best || score > best.score)) {
      best = { slug, score, reason };
    }
  }

  return best ? { slug: best.slug, reason: best.reason } : null;
}
