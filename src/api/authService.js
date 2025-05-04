"use client";

import { defaultFetch } from "@/api/fetchClient";

const baseURL = "https://panda-market-api.vercel.app";

// 쿠키 저장 (JS에서 접근 가능한 일반 쿠키)
const setCookie = (name, value, days = 1) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; path=/; expires=${expires}; SameSite=Lax`;
};

// 쿠키 삭제
const removeCookie = (name) => {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};

export const authService = {
  // 로그인
  signIn: async (email, password) => {
    const result = await defaultFetch("/auth/signIn", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (result.accessToken) {
      // localStorage 저장
      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("refreshToken", result.refreshToken);

      // 쿠키 저장
      setCookie("accessToken", result.accessToken);
      setCookie("refreshToken", result.refreshToken);
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
      setCookie("accessToken", result.accessToken);
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
      body: JSON.stringify({ refreshToken }),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("토큰 갱신 요청 실패");
    }

    const data = await response.json();
    localStorage.setItem("accessToken", data.accessToken);
    setCookie("accessToken", data.accessToken);

    return data.accessToken;
  },

  // 로그아웃
  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    removeCookie("accessToken");
    removeCookie("refreshToken");
  },
};
