import { VizShell } from "@/app/components/viz/viz-shell";
import { TrackIcons } from "@/app/components/viz/track-icons";

export default function ProtoVizK() {
  return (
    <VizShell
      eyebrow="Orchestration — proto K"
      title="Built to be read in three seconds."
      subtitle="Big shapes, few words — a marketing explainer, not a technical diagram."
    >
      <TrackIcons />
    </VizShell>
  );
}
