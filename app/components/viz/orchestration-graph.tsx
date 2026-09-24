"use client";

import { orchestrationEdges, orchestrationSkills, START } from "@/lib/orchestration";
import { trackColor } from "./track-colors";

// Proto A — the literal, technically-accurate directed graph. Fixed
// hand-placed coordinates (not force-directed) since the graph is small
// and fixed and a laid-out diagram reads far more clearly than an
// auto-layout for 11 nodes.
const POS: Record<string, { x: number; y: number }> = {
  [START]: { x: 60, y: 300 },
  duediligence: { x: 260, y: 150 },
  marketdd: { x: 480, y: 60 },
  companypeople: { x: 480, y: 150 },
  targetpeople: { x: 700, y: 150 },
  cohortlab: { x: 260, y: 460 },
  productdd: { x: 480, y: 460 },
  valuecreation: { x: 700, y: 460 },
  technicaldd: { x: 700, y: 300 },
  interviewlog: { x: 60, y: 580 },
  onbrand: { x: 920, y: 300 },
};

const W = 1040;
const H = 620;
const NODE_W = 150;
const NODE_H = 56;

function edgePath(from: { x: number; y: number }, to: { x: number; y: number }) {
  const midX = (from.x + to.x) / 2;
  return `M ${from.x} ${from.y} C ${midX} ${from.y}, ${midX} ${to.y}, ${to.x} ${to.y}`;
}

export function OrchestrationGraph() {
  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-background p-6">
      <svg viewBox={`0 0 ${W} ${H}`} className="min-w-[900px] w-full" style={{ height: "auto" }}>
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill="var(--muted)" />
          </marker>
        </defs>

        {orchestrationEdges.map((edge, i) => {
          const from = POS[edge.from];
          const to = POS[edge.to];
          if (!from || !to) return null;
          const dashed = edge.kind !== "sequence";
          return (
            <g key={i}>
              <path
                d={edgePath(from, to)}
                fill="none"
                stroke="var(--muted)"
                strokeWidth={1.5}
                strokeDasharray={dashed ? "4 4" : undefined}
                markerEnd="url(#arrow)"
                opacity={0.6}
              />
              {edge.label && (
                <text
                  x={(from.x + to.x) / 2}
                  y={(from.y + to.y) / 2 - 6}
                  textAnchor="middle"
                  fontSize={10}
                  fill="var(--muted)"
                  fontFamily="var(--font-geist-mono, monospace)"
                >
                  {edge.label}
                </text>
              )}
            </g>
          );
        })}

        {/* ACME start node */}
        <foreignObject x={POS[START].x - 40} y={POS[START].y - 24} width={80} height={48}>
          <div className="flex h-full items-center justify-center rounded-md border border-accent bg-accent px-3 text-center text-sm font-semibold text-accent-foreground">
            ACME
          </div>
        </foreignObject>

        {orchestrationSkills.map((skill) => {
          const pos = POS[skill.slug];
          if (!pos) return null;
          return (
            <foreignObject
              key={skill.slug}
              x={pos.x - NODE_W / 2}
              y={pos.y - NODE_H / 2}
              width={NODE_W}
              height={NODE_H}
            >
              <div
                className="flex h-full flex-col justify-center rounded-md border bg-surface px-3 py-1.5"
                style={{ borderColor: trackColor[skill.track] }}
              >
                <span className="font-mono text-[11px] text-foreground">{skill.command}</span>
                <span className="truncate text-[10px] text-muted">{skill.title}</span>
              </div>
            </foreignObject>
          );
        })}
      </svg>

      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted">
        <span className="flex items-center gap-2">
          <span className="inline-block h-px w-5 bg-muted" /> sequence
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-px w-5 border-t border-dashed border-muted" /> auto / feeds / restyles
        </span>
        {(["company", "product", "technical", "shared"] as const).map((t) => (
          <span key={t} className="flex items-center gap-2">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: trackColor[t] }}
            />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
