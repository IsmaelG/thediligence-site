"use client";

import { stations, trackSegments, lineColor, MAP_VIEWBOX } from "@/lib/diligence-map";

const { w: W, h: H, padX: PAD_X, padY: PAD_Y } = MAP_VIEWBOX;

export function MapSvg({
  activeIds,
  currentId,
  onEnter,
  onLeave,
  onSelect,
}: {
  activeIds: Set<string>;
  currentId: string | null;
  onEnter: (id: string) => void;
  onLeave: () => void;
  onSelect: (id: string) => void;
}) {
  return (
    <svg
      viewBox={`${-PAD_X} ${-PAD_Y} ${W + PAD_X * 2} ${H + PAD_Y * 2}`}
      className="w-full"
      style={{ height: "auto" }}
      role="group"
      aria-label="Diligence Stack subway map"
    >
      {trackSegments.map((seg) => (
        <path
          key={seg.id}
          d={seg.d}
          fill="none"
          stroke={lineColor[seg.line]}
          strokeWidth={seg.dashed ? 4 : 7}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={seg.dashed ? "2 9" : undefined}
          opacity={seg.line === "shared" ? 0.5 : 1}
        />
      ))}

      {stations.map((station) => {
        const active = activeIds.has(station.id);
        const isCurrent = station.id === currentId;
        const color = lineColor[station.line];
        const labelY1 = station.labelSide === "below" ? station.y + 32 : station.y - 24 - 17;
        const labelY2 = station.labelSide === "below" ? station.y + 32 + 17 : station.y - 24;
        const scale = isCurrent ? 1.45 : 1;

        return (
          <g
            key={station.id}
            role="button"
            tabIndex={0}
            aria-label={`${station.command}: ${station.q}`}
            onMouseEnter={() => onEnter(station.id)}
            onMouseLeave={onLeave}
            onFocus={() => onEnter(station.id)}
            onBlur={onLeave}
            onClick={() => onSelect(station.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(station.id);
              }
            }}
            style={{ cursor: "pointer", opacity: active ? 1 : 0.3, transition: "opacity 300ms ease-out" }}
          >
            <rect
              x={station.x - 66}
              y={station.y - 49}
              width={132}
              height={98}
              fill="transparent"
            />
            <g style={{ transform: `scale(${scale})`, transformOrigin: `${station.x}px ${station.y}px`, transition: "transform 300ms ease-out" }}>
              {station.hub ? (
                <rect
                  x={station.x - 15}
                  y={station.y - 11}
                  width={30}
                  height={22}
                  rx={11}
                  fill="var(--background)"
                  stroke="var(--foreground)"
                  strokeWidth={3}
                />
              ) : (
                <circle cx={station.x} cy={station.y} r={9} fill="var(--background)" stroke={color} strokeWidth={3} />
              )}
              <text
                x={station.x}
                y={labelY1}
                textAnchor="middle"
                fontSize={13}
                fontWeight={600}
                fill={color}
                fontFamily="var(--font-geist-mono, monospace)"
              >
                {station.command}
                {station.coming ? " · coming" : ""}
              </text>
              <text
                x={station.x}
                y={labelY2}
                textAnchor="middle"
                fontSize={12}
                fill={isCurrent ? "var(--foreground)" : "var(--muted)"}
              >
                {station.sq}
              </text>
            </g>
          </g>
        );
      })}
    </svg>
  );
}
