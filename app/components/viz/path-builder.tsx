"use client";

import { useState } from "react";
import { trackColor } from "./track-colors";
import { RevealItem } from "./reveal-item";
import type { Track } from "@/lib/orchestration";

// Proto E — a simulator, not a diagram. Pick what you're starting with on
// ACME; the skill chain that would actually fire reveals step by step,
// each with a plausible (invented) finding, ending in the outline of the
// memo that chain produces.
type PathStep = {
  command: string;
  track: Track;
  finding: string;
};

type StartOption = {
  id: string;
  label: string;
  description: string;
  steps: PathStep[];
  outline: string[];
};

const OPTIONS: StartOption[] = [
  {
    id: "name-only",
    label: "Just the company name",
    description: "I need the full picture on ACME before a first call.",
    steps: [
      {
        command: "/duediligence",
        track: "company",
        finding:
          "ACME Corp — €340M revenue, PE-backed since 2022, new CDO hired from a hyperscaler 6 months ago [B].",
      },
      {
        command: "/marketdd",
        track: "company",
        finding: "Auto-triggered — no recent market report existed. EU payments infra: €12B, 14% CAGR [B].",
      },
      {
        command: "/companypeople",
        track: "company",
        finding: "Exec committee mapped — 6 direct reports; the CDO owns the core platform roadmap.",
      },
      {
        command: "/targetpeople",
        track: "company",
        finding: "3 realistic routes to the CDO ranked — a shared-advisor intro scores highest.",
      },
    ],
    outline: [
      "Header band — ACME, HQ, revenue, employees",
      "The read — 5 judgement bullets + conversation hook",
      "Market context — sizing, growth, value chain (from /marketdd)",
      "Strategy & competitor comparison",
      "Ownership & the PE hold-period read",
      "Leadership — exec table + the digital-owner box",
      "SWOT — evidence-backed, S/W weighted",
      "Who to talk to — ranked outreach routes + drafted opener",
    ],
  },
  {
    id: "sales-export",
    label: "A raw sales export",
    description: "I want to know if ACME's product actually keeps customers.",
    steps: [
      {
        command: "/cohortlab",
        track: "product",
        finding: "Recomputed from raw rows — Year-2 cohorts retain 71%, up from 54% two years ago.",
      },
      {
        command: "/interviewlog",
        track: "shared",
        finding: "4 customer reference calls logged — quotes ready to cite in the memo.",
      },
      {
        command: "/productdd",
        track: "product",
        finding: "Verdict: Invest — retention curve flattens, but pricing hasn't kept pace with expansion.",
      },
      {
        command: "/valuecreation",
        track: "product",
        finding: "3 sized levers identified — repricing alone models to +€8M ARR in year one.",
      },
    ],
    outline: [
      "Score on page one — Invest / Conditional / Pass",
      "8 areas of evidence, each scored",
      "Cohort curves — NRR/GRR bridge (from /cohortlab)",
      "Market map + competitor set",
      "Red flags — what still needs checking",
      "The plan — 3 levers, sized, with a 100-day sequence",
      "The board ask, in one slide",
    ],
  },
  {
    id: "vendor-claim",
    label: "A technical claim I need to verify",
    description: "ACME says they're \"API-first\" and \"enterprise-grade.\" Prove it.",
    steps: [
      {
        command: "/technicaldd",
        track: "technical",
        finding: "Runs after /duediligence or /productdd — assumes ACME is already an identified target.",
      },
      {
        command: "/technicaldd",
        track: "technical",
        finding: "External probe: documented REST API, no MCP server, no llms.txt — partial agent readiness.",
      },
      {
        command: "/technicaldd",
        track: "technical",
        finding: "Architecture axis: 2 of 6 axes have zero evidence — verdict capped at Conditional.",
      },
      {
        command: "/onbrand",
        track: "shared",
        finding: "The scorecard gets re-skinned in ACME's own colours before it's shared back with them.",
      },
    ],
    outline: [
      "Scorecard — 6 axes, each scored 0-5 with a confidence tag",
      "APIs & agent readiness — what's discoverable from outside",
      "Architecture — real decoupling, or modules in name only",
      "SLA / latency — published vs. independently measured",
      "Security & compliance — GDPR, MFA, license risk",
      "Ceiling rule applied — verdict capped where evidence is thin",
      "Feeds back into the calling /duediligence or /productdd memo",
    ],
  },
];

export function PathBuilder() {
  const [selected, setSelected] = useState<StartOption | null>(null);
  const [revealed, setRevealed] = useState(0);

  const choose = (opt: StartOption) => {
    setSelected(opt);
    setRevealed(1);
  };

  const reset = () => {
    setSelected(null);
    setRevealed(0);
  };

  if (!selected) {
    return (
      <div className="rounded-lg border border-border bg-background p-8">
        <div className="mb-6 flex items-center gap-3">
          <span className="rounded-md bg-accent px-3 py-1.5 text-sm font-semibold text-accent-foreground">
            ACME
          </span>
          <p className="text-foreground">What are you starting with?</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => choose(opt)}
              className="rounded-lg border border-border bg-surface p-5 text-left transition hover:border-accent"
            >
              <p className="font-medium text-foreground">{opt.label}</p>
              <p className="mt-2 text-sm text-muted">{opt.description}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const allRevealed = revealed >= selected.steps.length;

  return (
    <div className="rounded-lg border border-border bg-background p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="rounded-md bg-accent px-3 py-1.5 text-sm font-semibold text-accent-foreground">
            ACME
          </span>
          <p className="text-foreground">{selected.label}</p>
        </div>
        <button
          type="button"
          onClick={reset}
          className="text-xs text-muted underline decoration-border underline-offset-4 hover:text-accent hover:decoration-accent"
        >
          ← start over
        </button>
      </div>

      <ol className="space-y-4">
        {selected.steps.slice(0, revealed).map((step, i) => (
          <RevealItem key={i}>
            <li className="flex gap-4 rounded-md border p-4" style={{ borderColor: trackColor[step.track] }}>
              <span className="shrink-0 font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <span className="font-mono text-sm text-foreground">{step.command}</span>
                <p className="mt-1 text-sm text-muted">{step.finding}</p>
              </div>
            </li>
          </RevealItem>
        ))}
      </ol>

      {!allRevealed && (
        <button
          type="button"
          onClick={() => setRevealed((r) => r + 1)}
          className="mt-6 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition hover:opacity-90"
        >
          Continue →
        </button>
      )}

      {allRevealed && (
        <RevealItem>
          <div className="mt-8 rounded-md border border-accent/50 bg-surface p-5">
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent">
              What lands in your inbox
            </p>
            <ul className="mt-3 space-y-1.5 text-sm text-muted">
              {selected.outline.map((line) => (
                <li key={line}>— {line}</li>
              ))}
            </ul>
          </div>
        </RevealItem>
      )}
    </div>
  );
}
