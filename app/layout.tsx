import type { Metadata } from "next";
import { Newsreader, Overpass, Overpass_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "./components/site-header";
import { SiteFooter } from "./components/site-footer";
import { CookieBanner } from "./components/cookie-banner";

const overpass = Overpass({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  display: "swap",
  variable: "--font-overpass",
});

const overpassMono = Overpass_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-overpass-mono",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-newsreader",
});

const title = "TheDiligence";
const description =
  "Diligence built by operator-investors, for operator-investors. Evidence-graded analysis for every deal.";

export const metadata: Metadata = {
  title: {
    default: title,
    template: "%s | TheDiligence",
  },
  description,
  openGraph: {
    title,
    description,
    type: "website",
    siteName: title,
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
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
    <html
      lang="en"
      style={
        {
          "--font-overpass": overpass.style.fontFamily,
          "--font-overpass-mono": overpassMono.style.fontFamily,
          "--font-newsreader": newsreader.style.fontFamily,
          // Point token vars at the loaded fonts
          "--sans": "var(--font-overpass), system-ui, -apple-system, sans-serif",
          "--mono": "var(--font-overpass-mono), ui-monospace, Menlo, monospace",
          "--serif": "var(--font-newsreader), Georgia, 'Times New Roman', serif",
        } as React.CSSProperties
      }
    >
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <CookieBanner />
      </body>
    </html>
  );
}
