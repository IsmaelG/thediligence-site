"use client";

import { useState } from "react";
import { mockClassifyStack } from "./mock-classify-stack";
import type { Pack } from "@/lib/content";

const PLACEHOLDER =
  "I'm meeting a Series B CEO tomorrow. I want to know whether the product is actually growing…";

export function StackPromptPicker({
  packs,
  onMatch,
}: {
  packs: Pack[];
  onMatch: (slug: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<{ name: string; reason: string } | null>(null);
  const [tried, setTried] = useState(false);

  const submit = () => {
    setTried(true);
    if (!query.trim()) {
      setResult(null);
      return;
    }
    const match = mockClassifyStack(query);
    if (!match) {
      setResult(null);
      return;
    }
    const pack = packs.find((p) => p.slug === match.slug);
    if (!pack) {
      setResult(null);
      return;
    }
    setResult({ name: pack.name, reason: match.reason });
    onMatch(match.slug);
  };

  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          Not sure which one?
        </span>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
          What are you trying to figure out?
        </h2>

        <div className="mt-6">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={PLACEHOLDER}
            rows={3}
            className="w-full resize-none rounded-lg border border-border bg-background p-4 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
          />
          <div className="mt-3 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={submit}
              className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition hover:opacity-90"
            >
              Find my stack
            </button>
            <span className="text-xs text-muted">
              Prototype — matches on keywords, not a real model yet.
            </span>
          </div>
        </div>

        {result && (
          <div className="mt-6 rounded-lg border border-accent/50 bg-background p-5">
            <p className="text-sm text-foreground">
              Looks like{" "}
              <span className="font-medium text-accent">{result.name}</span>{" "}
              fits — {result.reason}
            </p>
            <a
              href="#stacks"
              className="mt-2 inline-block text-xs text-muted underline decoration-border underline-offset-4 hover:text-accent hover:decoration-accent"
            >
              Jump to it ↓
            </a>
          </div>
        )}

        {tried && !result && (
          <div className="mt-6 rounded-lg border border-border bg-background p-5">
            <p className="text-sm text-muted">
              Not sure from that — take a look at all three below.
            </p>
            <a
              href="#stacks"
              className="mt-2 inline-block text-xs text-muted underline decoration-border underline-offset-4 hover:text-accent hover:decoration-accent"
            >
              See all three stacks ↓
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
