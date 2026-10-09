// Scaffold placeholder — replaced by the full homepage in s2-core.
// Demonstrates light and dark token system working correctly.
export default function HomePage() {
  return (
    <main id="main-content">
      <section
        style={{
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "var(--gutter)",
          textAlign: "center",
          gap: "var(--gap-m)",
        }}
      >
        <p className="eyebrow">Coming soon</p>
        <h1
          style={{
            fontFamily: "var(--sans)",
            fontSize: "clamp(48px, 8vw, 108px)",
            fontWeight: "var(--fw-bold)",
            letterSpacing: "var(--ls-h1)",
            lineHeight: "var(--lh-h1)",
            color: "var(--fg)",
            maxWidth: "12ch",
          }}
        >
          Diligence.
        </h1>
        <p
          className="lead"
          style={{
            maxWidth: "var(--measure-hero)",
            marginInline: "auto",
          }}
        >
          Built by operator-investors, <em>for operator-investors.</em>
        </p>

        <div style={{ display: "flex", gap: "var(--gap-s)", flexWrap: "wrap", justifyContent: "center" }}>
          <a href="/platform" className="btn btn-p">
            Start free
          </a>
          <a href="/contact" className="btn btn-s">
            Book time with us
          </a>
        </div>

        <p className="small" style={{ marginTop: "var(--sp-16)" }}>
          Free plan: one diligence a week.
        </p>
      </section>

      {/* Token system smoke test — visible only in development */}
      {process.env.NODE_ENV === "development" && (
        <section
          className="sec"
          style={{ borderTop: "1px solid var(--line)" }}
          aria-hidden="true"
        >
          <div className="wrap">
            <p className="eyebrow" style={{ marginBottom: "var(--sp-24)" }}>
              Token system
            </p>
            <div style={{ display: "flex", gap: "var(--sp-8)", flexWrap: "wrap" }}>
              <span className="status st-live">At launch</span>
              <span className="status st-build">Next</span>
              <span className="status st-plan">Later</span>
            </div>
            <div
              style={{
                marginTop: "var(--sp-24)",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                gap: "var(--sp-8)",
              }}
            >
              {[
                ["--bg", "bg"],
                ["--bg2", "bg2"],
                ["--surf", "surf"],
                ["--blue", "blue"],
                ["--orange", "orange"],
                ["--green", "green"],
              ].map(([token, label]) => (
                <div
                  key={token}
                  style={{
                    background: `var(${token})`,
                    border: "1px solid var(--line)",
                    borderRadius: "var(--r-8)",
                    padding: "var(--sp-12)",
                    fontSize: "var(--fs-tiny)",
                    fontFamily: "var(--mono)",
                    color: "var(--fg)",
                  }}
                >
                  {label}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
