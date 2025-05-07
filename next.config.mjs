/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // 강사님이 알려주신 불특정 다수의 이미지 도메인 허용
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
};

export default nextConfig;
