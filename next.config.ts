import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  transpilePackages: ['lucide-react'],
};

export default nextConfig;
