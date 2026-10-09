import { stations } from "@/lib/stack";
import { repoPublic, platformOpen } from "@/lib/flags";

export const metadata = {
  title: "The method — TheDiligence",
  description:
    "The open diligence method. 11 skills, one per question an investor has to answer. Every claim graded, every source cited.",
};

const STAGES = [
  {
    num: "01",
    name: "Market",
    q: "How big is the market, how fast does it grow, who plays, and what are the five trends?",
    gives: "Sizing, value chain, players and five trends — the context every other section builds on.",
    feeds: "Company, Product",
  },
  {
    num: "02",
    name: "Company",
    q: "Is this a good company? Financials, strategy, ownership, founders?",
    gives: "A two-page memo with exhibits: financials or proxy signals, SWOT weighted toward Strengths and Weaknesses, ownership, org chart.",
    feeds: "Product, Technology, First 100 days",
  },
  {
    num: "03",
    name: "Product",
    q: "Does the product compound, and what breaks at 10x?",
    gives: "Verdict — Invest, Conditional or Pass — with a weighted scorecard, market pyramid, positioning map and red flags.",
    feeds: "Technology, First 100 days",
  },
  {
    num: "04",
    name: "Technology",
    q: "Can the technology carry what the product story promises?",
    gives: "Scorecard across APIs and integrations, agent readiness, architecture, SLA, security.",
    feeds: "First 100 days",
  },
  {
    num: "05",
    name: "First 100 days",
    q: "What would we do in the first 100 days to make the investment thesis true?",
    gives: "Prioritised levers with sized impact and effort, the 100-day plan, the metrics that prove it worked, and the board asks.",
    feeds: null,
  },
];

const FEEDER_SKILLS = [
  {
    id: "cohortlab",
    name: "Cohort analysis",
    line: "product",
    q: "Does retention flatten, and where?",
    run: "/cohortlab revenue_export.csv",
    out: "Retention triangles, NRR and GRR bridge",
  },
  {
    id: "personapanel",
    name: "User panel",
    line: "product",
    q: "How does a real user experience the product?",
    run: '/personapanel "Northwind"',
    out: "Discovery, purchase and usage evaluation by persona",
  },
  {
    id: "interviewlog",
    name: "Interview log",
    line: "shared",
    q: "What do the people who have used or competed with it say?",
    run: "/interviewlog transcript.vtt",
    out: "Clean source log with citable quotes",
  },
  {
    id: "companypeople",
    name: "Company people",
    line: "company",
    q: "Who really decides, and how do I reach them?",
    run: '/companypeople "Northwind"',
    out: "People map, org chart, email with confidence score",
  },
  {
    id: "targetpeople",
    name: "Target people",
    line: "company",
    q: "How do I get a meeting with these people?",
    run: '/targetpeople "names" --angle "why"',
    out: "Routes ranked by probability, timed message sequence",
  },
  {
    id: "valuecreation",
    name: "Value creation",
    line: "product",
    q: "What would we do in the first 100 days to make the thesis true?",
    run: '/valuecreation "Northwind DD pack"',
    out: "Levers, 100-day plan, metrics, board asks",
  },
];

const LINE_COLORS: Record<string, string> = {
  company: "var(--blue)",
  product: "var(--orange)",
  tech: "var(--green)",
  shared: "var(--shared)",
};

