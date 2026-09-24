"use client";

import { orchestrationSkills } from "@/lib/orchestration";
import { trackColor } from "./track-colors";

// The full D-style layered map, always visible — but now it lights up as a
// journey steps through it, instead of being static. Only the active
// path's links are drawn (not all 15 relationships at once), which is what
// keeps this from reading as "messy" the way proto-a's full graph did.
const BANDS: { key: string; title: string; y: number }[] = [
  { key: "presentation", title: "PRESENTATION", y: 70 },
  { key: "synthesis", title: "SYNTHESIS", y: 190 },
  { key: "research", title: "RESEARCH", y: 340 },
  { key: "evidence", title: "EVIDENCE", y: 500 },
];

const POS: Record<string, { x: number; y: number; band: string }> = {
  onbrand: { x: 500, y: 70, band: "presentation" },
  valuecreation: { x: 650, y: 190, band: "synthesis" },
  duediligence: { x: 90, y: 340, band: "research" },
  marketdd: { x: 230, y: 340, band: "research" },
  companypeople: { x: 370, y: 340, band: "research" },
  targetpeople: { x: 510, y: 340, band: "research" },
  cohortlab: { x: 650, y: 340, band: "research" },
  productdd: { x: 790, y: 340, band: "research" },
  technicaldd: { x: 930, y: 340, band: "research" },
  interviewlog: { x: 370, y: 500, band: "evidence" },
};

const W = 1000;
const H = 570;

function curvePath(a: { x: number; y: number }, b: { x: number; y: number }) {
  const midY = (a.y + b.y) / 2;
  return `M ${a.x} ${a.y} C ${a.x} ${midY}, ${b.x} ${midY}, ${b.x} ${b.y}`;
}

export function JourneyMapLayered({
  activatedSlugs,
  currentSlug,
}: {
  activatedSlugs: string[];
  currentSlug: string | null;
}) {
  const activatedSet = new Set(activatedSlugs);

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-background p-6">
      <svg viewBox={`0 0 ${W} ${H}`} className="min-w-[760px] w-full" style={{ height: "auto" }}>
        {BANDS.map((band) => (
          <g key={band.key}>
            <rect x={20} y={band.y - 48} width={W - 40} height={106} rx={8} fill="var(--surface)" stroke="var(--border)" />
            <text x={40} y={band.y - 28} fontSize={10} letterSpacing={2} fill="var(--muted)" fontFamily="var(--font-geist-mono, monospace)">
              {band.title}
            </text>
          </g>
        ))}

        {activatedSlugs.slice(1).map((slug, i) => {
          const from = POS[activatedSlugs[i]];
          const to = POS[slug];
          if (!from || !to) return null;
          return (
            <path
              key={slug}
              d={curvePath(from, to)}
              fill="none"
              stroke="var(--accent)"
              strokeWidth={2}
              opacity={0.7}
            />
          );
        })}

        {orchestrationSkills.map((skill) => {
          const pos = POS[skill.slug];
          if (!pos) return null;
          const active = activatedSet.has(skill.slug);
          const isCurrent = skill.slug === currentSlug;
          return (
            <g key={skill.slug}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r={isCurrent ? 34 : 28}
                fill={active ? trackColor[skill.track] : "var(--background)"}
                stroke={trackColor[skill.track]}
                strokeWidth={isCurrent ? 3 : 1.5}
                opacity={active ? 1 : 0.35}
              />
              <text
                x={pos.x}
                y={pos.y + 48}
                textAnchor="middle"
                fontSize={11}
                fill={active ? "var(--foreground)" : "var(--muted)"}
                fontFamily="var(--font-geist-mono, monospace)"
                opacity={active ? 1 : 0.5}
              >
                {skill.command}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
