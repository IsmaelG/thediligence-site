import { stationById, lineLabel, lineColor, type Route } from "@/lib/diligence-map";

export function NowPanel({
  route,
  stepIndex,
  progress,
}: {
  route: Route;
  stepIndex: number;
  progress: number; // 0-1
}) {
  const stationId = route.stops[stepIndex];
  const station = stationById(stationId);

  return (
    <div className="rounded-lg border border-border bg-surface p-6" aria-live="polite">
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-mono text-3xl font-semibold text-accent">
          {String(stepIndex + 1).padStart(2, "0")}
        </span>
        <span className="text-xs text-muted">
          Stop {stepIndex + 1} of {route.stops.length} — {route.name}
        </span>
      </div>
      <p className="mt-2 text-xl font-semibold text-foreground sm:text-2xl">{station.q}</p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span
          className="rounded-md border px-2.5 py-1 font-mono text-xs text-foreground"
          style={{ borderColor: lineColor[station.line] }}
        >
          {station.command}
        </span>
        <span className="text-xs text-muted">{lineLabel[station.line]}</span>
        {station.coming && (
          <span className="rounded-md border border-accent/50 px-2 py-0.5 text-[10px] uppercase tracking-wide text-accent">
            Coming
          </span>
        )}
      </div>
      <div className="mt-4 h-1 overflow-hidden rounded-full bg-border">
        <div
          className="h-full bg-accent"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>
    </div>
  );
}
