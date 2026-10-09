"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  stations,
  routes,
  stationById,
  MAP_VIEWBOX,
  type Station,
  type StationId,
  type RouteId,
} from "@/lib/stack";

// --------------------------------------------------------------------------
// Constants
// --------------------------------------------------------------------------

const DWELL_MS = 3600;
const MOVE_MS  = 900;

// --------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------

function lineColorVar(lineId: string): string {
  const m: Record<string, string> = {
    company: "var(--blue)",
    product: "var(--orange)",
    tech:    "var(--green)",
    shared:  "var(--mut)",
  };
  return m[lineId] ?? "var(--fg)";
}

function lineTextVar(lineId: string): string {
  const m: Record<string, string> = {
    company: "var(--blue-t)",
    product: "var(--orange-t)",
    tech:    "var(--green-t)",
    shared:  "var(--mut)",
  };
  return m[lineId] ?? "var(--fg)";
}

/** Wrap short-question text at ~20 chars, max 2 lines */
function wrapSq(sq: string): string[] {
  const words = sq.split(" ");
  const out: string[] = [];
  let cur = "";
  for (const w of words) {
    const test = cur ? `${cur} ${w}` : w;
    if (test.length > 22 && cur) {
      out.push(cur);
      cur = w;
    } else {
      cur = test;
    }
  }
  if (cur) out.push(cur);
  return out.slice(0, 2);
}

// --------------------------------------------------------------------------
// Track SVG paths (from lib/stack.ts trackSegments)
// --------------------------------------------------------------------------

const TRACKS = [
  { line: "shared",  d: "M40 500 H1060",                                        style: "dashed" as const },
  { line: "company", d: "M80 280 H250 L400 130 H600",                            style: "solid" as const  },
  { line: "product", d: "M250 284 H920",                                          style: "solid" as const  },
  { line: "product", d: "M440 410 H480 L520 370 V288 M610 410 H560 L520 370",    style: "solid" as const  },
  { line: "tech",    d: "M520 276 H920",                                          style: "solid" as const  },
];

// --------------------------------------------------------------------------
// Sub-components
// --------------------------------------------------------------------------

function StationGlyph({
  s,
  active,
  dimmed,
  focused,
}: {
  s: Station;
  active: boolean;
  dimmed: boolean;
  focused: boolean;
}) {
  const color = lineColorVar(s.line);
  const scale = active ? 1.45 : 1;

  return (
    <g
      transform={`translate(${s.x},${s.y}) scale(${scale})`}
      style={{
        transition: `transform ${MOVE_MS * 0.5}ms ease`,
        transformOrigin: `${s.x}px ${s.y}px`,
        transformBox: "fill-box",
        opacity: dimmed ? 0.28 : 1,
      }}
    >
      {s.hub ? (
        // Interchange: rounded rect 30×22, rx=11
        <rect
          x="-15"
          y="-11"
          width="30"
          height="22"
          rx="11"
          fill="var(--surf)"
          stroke={active ? "var(--fg)" : "var(--fg)"}
          strokeWidth="3"
        />
      ) : (
        // Circle station: r=9
        <circle
          r="9"
          fill="var(--surf)"
          stroke={color}
          strokeWidth="3"
        />
      )}
      {focused && (
        <circle
          r="16"
          fill="none"
          stroke="var(--blue)"
          strokeWidth="2"
          style={{ pointerEvents: "none" }}
        />
      )}
    </g>
  );
}

function StationLabels({
  s,
  active,
  dimmed,
}: {
  s: Station;
  active: boolean;
  dimmed: boolean;
}) {
  const color = lineTextVar(s.line);
  const sqLines = wrapSq(s.sq);
  const below = s.labelSide === "below";

  // below: /name at y+32, sq lines at +49, +66
  // above: sq lines going upward, /name at top
  let nameY: number;
  let sqY: number[];
  if (below) {
    nameY = s.y + 32;
    sqY = sqLines.map((_, i) => s.y + 49 + i * 17);
  } else {
    // above: last sq line at y-24, stacked upward
    sqY = sqLines.map((_, i) => s.y - 24 - (sqLines.length - 1 - i) * 17).reverse();
    nameY = sqY[0] - 17;
  }

  return (
    <g style={{ opacity: dimmed ? 0.28 : 1 }}>
      {/* /skillname */}
      <text
        x={s.x}
        y={nameY}
        textAnchor="middle"
        fontFamily="var(--mono)"
        fontSize="13"
        fontWeight="600"
        fill={color}
      >
        /{s.id}
      </text>
      {/* Short question */}
      {sqLines.map((line, i) => (
        <text
          key={i}
          x={s.x}
          y={sqY[i]}
          textAnchor="middle"
          fontFamily="var(--sans)"
          fontSize="12"
          fontWeight="400"
          fill={active ? "var(--fg)" : "var(--mut)"}
        >
          {line}
        </text>
      ))}
      {/* NEW tag for personapanel */}
      {s.isNew && (
        <text
          x={s.x + 28}
          y={nameY - 2}
          fontFamily="var(--mono)"
          fontSize="9"
          fontWeight="600"
          fill={color}
          letterSpacing="0.06em"
        >
          NEW
        </text>
      )}
    </g>
  );
}

