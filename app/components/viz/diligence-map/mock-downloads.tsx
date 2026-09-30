import { packs } from "@/lib/content";
import { linePackSlug, type LineId } from "@/lib/diligence-map";

// A simplified reproduction of the real Downloads section's pack cards,
// for this proto only — demonstrates the "active line highlights the
// matching pack" behavior (point 8) without touching the live
// DownloadsSection yet.
export function MockDownloads({ activeLines }: { activeLines: LineId[] }) {
  const activePackSlugs = new Set(
    activeLines.map((l) => linePackSlug[l]).filter((s): s is string => Boolean(s))
  );

  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
        Demo — selector drives downloads
      </p>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Whichever route is currently playing highlights the pack(s) it touches below — a
        simplified stand-in for the real Downloads section, just for this proto.
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {packs.map((pack) => {
          const active = activePackSlugs.has(pack.slug);
          return (
            <div
              key={pack.slug}
              className={`rounded-lg border p-5 transition ${
                active ? "border-accent bg-surface" : "border-border bg-background opacity-50"
              }`}
            >
              <p className="font-medium text-foreground">{pack.name}</p>
              <p className="mt-2 text-xs text-muted">{pack.tagline}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
