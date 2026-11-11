// WIP site (decided 2026-11-11): the landing's first screen only, with one call to action
// (contact us by email), until the MVP and pricing are finished. The full V1 site is
// main-golden.tsx, left untouched; it is kept on the git branch `v1-site`. To bring it back, point
// app/page.tsx at main-golden.tsx again and remove the WIP redirect in next.config.ts.
import { links } from "@/lib/links";

export default function WipPage() {
  return (
    <div data-page="Main" style={{ fontFamily: "Overpass, system-ui, -apple-system, \"Segoe UI\", sans-serif", color: "rgb(20, 22, 26)", background: "rgb(15, 18, 22)" }}>
      <div className="hero dark" style={{ position: "relative", height: "100vh", minHeight: "760px", overflow: "hidden", background: "rgb(15, 18, 22)", color: "rgb(236, 234, 228)" }}>
        <div style={{ position: "absolute", inset: "0px", filter: "brightness(0.9) contrast(1.05)" }}>
          <div className="layer">
            <img src="/images/hero-paris.jpg" alt="Aerial view down the Champ de Mars to the Eiffel Tower, Paris" style={{ objectPosition: "50% 55%" }} />
          </div>
          <div className="layer london" style={{ animationDuration: "16s" }}>
            <img src="/images/hero-london.jpg" alt="The Thames running through Tower Bridge, with the Shard and the City of London" style={{ objectPosition: "50% 58%" }} />
          </div>
        </div>
        <div aria-hidden="true" style={{ position: "absolute", inset: "0px", pointerEvents: "none", background: "linear-gradient(rgba(15, 18, 22, 0.72) 0%, rgba(15, 18, 22, 0) 20%), linear-gradient(90deg, rgba(15, 18, 22, 0.86) 0%, rgba(15, 18, 22, 0.52) 50%, rgba(15, 18, 22, 0) 78%), linear-gradient(0deg, rgba(15, 18, 22, 0.85) 0%, rgba(15, 18, 22, 0) 46%)" }} />
        <header className="bar" style={{ position: "absolute", top: "0px", left: "0px", right: "0px", zIndex: "3", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px", flexWrap: "wrap", padding: "28px 56px" }}>
          <a href="/" className="serif" style={{ fontSize: "26px", textDecoration: "none" }}>
            {"TheDiligence"}
          </a>
        </header>
        <main className="hcopy" style={{ position: "absolute", left: "80px", bottom: "84px", zIndex: "2", maxWidth: "900px", display: "flex", flexDirection: "column", gap: "20px" }}>
          <p className="mono" style={{ margin: "0px", fontSize: "13px", color: "rgb(201, 204, 209)" }}>
            {"Paris · London"}
          </p>
          <h1 className="h1 serif" style={{ margin: "0px", fontSize: "76px", lineHeight: "1.02", letterSpacing: "-0.02em" }}>
            {"Investment diligence,"}
            <br />
            {"built by "}
            <span style={{ whiteSpace: "nowrap" }}>
              {"investor-operators."}
            </span>
          </h1>
          <p style={{ margin: "0px", fontSize: "22px", lineHeight: "1.45", color: "rgb(236, 234, 228)", maxWidth: "44ch" }}>
            {"From the market to the first 100 days. Specialist AI agents do the research and show the source of every finding. Two investor-operators from PayPal and Amazon wrote the method, and can run it with you."}
          </p>
          <div style={{ display: "flex", gap: "18px", flexWrap: "wrap", alignItems: "center", paddingTop: "10px" }}>
            <a href={links.CONTACT} className="btn b-light">
              {"Contact us"}
            </a>
            <span className="mono" style={{ fontSize: "13px", color: "rgb(201, 204, 209)", textTransform: "none" }}>
              {links.CONTACT_EMAIL}
            </span>
          </div>
        </main>
        <div className="cities mono" style={{ position: "absolute", right: "56px", bottom: "44px", zIndex: "2", display: "flex", gap: "28px", fontSize: "13px", color: "rgb(236, 234, 228)" }}>
          <span className="lab-p" style={{ animationDuration: "16s" }}>
            {"Paris · 48.8584° N"}
          </span>
          <span className="lab-l" style={{ animationDuration: "16s" }}>
            {"London · 51.5055° N"}
          </span>
        </div>
      </div>
    </div>
  );
}
