"use server";

import { BASE_URL } from "@/const";
import { cookies } from "next/headers";

// 로그인
export async function loginAction(_, formData) {
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
      return data;
    }

    cookieStore.set("accessToken", data.accessToken, {
      path: "/",
      httpOnly: true,
    });

    return {
      success: true,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
  } catch (e) {
    console.error("토큰 갱신 에러:", e);
    return { error: "서버 내부 오류가 발생했습니다." };
  }
}

// 서버 사이드 전용 함수
export async function getServerSideToken(type) {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get(type);
  return tokenCookie ? tokenCookie.value : null;
}

export async function setServerSideTokens(accessToken, refreshToken) {
  const cookieStore = await cookies();

  // 토큰 디코딩 및 만료 시간 계산
  const accessTokenData = JSON.parse(
    Buffer.from(accessToken.split(".")[1], "base64url").toString()
  );
  const refreshTokenData = JSON.parse(
    Buffer.from(refreshToken.split(".")[1], "base64url").toString()
  );

  const accessTokenExpiresIn =
    accessTokenData.exp - Math.floor(Date.now() / 1000);
  const refreshTokenExpiresIn =
    refreshTokenData.exp - Math.floor(Date.now() / 1000);

  // 쿠키 설정
  cookieStore.set("accessToken", accessToken, {
    path: "/",
    maxAge: accessTokenExpiresIn,
    sameSite: "strict",
  });

  cookieStore.set("refreshToken", refreshToken, {
    path: "/",
    maxAge: refreshTokenExpiresIn,
    sameSite: "strict",
  });
}

export async function updateAccessToken(accessToken) {
  const cookieStore = await cookies();

  // 토큰 디코딩 및 만료 시간 계산
  const accessTokenData = JSON.parse(
    Buffer.from(accessToken.split(".")[1], "base64url").toString()
  );

  const accessTokenExpiresIn =
    accessTokenData.exp - Math.floor(Date.now() / 1000);

  // 액세스 토큰만 갱신
  cookieStore.set("accessToken", accessToken, {
    path: "/",
    maxAge: accessTokenExpiresIn,
    sameSite: "strict",
  });
}

export async function clearServerSideTokens() {
  const cookieStore = await cookies();

  // 액세스 토큰 삭제
  cookieStore.delete("accessToken");

  // 리프레시 토큰 삭제
  cookieStore.delete("refreshToken");

  return { success: true };
}
