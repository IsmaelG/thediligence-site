export const metadata = {
  title: "Security and compliance — TheDiligence",
  description:
    "Agents work inside sandboxes that hold no keys, reach only the hosts you expect, and cannot send anything anywhere.",
};

function Chip({ label, tone = "build" }: { label: string; tone?: "live" | "build" | "plan" }) {
  return <span className={`status st-${tone}`} style={{ fontSize: "11px" }}>{label}</span>;
}

const CONTROLS = [
  {
    chip: "At launch",
    tone: "live" as const,
    title: "Access",
    body: "Sign-in by one-time email code, rate-limited and usable once. Roles per workspace. The database itself refuses to show one workspace the rows of another.",
  },
  {
    chip: "At launch",
    tone: "live" as const,
    title: "Provider connections",
    body: "You approve access on your provider's own screen, through an OAuth connection. Your key stays with your provider, and you can revoke access from your provider at any time. A run whose connection fails is refused, not degraded.",
  },
  {
    chip: "At launch",
    tone: "live" as const,
    title: "Sandboxes",
    body: "One isolated sandbox per branch of a run. Evidence is mounted read-only. Each step reaches only the hosts it needs: search, the target's own domains, package registries.",
  },
  {
    chip: "At launch",
    tone: "live" as const,
    title: "Untrusted documents",
    body: "A founder deck can contain instructions. We treat every document as data, never as a command, and agents have no tool that could act on one.",
  },
  {
    chip: "At launch",
    tone: "live" as const,
    title: "Run log and retention",
    body: "Every tool call, decision and cost goes to an append-only log you can replay. Evidence goes when the target does, and a retention policy can be set per workspace.",
  },
  {
    chip: "At launch",
    tone: "live" as const,
    title: "Sharing and export",
    body: "Links are scoped to the workspace and expire. File links are signed and short-lived. Exports carry the workspace and the date. Everything can be exported.",
  },
  {
    chip: "Next",
    tone: "build" as const,
    title: "Europe mode",
    body: "Sandboxes hosted in the EU first. A Europe-only mode follows, where models are restricted to European regions or to a European provider.",
  },
  {
    chip: "At launch",
    tone: "live" as const,
    title: "Vault",
    body: "Hosted by us and encrypted in your browser: we store ciphertext and cannot read it. From Pro, an Obsidian plugin keeps notes in your own vault instead, and we hold no key to them. Agents cannot read either, unless a member shares a note for one target, and the share is logged.",
  },
  {
    chip: "Later",
    tone: "plan" as const,
    title: "Single sign-on and audit log",
    body: "SAML sign-on for the whole team, and an audit log of who opened what, for the Fund plan.",
  },
];

const TOKEN_STEPS = [
  { n: "1 · You", title: "Your provider account", detail: "You approve access on your provider's own screen, through an OAuth connection. Approved on your screen, revocable at any time.", note: "Your key stays with your provider" },
  { n: "2 · Run", title: "Workflow", detail: "Starts the run and mints a short-lived token, valid for this workspace, this target, this budget and these models.", note: "Holds a token that expires with the run" },
  { n: "3 · Work", title: "Sandbox", detail: "Where the agents read and write. Documents are mounted read-only. Only a short list of hosts can be reached.", note: "Holds the token. No credential, ever" },
  { n: "4 · Swap", title: "Connection broker", detail: "Turns the token into one call to your provider through your connection, checks the budget, and records the cost.", note: "Reaches your provider one call at a time" },
  { n: "5 · Model", title: "Your provider", detail: "Sees an ordinary call from your account. The bill lands with you, not with us.", note: "Your account, your terms" },
];

const DATA_CLASSES = [
  {
    cls: "Public",
    what: "Websites, filings, press, anything anyone can open.",
    who: "Any model you connect.",
    where: "Your ledger, with the source id and the date retrieved.",
  },
  {
    cls: "Target-confidential",
    what: "What the target shared with you: decks, data-room exports, financials, call notes.",
    who: "Only providers that do not retain or train on your traffic, under a data processing agreement.",
    where: "Your workspace only. Deleted with the target. Exports are watermarked.",
  },
  {
    cls: "Fund-internal",
    what: "Your thesis, partner notes, term sheets, references.",
    who: "Same as above, and only for the targets and runs you allow.",
    where: "Your vault, hosted by us and encrypted in your browser, or kept in Obsidian from Pro.",
  },
];

