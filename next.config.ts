import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['react-map-gl'],
  output: 'export', // Required for Capacitor
  images: {
    unoptimized: true, // Required for static export
  },
  trailingSlash: true, // Better mobile compatibility
};

export default nextConfig;
