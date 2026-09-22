import type { Pack } from "@/lib/content";

// Proto B: Technical Diligence Stack isn't a peer of the two primary
// stacks — it chains after them. Full-width banner below the main grid,
// visually distinct (accent border, horizontal layout) rather than a third
// equal card.
export function TechnicalAddonBanner({ pack }: { pack: Pack }) {
  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-8 rounded-lg border border-accent/50 bg-background p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              Go deeper — {pack.question}
            </span>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight">
              {pack.name}
            </h3>
            <p className="mt-3 text-sm text-muted">{pack.tagline}</p>
            <p className="mt-4 overflow-x-auto whitespace-nowrap rounded-md border border-border bg-surface px-3 py-2 font-mono text-xs text-accent">
              {pack.flow}
            </p>
          </div>

          <div className="flex flex-col gap-3 lg:w-72 lg:shrink-0">
            {pack.skills.map((skill) => (
              <div
                key={skill.slug}
                className="flex items-center justify-between rounded-md border border-border bg-surface px-4 py-3"
              >
                <span className="font-mono text-sm text-foreground">
                  {skill.command}
                </span>
                <a
                  href={`/downloads/${skill.slug}.zip`}
                  className="shrink-0 text-xs text-muted underline decoration-border underline-offset-4 transition hover:text-accent hover:decoration-accent"
                >
                  download
                </a>
              </div>
            ))}
            <a
              href={`/downloads/${pack.slug}.zip`}
              className="rounded-md bg-accent px-5 py-3 text-center text-sm font-medium text-accent-foreground transition hover:opacity-90"
            >
              Download the pack ({pack.skills.length} skills)
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