function TrainDot({
  x,
  y,
  reducedMotion,
}: {
  x: number;
  y: number;
  reducedMotion: boolean;
}) {
  const [haloPulse, setHaloPulse] = useState(0.15);

  useEffect(() => {
    if (reducedMotion) return;
    let start: number | null = null;
    let rafId: number;
    function tick(ts: number) {
      if (!start) start = ts;
      const t = ((ts - start) % 1600) / 1600;
      // 0.15 → 0.03 → 0.15 in a smooth sine wave
      setHaloPulse(0.09 + 0.06 * Math.cos(t * Math.PI * 2));
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [reducedMotion]);

  return (
    <g
      style={{
        transition: reducedMotion
          ? "none"
          : `transform ${MOVE_MS}ms cubic-bezier(.6,0,.3,1)`,
        transform: `translate(${x}px, ${y}px)`,
      }}
    >
      {/* Halo */}
      <circle r="18" fill="var(--fg)" opacity={reducedMotion ? 0 : haloPulse} />
      {/* Train dot */}
      <circle r="7" fill="var(--fg)" />
    </g>
  );
}

// --------------------------------------------------------------------------
// Hover card
// --------------------------------------------------------------------------

interface CardProps {
  station: Station;
  svgRect: DOMRect;
  containerRect: DOMRect;
  onClose: () => void;
  pinned: boolean;
}

function HoverCard({ station: s, svgRect, containerRect, onClose, pinned }: CardProps) {
  const vbW = MAP_VIEWBOX.w;
  const vbH = MAP_VIEWBOX.h;
  const scaleX = svgRect.width / vbW;
  const scaleY = svgRect.height / vbH;
  const ox = svgRect.left - containerRect.left;
  const oy = svgRect.top - containerRect.top;

  const cx = s.x * scaleX + ox;
  const cy = s.y * scaleY + oy;

  const openRight = s.x <= 620;
  const openDown  = s.y < 350;
  const CARD_W    = 330;

  const style: React.CSSProperties = {
    position: "absolute",
    width: CARD_W,
    maxWidth: "calc(100vw - 48px)",
    zIndex: 10,
    pointerEvents: "auto",
  };
  if (openRight) {
    style.left = Math.max(4, cx + 22);
  } else {
    style.right = Math.max(4, containerRect.width - cx + 22);
  }
  if (openDown) {
    style.top = cy + 14;
  } else {
    style.bottom = containerRect.height - cy + 14;
  }

  const color = lineTextVar(s.line);
  const lineName = { company: "Company diligence", product: "Product diligence", tech: "Technical diligence", shared: "Shared line" }[s.line];
  const routeNum = s.step ? `Step ${s.step}` : "";

  return (
    <div
      className="map-card"
      role="tooltip"
      id={`card-${s.id}`}
      style={style}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      {/* Chip header */}
      <div className="map-card-chip">
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: lineColorVar(s.line),
            display: "inline-block",
            flexShrink: 0,
          }}
          aria-hidden="true"
        />
        <span
          style={{
            fontFamily: "var(--mono)",
            fontWeight: 600,
            fontSize: 13,
            color,
          }}
        >
          /{s.id}
        </span>
        <span style={{ color: "var(--mut)", fontSize: 12 }}>
          {lineName}{routeNum ? ` · ${routeNum}` : ""}
        </span>
      </div>

      {/* Full question */}
      <p
        style={{
          fontWeight: 600,
          fontSize: 17,
          lineHeight: 1.3,
          color: "var(--fg)",
          margin: "var(--sp-8) 0",
        }}
      >
        {s.q}
      </p>

      {/* Takes / gives */}
      <dl className="map-card-dl">
        <dt>Takes</dt>
        <dd>{s.takes}</dd>
        <dt>Gives</dt>
        <dd>{s.produces}</dd>
      </dl>

      {/* Feeds into */}
      <div className="map-card-feeds">
        <span className="map-card-feeds-label">Feeds into</span>
        {s.feeds.length === 0 ? (
          <span style={{ color: "var(--mut)", fontSize: 13 }}>End of line</span>
        ) : (
          <div style={{ display: "flex", gap: "var(--sp-4)", flexWrap: "wrap" }}>
            {s.feeds.map((fid) => {
              const f = stationById(fid as StationId);
              return (
                <span key={fid} className="map-feed-chip" style={{ color: lineTextVar(f.line) }}>
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: lineColorVar(f.line),
                      display: "inline-block",
                    }}
                    aria-hidden="true"
                  />
                  {" "}/{fid}
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* Why */}
      <p style={{ fontSize: 13, color: "var(--mut)", margin: "var(--sp-8) 0 0" }}>
        {s.why}
      </p>

      {/* Under the hood */}
      <details className="map-card-hood">
        <summary>Under the hood</summary>
        <pre>{`# run\n${s.run}\n# skill file\n~/.claude/skills/${s.id}/SKILL.md\n# output\n${s.out}`}</pre>
      </details>

      {pinned && (
        <button
          type="button"
          className="map-card-close"
          onClick={onClose}
          aria-label="Close detail card"
        >
          ×
        </button>
      )}
    </div>
  );
}

// --------------------------------------------------------------------------
// Legend
// --------------------------------------------------------------------------

function MapLegend() {
  const LINES = [
    { id: "company", name: "Company diligence",   color: lineColorVar("company")  },
    { id: "product", name: "Product diligence",   color: lineColorVar("product")  },
    { id: "tech",    name: "Technical diligence", color: lineColorVar("tech")     },
    { id: "shared",  name: "Shared line",          color: lineColorVar("shared")   },
  ];

  return (
    <div className="map-legend" aria-label="Map legend">
      {LINES.map(({ id, name, color }) => (
        <div key={id} className="map-legend-item">
          <span
            className="map-legend-swatch"
            style={{ background: color }}
            aria-hidden="true"
          />
          <span>{name}</span>
        </div>
      ))}
      <div className="map-legend-item">
        <span className="map-legend-hub" aria-hidden="true" />
        <span>Interchange</span>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// Now panel
// --------------------------------------------------------------------------

function NowPanel({
  station,
  stopIdx,
  totalStops,
  progress,
  reducedMotion,
}: {
  station: Station;
  stopIdx: number;
  totalStops: number;
  progress: number;
  reducedMotion: boolean;
}) {
  return (
    <div className="map-now" aria-live="polite" aria-atomic="true">
      <div className="map-now-meta">
        {station.step && (
          <span
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(32px,4vw,48px)",
              fontWeight: 400,
              lineHeight: 1,
              color: "var(--fg)",
              opacity: 0.25,
              flexShrink: 0,
            }}
            aria-hidden="true"
          >
            {station.step}
          </span>
        )}
        <div style={{ flex: 1 }}>
          <p
            style={{
              fontWeight: 600,
              fontSize: "clamp(17px,2.2vw,22px)",
              lineHeight: 1.2,
              color: "var(--fg)",
              margin: 0,
            }}
          >
            {station.q}
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--sp-8)",
              marginTop: "var(--sp-8)",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "var(--sp-4)",
                fontFamily: "var(--mono)",
                fontWeight: 600,
                fontSize: 13,
                color: lineTextVar(station.line),
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: lineColorVar(station.line),
                  display: "inline-block",
                }}
                aria-hidden="true"
              />
              /{station.id}
            </span>
            <span style={{ fontSize: 12, color: "var(--mut)" }}>
              Stop {stopIdx + 1} of {totalStops}
            </span>
          </div>
        </div>
      </div>
      {/* Progress bar */}
      <div
        className="map-now-bar"
        role="progressbar"
        aria-valuenow={Math.round(progress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="map-now-bar-fill"
          style={{
            width: `${progress * 100}%`,
            transition: reducedMotion ? "none" : "width 100ms linear",
          }}
        />
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// Main component
// --------------------------------------------------------------------------

export function DiligenceMap({ className = "" }: { className?: string }) {
  const [activeRoute, setActiveRoute] = useState<RouteId>("full");
  const [stopIdx,   setStopIdx]    = useState(0);
  const [playing,   setPlaying]    = useState(true);
  const [progress,  setProgress]   = useState(0);
  const [hovered,   setHovered]    = useState<StationId | null>(null);
  const [pinned,    setPinned]     = useState<StationId | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef       = useRef<SVGSVGElement>(null);
  const rafRef       = useRef<number>(0);
  const dwellStart   = useRef<number>(0);
  const dwellPausedAt = useRef<number>(0); // fraction 0-1 when paused

  const routeData = useMemo(() => {
    const r = routes.find((rt) => rt.id === activeRoute);
    return r ?? routes[0];
  }, [activeRoute]);

  const currentStation = stations.find((s) => s.id === routeData.stops[stopIdx])!;
  const visibleId = pinned ?? hovered;
  const visibleStation = visibleId ? stations.find((s) => s.id === visibleId) ?? null : null;

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    if (mq.matches) setPlaying(false);
    const h = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
      if (e.matches) setPlaying(false);
    };
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  // Tour loop
  useEffect(() => {
    if (!playing || reducedMotion) {
      cancelAnimationFrame(rafRef.current);
      return;
    }
    const totalStops = routeData.stops.length;
    dwellStart.current = performance.now() - dwellPausedAt.current * DWELL_MS;

    function tick(ts: number) {
      const elapsed = ts - dwellStart.current;
      const frac = Math.min(elapsed / DWELL_MS, 1);
      setProgress(frac);
      if (frac >= 1) {
        // Advance to next stop
        setStopIdx((prev) => {
          const next = (prev + 1) % totalStops;
          return next;
        });
        dwellStart.current = ts;
        dwellPausedAt.current = 0;
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing, reducedMotion, activeRoute, routeData.stops.length]);

  // When hovered, pause progress tracking (not the state, just stop advancing)
  // We do this by tracking in the effect above

  function handleRouteChange(id: RouteId) {
    setActiveRoute(id);
    setStopIdx(0);
    setProgress(0);
    dwellPausedAt.current = 0;
    setPlaying(true);
    setPinned(null);
    setHovered(null);
  }

  function handlePrev() {
    const n = routeData.stops.length;
    setStopIdx((prev) => (prev - 1 + n) % n);
    setProgress(0);
    dwellPausedAt.current = 0;
    setPlaying(false);
  }

  function handleNext() {
    const n = routeData.stops.length;
    setStopIdx((prev) => (prev + 1) % n);
    setProgress(0);
    dwellPausedAt.current = 0;
    setPlaying(false);
  }

  function handlePlayPause() {
    if (playing) {
      dwellPausedAt.current = progress;
    }
    setPlaying((p) => !p);
  }

  function handleStationEnter(id: StationId) {
    if (pinned) return;
    setHovered(id);
    dwellPausedAt.current = progress;
    setPlaying(false);
  }

  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleStationLeave() {
    if (pinned) return;
    leaveTimer.current = setTimeout(() => {
      setHovered(null);
      setPlaying(true);
    }, 180);
  }

  function handleCardEnter() {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
  }

  function handleCardLeave() {
    if (pinned) return;
    leaveTimer.current = setTimeout(() => {
      setHovered(null);
      setPlaying(true);
    }, 180);
  }

  function handleStationActivate(id: StationId) {
    if (pinned === id) {
      setPinned(null);
      setHovered(null);
      setPlaying(true);
    } else {
      setPinned(id);
      setHovered(id);
      setPlaying(false);
    }
  }

  function handleCloseCard() {
    setPinned(null);
    setHovered(null);
    setPlaying(true);
  }

  // Keyboard: Escape closes pinned card
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && pinned) {
        setPinned(null);
        setHovered(null);
        setPlaying(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pinned]);

  // Click outside map closes pinned card
  function handleMapClick(e: React.MouseEvent) {
    // If clicking the map background (not a station)
    if ((e.target as SVGElement).tagName === "svg" || (e.target as SVGElement).tagName === "rect") {
      if (pinned) {
        setPinned(null);
        setHovered(null);
        setPlaying(true);
      }
    }
  }

  // Compute card position
  const [svgRect, setSvgRect] = useState<DOMRect | null>(null);
  const [containerRect, setContainerRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (!visibleStation) return;
    const svg = svgRef.current;
    const container = containerRef.current;
    if (!svg || !container) return;
    setSvgRect(svg.getBoundingClientRect());
    setContainerRect(container.getBoundingClientRect());
  }, [visibleStation]);

  return (
    <div className={`map-root ${className}`}>
      {/* Now panel */}
      <NowPanel
        station={currentStation}
        stopIdx={stopIdx}
        totalStops={routeData.stops.length}
        progress={progress}
        reducedMotion={reducedMotion}
      />

      {/* Controls */}
      <div className="map-controls">
        {/* Route selector */}
        <div className="map-routes" role="group" aria-label="Select route">
          {routes.map((r) => (
            <button
              key={r.id}
              type="button"
              className={`map-route-btn${activeRoute === r.id ? " active" : ""}`}
              onClick={() => handleRouteChange(r.id as RouteId)}
              aria-pressed={activeRoute === r.id}
            >
              {r.name}
            </button>
          ))}
        </div>

        {/* Tour controls */}
        <div className="map-tour-ctrl" role="group" aria-label="Tour controls">
          <button
            type="button"
            className="map-ctrl-btn"
            onClick={handlePrev}
            aria-label="Previous station"
          >
            ◀
          </button>
          <button
            type="button"
            className="map-ctrl-btn"
            onClick={handlePlayPause}
            aria-label={playing ? "Pause tour" : "Play tour"}
            aria-pressed={!playing}
          >
            {playing ? "⏸" : "▶"}
          </button>
          <button
            type="button"
            className="map-ctrl-btn"
            onClick={handleNext}
            aria-label="Next station"
          >
            ▶
          </button>
        </div>
      </div>

      {/* Map area */}
      <div className="map-scroll-wrapper">
        <div
          ref={containerRef}
          className="map-container"
          onClick={handleMapClick}
          style={{ position: "relative" }}
        >
          <svg
            ref={svgRef}
            viewBox={`0 0 ${MAP_VIEWBOX.w} ${MAP_VIEWBOX.h}`}
            width="100%"
            height="auto"
            className="map-svg"
            aria-label="Diligence Stack subway map"
            role="img"
          >
            {/* Track paths */}
            {TRACKS.map((t, i) => (
              <path
                key={i}
                d={t.d}
                fill="none"
                stroke={lineColorVar(t.line)}
                strokeWidth={t.style === "dashed" ? 4 : 7}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={t.style === "dashed" ? "2 9" : undefined}
              />
            ))}

            {/* Station glyphs */}
            {stations.map((s) => {
              const inRoute = routeData.stops.includes(s.id);
              const active = s.id === currentStation.id;
              const focused = hovered === s.id || pinned === s.id;
              return (
                <g
                  key={s.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`/${s.id}: ${s.q}`}
                  aria-expanded={focused ? "true" : "false"}
                  aria-describedby={focused ? `card-${s.id}` : undefined}
                  onMouseEnter={() => handleStationEnter(s.id)}
                  onMouseLeave={handleStationLeave}
                  onClick={() => handleStationActivate(s.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleStationActivate(s.id);
                    }
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {/* Invisible hit area */}
                  <rect
                    x={s.x - 66}
                    y={s.y - 49}
                    width="132"
                    height="98"
                    fill="transparent"
                  />
                  <StationGlyph
                    s={s}
                    active={active}
                    dimmed={!inRoute}
                    focused={focused}
                  />
                  <StationLabels
                    s={s}
                    active={active}
                    dimmed={!inRoute}
                  />
                </g>
              );
            })}

            {/* Train dot */}
            <TrainDot
              x={currentStation.x}
              y={currentStation.y}
              reducedMotion={reducedMotion}
            />
          </svg>

          {/* Hover / pinned card (HTML, floated over SVG) */}
          {visibleStation && svgRect && containerRect && (
            <div
              onMouseEnter={handleCardEnter}
              onMouseLeave={handleCardLeave}
            >
              <HoverCard
                station={visibleStation}
                svgRect={svgRect}
                containerRect={containerRect}
                onClose={handleCloseCard}
                pinned={!!pinned}
              />
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <MapLegend />
    </div>
  );
}
