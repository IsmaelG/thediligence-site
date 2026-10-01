"use client";

import { useEffect, useRef, useState } from "react";
import { MapSvg } from "./map-svg";
import { NowPanel } from "./now-panel";
import { RouteControls } from "./route-controls";
import { StationCard } from "./station-card";
import { MobileStepper } from "./mobile-stepper";
import { Legend } from "./legend";
import { DownloadCta } from "./download-cta";
import { routeById, linesForRoute } from "@/lib/diligence-map";

const DWELL_MS = 3600;
const TICK_MS = 60;

export function DiligenceMap() {
  const [routeId, setRouteId] = useState("full");
  const [stepIndex, setStepIndex] = useState(0);
  const [playing, setPlaying] = useState(
    () => typeof window === "undefined" || !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [progress, setProgress] = useState(0);
  const [cardId, setCardId] = useState<string | null>(null);
  const mapBoxRef = useRef<HTMLDivElement>(null);

  const route = routeById(routeId);

  useEffect(() => {
    if (!playing || cardId) return;
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + TICK_MS / DWELL_MS;
        if (next >= 1) {
          setStepIndex((i) => (i + 1) % route.stops.length);
          return 0;
        }
        return next;
      });
    }, TICK_MS);
    return () => clearInterval(interval);
  }, [playing, cardId, route.stops.length]);

  const selectRoute = (id: string) => {
    setRouteId(id);
    setStepIndex(0);
    setProgress(0);
    setPlaying(true);
  };

  const step = (delta: number) => {
    setPlaying(false);
    setProgress(0);
    setStepIndex((i) => Math.min(route.stops.length - 1, Math.max(0, i + delta)));
  };

  // Mobile stepper rows jump straight to an absolute index (tap-to-select),
  // same pause/reset semantics as the desktop prev/next buttons above.
  const jumpTo = (index: number) => {
    setPlaying(false);
    setProgress(0);
    setStepIndex(index);
  };

  const currentStationId = route.stops[stepIndex];
  const activeIds = new Set(route.stops);

  return (
    <div className="space-y-6">
      <RouteControls
        activeRouteId={routeId}
        playing={playing}
        onSelectRoute={selectRoute}
        onPrev={() => step(-1)}
        onNext={() => step(1)}
        onTogglePlay={() => setPlaying((p) => !p)}
      />

      <NowPanel route={route} stepIndex={stepIndex} progress={progress} />

      {/* Below `sm`, no SVG diagram at all (Option 1) — a tappable vertical
          stepper instead, sharing the same route/step state. At `sm` and
          above, the full subway map renders as before. */}
      <div className="sm:hidden">
        <MobileStepper route={route} stepIndex={stepIndex} onJump={jumpTo} />
      </div>

      <div ref={mapBoxRef} className="relative hidden rounded-lg border border-border bg-background p-6 sm:block">
        {/* Only the SVG scrolls horizontally on narrow screens — the
            hover/tap card renders outside this scroller so it never gets
            clipped by the scroll container's implicit overflow-y. */}
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            <MapSvg
              activeIds={activeIds}
              currentId={currentStationId}
              hoverId={cardId}
              onEnter={(id) => setCardId(id)}
              onLeave={() => setCardId(null)}
              onSelect={(id) => setCardId((cur) => (cur === id ? null : id))}
            />
          </div>
        </div>
        {cardId && (
          <StationCard
            stationId={cardId}
            onMouseEnter={() => setCardId(cardId)}
            onMouseLeave={() => setCardId(null)}
            containerRef={mapBoxRef}
          />
        )}
      </div>

      <Legend />
      <DownloadCta activeLines={linesForRoute(route)} />
    </div>
  );
}
