import { orchestrationSkills } from "@/lib/orchestration";
import { trackColor, trackLabel } from "./track-colors";

// Proto B — a narrative "how this actually goes" journey through an ACME
// engagement, in the order a person experiences it rather than the order
// the dependency graph implies. Company and product tracks run in
// parallel (same day-numbers), which the graph view doesn't make obvious.
type DayStep = {
  day: string;
  headline: string;
  detail: string;
  skillSlugs: string[];
};

const steps: DayStep[] = [
  {
    day: "Day 1, morning",
    headline: "\"What do we know about ACME?\"",
    detail:
      "One prompt kicks off both tracks at once — the company brief and, in parallel, the sector context it needs.",
    skillSlugs: ["duediligence", "marketdd"],
  },
  {
    day: "Day 1, afternoon",
    headline: "Who actually runs this place?",
    detail:
      "Once the brief exists, the org chart and decision-maker dossiers follow — grounded in what Step 1 already found.",
    skillSlugs: ["companypeople"],
  },
  {
    day: "Day 1, late",
    headline: "How do we actually reach them?",
    detail: "Every realistic route to the named people, ranked by the odds it works.",
    skillSlugs: ["targetpeople"],
  },
  {
    day: "Day 2",
    headline: "Meanwhile — is the product any good?",
    detail:
      "If ACME shared a sales export, cohort retention gets recomputed from raw rows first, so the product verdict isn't guessing.",
    skillSlugs: ["cohortlab", "productdd"],
  },
  {
    day: "Day 2, evidence",
    headline: "The calls get folded in.",
    detail:
      "Every reference call and management interview becomes a clean, citable source — feeding straight into the reports above as they're written.",
    skillSlugs: ["interviewlog"],
  },
  {
    day: "Day 3",
    headline: "Can we trust what the tech team claims?",
    detail:
      "Once ACME is a real target — from either track — the technical scorecard runs: APIs, architecture, security, the works.",
    skillSlugs: ["technicaldd"],
  },
  {
    day: "Day 3, close",
    headline: "So what do we actually do?",
    detail: "The findings become a plan: sized levers, the first 100 days, the exact ask for the board.",
    skillSlugs: ["valuecreation"],
  },
  {
    day: "Day 3, delivery",
    headline: "Make it look like it came from inside ACME's own building.",
    detail: "Every deliverable above gets re-skinned in ACME's own colours and fonts before it goes out.",
    skillSlugs: ["onbrand"],
  },
];

export function OrchestrationTimeline() {
  return (
    <ol className="relative space-y-10 border-l border-border pl-8">
      {steps.map((step, i) => (
        <li key={i} className="relative">
          <span className="absolute -left-[41px] top-1 flex h-6 w-6 items-center justify-center rounded-full border border-accent bg-background font-mono text-[11px] text-accent">
            {i + 1}
          </span>
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent">{step.day}</p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">{step.headline}</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">{step.detail}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {step.skillSlugs.map((slug) => {
              const skill = orchestrationSkills.find((s) => s.slug === slug);
              if (!skill) return null;
              return (
                <span
                  key={slug}
                  className="rounded-md border px-2.5 py-1 font-mono text-xs text-foreground"
                  style={{ borderColor: trackColor[skill.track] }}
                  title={trackLabel[skill.track]}
                >
                  {skill.command}
                </span>
              );
            })}
          </div>
        </li>
      ))}
    </ol>
  );
}
