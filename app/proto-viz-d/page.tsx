import { VizShell } from "@/app/components/viz/viz-shell";
import { OrchestrationLayers } from "@/app/components/viz/orchestration-layers";

export default function ProtoVizD() {
  return (
    <VizShell
      eyebrow="Orchestration — proto D"
      title="Not a flow — an architecture."
      subtitle="Read bottom to top: raw evidence at the base, the research skills built on it, synthesis above that, and a presentation pass on top. This is the stack the product is named after."
    >
      <OrchestrationLayers />
    </VizShell>
  );
}
