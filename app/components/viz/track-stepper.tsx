"use client";

import { useState } from "react";
import { simpleTracks } from "@/lib/simple-tracks";
import { trackColor } from "./track-colors";

// Proto J — one visible track at a time, switched with a simple 2-option
// tab, shown as a classic onboarding-style numbered stepper. The only
// interaction is the tab switch.
export function TrackStepper() {
  const [trackId, setTrackId] = useState<"company" | "product">("company");
  const track = simpleTracks.find((t) => t.id === trackId)!;

  return (
    <div>
      <div className="mb-8 inline-flex rounded-md border border-border bg-background p-1">
        {simpleTracks.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTrackId(t.id)}
            className={`rounded px-4 py-2 text-sm font-medium transition ${
              t.id === trackId
                ? "bg-accent text-accent-foreground"
                : "text-muted hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="rounded-lg border border-border bg-background p-8">
        <p className="text-sm text-muted">
          Starting from <span className="text-foreground">{track.input}</span>
        </p>

        <div className="mt-6 flex flex-wrap items-start gap-2 sm:flex-nowrap">
          {track.steps.map((step, i) => (
            <div key={step.command} className="flex flex-1 items-start gap-2">
              <div className="flex flex-col items-center text-center">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-background"
                  style={{ backgroundColor: trackColor[track.id] }}
                >
                  {i + 1}
                </span>
                <p className="mt-2 font-mono text-xs text-foreground">{step.command}</p>
                <p className="mt-1 max-w-[140px] text-xs text-muted">{step.outcome}</p>
              </div>
              {i < track.steps.length - 1 && (
                <div className="mt-5 h-px flex-1 bg-border" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-md border border-accent/50 bg-surface p-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent">You get</p>
          <p className="mt-1 text-sm text-foreground">{track.result}</p>
        </div>

        <p className="mt-4 text-xs text-muted">{track.footnote}</p>
      </div>
    </div>
  );
}