const COMPLIANCE = [
  { item: "Data processing agreement", chip: "At launch", tone: "live" as const, note: "We sign one with you on request, and hold one with each subprocessor listed below." },
  { item: "Security pass before launch", chip: "At launch", tone: "live" as const, note: "Content security policy, rate limits, token and egress tests, a test deck that carries hostile instructions, dependency scanning, and key rotation, all checked before release." },
  { item: "Incident process and status page", chip: "At launch", tone: "live" as const, note: "A written process, and a public page showing the health of the service." },
  { item: "Hosting region", chip: "At launch", tone: "live" as const, note: "United States. Europe sandboxes follow, then a Europe-only mode." },
  { item: "Independent penetration test", chip: "Later", tone: "plan" as const, note: "Planned after the first release." },
  { item: "SOC 2 Type I — Later", chip: "Later", tone: "plan" as const, note: "Budgeted for the second year. It is a prerequisite for the Fund plan." },
];

const SUBPROCESSORS = [
  { name: "Vercel", role: "Hosting, sandboxes, file storage" },
  { name: "Neon", role: "Database" },
  { name: "Resend", role: "Sign-in codes, invites, notifications" },
  { name: "Stripe", role: "Billing, when enabled" },
  { name: "Sentry", role: "Errors, with no document content" },
  { name: "Axiom", role: "Traces and logs, with no document content" },
  { name: "PostHog, EU", role: "Product analytics, on public and onboarding pages" },
  { name: "Connection service", role: "Provider authorisation, so we never hold your keys" },
  { name: "Your providers", role: "Claude, OpenAI, Mistral and Gemini, on your own accounts" },
];

