import { VizShell } from "@/app/components/viz/viz-shell";
import { DiligenceMap } from "@/app/components/viz/diligence-map/diligence-map";
import { RulesSection } from "@/app/components/rules-section";

export default function ProtoVizO() {
  return (
    <VizShell
      eyebrow="How it works"
      title="The map."
      subtitle="Eleven skills, four lines. The train walks the route — hover or tap any station for what it takes, what it produces, and the source behind it."
      afterContent={<RulesSection />}
    >
      <DiligenceMap />
    </VizShell>
  );
}
