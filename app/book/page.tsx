import type { Metadata } from "next";
import BookPageGolden from "./golden";

export const metadata: Metadata = {
  title: "Book time with us",
  description:
    "Book a fixed-price diligence sprint with the operators who built the method.",
};

export default function BookPage() {
  return <BookPageGolden />;
}
