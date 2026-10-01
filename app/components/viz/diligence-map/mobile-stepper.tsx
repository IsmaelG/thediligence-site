import { stationById, lineColor, type Route } from "@/lib/diligence-map";
import { StationDetail } from "./station-detail";

// Mobile replacement for the SVG subway diagram (below the `sm` breakpoint,
// per the "Option 1" decision — no diagram on phones at all): a vertical,
// tappable list of the current route's stops. The current stop expands
// inline with the full StationDetail content; tapping any other row jumps
// the route position there (same semantics as the desktop prev/next
// buttons) — no floating card, so no positioning/clamping logic is needed
// here by construction.
export function MobileStepper({
  route,
  stepIndex,
  onJump,
}: {
  route: Route;
  stepIndex: number;
  onJump: (index: number) => void;
}) {
  return (
    <ol className="space-y-2">
      {route.stops.map((id, i) => {
        const station = stationById(id);
        const isCurrent = i === stepIndex;
        return (
          <li key={id}>
            <button
              type="button"
              onClick={() => onJump(i)}
              aria-current={isCurrent}
              className={`w-full rounded-lg border p-3.5 text-left transition ${
                isCurrent ? "border-accent bg-surface" : "border-border bg-background"
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: lineColor[station.line] }}
                />
                <span className="font-mono text-xs text-foreground">{station.command}</span>
                <span className="ml-auto shrink-0 font-mono text-[10px] text-muted">
                  {i + 1}/{route.stops.length}
                </span>
              </div>

              {isCurrent ? (
                <div className="mt-2">
                  <StationDetail station={station} />
                </div>
              ) : (
                <p className="mt-1.5 text-sm text-muted">{station.sq}</p>
              )}
            </button>
          </li>
        );
      })}
    </ol>
  );
}
