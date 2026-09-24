import { simpleTracks } from "@/lib/simple-tracks";
import { trackColor } from "./track-colors";

// Proto I — two cards, side by side, for instant comparison. Also fully
// static.
export function TrackCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {simpleTracks.map((track) => (
        <div key={track.id} className="rounded-lg border border-border bg-background p-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{track.label}</p>
          <p className="mt-2 text-lg font-semibold text-foreground">{track.input}</p>

          <ol className="mt-5 space-y-4">
            {track.steps.map((step, i) => (
              <li key={step.command} className="flex gap-3">
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-xs text-foreground"
                  style={{ borderColor: trackColor[track.id] }}
                >
                  {i + 1}
                </span>
                <div>
                  <p className="font-mono text-sm text-foreground">{step.command}</p>
                  <p className="text-sm text-muted">{step.outcome}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-6 rounded-md border border-accent/50 bg-surface p-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent">You get</p>
            <p className="mt-1 text-sm text-foreground">{track.result}</p>
          </div>

          <p className="mt-4 text-xs text-muted">{track.footnote}</p>
        </div>
      ))}
    </div>
  );
}
