import { lineColor, lineLabel, type LineId } from "@/lib/diligence-map";

const LINE_ORDER: LineId[] = ["company", "product", "technical"];

// Sits directly below the map — solid swatches for the 3 real lines, a
// dashed swatch for the shared line, and what the pill-shaped hub glyph
// means, all in the site's existing tokens.
export function Legend() {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-5 text-xs text-muted">
      {LINE_ORDER.map((line) => (
        <span key={line} className="flex items-center gap-2">
          <span className="h-[3px] w-6 rounded-full" style={{ backgroundColor: lineColor[line] }} />
          {lineLabel[line]}
        </span>
      ))}

      <span className="flex items-center gap-2">
        <svg width="24" height="8" aria-hidden="true">
          <line
            x1="1"
            y1="4"
            x2="23"
            y2="4"
            stroke={lineColor.shared}
            strokeWidth="2"
            strokeDasharray="2 4"
            strokeLinecap="round"
          />
        </svg>
        {lineLabel.shared} — usable at any stop
      </span>

      <span className="flex items-center gap-2">
        <svg width="22" height="14" aria-hidden="true">
          <rect
            x="2"
            y="1"
            width="18"
            height="12"
            rx="6"
            fill="var(--background)"
            stroke="var(--foreground)"
            strokeWidth="2"
          />
        </svg>
        Hub — several skills converge here
      </span>
    </div>
  );
}
