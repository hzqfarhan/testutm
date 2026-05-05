import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/utmkathon',
  assetPrefix: '/utmkathon/',
  images: {
    unoptimized: true,
  },
};


export default nextConfig;
