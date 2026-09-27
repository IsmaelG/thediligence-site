"use client";

import { useEffect, useState } from "react";

const TARGET = "ACME.COM";
const TYPE_MS = 110;
const PAUSE_AFTER_MS = 500;

// The company dot flashes slowly with a short "what this does" caption
// until typing finishes, then the field submits itself and the rest of
// the map reveals. Runs once per mount.
export function TypingIntro({ onSubmit }: { onSubmit: () => void }) {
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setTyped(TARGET.slice(0, i));
      if (i >= TARGET.length) {
        clearInterval(interval);
        setTimeout(() => {
          setDone(true);
          onSubmit();
        }, PAUSE_AFTER_MS);
      }
    }, TYPE_MS);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto max-w-md">
      <p className="text-center text-sm text-muted">Type a company or a domain to begin.</p>
      <div className="mt-3 flex items-center gap-2 rounded-md border border-accent bg-background px-4 py-3">
        <span className="font-mono text-sm text-foreground">{typed}</span>
        {!done && <span className="h-4 w-px animate-pulse bg-accent" />}
      </div>
    </div>
  );
}
