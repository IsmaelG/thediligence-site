import { VizShell } from "@/app/components/viz/viz-shell";
import { OrchestrationRadial } from "@/app/components/viz/orchestration-radial";

export default function ProtoVizC() {
  return (
    <VizShell
      eyebrow="Orchestration — proto C"
      title="Everything orbits the target."
      subtitle="ACME at the center; the company, product, and technical tracks fan out as spokes, with the shared utilities as satellites feeding in from the side."
    >
      <OrchestrationRadial />
    </VizShell>
  );
}
