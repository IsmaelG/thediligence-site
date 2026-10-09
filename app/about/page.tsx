import type { Metadata } from "next";
import AboutPageGolden from "./golden";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Built by operator-investors who have done the work: exits, buy-sides, leadership positions in technology.",
};

export default function AboutPage() {
  return <AboutPageGolden />;
}
