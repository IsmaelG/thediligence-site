"use client";

import { useEffect, useState } from "react";
import { TypingIntro } from "@/app/components/viz/typing-intro";
import { MapSvg } from "./map-svg";
import { NowPanel } from "./now-panel";
import { RouteControls } from "./route-controls";
import { StationCard } from "./station-card";
import { MockDownloads } from "./mock-downloads";
import { routeById, linesForRoute } from "@/lib/diligence-map";

const DWELL_MS = 3600;
const TICK_MS = 60;

export function DiligenceMap() {
  const [started, setStarted] = useState(false);
  const [routeId, setRouteId] = useState("full");
  const [stepIndex, setStepIndex] = useState(0);
  const [playing, setPlaying] = useState(
    () => typeof window === "undefined" || !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [progress, setProgress] = useState(0);
  const [cardId, setCardId] = useState<string | null>(null);

  const route = routeById(routeId);

  useEffect(() => {
    if (!started || !playing || cardId) return;
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
  }, [started, playing, cardId, route.stops.length]);

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

  const currentStationId = started ? route.stops[stepIndex] : null;
  const activeIds = new Set(started ? route.stops : []);

  return (
    <div className="space-y-6">
      {!started && <TypingIntro onSubmit={() => setStarted(true)} />}

      {started && (
        <>
          <RouteControls
            activeRouteId={routeId}
            playing={playing}
            onSelectRoute={selectRoute}
            onPrev={() => step(-1)}
            onNext={() => step(1)}
            onTogglePlay={() => setPlaying((p) => !p)}
          />

          <NowPanel route={route} stepIndex={stepIndex} progress={progress} />

          <div className="relative rounded-lg border border-border bg-background p-6">
            {/* Only the SVG scrolls horizontally on narrow screens — the
                hover/tap card renders outside this scroller so it never gets
                clipped by the scroll container's implicit overflow-y. */}
            <div className="overflow-x-auto">
              <div className="min-w-[900px]">
                <MapSvg
                  activeIds={activeIds}
                  currentId={currentStationId}
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
              />
            )}
          </div>

          <MockDownloads activeLines={linesForRoute(route)} />
        </>
      )}
    </div>
  );
}
