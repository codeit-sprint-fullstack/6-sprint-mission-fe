import type { NextConfig } from "next";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "https://six-sprint-mission-be.onrender.com";

const { hostname: API_HOST } = new URL(API_URL);

const nextConfig: NextConfig = {
  appDir: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: API_HOST,
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
