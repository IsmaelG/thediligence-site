import { VizShell } from "@/app/components/viz/viz-shell";
import { OrchestrationTimeline } from "@/app/components/viz/orchestration-timeline";

export default function ProtoVizB() {
  return (
    <VizShell
      eyebrow="Orchestration — proto B"
      title="Three days on ACME: what it actually feels like to run."
      subtitle="Same skills, told as a story instead of a dependency graph — company and product tracks running in parallel, evidence folding in as it's gathered."
    >
      <OrchestrationTimeline />
    </VizShell>
  );
}
