"use client";

import { orchestrationSkills, START } from "@/lib/orchestration";
import { trackColor } from "./track-colors";

// Same "full system stays visible, active path lights up" idea as
// journey-map-layered, on proto-c's radial layout instead — a genuinely
// different spatial read (orbits from a center, not stacked bands).
const CX = 500;
const CY = 430;

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

export function JourneyMapRadial({
  activatedSlugs,
  currentSlug,
}: {
  activatedSlugs: string[];
  currentSlug: string | null;
}) {
  const activatedSet = new Set(activatedSlugs);
  const path = [START, ...activatedSlugs];

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-background p-6">
      <svg viewBox="0 0 1000 860" className="min-w-[700px] w-full" style={{ height: "auto" }}>
        {RINGS.map((r) => (
          <circle key={r} cx={CX} cy={CY} r={r} fill="none" stroke="var(--border)" strokeWidth={1} />
        ))}

        {path.slice(1).map((slug, i) => {
          const from = POS[path[i]];
          const to = POS[slug];
          if (!from || !to) return null;
          return (
            <line
              key={slug}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="var(--accent)"
              strokeWidth={2}
              opacity={0.75}
            />
          );
        })}

        <circle cx={CX} cy={CY} r={34} fill="var(--accent)" />
        <text x={CX} y={CY + 5} textAnchor="middle" fontSize={14} fontWeight={600} fill="var(--accent-foreground)">
          ACME
        </text>

        {orchestrationSkills.map((skill) => {
          const pos = POS[skill.slug];
          if (!pos) return null;
          const active = activatedSet.has(skill.slug);
          const isCurrent = skill.slug === currentSlug;
          const isShared = skill.track === "shared";
          const r = (isShared ? 26 : 34) + (isCurrent ? 6 : 0);
          return (
            <g key={skill.slug}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r={r}
                fill={active ? trackColor[skill.track] : "var(--surface)"}
                stroke={trackColor[skill.track]}
                strokeWidth={isCurrent ? 3 : 2}
                opacity={active ? 1 : 0.4}
              />
              <text x={pos.x} y={pos.y - 2} textAnchor="middle" fontSize={10} fill={active ? "var(--background)" : "var(--foreground)"} fontFamily="var(--font-geist-mono, monospace)" opacity={active ? 1 : 0.55}>
                {skill.command}
              </text>
              <text x={pos.x} y={pos.y + 12} textAnchor="middle" fontSize={8} fill={active ? "var(--background)" : "var(--muted)"} opacity={active ? 0.85 : 0.5}>
                {skill.title.length > 16 ? skill.title.slice(0, 14) + "…" : skill.title}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
