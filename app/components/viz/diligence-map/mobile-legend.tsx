import { lineColor, lineLabel, type LineId } from "@/lib/diligence-map";

const LINE_ORDER: LineId[] = ["company", "product", "technical"];

// Simplified legend for mobile — just the color-to-line mapping the
// stepper's dots actually use, plus the shared-line note (still relevant:
// two stops in the list are on it). Drops the hub-glyph entry from the
// desktop Legend, which has nothing to refer to since no SVG ever renders
// on mobile.
export function MobileLegend() {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2.5 border-t border-border pt-5 text-sm text-muted">
      {LINE_ORDER.map((line) => (
        <span key={line} className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: lineColor[line] }} />
          {lineLabel[line]}
        </span>
      ))}
      <span className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: lineColor.shared }} />
        {lineLabel.shared} — usable at any stop
      </span>
    </div>
  );
}
