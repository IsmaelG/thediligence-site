"use client";

import { useState } from "react";
import { simpleTracks } from "@/lib/simple-tracks";
import { trackColor } from "./track-colors";

// Proto K — big glyphs, minimal words, built to be readable in 3 seconds.
// Same tab switch as proto J, different visual language: marketing
// explainer, not a technical diagram.
export function TrackIcons() {
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
              t.id === trackId ? "bg-accent text-accent-foreground" : "text-muted hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 rounded-lg border border-border bg-background p-10">
        <div className="flex w-28 flex-col items-center text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-2xl font-semibold text-accent-foreground">
            {track.id === "company" ? "🏢" : "📦"}
          </span>
          <p className="mt-3 text-sm text-foreground">{track.input}</p>
        </div>

        {track.steps.map((step) => (
          <div key={step.command} className="flex items-center gap-6">
            <span className="text-2xl text-muted">→</span>
            <div className="flex w-28 flex-col items-center text-center">
              <span
                className="flex h-16 w-16 items-center justify-center rounded-full border-2 text-2xl"
                style={{ borderColor: trackColor[track.id], color: trackColor[track.id] }}
              >
                {step.icon}
              </span>
              <p className="mt-3 text-sm font-medium text-foreground">{step.title}</p>
            </div>
          </div>
        ))}

        <span className="text-2xl text-muted">→</span>
        <div className="flex w-40 flex-col items-center text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-accent text-2xl">
            ✓
          </span>
          <p className="mt-3 text-sm text-foreground">{track.result}</p>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-muted">{track.footnote}</p>
    </div>
  );
}
