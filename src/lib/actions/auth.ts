"use server";

import { BASE_URL } from "@/constant";
import { cookies } from "next/headers";

// 로그인
export async function loginAction({ email, password }: { email: string; password: string }) {
  try {
    const res = await fetch(`${BASE_URL}/auth/signIn`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    });

    if (!res.ok) {
      const data = await res.json();
      return data;
    }
    const setCookieHeader = res.headers.get("set-cookie") ?? "";
    const cookieParts = setCookieHeader.split(", ").flatMap((part) => part.split(","));
    const accessTokenValue = cookieParts.find((part) => part.startsWith("accessToken="));
    const refreshTokenValue = cookieParts.find((part) => part.startsWith("refreshToken="));

    const cookieStore = await cookies();

    if (accessTokenValue) {
      const accessToken = accessTokenValue.split(";")[0].split("=")[1];
      cookieStore.set("accessToken", accessToken, { httpOnly: true });
    }
    if (refreshTokenValue) {
      const refreshToken = refreshTokenValue.split(";")[0].split("=")[1];
      cookieStore.set("refreshToken", refreshToken, { httpOnly: true });
    }

    return { success: true };
  } catch (e) {
    console.error("로그인 에러:", e);
    return { error: "서버 내부 오류가 발생했습니다." };
  }
}

// 회원가입
export async function signupAction({
  email,
  nickname,
  password,
  passwordConfirmation,
}: {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}) {
  try {
    const res = await fetch(`${BASE_URL}/auth/signUp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, nickname, password, passwordConfirmation }),
      cache: "no-store",
    });

    const data = await res.json();
    if (!res.ok) {
      return { success: false, message: data.message || "회원가입에 실패했습니다." };
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
      Cookie: `refreshToken=${refreshToken}`,
    },
    body: JSON.stringify({ refreshToken }),
    cache: "no-store",
  });

  if (!res.ok) {
    const data = await res.json();
    return data;
  }
  const setCookieHeader = res.headers.get("set-cookie") ?? "";
  const cookieParts = setCookieHeader.split(", ").flatMap((part) => part.split(","));
  const accessTokenValue = cookieParts.find((part) => part.startsWith("accessToken="));
  const refreshTokenValue = cookieParts.find((part) => part.startsWith("refreshToken="));

  if (accessTokenValue) {
    const accessToken = accessTokenValue.split(";")[0].split("=")[1];
    cookieStore.set("accessToken", accessToken, { httpOnly: true });
  }
  if (refreshTokenValue) {
    const refreshToken = refreshTokenValue.split(";")[0].split("=")[1];
    cookieStore.set("refreshToken", refreshToken, { httpOnly: true });
  }

  return {
    success: true,
  };
}
