import { stationById, lineColor, type Route } from "@/lib/diligence-map";
import { StationDetail } from "./station-detail";

// Mobile replacement for the SVG subway diagram (below the `sm` breakpoint,
// per the "Option 1" decision — no diagram on phones at all): a plain,
// user-driven accordion over the full-tour stops. No autoplay, no forced
// "current" row — every row starts collapsed; tapping one expands it
// (collapsing whichever other row was open), tapping the open row again
// collapses it back. The user scrolls and opens only what they're curious
// about, instead of fighting a moving/animating "current" indicator.
export function MobileStepper({
  route,
  expandedId,
  onToggle,
}: {
  route: Route;
  expandedId: string | null;
  onToggle: (id: string) => void;
}) {
  return (
    <ol className="space-y-2">
      {route.stops.map((id, i) => {
        const station = stationById(id);
        const isOpen = id === expandedId;
        return (
          <li key={id}>
            <button
              type="button"
              onClick={() => onToggle(id)}
              aria-expanded={isOpen}
              className={`w-full rounded-lg border p-4 text-left transition ${
                isOpen ? "border-accent bg-surface" : "border-border bg-background"
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: lineColor[station.line] }}
                />
                <span className="font-mono text-sm text-foreground">{station.command}</span>
                {station.coming && (
                  <span className="shrink-0 rounded-md border border-accent/50 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-accent">
                    Coming
                  </span>
                )}
                <span className="ml-auto shrink-0 font-mono text-xs text-muted">
                  {i + 1}/{route.stops.length}
                </span>
              </div>

              {isOpen ? (
                <div className="mt-2.5">
                  <StationDetail station={station} showHeader={false} />
                </div>
              ) : (
                <p className="mt-1.5 text-base text-muted">{station.sq}</p>
              )}
            </button>
          </li>
        );
      })}
    </ol>
  );
}
