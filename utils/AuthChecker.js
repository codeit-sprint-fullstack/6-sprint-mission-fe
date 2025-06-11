"use client";

import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

function AuthChecker() {
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const exp = decoded.exp;

      if (!exp) return;

      const currentTime = Date.now() / 1000;
      const timeLeft = exp - currentTime;

      if (timeLeft < 300) {
        alert("5분 뒤 로그인이 만료됩니다.");
      }
    } catch (e) {
      console.error("토큰 디코딩 오류", e);
    }
  }, []);
  return null;
}

export default AuthChecker;
