"use client";

import { useState } from "react";
import PlanState0 from "./states/plan-s0";
import PlanState1 from "./states/plan-s1";
import PlanState2 from "./states/plan-s2";

const STATES = [PlanState0, PlanState1, PlanState2];

export function PlanTabs() {
  const [active, setActive] = useState(0);
  const ActiveState = STATES[active];

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const btn = (e.target as Element).closest(".seg button");
    if (!btn) return;
    const group = btn.closest(".seg");
    if (!group) return;
    const btns = Array.from(group.querySelectorAll("button"));
    const idx = btns.indexOf(btn as HTMLButtonElement);
    if (idx >= 0 && idx !== active) setActive(idx);
  }

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: interactive mock-up, handled by buttons inside
    <div onClick={handleClick}>
      <ActiveState />
    </div>
  );
}
