import type { Metadata } from "next";
import TeamPage from "./team-golden";

export const metadata: Metadata = {
  title: "Team · TheDiligence",
  description:
    "Two investor-operators who run diligence with you and review every finding before your committee sees it.",
};

export default function TeamRoute() {
  return <TeamPage />;
}
