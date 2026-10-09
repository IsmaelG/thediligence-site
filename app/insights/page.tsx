import type { Metadata } from "next";
import InsightsPageGolden from "./golden";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Notes on diligence, evidence standards, and how we build the method.",
};

export default function InsightsPage() {
  return <InsightsPageGolden />;
}
