export const metadata = {
  title: "Insights — TheDiligence",
  description:
    "Notes on evidence, cost and the method from the two of us. Short, practical notes on how to run a diligence you can defend.",
};

const PUBLISHED = [
  {
    tag: "Method",
    status: "Draft",
    title: "Why every claim gets a grade.",
    body: "A memo is a pile of claims. Some come from a filing, some from a call, some from a model that sounded sure. If they all look the same on the page, the committee cannot tell which ones to push on.",
    body2: "We grade each claim A, B or C, tie it to a source id, and let the memo say how much of a section rests on each. It takes a minute to read, and it changes the meeting.",
    grades: [
      { g: "A" as const, filled: true, label: "In a filing, a contract or a data export" },
      { g: "B" as const, label: "Reported by a credible source" },
      { g: "C" as const, label: "An estimate, and flagged as one" },
    ],
    cta: "See it on a memo",
    ctaHref: "/products#memo",
  },
];

const COMING_NEXT = [
  { tag: "Platform", status: "Planned", title: "Know the cost before you build the memo", body: "Why we price every agent before anything runs, and what a cap changes about how you use a model." },
  { tag: "Platform", status: "Planned", title: "The verifier must not be the writer", body: "What a second model family catches that the first one, however good, does not." },
  { tag: "Security", status: "Planned", title: "Why an agent should never hold your key", body: "The run token, the broker, and what prompt injection looks like in a founder deck." },
  { tag: "Method", status: "Planned", title: "Reading a retention triangle in five minutes", body: "What to look for in cohorts before you believe the growth story." },
  { tag: "Practice", status: "Planned", title: "What a gate is for", body: "The one decision we never hand to an agent, and how a good committee uses it." },
  { tag: "Practice", status: "Planned", title: "The first 100 days, from the memo", body: "How sized levers turn a diligence into a plan the board can hold you to." },
];

function Grade({ g, filled }: { g: "A" | "B" | "C"; filled?: boolean }) {
  return (
    <span className={`gr${g === "A" && filled ? " gr-a" : ""}${g === "C" ? " gr-c" : ""}`} style={{ width: 20, height: 20, fontSize: 11, flexShrink: 0 }}>{g}</span>
  );
}

export default function InsightsPage() {
  return (
    <main id="main-content">
      {/* Hero */}
      <section className="hero sec" style={{ paddingBottom: "var(--sp-64)" }}>
        <div className="wrap" style={{ maxWidth: "var(--head-max)" }}>
          <p className="eyebrow" style={{ marginBottom: "var(--sp-16)" }}>Insights</p>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h1-page)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h1)", lineHeight: "var(--lh-h1)", marginBottom: "var(--sp-24)" }}>
            Notes on evidence, cost and the method.
          </h1>
          <p className="lead" style={{ maxWidth: "56ch", marginBottom: "var(--sp-40)" }}>
            Short, practical notes from the two of us on how to run a diligence you can defend. They go out here and on LinkedIn.
          </p>
          <div style={{ display: "flex", gap: "var(--gap-s)" }}>
            <a href="https://linkedin.com/in/ismaelghozael" target="_blank" rel="noopener noreferrer" className="btn btn-s">Follow Ismael</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="btn btn-s">Follow Mazen</a>
          </div>
        </div>
      </section>

      {/* Published articles */}
      {PUBLISHED.map((article) => (
        <section key={article.title} className="sec alt">
          <div className="wrap">
            <div style={{ maxWidth: "var(--wrap-n)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--sp-10)", marginBottom: "var(--sp-20)" }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--mut)" }}>{article.tag}</span>
                <span className="status st-build" style={{ fontSize: "11px" }}>{article.status}</span>
              </div>
              <h2 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h2)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h2)", lineHeight: "var(--lh-h2)", marginBottom: "var(--sp-32)" }}>
                {article.title}
              </h2>
              <p className="body" style={{ maxWidth: "60ch", marginBottom: "var(--sp-20)" }}>{article.body}</p>
              <p className="body" style={{ maxWidth: "60ch", marginBottom: "var(--sp-40)" }}>{article.body2}</p>

              {article.grades && (
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-16)", marginBottom: "var(--sp-40)" }}>
                  {article.grades.map(({ g, filled, label }) => (
                    <div key={g} style={{ display: "flex", alignItems: "center", gap: "var(--sp-14)" }}>
                      <Grade g={g} filled={filled} />
                      <span className="body" style={{ color: "var(--fg2)" }}>{label}</span>
                    </div>
                  ))}
                </div>
              )}

              <a href={article.ctaHref} className="btn btn-s">{article.cta}</a>
            </div>
          </div>
        </section>
      ))}

      {/* Coming next */}
      <section className="sec">
        <div className="wrap">
          <div style={{ maxWidth: "var(--head-max)", marginBottom: "var(--head-mb)" }}>
            <p className="eyebrow" style={{ marginBottom: "var(--sp-16)" }}>Coming next</p>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h2)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h2)", lineHeight: "var(--lh-h2)", marginBottom: "var(--sp-24)" }}>
              What we are writing.
            </h2>
            <p className="lead" style={{ maxWidth: "52ch" }}>
              These are the notes we have planned. We will publish them when they are ready, not before.
            </p>
          </div>

          <div className="g3">
            {COMING_NEXT.map((note) => (
              <div key={note.title} className="card" style={{ display: "flex", flexDirection: "column", gap: "var(--sp-12)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--sp-8)" }}>
                  <span style={{ fontFamily: "var(--mono)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--mut)" }}>{note.tag}</span>
                  <span className="status st-plan" style={{ fontSize: "11px" }}>{note.status}</span>
                </div>
                <h3 style={{ fontSize: "17px", fontWeight: "var(--fw-semibold)", lineHeight: 1.3, margin: 0 }}>{note.title}</h3>
                <p className="small" style={{ margin: 0, color: "var(--fg2)", lineHeight: 1.55 }}>{note.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="band">
        <div className="wrap" style={{ textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h2)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h2)", lineHeight: "var(--lh-h2)", color: "var(--bg)", marginBottom: "var(--sp-24)" }}>
            Read the method. Or run it.
          </h2>
          <div style={{ display: "flex", gap: "var(--gap-s)", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/method" className="btn btn-p">Read the method</a>
            <a href="/book" className="btn btn-s">Start free</a>
          </div>
        </div>
      </section>
    </main>
  );
}
