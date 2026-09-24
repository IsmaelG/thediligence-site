import { simpleTracks } from "@/lib/simple-tracks";
import { trackColor } from "./track-colors";

// Proto H — as plain as this gets: two static rows, always both visible,
// nothing to click. A classic pipeline diagram.
export function Swimlanes() {
  return (
    <div className="space-y-8">
      {simpleTracks.map((track) => (
        <div key={track.id} className="rounded-lg border border-border bg-background p-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{track.label}</p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <div className="rounded-md bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground">
              {track.input}
            </div>
            {track.steps.map((step) => (
              <div key={step.command} className="flex items-center gap-3">
                <span className="text-muted">→</span>
                <div
                  className="rounded-md border bg-surface px-4 py-3"
                  style={{ borderColor: trackColor[track.id] }}
                >
                  <p className="font-mono text-xs text-foreground">{step.command}</p>
                  <p className="text-xs text-muted">{step.title}</p>
                </div>
              </div>
            ))}
            <span className="text-muted">→</span>
            <div className="rounded-md border border-accent/60 bg-surface px-4 py-3">
              <p className="text-sm text-foreground">{track.result}</p>
            </div>
          </div>
          <p className="mt-4 text-xs text-muted">{track.footnote}</p>
        </div>
      ))}
    </div>
  );
}
