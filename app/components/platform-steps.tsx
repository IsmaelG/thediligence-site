"use client";

import { useState } from "react";

interface Step {
  n: string;
  title: string;
  description: string;
  illustration: React.ReactNode;
}

interface PlatformStepsProps {
  steps: Step[];
}

export function PlatformSteps({ steps }: PlatformStepsProps) {
  const [active, setActive] = useState(0);
  const step = steps[active];

  return (
    <div>
      {/* Step picker */}
      <div
        style={{
          display: "flex",
          gap: "var(--sp-4)",
          flexWrap: "wrap",
          marginBottom: "var(--sp-40)",
        }}
      >
        {steps.map((s, i) => (
          <button
            key={s.n}
            type="button"
            onClick={() => setActive(i)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--sp-8)",
              padding: "var(--sp-8) var(--sp-16)",
              background: active === i ? "var(--fg)" : "var(--bg2)",
              color: active === i ? "var(--bg)" : "var(--fg2)",
              border: "1px solid var(--line)",
              borderRadius: "var(--r-4)",
              fontFamily: "var(--mono)",
              fontSize: "var(--fs-small)",
              cursor: "pointer",
              transition: "background 0.15s, color 0.15s",
            }}
          >
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: "var(--fs-tiny)",
                opacity: 0.7,
              }}
            >
              {s.n}
            </span>
            {s.title}
          </button>
        ))}
      </div>

      {/* Active step */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
          gap: "var(--gap-xl)",
          alignItems: "start",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "var(--mono)",
              fontSize: "var(--fs-small)",
              color: "var(--fg3)",
              marginBottom: "var(--sp-8)",
            }}
          >
            Step {step.n}
          </p>
          <h2
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(24px, 3vw, 44px)",
              color: "var(--fg)",
              marginBottom: "var(--sp-16)",
              lineHeight: 1.1,
            }}
          >
            {step.title}
          </h2>
          <p
            className="body"
            style={{ color: "var(--fg2)", maxWidth: "44ch" }}
          >
            {step.description}
          </p>
        </div>
        <div className="card" style={{ fontFamily: "var(--mono)", fontSize: "var(--fs-small)" }}>
          {step.illustration}
        </div>
      </div>
    </div>
  );
}
