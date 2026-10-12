"use client";

import { useState } from "react";
import PlatformStartState0 from "./states/start-s0";
import PlatformStartState1 from "./states/start-s1";
import PlatformStartState2 from "./states/start-s2";
import PlatformStartState3 from "./states/start-s3";

const STATES = [
  PlatformStartState0,
  PlatformStartState1,
  PlatformStartState2,
  PlatformStartState3,
];

export function PlatformOnboarding() {
  const [active, setActive] = useState(0);
  const ActiveState = STATES[active];

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const btn = (e.target as Element).closest(".stp");
    if (!btn) return;
    const group = btn.closest('[role="group"]');
    if (!group) return;
    const btns = Array.from(group.querySelectorAll(".stp"));
    const idx = btns.indexOf(btn as Element);
    if (idx >= 0 && idx !== active) setActive(idx);
  }

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: interactive mock-up, handled by buttons inside
    <div onClick={handleClick}>
      <ActiveState />
    </div>
  );
}
