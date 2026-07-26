import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
  },
  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;
