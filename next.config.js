/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },

  async rewrites() {
    return [
      {
        // refresh-token은 프록시하지 않음 (직접 원격 주소 호출)
        source: "/api/auth/refresh-token",
        destination: "https://panda-market-api.vercel.app/auth/refresh-token",
      },
      {
        // 나머지 /api 경로는 전부 프록시
        source: "/api/:path*",
        destination: "https://panda-market-api.vercel.app/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
