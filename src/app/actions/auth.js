"use server";

import { BASE_URL } from "@/const";
import { cookies } from "next/headers";

// 로그인
export async function loginAction(_, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const res = await fetch(`${BASE_URL}/auth/signIn`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
      cache: "no-store",
    });

    const data = await res.json();
    const cookieStore = await cookies();
    cookieStore.set("accessToken", data.accessToken, {
      path: "/",
      httpOnly: true,
    });

    if (!res.ok) {
      return data;
    }

    return { success: true, accessToken: data.accessToken };
  } catch (e) {
    console.error("로그인 에러:", e);
    return { error: "서버 내부 오류가 발생했습니다." };
  }
}

// 회원가입
export async function signupAction(_, formData) {
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

// 토큰 갱신
export async function getRefreshToken(_, formData) {
  const refreshToken = formData.get("refreshToken");

  try {
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
      console.error("refreshToken 갱신 실패");
      return data;
    }

    return data;
  } catch (e) {
    console.error("토큰 갱신 에러:", e);
    return { error: "서버 내부 오류가 발생했습니다." };
  }
}
