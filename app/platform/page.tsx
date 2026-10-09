import type { ReactNode } from "react";
import { providers as providerList } from "@/content/providers.json";
import { plans as planList } from "@/content/plans.json";
import { platformOpen } from "@/lib/flags";
import { PlatformSteps } from "../components/platform-steps";

export const metadata = {
  title: "Platform — TheDiligence",
  description:
    "Start free. Read your first memo today. Connect your own model, approve the plan and its price, then follow the run.",
};

// ------------------------------------------------------------------------
// Step illustrations (server-rendered JSX passed as props)
// ------------------------------------------------------------------------

function StepSignIn(): ReactNode {
  return (
    <div>
      <p style={{ fontWeight: "var(--fw-semi)", marginBottom: "var(--sp-16)" }}>Sign in · Illustrative</p>
      <div style={{ padding: "var(--sp-16)", background: "var(--bg2)", borderRadius: "var(--r-4)" }}>
        <p style={{ color: "var(--fg2)", marginBottom: "var(--sp-12)" }}>Work email</p>
        <div style={{ padding: "var(--sp-10) var(--sp-12)", background: "var(--bg)", borderRadius: "var(--r-4)", border: "1px solid var(--line)", color: "var(--fg3)", marginBottom: "var(--sp-12)" }}>
          you@yourfund.com
        </div>
        <div style={{ padding: "var(--sp-10) var(--sp-16)", background: "var(--fg)", color: "var(--bg)", borderRadius: "var(--r-4)", textAlign: "center" }}>
          Send me a code
        </div>
      </div>
      <p style={{ marginTop: "var(--sp-12)", color: "var(--fg3)", fontFamily: "var(--sans)" }}>
        One-time codes expire fast and work once. There is no password to choose, lose or reuse.
      </p>
    </div>
  );
}

function StepConnect(): ReactNode {
  return (
    <div>
      <p style={{ fontWeight: "var(--fw-semi)", marginBottom: "var(--sp-16)" }}>Settings · Connections · Illustrative</p>
      <div className="stack" style={{ gap: "var(--sp-8)" }}>
        {providerList.map((p) => (
          <div
            key={p.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "var(--sp-12)",
              background: "var(--bg2)",
              borderRadius: "var(--r-4)",
              border: "1px solid var(--line)",
            }}
          >
            <div>
              <p style={{ fontWeight: "var(--fw-semi)", fontFamily: "var(--sans)" }}>{p.name}</p>
              <p style={{ color: "var(--fg3)", fontFamily: "var(--sans)", fontSize: "var(--fs-tiny)" }}>{p.description}</p>
            </div>
            <span
              style={{
                padding: "var(--sp-4) var(--sp-10)",
                background: p.oauth_status === "available" ? "var(--green)" : "var(--bg)",
                color: p.oauth_status === "available" ? "var(--bg)" : "var(--fg2)",
                border: "1px solid var(--line)",
                borderRadius: "var(--r-4)",
                fontSize: "var(--fs-tiny)",
              }}
            >
              {p.oauth_status === "available" ? "Connected" : "Connect"}
            </span>
          </div>
        ))}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "var(--sp-12)",
            background: "var(--bg2)",
            borderRadius: "var(--r-4)",
            border: "1px dashed var(--line)",
          }}
        >
          <p style={{ color: "var(--fg3)", fontFamily: "var(--sans)" }}>Another provider?</p>
          <span style={{ padding: "var(--sp-4) var(--sp-10)", background: "var(--bg)", border: "1px solid var(--line)", borderRadius: "var(--r-4)", fontSize: "var(--fs-tiny)" }}>Ask</span>
        </div>
      </div>
      <p style={{ marginTop: "var(--sp-12)", color: "var(--fg3)", fontFamily: "var(--sans)" }}>
        You approve access on your provider's own screen. Your key is encrypted and never visible to agents.
      </p>
    </div>
  );
}

