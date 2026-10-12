import type { Metadata } from "next";
import { SiteShell } from "../components/site-shell";
import { PlatformOnboarding } from "./platform-onboarding";
import {
  PlatformHero,
  PlatformConnectors,
  PlatformPlans,
  PlatformCompare,
  PlatformRoadmap,
  PlatformFaq,
} from "./sections";

export const metadata: Metadata = {
  title: "Platform and plans",
  description:
    "Start free. Sign in with an email code, connect your own model, plan a diligence and read the memo the same day.",
};

export default function PlatformPage() {
  return (
    <SiteShell activePage="platform">
      <PlatformHero />
      <PlatformOnboarding />
      <PlatformConnectors />
      <PlatformPlans />
      <PlatformCompare />
      <PlatformRoadmap />
      <PlatformFaq />
    </SiteShell>
  );
}
