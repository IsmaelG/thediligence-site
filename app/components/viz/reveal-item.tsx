"use client";

import { useEffect, useState } from "react";

// Small mount-triggered fade/slide-in — no animation library in this repo,
// so this is the plain-CSS-transition equivalent (toggle a class one tick
// after mount).
export function RevealItem({ children }: { children: React.ReactNode }) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setShown(true), 10);
    return () => clearTimeout(id);
  }, []);
  return (
    <div
      className={`transition-all duration-500 ease-out ${
        shown ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}
