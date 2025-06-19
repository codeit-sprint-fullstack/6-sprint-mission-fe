import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  appDir: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "six-sprint-mission-be.onrender.com",
        port: "",
        pathname: "/uploads/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
