import { orchestrationSkills } from "@/lib/orchestration";
import { trackColor } from "./track-colors";

// Proto D — a "geological cross-section" matching the product's own name
// (a *stack*). Not the execution order — the conceptual architecture:
// evidence at the base, the 6 research skills built on top of it, synthesis
// above that, and presentation as the top coat everything gets finished with.
const LAYERS: { key: string; title: string; note: string; slugs: string[] }[] = [
  {
    key: "presentation",
    title: "Presentation",
    note: "The top coat — restyled in the target's own colours before it ships.",
    slugs: ["onbrand"],
  },
  {
    key: "synthesis",
    title: "Synthesis",
    note: "Turns findings into a plan the board can act on.",
    slugs: ["valuecreation"],
  },
  {
    key: "research",
    title: "Research",
    note: "The 7 skills that actually go find things out about ACME.",
    slugs: [
      "duediligence",
      "marketdd",
      "companypeople",
      "targetpeople",
      "cohortlab",
      "productdd",
      "technicaldd",
    ],
  },
  {
    key: "evidence",
    title: "Evidence",
    note: "Every call and transcript, turned into a citable source log everything above draws from.",
    slugs: ["interviewlog"],
  },
];

export function OrchestrationLayers() {
  return (
    <div className="space-y-1">
      <div className="mb-4 flex items-center gap-3">
        <span className="rounded-md bg-accent px-3 py-1.5 text-sm font-semibold text-accent-foreground">
          ACME
        </span>
        <span className="text-sm text-muted">flows up through the stack ↑</span>
      </div>
      {LAYERS.map((layer) => (
        <div
          key={layer.key}
          className="rounded-md border border-border bg-background p-5"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              {layer.title}
            </h3>
            <p className="text-xs text-muted">{layer.note}</p>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {layer.slugs.map((slug) => {
              const skill = orchestrationSkills.find((s) => s.slug === slug);
              if (!skill) return null;
              return (
                <span
                  key={slug}
                  className="rounded-md border px-3 py-1.5 font-mono text-xs text-foreground"
                  style={{ borderColor: trackColor[skill.track] }}
                >
                  {skill.command}
                </span>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
