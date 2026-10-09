import "@/lib/schemas";
import { DiligenceMap } from "./components/map/diligence-map";
import { logosVisible, platformOpen } from "@/lib/flags";

export const metadata = {
  title: "TheDiligence — Diligence built by operator-investors",
  description:
    "Evidence-graded investment diligence. Specialist agents, orchestrated. Every claim carries its source.",
};

export default async function HomePage() {
  const [isOpen, showLogos] = await Promise.all([
    platformOpen(),
    logosVisible(),
  ]);

  const primaryHref = isOpen ? "/app" : "/contact";
  const primaryLabel = isOpen ? "Start free" : "Request early access";

  return (
    <main id="main-content">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="hero sec">
        <div className="wrap stack" style={{ maxWidth: "var(--measure-hero)", textAlign: "center", margin: "0 auto" }}>
          <p className="eyebrow">Built by operator-investors</p>
          <h1
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(56px, 10vw, 120px)",
              fontWeight: "var(--fw-bold)",
              letterSpacing: "var(--ls-h1)",
              lineHeight: "var(--lh-h1)",
              color: "var(--fg)",
            }}
          >
            Diligence.
          </h1>
          <p className="lead">
            Built by operator-investors, <em>for operator-investors.</em>
            <br />
            Run by skilled agents, orchestrated for evidence.
            <br />
            Every claim carries its source.
          </p>
          <div style={{ display: "flex", gap: "var(--gap-s)", flexWrap: "wrap", justifyContent: "center" }}>
            <a href={primaryHref} className="btn btn-p">{primaryLabel}</a>
            <a href="/contact" className="btn btn-s">Book time with us</a>
          </div>
          <p className="small" style={{ color: "var(--fg2)" }}>
            Free plan: 1 diligence a week. Connect your own model.
          </p>
        </div>
      </section>

      {/* ── Logo band (flag-gated) ────────────────────────────────── */}
      {showLogos && (
        <section className="sec" style={{ borderBlock: "1px solid var(--line)" }}>
          <div className="wrap">
            <p className="eyebrow" style={{ textAlign: "center", marginBottom: "var(--sp-32)" }}>
              They trust us
            </p>
            <div className="logos-row">
              {/* Logos populated when logos_visible flag is on */}
            </div>
          </div>
        </section>
      )}

      {/* ── Orchestrated for evidence, not for chat ───────────────── */}
      <section className="sec" id="how-it-works">
        <div className="wrap">
          <div className="g2" style={{ gap: "var(--gap-xl)", alignItems: "start" }}>
            <div className="stack">
              <p className="eyebrow">Run by skilled agents</p>
              <h2 className="head">
                Orchestrated for evidence,<br />not for chat.
              </h2>
              <p className="body" style={{ color: "var(--fg2)" }}>
                Most tools answer a question. This one runs an investigation.
                A coordinator plans the work, specialists carry it out in isolation,
                every claim lands in a ledger with its source, and a second model
                checks the writer before you read a word.
              </p>
            </div>
            <ol className="stack" style={{ listStyle: "none", padding: 0 }}>
              {[
                {
                  n: "01",
                  h: "You set the target",
                  b: "A company, a purpose, and what you already hold: a deck, a revenue export, interviews.",
                },
                {
                  n: "02",
                  h: "The coordinator plans and prices",
                  b: "It drafts the route, assigns a model tier to each agent, lists what is missing, and shows the cost. Nothing runs until you approve.",
                },
                {
                  n: "03",
                  h: "Specialists run in isolation",
                  b: "One agent per question, each in its own sandbox with a clean context and no access to your credentials.",
                },
                {
                  n: "04",
                  h: "The ledger holds every claim",
                  b: "Each claim is written with a source id and a grade. No source, no claim — unless it is flagged as an estimate.",
                },
                {
                  n: "05",
                  h: "A second model checks, you decide",
                  b: "The verifier runs on another model family and lists what it could not check. You approve the verdict at the gate.",
                },
              ].map(({ n, h, b }) => (
                <li
                  key={n}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "3ch 1fr",
                    gap: "var(--gap-s)",
                    paddingBlock: "var(--sp-20)",
                    borderTop: "1px solid var(--line)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: "var(--fs-small)",
                      color: "var(--fg3)",
                      paddingTop: "0.2em",
                    }}
                  >
                    {n}
                  </span>
                  <div>
                    <p className="body" style={{ fontWeight: "var(--fw-semi)", marginBottom: "var(--sp-4)" }}>{h}</p>
                    <p className="body" style={{ color: "var(--fg2)" }}>{b}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── Four differentiators ─────────────────────────────────── */}
      <section className="sec" style={{ background: "var(--bg2)" }}>
        <div className="wrap">
          <p className="eyebrow" style={{ marginBottom: "var(--sp-32)" }}>Specialists, not a chatbot</p>
          <div className="g2" style={{ gap: "var(--gap-m)" }}>
            {[
              {
                h: "One agent per question",
                b: "Market, company, product, technology, first 100 days. Each runs the open method in its own sandbox with a clean context.",
              },
              {
                h: "A ledger, not a transcript",
                b: "Every claim carries a source id and a grade — A, B or C. A claim with no source cannot be written, unless it is flagged as an estimate.",
              },
              {
                h: "A verifier that is not the writer",
                b: "A second model family reviews the memo against the evidence rules and lists what it could not check. One blind spot stays out of your memo.",
              },
              {
                h: "Agents and people, one workflow",
                b: "Agents plan, read and draft. People decide. Nothing leaves without one. Gates reach you by email, and soon your own agents join through MCP.",
              },
            ].map(({ h, b }) => (
              <div key={h} className="card">
                <p className="body" style={{ fontWeight: "var(--fw-semi)", marginBottom: "var(--sp-8)" }}>{h}</p>
                <p className="body" style={{ color: "var(--fg2)" }}>{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The memo ─────────────────────────────────────────────── */}
      <section className="sec" id="memo">
        <div className="wrap">
          <div className="g2" style={{ gap: "var(--gap-xl)", alignItems: "start" }}>
            <div className="stack">
              <p className="eyebrow">The memo</p>
              <h2 className="head">Every claim graded. Every source one click away.</h2>
              <p className="body" style={{ color: "var(--fg2)" }}>
                Open any section to see what the agents read, what they decided
                and why. A claim you cannot trace does not reach the page.
              </p>
              <div style={{ display: "flex", gap: "var(--gap-s)", flexWrap: "wrap" }}>
                <a href={primaryHref} className="btn btn-p">{primaryLabel}</a>
                <a href="/products" className="btn btn-s">See how it works</a>
              </div>
            </div>
            {/* Memo illustration */}
            <div className="card" style={{ fontFamily: "var(--mono)", fontSize: "var(--fs-small)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--sp-16)", paddingBottom: "var(--sp-16)", borderBottom: "1px solid var(--line)" }}>
                <span style={{ fontWeight: "var(--fw-semi)" }}>Northwind · Memo</span>
                <span style={{ color: "var(--fg3)", fontSize: "var(--fs-tiny)" }}>Illustrative composite</span>
              </div>
              <div className="stack" style={{ gap: "var(--sp-12)" }}>
                {[
                  { label: "Market", conf: "High", grade: "A", claim: "Total addressable market is multi-billion, growing at 18% CAGR.", src: "S-07" },
                  { label: "Company", conf: "Medium", grade: "B", claim: "ARR tripled over 24 months.", src: "P-01" },
                  { label: "Product", conf: "High", grade: "A", claim: "Retention flattens after month nine.", src: "P-05" },
                ].map(({ label, conf, grade, claim, src }) => (
                  <div key={label} style={{ padding: "var(--sp-12)", background: "var(--bg2)", borderRadius: "var(--r-8)", display: "grid", gap: "var(--sp-4)" }}>
                    <div style={{ display: "flex", gap: "var(--sp-8)", alignItems: "center" }}>
                      <span style={{ fontWeight: "var(--fw-semi)" }}>{label}</span>
                      <span style={{ color: "var(--fg3)", fontSize: "var(--fs-tiny)" }}>{conf} confidence</span>
                      <span className={`grade grade-${grade.toLowerCase()}`}>{grade}</span>
                      <span className="source-id">{src}</span>
                    </div>
                    <p style={{ color: "var(--fg2)", fontFamily: "var(--sans)", margin: 0 }}>{claim}</p>
                  </div>
                ))}
              </div>
              <p style={{ marginTop: "var(--sp-16)", color: "var(--fg3)", fontSize: "var(--fs-tiny)" }}>
                Illustrative composite. Not a real company.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Evidence depth ───────────────────────────────────────── */}
      <section className="sec" style={{ background: "var(--bg2)" }} id="evidence">
        <div className="wrap">
          <div className="g2" style={{ gap: "var(--gap-xl)", alignItems: "start" }}>
            <div className="stack">
              <p className="eyebrow">Evidence</p>
              <h2 className="head">The more evidence you add, the better the memo.</h2>
              <p className="body" style={{ color: "var(--fg2)" }}>
                Public sources get a diligence started. Value and accuracy come
                from what nobody has published: customer interviews, the ones
                who left as much as the ones who stayed, and the founders and
                teams of your competitors.
              </p>
              <p className="body" style={{ color: "var(--fg2)" }}>
                Every layer turns estimates into verified claims.
              </p>
            </div>
            <div className="stack">
              {[
                {
                  h: "Public sources and filings",
                  b: "What the agents fetch themselves. Always on.",
                  grades: { a: 12, b: 28, c: 20 },
                },
                {
                  h: "Add customer interviews",
                  b: "Loyal and churned customers. Each call upgrades the claims it touches.",
                  grades: { a: 28, b: 22, c: 10 },
                },
                {
                  h: "Add competitor and team calls",
                  b: "Competitor founders and teams. Estimates become verified claims.",
                  grades: { a: 46, b: 11, c: 3 },
                },
              ].map(({ h, b, grades }) => (
                <div key={h} className="card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: "var(--gap-s)", marginBottom: "var(--sp-12)" }}>
                    <div>
                      <p className="body" style={{ fontWeight: "var(--fw-semi)" }}>{h}</p>
                      <p className="body" style={{ color: "var(--fg2)", marginTop: "var(--sp-4)" }}>{b}</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "var(--sp-8)" }}>
                    <span className="grade grade-a">A {grades.a}</span>
                    <span className="grade grade-b">B {grades.b}</span>
                    <span className="grade grade-c">C {grades.c}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Cost control ─────────────────────────────────────────── */}
      <section className="sec" id="cost">
        <div className="wrap">
          <div className="g2" style={{ gap: "var(--gap-xl)", alignItems: "start" }}>
            <div className="stack">
              <p className="eyebrow">Cost control</p>
              <h2 className="head">Plan it. Price it. Then run it.</h2>
              <p className="body" style={{ color: "var(--fg2)" }}>
                No run starts without a plan you have seen. Every agent has a
                price before it starts working, so the memo never surprises the
                bill.
              </p>
            </div>
            <div className="stack" style={{ gap: "var(--gap-s)" }}>
              {[
                {
                  h: "Priced per agent, before launch",
                  b: "Costs come from each agent's profile and the list prices of the providers you connected.",
                },
                {
                  h: "A budget cap the run obeys",
                  b: "Set the ceiling in the plan. A run that would cross it stops and delivers what exists.",
                },
                {
                  h: "Estimate against actual",
                  b: "After each run you see the drift, agent by agent, so the next estimate is closer.",
                },
                {
                  h: "Updates priced to what changed",
                  b: "New evidence rebuilds only the sections it touches, and shows that cost first.",
                },
              ].map(({ h, b }) => (
                <div key={h} style={{ padding: "var(--sp-20)", borderLeft: "2px solid var(--blue)", background: "var(--bg2)", borderRadius: "var(--r-8)" }}>
                  <p className="body" style={{ fontWeight: "var(--fw-semi)", marginBottom: "var(--sp-4)" }}>{h}</p>
                  <p className="body" style={{ color: "var(--fg2)", margin: 0 }}>{b}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Subway map ───────────────────────────────────────────── */}
      <section className="sec" id="method">
        <div className="wrap">
          <p className="eyebrow" style={{ marginBottom: "var(--sp-24)" }}>The method</p>
          <h2
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(36px, 4.9vw, 70px)",
              lineHeight: 1.03,
              letterSpacing: "-.026em",
              color: "var(--fg)",
              marginBottom: "var(--sp-48)",
            }}
          >
            11 skills, four lines.
          </h2>
          <DiligenceMap />
          <div style={{ marginTop: "var(--sp-32)", display: "flex", gap: "var(--gap-s)" }}>
            <a href="/method" className="btn btn-s">Read the method</a>
          </div>
        </div>
      </section>

      {/* ── CTA band ─────────────────────────────────────────────── */}
      <section className="band">
        <div className="wrap" style={{ textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(28px, 3.5vw, 52px)",
              color: "var(--band-fg)",
              marginBottom: "var(--sp-24)",
            }}
          >
            Read your first memo today.
          </h2>
          <div style={{ display: "flex", gap: "var(--gap-s)", justifyContent: "center", flexWrap: "wrap" }}>
            <a href={primaryHref} className="btn btn-p">{primaryLabel}</a>
            <a href="/contact" className="btn btn-s">Book time with us</a>
          </div>
          <p className="small" style={{ marginTop: "var(--sp-16)", color: "var(--band-fg)", opacity: 0.7 }}>
            Free plan: 1 diligence a week. Connect your own model.
          </p>
        </div>
      </section>
    </main>
  );
}
