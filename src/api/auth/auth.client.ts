"use client";

import { defaultFetch } from "@/api/common/fetchClient";

// const clientBaseURL =
//   process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const authService = {
  // 로그인
  signIn: async (email: string, password: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("로그인 실패");
    const { accessToken } = await res.json();
    localStorage.setItem("accessToken", accessToken);
  },

  // 회원가입
  signUp: async (
    email: string,
    nickname: string,
    password: string,
    passwordConfirmation: string
  ) => {
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
  getRefreshToken: async () => {
    const response = await fetch(`/api/auth/refresh-token`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("토큰 갱신 요청 실패");
    }

    const { accessToken } = await response.json();
    localStorage.setItem("accessToken", accessToken);

    return accessToken;
  },

  // 로그아웃
  logout: async () => {
    await fetch(`/api/auth/logout`, {
      method: "POST",
    });

    localStorage.removeItem("accessToken");
  },
};
