import type { Metadata } from "next";
import PlatformPageGolden from "./golden";

export const metadata: Metadata = {
  title: "Platform and plans",
  description:
    "Start free. Sign in with an email code, connect your own model, plan a diligence and read the memo the same day.",
};

export default function PlatformPage() {
  return <PlatformPageGolden />;
}
