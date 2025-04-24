/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "https://panda-market-api.vercel.app/:path*",
      },
    ];
  },
};
export default nextConfig;
