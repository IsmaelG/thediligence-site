"use client";

import { useState } from "react";
import type { Pack } from "@/lib/content";

// Proto C: all 3 stacks behind a segmented control instead of a static
// grid — click a stack name to reveal its full card. Scales cleanly if a
// 4th stack is ever added.
export function PackSelectorTabs({ packs }: { packs: Pack[] }) {
  const [activeSlug, setActiveSlug] = useState(packs[0].slug);
  const active = packs.find((p) => p.slug === activeSlug) ?? packs[0];

  return (
    <section id="stacks" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10 max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            The three stacks
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Pick a question, install a pack.
          </h2>
        </div>

        <div
          role="tablist"
          aria-label="Diligence stacks"
          className="mb-8 flex flex-wrap gap-2 border-b border-border pb-4"
        >
          {packs.map((pack) => {
            const isActive = pack.slug === activeSlug;
            return (
              <button
                key={pack.slug}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveSlug(pack.slug)}
                className={`rounded-md px-4 py-2 text-left text-sm transition ${
                  isActive
                    ? "border border-accent bg-surface text-foreground"
                    : "border border-transparent text-muted hover:border-border hover:text-foreground"
                }`}
              >
                <span className="block font-medium">{pack.name}</span>
                <span className="block text-xs text-muted">{pack.question}</span>
              </button>
            );
          })}
        </div>

        <div className="rounded-lg border border-border bg-surface p-8">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted">
            {active.question}
          </p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight">
            {active.name}
          </h3>
          <p className="mt-3 max-w-2xl text-sm text-muted">{active.tagline}</p>
          <p className="mt-4 inline-block overflow-x-auto whitespace-nowrap rounded-md border border-border bg-background px-3 py-2 font-mono text-xs text-accent">
            {active.flow}
          </p>

          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {active.skills.map((skill) => (
              <li key={skill.slug} className="rounded-md border border-border p-4">
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
            href={`/downloads/${active.slug}.zip`}
            className="mt-8 inline-block rounded-md bg-accent px-5 py-3 text-center text-sm font-medium text-accent-foreground transition hover:opacity-90"
          >
            Download the {active.name} ({active.skills.length} skills)
          </a>
        </div>
      </div>
    </section>
  );
}
