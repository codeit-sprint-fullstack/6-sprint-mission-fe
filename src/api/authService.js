"use client";

import { defaultFetch } from "@/api/fetchClient";

const baseURL = "https://panda-market-api.vercel.app";

export const authService = {
  // 로그인
  signIn: async (email, password) => {
    const result = await defaultFetch("/auth/signIn", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (result.accessToken) {
      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("refreshToken", result.refreshToken);
    }

    return result;
  },

  // 회원가입
  signUp: async (email, nickname, password, passwordConfirmation) => {
    const result = await defaultFetch("/auth/signUp", {
      method: "POST",
      body: JSON.stringify({ email, nickname, password, passwordConfirmation }),
    });

    if (result.accessToken) {
      localStorage.setItem("accessToken", result.accessToken);
    }

    return result;
  },

  // 리프레쉬 토큰으로 엑세스토큰 요청
  getRefreshToken: async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      throw new Error("리프레시 토큰이 존재하지 않습니다.");
    }

    const response = await fetch(`${baseURL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }), // ✅ body에 담아서 보내기
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("토큰 갱신 요청 실패");
    }

    const data = await response.json(); // ✅ 먼저 json 파싱
    localStorage.setItem("accessToken", data.accessToken); // ✅ accessToken 갱신

    return data.accessToken;
  },

  // 로그아웃
  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },
};
