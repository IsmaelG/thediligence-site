import type { Metadata } from "next";
import MethodPageGolden from "./golden";

export const metadata: Metadata = {
  title: "The method",
  description:
    "The method is open. Read it, run it, challenge it. Five stages, one evidence standard, eleven skills.",
};

export default function MethodPage() {
  return <MethodPageGolden />;
}
