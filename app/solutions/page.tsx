import type { Metadata } from "next";
import { SiteShell } from "../components/site-shell";
import { FitPicker } from "./fit-picker";
import {
  SolutionsHero,
  SolutionsTimeline,
  SolutionsDownload,
  SolutionsRun,
  SolutionsHire,
  SolutionsStart,
} from "./sections";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Three ways to run a diligence. Take the method, run it on the platform, or hire the operators who wrote it.",
};

export default function SolutionsPage() {
  return (
    <SiteShell activePage="solutions">
      <SolutionsHero />
      <FitPicker />
      <SolutionsTimeline />
      <SolutionsDownload />
      <SolutionsRun />
      <SolutionsHire />
      <SolutionsStart />
    </SiteShell>
  );
}
