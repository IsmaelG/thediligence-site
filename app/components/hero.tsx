import { GITHUB_URL } from "@/lib/content";

export function Hero() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          Claude skills for investors, operators and product people
        </p>
        <h1 className="mt-6 max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
          Know more about a company than the person across the table.
        </h1>
        <p className="mt-6 max-w-2xl text-balance text-lg text-muted">
          Eight Claude Skills that turn a company name, a call transcript, or
          a sales export into decision-grade diligence — company research,
          people maps, outreach, cohort analysis, and value-creation plans.
          Every number marked, every claim sourced.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#downloads"
            className="rounded-md bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition hover:opacity-90"
          >
            Get the skills
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-md border border-border px-5 py-3 text-sm font-medium transition hover:border-accent hover:text-accent"
          >
            View source on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
