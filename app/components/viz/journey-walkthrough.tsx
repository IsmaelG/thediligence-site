"use client";

import { useState } from "react";
import { journeys } from "@/lib/journeys";
import { orchestrationSkills } from "@/lib/orchestration";
import { trackColor } from "./track-colors";
import { RevealItem } from "./reveal-item";

// Shared shell for proto-viz-f and proto-viz-g: start from "what are you
// starting with?" (proto-e), then step through the real chain (proto-b's
// sequence) while a persistent full-system map (proto-d or proto-c's
// layout, passed in) lights up node-by-node with minimal connecting links
// (a cleaned-up version of proto-a) — so the full system stays visible the
// whole time, not just the slice being walked.
export function JourneyWalkthrough({
  renderMap,
}: {
  renderMap: (activatedSlugs: string[], currentSlug: string | null) => React.ReactNode;
}) {
  const [journeyId, setJourneyId] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(0);

  const journey = journeys.find((j) => j.id === journeyId) ?? null;
  const activatedSlugs = journey ? journey.steps.slice(0, revealed).map((s) => s.slug) : [];
  const currentSlug = activatedSlugs.at(-1) ?? null;
  const allRevealed = journey ? revealed >= journey.steps.length : false;

  return (
    <div className="space-y-6">
      {renderMap(activatedSlugs, currentSlug)}

      <div className="rounded-lg border border-border bg-background p-6">
        {!journey ? (
          <>
            <div className="mb-5 flex items-center gap-3">
              <span className="rounded-md bg-accent px-3 py-1.5 text-sm font-semibold text-accent-foreground">
                ACME
              </span>
              <p className="text-foreground">What are you starting with?</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {journeys.map((j) => (
                <button
                  key={j.id}
                  type="button"
                  onClick={() => {
                    setJourneyId(j.id);
                    setRevealed(1);
                  }}
                  className="rounded-lg border border-border bg-surface p-4 text-left transition hover:border-accent"
                >
                  <p className="font-medium text-foreground">{j.label}</p>
                  <p className="mt-1.5 text-sm text-muted">{j.description}</p>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="rounded-md bg-accent px-3 py-1.5 text-sm font-semibold text-accent-foreground">
                  ACME
                </span>
                <p className="text-foreground">{journey.label}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setJourneyId(null);
                  setRevealed(0);
                }}
                className="text-xs text-muted underline decoration-border underline-offset-4 hover:text-accent hover:decoration-accent"
              >
                ← start over
              </button>
            </div>

            <ol className="space-y-3">
              {journey.steps.slice(0, revealed).map((step, i) => {
                const skill = orchestrationSkills.find((s) => s.slug === step.slug);
                if (!skill) return null;
                return (
                  <RevealItem key={i}>
                    <li className="flex gap-4 rounded-md border p-3.5" style={{ borderColor: trackColor[skill.track] }}>
                      <span className="shrink-0 font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                      <div>
                        <span className="font-mono text-sm text-foreground">{skill.command}</span>
                        <p className="mt-1 text-sm text-muted">{step.outcome}</p>
                      </div>
                    </li>
                  </RevealItem>
                );
              })}
            </ol>

            {!allRevealed && (
              <button
                type="button"
                onClick={() => setRevealed((r) => r + 1)}
                className="mt-5 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition hover:opacity-90"
              >
                Continue →
              </button>
            )}

            {allRevealed && (
              <RevealItem>
                <p className="mt-5 text-sm text-muted">
                  That&rsquo;s the full chain for this question — the rest of the map stays visible above because
                  ACME usually needs more than one of these at once.
                </p>
              </RevealItem>
            )}
          </>
        )}
      </div>
    </div>
  );
}
