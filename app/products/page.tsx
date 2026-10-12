import type { Metadata } from "next";
import { SiteShell } from "../components/site-shell";
import { PlanTabs } from "./plan-tabs";
import { MemoTabs } from "./memo-tabs";
import {
  ProductsHero,
  ProductsRun,
  ProductsEvidence,
  ProductsVault,
  ProductsWorkflow,
  ProductsModels,
} from "./sections";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Skilled agents orchestrated for evidence. Market diligence, company diligence, product diligence and more.",
};

export default function ProductsPage() {
  return (
    <SiteShell activePage="products">
      <ProductsHero />
      <PlanTabs />
      <ProductsRun />
      <MemoTabs />
      <ProductsEvidence />
      <ProductsVault />
      <ProductsWorkflow />
      <ProductsModels />
    </SiteShell>
  );
}
