import { packs } from "@/lib/content";
import { linePackSlug, type LineId } from "@/lib/diligence-map";

// Real download CTAs — same style as the live PackSelector's button — one
// per pack the currently selected route touches. Replaces the earlier
// MockDownloads demo: these links are functional, not a stand-in.
export function DownloadCta({ activeLines }: { activeLines: LineId[] }) {
  const activeSlugs = new Set(
    activeLines.map((line) => linePackSlug[line]).filter((slug): slug is string => Boolean(slug))
  );
  const activePacks = packs.filter((pack) => activeSlugs.has(pack.slug));

  if (activePacks.length === 0) return null;

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {activePacks.map((pack) => (
        <a
          key={pack.slug}
          href={`/downloads/${pack.slug}.zip`}
          className="inline-block rounded-md bg-accent px-5 py-3 text-center text-sm font-medium text-accent-foreground transition hover:opacity-90"
        >
          Download the {pack.name} ({pack.skills.length} skills)
        </a>
      ))}
    </div>
  );
}