export default async function MethodPage() {
  const [isRepoPublic, isOpen] = await Promise.all([
    repoPublic(),
    platformOpen(),
  ]);

  const primaryHref = isOpen ? "/app" : "/contact";
  const primaryLabel = isOpen ? "Start free" : "Request early access";

  return (
    <main id="main-content">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="hero sec">
        <div className="wrap stack" style={{ maxWidth: "var(--measure-hero)" }}>
          <p className="eyebrow">The method</p>
          <h1 className="head" style={{ fontFamily: "var(--serif)", fontSize: "clamp(40px, 5.5vw, 80px)", lineHeight: 1.05 }}>
            The method is open.
          </h1>
          <p className="lead" style={{ maxWidth: "56ch" }}>
            Read it, run it, challenge it. All our expertise, written into
            open methods. 11 skills, one per question an investor has to answer,
            each a document you can read in full before you trust it.
          </p>
          <div style={{ display: "flex", gap: "var(--gap-s)", flexWrap: "wrap" }}>
            {isRepoPublic ? (
              <a href="https://github.com/thediligence/skills" className="btn btn-p" rel="noopener noreferrer">
                Get the method
              </a>
            ) : (
              <a href="/contact" className="btn btn-p">Join early access</a>
            )}
            <a href={primaryHref} className="btn btn-s">Run it on the platform</a>
          </div>
          <div style={{ display: "flex", gap: "var(--gap-m)", flexWrap: "wrap" }}>
            {isRepoPublic && (
              <>
                <span className="body" style={{ color: "var(--fg2)" }}>Open source</span>
                <span className="body" style={{ color: "var(--fg2)" }}>Transparent</span>
              </>
            )}
            <span className="body" style={{ color: "var(--fg2)" }}>Free, and it stays free</span>
          </div>
        </div>
      </section>

      {/* ── Five stages ─────────────────────────────────────────── */}
      <section className="sec" id="stages">
        <div className="wrap">
          <p className="eyebrow" style={{ marginBottom: "var(--sp-32)" }}>Five stages</p>
          <p className="body" style={{ color: "var(--fg2)", maxWidth: "56ch", marginBottom: "var(--sp-48)" }}>
            Every claim graded. The main trunk of the method has 5 stages,
            from the market to the first 100 days. Supporting skills feed them
            with cohorts, interviews and a user panel.
          </p>
          <div className="stack">
            {STAGES.map(({ num, name, q, gives, feeds }) => (
              <div
                key={num}
                style={{
                  display: "grid",
                  gridTemplateColumns: "3ch 1fr",
                  gap: "var(--gap-m)",
                  paddingBlock: "var(--sp-32)",
                  borderTop: "1px solid var(--line)",
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: "var(--fs-small)",
                      color: "var(--fg3)",
                    }}
                  >
                    {num}
                  </span>
                </div>
                <div className="stack" style={{ gap: "var(--sp-8)" }}>
                  <p
                    style={{
                      fontFamily: "var(--serif)",
                      fontSize: "clamp(22px, 2.5vw, 36px)",
                      color: "var(--fg)",
                      fontWeight: 400,
                      margin: 0,
                    }}
                  >
                    {name}
                  </p>
                  <p className="body" style={{ color: "var(--fg2)" }}>{q}</p>
                  <p className="body" style={{ color: "var(--fg2)" }}>{gives}</p>
                  {feeds && (
                    <p className="small" style={{ color: "var(--fg3)" }}>
                      Feeds: {feeds}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Evidence rules ──────────────────────────────────────── */}
      <section className="sec" id="evidence-rules" style={{ background: "var(--bg2)" }}>
        <div className="wrap">
          <div className="g2" style={{ gap: "var(--gap-xl)", alignItems: "start" }}>
            <div className="stack">
              <p className="eyebrow">Evidence rules</p>
              <h2 className="head">
                Three rules make a memo defensible.
              </h2>
              <p className="body" style={{ color: "var(--fg2)" }}>
                They are written into the method, and the platform enforces
                them in code.
              </p>
            </div>
            <div className="stack" style={{ gap: "var(--gap-m)" }}>
              {[
                {
                  h: "Every claim cites a source id and carries a grade",
                  b: "A claim with no source is rejected, unless it is graded C and says so.",
                },
                {
                  h: "What cannot be checked goes to the appendix",
                  b: "Data still needed, not into the argument.",
                },
                {
                  h: "Confidence is computed, not asserted",
                  b: "A section's confidence comes from the mix of grades behind it. High at 0.70 or above, Medium at 0.45.",
                },
              ].map(({ h, b }) => (
                <div key={h} className="card">
                  <p className="body" style={{ fontWeight: "var(--fw-semi)", marginBottom: "var(--sp-8)" }}>{h}</p>
                  <p className="body" style={{ color: "var(--fg2)" }}>{b}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Grade and source reference ──────────────────────────── */}
      <section className="sec">
        <div className="wrap">
          <div className="g3">
            <div className="stack">
              <p className="eyebrow">Grades</p>
              <div className="stack" style={{ gap: "var(--sp-16)" }}>
                {[
                  { grade: "A", label: "Verified", desc: "In a primary source: a filing, a contract, a data export." },
                  { grade: "B", label: "Reported", desc: "By a credible source: a call, a trade report." },
                  { grade: "C", label: "Estimated", desc: "Flagged as an estimate, and never presented as fact." },
                ].map(({ grade, label, desc }) => (
                  <div key={grade} style={{ display: "flex", gap: "var(--sp-12)", alignItems: "start" }}>
                    <span className={`grade grade-${grade.toLowerCase()}`} style={{ flexShrink: 0 }}>{grade}</span>
                    <div>
                      <p className="body" style={{ fontWeight: "var(--fw-semi)" }}>{label}</p>
                      <p className="body" style={{ color: "var(--fg2)", marginTop: "var(--sp-4)" }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="stack">
              <p className="eyebrow">Source ids</p>
              <div className="stack" style={{ gap: "var(--sp-16)" }}>
                {[
                  { prefix: "S-", label: "Web and public sources" },
                  { prefix: "P-", label: "Provided by the target" },
                  { prefix: "I-", label: "Interviews" },
                ].map(({ prefix, label }) => (
                  <div key={prefix} style={{ display: "flex", gap: "var(--sp-12)", alignItems: "center" }}>
                    <span className="source-id">{prefix}01</span>
                    <p className="body" style={{ color: "var(--fg2)" }}>{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="stack">
              <p className="eyebrow">Confidence</p>
              <p className="body" style={{ color: "var(--fg2)" }}>
                Computed as (A + ½B) / (A + B + C).
              </p>
              <div className="stack" style={{ gap: "var(--sp-12)" }}>
                {[
                  { label: "High", threshold: "0.70 and above" },
                  { label: "Medium", threshold: "0.45 and above" },
                  { label: "Low", threshold: "Below 0.45" },
                ].map(({ label, threshold }) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--line)", paddingBottom: "var(--sp-8)" }}>
                    <span className="body" style={{ fontWeight: "var(--fw-semi)" }}>{label}</span>
                    <span className="body" style={{ color: "var(--fg2)", fontFamily: "var(--mono)", fontSize: "var(--fs-small)" }}>{threshold}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── The 11 skills ───────────────────────────────────────── */}
      <section className="sec" id="skills" style={{ background: "var(--bg2)" }}>
        <div className="wrap">
          <p className="eyebrow" style={{ marginBottom: "var(--sp-16)" }}>The 11 skills</p>
          <p className="body" style={{ color: "var(--fg2)", maxWidth: "56ch", marginBottom: "var(--sp-48)" }}>
            One question each. One document out. Each skill asks one question,
            takes a defined input and produces a defined output. The agents run
            them as written.
          </p>
          <div className="stack">
            {stations.map((station) => (
              <div
                key={station.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "var(--gap-m)",
                  paddingBlock: "var(--sp-24)",
                  borderTop: "1px solid var(--line)",
                  alignItems: "start",
                }}
              >
                <div style={{ display: "flex", gap: "var(--sp-12)", alignItems: "center", flexWrap: "wrap" }}>
                  <span
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: LINE_COLORS[station.line] ?? "var(--fg3)",
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <p className="body" style={{ fontWeight: "var(--fw-semi)" }}>{station.sq}</p>
                    <p className="small" style={{ color: "var(--fg3)", marginTop: "var(--sp-4)" }}>
                      Takes: {station.takes}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="small" style={{ color: "var(--fg2)", marginBottom: "var(--sp-4)" }}>
                    {station.out}
                  </p>
                  <code
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: "var(--fs-tiny)",
                      color: "var(--blue)",
                      background: "var(--bg)",
                      padding: "var(--sp-2) var(--sp-8)",
                      borderRadius: "var(--r-4)",
                    }}
                  >
                    {station.run}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Repository block (flag-gated) ────────────────────────── */}
      {isRepoPublic && (
        <section className="sec" id="get-the-method">
          <div className="wrap">
            <div className="stack" style={{ maxWidth: "60ch" }}>
              <p className="eyebrow">Get the method</p>
              <h2 className="head">Install it in your own assistant.</h2>
              <p className="body" style={{ color: "var(--fg2)" }}>
                The skills are plain documents. Add them to the assistant you
                already use and run them on your own deals, with your own model.
                Nothing to sign up for.
              </p>
              <div className="stack" style={{ gap: "var(--sp-24)" }}>
                {[
                  {
                    n: "1",
                    h: "Download the skills",
                    b: "11 folders, one document each, with the scripts some of them use to build files.",
                  },
                  {
                    n: "2",
                    h: "Add them to your assistant",
                    b: "Point your assistant at the folder. Nothing leaves your machine except your own calls to your own model.",
                  },
                  {
                    n: "3",
                    h: "Run one",
                    b: 'Start with /duediligence "Company". Open the memo, and follow any claim to its source.',
                  },
                ].map(({ n, h, b }) => (
                  <div key={n} style={{ display: "grid", gridTemplateColumns: "2ch 1fr", gap: "var(--sp-16)" }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: "var(--fs-small)", color: "var(--fg3)", paddingTop: "0.1em" }}>{n}</span>
                    <div>
                      <p className="body" style={{ fontWeight: "var(--fw-semi)" }}>{h}</p>
                      <p className="body" style={{ color: "var(--fg2)", marginTop: "var(--sp-4)" }}>{b}</p>
                    </div>
                  </div>
                ))}
              </div>
              <a href="https://github.com/thediligence/skills" className="btn btn-p" rel="noopener noreferrer">
                Get the method
              </a>
            </div>
          </div>
        </section>
      )}

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
            {isRepoPublic ? "Take the method. Run it on the platform." : "Prefer it done for you?"}
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