function StepPlan(): ReactNode {
  return (
    <div>
      <p style={{ fontWeight: "var(--fw-semi)", marginBottom: "var(--sp-16)" }}>New target · Northwind · Illustrative</p>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid var(--line)" }}>
            <th style={{ textAlign: "left", padding: "var(--sp-6) 0", fontSize: "var(--fs-tiny)", fontWeight: "var(--fw-semi)" }}>Agent</th>
            <th style={{ textAlign: "right", padding: "var(--sp-6) 0", fontSize: "var(--fs-tiny)", fontWeight: "var(--fw-semi)" }}>Tier</th>
            <th style={{ textAlign: "right", padding: "var(--sp-6) 0", fontSize: "var(--fs-tiny)", fontWeight: "var(--fw-semi)" }}>Est.</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["Market", "Standard", "2.31"],
            ["Company", "Frontier", "2.78"],
            ["Interviews", "Light", "0.41"],
            ["Cohorts", "Standard", "0.33"],
            ["User panel", "Light", "0.98"],
            ["Product", "Standard", "3.50"],
            ["Verifier", "Balanced", "1.50"],
          ].map(([name, tier, cost]) => (
            <tr key={name} style={{ borderBottom: "1px solid var(--line)" }}>
              <td style={{ padding: "var(--sp-6) 0", fontFamily: "var(--sans)" }}>{name}</td>
              <td style={{ padding: "var(--sp-6) 0", textAlign: "right", color: "var(--fg3)", fontFamily: "var(--sans)" }}>{tier}</td>
              <td style={{ padding: "var(--sp-6) 0", textAlign: "right", fontFamily: "var(--sans)" }}>{cost}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2} style={{ padding: "var(--sp-12) 0", fontWeight: "var(--fw-semi)", fontFamily: "var(--sans)" }}>Estimate</td>
            <td style={{ padding: "var(--sp-12) 0", textAlign: "right", fontWeight: "var(--fw-semi)", fontFamily: "var(--sans)" }}>11.81</td>
          </tr>
        </tfoot>
      </table>
      <div style={{ display: "flex", gap: "var(--sp-8)", marginTop: "var(--sp-12)" }}>
        <div style={{ flex: 1, padding: "var(--sp-10)", background: "var(--fg)", color: "var(--bg)", borderRadius: "var(--r-4)", textAlign: "center", fontFamily: "var(--sans)" }}>Approve and run</div>
        <div style={{ flex: 1, padding: "var(--sp-10)", background: "var(--bg2)", border: "1px solid var(--line)", borderRadius: "var(--r-4)", textAlign: "center", color: "var(--fg2)", fontFamily: "var(--sans)" }}>Save for later</div>
      </div>
    </div>
  );
}

function StepRun(): ReactNode {
  return (
    <div>
      <p style={{ fontWeight: "var(--fw-semi)", marginBottom: "var(--sp-16)" }}>Northwind · Running · Illustrative</p>
      <div className="stack" style={{ gap: "var(--sp-6)" }}>
        {[
          { name: "Market", status: "Done, 14 sources", done: true },
          { name: "Company", status: "Done, 9 claims", done: true },
          { name: "User panel", status: "Running, 4 of 6", running: true },
          { name: "Verifier", status: "Last step" },
        ].map(({ name, status, done, running }) => (
          <div
            key={name}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "var(--sp-8)",
              background: "var(--bg2)",
              borderRadius: "var(--r-4)",
              fontFamily: "var(--sans)",
            }}
          >
            <span>{name}</span>
            <span style={{ color: running ? "var(--orange)" : done ? "var(--green)" : "var(--fg3)" }}>{status}</span>
          </div>
        ))}
        <div style={{ marginTop: "var(--sp-8)", padding: "var(--sp-12)", background: "var(--surf)", borderRadius: "var(--r-4)", fontFamily: "var(--sans)" }}>
          <p style={{ color: "var(--orange)", fontWeight: "var(--fw-semi)" }}>Gate: product verdict</p>
          <p style={{ color: "var(--fg2)", marginTop: "var(--sp-4)" }}>The run pauses here until you decide.</p>
        </div>
      </div>
      <p style={{ marginTop: "var(--sp-12)", color: "var(--fg3)", fontFamily: "var(--sans)" }}>
        Also by email. One reply from your phone and the run continues.
      </p>
    </div>
  );
}

