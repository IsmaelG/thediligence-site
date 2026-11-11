import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const withMDX = createMDX({});

const nextConfig: NextConfig = {
  // Enable .mdx page extensions for Insights and Changelog
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],

  // Build-time redirects — v3 routes → V5 equivalents (SPEC S1)
  async redirects() {
    return [
      // WIP site (2026-11-11): every route except the landing and its assets goes to `/`,
      // temporarily (307), until the MVP and pricing are done. Remove to restore V1 (branch v1-site).
      {
        source: "/:path((?!_next|_vercel|images|fonts|logos|favicon\\.ico).+)",
        destination: "/",
        permanent: false,
      },
      // Pricing / platform → ways section
      { source: "/pricing",  destination: "/#ways",    permanent: true },
      { source: "/platform", destination: "/#ways",    permanent: true },
      // Security → security section
      { source: "/security", destination: "/#security", permanent: true },
      // About → team page
      { source: "/about",    destination: "/team",     permanent: true },
      // Method / products / solutions → how-it-works section
      { source: "/method",    destination: "/#how",    permanent: true },
      { source: "/products",  destination: "/#how",    permanent: true },
      { source: "/solutions", destination: "/#how",    permanent: true },
      // Insights / book → home
      { source: "/insights",  destination: "/",        permanent: true },
      { source: "/book",      destination: "/",        permanent: true },
    ];
  },

  // Security headers applied to every response
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default withMDX(nextConfig);
