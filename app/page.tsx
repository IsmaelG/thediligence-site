import type { Metadata } from "next";
import WipPage from "./(site)/wip";

export const metadata: Metadata = {
  title: "TheDiligence: investment diligence by investor-operators",
  description:
    "Investment diligence, built by investor-operators. Specialist AI agents do the research and show the source of every finding.",
};

export default function HomePage() {
  return <WipPage />;
}
