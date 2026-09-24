// Shared by proto-viz-f and proto-viz-g: "start from a question, watch the
// real chain light up on the full map." Each journey's steps reference real
// orchestrationSkills slugs (not just command labels) so a map renderer can
// highlight the exact nodes/edges as the user steps through.

export type JourneyStep = {
  slug: string;
  outcome: string;
};

export type Journey = {
  id: string;
  label: string;
  description: string;
  steps: JourneyStep[];
};

export const journeys: Journey[] = [
  {
    id: "name-only",
    label: "Just the company name",
    description: "I need the full picture on ACME before a first call.",
    steps: [
      {
        slug: "duediligence",
        outcome: "ACME Corp — €340M revenue, PE-backed since 2022, new CDO hired from a hyperscaler 6 months ago [B].",
      },
      {
        slug: "marketdd",
        outcome: "Auto-triggered — no recent market report existed. EU payments infra: €12B, 14% CAGR [B].",
      },
      {
        slug: "companypeople",
        outcome: "Exec committee mapped — 6 direct reports; the CDO owns the core platform roadmap.",
      },
      {
        slug: "targetpeople",
        outcome: "3 realistic routes to the CDO ranked — a shared-advisor intro scores highest.",
      },
    ],
  },
  {
    id: "sales-export",
    label: "A raw sales export",
    description: "I want to know if ACME's product actually keeps customers.",
    steps: [
      {
        slug: "cohortlab",
        outcome: "Recomputed from raw rows — Year-2 cohorts retain 71%, up from 54% two years ago.",
      },
      {
        slug: "interviewlog",
        outcome: "4 customer reference calls logged — quotes ready to cite in the memo.",
      },
      {
        slug: "productdd",
        outcome: "Verdict: Invest — retention curve flattens, but pricing hasn't kept pace with expansion.",
      },
      {
        slug: "valuecreation",
        outcome: "3 sized levers identified — repricing alone models to +€8M ARR in year one.",
      },
    ],
  },
  {
    id: "vendor-claim",
    label: "A technical claim to verify",
    description: "ACME says they're \"API-first\" and \"enterprise-grade.\" Prove it.",
    steps: [
      {
        slug: "duediligence",
        outcome: "ACME is already an identified target — the technical layer can chain in.",
      },
      {
        slug: "technicaldd",
        outcome: "6-axis scorecard: documented API, no MCP server yet, 2 axes with zero evidence — capped at Conditional.",
      },
      {
        slug: "onbrand",
        outcome: "The scorecard gets re-skinned in ACME's own colours before it's shared back with them.",
      },
    ],
  },
];
