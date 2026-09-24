import { VizShell } from "@/app/components/viz/viz-shell";
import { TrackCards } from "@/app/components/viz/track-cards";

export default function ProtoVizI() {
  return (
    <VizShell
      eyebrow="Orchestration — proto I"
      title="Pick your starting point."
      subtitle="A company, or a product — side by side, so you can see the whole path for each one at a glance."
    >
      <TrackCards />
    </VizShell>
  );
}
