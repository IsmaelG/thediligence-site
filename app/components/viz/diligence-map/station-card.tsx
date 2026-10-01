import { useLayoutEffect, useRef, useState, type RefObject } from "react";
import { stationById, MAP_VIEWBOX } from "@/lib/diligence-map";
import { StationDetail } from "./station-detail";

// Percentages below must be computed against the same padded viewBox MapSvg
// renders with, or the card drifts from the station it's anchored to.
const { w: W, h: H, padX: PAD_X, padY: PAD_Y } = MAP_VIEWBOX;
const FULL_W = W + PAD_X * 2;
const FULL_H = H + PAD_Y * 2;

// How far the card is kept from the map container's own edges once clamped.
const CLAMP_INSET_PX = 12;

export function StationCard({
  stationId,
  onMouseEnter,
  onMouseLeave,
  containerRef,
}: {
  stationId: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  containerRef?: RefObject<HTMLDivElement | null>;
}) {
  const station = stationById(stationId);
  const left = station.x > 620;
  const down = station.y < 350;

  const leftPct = ((station.x + PAD_X) / FULL_W) * 100;
  const topPct = ((station.y + PAD_Y) / FULL_H) * 100;

  // This card is positioned relative to the bordered wrapper in
  // diligence-map.tsx, which has p-6 (24px) padding — but the map SVG it
  // needs to line up with renders inside that padding, at a nested,
  // unpadded scroll container. `calc()` below re-derives "24px inset, then
  // interpolate across the remaining content width" so the card lands where
  // the SVG actually is, without needing to share a positioning ancestor
  // with the SVG (which would put it back inside the horizontal scroller
  // and reintroduce the forced-overflow-y clipping bug).
  const CONTAINER_PAD_PX = 24;

  const cardRef = useRef<HTMLDivElement>(null);
  const [clamp, setClamp] = useState({ dx: 0, dy: 0 });

  // Best-guess anchoring above (left/down flags) picks a good corner most of
  // the time, but a tall card near an edge can still spill past the map
  // container's own border and bleed into the section below it. After each
  // open, measure the rendered card against the container and nudge it back
  // inside — runs before paint so there's no visible jump.
  useLayoutEffect(() => {
    const cardEl = cardRef.current;
    const boxEl = containerRef?.current;
    if (!cardEl || !boxEl) {
      setClamp({ dx: 0, dy: 0 });
      return;
    }
    const cardRect = cardEl.getBoundingClientRect();
    const boxRect = boxEl.getBoundingClientRect();
    let dx = 0;
    let dy = 0;
    if (cardRect.left < boxRect.left + CLAMP_INSET_PX) {
      dx += boxRect.left + CLAMP_INSET_PX - cardRect.left;
    } else if (cardRect.right > boxRect.right - CLAMP_INSET_PX) {
      dx -= cardRect.right - (boxRect.right - CLAMP_INSET_PX);
    }
    if (cardRect.top < boxRect.top + CLAMP_INSET_PX) {
      dy += boxRect.top + CLAMP_INSET_PX - cardRect.top;
    } else if (cardRect.bottom > boxRect.bottom - CLAMP_INSET_PX) {
      dy -= cardRect.bottom - (boxRect.bottom - CLAMP_INSET_PX);
    }
    setClamp({ dx, dy });
  }, [stationId, containerRef]);

  return (
    <div
      ref={cardRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute z-10 w-[280px] rounded-lg border border-border bg-surface p-3.5 shadow-xl"
      style={{
        left: `calc(${CONTAINER_PAD_PX}px + (100% - ${CONTAINER_PAD_PX * 2}px) * ${leftPct} / 100)`,
        top: `calc(${CONTAINER_PAD_PX}px + (100% - ${CONTAINER_PAD_PX * 2}px) * ${topPct} / 100)`,
        transform: `translate(${left ? "-100%" : "0%"}, ${down ? "0%" : "-100%"}) translate(${left ? "-16px" : "16px"}, ${down ? "16px" : "-16px"}) translate(${clamp.dx}px, ${clamp.dy}px)`,
      }}
    >
      <StationDetail station={station} />
    </div>
  );
}
