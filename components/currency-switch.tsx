"use client";

// Currency switch for the Ways section (CONFORMITY §5).
// Server renders € (euro). After hydration, auto-switches to £ when
// navigator.language is "en-GB". User can toggle at any time.

import { useEffect, useState } from "react";
import { links } from "@/lib/links";

type Currency = "eur" | "gbp";

const PRESSED: React.CSSProperties = {
  minHeight: "44px",
  padding: "0px 18px",
  borderRadius: "999px",
  border: "1px solid rgb(20, 22, 26)",
  background: "rgb(20, 22, 26)",
  color: "rgb(245, 243, 238)",
  fontSize: "15px",
  fontWeight: "600",
};
const UNPRESSED: React.CSSProperties = {
  minHeight: "44px",
  padding: "0px 18px",
  borderRadius: "999px",
  border: "1px solid rgb(20, 22, 26)",
  background: "transparent",
  color: "rgb(20, 22, 26)",
  fontSize: "15px",
  fontWeight: "600",
};

export default function WaysSection() {
  const [currency, setCurrency] = useState<Currency>("eur");

  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.language === "en-GB") {
      setCurrency("gbp");
    }
  }, []);

  const platformPrice =
    currency === "eur"
      ? "Free, then from €149 a month"
      : "Free, then from £149 a month";

  const hirePrice =
    currency === "eur"
      ? "From €2,500 per deal"
      : "From £2,500 per deal";

  return (
    <section id="ways" className="sec" style={{ padding: "120px 56px" }}>
      <div style={{ maxWidth: "1200px", margin: "0px auto", display: "flex", flexDirection: "column", gap: "56px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "18px", maxWidth: "1000px" }}>
          <p className="mono" style={{ margin: "0px", fontSize: "20px", color: "rgb(90, 96, 106)" }}>
            {"Three ways to work with us"}
          </p>
          <h2 className="h2 serif" style={{ margin: "0px", fontSize: "56px", lineHeight: "1.05", letterSpacing: "-0.01em" }}>
            {"Use it on your own, "}
            <em>
              {"or with us alongside."}
            </em>
          </h2>
          <p style={{ margin: "0px", fontSize: "19px", lineHeight: "1.55", color: "rgb(58, 63, 71)" }}>
            {"Follow our method on your own, run it on our platform, or bring us in. Every route ends with the same memo, so you can move up whenever a deal needs it."}
          </p>
          <div role="group" aria-label="Show prices in" style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
            <p className="mono" style={{ margin: "0px 6px 0px 0px", fontSize: "12px", color: "rgb(90, 96, 106)" }}>
              {"Prices in"}
            </p>
            <button
              type="button"
              className="seat"
              aria-pressed={currency === "eur"}
              style={currency === "eur" ? PRESSED : UNPRESSED}
              onClick={() => setCurrency("eur")}
            >
              {"€ Euro"}
            </button>
            <button
              type="button"
              className="seat"
              aria-pressed={currency === "gbp"}
              style={currency === "gbp" ? PRESSED : UNPRESSED}
              onClick={() => setCurrency("gbp")}
            >
              {"£ Pound"}
            </button>
          </div>
        </div>
        <div className="g3" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0px, 1fr))", gap: "24px", alignItems: "stretch" }}>
          <div style={{ background: "rgb(236, 233, 226)", border: "1px solid rgb(217, 213, 204)", borderRadius: "16px", padding: "36px 32px", display: "flex", flexDirection: "column", gap: "18px" }}>
            <p className="mono" style={{ margin: "0px", fontSize: "12px", color: "rgb(90, 96, 106)" }}>
              {"01 · On your own"}
            </p>
            <h3 className="serif" style={{ margin: "0px", fontSize: "36px", lineHeight: "1.1" }}>
              {"The method"}
            </h3>
            <p style={{ margin: "0px", fontSize: "18px", fontWeight: "600" }}>
              {"Free"}
            </p>
            <p style={{ margin: "0px", fontSize: "17px", lineHeight: "1.55", color: "rgb(58, 63, 71)" }}>
              {"Our full method, written down step by step. Run it in your own AI assistant, such as Claude, and keep it as yours."}
            </p>
            <ul style={{ margin: "0px", padding: "0px 0px 0px 18px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "16px", lineHeight: "1.5", color: "rgb(58, 63, 71)" }}>
              <li>
                {"Every step and every rule, in plain documents"}
              </li>
              <li>
                {"No account and nothing to pay"}
              </li>
            </ul>
            <p style={{ margin: "0px", fontSize: "15px", color: "rgb(90, 96, 106)", flexGrow: "1" }}>
              {"For anyone who wants to learn it or do it all themselves."}
            </p>
            <a href={links.REPO_URL} className="btn b-line" style={{ alignSelf: "flex-start" }}>
              {"Get the method"}
            </a>
          </div>
          <div style={{ background: "rgb(255, 255, 255)", border: "1px solid rgb(20, 22, 26)", borderRadius: "16px", padding: "36px 32px", display: "flex", flexDirection: "column", gap: "18px" }}>
            <p className="mono" style={{ margin: "0px", fontSize: "12px", color: "rgb(90, 96, 106)" }}>
              {"02 · On our platform"}
            </p>
            <h3 className="serif" style={{ margin: "0px", fontSize: "36px", lineHeight: "1.1" }}>
              {"The platform"}
            </h3>
            <p style={{ margin: "0px", fontSize: "18px", fontWeight: "600" }}>
              {platformPrice}
            </p>
            <p style={{ margin: "0px", fontSize: "17px", lineHeight: "1.55", color: "rgb(58, 63, 71)" }}>
              {"The method with everything set up for you. Agents work in parallel, a second AI checks their work, and your memo updates itself when new data arrives."}
            </p>
            <ul style={{ margin: "0px", padding: "0px 0px 0px 18px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "16px", lineHeight: "1.5", color: "rgb(58, 63, 71)" }}>
              <li>
                {"One diligence a week on the free plan"}
              </li>
              <li>
                {"Your team approves each key step"}
              </li>
            </ul>
            <p style={{ margin: "0px", fontSize: "15px", color: "rgb(90, 96, 106)", flexGrow: "1" }}>
              {"For teams that look at deals often."}
            </p>
            <a href={links.START_FREE} className="btn b-ink" style={{ alignSelf: "flex-start" }}>
              {"Start free"}
            </a>
          </div>
          <div className="dark" style={{ background: "rgb(20, 22, 26)", color: "rgb(245, 243, 238)", borderRadius: "16px", padding: "36px 32px", display: "flex", flexDirection: "column", gap: "18px" }}>
            <p className="mono" style={{ margin: "0px", fontSize: "12px", color: "rgb(201, 204, 209)" }}>
              {"03 · With us"}
            </p>
            <h3 className="serif" style={{ margin: "0px", fontSize: "36px", lineHeight: "1.1" }}>
              {"Hire us"}
            </h3>
            <p style={{ margin: "0px", fontSize: "18px", fontWeight: "600" }}>
              {hirePrice}
            </p>
            <p style={{ margin: "0px", fontSize: "17px", lineHeight: "1.55", color: "rgb(218, 216, 210)" }}>
              {"We run the diligence with you and review every finding before your committee sees it."}
            </p>
            <ul style={{ margin: "0px", padding: "0px 0px 0px 18px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "16px", lineHeight: "1.5", color: "rgb(218, 216, 210)" }}>
              <li>
                {"A screen in about a week"}
              </li>
              <li>
                {"A full diligence in two to three weeks"}
              </li>
              <li>
                {"Interviews with customers, including those who left"}
              </li>
              <li>
                {"A 100-day plan after the deal"}
              </li>
            </ul>
            <p style={{ margin: "0px", fontSize: "15px", color: "rgb(201, 204, 209)", flexGrow: "1" }}>
              {"For funds and corporates with a live deal."}
            </p>
            <a href={links.CAL_URL} className="btn b-light" style={{ alignSelf: "flex-start" }}>
              {"Book time with us"}
            </a>
          </div>
        </div>
        <p style={{ margin: "0px", fontSize: "18px", lineHeight: "1.55", color: "rgb(20, 22, 26)" }}>
          <strong>
            {"Not sure where to start?"}
          </strong>
          {" Start free, and talk to us when a deal needs more depth. We will suggest the right level for it."}
        </p>
        <p style={{ margin: "0px", fontSize: "15px", color: "rgb(90, 96, 106)" }}>
          {"Prices exclude VAT. On the platform, your AI provider bills its usage to you directly, and you see the estimate before anything runs. For work with us, we agree a fixed price before we start."}
        </p>
      </div>
    </section>
  );
}
