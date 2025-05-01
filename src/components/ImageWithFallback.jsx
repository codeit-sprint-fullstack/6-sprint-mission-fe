"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * 공통 이미지 컴포넌트
 *
 * - src       : 원본 이미지 URL (string | undefined)
 * - fallback  : 대체 이미지 URL (선택, 기본값 /img/default-product.png)
 * - alt       : 대체 텍스트
 * - …rest     : next/image로 넘길 기타 props (fill, width, height, className 등)
 *
 * 원본 로드 실패(onError) 시 fallback 이미지로 자동 교체합니다.
 */
export default function ImageWithFallback({
  src,
  fallback = "/images/products/emptyproduct.png", // ✅ 전역 기본 이미지
  alt,
  ...rest
}) {
  // 초기 src가 없을 때도 fallback 사용
  const [imgSrc, setImgSrc] = useState(src || fallback);

  return (
    <Image
      {...rest}
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(fallback)}
    />
  );
}
