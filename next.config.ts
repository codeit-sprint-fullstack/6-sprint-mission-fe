import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // image host 설정
  images: {
    domains: ["panda-market-bucket.s3.ap-northeast-2.amazonaws.com"],
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

  // TODO: 소셜 로그인용
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
