"use client";

import { VizShell } from "@/app/components/viz/viz-shell";
import { JourneyWalkthrough } from "@/app/components/viz/journey-walkthrough";
import { JourneyMapRadial } from "@/app/components/viz/journey-map-radial";

export default function ProtoVizG() {
  return (
    <VizShell
      eyebrow="Orchestration — proto G"
      title="Start with a question. Watch the orbit light up around ACME."
      subtitle="Same idea as proto F, on the radial map instead — everything stays visible around ACME while the chain you picked lights up, ring by ring."
    >
      <JourneyWalkthrough renderMap={(activated, current) => <JourneyMapRadial activatedSlugs={activated} currentSlug={current} />} />
    </VizShell>
  );
}
