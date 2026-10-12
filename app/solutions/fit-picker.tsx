"use client";

import { useState } from "react";
import FitState0 from "./states/fit-s0";
import FitState1 from "./states/fit-s1";
import FitState2 from "./states/fit-s2";

const STATES = [FitState0, FitState1, FitState2];

export function FitPicker() {
  const [active, setActive] = useState(0);
  const ActiveState = STATES[active];

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const btn = (e.target as Element).closest(".choice");
    if (!btn) return;
    const group = btn.closest('[role="group"]');
    if (!group) return;
    const btns = Array.from(group.querySelectorAll(".choice"));
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
