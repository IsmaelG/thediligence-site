import type { Metadata } from "next";
import "./spec.css";

export const metadata: Metadata = {
  title: {
    default: "TheDiligence: investment diligence by investor-operators",
    template: "%s · TheDiligence",
  },
  description:
    "Investment diligence, built by investor-operators. Specialist AI agents do the research and show the source of every finding.",
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000",
  ),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
