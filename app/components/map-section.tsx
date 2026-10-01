import { DiligenceMap } from "@/app/components/viz/diligence-map/diligence-map";

// Production-section-styled wrapper around DiligenceMap — matches the
// border/spacing/eyebrow pattern of the other homepage sections (e.g.
// PackSelector), using the same `id="stacks"` so the existing header nav
// link keeps working. Standing in for "the three stacks" in this preview.
export function MapSection() {
  return (
    <section id="stacks" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10 max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            How it works
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            The map.
          </h2>
          <p className="mt-4 max-w-2xl text-balance text-muted">
            Eleven skills, four lines. The train walks the route — hover or
            tap any station for what it takes, what it produces, and the
            source behind it.
          </p>
        </div>

        <DiligenceMap />
      </div>
    </section>
  );
}
