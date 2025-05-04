/** @type {import('next').NextConfig} */
export default {
  images: {
    domains: [
      "sprint-fe-project.s3.ap-northeast-2.amazonaws.com",
      "example.com",
      "www.kjcnews.co.kr",
      "sprint-fe-project.s3.ap-northeast-2.amazonaws.com",
      "example.com",
      "cdn.wccftech.com",
      "encrypted-tbn0.gstatic.com",
      "i.pinimg.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
};
