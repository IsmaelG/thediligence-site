import { stationByIdSafe, lineColor, lineLabel, githubUrlFor, type Station } from "@/lib/diligence-map";

// The "what is this station" content — question, Takes/Gives, Feeds-into,
// why, GitHub link — shared verbatim between the desktop floating
// StationCard and the mobile stepper's inline-expanded current row, so the
// two never drift apart.
export function StationDetail({ station }: { station: Station }) {
  return (
    <>
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: lineColor[station.line] }} />
        <span className="font-mono text-xs text-foreground">{station.command}</span>
        <span className="text-xs text-muted">· {lineLabel[station.line]}</span>
        {station.coming && (
          <span className="rounded-md border border-accent/50 px-1.5 py-0.5 text-[9px] uppercase tracking-wide text-accent">
            Coming
          </span>
        )}
      </div>
      <p className="mt-1.5 text-sm font-semibold leading-snug text-foreground">{station.q}</p>

      <dl className="mt-2 space-y-1.5 text-xs">
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted">Takes</dt>
          <dd className="text-muted">{station.takes}</dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent">Gives</dt>
          <dd className="text-muted">{station.produces}</dd>
        </div>
      </dl>

      {station.feeds.length > 0 ? (
        <div className="mt-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted">Feeds into</p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {station.feeds.map((id) => {
              const target = stationByIdSafe(id);
              if (!target) return null;
              return (
                <span
                  key={id}
                  className="flex items-center gap-1.5 rounded-md border px-2 py-0.5 font-mono text-[11px] text-foreground"
                  style={{ borderColor: lineColor[target.line] }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: lineColor[target.line] }} />
                  {target.command}
                </span>
              );
            })}
          </div>
        </div>
      ) : (
        <p className="mt-2 text-xs text-muted">End of line.</p>
      )}

      <p className="mt-2 text-xs text-muted">{station.why}</p>

      <a
        href={station.coming ? undefined : githubUrlFor(station.id)}
        target="_blank"
        rel="noreferrer noopener"
        aria-disabled={station.coming}
        className={`mt-2 inline-block text-xs underline decoration-border underline-offset-4 ${
          station.coming ? "pointer-events-none text-muted/50" : "text-muted hover:text-accent hover:decoration-accent"
        }`}
      >
        {station.coming ? "Not yet on the public repo" : "View source on GitHub →"}
      </a>
    </>
  );
}
