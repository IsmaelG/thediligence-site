import { stations } from "@/lib/stack";
import { repoPublic, platformOpen } from "@/lib/flags";

export const metadata = {
  title: "The method — TheDiligence",
  description:
    "Five stages, eleven specialist agents, one evidence standard. Open source under MIT.",
};

const STAGES = [
  {
    n: "01",
    id: "market",
    title: "Market",
    q: "How big is the market, and is it moving?",
    body: "A market deep dive across sizing, value chain, players, M&A, segments and five structural trends. The coordinator runs it first, as soon as you name a target.",
    agents: ["marketdd"],
  },
  {
    n: "02",
    id: "company",
    title: "Company",
    q: "Is this a good company?",
    body: "Financials or proxy signals, strategy, ownership, founders and an evidence-backed SWOT weighted toward Strengths and Weaknesses. The org chart identifies the digital leader.",
    agents: ["duediligence", "companypeople", "targetpeople"],
  },
  {
    n: "03",
    id: "product",
    title: "Product",
    q: "Does the product compound?",
    body: "Retention triangles, NRR/GRR bridge, a persona panel, customer and expert interviews, a competitive positioning map and a red-flag appendix. Verdict: Invest, Conditional or Pass.",
    agents: ["cohortlab", "personapanel", "productdd"],
  },
  {
    n: "04",
    id: "technology",
    title: "Technology",
    q: "Does the technology back the claims?",
    body: "Six axes: APIs and integrations, MCP readiness, real integration time, architecture and dependencies, SLA and latency, security and compliance. Same verdict scale as the product pass.",
    agents: ["technicaldd"],
  },
  {
    n: "05",
    id: "plan",
    title: "100-day plan",
    q: "What do we fix first?",
    body: "Sized levers with impact and effort, the 100-day plan, the metrics that prove it worked, and the board asks. Turns red flags into a board pack.",
    agents: ["valuecreation"],
  },
];

function Grade({ g, filled }: { g: "A" | "B" | "C"; filled?: boolean }) {
  return (
    <span className={`gr${g === "A" && filled ? " gr-a" : ""}${g === "C" ? " gr-c" : ""}`} style={{ width: 20, height: 20, fontSize: 11, flexShrink: 0 }}>{g}</span>
  );
}

function MemoIll() {
  const CLAIMS = [
    { g: "A" as const, id: "P-01", text: "Retention flattens after the ninth month.", conf: "High", src: "revenue export" },
    { g: "B" as const, id: "I-04", text: "The uptime guarantee is claimed but missing from the customer contract.", conf: "Medium", src: "call notes" },
    { g: "C" as const, id: "S-03", text: "Demand is moving from point tools to platforms in the mid-market.", conf: "Low", src: "analyst estimate" },
  ];
  return (
    <div style={{ background: "var(--surf)", border: "1px solid var(--line)", borderRadius: "var(--r-win)", boxShadow: "var(--sh-win)", overflow: "hidden", fontFamily: "var(--sans)", fontSize: 13, userSelect: "none" }} aria-hidden="true">
      <div style={{ height: 44, background: "var(--surf2)", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", padding: "0 20px", gap: 8 }}>
        <span style={{ fontWeight: 700, fontSize: 13, color: "var(--fg)", marginRight: "auto" }}>Northwind · Memo</span>
        <span className="status st-live" style={{ fontSize: 11 }}>Delivered</span>
      </div>
      <div style={{ padding: "18px 22px" }}>
        <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mut)", marginBottom: 10 }}>Verdict</div>
        <div style={{ fontWeight: 700, fontSize: 18, color: "var(--fg)", marginBottom: 4 }}>Conditional</div>
        <div style={{ fontSize: 13, color: "var(--fg2)", marginBottom: 20 }}>Invest if onboarding is fixed.</div>
        <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mut)", marginBottom: 10 }}>Key claims · section summary</div>
        {CLAIMS.map((c) => (
          <div key={c.id} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "8px 0", borderBottom: "1px solid var(--line2)" }}>
            <Grade g={c.g} filled={c.g === "A"} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--fg2)", letterSpacing: "0.08em", marginBottom: 3 }}>{c.conf} confidence</div>
              <div style={{ fontSize: 12, color: "var(--fg)", lineHeight: 1.4 }}>{c.text}</div>
            </div>
            <div style={{ display: "flex", gap: 5, alignItems: "center", flexShrink: 0 }}>
              <span className="src">{c.id}</span>
              <span style={{ fontSize: 10, color: "var(--mut)" }}>{c.src}</span>
            </div>
          </div>
        ))}
        <div style={{ marginTop: 12, padding: "10px 12px", background: "var(--bg2)", border: "1px solid var(--line)", borderRadius: "var(--r-8)" }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mut)", marginBottom: 5 }}>Confidence formula</div>
          <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--fg)" }}>confidence = (A + B/2) / (A + B + C)</div>
          <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--mut)", marginTop: 3 }}>High ≥ 0.70 · Medium ≥ 0.45 · Low below that</div>
        </div>
        <p style={{ fontSize: 10, color: "var(--mut)", fontStyle: "italic", marginTop: 10 }}>Illustrative composite. Not a real company.</p>
      </div>
    </div>
  );
}

