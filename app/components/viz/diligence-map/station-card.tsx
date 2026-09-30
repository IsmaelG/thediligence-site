import { useLayoutEffect, useRef, useState, type RefObject } from "react";
import { stationById, stationByIdSafe, lineColor, lineLabel, githubUrlFor, MAP_VIEWBOX } from "@/lib/diligence-map";

// Percentages below must be computed against the same padded viewBox MapSvg
// renders with, or the card drifts from the station it's anchored to.
const { w: W, h: H, padX: PAD_X, padY: PAD_Y } = MAP_VIEWBOX;
const FULL_W = W + PAD_X * 2;
const FULL_H = H + PAD_Y * 2;

// How far the card is kept from the map container's own edges once clamped.
const CLAMP_INSET_PX = 12;

export function StationCard({
  stationId,
  onMouseEnter,
  onMouseLeave,
  containerRef,
}: {
  stationId: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  containerRef?: RefObject<HTMLDivElement | null>;
}) {
  const station = stationById(stationId);
  const left = station.x > 620;
  const down = station.y < 350;

  const leftPct = ((station.x + PAD_X) / FULL_W) * 100;
  const topPct = ((station.y + PAD_Y) / FULL_H) * 100;

  // This card is positioned relative to the bordered wrapper in
  // diligence-map.tsx, which has p-6 (24px) padding — but the map SVG it
  // needs to line up with renders inside that padding, at a nested,
  // unpadded scroll container. `calc()` below re-derives "24px inset, then
  // interpolate across the remaining content width" so the card lands where
  // the SVG actually is, without needing to share a positioning ancestor
  // with the SVG (which would put it back inside the horizontal scroller
  // and reintroduce the forced-overflow-y clipping bug).
  const CONTAINER_PAD_PX = 24;

  const cardRef = useRef<HTMLDivElement>(null);
  const [clamp, setClamp] = useState({ dx: 0, dy: 0 });

  // Best-guess anchoring above (left/down flags) picks a good corner most of
  // the time, but a tall card near an edge can still spill past the map
  // container's own border and bleed into the section below it. After each
  // open, measure the rendered card against the container and nudge it back
  // inside — runs before paint so there's no visible jump.
  useLayoutEffect(() => {
    const cardEl = cardRef.current;
    const boxEl = containerRef?.current;
    if (!cardEl || !boxEl) {
      setClamp({ dx: 0, dy: 0 });
      return;
    }
    const cardRect = cardEl.getBoundingClientRect();
    const boxRect = boxEl.getBoundingClientRect();
    let dx = 0;
    let dy = 0;
    if (cardRect.left < boxRect.left + CLAMP_INSET_PX) {
      dx += boxRect.left + CLAMP_INSET_PX - cardRect.left;
    } else if (cardRect.right > boxRect.right - CLAMP_INSET_PX) {
      dx -= cardRect.right - (boxRect.right - CLAMP_INSET_PX);
    }
    if (cardRect.top < boxRect.top + CLAMP_INSET_PX) {
      dy += boxRect.top + CLAMP_INSET_PX - cardRect.top;
    } else if (cardRect.bottom > boxRect.bottom - CLAMP_INSET_PX) {
      dy -= cardRect.bottom - (boxRect.bottom - CLAMP_INSET_PX);
    }
    setClamp({ dx, dy });
  }, [stationId, containerRef]);

  return (
    <div
      ref={cardRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute z-10 w-[280px] rounded-lg border border-border bg-surface p-3.5 shadow-xl"
      style={{
        left: `calc(${CONTAINER_PAD_PX}px + (100% - ${CONTAINER_PAD_PX * 2}px) * ${leftPct} / 100)`,
        top: `calc(${CONTAINER_PAD_PX}px + (100% - ${CONTAINER_PAD_PX * 2}px) * ${topPct} / 100)`,
        transform: `translate(${left ? "-100%" : "0%"}, ${down ? "0%" : "-100%"}) translate(${left ? "-16px" : "16px"}, ${down ? "16px" : "-16px"}) translate(${clamp.dx}px, ${clamp.dy}px)`,
      }}
    >
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
    </div>
  );
}
