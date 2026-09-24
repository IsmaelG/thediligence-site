"use client";

import { VizShell } from "@/app/components/viz/viz-shell";
import { JourneyWalkthrough } from "@/app/components/viz/journey-walkthrough";
import { JourneyMapLayered } from "@/app/components/viz/journey-map-layered";

export default function ProtoVizF() {
  return (
    <VizShell
      eyebrow="Orchestration — proto F"
      title="Start with a question. Watch it light up the whole map."
      subtitle="The layered map (evidence, research, synthesis, presentation) is always fully visible. Pick what you're starting with on ACME and the real chain lights up across it, step by step."
    >
      <JourneyWalkthrough renderMap={(activated, current) => <JourneyMapLayered activatedSlugs={activated} currentSlug={current} />} />
    </VizShell>
  );
}
