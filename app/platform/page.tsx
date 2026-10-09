import type { ReactNode } from "react";
import { providers as providerList } from "@/content/providers.json";
import { plans as planList } from "@/content/plans.json";
import { platformOpen } from "@/lib/flags";
import { PlatformSteps } from "../components/platform-steps";

export const metadata = {
  title: "Platform and plans — TheDiligence",
  description:
    "Connect your model provider. Name a company. Specialist agents run the method and deliver a memo where every claim has a grade and a source.",
};

/* ─── Onboarding step illustrations ─────────────────────────────── */

function ConnectIll() {
  return (
    <div style={{ background: "var(--surf)", border: "1px solid var(--line)", borderRadius: "var(--r-win)", boxShadow: "var(--sh-win)", overflow: "hidden", fontFamily: "var(--sans)", fontSize: 13, userSelect: "none" }} aria-hidden="true">
      <div style={{ height: 44, background: "var(--surf2)", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", padding: "0 20px" }}>
        <span style={{ fontWeight: 700, fontSize: 13, color: "var(--fg)" }}>Connect a model provider</span>
      </div>
      <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mut)", marginBottom: 4 }}>Your providers</div>
        {[
          { name: "Claude", sub: "Anthropic · OAuth connection", status: "Connected", connected: true },
          { name: "OpenAI", sub: "Your OpenAI account", status: "Connect", connected: false },
          { name: "Mistral", sub: "Europe-hosted models", status: "Connect", connected: false },
          { name: "Gemini", sub: "Your Google account", status: "Connect", connected: false },
        ].map((p) => (
          <div key={p.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "var(--bg2)", border: p.connected ? "1px solid var(--green)" : "1px solid var(--line)", borderRadius: "var(--r-8)" }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14, color: "var(--fg)", marginBottom: 2 }}>{p.name}</div>
              <div style={{ fontSize: 11, color: "var(--mut)" }}>{p.sub}</div>
            </div>
            <div style={{ padding: "4px 12px", borderRadius: "var(--r-pill)", fontSize: 11, fontWeight: 600, background: p.connected ? "var(--green)" : "var(--fg)", color: "var(--bg)" }}>{p.status}</div>
          </div>
        ))}
        <div style={{ marginTop: 4, padding: "10px 14px", background: "var(--bg2)", border: "1px solid var(--line2)", borderRadius: "var(--r-8)" }}>
          <div style={{ fontSize: 11, color: "var(--fg2)", lineHeight: 1.5 }}>Approve on your provider's own screen. Your key stays with your provider.</div>
        </div>
        <p style={{ fontSize: 10, color: "var(--mut)", fontStyle: "italic", margin: 0 }}>Illustrative only.</p>
      </div>
    </div>
  );
}

function TargetIll() {
  return (
    <div style={{ background: "var(--surf)", border: "1px solid var(--line)", borderRadius: "var(--r-win)", boxShadow: "var(--sh-win)", overflow: "hidden", fontFamily: "var(--sans)", fontSize: 13, userSelect: "none" }} aria-hidden="true">
      <div style={{ height: 44, background: "var(--surf2)", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", padding: "0 20px" }}>
        <span style={{ fontWeight: 700, fontSize: 13, color: "var(--fg)" }}>New target</span>
      </div>
      <div style={{ padding: "20px 24px" }}>
        <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mut)", marginBottom: 8 }}>Target company</div>
        <div style={{ padding: "12px 16px", background: "var(--bg2)", border: "1px solid var(--line)", borderRadius: "var(--r-8)", fontSize: 14, fontWeight: 600, color: "var(--fg)", marginBottom: 16 }}>Northwind</div>
        <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mut)", marginBottom: 8 }}>Your thesis</div>
        <div style={{ padding: "12px 16px", background: "var(--bg2)", border: "1px solid var(--line)", borderRadius: "var(--r-8)", fontSize: 13, color: "var(--fg2)", marginBottom: 16, lineHeight: 1.5 }}>Series B investment. Platform play in mid-market ERP. We believe the market is moving from point tools.</div>
        <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mut)", marginBottom: 8 }}>Evidence · Drop any file</div>
        <div style={{ padding: "14px 16px", background: "var(--bg2)", border: "1.5px dashed var(--line)", borderRadius: "var(--r-8)", textAlign: "center", fontSize: 12, color: "var(--mut)", marginBottom: 16 }}>Deck, revenue export, data room link, website</div>
        <div style={{ padding: "8px 16px", background: "var(--fg)", color: "var(--bg)", borderRadius: "var(--r-pill)", fontSize: 12, fontWeight: 600, textAlign: "center" }}>Create target and draft plan</div>
        <p style={{ fontSize: 10, color: "var(--mut)", fontStyle: "italic", marginTop: 10, marginBottom: 0 }}>Illustrative only.</p>
      </div>
    </div>
  );
}

