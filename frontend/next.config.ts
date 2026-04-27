import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // In Next.js 16, this is a top-level property, NOT inside 'experimental'
    turbopack: {
      root: __dirname, // Ensures the root is set to your frontend directory
  },
};

export default nextConfig;
