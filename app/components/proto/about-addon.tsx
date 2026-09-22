// Proto variant of About for proto-b: Technical Diligence Stack framed as a
// deeper layer on top of the two primary stacks, not a third peer.
export function AboutAddon() {
  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-[auto_1fr] sm:items-start">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            What it is
          </span>
          <div className="max-w-3xl space-y-4 text-muted">
            <p>
              The Diligence Stack is a set of Claude skills for investors,
              operators and product people — the kind of research an
              analyst, a partner, or a founder does before a meeting, a term
              sheet, or a board pack. Ask Claude for a company brief, a
              people map, a retention analysis, or an outreach plan, and it
              runs the skill instead of guessing at the format.
            </p>
            <p>
              It ships as two core packs.{" "}
              <span className="text-foreground">Company Diligence Stack</span>{" "}
              answers &ldquo;is this a good company, and who do I talk
              to?&rdquo;.{" "}
              <span className="text-foreground">Product Diligence Stack</span>{" "}
              answers &ldquo;will the product keep growing, and what breaks
              at 10x?&rdquo;. Once a target is on the table,{" "}
              <span className="text-foreground">Technical Diligence Stack</span>{" "}
              goes one layer deeper — verifying the technical claims behind
              either investigation. Two skills —{" "}
              <code className="font-mono text-sm">interviewlog</code> and{" "}
              <code className="font-mono text-sm">onbrand</code> — are
              shared across all three.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
