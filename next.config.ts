import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
      },
      {
        hostname: "https://panda-market-server-postgresql.onrender.com",
      },
    ],
  },
};

export default nextConfig;
