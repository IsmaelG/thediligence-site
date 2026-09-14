import { evidenceMarks, rules } from "@/lib/content";

export function RulesSection() {
  return (
    <section id="rules" className="border-b border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            The rules these tools follow
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Built so you can defend every line in an IC.
          </h2>
        </div>

        <div className="mb-14 flex flex-wrap gap-4">
          {evidenceMarks.map((m) => (
            <div
              key={m.mark}
              className="flex min-w-[220px] flex-1 items-start gap-3 rounded-lg border border-border bg-background p-5"
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-sm font-semibold text-background"
                style={{ backgroundColor: m.color }}
              >
                {m.mark}
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {m.label}
                </p>
                <p className="mt-1 text-sm text-muted">{m.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {rules.map((rule) => (
            <div key={rule.title}>
              <h3 className="text-base font-medium text-foreground">
                {rule.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{rule.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
