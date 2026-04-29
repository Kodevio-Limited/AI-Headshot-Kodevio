import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  // In Next.js 16, this is a top-level property, NOT inside 'experimental'
  turbopack: {
    root: __dirname, // Ensures the root is set to your frontend directory
  },
};


export default nextConfig;
