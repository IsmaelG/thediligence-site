"use client";

import { useState } from "react";
import { VizShell } from "@/app/components/viz/viz-shell";
import { TypingIntro } from "@/app/components/viz/typing-intro";
import { SubwayMap } from "@/app/components/viz/subway-map";
import { StationInfo } from "@/app/components/viz/station-info";
import { SharedUtilitiesBar } from "@/app/components/viz/shared-utilities-bar";
import { firstMeetingRoute, stationById } from "@/lib/subway";

export default function ProtoVizM() {
  const [play, setPlay] = useState(false);
  const [currentId, setCurrentId] = useState("start");

  return (
    <VizShell
      eyebrow="Orchestration — proto M"
      title="Type a company. Watch the first meeting take shape."
      subtitle="The company stop waits, pulsing. Type a domain and the map draws itself, one stop at a time — the rest of the system stays visible in the background."
    >
      <div className="space-y-6">
        {!play && <TypingIntro onSubmit={() => setPlay(true)} />}
        <SubwayMap
          routeOrder={firstMeetingRoute}
          play={play}
          onCurrentChange={setCurrentId}
        />
        {play && <StationInfo station={stationById(currentId)} />}
        <SharedUtilitiesBar />
      </div>
    </VizShell>
  );
}