export default async function MethodPage() {
  const isRepoPublic = await repoPublic();
  const isOpen = await platformOpen();
  const primaryHref = isOpen ? "/app" : "/book";

  const skillRows = stations.map((s) => ({
    name: s.id,
    question: s.sq,
    takes: s.takes,
    produces: s.produces,
    out: s.out,
    isNew: s.isNew,
  }));

  return (
    <main id="main-content">
      {/* Hero */}
      <section className="hero sec" style={{ paddingBottom: "var(--sp-64)" }}>
        <div className="wrap" style={{ maxWidth: "var(--head-max)" }}>
          <p className="eyebrow" style={{ marginBottom: "var(--sp-16)" }}>The method</p>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h1-page)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h1)", lineHeight: "var(--lh-h1)", marginBottom: "var(--sp-24)" }}>
            Five stages. One evidence standard.
          </h1>
          <p className="lead" style={{ maxWidth: "60ch", marginBottom: "var(--sp-40)" }}>
            A grade and a source on every claim. A confidence per section computed from the mix. A verdict that rests on evidence you can argue with, not prose you have to trust.
          </p>
          <div style={{ display: "flex", gap: "var(--gap-s)", flexWrap: "wrap", marginBottom: "var(--sp-40)" }}>
            <a href="#get" className="btn btn-p">Get the method</a>
            <a href={primaryHref} className="btn btn-s">Run it with agents</a>
          </div>
          <div style={{ display: "flex", gap: "var(--sp-32)", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontFamily: "var(--mono)", fontSize: "var(--fs-num)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-num)", color: "var(--fg)", lineHeight: 1 }}>5</div>
              <div style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--mut)", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 4 }}>Stages</div>
            </div>
            <div>
              <div style={{ fontFamily: "var(--mono)", fontSize: "var(--fs-num)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-num)", color: "var(--fg)", lineHeight: 1 }}>11</div>
              <div style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--mut)", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 4 }}>Skills</div>
            </div>
            <div>
              <div style={{ fontFamily: "var(--mono)", fontSize: "var(--fs-num)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-num)", color: "var(--fg)", lineHeight: 1 }}>3</div>
              <div style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--mut)", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 4 }}>Grades</div>
            </div>
            <div>
              <div style={{ fontFamily: "var(--mono)", fontSize: "var(--fs-num)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-num)", color: "var(--fg)", lineHeight: 1 }}>MIT</div>
              <div style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--mut)", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 4 }}>Licence</div>
            </div>
          </div>
        </div>
      </section>

      {/* Five stages */}
      <section className="sec alt">
        <div className="wrap">
          <div style={{ maxWidth: "var(--head-max)", marginBottom: "var(--head-mb)" }}>
            <p className="eyebrow" style={{ marginBottom: "var(--sp-16)" }}>Five stages</p>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h2)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h2)", lineHeight: "var(--lh-h2)", marginBottom: "var(--sp-24)" }}>
              The order exists for a reason.
            </h2>
            <p className="lead" style={{ maxWidth: "58ch" }}>
              Market context before product verdict. Product verdict before technology check. Technology findings before the 100-day plan. Each stage feeds the next, and each one writes down what it took as evidence.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-16)" }}>
            {STAGES.map((stage) => (
              <div key={stage.n} style={{ display: "grid", gridTemplateColumns: "3fr 4fr", gap: "var(--gap-split)", padding: "var(--sp-32) var(--sp-40)", background: "var(--bg2)", border: "1px solid var(--line)", borderRadius: "var(--r-card)", alignItems: "start" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--sp-16)", marginBottom: "var(--sp-16)" }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mut)" }}>{stage.n}</span>
                    <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 14, color: "var(--fg2)" }}>{stage.q}</span>
                  </div>
                  <h3 style={{ fontSize: "20px", fontWeight: "var(--fw-bold)", letterSpacing: "-0.02em", marginBottom: "var(--sp-12)" }}>{stage.title}</h3>
                  <p className="small" style={{ margin: 0, color: "var(--fg2)", lineHeight: 1.6, maxWidth: "44ch" }}>{stage.body}</p>
                </div>
                <div style={{ display: "flex", gap: "var(--sp-10)", flexWrap: "wrap" }}>
                  {stage.agents.map((a) => (
                    <span key={a} style={{ padding: "4px 10px", background: "var(--surf)", border: "1px solid var(--line)", borderRadius: "var(--r-pill)", fontFamily: "var(--mono)", fontSize: 12, color: "var(--fg2)" }}>/{a}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Evidence rules */}
      <section id="evidence" className="sec">
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "var(--gap-split)", alignItems: "start" }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: "var(--sp-16)" }}>Evidence rules</p>
              <h2 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h2)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h2)", lineHeight: "var(--lh-h2)", marginBottom: "var(--sp-24)" }}>
                A grade and a source on every claim.
              </h2>
              <p className="lead" style={{ maxWidth: "44ch", marginBottom: "var(--sp-32)" }}>
                Claims without sources are not allowed. Estimates are allowed, and they say so. Confidence is computed, not stated.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-20)", marginBottom: "var(--sp-40)" }}>
                {[
                  {
                    g: "A" as const,
                    filled: true,
                    label: "Verified",
                    desc: "In a filing, a contract or a data export. The source exists and we have it. Chip filled, solid border.",
                  },
                  {
                    g: "B" as const,
                    label: "Reported",
                    desc: "Reported by a credible source. A press article, an analyst report, a reference call. Chip outline, solid border.",
                  },
                  {
                    g: "C" as const,
                    label: "Estimated",
                    desc: "An estimate, and flagged as one. A model output, a number extrapolated from proxies. Chip outline, dashed border.",
                  },
                ].map(({ g, filled, label, desc }) => (
                  <div key={g} style={{ display: "flex", gap: "var(--sp-14)", alignItems: "flex-start" }}>
                    <Grade g={g} filled={filled} />
                    <div>
                      <div style={{ fontWeight: "var(--fw-semibold)", fontSize: 15, marginBottom: "var(--sp-4)" }}>{label}</div>
                      <p className="small" style={{ margin: 0, color: "var(--fg2)", lineHeight: 1.5 }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ padding: "var(--sp-16) var(--sp-20)", background: "var(--bg2)", border: "1px solid var(--line)", borderRadius: "var(--r-8)" }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mut)", marginBottom: 8 }}>Confidence formula</div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 14, fontWeight: 600, color: "var(--fg)", marginBottom: 4 }}>confidence = (A + B/2) / (A + B + C)</div>
                <div style={{ fontSize: 12, color: "var(--fg2)" }}>High ≥ 0.70 · Medium ≥ 0.45 · Low below 0.45</div>
                <div style={{ fontSize: 12, color: "var(--mut)", marginTop: 6, lineHeight: 1.5 }}>A section with four A claims, three B claims and one C reads: (4 + 1.5) / 8 = 0.69 · Medium.</div>
              </div>
            </div>
            <MemoIll />
          </div>
        </div>
      </section>

      {/* Source IDs */}
      <section className="sec alt">
        <div className="wrap">
          <div style={{ maxWidth: "var(--head-max)", marginBottom: "var(--head-mb)" }}>
            <p className="eyebrow" style={{ marginBottom: "var(--sp-16)" }}>Source IDs</p>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h2)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h2)", lineHeight: "var(--lh-h2)", marginBottom: "var(--sp-24)" }}>
              Every claim points at a row in the ledger.
            </h2>
            <p className="lead" style={{ maxWidth: "62ch", marginBottom: "var(--sp-40)" }}>
              Sources are numbered in the evidence ledger. A claim cites the row. Click the source ID to open the original document. No source, no claim.
            </p>
          </div>
          <div className="g4">
            {[
              { prefix: "P-", range: "P-01 – P-nn", label: "Public", desc: "Any source the agent fetched: a filing, a website, a press article, an analyst report." },
              { prefix: "S-", range: "S-01 – S-nn", label: "Structured", desc: "A file in the evidence ledger: a revenue export, a cap table, a contract." },
              { prefix: "I-", range: "I-01 – I-nn", label: "Interview", desc: "A call. Each call is one entry in the interviewlog, with a verbatim quote per claim it touches." },
              { prefix: "F-", range: "F-01 – F-nn", label: "Fund-internal", desc: "A note in your vault that you shared for this run." },
            ].map((cls) => (
              <div key={cls.prefix} className="card">
                <div style={{ display: "flex", alignItems: "center", gap: "var(--sp-10)", marginBottom: "var(--sp-12)" }}>
                  <span className="src" style={{ fontSize: 12 }}>{cls.range.split(" ")[0]}</span>
                  <span style={{ fontFamily: "var(--mono)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--mut)" }}>{cls.label}</span>
                </div>
                <p className="small" style={{ margin: 0, color: "var(--fg2)", lineHeight: 1.55 }}>{cls.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11 skills table */}
      <section id="skills" className="sec">
        <div className="wrap">
          <div style={{ maxWidth: "var(--head-max)", marginBottom: "var(--head-mb)" }}>
            <p className="eyebrow" style={{ marginBottom: "var(--sp-16)" }}>Eleven skills</p>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h2)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h2)", lineHeight: "var(--lh-h2)", marginBottom: "var(--sp-24)" }}>
              One skill per question.
            </h2>
            <p className="lead" style={{ maxWidth: "60ch" }}>
              Each skill is an agent prompt and a document template. They are individually runnable and composable. The coordinator chains them in the right order.
            </p>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr>
                  {["Skill", "Question", "Takes", "Produces", "Output"].map((h) => (
                    <th key={h} style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mut)", textAlign: "left", padding: "10px 14px", borderBottom: "2px solid var(--line)", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {skillRows.map((row) => (
                  <tr key={row.name}>
                    <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--line2)", fontFamily: "var(--mono)", fontSize: 12, color: "var(--fg)", whiteSpace: "nowrap", verticalAlign: "top" }}>
                      /{row.name}
                      {row.isNew && <span style={{ marginLeft: 6, padding: "1px 5px", background: "var(--blue-t-bg, #eff6ff)", color: "var(--blue-t, #2563eb)", borderRadius: 3, fontSize: 9, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>New</span>}
                    </td>
                    <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--line2)", color: "var(--fg2)", maxWidth: 240, lineHeight: 1.4, verticalAlign: "top" }}>{row.question}</td>
                    <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--line2)", color: "var(--fg2)", maxWidth: 200, lineHeight: 1.4, fontSize: 12, verticalAlign: "top" }}>{row.takes}</td>
                    <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--line2)", color: "var(--fg2)", maxWidth: 280, lineHeight: 1.4, fontSize: 12, verticalAlign: "top" }}>{row.produces}</td>
                    <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--line2)", fontFamily: "var(--mono)", fontSize: 11, color: "var(--mut)", whiteSpace: "nowrap", verticalAlign: "top" }}>{row.out}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Get the method */}
      <section id="get" className="sec alt">
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--gap-split)", alignItems: "start" }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: "var(--sp-16)" }}>Get the method</p>
              <h2 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h2)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h2)", lineHeight: "var(--lh-h2)", marginBottom: "var(--sp-24)" }}>
                Run it in Obsidian today.
              </h2>
              <p className="lead" style={{ maxWidth: "44ch", marginBottom: "var(--sp-32)" }}>
                The method lives in a public GitHub repository, MIT-licensed. Download the vault, open it in Obsidian, and run your first diligence today.
              </p>
              <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "var(--sp-24)" }}>
                {[
                  { n: "1", title: "Download the vault", body: "A zip of the Obsidian vault. Every template, every evidence rule, the full method in one readable note." },
                  { n: "2", title: "Open in Obsidian", body: 'Open Obsidian, choose "Open folder as vault", and select the unzipped folder. The vault is ready.' },
                  { n: "3", title: "Pick a route", body: "Open the Investment route folder. One note per section, with the evidence rules built in." },
                  { n: "4", title: "Fill the ledger", body: "Add sources to the evidence ledger as they arrive. Each one is classified, graded and tagged to the sections it touches." },
                ].map((step) => (
                  <li key={step.n} style={{ display: "flex", gap: "var(--sp-16)", alignItems: "flex-start" }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--fg)", color: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--mono)", fontSize: 12, fontWeight: 600, flexShrink: 0 }}>{step.n}</div>
                    <div>
                      <div style={{ fontWeight: "var(--fw-semibold)", fontSize: 16, marginBottom: "var(--sp-4)" }}>{step.title}</div>
                      <p className="small" style={{ margin: 0, color: "var(--fg2)", lineHeight: 1.5 }}>{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-20)" }}>
              <div style={{ padding: "var(--sp-32)", background: "var(--bg2)", border: "1px solid var(--line)", borderRadius: "var(--r-card)", display: "flex", flexDirection: "column", gap: "var(--sp-20)" }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mut)" }}>Download</div>
                <div>
                  <div style={{ fontWeight: "var(--fw-bold)", fontSize: 18, marginBottom: "var(--sp-4)" }}>TheDiligence vault</div>
                  <div style={{ fontSize: 13, color: "var(--mut)", marginBottom: "var(--sp-8)" }}>MIT licence · Requires Obsidian</div>
                  <p className="small" style={{ margin: 0, color: "var(--fg2)", lineHeight: 1.5 }}>An Obsidian vault with the five-route template set, the evidence ledger, the confidence formula and the changelog.</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-10)" }}>
                  {isRepoPublic ? (
                    <a href="https://github.com/thediligencestack/method" target="_blank" rel="noopener noreferrer" className="btn btn-p">Download from GitHub</a>
                  ) : (
                    <div className="btn btn-p" style={{ opacity: 0.45, cursor: "not-allowed", textDecoration: "none", textAlign: "center" }}>Download from GitHub · Soon</div>
                  )}
                  <a href="/book" className="btn btn-s">Ask us to run it instead</a>
                </div>
              </div>
              {!isRepoPublic && (
                <div style={{ padding: "var(--sp-14) var(--sp-18)", background: "var(--surf)", border: "1px solid var(--line2)", borderRadius: "var(--r-card)" }}>
                  <p className="small" style={{ margin: 0, color: "var(--fg2)", lineHeight: 1.5 }}>The repository will be public at launch. Get on the list and we will send it to you on day one.</p>
                </div>
              )}
              <div style={{ padding: "var(--sp-14) var(--sp-18)", background: "var(--bg2)", border: "1px solid var(--line2)", borderRadius: "var(--r-card)" }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mut)", marginBottom: 8 }}>Already using Claude Code or another agent?</div>
                <p className="small" style={{ margin: 0, color: "var(--fg2)", lineHeight: 1.5 }}>The skills are available as Claude.ai skills today. Install them from the skills directory, and run them from any prompt that can install skills.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="band">
        <div className="wrap" style={{ textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h2)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h2)", lineHeight: "var(--lh-h2)", color: "var(--bg)", marginBottom: "var(--sp-24)" }}>
            Run the method. Own the output.
          </h2>
          <p style={{ fontSize: "var(--fs-lead)", color: "var(--bg)", opacity: 0.75, marginBottom: "var(--sp-40)", maxWidth: "44ch", marginInline: "auto" }}>
            Download the vault and run it yourself. Or connect a provider and let the agents run it for you.
          </p>
          <div style={{ display: "flex", gap: "var(--gap-s)", justifyContent: "center", flexWrap: "wrap" }}>
            <a href={primaryHref} className="btn btn-p">Run with agents</a>
            <a href="#get" className="btn btn-s">Download the vault</a>
          </div>
        </div>
      </section>
    </main>
  );
}