// Build steps array once
const STEPS = [
  {
    n: "1",
    title: "Sign in with a code",
    description:
      "Work email, a six-digit code, and you are in. No password to choose, lose or reuse.",
    illustration: <StepSignIn />,
  },
  {
    n: "2",
    title: "Connect your model",
    description:
      "You approve access on your provider's own screen. Your key is encrypted and never visible to agents. You can revoke access from your provider at any time. Your first diligence runs as a capped trial on us.",
    illustration: <StepConnect />,
  },
  {
    n: "3",
    title: "Read the plan and its price",
    description:
      "Name a company. The coordinator drafts the route in seconds: agents in order, a model tier for each, what it still needs from you, and the cost. Set a cap, then approve.",
    illustration: <StepPlan />,
  },
  {
    n: "4",
    title: "Follow the run, answer the gates",
    description:
      "Watch one line per agent. Open the detail when you want it. Gates reach you by email — one reply and the run continues.",
    illustration: <StepRun />,
  },
];

// Compare table rows
const COMPARE_ROWS: Array<{ label: string; category?: boolean; free: string; pro: string; fund: string }> = [
  { label: "Work", category: true, free: "", pro: "", fund: "" },
  { label: "Diligences", free: "1 a week", pro: "Unlimited", fund: "Unlimited" },
  { label: "Members", free: "3", pro: "10", fund: "Unlimited" },
  { label: "Targets kept", free: "10", pro: "Unlimited, with archive", fund: "Unlimited" },
  { label: "Thesis", free: "One", pro: "Versioned", fund: "Versioned, per strategy" },
  { label: "Evidence", category: true, free: "", pro: "", fund: "" },
  { label: "Drop zone", free: "Yes", pro: "Yes", fund: "Yes" },
  { label: "Email ingestion", free: "No", pro: "Yes · Next", fund: "Yes · Next" },
  { label: "Data-room connectors", free: "No", pro: "No", fund: "Yes · Later" },
  { label: "Hosted vault", free: "Yes, capped", pro: "Yes", fund: "Yes" },
  { label: "Obsidian plugin", free: "No", pro: "Yes", fund: "Yes" },
  { label: "Models", category: true, free: "", pro: "", fund: "" },
  { label: "Connect your own model", free: "Yes", pro: "Yes", fund: "Yes" },
  { label: "Security", category: true, free: "", pro: "", fund: "" },
  { label: "Region", free: "United States", pro: "US or Europe · Next", fund: "Europe-only · Later" },
  { label: "Single sign-on", free: "No", pro: "No", fund: "Yes · Later" },
  { label: "Audit log", free: "No", pro: "No", fund: "Yes · Later" },
  { label: "Support", category: true, free: "", pro: "", fund: "" },
  { label: "Support", free: "Help docs", pro: "Email", fund: "Onboarding with us, shared channel" },
];

const ROADMAP: Array<{ phase: string; items: string[] }> = [
  {
    phase: "At launch",
    items: [
      "Email sign-in, workspaces and invites",
      "Targets with a deal stage, and an inbox of what needs you",
      "Evidence drop zone and ledger, in three data classes",
      "The plan with its price, a cap, and approval",
      "Investment route: market, company, interviews, cohorts, user panel, product, and the verifier",
      "Memo with confidence and a sources toggle",
      "Changes, and rebuilds of only what a new source touches",
      "Export to Word, PDF, Google Doc and Notion",
      "Connections to Claude, OpenAI, Mistral and Gemini",
      "Run tokens and a broker: no credential ever reaches an agent",
      "Hosted vault, encrypted in your browser, closed to agents by default",
      "Obsidian plugin from Pro, with no key to manage",
      "One capped trial diligence, then your own provider",
    ],
  },
  {
    phase: "Next",
    items: [
      "Technology diligence and value-creation plan, in the platform",
      "Forward an email to add evidence",
      "MCP interface: your own agents and assistants follow a run, read the memo and answer gates",
      "Push to your CRM, Affinity or Attio",
      "Europe mode: sandboxes hosted in the EU",
    ],
  },
  {
    phase: "Later",
    items: [
      "Several writer models in one memo: Anthropic, OpenAI, Mistral",
      "More model and vault connectors, in the order you ask for them",
      "Brand re-skin of a memo",
      "Fund plan: single sign-on and audit log",
      "SOC 2 Type I — Later",
    ],
  },
];