function PlanIll() {
  return (
    <div style={{ background: "var(--surf)", border: "1px solid var(--line)", borderRadius: "var(--r-win)", boxShadow: "var(--sh-win)", overflow: "hidden", fontFamily: "var(--sans)", fontSize: 13, userSelect: "none" }} aria-hidden="true">
      <div style={{ height: 44, background: "var(--surf2)", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", padding: "0 20px" }}>
        <span style={{ fontWeight: 700, fontSize: 13, color: "var(--fg)" }}>Northwind · Plan</span>
      </div>
      <div style={{ padding: "16px 20px" }}>
        <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mut)", marginBottom: 10 }}>Investment route · about 25 min · 1 gate</div>
        <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
          {["Economy", "Balanced", "Frontier"].map((t, i) => (<span key={t} style={{ padding: "3px 9px", borderRadius: "var(--r-pill)", fontSize: 11, fontWeight: i === 1 ? 600 : 400, background: i === 1 ? "var(--fg)" : "transparent", color: i === 1 ? "var(--bg)" : "var(--fg2)", border: i === 1 ? "none" : "1px solid var(--line)" }}>{t}</span>))}
        </div>
        {[
          { name: "Market /marketdd", tier: "Standard", est: "2.40" },
          { name: "Company /duediligence", tier: "Frontier", est: "2.70" },
          { name: "Product /productdd", tier: "Frontier", est: "3.50" },
          { name: "Technology /technicaldd", tier: "Standard", est: "2.70" },
          { name: "Verifier", tier: "Frontier", est: "1.50" },
        ].map((a) => (
          <div key={a.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid var(--line2)" }}>
            <span style={{ fontWeight: 500, fontSize: 11, color: "var(--fg)" }}>{a.name}</span>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{ fontSize: 10, color: a.tier === "Frontier" ? "var(--blue-t)" : "var(--fg2)", fontWeight: a.tier === "Frontier" ? 600 : 400 }}>{a.tier}</span>
              <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--fg2)", minWidth: 28, textAlign: "right" }}>{a.est}</span>
            </div>
          </div>
        ))}
        <div style={{ marginTop: 10, padding: "10px 0", borderTop: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mut)", marginBottom: 2 }}>Estimate · cap 20.00</div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 20, fontWeight: 700, color: "var(--fg)", letterSpacing: "-0.02em" }}>15.15</div>
          </div>
          <div style={{ padding: "5px 10px", background: "var(--fg)", color: "var(--bg)", borderRadius: "var(--r-pill)", fontSize: 11, fontWeight: 600 }}>Approve and run</div>
        </div>
        <p style={{ fontSize: 10, color: "var(--mut)", fontStyle: "italic", marginTop: 6, marginBottom: 0 }}>Illustrative only.</p>
      </div>
    </div>
  );
}

function RunIll() {
  return (
    <div style={{ background: "var(--surf)", border: "1px solid var(--line)", borderRadius: "var(--r-win)", boxShadow: "var(--sh-win)", overflow: "hidden", fontFamily: "var(--sans)", fontSize: 13, userSelect: "none" }} aria-hidden="true">
      <div style={{ height: 44, background: "var(--surf2)", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", padding: "0 20px" }}>
        <span style={{ fontWeight: 700, fontSize: 13, color: "var(--fg)" }}>Northwind · Run</span>
        <span className="status st-build" style={{ marginLeft: "auto", fontSize: 11 }}>In progress</span>
      </div>
      <div style={{ padding: "14px 20px" }}>
        {[
          { name: "Market", detail: "Done, 14 sources", cost: "2.31", done: true },
          { name: "Company", detail: "Done, 9 claims", cost: "2.78", done: true },
          { name: "Product", detail: "Running, 4 of 6 personas", cost: "0.98", running: true },
          { name: "Technology", detail: "Waiting for Product", cost: "2.70", waiting: true },
          { name: "Verifier", detail: "Last", cost: "1.50", waiting: true },
        ].map((a) => (
          <div key={a.name} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: "1px solid var(--line2)" }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: a.done ? "var(--green)" : a.running ? "var(--blue)" : "var(--mut)", flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: 11, color: "var(--fg)" }}>{a.name}</div>
            </div>
            <div style={{ fontSize: 10, color: a.done ? "var(--green-t)" : "var(--mut)", flexShrink: 0 }}>{a.detail}</div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--fg2)", minWidth: 28, textAlign: "right", flexShrink: 0 }}>{a.cost}</div>
          </div>
        ))}
        <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mut)", marginBottom: 2 }}>Spent</div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 18, fontWeight: 700, color: "var(--fg)", letterSpacing: "-0.02em" }}>6.07</div>
            <div style={{ fontSize: 10, color: "var(--mut)" }}>of 15.15 · cap 20.00</div>
          </div>
          <div style={{ padding: "5px 10px", background: "var(--wash-warn-bg)", border: "1px solid var(--wash-warn-bd)", borderRadius: "var(--r-pill)", fontSize: 11, fontWeight: 600, color: "var(--fg)" }}>Gate pending</div>
        </div>
        <p style={{ fontSize: 10, color: "var(--mut)", fontStyle: "italic", marginTop: 10, marginBottom: 0 }}>Illustrative only.</p>
      </div>
    </div>
  );
}

