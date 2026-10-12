"use client";

import { useState } from "react";
import MemoState0 from "./states/memo-s0";
import MemoState1 from "./states/memo-s1";
import MemoState2 from "./states/memo-s2";

// s0 = Work tab + sources hidden
// s1 = Work tab + sources visible
// s2 = Lineage tab + sources visible
function pick(tab: number, sources: boolean) {
  if (tab === 1) return MemoState2;
  return sources ? MemoState1 : MemoState0;
}

export function MemoTabs() {
  const [tab, setTab] = useState(0);
  const [sources, setSources] = useState(false);
  const ActiveState = pick(tab, sources);

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const target = e.target as Element;

    // Show-sources toggle
    const swbBtn = target.closest(".swb");
    if (swbBtn) {
      setSources((s) => !s);
      return;
    }

    // Work / Lineage tab buttons
    const tabBtn = target.closest('.tabs button, [role="tablist"] button');
    if (tabBtn) {
      const list = tabBtn.closest(".tabs, [role=\"tablist\"]");
      if (!list) return;
      const btns = Array.from(list.querySelectorAll("button"));
      const idx = btns.indexOf(tabBtn as HTMLButtonElement);
      if (idx >= 0) {
        setTab(idx);
        // Switching to Lineage always shows sources; keep existing sources when back to Work
        if (idx === 1) setSources(true);
      }
    }
  }

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: interactive mock-up, handled by buttons inside
    <div onClick={handleClick}>
      <ActiveState />
    </div>
  );
}
