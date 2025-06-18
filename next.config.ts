import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // image host 설정
  images: {
    domains: ["panda-market-api.onrender.com", "example.com", "localhost"],
  },
  // svg 파일 React 컴포넌트로 변환
  webpack: (config) => {
    // @ts-expect-error 타입 에러 무시
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.(".svg"));

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              typescript: true,
              ext: "tsx",
            },
          },
        ],
      }
    );
    fileLoaderRule.exclude = /\.svg$/i;
    return config;
  },

  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: "http://localhost:8080/:path*",
  //     },
  //   ];
  // },
};

export default nextConfig;
