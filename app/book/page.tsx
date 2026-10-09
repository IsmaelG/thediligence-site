import { formsLive } from "@/lib/flags";

export const metadata = {
  title: "Book time — TheDiligence",
  description:
    "Tell us about the deal. We will take it from there. Ismael and Mazen read every message.",
};

export default async function BookPage() {
  const isFormsLive = await formsLive();

  return (
    <main id="main-content">
      <section className="sec">
        <div className="wrap" style={{ maxWidth: "var(--wrap-n)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--gap-split)", alignItems: "start" }}>
          {/* Left: form */}
          <div>
            <p className="eyebrow" style={{ marginBottom: "var(--sp-16)" }}>Book time</p>
            <h1 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h1-page)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h1)", lineHeight: "var(--lh-h1)", marginBottom: "var(--sp-24)" }}>
              Tell us about the deal. We will take it from there.
            </h1>
            <p className="lead" style={{ maxWidth: "48ch", marginBottom: "var(--sp-48)" }}>
              Ismael and Mazen read every message. Say what you are looking at and when you need it, and we reply with a proposed time and, if useful, a first plan in writing.
            </p>

            {isFormsLive ? (
              <form action="/api/forms/engagement" method="POST" style={{ display: "flex", flexDirection: "column", gap: "var(--sp-20)" }}>
                <div>
                  <label htmlFor="name" style={{ display: "block", fontSize: "var(--fs-small)", fontWeight: "var(--fw-semibold)", marginBottom: "var(--sp-6)", color: "var(--fg2)" }}>Your name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    style={{ width: "100%", padding: "var(--sp-12) var(--sp-16)", background: "var(--surf)", border: "var(--bw-ctrl) solid var(--line-ui)", borderRadius: "var(--r-ctrl)", fontFamily: "var(--sans)", fontSize: "var(--fs-body)", color: "var(--fg)" }}
                  />
                </div>
                <div>
                  <label htmlFor="email" style={{ display: "block", fontSize: "var(--fs-small)", fontWeight: "var(--fw-semibold)", marginBottom: "var(--sp-6)", color: "var(--fg2)" }}>Work email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    style={{ width: "100%", padding: "var(--sp-12) var(--sp-16)", background: "var(--surf)", border: "var(--bw-ctrl) solid var(--line-ui)", borderRadius: "var(--r-ctrl)", fontFamily: "var(--sans)", fontSize: "var(--fs-body)", color: "var(--fg)" }}
                  />
                </div>
                <div>
                  <label htmlFor="fund" style={{ display: "block", fontSize: "var(--fs-small)", fontWeight: "var(--fw-semibold)", marginBottom: "var(--sp-6)", color: "var(--fg2)" }}>Fund or company</label>
                  <input
                    id="fund"
                    name="fund"
                    type="text"
                    autoComplete="organization"
                    style={{ width: "100%", padding: "var(--sp-12) var(--sp-16)", background: "var(--surf)", border: "var(--bw-ctrl) solid var(--line-ui)", borderRadius: "var(--r-ctrl)", fontFamily: "var(--sans)", fontSize: "var(--fs-body)", color: "var(--fg)" }}
                  />
                </div>
                <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
                  <legend style={{ display: "block", fontSize: "var(--fs-small)", fontWeight: "var(--fw-semibold)", marginBottom: "var(--sp-12)", color: "var(--fg2)" }}>What are you looking at?</legend>
                  <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-10)" }}>
                    {[
                      { value: "run-memo", label: "Run a memo on a deal" },
                      { value: "setup-platform", label: "Set up the platform for my fund" },
                      { value: "security-review", label: "A security review" },
                      { value: "something-else", label: "Something else" },
                    ].map(({ value, label }) => (
                      <label key={value} style={{ display: "flex", alignItems: "center", gap: "var(--sp-10)", cursor: "pointer" }}>
                        <input type="radio" name="intent" value={value} style={{ width: 16, height: 16, accentColor: "var(--fg)", flexShrink: 0 }} />
                        <span style={{ fontSize: "var(--fs-body)", color: "var(--fg2)" }}>{label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <div>
                  <label htmlFor="message" style={{ display: "block", fontSize: "var(--fs-small)", fontWeight: "var(--fw-semibold)", marginBottom: "var(--sp-6)", color: "var(--fg2)" }}>Anything we should know first</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    style={{ width: "100%", padding: "var(--sp-12) var(--sp-16)", background: "var(--surf)", border: "var(--bw-ctrl) solid var(--line-ui)", borderRadius: "var(--r-ctrl)", fontFamily: "var(--sans)", fontSize: "var(--fs-body)", color: "var(--fg)", resize: "vertical" }}
                  />
                </div>
                <button type="submit" className="btn btn-p" style={{ alignSelf: "flex-start" }}>Send</button>
              </form>
            ) : (
              <div>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-20)", opacity: 0.5, pointerEvents: "none", userSelect: "none" }}>
                  {/* Static preview of form fields */}
                  {["Your name", "Work email", "Fund or company"].map((label) => (
                    <div key={label}>
                      <div style={{ fontSize: "var(--fs-small)", fontWeight: "var(--fw-semibold)", marginBottom: "var(--sp-6)", color: "var(--fg2)" }}>{label}</div>
                      <div style={{ width: "100%", padding: "var(--sp-12) var(--sp-16)", background: "var(--surf)", border: "var(--bw-ctrl) solid var(--line-ui)", borderRadius: "var(--r-ctrl)", fontSize: "var(--fs-body)", color: "transparent", userSelect: "none" }}>–</div>
                    </div>
                  ))}
                  <div>
                    <div style={{ fontSize: "var(--fs-small)", fontWeight: "var(--fw-semibold)", marginBottom: "var(--sp-12)", color: "var(--fg2)" }}>What are you looking at?</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-10)" }}>
                      {["Run a memo on a deal", "Set up the platform for my fund", "A security review", "Something else"].map((label) => (
                        <label key={label} style={{ display: "flex", alignItems: "center", gap: "var(--sp-10)" }}>
                          <span style={{ width: 16, height: 16, border: "1.5px solid var(--line-ui)", borderRadius: "50%", flexShrink: 0 }} />
                          <span style={{ fontSize: "var(--fs-body)", color: "var(--fg2)" }}>{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: "var(--sp-32)", padding: "var(--sp-20) var(--sp-24)", background: "var(--bg2)", border: "1px solid var(--line)", borderRadius: "var(--r-card)" }}>
                  <p className="small" style={{ margin: 0, marginBottom: "var(--sp-16)" }}>
                    This form is not connected yet. Until it is, write to us on LinkedIn.
                  </p>
                  <div style={{ display: "flex", gap: "var(--gap-s)" }}>
                    <a href="https://linkedin.com/in/ismaelghozael" target="_blank" rel="noopener noreferrer" className="btn btn-p" style={{ fontSize: "14px" }}>Message Ismael</a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="btn btn-s" style={{ fontSize: "14px" }}>Message Mazen</a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: what happens next */}
          <div style={{ paddingTop: "var(--sp-80)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-40)", marginBottom: "var(--sp-64)" }}>
              <p className="eyebrow">What happens next</p>
              {[
                { n: "1", title: "We read it, both of us", body: "You get a person, not a form letter." },
                { n: "2", title: "A reply within one business day", body: "A few times that work, and the questions we need answered first." },
                { n: "3", title: "A call, then a plan in writing", body: "The route, the interviews, the evidence we need, and the cost, before we start." },
              ].map((step) => (
                <div key={step.n} style={{ display: "flex", gap: "var(--sp-20)", alignItems: "flex-start" }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--bg2)", border: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--mono)", fontSize: 13, fontWeight: 600, color: "var(--mut)", flexShrink: 0 }}>{step.n}</div>
                  <div>
                    <div style={{ fontWeight: "var(--fw-semibold)", fontSize: 17, marginBottom: "var(--sp-6)" }}>{step.title}</div>
                    <p className="small" style={{ margin: 0, color: "var(--fg2)" }}>{step.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="card" style={{ background: "var(--bg2)", borderColor: "var(--line2)" }}>
              <p className="eyebrow" style={{ marginBottom: "var(--sp-12)" }}>Security review?</p>
              <p className="small" style={{ marginBottom: "var(--sp-16)", color: "var(--fg2)", lineHeight: 1.55 }}>
                Say so in your message. We answer your questionnaire in writing, before the first call.
              </p>
              <a href="/security" className="btn btn-s" style={{ fontSize: "13px" }}>Read the security page</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
