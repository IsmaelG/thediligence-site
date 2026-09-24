import { VizShell } from "@/app/components/viz/viz-shell";
import { PathBuilder } from "@/app/components/viz/path-builder";

export default function ProtoVizE() {
  return (
    <VizShell
      eyebrow="Orchestration — proto E"
      title="Don't look at the graph — walk it."
      subtitle="Pick what you're starting with on ACME. The skill chain that would actually fire reveals step by step, ending in the outline of what you'd actually get."
    >
      <PathBuilder />
    </VizShell>
  );
}
