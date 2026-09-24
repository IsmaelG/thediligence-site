import { VizShell } from "@/app/components/viz/viz-shell";
import { TrackValue } from "@/app/components/viz/track-value";

export default function ProtoVizL() {
  return (
    <VizShell
      eyebrow="Orchestration — proto L"
      title="What you start with. What you end up with."
      subtitle="Value first, process second — the skill chain is still there, just smaller, as the 'how' underneath the 'what.'"
    >
      <TrackValue />
    </VizShell>
  );
}
