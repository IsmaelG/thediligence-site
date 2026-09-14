const steps = [
  {
    label: "Option A",
    title: "The Claude app",
    subtitle: "claude.ai, desktop, or web",
    items: [
      "Download the zip for each skill you want, or a whole pack, from the downloads section below.",
      "In Claude, open Settings → Skills (some accounts say Customize → Skills) and choose Upload skill.",
      "Add each zip — the tools are built to work together.",
    ],
  },
  {
    label: "Option B",
    title: "Claude Code / Cowork",
    subtitle: "on your own computer",
    items: [
      "Copy the folder(s) you want into ~/.claude/skills/, so you end up with ~/.claude/skills/duediligence/SKILL.md.",
      "Restart Claude and type / to see them in the list.",
      "For one project only, use .claude/skills/ inside that project instead.",
    ],
  },
];

export function InstallSection() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            How to install
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Two ways in.
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {steps.map((step) => (
            <div
              key={step.label}
              className="rounded-lg border border-border bg-surface p-8"
            >
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent">
                {step.label}
              </p>
              <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
              <p className="text-sm text-muted">{step.subtitle}</p>
              <ol className="mt-5 space-y-3 text-sm text-muted">
                {step.items.map((item, i) => (
                  <li key={item} className="flex gap-3">
                    <span className="font-mono text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-muted">
          Check it worked — ask Claude:{" "}
          <span className="text-foreground">
            &ldquo;which diligence skills do you have?&rdquo;
          </span>{" "}
          then try one:{" "}
          <code className="font-mono text-accent">
            /duediligence Acme Corp
          </code>
          .
        </p>
      </div>
    </section>
  );
}
