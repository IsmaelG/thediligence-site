"use client";

import { useEffect, useRef, useState } from "react";
import { MapSvg } from "./map-svg";
import { NowPanel } from "./now-panel";
import { RouteControls } from "./route-controls";
import { StationCard } from "./station-card";
import { MobileStepper } from "./mobile-stepper";
import { Legend } from "./legend";
import { MobileLegend } from "./mobile-legend";
import { DownloadCta } from "./download-cta";
import { MobileDownloadCta } from "./mobile-download-cta";
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
  // Mobile accordion state — fully decoupled from the desktop autoplay
  // model above. Mobile always shows the full-tour list (no route
  // selection there), with at most one row open at a time, none by default.
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const mapBoxRef = useRef<HTMLDivElement>(null);

  const route = routeById(routeId);
  const mobileRoute = routeById("full");

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

  // Mobile row tap: toggle that row open/closed; at most one open at a time.
  const toggleExpanded = (id: string) => {
    setExpandedId((cur) => (cur === id ? null : id));
  };

  const currentStationId = route.stops[stepIndex];
  const activeIds = new Set(route.stops);

  return (
    <div className="space-y-6">
      {/* Route selection + transport controls + the autoplay Now panel are
          desktop-only — mobile has no route switching (always full-tour)
          and no autoplay to control or visualize. */}
      <div className="hidden sm:block">
        <RouteControls
          activeRouteId={routeId}
          playing={playing}
          onSelectRoute={selectRoute}
          onPrev={() => step(-1)}
          onNext={() => step(1)}
          onTogglePlay={() => setPlaying((p) => !p)}
        />
      </div>

      <div className="hidden sm:block">
        <NowPanel route={route} stepIndex={stepIndex} progress={progress} />
      </div>

      {/* Below `sm`, no SVG diagram at all (Option 1) — a plain tap-to-
          expand/collapse accordion over the full tour instead, with no
          autoplay. At `sm` and above, the full subway map + autoplay
          renders as before. */}
      <div className="sm:hidden">
        <MobileStepper route={mobileRoute} expandedId={expandedId} onToggle={toggleExpanded} />
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

      <div className="hidden sm:block">
        <Legend />
      </div>
      <div className="sm:hidden">
        <MobileLegend />
      </div>

      <div className="hidden sm:flex">
        <DownloadCta activeLines={linesForRoute(route)} />
      </div>
      <div className="sm:hidden">
        <MobileDownloadCta />
      </div>
    </div>
  );
}
