// src/components/Meta.js
import React from "react";
import { Helmet } from "react-helmet";

const BASE_URL = "https://s2pandamarkets2.netlify.app";

const Meta = ({ title, description, image, path }) => {
  return (
    <Helmet>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Open Graph (Facebook, Kakao, Discord) */}
      <meta property="og:title" content={title || "판다마켓"} />
      <meta
        property="og:description"
        content={description || "일상의 모든 물건을 거래해 보세요"}
      />
      <meta
        property="og:image"
        content={image || `${BASE_URL}/images/logo/og-image.png`}
      />
      <meta property="og:url" content={`${BASE_URL}${path || "/"}`} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="판다마켓" />
      <meta property="og:locale" content="ko_KR" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || "판다마켓"} />
      <meta
        name="twitter:description"
        content={description || "일상의 모든 물건을 거래해 보세요"}
      />
      <meta
        name="twitter:image"
        content={image || `${BASE_URL}/images/logo/og-image.png`}
      />
      <meta name="twitter:url" content={`${BASE_URL}${path || "/"}`} />

      {/* Discord */}
      <meta name="theme-color" content="#3699FF" />

      {/* 페이지 제목 설정 */}
      <title>{title || "판다마켓"}</title>
    </Helmet>
  );
};

export default Meta;
