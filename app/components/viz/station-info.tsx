import type { Station } from "@/lib/subway";

export function StationInfo({ station }: { station: Station | null }) {
  if (!station) return null;

  return (
    <div className="rounded-lg border border-accent/50 bg-surface p-5">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-lg font-semibold text-foreground">{station.label}</p>
        {station.command && (
          <span className="font-mono text-xs text-accent">{station.command}</span>
        )}
      </div>
      <p className="mt-2 text-sm text-foreground">{station.question}</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted">Takes in</p>
          <p className="mt-1 text-sm text-muted">{station.takesIn}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent">Produces</p>
          <p className="mt-1 text-sm text-muted">{station.produces}</p>
        </div>
      </div>
    </div>
  );
}
