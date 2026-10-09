import "@/lib/schemas";
import { logosVisible, platformOpen } from "@/lib/flags";

export const metadata = {
  title: "TheDiligence — Diligence built by operator-investors",
  description:
    "Evidence-graded investment diligence. Specialist agents, orchestrated. Every claim carries its source.",
};

/* ─── tiny helpers ────────────────────────────────────────────── */

function Chip({
  label,
  tone = "build",
}: {
  label: string;
  tone?: "live" | "build" | "plan";
}) {
  return (
    <span className={`status st-${tone}`} style={{ fontSize: "11px" }}>
      {label}
    </span>
  );
}

function Grade({
  g,
  filled,
}: {
  g: "A" | "B" | "C";
  filled?: boolean;
}) {
  return (
    <span
      className={`gr${g === "A" && filled ? " gr-a" : ""}${g === "C" ? " gr-c" : ""}`}
      style={{ width: 20, height: 20, fontSize: 11, flexShrink: 0 }}
    >
      {g}
    </span>
  );
}

function Src({ id, label }: { id: string; label: string }) {
  return (
    <span style={{ display: "inline-flex", gap: 6, alignItems: "center", flexShrink: 0 }}>
      <span className="src">{id}</span>
      <span style={{ fontSize: 12, color: "var(--mut)", whiteSpace: "nowrap" }}>{label}</span>
    </span>
  );
}

