import Link from "next/link";
import { GITHUB_URL } from "@/lib/content";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-mono text-sm text-accent">[TDS]</span>
          <span className="text-sm font-medium tracking-tight">
            The Diligence Stack
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-muted">
          <a href="#stacks" className="hidden hover:text-foreground sm:inline">
            Stacks
          </a>
          <a href="#rules" className="hidden hover:text-foreground sm:inline">
            The rules
          </a>
          <a
            href="#downloads"
            className="hidden hover:text-foreground sm:inline"
          >
            Downloads
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-md border border-border px-3 py-1.5 text-foreground transition hover:border-accent hover:text-accent"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
