import { platformOpen } from "@/lib/flags";

export const metadata = {
  title: "Products — TheDiligence",
  description:
    "One platform built around the evidence. Plan, run, memo, evidence, vault, workflow, models.",
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

export default async function ProductsPage() {
  const isOpen = await platformOpen();
  const primaryHref = isOpen ? "/app" : "/contact";
  const primaryLabel = isOpen ? "Start free" : "Request early access";

  return (
    <main id="main-content">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="hero sec">
        <div className="wrap stack" style={{ maxWidth: "var(--measure-hero)" }}>
          <p className="eyebrow">Products</p>
          <h1 className="head" style={{ fontFamily: "var(--serif)", fontSize: "clamp(40px, 5.5vw, 80px)", lineHeight: 1.05 }}>
            One platform, built around the evidence.
          </h1>
          <p className="lead" style={{ maxWidth: "56ch" }}>
            Plan the work and see its price. Run specialist agents. Read a memo
            where every claim has a source. Keep it current as the facts change.
          </p>
          <div style={{ display: "flex", gap: "var(--gap-s)", flexWrap: "wrap" }}>
            <a href={primaryHref} className="btn btn-p">{primaryLabel}</a>
            <a href="/contact" className="btn btn-s">Book time with us</a>
          </div>
        </div>
      </section>

      {/* ── Sticky product nav ───────────────────────────────────── */}
      <nav
        aria-label="Product sections"
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
          {NAV_STOPS.map(({ id, label }) => (
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
                transition: "color 0.15s",
              }}
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* ── 01 · Plan ────────────────────────────────────────────── */}
      <section className="sec" id="plan">
        <div className="wrap">
          <div className="g2" style={{ gap: "var(--gap-xl)", alignItems: "start" }}>
            <div className="stack">
              <p className="eyebrow">01 · Plan</p>
              <h2 className="head">Know the cost before you build the memo.</h2>
              <p className="body" style={{ color: "var(--fg2)" }}>
                No run starts without a plan you have seen. The coordinator
                drafts it in seconds: the sequence of agents, what each one
                will cost, what it still needs from you, and where it will
                stop for your approval.
              </p>
              <div className="stack" style={{ gap: "var(--sp-16)" }}>
                {[
                  {
                    h: "Every agent has a price",
                    b: "Estimated from the agent's own profile and the list prices of the providers you connected. Change a model, watch the total move.",
                  },
                  {
                    h: "A cap the run obeys",
                    b: "If a run would cross your budget, it stops and delivers what exists, with a list of what is missing.",
                  },
                  {
                    h: "Estimate against actual",
                    b: "After the run, each agent shows its drift, and its profile updates itself.",
                  },
                  {
                    h: "New evidence priced to what it touches",
                    b: "A new revenue export later: rebuild only the sections it changes. You see the cost first.",
                  },
                ].map(({ h, b }) => (
                  <div key={h}>
                    <p className="body" style={{ fontWeight: "var(--fw-semi)" }}>{h}</p>
                    <p className="body" style={{ color: "var(--fg2)", marginTop: "var(--sp-4)" }}>{b}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="card stack" style={{ fontFamily: "var(--mono)", fontSize: "var(--fs-small)" }}>
              <p style={{ fontWeight: "var(--fw-semi)" }}>Plan before you build</p>
              <p style={{ color: "var(--fg3)", fontSize: "var(--fs-tiny)" }}>New target · Northwind · Investment route · 1 gate · Illustrative</p>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--line)" }}>
                    <th style={{ textAlign: "left", padding: "var(--sp-8) 0", fontWeight: "var(--fw-semi)", fontSize: "var(--fs-tiny)" }}>Agent</th>
                    <th style={{ textAlign: "right", padding: "var(--sp-8) 0", fontWeight: "var(--fw-semi)", fontSize: "var(--fs-tiny)" }}>Tier</th>
                    <th style={{ textAlign: "right", padding: "var(--sp-8) 0", fontWeight: "var(--fw-semi)", fontSize: "var(--fs-tiny)" }}>Est.</th>
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
                      <td style={{ padding: "var(--sp-8) 0" }}>{name}</td>
                      <td style={{ padding: "var(--sp-8) 0", textAlign: "right", color: "var(--fg3)" }}>{tier}</td>
                      <td style={{ padding: "var(--sp-8) 0", textAlign: "right" }}>{cost}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={2} style={{ padding: "var(--sp-12) 0", fontWeight: "var(--fw-semi)" }}>Estimate</td>
                    <td style={{ padding: "var(--sp-12) 0", textAlign: "right", fontWeight: "var(--fw-semi)" }}>11.81</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02 · Run ─────────────────────────────────────────────── */}
      <section className="sec" id="run" style={{ background: "var(--bg2)" }}>
        <div className="wrap">
          <div className="g2" style={{ gap: "var(--gap-xl)", alignItems: "start" }}>
            <div className="stack">
              <p className="eyebrow">02 · Run</p>
              <h2 className="head">Specialist agents, orchestrated.</h2>
              <p className="body" style={{ color: "var(--fg2)" }}>
                One agent per question, started in the order the method requires
                and in parallel wherever it allows. You watch one line per agent,
                and open the detail only when you want it.
              </p>
              <div className="stack" style={{ gap: "var(--sp-16)" }}>
                {[
                  {
                    h: "The coordinator plans, it does not write",
                    b: "It reads the target and your thesis, picks the route, and asks one question when the answer changes the plan.",
                  },
                  {
                    h: "Each agent in its own sandbox",
                    b: "A clean context, the evidence mounted read-only, and a short list of hosts it may reach. No agent sees another's scratch work.",
                  },
                  {
                    h: "Runs pause and resume",
                    b: "A run waits at a gate for as long as you need. It survives restarts, and picks up exactly where it stopped.",
                  },
                  {
                    h: "Failure is explicit",
                    b: "If one agent fails, its dependents wait and the rest continue. You get a partial memo with a clear list of what is missing.",
                  },
                ].map(({ h, b }) => (
                  <div key={h}>
                    <p className="body" style={{ fontWeight: "var(--fw-semi)" }}>{h}</p>
                    <p className="body" style={{ color: "var(--fg2)", marginTop: "var(--sp-4)" }}>{b}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="card stack" style={{ fontFamily: "var(--mono)", fontSize: "var(--fs-small)" }}>
              <p style={{ fontWeight: "var(--fw-semi)" }}>Northwind · Running</p>
              <p style={{ color: "var(--fg3)", fontSize: "var(--fs-tiny)" }}>Investment route · plan v1 · Illustrative</p>
              <div className="stack" style={{ gap: "var(--sp-8)", marginTop: "var(--sp-8)" }}>
                {[
                  { name: "Market", status: "Done, 14 sources", cost: "2.31", done: true },
                  { name: "Interviews", status: "Done, 5 transcripts", cost: "0.41", done: true },
                  { name: "Company", status: "Done, 9 claims", cost: "2.78", done: true },
                  { name: "Cohorts", status: "Done, 24 months", cost: "0.33", done: true },
                  { name: "User panel", status: "Running, 4 of 6 personas", cost: "0.98", running: true },
                  { name: "Technology", status: "Running, reading the contract", cost: "0.84", running: true },
                  { name: "Product", status: "After Cohorts, Panel — waiting", cost: "est. 3.50", waiting: true },
                  { name: "Verifier", status: "Different model family — last step", cost: "est. 1.50", waiting: true },
                ].map(({ name, status, cost, done, running, waiting }) => (
                  <div
                    key={name}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "var(--sp-8)",
                      padding: "var(--sp-8)",
                      background: "var(--bg)",
                      borderRadius: "var(--r-4)",
                      opacity: waiting ? 0.6 : 1,
                    }}
                  >
                    <div>
                      <span style={{ fontWeight: done ? "var(--fw-semi)" : "normal" }}>{name}</span>
                      <span style={{ marginLeft: "var(--sp-8)", color: running ? "var(--orange)" : done ? "var(--green)" : "var(--fg3)" }}>
                        {status}
                      </span>
                    </div>
                    <span style={{ color: "var(--fg3)", whiteSpace: "nowrap" }}>{cost}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "var(--sp-12)", padding: "var(--sp-12)", background: "var(--surf)", borderRadius: "var(--r-4)" }}>
                <p style={{ fontWeight: "var(--fw-semi)", color: "var(--orange)" }}>Gate: product verdict</p>
                <p style={{ color: "var(--fg2)", marginTop: "var(--sp-4)" }}>The run pauses here until you approve.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 03 · Memo ────────────────────────────────────────────── */}
      <section className="sec" id="memo">
        <div className="wrap">
          <div className="g2" style={{ gap: "var(--gap-xl)", alignItems: "start" }}>
            <div className="stack">
              <p className="eyebrow">03 · Memo</p>
              <h2 className="head">A memo you can take into the room.</h2>
              <p className="body" style={{ color: "var(--fg2)" }}>
                Verdict first, then a section per question, each with a
                confidence and a source on every claim. The work behind a
                section is one click away.
              </p>
              <div className="stack" style={{ gap: "var(--sp-16)" }}>
                {[
                  {
                    h: "Confidence per section",
                    b: "High, Medium or Low, computed from the mix of A, B and C claims. Confidence is calculated, not asserted.",
                  },
                  {
                    h: "Edit where you read",
                    b: "Change a sentence in place. It is saved as a steering note for the next rebuild, and the new version is marked as human-edited.",
                  },
                  {
                    h: "Take it with you",
                    b: "Export to PDF, Google Doc or Notion, with the evidence appendix. Every export carries the workspace, the date and the advisory notice.",
                  },
                ].map(({ h, b }) => (
                  <div key={h}>
                    <p className="body" style={{ fontWeight: "var(--fw-semi)" }}>{h}</p>
                    <p className="body" style={{ color: "var(--fg2)", marginTop: "var(--sp-4)" }}>{b}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="card stack" style={{ fontFamily: "var(--mono)", fontSize: "var(--fs-small)" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: "var(--fw-semi)" }}>Northwind · Memo</span>
                <span style={{ color: "var(--fg3)", fontSize: "var(--fs-tiny)" }}>Illustrative</span>
              </div>
              <div style={{ padding: "var(--sp-12)", background: "var(--surf)", borderRadius: "var(--r-4)", marginTop: "var(--sp-8)" }}>
                <p style={{ fontWeight: "var(--fw-semi)", color: "var(--orange)" }}>Verdict: Conditional</p>
                <p style={{ color: "var(--fg2)", marginTop: "var(--sp-4)" }}>Invest if onboarding is fixed.</p>
              </div>
              <div className="stack" style={{ gap: "var(--sp-8)", marginTop: "var(--sp-8)" }}>
                {[
                  { label: "Market", conf: "High", grade: "A", claim: "TAM is multi-billion, growing at 18% CAGR." },
                  { label: "Product", conf: "High", grade: "A", claim: "Retention flattens after month nine." },
                  { label: "Company", conf: "Medium", grade: "B", claim: "ARR tripled in 24 months." },
                ].map(({ label, conf, grade, claim }) => (
                  <div key={label} style={{ padding: "var(--sp-8)", background: "var(--bg)", borderRadius: "var(--r-4)" }}>
                    <div style={{ display: "flex", gap: "var(--sp-8)", alignItems: "center", marginBottom: "var(--sp-4)" }}>
                      <span style={{ fontWeight: "var(--fw-semi)" }}>{label}</span>
                      <span style={{ color: "var(--fg3)", fontSize: "var(--fs-tiny)" }}>{conf}</span>
                      <span className={`grade grade-${grade.toLowerCase()}`}>{grade}</span>
                    </div>
                    <p style={{ color: "var(--fg2)", fontFamily: "var(--sans)", margin: 0 }}>{claim}</p>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "var(--sp-12)", padding: "var(--sp-12)", background: "var(--bg2)", borderRadius: "var(--r-4)" }}>
                <p style={{ color: "var(--fg3)", fontSize: "var(--fs-tiny)", fontWeight: "var(--fw-semi)" }}>Work lineage · Product v3</p>
                <p style={{ color: "var(--fg2)", marginTop: "var(--sp-4)" }}>
                  search 14 sources · read revenue export P-01 · compute cohort triangles
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 04 · Evidence ────────────────────────────────────────── */}
      <section className="sec" id="evidence" style={{ background: "var(--bg2)" }}>
        <div className="wrap">
          <div className="g2" style={{ gap: "var(--gap-xl)", alignItems: "start" }}>
            <div className="stack">
              <p className="eyebrow">04 · Evidence and lineage</p>
              <h2 className="head">New evidence rewrites only what it touches.</h2>
              <p className="body" style={{ color: "var(--fg2)" }}>
                Every artifact records what it was built from. When a file arrives,
                the platform computes the sections that went stale, shows why, and
                prices the rebuild before you approve it.
              </p>
              <div className="stack" style={{ gap: "var(--sp-16)" }}>
                {[
                  {
                    h: "One drop zone",
                    b: "Files, links and pasted text are stored, read, classified, graded and tagged to the sections they touch.",
                  },
                  {
                    h: "Three data classes",
                    b: "Public, target-confidential and fund-internal. The plan shows which provider will read which class, before launch.",
                  },
                  {
                    h: "Ask the founder",
                    b: "Turn an item in the appendix into a request with an upload link that needs no account. You approve what lands.",
                  },
                  {
                    h: "Evidence is untrusted",
                    b: "A deck can contain instructions. Agents treat it as data, and have no tool that sends anything out.",
                  },
                ].map(({ h, b }) => (
                  <div key={h}>
                    <p className="body" style={{ fontWeight: "var(--fw-semi)" }}>{h}</p>
                    <p className="body" style={{ color: "var(--fg2)", marginTop: "var(--sp-4)" }}>{b}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="card stack" style={{ fontFamily: "var(--mono)", fontSize: "var(--fs-small)" }}>
              <p style={{ fontWeight: "var(--fw-semi)" }}>Northwind · Evidence ledger</p>
              <p style={{ color: "var(--fg3)", fontSize: "var(--fs-tiny)" }}>Illustrative</p>
              <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "var(--sp-8)" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--line)" }}>
                    <th style={{ textAlign: "left", padding: "var(--sp-6) 0", fontWeight: "var(--fw-semi)", fontSize: "var(--fs-tiny)" }}>Id</th>
                    <th style={{ textAlign: "left", padding: "var(--sp-6) 0", fontWeight: "var(--fw-semi)", fontSize: "var(--fs-tiny)" }}>Source</th>
                    <th style={{ textAlign: "left", padding: "var(--sp-6) 0", fontWeight: "var(--fw-semi)", fontSize: "var(--fs-tiny)" }}>Class</th>
                    <th style={{ textAlign: "left", padding: "var(--sp-6) 0", fontWeight: "var(--fw-semi)", fontSize: "var(--fs-tiny)" }}>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: "P-05", src: "Revenue export, 24 months", cls: "target", grade: "A" },
                    { id: "P-01", src: "Revenue export, 12 months", cls: "target", grade: "A" },
                    { id: "S-07", src: "Registry filing", cls: "public", grade: "A" },
                    { id: "I-04", src: "Customer call notes", cls: "target", grade: "B" },
                    { id: "S-03", src: "Analyst estimate", cls: "public", grade: "C" },
                  ].map(({ id, src, cls, grade }) => (
                    <tr key={id} style={{ borderBottom: "1px solid var(--line)" }}>
                      <td style={{ padding: "var(--sp-6) 0" }}><span className="source-id">{id}</span></td>
                      <td style={{ padding: "var(--sp-6) 0", color: "var(--fg2)", paddingLeft: "var(--sp-8)" }}>{src}</td>
                      <td style={{ padding: "var(--sp-6) 0", color: "var(--fg3)", paddingLeft: "var(--sp-8)" }}>{cls}</td>
                      <td style={{ padding: "var(--sp-6) 0", paddingLeft: "var(--sp-8)" }}>
                        <span className={`grade grade-${grade.toLowerCase()}`}>{grade}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── 05 · Vault ───────────────────────────────────────────── */}
      <section className="sec" id="vault">
        <div className="wrap">
          <div className="g2" style={{ gap: "var(--gap-xl)", alignItems: "start" }}>
            <div className="stack">
              <p className="eyebrow">05 · Vault</p>
              <div style={{ display: "flex", gap: "var(--sp-8)", alignItems: "center", flexWrap: "wrap" }}>
                <h2 className="head" style={{ margin: 0 }}>A vault we host, and cannot read.</h2>
                <span className="status st-live">At launch</span>
              </div>
              <p className="body" style={{ color: "var(--fg2)" }}>
                Term sheets, partner notes and your own view of a founder belong
                in a vault, not in a prompt. It is hosted by us and encrypted in
                your browser. The agents read nothing until you say so.
              </p>
              <p className="body" style={{ color: "var(--fg2)" }}>
                From Pro, a plugin connects your Obsidian vault instead. Either
                way, an agent reads a note only when you share it for one target.
              </p>
            </div>
            <div className="card">
              <div className="stack" style={{ gap: "var(--sp-16)" }}>
                {[
                  {
                    h: "Hosted vault",
                    b: "Encrypted in your browser. We host the ciphertext and cannot read it.",
                    tag: "At launch",
                  },
                  {
                    h: "Obsidian plugin",
                    b: "Connect your own vault from Pro. Notes stay on your machine.",
                    tag: "Next",
                  },
                ].map(({ h, b, tag }) => (
                  <div key={h}>
                    <div style={{ display: "flex", gap: "var(--sp-8)", alignItems: "center", marginBottom: "var(--sp-4)" }}>
                      <p className="body" style={{ fontWeight: "var(--fw-semi)", margin: 0 }}>{h}</p>
                      <span className={`status ${tag === "At launch" ? "st-live" : "st-build"}`}>{tag}</span>
                    </div>
                    <p className="body" style={{ color: "var(--fg2)" }}>{b}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 06 · Workflow ────────────────────────────────────────── */}
      <section className="sec" id="workflow" style={{ background: "var(--bg2)" }}>
        <div className="wrap">
          <div className="stack" style={{ maxWidth: "60ch" }}>
            <p className="eyebrow">06 · Workflow</p>
            <h2 className="head">Gates, email, and soon your own agents.</h2>
            <p className="body" style={{ color: "var(--fg2)" }}>
              Agents plan, read and draft. People decide. Nothing leaves without
              approval. Gates reach you by email — one tap from your phone and
              the run continues.
            </p>
          </div>
          <div className="g3" style={{ marginTop: "var(--sp-48)" }}>
            {[
              {
                h: "Gates by email",
                b: "A run pauses at a decision point and sends a summary. Reply, and it resumes.",
                tag: "At launch",
              },
              {
                h: "MCP interface",
                b: "Your own agents and assistants can follow a run, read the memo and answer gates.",
                tag: "Next",
              },
              {
                h: "CRM push",
                b: "Push to Affinity or Attio when the memo is delivered.",
                tag: "Next",
              },
              {
                h: "Forward evidence by email",
                b: "Forward a document to add it to the ledger directly.",
                tag: "Next",
              },
            ].map(({ h, b, tag }) => (
              <div key={h} className="card">
                <div style={{ display: "flex", gap: "var(--sp-8)", alignItems: "center", marginBottom: "var(--sp-8)" }}>
                  <p className="body" style={{ fontWeight: "var(--fw-semi)", margin: 0 }}>{h}</p>
                  <span className={`status ${tag === "At launch" ? "st-live" : "st-build"}`}>{tag}</span>
                </div>
                <p className="body" style={{ color: "var(--fg2)" }}>{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 07 · Models ──────────────────────────────────────────── */}
      <section className="sec" id="models">
        <div className="wrap">
          <div className="stack" style={{ maxWidth: "60ch" }}>
            <p className="eyebrow">07 · Models</p>
            <h2 className="head">Your own provider account. Connected, not pasted.</h2>
            <p className="body" style={{ color: "var(--fg2)" }}>
              Connect Claude, OpenAI, Mistral or Gemini on your provider's own
              screen. Your key is encrypted and never visible to agents. You
              can revoke access from your provider at any time.
            </p>
            <p className="body" style={{ color: "var(--fg2)" }}>
              The independent verifier runs on a different model family than the
              writers, so connect two. Your first diligence is a capped trial on
              us, so you can read a memo before you connect anything.
            </p>
          </div>
          <div className="g3" style={{ marginTop: "var(--sp-48)" }}>
            {[
              { h: "Economy", b: "Lighter models for lower cost. Estimates, summaries, smaller contexts." },
              { h: "Balanced", b: "The default tier. Strong models at reasonable cost." },
              { h: "Frontier", b: "The most capable models. Best for product, technology and verification." },
            ].map(({ h, b }) => (
              <div key={h} className="card">
                <p className="body" style={{ fontWeight: "var(--fw-semi)", marginBottom: "var(--sp-8)" }}>{h}</p>
                <p className="body" style={{ color: "var(--fg2)" }}>{b}</p>
              </div>
            ))}
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
            Read your first memo today.
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
