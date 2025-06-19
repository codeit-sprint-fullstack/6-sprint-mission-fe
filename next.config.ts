import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  appDir: true,
  images: {
    remotePatterns: [
      {
        hostname: "six-sprint-mission-be.onrender.com",
      },
    ],
  },
};

export default nextConfig;
