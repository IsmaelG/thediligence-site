import { stationByIdSafe, lineColor, lineLabel, githubUrlFor, type Station } from "@/lib/diligence-map";

// The "what is this station" content — question, Takes/Gives, Feeds-into,
// why, GitHub link — shared verbatim between the desktop floating
// StationCard and the mobile stepper's inline-expanded current row, so the
// two never drift apart.
//
// `showHeader` defaults to true (StationCard's only way to show the
// command/line label/Coming badge). The mobile stepper sets it false: its
// own row header already shows the command, so repeating it here would
// duplicate it — the row header carries the line label/badge instead.
export function StationDetail({ station, showHeader = true }: { station: Station; showHeader?: boolean }) {
  return (
    <>
      {showHeader && (
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
      )}
      {/* Below, classes are written mobile-first-larger with an `sm:`
          override back down to today's desktop sizing — StationCard only
          ever renders at `sm`+ viewport widths in practice (it's reachable
          only by hovering/clicking the SVG map, which is itself hidden
          below `sm`), so desktop stays pixel-identical while the mobile
          stepper (which only ever renders below `sm`) gets the larger base
          sizes automatically, with no prop needed. */}
      <p
        className={`${showHeader ? "mt-1.5" : ""} text-lg font-semibold leading-snug text-foreground sm:text-sm`}
      >
        {station.q}
      </p>

      <dl className="mt-3 space-y-2 text-base sm:mt-2 sm:space-y-1.5 sm:text-xs">
        <div>
          <dt className="font-mono text-xs uppercase tracking-[0.15em] text-muted sm:text-[10px]">Takes</dt>
          <dd className="text-muted">{station.takes}</dd>
        </div>
        <div>
          <dt className="font-mono text-xs uppercase tracking-[0.15em] text-accent sm:text-[10px]">Gives</dt>
          <dd className="text-muted">{station.produces}</dd>
        </div>
      </dl>

      {station.feeds.length > 0 ? (
        <div className="mt-3 sm:mt-2">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted sm:text-[10px]">Feeds into</p>
          <div className="mt-1.5 flex flex-wrap gap-2 sm:mt-1 sm:gap-1.5">
            {station.feeds.map((id) => {
              const target = stationByIdSafe(id);
              if (!target) return null;
              return (
                <span
                  key={id}
                  className="flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-sm text-foreground sm:px-2 sm:py-0.5 sm:text-[11px]"
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
        <p className="mt-3 text-base text-muted sm:mt-2 sm:text-xs">End of line.</p>
      )}

      <p className="mt-3 text-base text-muted sm:mt-2 sm:text-xs">{station.why}</p>

      <a
        href={station.coming ? undefined : githubUrlFor(station.id)}
        target="_blank"
        rel="noreferrer noopener"
        aria-disabled={station.coming}
        className={`mt-3 inline-block text-base underline decoration-border underline-offset-4 sm:mt-2 sm:text-xs ${
          station.coming ? "pointer-events-none text-muted/50" : "text-muted hover:text-accent hover:decoration-accent"
        }`}
      >
        {station.coming ? "Not yet on the public repo" : "View source on GitHub →"}
      </a>
    </>
  );
}
