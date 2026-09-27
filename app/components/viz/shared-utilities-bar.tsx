import { sharedUtilities } from "@/lib/subway";

// Always visible, never animated — these two aren't stops you travel to,
// they quietly improve whatever artifact comes out of any line, at any
// point in the journey.
export function SharedUtilitiesBar() {
  return (
    <div className="rounded-lg border border-dashed border-border bg-surface/50 p-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
        Always on — improves any artifact, on any line
      </p>
      <div className="mt-3 flex flex-wrap gap-4">
        {sharedUtilities.map((u) => (
          <div key={u.command} className="flex items-center gap-3">
            <span className="font-mono text-xs text-foreground">{u.command}</span>
            <span className="text-xs text-muted">{u.question}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
