import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/aura7_ai',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
