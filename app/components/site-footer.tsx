import { AUTHOR_LINKEDIN_URL, GITHUB_URL } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="mt-auto">
      {/*
        About the author — placeholder section.
        Ismael asked to keep this slot reserved; the full story goes here later.
        Update the copy below in place, no structural changes needed.
      */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            About the author
          </span>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <p className="max-w-xl text-muted">
              Built by Ismael Ghozael. The full story behind the Diligence
              Stack is coming soon.
            </p>
            <a
              href={AUTHOR_LINKEDIN_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-md border border-border px-4 py-2 text-sm transition hover:border-accent hover:text-accent"
            >
              Ismael Ghozael on LinkedIn ↗
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-10 text-xs text-muted sm:flex-row sm:items-center">
        <p>
          © {new Date().getFullYear()} The Diligence Stack. Licensed under{" "}
          <a
            href={`${GITHUB_URL}/blob/main/LICENSE`}
            target="_blank"
            rel="noreferrer noopener"
            className="underline decoration-border underline-offset-4 hover:text-accent hover:decoration-accent"
          >
            CC BY-NC 4.0
          </a>
          .
        </p>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer noopener"
          className="hover:text-accent"
        >
          github.com/IsmaelG/the-diligence-stack
        </a>
      </div>
    </footer>
  );
}
