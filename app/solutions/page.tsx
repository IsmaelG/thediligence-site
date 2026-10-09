import type { Metadata } from "next";
import SolutionsPageGolden from "./golden";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Three ways to run a diligence. Take the method, run it on the platform, or hire the operators who wrote it.",
};

export default function SolutionsPage() {
  return <SolutionsPageGolden />;
}
