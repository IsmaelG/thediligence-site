import type { Pack, Skill } from "@/lib/content";
import { GITHUB_URL } from "@/lib/content";

export function DownloadsSection({
  packs,
  allSkills,
}: {
  packs: Pack[];
  allSkills: Skill[];
}) {
  return (
    <section id="downloads" className="border-b border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Downloads
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Grab a pack, a single skill, or the source.
          </h2>
          <p className="mt-4 text-sm text-muted">
            Every zip below is built straight from the source in the{" "}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="text-foreground underline decoration-border underline-offset-4 hover:text-accent hover:decoration-accent"
            >
              public GitHub repo
            </a>{" "}
            — nothing is hand-packaged.
          </p>
        </div>

        <div className="mb-10 grid gap-4 sm:grid-cols-2">
          {packs.map((pack) => (
            <a
              key={pack.slug}
              href={`/downloads/${pack.slug}.zip`}
              className="flex items-center justify-between rounded-lg border border-accent/40 bg-background px-6 py-5 transition hover:border-accent"
            >
              <div>
                <p className="font-medium text-foreground">{pack.name}</p>
                <p className="text-sm text-muted">
                  {pack.skills.length} skills, packaged together
                </p>
              </div>
              <span className="font-mono text-sm text-accent">.zip ↓</span>
            </a>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {allSkills.map((skill) => (
            <a
              key={skill.slug}
              href={`/downloads/${skill.slug}.zip`}
              className="flex items-center justify-between rounded-md border border-border bg-background px-4 py-3 text-sm transition hover:border-accent"
            >
              <span className="font-mono text-foreground">
                {skill.command}
              </span>
              <span className="text-xs text-muted">.zip</span>
            </a>
          ))}
        </div>

        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-10 inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 text-sm font-medium transition hover:border-accent hover:text-accent"
        >
          Or clone the full source on GitHub →
        </a>
      </div>
    </section>
  );
}