/* ─── Helpers ────────────────────────────────────────────────────── */

type PlanFeature = string | { text: string; status: string };

function FeatureItem({ f }: { f: PlanFeature }) {
  const text = typeof f === "string" ? f : f.text;
  const status = typeof f === "string" ? null : f.status;
  return (
    <li style={{ display: "flex", alignItems: "flex-start", gap: "var(--sp-10)", fontSize: 13, color: "var(--fg2)", lineHeight: 1.5 }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--fg)", flexShrink: 0, marginTop: 6 }} />
      <span>{text}</span>
      {status && (
        <span className={`status ${status === "Next" ? "st-build" : "st-plan"}`} style={{ fontSize: 10, flexShrink: 0, marginTop: 1 }}>{status}</span>
      )}
    </li>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */

export default async function PlatformPage() {
  const isOpen = await platformOpen();
  const primaryHref = isOpen ? "/app" : "/book";

  const STEPS = [
    {
      n: "01",
      title: "Connect a provider",
      description: "Approve access on your provider's own screen. Claude, OpenAI, Mistral, Gemini. Usage lands in your account. Your key stays with your provider.",
      illustration: <ConnectIll /> as ReactNode,
    },
    {
      n: "02",
      title: "Name a company",
      description: "Type a target name and describe your thesis. Drop a deck, a revenue export or a data room link. The coordinator reads the target and picks a route.",
      illustration: <TargetIll /> as ReactNode,
    },
    {
      n: "03",
      title: "Review the plan",
      description: "See the sequence of agents, what each one will cost, what it still needs from you, and where it will pause for your approval. Set a cap.",
      illustration: <PlanIll /> as ReactNode,
    },
    {
      n: "04",
      title: "Run and gate",
      description: "Agents run in parallel where the method allows. A gate pauses the run. You review what exists and approve to continue. The run picks up exactly where it stopped.",
      illustration: <RunIll /> as ReactNode,
    },
  ];

  return (
    <main id="main-content">
      {/* Hero */}
      <section className="hero sec" style={{ paddingBottom: "var(--sp-64)" }}>
        <div className="wrap" style={{ maxWidth: "var(--head-max)" }}>
          <p className="eyebrow" style={{ marginBottom: "var(--sp-16)" }}>Platform and plans</p>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h1-page)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h1)", lineHeight: "var(--lh-h1)", marginBottom: "var(--sp-24)" }}>
            Agents that run the method, at your pace.
          </h1>
          <p className="lead" style={{ maxWidth: "60ch", marginBottom: "var(--sp-40)" }}>
            Connect your provider. Name a company. Specialist agents run the method and deliver a memo where every claim has a grade and a source. You hold every gate.
          </p>
          <div style={{ display: "flex", gap: "var(--gap-s)", flexWrap: "wrap" }}>
            <a href={primaryHref} className="btn btn-p">{isOpen ? "Start free" : "Join the waitlist"}</a>
            <a href="/book" className="btn btn-s">Book time with us</a>
          </div>
        </div>
      </section>

      {/* 4-step onboarding */}
      <section id="onboarding" className="sec alt">
        <div className="wrap">
          <div style={{ maxWidth: "var(--head-max)", marginBottom: "var(--head-mb)" }}>
            <p className="eyebrow" style={{ marginBottom: "var(--sp-16)" }}>Getting started</p>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h2)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h2)", lineHeight: "var(--lh-h2)", marginBottom: "var(--sp-24)" }}>
              Four steps, first memo in minutes.
            </h2>
            <p className="lead" style={{ maxWidth: "56ch" }}>
              No data to fill in before the platform is useful. Connect a provider, name a target, approve a plan, and the agents get to work.
            </p>
          </div>
          <PlatformSteps steps={STEPS} />
        </div>
      </section>

      {/* Connectors */}
      <section id="connectors" className="sec">
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "var(--gap-split)", alignItems: "start" }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: "var(--sp-16)" }}>Model connectors</p>
              <h2 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h2)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h2)", lineHeight: "var(--lh-h2)", marginBottom: "var(--sp-24)" }}>
                Your models, your account.
              </h2>
              <p className="lead" style={{ maxWidth: "44ch", marginBottom: "var(--sp-32)" }}>
                The platform does not resell a model. You connect your own provider account. Usage lands in your account, and the run is priced from your provider's list.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "var(--sp-14)", marginBottom: "var(--sp-32)" }}>
                {[
                  "Writers on the provider you pick. The method runs unchanged.",
                  "A verifier from a different model family. It checks the writers against a different set of blind spots.",
                  "Agents hold a run token. Your key stays on your account and never reaches an agent.",
                  "Change the tier and the estimate moves. Economy, Balanced or Frontier, per agent.",
                ].map((point, i) => (
                  <li key={i} style={{ display: "flex", gap: "var(--sp-12)", alignItems: "flex-start" }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--fg)", flexShrink: 0, marginTop: 7 }} />
                    <p className="small" style={{ margin: 0, color: "var(--fg2)", lineHeight: 1.55 }}>{point}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-12)" }}>
              {providerList.map((p) => (
                <div key={p.id} style={{ padding: "var(--sp-16) var(--sp-20)", background: "var(--bg2)", border: "1px solid var(--line)", borderRadius: "var(--r-card)" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--sp-8)" }}>
                    <div style={{ fontWeight: "var(--fw-semibold)", fontSize: 16 }}>{p.name}</div>
                    <span className="status st-live" style={{ fontSize: 11 }}>{p.tag}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "var(--mut)", marginBottom: "var(--sp-6)" }}>{p.description}</div>
                  <p className="small" style={{ margin: 0, color: "var(--fg2)", lineHeight: 1.5 }}>{p.note}</p>
                </div>
              ))}
              <div style={{ padding: "var(--sp-14) var(--sp-18)", background: "var(--bg2)", border: "1px solid var(--line2)", borderRadius: "var(--r-card)" }}>
                <p className="small" style={{ margin: 0, color: "var(--fg2)", lineHeight: 1.5 }}>Bedrock, Vertex, Azure, xAI and more — ask for it. The requests we count decide what comes next.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section id="plans" className="sec alt">
        <div className="wrap">
          <div style={{ maxWidth: "var(--head-max)", marginBottom: "var(--head-mb)" }}>
            <p className="eyebrow" style={{ marginBottom: "var(--sp-16)" }}>Plans</p>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h2)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h2)", lineHeight: "var(--lh-h2)", marginBottom: "var(--sp-24)" }}>
              Start free. Move up when it fits.
            </h2>
            <p className="lead" style={{ maxWidth: "56ch" }}>
              The platform is free for individual advisors and angels. Funds and teams add members, lift the weekly limit and unlock the vault plugin.
            </p>
          </div>
          <div className="g3">
            {planList.map((plan, i) => (
              <div key={plan.id} className="card" style={{ display: "flex", flexDirection: "column", gap: "var(--sp-20)", ...(i === 0 ? { border: "2px solid var(--fg)" } : {}) }}>
                <div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mut)", marginBottom: "var(--sp-8)" }}>{plan.tagline}</div>
                  <div style={{ fontFamily: "var(--serif)", fontSize: 26, fontWeight: "var(--fw-bold)", letterSpacing: "-0.02em", marginBottom: "var(--sp-4)" }}>{plan.name}</div>
                  {plan.price === null && (
                    <div style={{ fontFamily: "var(--mono)", fontSize: 13, color: "var(--mut)" }}>Pricing at launch</div>
                  )}
                </div>
                <div style={{ height: "1px", background: "var(--line2)" }} />
                <div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mut)", marginBottom: "var(--sp-12)" }}>{plan.limit}</div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "var(--sp-10)" }}>
                    {plan.features.map((f, j) => (
                      <FeatureItem key={j} f={f as PlanFeature} />
                    ))}
                  </ul>
                </div>
                <a href={plan.id === "free" ? primaryHref : "/book"} className={`btn ${i === 0 ? "btn-p" : "btn-s"}`} style={{ marginTop: "auto" }}>
                  {plan.id === "free" ? (isOpen ? plan.cta : "Join the waitlist") : plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compare table */}
      <section id="compare" className="sec">
        <div className="wrap">
          <div style={{ maxWidth: "var(--head-max)", marginBottom: "var(--head-mb)" }}>
            <p className="eyebrow" style={{ marginBottom: "var(--sp-16)" }}>Compare</p>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h2)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h2)", lineHeight: "var(--lh-h2)" }}>
              What is in each plan.
            </h2>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr>
                  <th style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mut)", textAlign: "left", padding: "10px 14px", borderBottom: "2px solid var(--line)", width: "50%" }}>Feature</th>
                  {planList.map((p) => (
                    <th key={p.id} style={{ fontFamily: "var(--serif)", fontSize: 16, fontWeight: 700, color: "var(--fg)", textAlign: "center", padding: "10px 14px", borderBottom: "2px solid var(--line)" }}>{p.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Diligences per week", free: "1", pro: "Unlimited", fund: "Unlimited" },
                  { feature: "Agent model providers", free: "All", pro: "All", fund: "All" },
                  { feature: "Cost cap per run", free: "✓", pro: "✓", fund: "✓" },
                  { feature: "Evidence ledger", free: "✓", pro: "✓", fund: "✓" },
                  { feature: "Hosted vault", free: "✓", pro: "✓", fund: "✓" },
                  { feature: "Export (Word, PDF, Notion)", free: "✓", pro: "✓", fund: "✓" },
                  { feature: "Team members", free: "3", pro: "Unlimited", fund: "Unlimited" },
                  { feature: "Targets archived", free: "10", pro: "Unlimited", fund: "Unlimited" },
                  { feature: "Obsidian vault plugin", free: "—", pro: "✓", fund: "✓" },
                  { feature: "Email ingestion", free: "—", pro: "Next", fund: "Next" },
                  { feature: "Single sign-on", free: "—", pro: "—", fund: "Later" },
                  { feature: "Europe-only sandboxes", free: "—", pro: "Next", fund: "Later" },
                  { feature: "Audit log", free: "—", pro: "—", fund: "Later" },
                  { feature: "Onboarding with us", free: "—", pro: "—", fund: "✓" },
                ].map((row) => (
                  <tr key={row.feature}>
                    <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--line2)", color: "var(--fg2)", fontSize: 13 }}>{row.feature}</td>
                    {([row.free, row.pro, row.fund] as const).map((v, i) => (
                      <td key={i} style={{ padding: "10px 14px", borderBottom: "1px solid var(--line2)", textAlign: "center", fontFamily: v === "✓" || v === "—" ? "var(--mono)" : undefined, fontSize: v === "✓" ? 16 : 13, color: v === "✓" ? "var(--fg)" : v === "—" ? "var(--line)" : "var(--fg2)" }}>
                        {v === "Next" ? <span className="status st-build" style={{ fontSize: 11 }}>Next</span> : v === "Later" ? <span className="status st-plan" style={{ fontSize: 11 }}>Later</span> : v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="sec alt">
        <div className="wrap">
          <div style={{ maxWidth: "var(--head-max)", marginBottom: "var(--head-mb)" }}>
            <p className="eyebrow" style={{ marginBottom: "var(--sp-16)" }}>Roadmap</p>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h2)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h2)", lineHeight: "var(--lh-h2)", marginBottom: "var(--sp-24)" }}>
              What is built and what is next.
            </h2>
            <p className="lead" style={{ maxWidth: "56ch" }}>
              At launch means it is ready on day one. Next means it is in progress. Later means it is planned but not started.
            </p>
          </div>
          <div className="g3">
            {[
              {
                chip: "At launch",
                chipClass: "st-live",
                items: [
                  "Investment route with all five stages",
                  "Claude, OpenAI, Mistral and Gemini",
                  "Cost cap and tier picker",
                  "Evidence ledger and grade system",
                  "Hosted vault, encrypted in your browser",
                  "Gates and partial-run resume",
                  "Export to Word, PDF, Google Doc and Notion",
                ],
              },
              {
                chip: "Next",
                chipClass: "st-build",
                items: [
                  "Acquisition route",
                  "LP route",
                  "Email ingestion",
                  "Europe-hosted sandboxes",
                  "OpenAI OAuth connection",
                  "Gemini OAuth connection",
                  "Obsidian vault plugin",
                  "Delta run from new evidence",
                ],
              },
              {
                chip: "Later",
                chipClass: "st-plan",
                items: [
                  "Single sign-on",
                  "Europe-only mode",
                  "Audit log",
                  "Data-room connectors (Datasite, IntraLinks, Dealroom)",
                  "Hire route and partner route",
                  "Vercel Bedrock, Azure and Vertex connectors",
                  "MCP interface for your own agents",
                ],
              },
            ].map((col) => (
              <div key={col.chip} className="card">
                <span className={`status ${col.chipClass}`} style={{ fontSize: 12, marginBottom: "var(--sp-16)", display: "inline-block" }}>{col.chip}</span>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "var(--sp-10)" }}>
                  {col.items.map((item) => (
                    <li key={item} style={{ display: "flex", gap: "var(--sp-10)", alignItems: "flex-start" }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--fg)", flexShrink: 0, marginTop: 7 }} />
                      <p className="small" style={{ margin: 0, color: "var(--fg2)", lineHeight: 1.45 }}>{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="sec">
        <div className="wrap">
          <div style={{ maxWidth: "var(--wrap-n)", margin: "0 auto" }}>
            <div style={{ marginBottom: "var(--head-mb)" }}>
              <p className="eyebrow" style={{ marginBottom: "var(--sp-16)" }}>FAQ</p>
              <h2 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h2)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h2)", lineHeight: "var(--lh-h2)" }}>
                Common questions.
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {[
                {
                  q: "Does the platform hold my model key?",
                  a: "No. You approve access on your provider's own screen where the provider offers an OAuth connection. For providers that do not yet offer one (OpenAI, Gemini at launch), you paste a key. It is encrypted at rest, never visible to agents, and you delete it with one click. Your key stays with your provider."
                },
                {
                  q: "Who pays for the model usage?",
                  a: "You do, at your provider's own rates. The platform bills you a subscription. The model usage lands in your provider account. The plan shows the estimated cost before the run starts."
                },
                {
                  q: "Can I cap what a run costs?",
                  a: "Yes. You set a cap when you approve the plan. If a run would cross it, it stops and delivers what exists, with a clear list of what is missing and how much the remainder would cost."
                },
                {
                  q: "Is the vault encrypted?",
                  a: "Yes. The vault is hosted by us and encrypted in your browser. The key comes from your passphrase and stays with you. We store only ciphertext. Agents cannot read a vault note until you explicitly share it for a run."
                },
                {
                  q: "What happens to the data I upload?",
                  a: "Files you upload are stored in the evidence ledger for the target you created them for. They are not sent to a model until a run starts. The run mounts them read-only. They are never used to train a model."
                },
                {
                  q: "Can I use my own model?",
                  a: "If it is accessible via the Claude, OpenAI, Mistral or Gemini API, yes. Bedrock, Vertex, Azure and xAI are on the roadmap. Tell us what you want."
                },
                {
                  q: "Is the method open source?",
                  a: "Yes, MIT-licensed. The skills and templates are in a public GitHub repository. You can read them, fork them, run them in your own tools and contribute back."
                },
                {
                  q: "Can I run a diligence without an agent?",
                  a: "Yes. Download the Obsidian vault from the method page and run it yourself. The same templates and evidence rules, without agents."
                },
              ].map(({ q, a }) => (
                <details key={q} style={{ borderBottom: "1px solid var(--line2)", paddingBlock: "var(--sp-20)" }}>
                  <summary style={{ fontWeight: "var(--fw-semibold)", fontSize: 16, cursor: "pointer", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "var(--sp-20)" }}>
                    <span>{q}</span>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 20, color: "var(--mut)", flexShrink: 0, lineHeight: 1 }}>+</span>
                  </summary>
                  <p className="small" style={{ margin: 0, marginTop: "var(--sp-14)", color: "var(--fg2)", lineHeight: 1.6, maxWidth: "60ch" }}>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="band">
        <div className="wrap" style={{ textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h2)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h2)", lineHeight: "var(--lh-h2)", color: "var(--bg)", marginBottom: "var(--sp-24)" }}>
            See your first plan in minutes.
          </h2>
          <p style={{ fontSize: "var(--fs-lead)", color: "var(--bg)", opacity: 0.75, marginBottom: "var(--sp-40)", maxWidth: "44ch", marginInline: "auto" }}>
            Name a company. The coordinator drafts the plan and the price. You decide whether to run it.
          </p>
          <div style={{ display: "flex", gap: "var(--gap-s)", justifyContent: "center", flexWrap: "wrap" }}>
            <a href={primaryHref} className="btn btn-p">{isOpen ? "Start free" : "Join the waitlist"}</a>
            <a href="/book" className="btn btn-s">Book time with us</a>
          </div>
        </div>
      </section>
    </main>
  );
}
