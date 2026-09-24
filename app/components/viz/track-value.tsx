"use client";

import { useState } from "react";
import { simpleTracks } from "@/lib/simple-tracks";
import { trackColor } from "./track-colors";

// Proto L — flips the emphasis from process to value: what you start with,
// what you end up with. The skill chain is present but de-emphasized, a
// small strip between two bigger, bolder statements.
export function TrackValue() {
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

      <div className="rounded-lg border border-border bg-background p-8">
        <div className="grid gap-8 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted">You have</p>
            <p className="mt-2 text-2xl font-semibold text-foreground">{track.input}</p>
            <p className="mt-2 text-sm text-muted">
              {track.id === "company" ? "Just a name, before a first call." : "A raw sales export, maybe some call notes."}
            </p>
          </div>

          <div className="text-center text-2xl text-accent">→</div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent">You get</p>
            <p className="mt-2 text-2xl font-semibold text-foreground">{track.result}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-border pt-6">
          <span className="text-xs text-muted">via</span>
          {track.steps.map((step, i) => (
            <span key={step.command} className="flex items-center gap-2">
              {i > 0 && <span className="text-muted">·</span>}
              <span
                className="rounded-md border px-2.5 py-1 font-mono text-xs text-foreground"
                style={{ borderColor: trackColor[track.id] }}
              >
                {step.command}
              </span>
            </span>
          ))}
        </div>

        <p className="mt-4 text-xs text-muted">{track.footnote}</p>
      </div>
    </div>
  );
}
