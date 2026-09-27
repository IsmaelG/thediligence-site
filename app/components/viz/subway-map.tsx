"use client";

import { useEffect, useState } from "react";
import { stations, segments, stationById, lineColor, type Station } from "@/lib/subway";

const W = 820;
const H = 560;
const STEP_MS = 550;

function segLength(from: Station, to: Station) {
  return Math.hypot(to.x - from.x, to.y - from.y);
}

// Plays `routeOrder` (station ids, "start" first) one stop at a time —
// each new station's connecting segment "draws" in (stroke-dashoffset,
// length-proportional duration) and the station pops in right after.
// Anything not on the route stays visible throughout, in its real track
// color, just dimmed — the rest of the system, always in view.
export function SubwayMap({
  routeOrder,
  play,
  onCurrentChange,
}: {
  routeOrder: string[];
  play: boolean;
  onCurrentChange?: (stationId: string) => void;
}) {
  const [revealedCount, setRevealedCount] = useState(1); // "start" always visible

  useEffect(() => {
    if (!play) return;
    let i = 1;
    const interval = setInterval(() => {
      i += 1;
      setRevealedCount(i);
      onCurrentChange?.(routeOrder[i - 1]);
      if (i >= routeOrder.length) clearInterval(interval);
    }, STEP_MS);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play]);

  const revealedIds = new Set(routeOrder.slice(0, revealedCount));

  // A segment is "on route" once BOTH its endpoints appear in routeOrder —
  // not just when they're adjacent there. Detours (like interviewlog
  // sitting between duediligence and companypeople in the narrative order)
  // would otherwise sever the real duediligence->companypeople segment
  // from ever being marked drawable. It draws once the later of its two
  // endpoints is revealed.
  const stationRevealIndex = new Map(routeOrder.map((id, idx) => [id, idx]));
  const routeSegmentIndex = new Map<string, number>();
  for (const seg of segments) {
    const fromIdx = stationRevealIndex.get(seg.from);
    const toIdx = stationRevealIndex.get(seg.to);
    if (fromIdx !== undefined && toIdx !== undefined) {
      routeSegmentIndex.set(seg.id, Math.max(fromIdx, toIdx));
    }
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-background p-6">
      <svg viewBox={`0 0 ${W} ${H}`} className="min-w-[720px] w-full" style={{ height: "auto" }}>
        {segments.map((seg) => {
          const from = stationById(seg.from);
          const to = stationById(seg.to);
          const length = segLength(from, to);
          const onRoute = routeSegmentIndex.has(seg.id);
          const revealIndex = routeSegmentIndex.get(seg.id) ?? 0;
          const isDrawn = onRoute && revealIndex <= revealedCount - 1;
          const duration = Math.min(900, Math.max(300, length * 2));

          // Dashed (shared-line) segments repeat a short "6 6" pattern, so
          // stroke-dashoffset never actually hides them the way it does
          // for the single-dash solid lines below — offsetting a
          // repeating pattern just shifts its phase. They reveal via
          // opacity instead.
          if (seg.dashed) {
            return (
              <line
                key={seg.id}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={lineColor[seg.line]}
                strokeWidth={onRoute ? 4 : 3}
                strokeLinecap="round"
                strokeDasharray="6 6"
                opacity={onRoute ? (isDrawn ? 1 : 0) : 0.25}
                style={{ transition: "opacity 400ms ease-out" }}
              />
            );
          }

          return (
            <line
              key={seg.id}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={lineColor[seg.line]}
              strokeWidth={onRoute ? 5 : 3}
              strokeLinecap="round"
              opacity={onRoute ? 1 : 0.25}
              strokeDasharray={onRoute ? length : undefined}
              strokeDashoffset={onRoute ? (isDrawn ? 0 : length) : undefined}
              style={onRoute ? { transition: `stroke-dashoffset ${duration}ms ease-out` } : undefined}
            />
          );
        })}

        {stations.map((station) => {
          const onRoute = routeOrder.includes(station.id);
          const shown = !onRoute || revealedIds.has(station.id);
          const isCurrent = onRoute && routeOrder[revealedCount - 1] === station.id;
          const color = station.id === "start" ? "var(--accent)" : lineColor[station.lines[0]];
          const r = station.id === "start" ? 20 : station.interchange ? 14 : 10;

          return (
            <g key={station.id} opacity={shown ? (onRoute ? 1 : 0.35) : 0} style={{ transition: "opacity 300ms ease-out" }}>
              <circle
                cx={station.x}
                cy={station.y}
                r={isCurrent ? r + 4 : r}
                fill={onRoute || station.id === "start" ? color : "var(--surface)"}
                stroke={color}
                strokeWidth={2}
                className={station.id === "start" && !play ? "animate-pulse" : undefined}
              />
              {station.interchange && (
                <circle cx={station.x} cy={station.y} r={r - 5} fill="var(--background)" />
              )}
              <text
                x={station.x}
                y={station.y - r - 10}
                textAnchor="middle"
                fontSize={11}
                fontWeight={600}
                fill="var(--foreground)"
              >
                {station.label}
              </text>
              {station.command && (
                <text x={station.x} y={station.y - r - 22} textAnchor="middle" fontSize={9.5} fill="var(--muted)" fontFamily="var(--font-geist-mono, monospace)">
                  {station.command}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
