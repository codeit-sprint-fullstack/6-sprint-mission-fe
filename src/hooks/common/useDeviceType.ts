"use client";

import { useState, useEffect } from "react";
import { throttle } from "lodash-es";

// 모바일 기준
const MOBILE_BREAKPOINT = 820;
// 태블릿 기준
const TABLET_BREAKPOINT = 1280;

const useDeviceType = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    // 클라이언트 사이드에서만 실행
    const updateDimensions = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setIsMobile(width < MOBILE_BREAKPOINT);
      setIsTablet(width < TABLET_BREAKPOINT);
    };

    // 초기 설정
    updateDimensions();

    // 0.3초(500ms) 쓰로틀링이 적용된 리사이즈 핸들러
    const throttledUpdateDimensions = throttle(updateDimensions, 300);

    window.addEventListener("resize", throttledUpdateDimensions);

    return () => {
      window.removeEventListener("resize", throttledUpdateDimensions);
      // 메모리 누수 방지를 위해 쓰로틀 취소
      throttledUpdateDimensions.cancel();
    };
  }, []);

  return { windowWidth, isMobile, isTablet };
};

export default useDeviceType;
