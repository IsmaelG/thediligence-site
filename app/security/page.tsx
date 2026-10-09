import type { Metadata } from "next";
import SecurityPageGolden from "./golden";

export const metadata: Metadata = {
  title: "Security and compliance",
  description:
    "Your key, your model, your data. How TheDiligence keeps your work private and your credentials yours.",
};

export default function SecurityPage() {
  return <SecurityPageGolden />;
}
