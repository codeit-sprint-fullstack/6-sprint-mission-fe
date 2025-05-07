/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["sprint-fe-project.s3.ap-northeast-2.amazonaws.com"],
  },
  async rewrites() {
    return [
      {
        source: "/auth/:path*",
        destination: "https://panda-market-api.vercel.app/auth/:path*",
      },
    ];
  },
};

export default nextConfig;
