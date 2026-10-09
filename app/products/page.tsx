import { platformOpen } from "@/lib/flags";

export const metadata = {
  title: "Products — TheDiligence",
  description:
    "One platform, built around the evidence. Plan, run, memo, evidence, vault, workflow, models.",
};

const NAV_STOPS = [
  { id: "plan", label: "Plan" },
  { id: "run", label: "Run" },
  { id: "memo", label: "Memo" },
  { id: "evidence", label: "Evidence" },
  { id: "vault", label: "Vault" },
  { id: "workflow", label: "Workflow" },
  { id: "models", label: "Models" },
];

function Grade({ g, filled }: { g: "A" | "B" | "C"; filled?: boolean }) {
  return <span className={`gr${g === "A" && filled ? " gr-a" : ""}${g === "C" ? " gr-c" : ""}`} style={{ width: 20, height: 20, fontSize: 11, flexShrink: 0 }}>{g}</span>;
}

/* ─── Run illustration ──────────────────────────────────────────── */
function RunIll() {
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
    <div style={{ background: "var(--surf)", border: "1px solid var(--line)", borderRadius: "var(--r-win)", boxShadow: "var(--sh-win)", overflow: "hidden", fontFamily: "var(--sans)", fontSize: 13, userSelect: "none" }} aria-hidden="true">
      <div style={{ height: 44, background: "var(--surf2)", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", padding: "0 20px", gap: 12 }}>
        <span style={{ fontFamily: "var(--serif)", fontSize: 15, fontWeight: 400, color: "var(--fg)", marginRight: "auto" }}>TheDiligence</span>
        <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--mut)", letterSpacing: "0.06em" }}>Northwind · illustrative</span>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ width: 164, borderRight: "1px solid var(--line)", padding: "12px 0", flexShrink: 0, background: "var(--surf2)" }}>
          {[{ name: "Globex", warn: true }, { name: "Northwind", active: true }, { name: "Initech" }].map((ws) => (
            <div key={ws.name} style={{ padding: "7px 14px", background: ws.active ? "var(--bg2)" : "transparent", borderRadius: "var(--r-chip)", margin: "1px 6px" }}>
              <div style={{ fontSize: 12, fontWeight: ws.active ? 600 : 400, color: ws.active ? "var(--fg)" : "var(--fg2)" }}>{ws.name}</div>
              {ws.warn && <span className="status" style={{ fontSize: 9, background: "var(--tn-orange-bg)", color: "var(--tn-orange-fg)" }}>Needs you</span>}
            </div>
          ))}
        </div>
        <div style={{ flex: 1, overflow: "hidden" }}>
          <div style={{ padding: "12px 18px 0", borderBottom: "1px solid var(--line)" }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "var(--fg)", marginBottom: 8 }}>Northwind</div>
            <div style={{ display: "flex", gap: 16, fontSize: 12 }}>
              {["Memo", "Changes", "Evidence", "Runs"].map((t, i) => (
                <span key={t} style={{ paddingBottom: 8, borderBottom: i === 3 ? "2px solid var(--fg)" : "none", color: i === 3 ? "var(--fg)" : "var(--mut)", fontWeight: i === 3 ? 600 : 400 }}>{t}</span>
              ))}
            </div>
          </div>
          <div style={{ padding: "14px 18px" }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mut)", marginBottom: 10 }}>Investment route · Plan V1</div>
            {AGENTS.map((a) => (
              <div key={a.name} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: "1px solid var(--line2)" }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: a.done ? "var(--green)" : a.running ? "var(--blue)" : "var(--mut)", flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 11, color: "var(--fg)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.name}</div>
                  <div style={{ fontSize: 10, color: "var(--mut)" }}>{a.sub}</div>
                </div>
                <div style={{ fontSize: 10, color: a.done ? "var(--green-t)" : "var(--mut)", flexShrink: 0 }}>{a.detail}</div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--fg2)", minWidth: 32, textAlign: "right", flexShrink: 0 }}>{a.est && <span style={{ color: "var(--mut)" }}>est. </span>}{a.cost}</div>
              </div>
            ))}
            <div style={{ marginTop: 10, padding: "9px 12px", background: "var(--wash-warn-bg)", border: "1px solid var(--wash-warn-bd)", borderRadius: "var(--r-8)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: "var(--fg)" }}>Gate: product verdict</div>
                <div style={{ fontSize: 10, color: "var(--fg2)" }}>The run pauses here until you approve.</div>
              </div>
              <div style={{ padding: "4px 10px", background: "var(--fg)", color: "var(--bg)", borderRadius: "var(--r-pill)", fontSize: 10, fontWeight: 600, flexShrink: 0 }}>Review</div>
            </div>
          </div>
        </div>
        <div style={{ width: 172, borderLeft: "1px solid var(--line)", padding: "14px 12px", flexShrink: 0, display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mut)", marginBottom: 6 }}>Cost</div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 22, fontWeight: 700, color: "var(--fg)", letterSpacing: "-0.02em" }}>7.65</div>
            <div style={{ fontSize: 10, color: "var(--mut)" }}>of 15.15 · cap 20</div>
            <div style={{ marginTop: 6, height: 3, background: "var(--track)", borderRadius: 999 }}><div style={{ height: "100%", width: "50%", background: "var(--fg)", borderRadius: 999 }} /></div>
          </div>
          <div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mut)", marginBottom: 6 }}>Evidence so far</div>
            {([["A", 14], ["B", 9], ["C", 3]] as const).map(([g, n]) => (
              <div key={g} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                <Grade g={g} filled={g === "A"} />
                <span style={{ fontFamily: "var(--mono)", fontSize: 14, fontWeight: 700, color: "var(--fg)" }}>{n}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Memo illustration ─────────────────────────────────────────── */
function MemoIll() {
  const SECS = [
    { name: "Product", conf: "Medium", claim: "Retention flattens after the ninth month.", g: "A" as const, id: "P-01", src: "data room export" },
    { name: "Company", conf: "High", claim: "Founders hold a majority and the digital leader reports to the CEO.", g: "A" as const, id: "S-07", src: "registry filing" },
    { name: "Technology", conf: "Medium", claim: "The uptime guarantee is claimed but missing from the customer contract.", g: "B" as const, id: "I-04", src: "call notes" },
    { name: "Market", conf: "Low", claim: "Demand is moving from point tools to platforms in the mid-market.", g: "C" as const, id: "S-03", src: "single analyst estimate" },
  ];
  return (
    <div style={{ background: "var(--surf)", border: "1px solid var(--line)", borderRadius: "var(--r-win)", boxShadow: "var(--sh-win)", overflow: "hidden", fontFamily: "var(--sans)", fontSize: 13, userSelect: "none" }} aria-hidden="true">
      <div style={{ height: 44, background: "var(--surf2)", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", padding: "0 20px", gap: 4 }}>
        <span style={{ fontWeight: 700, fontSize: 13, color: "var(--fg)", marginRight: 12 }}>Northwind</span>
        {["Memo", "Changes", "Evidence", "Stack", "Runs"].map((t, i) => (
          <span key={t} style={{ padding: "12px 8px 10px", borderBottom: i === 0 ? "2px solid var(--fg)" : "none", color: i === 0 ? "var(--fg)" : "var(--mut)", fontWeight: i === 0 ? 600 : 400, fontSize: 12 }}>
            {t}{t === "Changes" && <span style={{ background: "var(--fg)", color: "var(--bg)", borderRadius: "var(--r-pill)", fontSize: 9, padding: "0 4px", marginLeft: 3, lineHeight: "14px" }}>2</span>}
          </span>
        ))}
      </div>
      <div style={{ padding: "18px 22px" }}>
        <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mut)", marginBottom: 14 }}>Investment route · Delivered</div>
        <div style={{ marginBottom: 18, padding: "12px 14px", background: "var(--bg2)", borderRadius: "var(--r-8)", border: "1px solid var(--line)" }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mut)", marginBottom: 5 }}>Verdict</div>
          <div style={{ fontWeight: 700, fontSize: 16, color: "var(--fg)", marginBottom: 3 }}>Conditional</div>
          <div style={{ fontSize: 12.5, color: "var(--fg2)" }}>Invest if onboarding is fixed.</div>
        </div>
        {SECS.map((s) => (
          <div key={s.name} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 0", borderBottom: "1px solid var(--line2)" }}>
            <Grade g={s.g} filled={s.g === "A"} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 9, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--fg2)", marginBottom: 2 }}>{s.name} · {s.conf} confidence</div>
              <div style={{ fontSize: 12, color: "var(--fg)", lineHeight: 1.4 }}>{s.claim}</div>
            </div>
            <div style={{ display: "flex", gap: 4, alignItems: "center", flexShrink: 0 }}>
              <span className="src">{s.id}</span>
              <span style={{ fontSize: 11, color: "var(--mut)", whiteSpace: "nowrap" }}>{s.src}</span>
            </div>
          </div>
        ))}
        <p style={{ marginTop: 10, fontSize: 11, color: "var(--mut)", fontStyle: "italic" }}>Illustrative composite. Not a real company.</p>
      </div>
    </div>
  );
}

/* ─── Evidence ledger ───────────────────────────────────────────── */
function EvidenceLedgerIll() {
  const ROWS = [
    { id: "P-01", source: "Revenue export, 12 months", cls: "target-confidential", g: "A", usedBy: "Cohorts, Product" },
    { id: "S-07", source: "Registry filing", cls: "public", g: "A", usedBy: "Company" },
    { id: "I-04", source: "Customer call notes", cls: "target-confidential", g: "B", usedBy: "Technology" },
    { id: "S-03", source: "Analyst estimate", cls: "public", g: "C", usedBy: "Market" },
  ];
  return (
    <div style={{ background: "var(--surf)", border: "1px solid var(--line)", borderRadius: "var(--r-win)", boxShadow: "var(--sh-win)", overflow: "hidden", fontFamily: "var(--sans)", fontSize: 13, userSelect: "none" }} aria-hidden="true">
      <div style={{ height: 44, background: "var(--surf2)", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", padding: "0 20px", gap: 8 }}>
        <span style={{ fontWeight: 700, fontSize: 13, color: "var(--fg)" }}>Northwind · Evidence</span>
        <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--mut)", fontStyle: "italic" }}>Illustrative</span>
      </div>
      <div style={{ padding: "16px 20px" }}>
        <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mut)", marginBottom: 12 }}>Evidence ledger · Drop a file, see exactly what it touches</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "var(--bg2)", border: "1.5px dashed var(--line)", borderRadius: "var(--r-8)", marginBottom: 14 }}>
          <span style={{ fontSize: 11, color: "var(--mut)" }}>Drop revenue_export_24m.csv</span>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11.5 }}>
          <thead>
            <tr>
              {["ID", "Source", "Class", "Grade", "Used by"].map((h) => (
                <th key={h} style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mut)", textAlign: "left", padding: "6px 8px", borderBottom: "1px solid var(--line)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.id}>
                <td style={{ padding: "8px", borderBottom: "1px solid var(--line2)" }}><span className="src">{row.id}</span></td>
                <td style={{ padding: "8px", borderBottom: "1px solid var(--line2)", color: "var(--fg2)" }}>{row.source}</td>
                <td style={{ padding: "8px", borderBottom: "1px solid var(--line2)", color: "var(--mut)", fontSize: 11 }}>{row.cls}</td>
                <td style={{ padding: "8px", borderBottom: "1px solid var(--line2)" }}><Grade g={row.g as "A" | "B" | "C"} filled={row.g === "A"} /></td>
                <td style={{ padding: "8px", borderBottom: "1px solid var(--line2)", color: "var(--fg2)" }}>{row.usedBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── Vault illustration ────────────────────────────────────────── */
function VaultIll() {
  return (
    <div style={{ background: "var(--surf)", border: "1px solid var(--line)", borderRadius: "var(--r-win)", boxShadow: "var(--sh-win)", overflow: "hidden", fontFamily: "var(--sans)", fontSize: 13, userSelect: "none" }} aria-hidden="true">
      <div style={{ height: 44, background: "var(--surf2)", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", padding: "0 20px", gap: 8 }}>
        <span style={{ fontWeight: 700, fontSize: 13, color: "var(--fg)" }}>Vault · Northwind</span>
        <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--mut)", fontStyle: "italic" }}>Encrypted in your browser</span>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ width: 160, borderRight: "1px solid var(--line)", padding: "12px 0", background: "var(--surf2)" }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mut)", padding: "0 14px", marginBottom: 8 }}>Northwind</div>
          {["Term sheet", "Founder call", "Cap table", "Partner notes"].map((n, i) => (
            <div key={n} style={{ padding: "6px 14px", background: i === 1 ? "var(--bg2)" : "transparent", borderRadius: "var(--r-chip)", margin: "1px 6px", fontSize: 12, color: i === 1 ? "var(--fg)" : "var(--fg2)", fontWeight: i === 1 ? 600 : 400 }}>{n}</div>
          ))}
          <div style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mut)", padding: "12px 14px 8px" }}>Fund</div>
          {["Thesis", "LP references"].map((n) => (
            <div key={n} style={{ padding: "6px 14px", borderRadius: "var(--r-chip)", margin: "1px 6px", fontSize: 12, color: "var(--fg2)" }}>{n}</div>
          ))}
        </div>
        <div style={{ flex: 1, padding: "14px 18px" }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mut)", marginBottom: 8 }}>Note · Fund-internal</div>
          <div style={{ fontWeight: 700, fontSize: 14, color: "var(--fg)", marginBottom: 4 }}>Founder call</div>
          <div style={{ fontSize: 11, color: "var(--mut)", marginBottom: 12 }}>Only you can read it</div>
          <div style={{ fontFamily: "var(--mono)", fontSize: 11.5, color: "var(--fg2)", lineHeight: 1.6, background: "var(--bg2)", borderRadius: "var(--r-8)", padding: 12 }}>
            <div># Founder call, 12 Oct</div>
            <div style={{ marginTop: 4, color: "var(--fg)" }}>My read: honest on the numbers, vague on the roadmap. Backchannel before IC.</div>
            <div style={{ marginTop: 8, color: "var(--fg2)" }}>- Retention is strong, onboarding is slow</div>
            <div>- CEO sends the 24-month export [[P-05]]</div>
            <div>- Ask about the uptime clause</div>
          </div>
          <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <div style={{ fontSize: 11, background: "var(--bg2)", borderRadius: "var(--r-8)", padding: "8px 10px" }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--mut)", marginBottom: 4 }}>Storage</div>
              <div style={{ color: "var(--fg2)", lineHeight: 1.45 }}>Hosted by us, encrypted in your browser.</div>
            </div>
            <div style={{ fontSize: 11, background: "var(--bg2)", borderRadius: "var(--r-8)", padding: "8px 10px" }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--mut)", marginBottom: 4 }}>Agents</div>
              <div style={{ color: "var(--fg2)", lineHeight: 1.45 }}>Off. Agents cannot read this note.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function ProductsPage() {
  const isOpen = await platformOpen();
  const primaryHref = isOpen ? "/app" : "/book";

  return (
    <main id="main-content">
      {/* Hero */}
      <section className="hero sec" style={{ paddingBottom: "var(--sp-64)" }}>
        <div className="wrap" style={{ maxWidth: "var(--head-max)" }}>
          <p className="eyebrow" style={{ marginBottom: "var(--sp-16)" }}>Products</p>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h1-page)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h1)", lineHeight: "var(--lh-h1)", marginBottom: "var(--sp-24)" }}>
            One platform, built around the evidence.
          </h1>
          <p className="lead" style={{ maxWidth: "58ch", marginBottom: "var(--sp-40)" }}>
            Plan the work and see its price. Run specialist agents. Read a memo where every claim has a source. Keep it current as the facts change.
          </p>
          <div style={{ display: "flex", gap: "var(--gap-s)", marginBottom: "var(--sp-40)" }}>
            <a href={primaryHref} className="btn btn-p">Start free</a>
            <a href="/book" className="btn btn-s">Book time with us</a>
          </div>
          {/* one-line stop teaser */}
          <div style={{ display: "flex", gap: "var(--sp-24)", flexWrap: "wrap" }}>
            {[
              { label: "Plan", desc: "Price every agent before it starts" },
              { label: "Run", desc: "Specialists, isolated, in parallel" },
              { label: "Memo", desc: "A grade and a source on every claim" },
              { label: "Evidence", desc: "New facts rewrite only what they touch" },
              { label: "Vault", desc: "Notes that agents cannot read" },
            ].map((s) => (
              <div key={s.label} style={{ display: "flex", gap: "var(--sp-8)", alignItems: "baseline" }}>
                <span style={{ fontWeight: "var(--fw-semibold)", fontSize: 15 }}>{s.label}</span>
                <span className="small" style={{ color: "var(--mut)" }}>{s.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky product nav */}
      <nav aria-label="Product sections" style={{ position: "sticky", top: "var(--nav-h)", zIndex: 10, background: "var(--nav-bg)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", borderBottom: "1px solid var(--line2)" }}>
        <div className="wrap" style={{ display: "flex", gap: "var(--sp-32)", overflowX: "auto", paddingBlock: "var(--sp-12)" }}>
          {NAV_STOPS.map(({ id, label }) => (
            <a key={id} href={`#${id}`} style={{ fontFamily: "var(--mono)", fontSize: 12, fontWeight: 500, color: "var(--mut)", textDecoration: "none", whiteSpace: "nowrap", letterSpacing: "0.04em" }}>{label}</a>
          ))}
        </div>
      </nav>

      {/* 01 · PLAN */}
      <section id="plan" className="sec">
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "var(--gap-split)", alignItems: "start", marginBottom: "var(--head-mb)" }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: "var(--sp-16)" }}>01 · Plan</p>
              <h2 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h2)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h2)", lineHeight: "var(--lh-h2)", marginBottom: "var(--sp-24)" }}>
                Know the cost before you build the memo.
              </h2>
              <p className="lead" style={{ maxWidth: "44ch", marginBottom: "var(--sp-32)" }}>
                No run starts without a plan you have seen. The coordinator drafts it in seconds: the sequence of agents, what each one will cost, what it still needs from you, and where it will stop for your approval.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "var(--sp-16)" }}>
                {[
                  "Every agent has a price. Estimated from the agent's own profile and the list prices of the providers you connected.",
                  "Change a model, watch the total move. Pick Economy, Balanced or Frontier, or set a tier agent by agent.",
                  "A cap the run obeys. If a run would cross your budget, it stops and delivers what exists, with a list of what is missing.",
                  "Estimate against actual. After each run, each agent shows its drift, and its profile updates itself.",
                ].map((point, i) => (
                  <li key={i} style={{ display: "flex", gap: "var(--sp-12)", alignItems: "flex-start" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--fg)", flexShrink: 0, marginTop: 7 }} />
                    <p className="small" style={{ margin: 0, color: "var(--fg2)", lineHeight: 1.55 }}>{point}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ background: "var(--surf)", border: "1px solid var(--line)", borderRadius: "var(--r-win)", boxShadow: "var(--sh-win)", overflow: "hidden", fontFamily: "var(--sans)", fontSize: 13, userSelect: "none" }} aria-hidden="true">
              <div style={{ height: 44, background: "var(--surf2)", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", padding: "0 20px", gap: 8 }}>
                <span style={{ fontSize: 12, color: "var(--mut)" }}>New target</span><span style={{ color: "var(--mut)" }}>·</span><span style={{ fontWeight: 600, fontSize: 13 }}>Northwind</span>
              </div>
              <div style={{ padding: "16px 20px" }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mut)", marginBottom: 10 }}>Investment route · about 25 min · 1 gate</div>
                <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
                  {["Economy", "Balanced", "Frontier"].map((t, i) => (<span key={t} style={{ padding: "3px 9px", borderRadius: "var(--r-pill)", fontSize: 11, fontWeight: i === 1 ? 600 : 400, background: i === 1 ? "var(--fg)" : "transparent", color: i === 1 ? "var(--bg)" : "var(--fg2)", border: i === 1 ? "none" : "1px solid var(--line)" }}>{t}</span>))}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 1fr 0.7fr", gap: "0 8px", padding: "6px 0", borderBottom: "1px solid var(--line)" }}>
                  {["Agent", "Starts", "Tier", "Est."].map((h) => (<span key={h} style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mut)" }}>{h}</span>))}
                </div>
                {[
                  { name: "Market /marketdd", starts: "Starts now", tier: "Standard", est: "2.40" },
                  { name: "Company /duediligence", starts: "After Market", tier: "Frontier", est: "2.70" },
                  { name: "Product /productdd", starts: "After Cohorts", tier: "Frontier", est: "3.50" },
                  { name: "Technology /technicaldd", starts: "After Company", tier: "Standard", est: "2.70" },
                  { name: "Verifier and coordinator", starts: "Last", tier: "Frontier", est: "1.50" },
                ].map((a) => (
                  <div key={a.name} style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 1fr 0.7fr", gap: "0 8px", padding: "6px 0", borderBottom: "1px solid var(--line2)", alignItems: "center" }}>
                    <span style={{ fontWeight: 500, fontSize: 11, color: "var(--fg)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.name}</span>
                    <span style={{ fontSize: 10, color: "var(--fg2)" }}>{a.starts}</span>
                    <span style={{ fontSize: 10, color: a.tier === "Frontier" ? "var(--blue-t)" : "var(--fg2)", fontWeight: a.tier === "Frontier" ? 600 : 400 }}>{a.tier}</span>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--fg2)", textAlign: "right" }}>{a.est}</span>
                  </div>
                ))}
                <div style={{ marginTop: 10, padding: "10px 0", borderTop: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                  <div>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mut)", marginBottom: 2 }}>Estimate</div>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 20, fontWeight: 700, color: "var(--fg)", letterSpacing: "-0.02em" }}>15.15</div>
                    <div style={{ fontSize: 10, color: "var(--mut)" }}>4.85 under cap · cap 20.00</div>
                  </div>
                  <div style={{ padding: "6px 12px", background: "var(--fg)", color: "var(--bg)", borderRadius: "var(--r-pill)", fontSize: 11, fontWeight: 600 }}>Approve and run</div>
                </div>
                <p style={{ fontSize: 10, color: "var(--mut)", fontStyle: "italic", marginTop: 6 }}>Illustrative plan. Try the routing.</p>
              </div>
            </div>
          </div>

          <div className="g3">
            {[
              { label: "Already available", desc: "What the agents find themselves", body: "Public sources the agents fetch, and whatever you ticked when you created the target: a deck, a website, filed accounts." },
              { label: "Great to have", desc: "What changes the verdict", body: "Management accounts, a revenue export of 18 months or more, customer interviews, access to the product. Without them the plan says which sections will carry C grades." },
              { label: "Nice to have", desc: "What sharpens it", body: "Analyst reports, references, a penetration test. Add them now or when they arrive: new evidence only rebuilds what it touches." },
            ].map((tier) => (
              <div key={tier.label} className="card">
                <div style={{ fontFamily: "var(--mono)", fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mut)", marginBottom: "var(--sp-8)" }}>{tier.label}</div>
                <h3 style={{ fontSize: "17px", fontWeight: "var(--fw-semibold)", marginBottom: "var(--sp-8)" }}>{tier.desc}</h3>
                <p className="small" style={{ margin: 0, color: "var(--fg2)", lineHeight: 1.55 }}>{tier.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 02 · RUN */}
      <section id="run" className="sec alt">
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "var(--gap-split)", alignItems: "start", marginBottom: "var(--head-mb)" }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: "var(--sp-16)" }}>02 · Run</p>
              <h2 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h2)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h2)", lineHeight: "var(--lh-h2)", marginBottom: "var(--sp-24)" }}>
                Specialist agents, orchestrated.
              </h2>
              <p className="lead" style={{ maxWidth: "44ch", marginBottom: "var(--sp-32)" }}>
                One agent per question, started in the order the method requires and in parallel wherever it allows. You watch one line per agent, and open the detail only when you want it.
              </p>
            </div>
            <RunIll />
          </div>
          <div className="g4">
            {[
              { title: "The coordinator plans, it does not write", body: "It reads the target and your thesis, picks the route, and asks one question when the answer changes the plan." },
              { title: "Each agent in its own sandbox", body: "A clean context, the evidence mounted read-only, and a short list of hosts it may reach. No agent sees another's scratch work." },
              { title: "Runs pause and resume", body: "A run waits at a gate for as long as you need. It survives restarts, and picks up exactly where it stopped." },
              { title: "Failure is explicit", body: "If one agent fails, its dependents wait and the rest continue. You get a partial memo with a clear list of what is missing." },
            ].map((f) => (
              <div key={f.title} className="card">
                <h3 style={{ fontSize: "17px", fontWeight: "var(--fw-semibold)", marginBottom: "var(--sp-10)" }}>{f.title}</h3>
                <p className="small" style={{ margin: 0, color: "var(--fg2)", lineHeight: 1.55 }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 · MEMO */}
      <section id="memo" className="sec">
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "var(--gap-split)", alignItems: "start", marginBottom: "var(--head-mb)" }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: "var(--sp-16)" }}>03 · Memo</p>
              <h2 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h2)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h2)", lineHeight: "var(--lh-h2)", marginBottom: "var(--sp-24)" }}>
                A memo you can take into the room.
              </h2>
              <p className="lead" style={{ maxWidth: "44ch", marginBottom: "var(--sp-32)" }}>
                Verdict first, then a section per question, each with a confidence and a source on every claim. The work behind a section is one click away.
              </p>
            </div>
            <MemoIll />
          </div>
          <div className="g3">
            {[
              { title: "Confidence per section", body: "High, Medium or Low, computed from the mix of A, B and C claims: (A + half of B) over all claims. High at 0.70 or more, Medium at 0.45." },
              { title: "Edit where you read", body: "Change a sentence in place. It is saved as a steering note for the next rebuild, and the new version is marked as human-edited." },
              { title: "Take it with you", body: 'Export to PDF, Google Doc or Notion, with the evidence appendix. Every export carries the workspace, the date and “evidence-graded analysis, not investment advice”.' },
            ].map((f) => (
              <div key={f.title} className="card">
                <h3 style={{ fontSize: "17px", fontWeight: "var(--fw-semibold)", marginBottom: "var(--sp-10)" }}>{f.title}</h3>
                <p className="small" style={{ margin: 0, color: "var(--fg2)", lineHeight: 1.55 }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 · EVIDENCE */}
      <section id="evidence" className="sec alt">
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "var(--gap-split)", alignItems: "start", marginBottom: "var(--head-mb)" }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: "var(--sp-16)" }}>04 · Evidence and lineage</p>
              <h2 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h2)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h2)", lineHeight: "var(--lh-h2)", marginBottom: "var(--sp-24)" }}>
                New evidence rewrites only what it touches.
              </h2>
              <p className="lead" style={{ maxWidth: "44ch", marginBottom: "var(--sp-32)" }}>
                Every artifact records what it was built from. When a file arrives, the platform computes the sections that went stale, shows why, and prices the rebuild before you approve it.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "var(--sp-16)" }}>
                {[
                  "One drop zone. Files, links and pasted text are stored, read, classified, graded and tagged to the sections they touch.",
                  "Three data classes. Public, target-confidential and fund-internal. The plan shows which provider will read which class, before launch.",
                  "Ask the founder. Turn an item in the appendix into a request with an upload link that needs no account. You approve what lands.",
                  "Interviews move the grades most. Loyal and churned customers, competitor founders and teams: each call becomes a source and upgrades the claims it touches.",
                  "Evidence is untrusted. A deck can contain instructions. Agents treat it as data, and have no tool that sends anything out.",
                ].map((point, i) => (
                  <li key={i} style={{ display: "flex", gap: "var(--sp-12)", alignItems: "flex-start" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--fg)", flexShrink: 0, marginTop: 7 }} />
                    <p className="small" style={{ margin: 0, color: "var(--fg2)", lineHeight: 1.55 }}>{point}</p>
                  </li>
                ))}
              </ul>
            </div>
            <EvidenceLedgerIll />
          </div>
        </div>
      </section>

      {/* 05 · VAULT */}
      <section id="vault" className="sec">
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "var(--gap-split)", alignItems: "start", marginBottom: "var(--head-mb)" }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: "var(--sp-16)" }}>05 · Vault — at launch</p>
              <h2 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h2)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h2)", lineHeight: "var(--lh-h2)", marginBottom: "var(--sp-24)" }}>
                A vault we host, and cannot read.
              </h2>
              <p className="lead" style={{ maxWidth: "44ch", marginBottom: "var(--sp-32)" }}>
                Term sheets, partner notes and your own view of a founder belong in a vault, not in a prompt. It is hosted by us and encrypted in your browser. The agents read nothing until you say so.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "var(--sp-16)" }}>
                {[
                  "Hosted, encrypted in your browser. The key comes from your passphrase and stays with you. We store only ciphertext. Lose the passphrase and the recovery code, and the vault is gone: we say so plainly.",
                  "Agents are locked out by default. A note reaches a run only when you share it for that target. The read is logged.",
                  "Plain markdown, no lock-in. Notes with links between them. Import an Obsidian vault, export a zip that Obsidian opens unchanged.",
                  "Prefer Obsidian? From Pro. A plugin in your vault pairs with a one-time code and shares only the notes you mark.",
                ].map((point, i) => (
                  <li key={i} style={{ display: "flex", gap: "var(--sp-12)", alignItems: "flex-start" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--fg)", flexShrink: 0, marginTop: 7 }} />
                    <p className="small" style={{ margin: 0, color: "var(--fg2)", lineHeight: 1.55 }}>{point}</p>
                  </li>
                ))}
              </ul>
            </div>
            <VaultIll />
          </div>
        </div>
      </section>

      {/* 06 · WORKFLOW */}
      <section id="workflow" className="sec alt">
        <div className="wrap">
          <div style={{ maxWidth: "var(--head-max)", marginBottom: "var(--head-mb)" }}>
            <p className="eyebrow" style={{ marginBottom: "var(--sp-16)" }}>06 · Workflow</p>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h2)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h2)", lineHeight: "var(--lh-h2)", marginBottom: "var(--sp-24)" }}>
              Agents and people, one workflow.
            </h2>
            <p className="lead" style={{ maxWidth: "62ch" }}>
              A diligence is not done by agents alone, nor by people alone. TheDiligence is the place where they work on the same file. Agents plan, read and draft. People decide, challenge and bring what no database holds. Each reaches the other where it already works: by email, in the app, and through MCP.
            </p>
          </div>
          <div className="g4">
            {[
              { title: "Home is an inbox, and so is your email", body: "What needs you, what is running, what was delivered, across every target. Answer a gate with one click, in the app or from the notification email." },
              { title: "Open to your own agents", body: "An MCP interface lets the agents and assistants you already use take part in the work. They propose and fetch. A person still opens every gate and sends every message." },
              { title: "Requests that close the loop", body: "The data still needed becomes an email draft and an upload link. Statuses: requested, received, ingested. A delta run follows." },
              { title: "Changes since you last looked", body: "The verdict held or moved, which sections were rewritten and because of which evidence, what it cost. Mark it reviewed." },
            ].map((f) => (
              <div key={f.title} className="card">
                <h3 style={{ fontSize: "17px", fontWeight: "var(--fw-semibold)", marginBottom: "var(--sp-10)" }}>{f.title}</h3>
                <p className="small" style={{ margin: 0, color: "var(--fg2)", lineHeight: 1.55 }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 07 · MODELS */}
      <section id="models" className="sec">
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--gap-split)", alignItems: "start" }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: "var(--sp-16)" }}>07 · Models</p>
              <h2 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h2)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h2)", lineHeight: "var(--lh-h2)", marginBottom: "var(--sp-24)" }}>
                Your models, connected, not pasted.
              </h2>
              <p className="lead" style={{ maxWidth: "44ch", marginBottom: "var(--sp-32)" }}>
                The platform does not resell a model. You connect your own provider account by approving access on your provider's own screen. The usage lands in your account, and the run is priced from your provider's list.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "var(--sp-16)" }}>
                {[
                  "Writers on the provider you pick. The method runs unchanged on the provider you connected.",
                  "A verifier from another family. It checks the writers with no tools, cheaply, against a different set of blind spots.",
                  "Agents hold a run token. Your provider key stays on your account and never reaches an agent.",
                ].map((point, i) => (
                  <li key={i} style={{ display: "flex", gap: "var(--sp-12)", alignItems: "flex-start" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--fg)", flexShrink: 0, marginTop: 7 }} />
                    <p className="small" style={{ margin: 0, color: "var(--fg2)", lineHeight: 1.55 }}>{point}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div style={{ marginBottom: "var(--sp-32)" }}>
                <p className="eyebrow" style={{ marginBottom: "var(--sp-16)" }}>Connections</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-10)" }}>
                  {[
                    { name: "Claude", chip: "At launch" },
                    { name: "OpenAI", chip: "At launch" },
                    { name: "Mistral", chip: "At launch" },
                    { name: "Gemini", chip: "At launch" },
                    { name: "Bedrock, Vertex, Azure, xAI and more", chip: "Ask for it" },
                  ].map((c) => (
                    <div key={c.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "var(--sp-12) var(--sp-16)", background: "var(--bg2)", borderRadius: "var(--r-card)", border: "1px solid var(--line)" }}>
                      <span style={{ fontWeight: "var(--fw-semibold)", fontSize: 15 }}>{c.name}</span>
                      <span className={`status ${c.chip === "At launch" ? "st-live" : "st-plan"}`} style={{ fontSize: "11px" }}>{c.chip}</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="small" style={{ color: "var(--fg2)" }}>Your provider is not on the list? Tell us on the connectors page. The requests we count decide what comes next.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="band">
        <div className="wrap" style={{ textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h2)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h2)", lineHeight: "var(--lh-h2)", color: "var(--bg)", marginBottom: "var(--sp-24)" }}>
            See your first plan in minutes.
          </h2>
          <p style={{ fontSize: "var(--fs-lead)", color: "var(--bg)", opacity: 0.75, marginBottom: "var(--sp-40)", maxWidth: "44ch", marginInline: "auto" }}>
            Name a company. The coordinator drafts the plan and the price. You decide whether to run it.
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
