"use client";

import { orchestrationEdges, orchestrationSkills, START } from "@/lib/orchestration";
import { trackColor } from "./track-colors";

// Proto C — ACME at the center, 3 spokes fanning out at 120° for the
// company/product/technical tracks (radius = how many steps from ACME),
// with the two shared utilities as small satellites on the opposite side,
// connected by short arcs to whatever they feed.
const CX = 500;
const CY = 460;

// Polar position per node: [angleDeg, radius]. 0° = straight up.
const POLAR: Record<string, [number, number]> = {
  duediligence: [-90, 150],
  marketdd: [-125, 260],
  companypeople: [-70, 260],
  targetpeople: [-70, 380],
  cohortlab: [30, 150],
  productdd: [30, 260],
  valuecreation: [30, 380],
  technicaldd: [-30, 340],
  interviewlog: [190, 150],
  onbrand: [160, 300],
};

function toXY(angleDeg: number, r: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

const POS: Record<string, { x: number; y: number }> = Object.fromEntries(
  Object.entries(POLAR).map(([slug, [a, r]]) => [slug, toXY(a, r)])
);
POS[START] = { x: CX, y: CY };

const RINGS = [150, 260, 380];

export function OrchestrationRadial() {
  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-background p-6">
      <svg viewBox="0 0 1000 900" className="min-w-[700px] w-full" style={{ height: "auto" }}>
        {RINGS.map((r) => (
          <circle key={r} cx={CX} cy={CY} r={r} fill="none" stroke="var(--border)" strokeWidth={1} />
        ))}

        {orchestrationEdges.map((edge, i) => {
          const from = POS[edge.from];
          const to = POS[edge.to];
          if (!from || !to) return null;
          const dashed = edge.kind !== "sequence";
          return (
            <line
              key={i}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="var(--muted)"
              strokeWidth={1.5}
              strokeDasharray={dashed ? "4 4" : undefined}
              opacity={0.55}
            />
          );
        })}

        <circle cx={CX} cy={CY} r={34} fill="var(--accent)" />
        <text
          x={CX}
          y={CY + 5}
          textAnchor="middle"
          fontSize={14}
          fontWeight={600}
          fill="var(--accent-foreground)"
        >
          ACME
        </text>

        {orchestrationSkills.map((skill) => {
          const pos = POS[skill.slug];
          if (!pos) return null;
          const isShared = skill.track === "shared";
          const r = isShared ? 30 : 40;
          return (
            <g key={skill.slug}>
              <circle cx={pos.x} cy={pos.y} r={r} fill="var(--surface)" stroke={trackColor[skill.track]} strokeWidth={2} />
              <text x={pos.x} y={pos.y - 2} textAnchor="middle" fontSize={10.5} fill="var(--foreground)" fontFamily="var(--font-geist-mono, monospace)">
                {skill.command}
              </text>
              <text x={pos.x} y={pos.y + 12} textAnchor="middle" fontSize={8.5} fill="var(--muted)">
                {skill.title.length > 18 ? skill.title.slice(0, 16) + "…" : skill.title}
              </text>
            </g>
          );
        })}
      </svg>

      <p className="mt-4 text-xs text-muted">
        Radius = distance from ACME in the chain. Dashed lines = automatic chains, evidence feeding in, or a restyle pass.
      </p>
    </div>
  );
}
