import { VizShell } from "@/app/components/viz/viz-shell";
import { Swimlanes } from "@/app/components/viz/swimlanes";

export default function ProtoVizH() {
  return (
    <VizShell
      eyebrow="Orchestration — proto H"
      title="Two questions, two pipelines."
      subtitle="Start with a company, or start with a product. Both are simple, straight lines — nothing to click, nothing to figure out."
    >
      <Swimlanes />
    </VizShell>
  );
}
