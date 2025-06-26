import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  appDir: true,
  images: {
    remotePatterns: [
      {
        hostname: "43.201.25.48",
        port: "7777",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
