"use client";
import { useState, useEffect } from "react";

export function useWindowSize() {
  const [width, setWidth] = useState<number | undefined>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // 클린업 함수
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return width;
}
