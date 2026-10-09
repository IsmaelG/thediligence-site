import { platformOpen } from "@/lib/flags";

export const metadata = {
  title: "Solutions — TheDiligence",
  description:
    "Three ways to work with us: download the method, run it on the platform, or bring us in for the deal.",
};

export default async function SolutionsPage() {
  const isOpen = await platformOpen();
  const primaryHref = isOpen ? "/app" : "/book";

  return (
    <main id="main-content">
      {/* Hero */}
      <section className="hero sec" style={{ paddingBottom: "var(--sp-64)" }}>
        <div className="wrap" style={{ maxWidth: "var(--head-max)" }}>
          <p className="eyebrow" style={{ marginBottom: "var(--sp-16)" }}>Solutions</p>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h1-page)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h1)", lineHeight: "var(--lh-h1)", marginBottom: "var(--sp-24)" }}>
            Three ways to work with us.
          </h1>
          <p className="lead" style={{ maxWidth: "60ch", marginBottom: "var(--sp-48)" }}>
            Start with the method and run it yourself. Add the platform when you want agents to do the reading. Bring us in when the deal deserves a person.
          </p>

          {/* Which fits you */}
          <div style={{ marginBottom: "var(--sp-64)" }}>
            <p className="eyebrow" style={{ marginBottom: "var(--sp-24)" }}>Which fits you</p>
            <div className="g3">
              {[
                {
                  n: "01",
                  title: "Download",
                  sub: "Method, free",
                  fit: "You run your own process. You want the method, the templates and the evidence rules, and you will run them yourself.",
                  cta: "Get the method",
                  href: "/method",
                  sec: false,
                },
                {
                  n: "02",
                  title: "Platform",
                  sub: "Agents + method, subscription",
                  fit: "You want the memo without the weeks. Agents read, grade and draft. You hold the gates and set the cap.",
                  cta: isOpen ? "Start free" : "Join the waitlist",
                  href: primaryHref,
                  sec: false,
                },
                {
                  n: "03",
                  title: "Hire us",
                  sub: "Operators in the room",
                  fit: "The deal is complex or the timeline is tight. Ismael and Mazen bring the platform and sit in the room with you.",
                  cta: "Book time",
                  href: "/book",
                  sec: true,
                },
              ].map((s) => (
                <div key={s.n} className="card" style={{ display: "flex", flexDirection: "column", gap: "var(--sp-16)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--sp-12)" }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mut)" }}>{s.n}</span>
                    <span style={{ fontFamily: "var(--mono)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--mut)" }}>{s.sub}</span>
                  </div>
                  <h2 style={{ fontFamily: "var(--serif)", fontSize: "24px", fontWeight: "var(--fw-bold)", lineHeight: 1.2, margin: 0 }}>{s.title}</h2>
                  <p className="small" style={{ margin: 0, color: "var(--fg2)", lineHeight: 1.55, flex: 1 }}>{s.fit}</p>
                  <a href={s.href} className={`btn ${s.sec ? "btn-s" : "btn-p"}`} style={{ alignSelf: "flex-start" }}>{s.cta}</a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Where it applies */}
      <section className="sec alt">
        <div className="wrap">
          <div style={{ maxWidth: "var(--head-max)", marginBottom: "var(--head-mb)" }}>
            <p className="eyebrow" style={{ marginBottom: "var(--sp-16)" }}>Where it applies</p>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h2)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h2)", lineHeight: "var(--lh-h2)", marginBottom: "var(--sp-24)" }}>
              One method, five types of decision.
            </h2>
            <p className="lead" style={{ maxWidth: "58ch" }}>
              The route changes, the standard does not. Each section has a verdict, a confidence and a list of what is still missing.
            </p>
          </div>
          <div className="g4">
            {[
              { route: "Investment route", desc: "Seed, growth or late stage. The standard five sections plus a tailored set of additional questions the coordinator drafts from your thesis." },
              { route: "Acquisition route", desc: "A full product, technology and operations pass, plus a 100-day integration plan priced by section." },
              { route: "LP route", desc: "Track record, team, strategy and portfolio quality. The same grade and source standard, applied to a fund." },
              { route: "Hire route", desc: "A senior hire in a function you do not know deeply. Technology, product and digital leadership." },
              { route: "Partner route", desc: "A strategic partnership, a distribution deal or a technology alliance. Dependency, reversibility and concentration risk." },
            ].map((r) => (
              <div key={r.route} className="card">
                <h3 style={{ fontSize: "17px", fontWeight: "var(--fw-semibold)", marginBottom: "var(--sp-10)" }}>{r.route}</h3>
                <p className="small" style={{ margin: 0, color: "var(--fg2)", lineHeight: 1.55 }}>{r.desc}</p>
              </div>
            ))}
            <div className="card" style={{ background: "var(--bg2)" }}>
              <h3 style={{ fontSize: "17px", fontWeight: "var(--fw-semibold)", marginBottom: "var(--sp-10)" }}>Not on the list?</h3>
              <p className="small" style={{ margin: 0, color: "var(--fg2)", lineHeight: 1.55, marginBottom: "var(--sp-16)" }}>Tell us the decision. If it has evidence, we can build a route for it.</p>
              <a href="/book" className="btn btn-s" style={{ fontSize: "13px" }}>Ask</a>
            </div>
          </div>
        </div>
      </section>

      {/* Solution 01 · Download */}
      <section id="download" className="sec">
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--gap-split)", alignItems: "start" }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: "var(--sp-16)" }}>Solution 01 · Download</p>
              <h2 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h2)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h2)", lineHeight: "var(--lh-h2)", marginBottom: "var(--sp-24)" }}>
                The method, in an Obsidian vault.
              </h2>
              <p className="lead" style={{ maxWidth: "44ch", marginBottom: "var(--sp-32)" }}>
                Free and open source under MIT. A vault of templates and evidence rules you can run in Obsidian today, and connect to the platform later.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "var(--sp-16)", marginBottom: "var(--sp-40)" }}>
                {[
                  "Five routes. One template per section, with the evidence rules and the grading criteria built in.",
                  "A grade and a source on every claim, by default. The templates enforce the standard.",
                  "Evidence ledger template. A table you fill as the documents arrive.",
                  "Confidence formula. A worked example in a note, ready to copy.",
                  "No platform required. Run it in Obsidian, export a PDF, share it.",
                ].map((point, i) => (
                  <li key={i} style={{ display: "flex", gap: "var(--sp-12)", alignItems: "flex-start" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--fg)", flexShrink: 0, marginTop: 7 }} />
                    <p className="small" style={{ margin: 0, color: "var(--fg2)", lineHeight: 1.55 }}>{point}</p>
                  </li>
                ))}
              </ul>
              <div style={{ display: "flex", gap: "var(--gap-s)", flexWrap: "wrap" }}>
                <a href="/method" className="btn btn-p">Read the method</a>
                <a href="/method#get" className="btn btn-s">Download the vault</a>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-24)" }}>
              <div style={{ background: "var(--surf)", border: "1px solid var(--line)", borderRadius: "var(--r-card)", padding: "var(--sp-24)" }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mut)", marginBottom: 12 }}>What you get</div>
                {[
                  { name: "TheDiligence method.md", desc: "The full five-stage method, in one readable note." },
                  { name: "Investment route template/", desc: "A folder with one note per section, pre-filled with the evidence rules." },
                  { name: "Evidence ledger.md", desc: "The table of sources, classes and grades." },
                  { name: "Confidence formula.md", desc: "A worked example you can copy to any section." },
                  { name: "Changelog.md", desc: "What changed between versions." },
                ].map((f) => (
                  <div key={f.name} style={{ display: "flex", gap: "var(--sp-12)", padding: "var(--sp-10) 0", borderBottom: "1px solid var(--line2)", alignItems: "flex-start" }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--fg2)", minWidth: 0, wordBreak: "break-all" }}>{f.name}</span>
                    <span style={{ fontSize: 11, color: "var(--mut)", flexShrink: 0, textAlign: "right" }}>{f.desc}</span>
                  </div>
                ))}
              </div>
              <div style={{ padding: "var(--sp-16) var(--sp-20)", background: "var(--bg2)", border: "1px solid var(--line2)", borderRadius: "var(--r-card)" }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mut)", marginBottom: 8 }}>MIT licence</div>
                <p className="small" style={{ margin: 0, color: "var(--fg2)", lineHeight: 1.55 }}>Use it, adapt it, run it in your own tools. The repository is the source of truth. Pull requests welcome.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution 02 · Platform */}
      <section id="platform" className="sec alt">
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--gap-split)", alignItems: "start" }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: "var(--sp-16)" }}>Solution 02 · Platform</p>
              <h2 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h2)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h2)", lineHeight: "var(--lh-h2)", marginBottom: "var(--sp-24)" }}>
                Agents that run the method, at your pace.
              </h2>
              <p className="lead" style={{ maxWidth: "44ch", marginBottom: "var(--sp-32)" }}>
                Connect your provider. Name a company. The coordinator drafts the plan and the price. You hold every gate.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "var(--sp-16)", marginBottom: "var(--sp-40)" }}>
                {[
                  "A plan you have seen. Every run starts with a cost estimate you approved. Set a cap and the run obeys it.",
                  "Specialist agents, isolated. One agent per question, in its own sandbox, with only the evidence it needs.",
                  "A grade and a source on every claim. The memo is auditable because the run is.",
                  "New evidence, narrow rebuild. Drop a file, see what goes stale, approve the delta run.",
                  "Your key stays with your provider. The platform bills at your provider's own rates.",
                ].map((point, i) => (
                  <li key={i} style={{ display: "flex", gap: "var(--sp-12)", alignItems: "flex-start" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--fg)", flexShrink: 0, marginTop: 7 }} />
                    <p className="small" style={{ margin: 0, color: "var(--fg2)", lineHeight: 1.55 }}>{point}</p>
                  </li>
                ))}
              </ul>
              <div style={{ display: "flex", gap: "var(--gap-s)", flexWrap: "wrap" }}>
                <a href={primaryHref} className="btn btn-p">{isOpen ? "Start free" : "Join the waitlist"}</a>
                <a href="/platform" className="btn btn-s">Platform and plans</a>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-20)" }}>
              {[
                { n: "01", title: "Connect a provider", body: "Approve access on your provider's own screen. Claude, OpenAI, Mistral, Gemini. Usage lands in your account." },
                { n: "02", title: "Name a company", body: "The coordinator reads the target, picks the route, and shows you the plan and the price." },
                { n: "03", title: "Review the plan", body: "See the sequence, the agents, the estimated cost, and what each one still needs. Change a tier, update the cap." },
                { n: "04", title: "Run and gate", body: "Agents run in parallel where the method allows. A gate pauses the run. You approve and the rest continues." },
              ].map((step) => (
                <div key={step.n} style={{ display: "flex", gap: "var(--sp-16)", alignItems: "flex-start", padding: "var(--sp-16) var(--sp-20)", background: "var(--bg2)", border: "1px solid var(--line)", borderRadius: "var(--r-card)" }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--fg)", color: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--mono)", fontSize: 11, fontWeight: 600, flexShrink: 0 }}>{step.n}</div>
                  <div>
                    <div style={{ fontWeight: "var(--fw-semibold)", fontSize: 15, marginBottom: "var(--sp-4)" }}>{step.title}</div>
                    <p className="small" style={{ margin: 0, color: "var(--fg2)", lineHeight: 1.5 }}>{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solution 03 · Hire us */}
      <section id="hire" className="sec">
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--gap-split)", alignItems: "start" }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: "var(--sp-16)" }}>Solution 03 · Hire us</p>
              <h2 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h2)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h2)", lineHeight: "var(--lh-h2)", marginBottom: "var(--sp-24)" }}>
                Operators in the room.
              </h2>
              <p className="lead" style={{ maxWidth: "44ch", marginBottom: "var(--sp-32)" }}>
                The deal is complex, the sector is one you do not know deeply, or the IC is on Thursday. We bring the platform and sit in the room with you.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "var(--sp-16)", marginBottom: "var(--sp-40)" }}>
                {[
                  "A full diligence, end to end. We run the platform on your deal and deliver a memo you can take into the room.",
                  "Interview access. We conduct customer, competitor and expert interviews. Each call becomes a graded source.",
                  "A plan and a price before we start. The route, the evidence we need, the cost, and the timeline, in writing.",
                  "IC support on request. We join the committee call and answer questions on the evidence.",
                  "Confidentiality. The deal and the memo stay between us. The platform holds it encrypted in your browser.",
                ].map((point, i) => (
                  <li key={i} style={{ display: "flex", gap: "var(--sp-12)", alignItems: "flex-start" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--fg)", flexShrink: 0, marginTop: 7 }} />
                    <p className="small" style={{ margin: 0, color: "var(--fg2)", lineHeight: 1.55 }}>{point}</p>
                  </li>
                ))}
              </ul>
              <a href="/book" className="btn btn-p">Book time with us</a>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-20)" }}>
              <div className="card" style={{ background: "var(--bg2)" }}>
                <p className="eyebrow" style={{ marginBottom: "var(--sp-12)" }}>Good fit</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "var(--sp-10)" }}>
                  {[
                    "A growth or late-stage deal in digital, platform or marketplace",
                    "A sector where you want an operator's read, not just an analyst's",
                    "IC in under three weeks",
                    "A strategic acquisition where the product and technology matter",
                    "A fund allocation decision — LP diligence, secondary",
                  ].map((point, i) => (
                    <li key={i} style={{ display: "flex", gap: "var(--sp-10)", alignItems: "flex-start" }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--fg)", flexShrink: 0, marginTop: 7 }} />
                      <p className="small" style={{ margin: 0, color: "var(--fg2)", lineHeight: 1.5 }}>{point}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card" style={{ background: "var(--bg2)" }}>
                <p className="eyebrow" style={{ marginBottom: "var(--sp-12)" }}>The team</p>
                <div style={{ display: "flex", gap: "var(--sp-16)", alignItems: "flex-start" }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--fg)", color: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--mono)", fontSize: 12, fontWeight: 600, flexShrink: 0 }}>IG</div>
                  <div>
                    <div style={{ fontWeight: "var(--fw-semibold)", fontSize: 15, marginBottom: "var(--sp-4)" }}>Ismael Ghozael</div>
                    <p className="small" style={{ margin: 0, color: "var(--fg2)" }}>Advisor to funds. Writes the method and builds the platform.</p>
                  </div>
                </div>
                <div style={{ height: "1px", background: "var(--line2)", margin: "var(--sp-16) 0" }} />
                <div style={{ display: "flex", gap: "var(--sp-16)", alignItems: "flex-start" }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--fg)", color: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--mono)", fontSize: 12, fontWeight: 600, flexShrink: 0 }}>MW</div>
                  <div>
                    <div style={{ fontWeight: "var(--fw-semibold)", fontSize: 15, marginBottom: "var(--sp-4)" }}>Mazen Wazni</div>
                    <p className="small" style={{ margin: 0, color: "var(--fg2)" }}>Operator-investor.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="band">
        <div className="wrap" style={{ textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h2)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h2)", lineHeight: "var(--lh-h2)", color: "var(--bg)", marginBottom: "var(--sp-24)" }}>
            Not sure which fits?
          </h2>
          <p style={{ fontSize: "var(--fs-lead)", color: "var(--bg)", opacity: 0.75, marginBottom: "var(--sp-40)", maxWidth: "44ch", marginInline: "auto" }}>
            Tell us about the deal. We will reply with a proposed path and, if useful, a first plan in writing.
          </p>
          <div style={{ display: "flex", gap: "var(--gap-s)", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/book" className="btn btn-p">Book time with us</a>
            <a href={primaryHref} className="btn btn-s">{isOpen ? "Start free" : "Join the waitlist"}</a>
          </div>
        </div>
      </section>
    </main>
  );
}
