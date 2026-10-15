import type { Metadata } from "next";
import MainPage from "./(site)/main-golden";

export const metadata: Metadata = {
  title: "TheDiligence: investment diligence by investor-operators",
  description:
    "Investment diligence, built by investor-operators. Specialist AI agents do the research and show the source of every finding.",
};

export default function HomePage() {
  return <MainPage />;
}
