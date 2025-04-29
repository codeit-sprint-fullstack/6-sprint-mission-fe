// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 다른 설정들이 있을 수 있습니다...
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.wccftech.com",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        port: "",
        // pathname: '/**',
      },
      {
        protocol: "https",
        hostname: "example.com",
        port: "",
        // pathname: '/**',
      },
      // --- 여기에 새 호스트 추가 ---
      {
        protocol: "https", // S3 URL이 https를 사용하므로
        hostname: "sprint-fe-project.s3.ap-northeast-2.amazonaws.com", // 에러 메시지에 나온 호스트 이름
        port: "", // 표준 포트(443)이므로 비워둠
        // pathname: '/**', // 모든 경로 허용 (필요시 특정 경로 패턴 지정 가능)
      },
      // --------------------------
      // 다른 허용할 호스트가 있다면 여기에 추가
    ],
  },
  // 다른 설정들이 있을 수 있습니다...
};

export default nextConfig;
