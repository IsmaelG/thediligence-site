import { VizShell } from "@/app/components/viz/viz-shell";
import { OrchestrationGraph } from "@/app/components/viz/orchestration-graph";

export default function ProtoVizA() {
  return (
    <VizShell
      eyebrow="Orchestration — proto A"
      title="The literal graph: how a diligence on ACME actually runs."
      subtitle="Solid arrows are sequence — one skill's output feeds the next. Dashed arrows are automatic chains, evidence feeding in, or a restyle pass at the end."
    >
      <OrchestrationGraph />
    </VizShell>
  );
}
