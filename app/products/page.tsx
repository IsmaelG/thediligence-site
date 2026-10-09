import type { Metadata } from "next";
import ProductsPageGolden from "./golden";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Skilled agents orchestrated for evidence. Market diligence, company diligence, product diligence and more.",
};

export default function ProductsPage() {
  return <ProductsPageGolden />;
}