export default function SecurityPage() {
  return (
    <main id="main-content">
      {/* Hero */}
      <section className="hero sec" style={{ paddingBottom: "var(--sp-64)" }}>
        <div className="wrap" style={{ maxWidth: "var(--head-max)" }}>
          <p className="eyebrow" style={{ marginBottom: "var(--sp-16)" }}>Security and compliance</p>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h1-page)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h1)", lineHeight: "var(--lh-h1)", marginBottom: "var(--sp-24)" }}>
            Built for data that cannot leave the building.
          </h1>
          <p className="lead" style={{ maxWidth: "62ch", marginBottom: "var(--sp-40)" }}>
            Agents work inside sandboxes that hold no keys, reach only the hosts you expect, and cannot send anything anywhere. This page says how, what is built and what is not, so your review starts from facts.
          </p>
          <div style={{ display: "flex", gap: "var(--sp-16)", flexWrap: "wrap", marginBottom: "var(--sp-40)" }}>
            {["No credential in a sandbox", "Three data classes", "Status shown on every control"].map((tag) => (
              <span key={tag} className="status st-live" style={{ fontSize: "12px" }}>{tag}</span>
            ))}
          </div>
          <div style={{ display: "flex", gap: "var(--gap-s)" }}>
            <a href="/book" className="btn btn-p">Request a security review</a>
          </div>
        </div>
      </section>

      {/* Page anchor nav */}
      <nav aria-label="Security sections" style={{ position: "sticky", top: "var(--nav-h)", zIndex: 10, background: "var(--nav-bg)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", borderBottom: "1px solid var(--line2)" }}>
        <div className="wrap" style={{ display: "flex", gap: "var(--sp-32)", overflowX: "auto", paddingBlock: "var(--sp-12)" }}>
          {[
            { id: "keys", label: "Keys" },
            { id: "data-classes", label: "Data classes" },
            { id: "controls", label: "Controls" },
            { id: "limits", label: "What agents cannot do" },
            { id: "compliance", label: "Compliance" },
          ].map(({ id, label }) => (
            <a key={id} href={`#${id}`} style={{ fontFamily: "var(--mono)", fontSize: 12, fontWeight: 500, color: "var(--mut)", textDecoration: "none", whiteSpace: "nowrap", letterSpacing: "0.04em" }}>
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* Keys and models */}
      <section id="keys" className="sec">
        <div className="wrap">
          <div style={{ maxWidth: "var(--head-max)", marginBottom: "var(--head-mb)" }}>
            <p className="eyebrow" style={{ marginBottom: "var(--sp-16)" }}>Keys and models</p>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h2)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h2)", lineHeight: "var(--lh-h2)", marginBottom: "var(--sp-24)" }}>
              Your credential stays with your provider. No key near an agent.
            </h2>
            <p className="lead" style={{ maxWidth: "62ch" }}>
              Model-written code is the riskiest thing in the system, so it is the one place that never holds a secret. You approve your provider through an OAuth connection, a run gets a token that is worth nothing outside this run, and a broker does the rest.
            </p>
          </div>

          {/* 5-step token flow */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "var(--gap-grid)", marginBottom: "var(--sp-48)" }}>
            {TOKEN_STEPS.map((step) => (
              <div key={step.n} className="card" style={{ display: "flex", flexDirection: "column", gap: "var(--sp-12)" }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: "var(--fs-tiny)", fontWeight: "var(--fw-semibold)", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mut)" }}>{step.n}</span>
                <h3 style={{ fontSize: "16px", fontWeight: "var(--fw-semibold)", margin: 0 }}>{step.title}</h3>
                <p className="small" style={{ margin: 0, flex: 1, color: "var(--fg2)", lineHeight: 1.55 }}>{step.detail}</p>
                <p style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--mut)", margin: 0, lineHeight: 1.4 }}>{step.note}</p>
              </div>
            ))}
          </div>

          <div className="g3">
            {[
              { title: "The token dies with the run", body: "It is scoped to one workspace, one target, a budget and a list of models. After the run, it opens nothing." },
              { title: "The budget is enforced outside the sandbox", body: "The broker counts every call. When the cap is reached the run stops, whatever the agent wants." },
              { title: "A build fails if a credential leaks", body: "A test searches the sandbox environment and its logs for credential patterns on every build." },
            ].map((f) => (
              <div key={f.title} className="card">
                <h3 style={{ fontSize: "17px", fontWeight: "var(--fw-semibold)", marginBottom: "var(--sp-10)" }}>{f.title}</h3>
                <p className="small" style={{ margin: 0, color: "var(--fg2)", lineHeight: 1.55 }}>{f.body}</p>
              </div>
            ))}
          </div>

          <p className="small" style={{ marginTop: "var(--sp-32)", color: "var(--mut)" }}>
            <Chip label="At launch" tone="live" />{" "}
            Provider connections for Claude, OpenAI, Mistral and Gemini, run tokens, the broker and the egress allowlist ship with the first release.
          </p>
        </div>
      </section>

      {/* Data classes */}
      <section id="data-classes" className="sec alt">
        <div className="wrap">
          <div style={{ maxWidth: "var(--head-max)", marginBottom: "var(--head-mb)" }}>
            <p className="eyebrow" style={{ marginBottom: "var(--sp-16)" }}>Data classes</p>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h2)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h2)", lineHeight: "var(--lh-h2)", marginBottom: "var(--sp-24)" }}>
              Every document has a class. The class decides who may read it.
            </h2>
            <p className="lead" style={{ maxWidth: "62ch" }}>
              A class is set when a document comes in and shown on every row of the ledger. Before you launch, the plan tells you which provider will read which class.
            </p>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table className="tbl" style={{ minWidth: 700 }}>
              <thead>
                <tr>
                  <th style={{ width: "15%" }}>Class</th>
                  <th style={{ width: "30%" }}>What it is</th>
                  <th style={{ width: "30%" }}>Which models may read it</th>
                  <th style={{ width: "25%" }}>Where it goes</th>
                </tr>
              </thead>
              <tbody>
                {DATA_CLASSES.map((row) => (
                  <tr key={row.cls}>
                    <td style={{ fontWeight: "var(--fw-semibold)", color: "var(--fg)", fontSize: "var(--fs-small)" }}>{row.cls}</td>
                    <td>{row.what}</td>
                    <td>{row.who}</td>
                    <td>{row.where}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="small" style={{ marginTop: "var(--sp-24)", color: "var(--mut)" }}>
            Logs, traces and analytics carry ids and costs. They never carry evidence, prompts or keys.
          </p>
        </div>
      </section>

      {/* Controls */}
      <section id="controls" className="sec">
        <div className="wrap">
          <div style={{ maxWidth: "var(--head-max)", marginBottom: "var(--head-mb)" }}>
            <p className="eyebrow" style={{ marginBottom: "var(--sp-16)" }}>Controls</p>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h2)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h2)", lineHeight: "var(--lh-h2)", marginBottom: "var(--sp-24)" }}>
              What we have built, and what is on its way.
            </h2>
            <p className="lead" style={{ maxWidth: "62ch" }}>
              Each control carries a status. At launch means it ships with the first release. Next and Later are on our roadmap, and we do not describe them as done.
            </p>
          </div>

          <div className="g3">
            {CONTROLS.map((c) => (
              <div key={c.title} className="card">
                <div style={{ marginBottom: "var(--sp-12)" }}><Chip label={c.chip} tone={c.tone} /></div>
                <h3 style={{ fontSize: "17px", fontWeight: "var(--fw-semibold)", marginBottom: "var(--sp-10)" }}>{c.title}</h3>
                <p className="small" style={{ margin: 0, color: "var(--fg2)", lineHeight: 1.55 }}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What agents cannot do */}
      <section id="limits" className="sec alt">
        <div className="wrap">
          <div style={{ maxWidth: "var(--head-max)", marginBottom: "var(--head-mb)" }}>
            <p className="eyebrow" style={{ marginBottom: "var(--sp-16)" }}>Limits on the agents</p>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h2)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h2)", lineHeight: "var(--lh-h2)", marginBottom: "var(--sp-24)" }}>
              What an agent can never do.
            </h2>
            <p className="lead" style={{ maxWidth: "52ch" }}>
              These are rules built into the product, not promises in a policy.
            </p>
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "var(--sp-16)", maxWidth: "var(--wrap-n)" }}>
            {[
              "Hold or read your provider credentials.",
              "Send, post or email anything. Agents draft, people send.",
              "Reach a host that is not on the list for that step.",
              "Write a claim without a source, unless it is graded C and says so.",
              "Spend past the budget you set.",
              "Give a verdict without a person approving it at the gate.",
            ].map((rule) => (
              <li key={rule} style={{ display: "flex", gap: "var(--sp-14)", alignItems: "flex-start" }}>
                <span style={{ width: 20, height: 20, borderRadius: "50%", border: "1.5px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--fg)" }} />
                </span>
                <p className="body" style={{ margin: 0, lineHeight: 1.55 }}>{rule}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Compliance */}
      <section id="compliance" className="sec">
        <div className="wrap">
          <div style={{ maxWidth: "var(--head-max)", marginBottom: "var(--head-mb)" }}>
            <p className="eyebrow" style={{ marginBottom: "var(--sp-16)" }}>Compliance</p>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h2)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h2)", lineHeight: "var(--lh-h2)", marginBottom: "var(--sp-24)" }}>
              Compliance, stated plainly.
            </h2>
            <p className="lead" style={{ maxWidth: "58ch" }}>
              We hold no certification today. We would rather say so than imply otherwise. Below is what is in place and what we are working toward, so you can judge whether it is enough for your deal.
            </p>
          </div>

          <div style={{ overflowX: "auto", marginBottom: "var(--sp-64)" }}>
            <table className="tbl" style={{ minWidth: 640 }}>
              <thead>
                <tr>
                  <th style={{ width: "30%" }}>Item</th>
                  <th style={{ width: "15%" }}>Status</th>
                  <th>What it means</th>
                </tr>
              </thead>
              <tbody>
                {COMPLIANCE.map((row) => (
                  <tr key={row.item}>
                    <td style={{ fontWeight: "var(--fw-semibold)", color: "var(--fg)", fontSize: "var(--fs-small)" }}>{row.item}</td>
                    <td><Chip label={row.chip} tone={row.tone} /></td>
                    <td>{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ maxWidth: "var(--head-max)", marginBottom: "var(--head-mb)" }}>
            <p className="eyebrow" style={{ marginBottom: "var(--sp-16)" }}>Subprocessors</p>
            <h3 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h3)", fontWeight: "var(--fw-semibold)", marginBottom: "var(--sp-16)" }}>
              Who touches your data, and why.
            </h3>
            <p className="body" style={{ maxWidth: "58ch", marginBottom: "var(--sp-32)" }}>
              The model providers you connect are not our subprocessors. They run on your own accounts, under your terms.
            </p>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table className="tbl" style={{ minWidth: 480 }}>
              <thead>
                <tr>
                  <th style={{ width: "30%" }}>Processor</th>
                  <th>Purpose</th>
                </tr>
              </thead>
              <tbody>
                {SUBPROCESSORS.map((sp) => (
                  <tr key={sp.name}>
                    <td style={{ fontWeight: "var(--fw-semibold)", color: "var(--fg)", fontSize: "var(--fs-small)" }}>{sp.name}</td>
                    <td>{sp.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="band">
        <div className="wrap" style={{ textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h2)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h2)", lineHeight: "var(--lh-h2)", color: "var(--bg)", marginBottom: "var(--sp-24)" }}>
            Bring your questionnaire. We answer in writing.
          </h2>
          <p style={{ fontSize: "var(--fs-lead)", color: "var(--bg)", opacity: 0.75, marginBottom: "var(--sp-40)", maxWidth: "52ch", marginInline: "auto" }}>
            Send your security review with the deal. We reply with the architecture, the data flow and the status of every control, before the first call.
          </p>
          <div style={{ display: "flex", gap: "var(--gap-s)", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/book" className="btn btn-p">Request a security review</a>
            <a href="/platform#roadmap" className="btn btn-s">See the roadmap</a>
          </div>
        </div>
      </section>
    </main>
  );
}