/* ─── Workspace illustration ──────────────────────────────────── */
function WorkspaceIll() {
  const AGENTS = [
    { name: "Market", sub: "Sandbox 1 · Standard", detail: "Done, 14 sources", cost: "2.31", done: true },
    { name: "Interviews", sub: "Sandbox 2 · Light", detail: "Done, 5 transcripts", cost: "0.41", done: true },
    { name: "Company", sub: "Sandbox 1 · Frontier", detail: "Done, 9 claims and 7 graded A", cost: "2.78", done: true },
    { name: "Cohorts", sub: "Sandbox 3 · Standard", detail: "Done, 24 months of data", cost: "0.33", done: true },
    { name: "User panel", sub: "Sandbox 4 · Light", detail: "Running, 4 of 6 personas", cost: "0.98", running: true },
    { name: "Technology", sub: "Sandbox 5 · Standard", detail: "Running, reading the contract", cost: "0.84", running: true },
    { name: "Product", sub: "After Cohorts, Panel", detail: "Waiting for the panel", cost: "3.50", waiting: true, est: true },
    { name: "Verifier", sub: "Different model family", detail: "Last step", cost: "1.50", waiting: true, est: true },
  ];

  return (
    <div
      style={{ background: "var(--surf)", border: "1px solid var(--line)", borderRadius: "var(--r-win)", boxShadow: "var(--sh-win)", overflow: "hidden", fontFamily: "var(--sans)", fontSize: 13, userSelect: "none" }}
      aria-hidden="true"
    >
      {/* title bar */}
      <div style={{ height: 44, background: "var(--surf2)", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", padding: "0 20px", gap: 12 }}>
        <span style={{ fontFamily: "var(--serif)", fontSize: 15, fontWeight: 400, color: "var(--fg)", marginRight: "auto" }}>TheDiligence</span>
        <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--mut)", letterSpacing: "0.06em" }}>Northwind · illustrative</span>
        <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--mut)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Workspace</span>
      </div>

      <div style={{ display: "flex" }}>
        {/* sidebar */}
        <div style={{ width: 180, borderRight: "1px solid var(--line)", padding: "12px 0", flexShrink: 0, background: "var(--surf2)" }}>
          {[
            { name: "Globex", warn: true },
            { name: "Northwind", active: true },
            { name: "Initech" },
          ].map((ws) => (
            <div key={ws.name} style={{ padding: "8px 16px", background: ws.active ? "var(--bg2)" : "transparent", borderRadius: "var(--r-chip)", margin: "1px 8px" }}>
              <div style={{ fontSize: 13, fontWeight: ws.active ? 600 : 400, color: ws.active ? "var(--fg)" : "var(--fg2)" }}>{ws.name}</div>
              {ws.warn && (
                <div style={{ marginTop: 2 }}>
                  <span className="status" style={{ fontSize: 10, background: "var(--tn-orange-bg)", color: "var(--tn-orange-fg)" }}>Needs you</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* main panel */}
        <div style={{ flex: 1, overflow: "hidden", minWidth: 0 }}>
          <div style={{ padding: "12px 20px 0", borderBottom: "1px solid var(--line)" }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: "var(--fg)", marginBottom: 8 }}>Northwind</div>
            <div style={{ display: "flex", gap: 20, fontSize: 12 }}>
              {["Memo", "Changes", "Evidence", "Runs"].map((t, i) => (
                <span key={t} style={{ paddingBottom: 8, borderBottom: i === 3 ? "2px solid var(--fg)" : "none", color: i === 3 ? "var(--fg)" : "var(--mut)", fontWeight: i === 3 ? 600 : 400 }}>{t}</span>
              ))}
            </div>
          </div>

          <div style={{ padding: "16px 20px" }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mut)", marginBottom: 12 }}>Investment route · Plan V1</div>

            {AGENTS.map((a) => (
              <div key={a.name} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 0", borderBottom: "1px solid var(--line2)" }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: a.done ? "var(--green)" : a.running ? "var(--blue)" : "var(--mut)", flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 12, color: "var(--fg)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.name}</div>
                  <div style={{ fontSize: 11, color: "var(--mut)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.sub}</div>
                </div>
                <div style={{ fontSize: 11, color: a.done ? "var(--green-t)" : "var(--mut)", flexShrink: 0 }}>{a.detail}</div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--fg2)", minWidth: 36, textAlign: "right", flexShrink: 0 }}>
                  {a.est && <span style={{ color: "var(--mut)", marginRight: 2 }}>est.</span>}{a.cost}
                </div>
              </div>
            ))}

            <div style={{ marginTop: 12, padding: "10px 14px", background: "var(--wash-warn-bg)", border: "1px solid var(--wash-warn-bd)", borderRadius: "var(--r-8)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--fg)" }}>Gate: product verdict</div>
                <div style={{ fontSize: 11, color: "var(--fg2)" }}>The run pauses here until you approve.</div>
              </div>
              <div style={{ padding: "5px 12px", background: "var(--fg)", color: "var(--bg)", borderRadius: "var(--r-pill)", fontSize: 11, fontWeight: 600, flexShrink: 0 }}>Review</div>
            </div>
          </div>
        </div>

        {/* right panels */}
        <div style={{ width: 188, borderLeft: "1px solid var(--line)", padding: "16px 14px", flexShrink: 0, display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mut)", marginBottom: 8 }}>Cost</div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 26, fontWeight: 700, color: "var(--fg)", letterSpacing: "-0.02em" }}>7.65</div>
            <div style={{ fontSize: 11, color: "var(--mut)" }}>of 15.15 · estimate</div>
            <div style={{ fontSize: 11, color: "var(--mut)" }}>cap 20</div>
            <div style={{ marginTop: 8, height: 3, background: "var(--track)", borderRadius: 999, overflow: "hidden" }}>
              <div style={{ height: "100%", width: "50%", background: "var(--fg)", borderRadius: 999 }} />
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mut)", marginBottom: 8 }}>Evidence so far</div>
            {([["A", 14], ["B", 9], ["C", 3]] as const).map(([g, n]) => (
              <div key={g} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <Grade g={g} filled={g === "A"} />
                <span style={{ fontFamily: "var(--mono)", fontSize: 16, fontWeight: 700, color: "var(--fg)" }}>{n}</span>
              </div>
            ))}
            <p style={{ fontSize: 11, color: "var(--mut)", marginTop: 8, lineHeight: 1.4 }}>Every claim has a source id. Nothing unsourced is written, unless flagged C.</p>
          </div>
          <div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mut)", marginBottom: 6 }}>Verifier</div>
            <p style={{ fontSize: 11, color: "var(--fg2)", lineHeight: 1.45, margin: 0 }}>Runs on a different model family than the writers.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Memo illustration ───────────────────────────────────────── */
function MemoIll() {
  const SECTIONS = [
    { name: "Product", conf: "Medium confidence", claim: "Retention flattens after the ninth month.", g: "A" as const, id: "P-01", src: "data room export" },
    { name: "Company", conf: "High confidence", claim: "Founders hold a majority and the digital leader reports to the CEO.", g: "A" as const, id: "S-07", src: "registry filing" },
    { name: "Technology", conf: "Medium confidence", claim: "The uptime guarantee is claimed but missing from the customer contract.", g: "B" as const, id: "I-04", src: "call notes" },
    { name: "Market", conf: "Low confidence", claim: "Demand is moving from point tools to platforms in the mid-market.", g: "C" as const, id: "S-03", src: "single analyst estimate" },
  ];

  return (
    <div style={{ background: "var(--surf)", border: "1px solid var(--line)", borderRadius: "var(--r-win)", boxShadow: "var(--sh-win)", overflow: "hidden", fontFamily: "var(--sans)", fontSize: 13, userSelect: "none" }} aria-hidden="true">
      {/* bar */}
      <div style={{ height: 44, background: "var(--surf2)", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", padding: "0 20px", gap: 4 }}>
        <span style={{ fontWeight: 700, fontSize: 13, color: "var(--fg)", marginRight: 12 }}>Northwind</span>
        {["Memo", "Changes", "Evidence", "Stack", "Runs"].map((t, i) => (
          <span key={t} style={{ padding: "12px 10px 10px", borderBottom: i === 0 ? "2px solid var(--fg)" : "none", color: i === 0 ? "var(--fg)" : "var(--mut)", fontWeight: i === 0 ? 600 : 400, fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}>
            {t}{t === "Changes" && <span style={{ background: "var(--fg)", color: "var(--bg)", borderRadius: "var(--r-pill)", fontSize: 10, padding: "0 4px", lineHeight: "15px" }}>2</span>}
          </span>
        ))}
        <span style={{ marginLeft: "auto", fontFamily: "var(--mono)", fontSize: 10, color: "var(--mut)", letterSpacing: "0.06em" }}>Deal stage: IC</span>
      </div>

      <div style={{ padding: "20px 24px" }}>
        <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mut)", marginBottom: 16, display: "flex", justifyContent: "space-between" }}>
          <span>Investment route · Delivered</span>
          <span style={{ fontSize: 11, textTransform: "none", letterSpacing: 0, color: "var(--blue-t)" }}>Show sources</span>
        </div>

        {/* verdict */}
        <div style={{ marginBottom: 20, padding: "14px 16px", background: "var(--bg2)", borderRadius: "var(--r-10)", border: "1px solid var(--line)" }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mut)", marginBottom: 6 }}>Verdict</div>
          <div style={{ fontWeight: 700, fontSize: 17, color: "var(--fg)", marginBottom: 4 }}>Conditional</div>
          <div style={{ fontSize: 13, color: "var(--fg2)", marginBottom: 8 }}>Invest if onboarding is fixed.</div>
          <div style={{ fontSize: 11, color: "var(--mut)" }}>Evidence-graded analysis, not investment advice.</div>
        </div>

        {SECTIONS.map((s) => (
          <div key={s.name} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 0", borderBottom: "1px solid var(--line2)" }}>
            <Grade g={s.g} filled={s.g === "A"} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--fg2)" }}>{s.name}</span>
                <span style={{ fontSize: 11, color: "var(--mut)" }}>{s.conf}</span>
              </div>
              <div style={{ fontSize: 12.5, color: "var(--fg)", lineHeight: 1.4 }}>{s.claim}</div>
            </div>
            <Src id={s.id} label={s.src} />
          </div>
        ))}

        <div style={{ marginTop: 16, padding: "10px 14px", background: "var(--bg2)", borderRadius: "var(--r-8)", fontSize: 12 }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--mut)", marginBottom: 6 }}>Data still needed · Appendix</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ color: "var(--fg2)" }}>Management accounts, last 24 months</span>
            <span style={{ fontSize: 11, color: "var(--blue-t)" }}>Request from founder</span>
          </div>
        </div>

        <p style={{ marginTop: 12, fontSize: 11, color: "var(--mut)", fontStyle: "italic" }}>Illustrative composite. Not a real company.</p>
      </div>
    </div>
  );
}

/* ─── Plan illustration ───────────────────────────────────────── */
function PlanIll() {
  const AGENTS = [
    { name: "Market", cmd: "/marketdd", starts: "Starts now", tier: "Standard", est: "2.40" },
    { name: "Interviews", cmd: "/interviewlog", starts: "Starts now", tier: "Light", est: "0.50" },
    { name: "Company", cmd: "/duediligence", starts: "After Market", tier: "Frontier", est: "2.70" },
    { name: "Cohorts", cmd: "/cohortlab", starts: "After Company", tier: "Standard", est: "0.35" },
    { name: "User panel", cmd: "/personapanel", starts: "After Company", tier: "Light", est: "1.50" },
    { name: "Product", cmd: "/productdd", starts: "After Cohorts, Panel", tier: "Frontier", est: "3.50" },
    { name: "Technology", cmd: "/technicaldd", starts: "After Company", tier: "Standard", est: "2.70" },
    { name: "Verifier and coordinator", cmd: "", starts: "Last", tier: "Frontier", est: "1.50" },
  ];

  return (
    <div style={{ background: "var(--surf)", border: "1px solid var(--line)", borderRadius: "var(--r-win)", boxShadow: "var(--sh-win)", overflow: "hidden", fontFamily: "var(--sans)", fontSize: 13, userSelect: "none" }} aria-hidden="true">
      <div style={{ height: 44, background: "var(--surf2)", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", padding: "0 20px", gap: 8 }}>
        <span style={{ fontSize: 12, color: "var(--mut)" }}>New target</span>
        <span style={{ fontSize: 12, color: "var(--mut)" }}>·</span>
        <span style={{ fontWeight: 600, fontSize: 13, color: "var(--fg)" }}>Northwind</span>
      </div>

      <div style={{ padding: "16px 20px" }}>
        <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mut)", marginBottom: 12 }}>Investment route · about 25 min · 1 gate</div>

        <div style={{ display: "flex", gap: 6, marginBottom: 10, alignItems: "center", flexWrap: "wrap" }}>
          {["Economy", "Balanced", "Frontier"].map((t, i) => (
            <span key={t} style={{ padding: "4px 10px", borderRadius: "var(--r-pill)", fontSize: 11, fontWeight: i === 1 ? 600 : 400, background: i === 1 ? "var(--fg)" : "transparent", color: i === 1 ? "var(--bg)" : "var(--fg2)", border: i === 1 ? "none" : "1px solid var(--line)" }}>{t}</span>
          ))}
          <span style={{ fontSize: 11, color: "var(--mut)" }}>Frontier where the verdict is made, standard and light elsewhere.</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 1fr 0.8fr", gap: "0 12px", padding: "6px 0", borderBottom: "1px solid var(--line)" }}>
          {["Agent", "Starts", "Tier", "Estimate"].map((h) => (
            <span key={h} style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mut)" }}>{h}</span>
          ))}
        </div>

        {AGENTS.map((a) => (
          <div key={a.name} style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 1fr 0.8fr", gap: "0 12px", padding: "7px 0", borderBottom: "1px solid var(--line2)", alignItems: "center" }}>
            <div>
              <span style={{ fontWeight: 500, fontSize: 12, color: "var(--fg)" }}>{a.name}</span>
              {a.cmd && <span style={{ marginLeft: 6, fontFamily: "var(--mono)", fontSize: 10, color: "var(--mut)" }}>{a.cmd}</span>}
            </div>
            <span style={{ fontSize: 11, color: "var(--fg2)" }}>{a.starts}</span>
            <span style={{ fontSize: 11, color: a.tier === "Frontier" ? "var(--blue-t)" : a.tier === "Light" ? "var(--mut)" : "var(--fg2)", fontWeight: a.tier === "Frontier" ? 600 : 400 }}>{a.tier}</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--fg2)", textAlign: "right" }}>{a.est}</span>
          </div>
        ))}

        <div style={{ marginTop: 12, padding: "12px 0", borderTop: "1px solid var(--line)", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mut)", marginBottom: 2 }}>Estimate</div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 24, fontWeight: 700, color: "var(--fg)", letterSpacing: "-0.02em" }}>15.15</div>
            <div style={{ fontSize: 11, color: "var(--mut)" }}>4.85 under your cap · cap 20.00</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ padding: "7px 14px", background: "var(--fg)", color: "var(--bg)", borderRadius: "var(--r-pill)", fontSize: 12, fontWeight: 600 }}>Approve and run</div>
            <div style={{ padding: "7px 14px", background: "transparent", color: "var(--fg2)", borderRadius: "var(--r-pill)", fontSize: 12, border: "1px solid var(--line)" }}>Save, run later</div>
          </div>
        </div>
        <p style={{ fontSize: 11, color: "var(--mut)", fontStyle: "italic", marginTop: 8 }}>Illustrative plan. A new revenue export later: rebuild 2 of 8 for 3.85</p>
      </div>
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────────────── */
export default async function HomePage() {
  const [isOpen, showLogos] = await Promise.all([
    platformOpen(),
    logosVisible(),
  ]);

  const primaryHref = isOpen ? "/app" : "/book";

  return (
    <main id="main-content">
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="hero sec" style={{ paddingBottom: "var(--sp-64)" }}>
        <div className="wrap" style={{ maxWidth: "var(--hero-max)", margin: "0 auto", textAlign: "center" }}>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h1)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h1)", lineHeight: "var(--lh-h1)", color: "var(--fg)", marginBottom: "var(--sp-24)" }}>
            Diligence.
          </h1>
          <p style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h3)", fontWeight: 400, letterSpacing: "var(--ls-h3)", lineHeight: 1.25, color: "var(--fg2)", marginBottom: "var(--sp-32)", maxWidth: "var(--measure-hero)", marginInline: "auto" }}>
            Built by operator-investors, for operator-investors.
          </p>
          <p className="lead" style={{ maxWidth: "54ch", marginInline: "auto", marginBottom: "var(--sp-40)" }}>
            Run by skilled agents, orchestrated for evidence. Every claim carries its source.
          </p>
          <div style={{ display: "flex", gap: "var(--gap-s)", flexWrap: "wrap", justifyContent: "center", marginBottom: "var(--sp-16)" }}>
            <a href={primaryHref} className="btn btn-p">Start free</a>
            <a href="/book" className="btn btn-s">Book time with us</a>
          </div>
          <p className="small">Free plan: one diligence a week. Connect your own model.</p>
        </div>
      </section>

      {/* ── Workspace illustration ────────────────────────────── */}
      <section style={{ paddingBottom: "var(--sec-y)" }}>
        <div className="wrap"><WorkspaceIll /></div>
      </section>

      {/* ── RUN BY SKILLED AGENTS ─────────────────────────────── */}
      <section className="sec alt">
        <div className="wrap">
          <div style={{ maxWidth: "var(--head-max)", marginBottom: "var(--head-mb)" }}>
            <p className="eyebrow" style={{ marginBottom: "var(--sp-16)" }}>Run by skilled agents</p>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h2)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h2)", lineHeight: "var(--lh-h2)", marginBottom: "var(--sp-24)" }}>
              Orchestrated for evidence, not for chat.
            </h2>
            <p className="lead" style={{ maxWidth: "62ch" }}>
              Most AI tools answer a question. This one runs an investigation. A coordinator plans the work, specialists carry it out in isolation, every claim lands in a ledger with its source, and a second model checks the writer before you read a word.
            </p>
          </div>

          {/* 5 steps */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "var(--gap-grid)", marginBottom: "var(--sp-64)" }}>
            {[
              { n: "01", title: "You set the target", body: "A company, a purpose and what you already hold: a deck, a revenue export, interviews.", tags: ["Company", "Purpose", "Inputs"] },
              { n: "02", title: "The coordinator plans and prices", body: "It drafts the route, assigns a model tier to each agent, lists what is missing and shows the cost. Nothing runs until you approve.", tags: ["Route", "Cost", "Gates"] },
              { n: "03", title: "Specialists run in isolation", body: "One agent per question, each in its own sandbox with a clean context and no access to your credentials.", tags: ["Market", "Company", "Product", "Technology"] },
              { n: "04", title: "The ledger holds every claim", body: "Each claim is written with a source id and a grade. No source, no claim, unless it is flagged as an estimate.", tags: ["A", "B", "C", "S-07", "P-01"] },
              { n: "05", title: "A second model checks, you decide", body: "The verifier runs on another model family and lists what could not be checked. You approve the verdict at the gate.", tags: ["Verifier", "Gate", "Memo"] },
            ].map((step) => (
              <div key={step.n} className="card" style={{ display: "flex", flexDirection: "column", gap: "var(--sp-12)" }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: "var(--fs-tiny)", fontWeight: "var(--fw-semibold)", letterSpacing: "0.12em", color: "var(--mut)" }}>{step.n}</span>
                <h3 style={{ fontSize: "17px", fontWeight: "var(--fw-semibold)", lineHeight: 1.3, margin: 0 }}>{step.title}</h3>
                <p className="small" style={{ margin: 0, flex: 1, lineHeight: 1.55 }}>{step.body}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {step.tags.map((t) => <span key={t} className="src">{t}</span>)}
                </div>
              </div>
            ))}
          </div>

          {/* 4 differentiators */}
          <div className="g4">
            {[
              { title: "Specialists, not a chatbot", body: "One agent per question: market, company, product, technology, first 100 days. Each runs the open method in its own sandbox with a clean context." },
              { title: "A ledger, not a transcript", body: "Every claim carries a source id and a grade, A, B or C. A claim with no source cannot be written, unless it is flagged as an estimate." },
              { title: "A verifier that is not the writer", body: "A second model family reviews the memo against the evidence rules and lists what it could not check. One vendor's blind spot stays out of your memo." },
              { title: "Agents and people, one workflow", body: "Agents plan, read and draft. People decide, and nothing leaves without one. Gates reach you by email, and soon your own agents join through MCP." },
            ].map((d) => (
              <div key={d.title} className="card">
                <h3 style={{ fontSize: "17px", fontWeight: "var(--fw-semibold)", marginBottom: "var(--sp-10)" }}>{d.title}</h3>
                <p className="small" style={{ margin: 0, lineHeight: 1.55, color: "var(--fg2)" }}>{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE MEMO ──────────────────────────────────────────── */}
      <section className="sec">
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "var(--gap-split)", alignItems: "start" }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: "var(--sp-16)" }}>The memo</p>
              <h2 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h2)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h2)", lineHeight: "var(--lh-h2)", marginBottom: "var(--sp-24)" }}>
                Every claim graded. Every source one click away.
              </h2>
              <p className="lead" style={{ maxWidth: "48ch", marginBottom: "var(--sp-32)" }}>
                Open any section to see what the agents read, what they decided and why. A claim you cannot trace does not reach the page.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-20)", marginBottom: "var(--sp-40)" }}>
                {[
                  { g: "A" as const, label: "Verified", desc: "In a primary source: a filing, a contract, a data export." },
                  { g: "B" as const, label: "Reported", desc: "By a credible source: a call, a trade report." },
                  { g: "C" as const, label: "Estimated", desc: "Flagged as an estimate, and never presented as fact." },
                ].map(({ g, label, desc }) => (
                  <div key={g} style={{ display: "flex", gap: "var(--sp-14)", alignItems: "flex-start" }}>
                    <Grade g={g} filled={g === "A"} />
                    <div>
                      <div style={{ fontWeight: "var(--fw-semibold)", fontSize: "15px", marginBottom: "var(--sp-4)" }}>{label}</div>
                      <div className="small" style={{ color: "var(--fg2)" }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <MemoIll />
          </div>
        </div>
      </section>

      {/* ── EVIDENCE ──────────────────────────────────────────── */}
      <section className="sec alt">
        <div className="wrap">
          <div style={{ maxWidth: "var(--head-max)", marginBottom: "var(--head-mb)" }}>
            <p className="eyebrow" style={{ marginBottom: "var(--sp-16)" }}>Evidence</p>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h2)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h2)", lineHeight: "var(--lh-h2)", marginBottom: "var(--sp-24)" }}>
              The more evidence you add, the better the memo.
            </h2>
            <p className="lead" style={{ maxWidth: "62ch" }}>
              Public sources get a diligence started. Value and accuracy come from what nobody has published: customer interviews, the ones who left as much as the ones who stayed, and the founders and teams of your competitors. Every layer turns estimates into verified claims.
            </p>
          </div>

          <div className="g4" style={{ marginBottom: "var(--sp-64)" }}>
            {[
              { tag: "Agents", label: "Public sources and filings", body: "What the agents fetch themselves. Always on." },
              { tag: "You upload", label: "Management accounts and data room", body: "Accounts, a revenue export, contracts. Agents read, grade and cross-check them." },
              { tag: "You or us", label: "Interviews with loyal customers", body: "Why they stay and what they would pay for. Upload the calls, or we run them." },
              { tag: "We run it", label: "Competitors: founders and teams", body: "What the alternatives really build, and who builds it." },
            ].map((tier) => (
              <div key={tier.label} className="card">
                <p style={{ fontFamily: "var(--mono)", fontSize: "11px", fontWeight: "var(--fw-semibold)", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--mut)", marginBottom: "var(--sp-10)" }}>{tier.tag}</p>
                <h3 style={{ fontSize: "17px", fontWeight: "var(--fw-semibold)", marginBottom: "var(--sp-8)" }}>{tier.label}</h3>
                <p className="small" style={{ margin: 0, color: "var(--fg2)", lineHeight: 1.55 }}>{tier.body}</p>
              </div>
            ))}
          </div>

          {/* grade summary */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--gap-split)", alignItems: "center" }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: "var(--sp-20)" }}>The memo&apos;s evidence, 60 claims</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-14)", marginBottom: "var(--sp-32)" }}>
                {([["A", 17, "verified"], ["B", 28, "reported"], ["C", 15, "estimated"]] as const).map(([g, n, label]) => (
                  <div key={g} style={{ display: "flex", alignItems: "center", gap: "var(--sp-14)" }}>
                    <Grade g={g} filled={g === "A"} />
                    <span style={{ fontFamily: "var(--mono)", fontSize: "var(--fs-h4)", fontWeight: "var(--fw-bold)", color: "var(--fg)" }}>{n}</span>
                    <span className="small" style={{ color: "var(--mut)" }}>{label}</span>
                  </div>
                ))}
              </div>
              <p className="small" style={{ marginBottom: "var(--sp-20)" }}>Medium confidence, score 0.52. A draft a committee can argue with, because each claim shows its source.</p>
              <p className="tiny" style={{ color: "var(--mut)", marginBottom: "var(--sp-32)" }}>Illustrative mix of 60 claims, not a measured accuracy. Your own memo shows its real grades.</p>
              <div style={{ display: "flex", gap: "var(--gap-s)" }}>
                <a href={primaryHref} className="btn btn-p">Run it</a>
                <a href="/book" className="btn btn-s">Book time with us</a>
              </div>
            </div>
            <div />
          </div>
        </div>
      </section>

      {/* ── COST CONTROL ──────────────────────────────────────── */}
      <section className="sec">
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "var(--gap-split)", alignItems: "start" }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: "var(--sp-16)" }}>Cost control</p>
              <h2 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h2)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h2)", lineHeight: "var(--lh-h2)", marginBottom: "var(--sp-24)" }}>
                Plan it. Price it. Then run it.
              </h2>
              <p className="lead" style={{ maxWidth: "44ch", marginBottom: "var(--sp-40)" }}>
                No run starts without a plan you have seen. Every agent has a price before it starts working, so the memo never surprises the bill.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "var(--sp-20)" }}>
                {[
                  "Priced per agent, before launch. Costs come from each agent's profile and the list prices of the providers you connected.",
                  "A budget cap the run obeys. Set the ceiling in the plan. A run that would cross it stops and delivers what exists.",
                  "Estimate against actual. After each run you see the drift, agent by agent, so the next estimate is closer.",
                  "Updates priced to what changed. New evidence rebuilds only the sections it touches, and shows that cost first.",
                ].map((point, i) => (
                  <li key={i} style={{ display: "flex", gap: "var(--sp-14)", alignItems: "flex-start" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--fg)", flexShrink: 0, marginTop: 7 }} />
                    <p className="small" style={{ margin: 0, lineHeight: 1.55, color: "var(--fg2)" }}>{point}</p>
                  </li>
                ))}
              </ul>
            </div>
            <PlanIll />
          </div>
        </div>
      </section>

      {/* ── TWO WAYS IN ───────────────────────────────────────── */}
      <section className="sec alt">
        <div className="wrap">
          <div style={{ maxWidth: "var(--head-max)", marginBottom: "var(--head-mb)" }}>
            <p className="eyebrow" style={{ marginBottom: "var(--sp-16)" }}>Two ways in</p>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h2)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h2)", lineHeight: "var(--lh-h2)" }}>
              Start on your own. Or bring us in.
            </h2>
          </div>
          <div className="g2">
            <div className="card">
              <p className="eyebrow" style={{ marginBottom: "var(--sp-16)" }}>For solo advisors, angels, small funds</p>
              <h3 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h3)", fontWeight: "var(--fw-semibold)", marginBottom: "var(--sp-16)" }}>Run it yourself, free.</h3>
              <p className="body" style={{ marginBottom: "var(--sp-28)", maxWidth: "44ch" }}>Sign in with an email code, connect your own model, plan a diligence and read the memo the same day. The method behind it is open source.</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "var(--sp-10)", marginBottom: "var(--sp-32)" }}>
                {["One diligence a week on the free plan", "Connect your own model. Approved on your provider's screen.", "Export to PDF, Google Doc or Notion"].map((b) => (
                  <li key={b} style={{ display: "flex", gap: "var(--sp-10)", alignItems: "flex-start" }}>
                    <span style={{ color: "var(--green-t)", fontWeight: "var(--fw-bold)", flexShrink: 0, lineHeight: 1.55 }}>✓</span>
                    <span className="small" style={{ color: "var(--fg2)" }}>{b}</span>
                  </li>
                ))}
              </ul>
              <div style={{ display: "flex", gap: "var(--gap-s)" }}>
                <a href={primaryHref} className="btn btn-p">Start free</a>
                <a href="/platform" className="btn btn-s">Plans and limits</a>
              </div>
            </div>
            <div className="card">
              <p className="eyebrow" style={{ marginBottom: "var(--sp-16)" }}>For funds and corporates</p>
              <h3 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h3)", fontWeight: "var(--fw-semibold)", marginBottom: "var(--sp-16)" }}>Hire the operators who wrote it.</h3>
              <p className="body" style={{ marginBottom: "var(--sp-28)", maxWidth: "44ch" }}>We run the memo, or the whole deal, from the target to the 100-day plan: finance, commercial, positioning, product, tech and value creation, backed by customer and team interviews.</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "var(--sp-10)", marginBottom: "var(--sp-32)" }}>
                {["5 to 15 customer interviews, and the churned ones", "The same ledger and grades as the platform", "Your security review answered in writing, before the first call"].map((b) => (
                  <li key={b} style={{ display: "flex", gap: "var(--sp-10)", alignItems: "flex-start" }}>
                    <span style={{ color: "var(--green-t)", fontWeight: "var(--fw-bold)", flexShrink: 0, lineHeight: 1.55 }}>✓</span>
                    <span className="small" style={{ color: "var(--fg2)" }}>{b}</span>
                  </li>
                ))}
              </ul>
              <div style={{ display: "flex", gap: "var(--gap-s)" }}>
                <a href="/book" className="btn btn-p">Book time with us</a>
                <a href="/solutions" className="btn btn-s">How we work</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECURITY AND COMPLIANCE ───────────────────────────── */}
      <section className="sec">
        <div className="wrap">
          <div style={{ maxWidth: "var(--head-max)", marginBottom: "var(--head-mb)" }}>
            <p className="eyebrow" style={{ marginBottom: "var(--sp-16)" }}>Security and compliance</p>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h2)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h2)", lineHeight: "var(--lh-h2)", marginBottom: "var(--sp-24)" }}>
              Built for data that cannot leave the building.
            </h2>
            <p className="lead" style={{ maxWidth: "62ch" }}>Your connections, your notes and your target&apos;s files each have a rule, and the rule is enforced by the architecture, not by a promise.</p>
          </div>
          <div className="g4" style={{ marginBottom: "var(--sp-40)" }}>
            {[
              { chip: "At launch", tone: "live" as const, title: "No credential near an agent", body: "Agents get a short-lived run token. You approve your provider through an OAuth connection, and a broker enforces the budget. Your key never reaches an agent." },
              { chip: "At launch", tone: "live" as const, title: "A vault that agents cannot read", body: "Term sheets and partner notes live in a vault we host and cannot read, encrypted in your browser. A note reaches an agent only when you share it, for one target." },
              { chip: "Next", tone: "build" as const, title: "Europe-only mode", body: "European hosting and model routing restricted to European regions, for funds whose data must stay in Europe." },
              { chip: "At launch", tone: "live" as const, title: "Nothing leaves without a person", body: "Agents have no tool that sends, posts or emails. They draft. Every export and every outreach is yours to approve." },
            ].map((f) => (
              <div key={f.title} className="card">
                <div style={{ marginBottom: "var(--sp-12)" }}><Chip label={f.chip} tone={f.tone} /></div>
                <h3 style={{ fontSize: "17px", fontWeight: "var(--fw-semibold)", marginBottom: "var(--sp-10)" }}>{f.title}</h3>
                <p className="small" style={{ margin: 0, color: "var(--fg2)", lineHeight: 1.55 }}>{f.body}</p>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: "var(--gap-s)" }}>
            <a href="/security" className="btn btn-s">Read the security page</a>
            <a href="/book" className="btn btn-s">Request a security review</a>
          </div>
        </div>
      </section>

      {/* ── THE OPEN METHOD ───────────────────────────────────── */}
      <section className="sec alt">
        <div className="wrap">
          <div style={{ maxWidth: "var(--head-max)", marginBottom: "var(--head-mb)" }}>
            <p className="eyebrow" style={{ marginBottom: "var(--sp-16)" }}>The open method</p>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h2)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h2)", lineHeight: "var(--lh-h2)", marginBottom: "var(--sp-24)" }}>
              Five stages. Written down, free to read.
            </h2>
            <p className="lead" style={{ maxWidth: "62ch" }}>All our expertise, written into open methods. The platform runs them; you can run them yourself.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "var(--gap-grid)", marginBottom: "var(--sp-40)" }}>
            {[
              { n: "1", label: "Market", q: "How big is the market?" },
              { n: "2", label: "Company", q: "Is it a good company?" },
              { n: "3", label: "Product", q: "Does it grow? What breaks at 10x?" },
              { n: "4", label: "Technology", q: "Does the tech back the claims?" },
              { n: "5", label: "First 100 days", q: "What do we fix first?" },
            ].map((s) => (
              <div key={s.n} className="card" style={{ display: "flex", flexDirection: "column", gap: "var(--sp-10)" }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: "var(--fs-tiny)", color: "var(--mut)", letterSpacing: "0.08em" }}>Stage {s.n}</span>
                <h3 style={{ fontSize: "17px", fontWeight: "var(--fw-bold)", margin: 0 }}>{s.label}</h3>
                <p className="small" style={{ margin: 0, color: "var(--fg2)", fontStyle: "italic" }}>{s.q}</p>
              </div>
            ))}
          </div>
          <a href="/method" className="btn btn-s">Read the method</a>
        </div>
      </section>

      {/* ── THE TEAM ──────────────────────────────────────────── */}
      <section className="sec">
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--gap-split)", alignItems: "start" }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: "var(--sp-16)" }}>The team</p>
              <h2 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h2)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h2)", lineHeight: "var(--lh-h2)", marginBottom: "var(--sp-24)" }}>
                Two operator-investors.
              </h2>
              <p className="lead" style={{ maxWidth: "44ch", marginBottom: "var(--sp-40)" }}>
                40 years combined operating at scale, at PayPal, Amazon, Safran, Decathlon and more. Four continents. Based in Paris and London.
              </p>
              <a href="/about" className="btn btn-s">About us</a>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-20)" }}>
              {[
                { initials: "IG", name: "Ismael Ghozael", role: "Operator-investor", href: "https://linkedin.com/in/ismaelghozael" },
                { initials: "MW", name: "Mazen Wazni", role: "Operator-investor", href: "https://linkedin.com" },
              ].map((p) => (
                <div key={p.name} className="card" style={{ display: "flex", alignItems: "center", gap: "var(--sp-16)", padding: "var(--sp-24)" }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--fg)", color: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--mono)", fontSize: 13, fontWeight: 600, flexShrink: 0 }}>{p.initials}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: "var(--fw-semibold)", fontSize: 16 }}>{p.name}</div>
                    <div className="small" style={{ color: "var(--mut)" }}>{p.role}</div>
                  </div>
                  <a href={p.href} target="_blank" rel="noopener noreferrer" className="btn btn-s" style={{ fontSize: "13px", padding: "6px 14px" }}>LinkedIn</a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── THEY TRUST US (flag-gated) ────────────────────────── */}
      {showLogos && (
        <section style={{ borderBlock: "1px solid var(--line2)", paddingBlock: "var(--sp-48)" }}>
          <div className="wrap">
            <p className="eyebrow" style={{ textAlign: "center", marginBottom: "var(--sp-32)" }}>They trust us</p>
            <div className="logos-row" style={{ justifyContent: "center" }}>
              {[
                { src: "/logos/paypal-ventures.svg", alt: "PayPal Ventures" },
                { src: "/logos/quadrille-capital.svg", alt: "Quadrille Capital" },
                { src: "/logos/tomcat-ventures.svg", alt: "TomCat Ventures" },
                { src: "/logos/the-good-ones.svg", alt: "The Good Ones" },
              ].map((logo) => (
                <img key={logo.alt} src={logo.src} alt={logo.alt} height={28} style={{ height: 28 }} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA band ──────────────────────────────────────────── */}
      <section className="band">
        <div className="wrap" style={{ textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h2)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h2)", lineHeight: "var(--lh-h2)", color: "var(--bg)", marginBottom: "var(--sp-24)" }}>
            Start a diligence you can defend.
          </h2>
          <p style={{ fontSize: "var(--fs-lead)", color: "var(--bg)", opacity: 0.75, marginBottom: "var(--sp-40)", maxWidth: "44ch", marginInline: "auto" }}>
            Run it yourself today, or tell us about the deal and we will scope it with you.
          </p>
          <div style={{ display: "flex", gap: "var(--gap-s)", justifyContent: "center", flexWrap: "wrap" }}>
            <a href={primaryHref} className="btn btn-p">Start free</a>
            <a href="/book" className="btn btn-s">Book time with us</a>
          </div>
        </div>
      </section>
    </main>
  );
}