const FAQ: Array<{ q: string; a: string }> = [
  {
    q: "Do I have to paste an API key?",
    a: "At launch you can connect Claude, OpenAI, Mistral and Gemini. Where OAuth is supported, you approve access on your provider's own screen — no key involved. Where it is not yet available, you can paste a key as a last resort: it is encrypted and never visible to agents, and you can delete it in one click. Your first diligence is a capped trial on us, so you can read a memo before you connect anything.",
  },
  {
    q: "What will a diligence cost me?",
    a: "You see it before it runs. The plan lists each agent with its model and an estimate, you can switch to a cheaper or a stronger setting and watch the total move, and you set a cap. The run stops at the cap, and the actual cost sits next to the estimate.",
  },
  {
    q: "Who can read my documents?",
    a: "Your workspace members, and nobody else. Agents work in isolated sandboxes that hold no keys and can only reach a short list of hosts. Documents that a target shared with you are only sent to model providers that do not retain or train on them. The security page has the detail.",
  },
  {
    q: "Can I take my work with me?",
    a: "Yes. Memos export as Word and PDF, the ledger exports as a file, and your evidence goes with it. The method itself is open, so you can run it without us.",
  },
  {
    q: "Is this investment advice?",
    a: "No. It produces evidence-graded analysis for the people who make the decision. You and your committee own the call, and every claim shows its source so you can check it.",
  },
];

