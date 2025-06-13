import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // image host 설정
  images: {
    domains: ["panda-market-api.onrender.com"],
  },
  // svg 파일 React 컴포넌트로 변환
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
