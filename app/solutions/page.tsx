import { platformOpen } from "@/lib/flags";

export const metadata = {
  title: "Solutions — TheDiligence",
  description:
    "Three ways to run a diligence. Download the method, run it on the platform, or hire the operators who wrote it.",
};

export default async function SolutionsPage() {
  const isOpen = await platformOpen();
  const primaryHref = isOpen ? "/app" : "/contact";
  const primaryLabel = isOpen ? "Start free" : "Request early access";

  return (
    <main id="main-content">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="hero sec">
        <div className="wrap stack" style={{ maxWidth: "var(--measure-hero)" }}>
          <p className="eyebrow">Solutions</p>
          <h1 className="head" style={{ fontFamily: "var(--serif)", fontSize: "clamp(40px, 5.5vw, 80px)", lineHeight: 1.05 }}>
            Three ways to run a diligence.
          </h1>
          <p className="lead" style={{ maxWidth: "56ch" }}>
            Take the method, run it on the platform, or hire the operators who
            wrote it. The same ledger and the same grades at every level, so
            you can move up or down without starting over.
          </p>
          <div style={{ display: "flex", gap: "var(--gap-s)" }}>
            <a href="#download" className="btn btn-s">Download the method</a>
            <a href="#platform" className="btn btn-s">Run on the platform</a>
            <a href="#hire" className="btn btn-s">Hire us</a>
          </div>
        </div>
      </section>

      {/* ── Where it applies ─────────────────────────────────────── */}
      <section className="sec" style={{ background: "var(--bg2)" }}>
        <div className="wrap">
          <p className="eyebrow" style={{ marginBottom: "var(--sp-32)" }}>Where it applies</p>
          <p className="body" style={{ color: "var(--fg2)", marginBottom: "var(--sp-32)", maxWidth: "56ch" }}>
            From the first meeting to the first 100 days.
          </p>
          <div className="g3">
            {[
              {
                h: "Before the deal",
                b: "Market and company. A first-principles view and a sourced deep dive on the sector, and a two-page memo on the target: ownership, founders, financials or proxy signals.",
                skills: ["Market", "Company", "Interviews"],
              },
              {
                h: "At the committee",
                b: "Product and technology. Retention, adoption and red flags, a verdict you can defend, and a check of what the product story could only claim.",
                skills: ["Cohorts", "User panel", "Product", "Technology"],
              },
              {
                h: "After the close",
                b: "First 100 days. Sized levers, the plan, the metrics that prove it worked and the asks to bring to the board.",
                skills: ["First 100 days"],
              },
            ].map(({ h, b, skills }) => (
              <div key={h} className="card">
                <p className="body" style={{ fontWeight: "var(--fw-semi)", marginBottom: "var(--sp-8)" }}>{h}</p>
                <p className="body" style={{ color: "var(--fg2)", marginBottom: "var(--sp-12)" }}>{b}</p>
                <div style={{ display: "flex", gap: "var(--sp-6)", flexWrap: "wrap" }}>
                  {skills.map((s) => (
                    <span
                      key={s}
                      style={{
                        fontFamily: "var(--mono)",
                        fontSize: "var(--fs-tiny)",
                        padding: "var(--sp-2) var(--sp-8)",
                        background: "var(--bg2)",
                        borderRadius: "var(--r-4)",
                        border: "1px solid var(--line)",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Solution 1: Download ─────────────────────────────────── */}
      <section className="sec" id="download">
        <div className="wrap">
          <div className="g2" style={{ gap: "var(--gap-xl)", alignItems: "start" }}>
            <div className="stack">
              <p className="eyebrow">Solution 1 · Download the method</p>
              <h2 className="head">Read it. Run it yourself.</h2>
              <p className="body" style={{ color: "var(--fg2)" }}>
                Install the skills in your own assistant and run them on your
                own deals. The method stays free, and it stays yours to change.
              </p>
              <div className="stack" style={{ gap: "var(--sp-16)" }}>
                {[
                  "11 skills, one per question, each a plain document you can read",
                  "The same grades, ids and evidence rules the platform enforces",
                  "Connect your own model account — nothing to pay",
                ].map((b) => (
                  <div key={b} style={{ display: "flex", gap: "var(--sp-12)", alignItems: "start" }}>
                    <span style={{ color: "var(--green)", fontWeight: "var(--fw-semi)", flexShrink: 0 }}>→</span>
                    <p className="body" style={{ color: "var(--fg2)", margin: 0 }}>{b}</p>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: "var(--gap-s)", flexWrap: "wrap" }}>
                <a href="/method" className="btn btn-p">Read the method</a>
              </div>
            </div>
            <div className="card" style={{ fontFamily: "var(--mono)", fontSize: "var(--fs-small)" }}>
              <p style={{ fontWeight: "var(--fw-semi)", marginBottom: "var(--sp-16)" }}>Run from your assistant</p>
              <div className="stack" style={{ gap: "var(--sp-12)" }}>
                {[
                  { cmd: '/marketdd "payments infrastructure"', desc: "Market deep dive: sizing, value chain, players, five trends" },
                  { cmd: '/duediligence "Northwind"', desc: "Two-page company memo with exhibits" },
                  { cmd: "/cohortlab revenue_export.csv", desc: "Retention triangles, NRR and GRR bridge" },
                  { cmd: '/productdd "Northwind"', desc: "Verdict: Invest, Conditional or Pass" },
                ].map(({ cmd, desc }) => (
                  <div key={cmd} style={{ padding: "var(--sp-12)", background: "var(--bg2)", borderRadius: "var(--r-4)" }}>
                    <p style={{ color: "var(--blue)", marginBottom: "var(--sp-4)" }}>{cmd}</p>
                    <p style={{ color: "var(--fg3)", fontFamily: "var(--sans)" }}>{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Solution 2: Platform ─────────────────────────────────── */}
      <section className="sec" id="platform" style={{ background: "var(--bg2)" }}>
        <div className="wrap">
          <div className="g2" style={{ gap: "var(--gap-xl)", alignItems: "start" }}>
            <div className="stack">
              <p className="eyebrow">Solution 2 · Run it on the platform</p>
              <h2 className="head">The method, with the plumbing done.</h2>
              <p className="body" style={{ color: "var(--fg2)" }}>
                The platform coordinates the whole process in one place: the
                plan and its price, the agents, the evidence, the memo and its
                updates. Connect your own model account. It runs from the free
                plan to an enterprise workspace.
              </p>
              <div className="stack" style={{ gap: "var(--sp-24)" }}>
                {[
                  {
                    n: "1",
                    h: "Connect your model",
                    b: "Approve access to Claude, OpenAI, Mistral or Gemini on your provider's own screen. Your key is encrypted and never visible to agents.",
                  },
                  {
                    n: "2",
                    h: "Plan and price",
                    b: "Name a company. Read the plan, change a model if you wish, set a cap, approve.",
                  },
                  {
                    n: "3",
                    h: "Read, challenge, update",
                    b: "Open any claim to its source. Drop new evidence and rebuild only what it touches.",
                  },
                ].map(({ n, h, b }) => (
                  <div
                    key={n}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "2ch 1fr",
                      gap: "var(--sp-16)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--mono)",
                        fontSize: "var(--fs-small)",
                        color: "var(--fg3)",
                        paddingTop: "0.1em",
                      }}
                    >
                      {n}
                    </span>
                    <div>
                      <p className="body" style={{ fontWeight: "var(--fw-semi)", marginBottom: "var(--sp-4)" }}>{h}</p>
                      <p className="body" style={{ color: "var(--fg2)" }}>{b}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: "var(--gap-s)", flexWrap: "wrap" }}>
                <a href={primaryHref} className="btn btn-p">{primaryLabel}</a>
                <a href="/platform" className="btn btn-s">See the platform</a>
              </div>
            </div>
            <div className="card stack">
              <p className="body" style={{ fontWeight: "var(--fw-semi)", marginBottom: "var(--sp-12)" }}>
                Start alone. Add the team when you need it.
              </p>
              {[
                { name: "Free", tagline: "1 diligence a week. Connect your own model." },
                { name: "Pro", tagline: "No weekly limit, more members, Obsidian plugin." },
                { name: "Fund", tagline: "Single sign-on, audit log, onboarding with us." },
              ].map(({ name, tagline }) => (
                <div
                  key={name}
                  style={{
                    padding: "var(--sp-16)",
                    borderRadius: "var(--r-8)",
                    border: "1px solid var(--line)",
                    background: "var(--bg)",
                  }}
                >
                  <p className="body" style={{ fontWeight: "var(--fw-semi)" }}>{name}</p>
                  <p className="body" style={{ color: "var(--fg2)", marginTop: "var(--sp-4)" }}>{tagline}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Solution 3: Hire us ──────────────────────────────────── */}
      <section className="sec" id="hire">
        <div className="wrap">
          <div className="g2" style={{ gap: "var(--gap-xl)", alignItems: "start" }}>
            <div className="stack">
              <p className="eyebrow">Solution 3 · Hire us</p>
              <h2 className="head">Hire the operators who wrote it.</h2>
              <p className="body" style={{ color: "var(--fg2)" }}>
                We run the memo, or the whole deal, from the target to the
                100-day plan. Two operator-investors in the room, the platform
                behind us, and the same grades on every claim.
              </p>

              <div>
                <p className="body" style={{ fontWeight: "var(--fw-semi)", marginBottom: "var(--sp-12)" }}>
                  Scope
                </p>
                <div style={{ display: "flex", gap: "var(--sp-8)", flexWrap: "wrap" }}>
                  {["Finance", "Commercial", "Positioning", "Product", "Technology", "Value creation"].map((s) => (
                    <span
                      key={s}
                      style={{
                        fontFamily: "var(--mono)",
                        fontSize: "var(--fs-small)",
                        padding: "var(--sp-4) var(--sp-12)",
                        background: "var(--bg2)",
                        borderRadius: "var(--r-4)",
                        border: "1px solid var(--line)",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <p className="body" style={{ color: "var(--fg2)", marginTop: "var(--sp-12)" }}>
                  One engagement can cover all six, or the two that matter most
                  for the decision in front of you.
                </p>
              </div>

              <div>
                <p className="body" style={{ fontWeight: "var(--fw-semi)", marginBottom: "var(--sp-12)" }}>
                  What you receive
                </p>
                <div className="stack" style={{ gap: "var(--sp-8)" }}>
                  {[
                    "The investment memo, every claim graded, every source in the ledger",
                    "A verdict, and the conditions under which it changes",
                    "A 100-day plan with sized levers and the metrics that prove them",
                    "The asks to bring to the board",
                  ].map((item) => (
                    <div key={item} style={{ display: "flex", gap: "var(--sp-12)", alignItems: "start" }}>
                      <span style={{ color: "var(--green)", fontWeight: "var(--fw-semi)", flexShrink: 0 }}>→</span>
                      <p className="body" style={{ color: "var(--fg2)", margin: 0 }}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <a href="/contact" className="btn btn-p">Book time with us</a>
            </div>

            <div className="stack">
              <div className="card">
                <p className="body" style={{ fontWeight: "var(--fw-semi)", marginBottom: "var(--sp-8)" }}>
                  The evidence that moves the memo
                </p>
                <p className="body" style={{ color: "var(--fg2)", marginBottom: "var(--sp-16)" }}>
                  This is where the value is. Each interview goes into the ledger
                  as a source and turns estimates into verified claims.
                </p>
                {[
                  { h: "Customers", b: "5 to 15 loyal customers; 2 to 5 who churned." },
                  { h: "Competitors", b: "Their founders and their teams." },
                  { h: "The team", b: "CPO, CTO, CEO and CBO." },
                ].map(({ h, b }) => (
                  <div key={h} style={{ marginTop: "var(--sp-12)", paddingTop: "var(--sp-12)", borderTop: "1px solid var(--line)" }}>
                    <p className="body" style={{ fontWeight: "var(--fw-semi)" }}>{h}</p>
                    <p className="body" style={{ color: "var(--fg2)", marginTop: "var(--sp-4)" }}>{b}</p>
                  </div>
                ))}
              </div>

              <div className="card">
                <p className="body" style={{ fontWeight: "var(--fw-semi)", marginBottom: "var(--sp-12)" }}>
                  How an engagement works
                </p>
                <div className="stack" style={{ gap: "var(--sp-12)" }}>
                  {[
                    { h: "Scope call", b: "A short call on the deal, the decision in front of you and the deadline." },
                    { h: "Plan, in writing", b: "The route, the interviews we will run, the evidence we need from you, and the cost." },
                    { h: "Evidence and interviews", b: "Agents on the documents and data. Us on the calls." },
                    { h: "Memo and verdict", b: "You read it with the sources open. We stand behind each claim." },
                    { h: "100-day plan", b: "Levers, owners, metrics, and the asks for the board." },
                  ].map(({ h, b }) => (
                    <div key={h} style={{ paddingTop: "var(--sp-12)", borderTop: "1px solid var(--line)" }}>
                      <p className="body" style={{ fontWeight: "var(--fw-semi)" }}>{h}</p>
                      <p className="body" style={{ color: "var(--fg2)", marginTop: "var(--sp-4)" }}>{b}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA band ─────────────────────────────────────────────── */}
      <section className="band">
        <div className="wrap" style={{ textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(24px, 3vw, 48px)",
              color: "var(--band-fg)",
              marginBottom: "var(--sp-24)",
            }}
          >
            Start where you are. Move up when you need to.
          </h2>
          <div style={{ display: "flex", gap: "var(--gap-s)", justifyContent: "center", flexWrap: "wrap" }}>
            <a href={primaryHref} className="btn btn-p">{primaryLabel}</a>
            <a href="/contact" className="btn btn-s">Book time with us</a>
          </div>
        </div>
      </section>
    </main>
  );
}
