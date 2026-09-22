import type { Pack } from "@/lib/content";

// Proto A: straightforward extension of the production PackSection — same
// card design, grid goes from 2 to 3 columns, heading updated.
export function PackSectionGrid3({ packs }: { packs: Pack[] }) {
  return (
    <section id="stacks" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            The three stacks
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Pick a question, install a pack.
          </h2>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          {packs.map((pack) => (
            <PackCard key={pack.slug} pack={pack} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PackCard({ pack }: { pack: Pack }) {
  return (
    <div className="flex flex-col rounded-lg border border-border bg-surface p-8">
      <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted">
        {pack.question}
      </p>
      <h3 className="mt-2 text-xl font-semibold tracking-tight">
        {pack.name}
      </h3>
      <p className="mt-3 text-sm text-muted">{pack.tagline}</p>
      <p className="mt-4 overflow-x-auto whitespace-nowrap rounded-md border border-border bg-background px-3 py-2 font-mono text-xs text-accent">
        {pack.flow}
      </p>

      <ul className="mt-6 flex-1 space-y-4">
        {pack.skills.map((skill) => (
          <li key={skill.slug} className="border-t border-border pt-4 first:border-t-0 first:pt-0">
            <div className="flex items-baseline justify-between gap-3">
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
            <p className="mt-1 text-sm text-muted">{skill.blurb}</p>
          </li>
        ))}
      </ul>

      <a
        href={`/downloads/${pack.slug}.zip`}
        className="mt-8 rounded-md bg-accent px-5 py-3 text-center text-sm font-medium text-accent-foreground transition hover:opacity-90"
      >
        Download the {pack.name} ({pack.skills.length} skills)
      </a>
    </div>
  );
}
