import { VizShell } from "@/app/components/viz/viz-shell";
import { TrackStepper } from "@/app/components/viz/track-stepper";

export default function ProtoVizJ() {
  return (
    <VizShell
      eyebrow="Orchestration — proto J"
      title="One path at a time."
      subtitle="Switch between company and product — a familiar onboarding-style stepper for whichever one you pick."
    >
      <TrackStepper />
    </VizShell>
  );
}