export default async function PlatformPage() {
  const isOpen = await platformOpen();
  const primaryHref = isOpen ? "/app" : "/contact";
  const primaryLabel = isOpen ? "Start free" : "Request early access";

  return (
    <main id="main-content">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="hero sec">
        <div className="wrap stack" style={{ maxWidth: "var(--measure-hero)" }}>
          <p className="eyebrow">Platform</p>
          <h1 className="head" style={{ fontFamily: "var(--serif)", fontSize: "clamp(40px, 5.5vw, 80px)", lineHeight: 1.05 }}>
            Start free. Read your first memo today.
          </h1>
          <p className="lead" style={{ maxWidth: "56ch" }}>
            Sign in with an email code, connect your own model, read the plan
            and its price, and approve. Skilled agents do the work, an
            independent verifier checks it, and you keep every source.
          </p>
          <div style={{ display: "flex", gap: "var(--gap-s)", flexWrap: "wrap" }}>
            <a href={primaryHref} className="btn btn-p">{primaryLabel}</a>
            <a href="/contact" className="btn btn-s">Talk to the team</a>
          </div>
          <div style={{ display: "flex", gap: "var(--gap-m)", flexWrap: "wrap" }}>
            <span className="body" style={{ color: "var(--fg2)" }}>1 diligence a week, free</span>
            <span className="body" style={{ color: "var(--fg2)" }}>Connect Claude, OpenAI, Mistral or Gemini</span>
            <span className="body" style={{ color: "var(--fg2)" }}>Price shown before launch</span>
          </div>
        </div>
      </section>

      {/* ── Internal nav ─────────────────────────────────────────── */}
      <nav
        aria-label="Platform sections"
        style={{
          position: "sticky",
          top: "var(--nav-h)",
          zIndex: 10,
          background: "var(--bg)",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div
          className="wrap"
          style={{
            display: "flex",
            gap: "var(--gap-m)",
            overflowX: "auto",
            paddingBlock: "var(--sp-12)",
            scrollbarWidth: "none",
          }}
        >
          {[
            { id: "get-started", label: "Get started" },
            { id: "connectors", label: "Connectors" },
            { id: "plans", label: "Plans" },
            { id: "compare", label: "Compare" },
            { id: "roadmap", label: "Roadmap" },
            { id: "faq", label: "Questions" },
          ].map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              style={{
                fontFamily: "var(--mono)",
                fontSize: "var(--fs-small)",
                color: "var(--fg2)",
                textDecoration: "none",
                whiteSpace: "nowrap",
                paddingBlock: "var(--sp-4)",
              }}
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* ── Get started ──────────────────────────────────────────── */}
      <section className="sec" id="get-started">
        <div className="wrap">
          <p className="eyebrow" style={{ marginBottom: "var(--sp-32)" }}>Get started</p>
          <p className="body" style={{ color: "var(--fg2)", maxWidth: "56ch", marginBottom: "var(--sp-48)" }}>
            Four steps, and you know the price at step three.
            The windows below are illustrations of the product, not a live account.
          </p>
          <PlatformSteps steps={STEPS} />
        </div>
      </section>

      {/* ── Connectors ───────────────────────────────────────────── */}
      <section className="sec" id="connectors" style={{ background: "var(--bg2)" }}>
        <div className="wrap">
          <p className="eyebrow" style={{ marginBottom: "var(--sp-32)" }}>Connectors</p>
          <h2 className="head" style={{ maxWidth: "44ch", marginBottom: "var(--sp-16)" }}>
            Connect, never paste.
          </h2>
          <p className="body" style={{ color: "var(--fg2)", maxWidth: "56ch", marginBottom: "var(--sp-48)" }}>
            You approve access on your provider's own screen. Your key is encrypted
            and never visible to agents. You can revoke access whenever you like.
            Missing one? Ask for it, and we count the demand.
          </p>

          <div className="g2" style={{ gap: "var(--gap-xl)" }}>
            <div>
              <p className="body" style={{ fontWeight: "var(--fw-semi)", marginBottom: "var(--sp-24)" }}>
                Models — where the agents think
              </p>
              <div className="stack" style={{ gap: "var(--sp-8)" }}>
                {providerList.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "var(--sp-16)",
                      background: "var(--bg)",
                      borderRadius: "var(--r-8)",
                      border: "1px solid var(--line)",
                    }}
                  >
                    <div>
                      <p className="body" style={{ fontWeight: "var(--fw-semi)" }}>{p.name}</p>
                      <p className="small" style={{ color: "var(--fg2)", marginTop: "var(--sp-4)" }}>{p.description}</p>
                    </div>
                    <span className="status st-live">{p.tag}</span>
                  </div>
                ))}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "var(--sp-16)",
                    background: "var(--bg)",
                    borderRadius: "var(--r-8)",
                    border: "1px dashed var(--line)",
                  }}
                >
                  <div>
                    <p className="body" style={{ color: "var(--fg3)" }}>Another provider?</p>
                    <p className="small" style={{ color: "var(--fg3)", marginTop: "var(--sp-4)" }}>Ask for it, and we count the demand.</p>
                  </div>
                  <a href="/contact" className="btn btn-s" style={{ fontSize: "var(--fs-small)" }}>Ask</a>
                </div>
              </div>
            </div>

            <div>
              <p className="body" style={{ fontWeight: "var(--fw-semi)", marginBottom: "var(--sp-24)" }}>
                Vaults — where your notes live
              </p>
              <div className="stack" style={{ gap: "var(--sp-8)" }}>
                {[
                  { name: "Hosted vault, the default", desc: "Encrypted in your browser. We host the ciphertext and cannot read it.", tag: "At launch" },
                  { name: "Obsidian plugin, from Pro", desc: "Connect your own vault. Notes stay on your machine.", tag: "At launch" },
                ].map(({ name, desc, tag }) => (
                  <div
                    key={name}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "var(--sp-16)",
                      background: "var(--bg)",
                      borderRadius: "var(--r-8)",
                      border: "1px solid var(--line)",
                    }}
                  >
                    <div>
                      <p className="body" style={{ fontWeight: "var(--fw-semi)" }}>{name}</p>
                      <p className="small" style={{ color: "var(--fg2)", marginTop: "var(--sp-4)" }}>{desc}</p>
                    </div>
                    <span className="status st-live">{tag}</span>
                  </div>
                ))}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "var(--sp-16)",
                    background: "var(--bg)",
                    borderRadius: "var(--r-8)",
                    border: "1px dashed var(--line)",
                  }}
                >
                  <p className="body" style={{ color: "var(--fg3)" }}>Another vault?</p>
                  <a href="/contact" className="btn btn-s" style={{ fontSize: "var(--fs-small)" }}>Ask</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Plans ────────────────────────────────────────────────── */}
      <section className="sec" id="plans">
        <div className="wrap">
          <p className="eyebrow" style={{ marginBottom: "var(--sp-32)" }}>Plans</p>
          <h2 className="head" style={{ maxWidth: "44ch", marginBottom: "var(--sp-16)" }}>
            Start alone. Add the team and the vault when you need them.
          </h2>
          <p className="body" style={{ color: "var(--fg2)", maxWidth: "56ch", marginBottom: "var(--sp-48)" }}>
            The free plan is a real one. We talk through prices with you, so
            you pay for what you use. The model bill goes to your own provider,
            and the plan shows it before you launch.
          </p>
          <div className="g3">
            {planList.map((plan) => (
              <div
                key={plan.id}
                style={{
                  padding: "var(--sp-32)",
                  border: "1px solid var(--line)",
                  borderRadius: "var(--r-12)",
                  background: plan.id === "free" ? "var(--bg)" : "var(--bg2)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--sp-24)",
                }}
              >
                <div>
                  <p className="body" style={{ fontWeight: "var(--fw-semi)" }}>{plan.tagline}</p>
                  <p
                    style={{
                      fontFamily: "var(--serif)",
                      fontSize: "clamp(28px, 3vw, 44px)",
                      color: "var(--fg)",
                      marginTop: "var(--sp-8)",
                      lineHeight: 1.1,
                    }}
                  >
                    {plan.name}
                  </p>
                  <p className="small" style={{ color: "var(--fg2)", marginTop: "var(--sp-8)" }}>{plan.limit}</p>
                </div>
                <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "var(--sp-12)" }}>
                  {plan.features.map((f) => {
                    const text = typeof f === "string" ? f : (f as { text: string; status: string }).text;
                    const status = typeof f === "string" ? null : (f as { text: string; status: string }).status;
                    return (
                      <li key={text} style={{ display: "flex", gap: "var(--sp-8)", alignItems: "center" }}>
                        <span style={{ color: "var(--green)" }}>→</span>
                        <span className="body" style={{ color: "var(--fg2)" }}>{text}</span>
                        {status && (
                          <span className={`status ${status === "Next" ? "st-build" : "st-plan"}`}>
                            {status}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
                <div style={{ marginTop: "auto" }}>
                  <a href={plan.ctaHref} className={plan.id === "free" ? "btn btn-p" : "btn btn-s"} style={{ display: "block", textAlign: "center" }}>
                    {plan.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
          <p className="small" style={{ color: "var(--fg3)", marginTop: "var(--sp-24)" }}>
            Launch limits, which may move before general availability. Prices are agreed with you, not posted.
          </p>
        </div>
      </section>

      {/* ── Compare ──────────────────────────────────────────────── */}
      <section className="sec" id="compare" style={{ background: "var(--bg2)" }}>
        <div className="wrap">
          <p className="eyebrow" style={{ marginBottom: "var(--sp-32)" }}>Compare</p>
          <p className="body" style={{ color: "var(--fg2)", marginBottom: "var(--sp-32)" }}>Every limit, side by side.</p>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "520px" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid var(--line)" }}>
                  <th style={{ textAlign: "left", padding: "var(--sp-12) var(--sp-8)", fontFamily: "var(--mono)", fontSize: "var(--fs-small)" }}>Feature</th>
                  <th style={{ textAlign: "left", padding: "var(--sp-12) var(--sp-8)", fontFamily: "var(--mono)", fontSize: "var(--fs-small)" }}>Free</th>
                  <th style={{ textAlign: "left", padding: "var(--sp-12) var(--sp-8)", fontFamily: "var(--mono)", fontSize: "var(--fs-small)" }}>Pro</th>
                  <th style={{ textAlign: "left", padding: "var(--sp-12) var(--sp-8)", fontFamily: "var(--mono)", fontSize: "var(--fs-small)" }}>Fund</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map(({ label, category, free, pro, fund }) =>
                  category ? (
                    <tr key={label}>
                      <td
                        colSpan={4}
                        style={{
                          padding: "var(--sp-20) var(--sp-8) var(--sp-8)",
                          fontFamily: "var(--mono)",
                          fontSize: "var(--fs-tiny)",
                          color: "var(--fg3)",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                        }}
                      >
                        {label}
                      </td>
                    </tr>
                  ) : (
                    <tr key={label} style={{ borderBottom: "1px solid var(--line)" }}>
                      <td style={{ padding: "var(--sp-10) var(--sp-8)", color: "var(--fg2)" }}>{label}</td>
                      <td style={{ padding: "var(--sp-10) var(--sp-8)" }}>{free}</td>
                      <td style={{ padding: "var(--sp-10) var(--sp-8)" }}>{pro}</td>
                      <td style={{ padding: "var(--sp-10) var(--sp-8)" }}>{fund}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Roadmap ──────────────────────────────────────────────── */}
      <section className="sec" id="roadmap">
        <div className="wrap">
          <p className="eyebrow" style={{ marginBottom: "var(--sp-16)" }}>Roadmap</p>
          <p className="body" style={{ color: "var(--fg2)", maxWidth: "60ch", marginBottom: "var(--sp-48)" }}>
            What is there at launch, and what comes next. We would rather tell
            you what is not built yet than let you find out in a security review.
            This list is the one we work from.
          </p>
          <div className="g3">
            {ROADMAP.map(({ phase, items }) => (
              <div key={phase}>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--sp-8)", marginBottom: "var(--sp-24)" }}>
                  <span
                    className={`status ${
                      phase === "At launch" ? "st-live" : phase === "Next" ? "st-build" : "st-plan"
                    }`}
                  >
                    {phase}
                  </span>
                </div>
                <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "var(--sp-12)" }}>
                  {items.map((item) => (
                    <li key={item} style={{ display: "flex", gap: "var(--sp-10)", alignItems: "start" }}>
                      <span style={{ color: "var(--fg3)", flexShrink: 0 }}>·</span>
                      <p className="body" style={{ color: "var(--fg2)", margin: 0 }}>{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section className="sec" id="faq" style={{ background: "var(--bg2)" }}>
        <div className="wrap">
          <p className="eyebrow" style={{ marginBottom: "var(--sp-32)" }}>Questions</p>
          <p className="body" style={{ color: "var(--fg2)", marginBottom: "var(--sp-48)" }}>
            Before you sign in.
          </p>
          <div style={{ maxWidth: "700px" }}>
            {FAQ.map(({ q, a }) => (
              <details
                key={q}
                style={{ borderTop: "1px solid var(--line)", paddingBlock: "var(--sp-20)" }}
              >
                <summary
                  style={{
                    cursor: "pointer",
                    listStyle: "none",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "var(--sp-16)",
                    fontWeight: "var(--fw-semi)",
                    color: "var(--fg)",
                  }}
                >
                  {q}
                  <span style={{ flexShrink: 0, color: "var(--fg3)" }}>+</span>
                </summary>
                <p className="body" style={{ color: "var(--fg2)", marginTop: "var(--sp-16)", maxWidth: "56ch" }}>{a}</p>
              </details>
            ))}
            <div style={{ borderTop: "1px solid var(--line)" }} />
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
            Read a real memo. Then decide.
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
