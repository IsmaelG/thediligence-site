"use client";

import { useState } from "react";
import { VizShell } from "@/app/components/viz/viz-shell";
import { TypingIntro } from "@/app/components/viz/typing-intro";
import { SubwayMap } from "@/app/components/viz/subway-map";
import { StationInfo } from "@/app/components/viz/station-info";
import { fullSystemRoute, stationById } from "@/lib/subway";

export default function ProtoVizN() {
  const [play, setPlay] = useState(false);
  const [currentId, setCurrentId] = useState("start");

  return (
    <VizShell
      eyebrow="Orchestration — proto N"
      title="Type a company. Watch the whole network come online."
      subtitle="Same trigger, the full map this time — all 11 stops, all 3 lines plus shared, building out from ACME one stop at a time."
    >
      <div className="space-y-6">
        {!play && <TypingIntro onSubmit={() => setPlay(true)} />}
        <SubwayMap
          routeOrder={fullSystemRoute}
          play={play}
          onCurrentChange={setCurrentId}
        />
        {play && <StationInfo station={stationById(currentId)} />}
      </div>
    </VizShell>
  );
}
