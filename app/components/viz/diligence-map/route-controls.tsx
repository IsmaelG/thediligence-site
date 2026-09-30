import { routes } from "@/lib/diligence-map";

export function RouteControls({
  activeRouteId,
  playing,
  onSelectRoute,
  onPrev,
  onNext,
  onTogglePlay,
}: {
  activeRouteId: string;
  playing: boolean;
  onSelectRoute: (id: string) => void;
  onPrev: () => void;
  onNext: () => void;
  onTogglePlay: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap gap-2">
        {routes.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => onSelectRoute(r.id)}
            aria-pressed={r.id === activeRouteId}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
              r.id === activeRouteId
                ? "bg-accent text-accent-foreground"
                : "border border-border text-muted hover:border-accent hover:text-foreground"
            }`}
          >
            {r.name}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous stop"
          className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-foreground transition hover:border-accent"
        >
          ◀
        </button>
        <button
          type="button"
          onClick={onTogglePlay}
          aria-label={playing ? "Pause" : "Play"}
          className="rounded-md border border-border px-3 py-1.5 text-sm text-foreground transition hover:border-accent"
        >
          {playing ? "Pause" : "Play"}
        </button>
        <button
          type="button"
          onClick={onNext}
          aria-label="Next stop"
          className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-foreground transition hover:border-accent"
        >
          ▶
        </button>
      </div>
    </div>
  );
}
