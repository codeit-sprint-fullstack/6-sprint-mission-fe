"use server";

import { BASE_URL } from "@/constant";
import { cookies } from "next/headers";

// 로그인
export async function loginAction({ formData }: { formData: FormData }) {
  const email = formData.get("email");
  const password = formData.get("password");
  const cookieStore = await cookies();

  try {
    const res = await fetch(`${BASE_URL}/auth/signIn`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      return data;
    }

    cookieStore.set("accessToken", data.accessToken, {
      path: "/",
      httpOnly: true,
    });
    cookieStore.set("refreshToken", data.refreshToken, {
      path: "/",
      httpOnly: true,
    });

    console.log("accessToken, refreshToken 발급");

    return {
      success: true,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
  } catch (e) {
    console.error("로그인 에러:", e);
    return { error: "서버 내부 오류가 발생했습니다." };
  }
}

// 회원가입
export async function signupAction({ formData }: { formData: FormData }) {
  const email = formData.get("email");
  const nickname = formData.get("nickname");
  const password = formData.get("password");
  const passwordConfirmation = formData.get("passwordConfirmation");

  try {
    const res = await fetch(`${BASE_URL}/auth/signUp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, nickname, password, passwordConfirmation }),
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      return data;
    }

    return { success: true, message: "가입이 완료되었습니다." };
  } catch (e) {
    console.error("회원가입 에러:", e);
    return { error: "서버 내부 오류가 발생했습니다." };
  }
}

// 로그아웃
export async function logoutAction() {
  const cookieStore = await cookies();

  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");

  return { success: true };
}

// 토큰 갱신
export async function refreshTokenAction() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    throw new Error("refreshToken 없음");
  }

  const res = await fetch(`${BASE_URL}/auth/refresh-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
    credentials: "include",
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    return data;
  }

  cookieStore.set("accessToken", data.accessToken, {
    path: "/",
    httpOnly: true,
  });
  cookieStore.set("refreshToken", data.refreshToken, {
    path: "/",
    httpOnly: true,
  });

  return {
    success: true,
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  };
}

// 클라이언트 재발급 요청 처리
export async function refreshAccessTokenClient() {
  try {
    const result = await refreshTokenAction(); // 서버 쿠키로 갱신
    if (!result?.accessToken) throw new Error("토큰 재발급 실패");
    return result;
  } catch (e) {
    console.error("refreshAccessTokenClient 실패:", e);
    return null;
  }
}
