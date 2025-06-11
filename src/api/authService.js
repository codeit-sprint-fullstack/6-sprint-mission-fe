"use client";

import { defaultFetch, tokenFetch } from "@/api/fetchClient";

const baseURL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://six-sprint-mission-be.onrender.com";

export const authService = {
  // 로그인
  signIn: async (email, password) => {
    const result = await defaultFetch("/auth/signIn", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      credentials: "include", // ✅ 서버에서 쿠키 내려받기 허용
    });

    if (result.accessToken) {
      localStorage.setItem("accessToken", result.accessToken);
    }

    return result;
  },

  // 회원가입
  signUp: async (email, nickname, password, passwordConfirmation) => {
    const result = await defaultFetch("/auth/signUp", {
      method: "POST",
      body: JSON.stringify({ email, nickname, password, passwordConfirmation }),
      credentials: "include",
    });

    if (result.accessToken) {
      localStorage.setItem("accessToken", result.accessToken);
    }

    return result;
  },

  // 리프레쉬 토큰으로 엑세스토큰 요청 (쿠키에 저장된 refreshToken 사용)
  // 쿠키 문제로 로컬에서는 테스트가 안됨
  getRefreshToken: async () => {
    const response = await fetch(`${baseURL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // ✅ 쿠키를 자동 포함
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("토큰 갱신 요청 실패");
    }

    const data = await response.json();
    localStorage.setItem("accessToken", data.accessToken);

    return data.accessToken;
  },

  // 로그아웃
  logout: async () => {
    // ✅ 서버에 쿠키 삭제 요청 (옵션: 쿠키 삭제 API 따로 만들었으면 호출)
    await tokenFetch(`/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    localStorage.removeItem("accessToken");
  },
};
