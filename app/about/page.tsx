import { logosVisible } from "@/lib/flags";

export const metadata = {
  title: "About — TheDiligence",
  description:
    "Built by operator-investors, for operator-investors. 40 years combined on hyperscale platforms.",
};

const STATS = [
  { n: "40", unit: "years combined", desc: "Operating on hyperscale platforms: PayPal, Amazon, Safran, Decathlon and more." },
  { n: "4", unit: "continents", desc: "North America, Europe, Africa and the Middle East." },
  { n: "2", unit: "cities", desc: "Where we are based." },
  { n: "5", unit: "stages", desc: "From the market to the first 100 days, in one method." },
];

const PRINCIPLES = [
  {
    title: "Evidence before opinion",
    body: "No source, no claim. Estimates are allowed, and they say so.",
  },
  {
    title: "Open by default",
    body: "The method is open source and stays free. You can read it, run it and change it.",
  },
  {
    title: "You stay in charge",
    body: "Agents draft. Gates pause the work. Nothing leaves without a person.",
  },
  {
    title: "Operators in the room",
    body: "We have operated at scale. We say what we do not know.",
  },
];

export default async function AboutPage() {
  const showLogos = await logosVisible();

  return (
    <main id="main-content">
      {/* Hero */}
      <section className="hero sec" style={{ paddingBottom: "var(--sp-64)" }}>
        <div className="wrap" style={{ maxWidth: "var(--head-max)" }}>
          <p className="eyebrow" style={{ marginBottom: "var(--sp-16)" }}>About us</p>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h1-page)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h1)", lineHeight: "var(--lh-h1)", marginBottom: "var(--sp-24)" }}>
            Built by operator-investors, for operator-investors.
          </h1>
          <p className="lead" style={{ maxWidth: "60ch", marginBottom: "var(--sp-40)" }}>
            We have built and run products and platforms at scale, and we now invest and advise. TheDiligence is how we do our own diligences, written down and opened up, so that you can run them too.
          </p>
          <div style={{ display: "flex", gap: "var(--gap-s)" }}>
            <a href="/book" className="btn btn-p">Book time with us</a>
            <a href="/solutions" className="btn btn-s">How we work</a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="sec alt">
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--gap-grid)" }}>
            {STATS.map((stat) => (
              <div key={stat.n} style={{ display: "flex", flexDirection: "column", gap: "var(--sp-8)" }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: "var(--fs-num)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-num)", color: "var(--fg)", lineHeight: 1 }}>{stat.n}</span>
                <span style={{ fontFamily: "var(--mono)", fontSize: "var(--fs-small)", fontWeight: "var(--fw-semibold)", color: "var(--mut)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{stat.unit}</span>
                <p className="small" style={{ margin: 0, color: "var(--fg2)", lineHeight: 1.55 }}>{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why we built it */}
      <section className="sec">
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--gap-split)", alignItems: "start" }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: "var(--sp-16)" }}>Why we built it</p>
              <h2 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h2)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h2)", lineHeight: "var(--lh-h2)", marginBottom: "var(--sp-24)" }}>
                A diligence is only as good as its worst claim.
              </h2>
              <p className="body" style={{ maxWidth: "52ch", marginBottom: "var(--sp-20)" }}>
                Good diligence is slow, and the reasoning behind it rarely survives the memo. A number appears with no source. A comfortable story goes unchallenged because nobody can see where it came from.
              </p>
              <p className="body" style={{ maxWidth: "52ch", marginBottom: "var(--sp-20)" }}>
                We wanted a memo where every claim shows its source and its grade, so that a committee can argue with the evidence and not with the author. So we wrote our method down, made it open, and built a platform that runs it with skilled agents and an independent verifier.
              </p>
              <p className="body" style={{ maxWidth: "52ch" }}>
                The platform does the reading and the arithmetic. The judgement stays with people: you hold the gates, and when a deal deserves it, we sit in the room with you.
              </p>
            </div>
            <div />
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="sec alt">
        <div className="wrap">
          <div style={{ maxWidth: "var(--head-max)", marginBottom: "var(--head-mb)" }}>
            <p className="eyebrow" style={{ marginBottom: "var(--sp-16)" }}>What we hold to</p>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h2)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h2)", lineHeight: "var(--lh-h2)" }}>
              Four principles, no exceptions.
            </h2>
          </div>
          <div className="g4">
            {PRINCIPLES.map((p, i) => (
              <div key={p.title} className="card">
                <span style={{ fontFamily: "var(--mono)", fontSize: "var(--fs-tiny)", color: "var(--mut)", letterSpacing: "0.1em", marginBottom: "var(--sp-12)", display: "block" }}>0{i + 1}</span>
                <h3 style={{ fontSize: "17px", fontWeight: "var(--fw-semibold)", marginBottom: "var(--sp-10)" }}>{p.title}</h3>
                <p className="small" style={{ margin: 0, color: "var(--fg2)", lineHeight: 1.55 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="sec">
        <div className="wrap">
          <div style={{ maxWidth: "var(--head-max)", marginBottom: "var(--head-mb)" }}>
            <p className="eyebrow" style={{ marginBottom: "var(--sp-16)" }}>The team</p>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h2)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h2)", lineHeight: "var(--lh-h2)", marginBottom: "var(--sp-24)" }}>
              Two operator-investors.
            </h2>
            <p className="lead" style={{ maxWidth: "56ch" }}>
              Between us, 40 years on hyperscale platforms, on four continents. We invest, we advise funds, and we build the tools we wish we had in the room.
            </p>
          </div>

          <div className="g2">
            {[
              {
                initials: "IG",
                name: "Ismael Ghozael",
                role: "Operator-investor",
                desc: "Advisor to funds. Writes the method and builds the platform.",
                linkedin: "https://linkedin.com/in/ismaelghozael",
              },
              {
                initials: "MW",
                name: "Mazen Wazni",
                role: "Operator-investor",
                desc: "Operator-investor.",
                linkedin: "https://linkedin.com",
              },
            ].map((person) => (
              <div key={person.name} className="card" style={{ display: "flex", flexDirection: "column", gap: "var(--sp-20)" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "var(--sp-16)" }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--fg)", color: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--mono)", fontSize: 16, fontWeight: 600, flexShrink: 0 }}>{person.initials}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: "var(--fw-bold)", fontSize: 18, marginBottom: "var(--sp-4)" }}>{person.name}</div>
                    <div className="small" style={{ color: "var(--mut)", marginBottom: "var(--sp-10)" }}>{person.role}</div>
                    <p className="small" style={{ margin: 0, color: "var(--fg2)", lineHeight: 1.55 }}>{person.desc}</p>
                  </div>
                </div>
                <div>
                  <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-s" style={{ fontSize: "13px" }}>LinkedIn</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logos (flag-gated) */}
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

      {/* CTA band */}
      <section className="band">
        <div className="wrap" style={{ textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "var(--fs-h2)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-h2)", lineHeight: "var(--lh-h2)", color: "var(--bg)", marginBottom: "var(--sp-24)" }}>
            Let us look at your next deal together.
          </h2>
          <div style={{ display: "flex", gap: "var(--gap-s)", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/book" className="btn btn-p">Book time with us</a>
            <a href="/solutions" className="btn btn-s">How we work</a>
          </div>
        </div>
      </section>
    </main>
  );
}
