import type { Metadata } from "next";
import MainPageGolden from "./golden";

export const metadata: Metadata = {
  title: "TheDiligence — Diligence built by operator-investors",
  description:
    "Built by operator-investors, for operator-investors. Evidence-graded analysis for every deal.",
};

export default function HomePage() {
  return <MainPageGolden />;
}
