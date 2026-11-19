import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  turbopack: {
    rules: {
      // Tailwind CSS v4 via its Turbopack loader
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    // Next.js 16 requires an explicit allowlist of quality values.
    qualities: [70, 80],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
