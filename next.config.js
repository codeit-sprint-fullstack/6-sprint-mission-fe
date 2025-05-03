module.exports = {
  /* API 프록시 설정 */
  async rewrites() {
    return [
      {
        source: "/api/:path",
        destination: "https://panda-market-api.vercel.app/:path",
      },
    ];
  },

  /* 외부 이미지 허용 도메인 */
  images: {
    domains: [
      "cdn.wccftech.com",
      "search.pstatic.net",
      "encrypted-tbn0.gstatic.com",
      "health.chosun.com",
      "via.placeholder.com",
      "cdn.choicenews.co.kr",
      "example.com",
      "upload.wikimedia.org",
      "sprint-fe-project.s3.ap-northeast-2.amazonaws.com",
      "images.unsplash.com",
      "i.pinimg.com",
    ],
  },
};
