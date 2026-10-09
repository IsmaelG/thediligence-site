import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const withMDX = createMDX({});

const nextConfig: NextConfig = {
  // Enable .mdx page extensions for Insights and Changelog
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],

  // Build-time redirects (runtime proxy for /app is in app/proxy.ts)
  async redirects() {
    return [
      {
        source: "/pricing",
        destination: "/platform#plans",
        permanent: true,
      },
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
