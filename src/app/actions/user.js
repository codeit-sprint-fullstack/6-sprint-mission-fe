"use server";

import { BASE_URL } from "@/const";
import { cookies } from "next/headers";

// 쿠키에서 accessToken 추출하는 헬퍼 함수
function getTokenFromCookie() {
  const token = cookies().get("accessToken")?.value;
  return token;
}

// 사용자 정보 조회
export async function getUserAction() {
  try {
    const res = await fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenFromCookie()}`,
      },
      credentials: "include",
      cache: "no-store",
    });

    if (!res.ok) throw new Error("유저 정보를 불러오는데 실패했습니다.");

    return await res.json();
  } catch (err) {
    console.error("getUserAction 에러:", err);
    throw err;
  }
}

// 사용자 정보 수정
export async function updateUserAction(formData) {
  try {
    const res = await fetch(`${BASE_URL}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenFromCookie()}`,
      },
      body: JSON.stringify(formData),
      credentials: "include",
      cache: "no-store",
    });

    if (!res.ok) throw new Error("유저 정보 수정 실패");

    return await res.json();
  } catch (err) {
    console.error("updateUserAction 에러:", err);
    throw err;
  }
}

// 비밀번호 변경
export async function updatePasswordAction(formData) {
  try {
    const res = await fetch(`${BASE_URL}/users/me/password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenFromCookie()}`,
      },
      body: JSON.stringify(formData),
      credentials: "include",
      cache: "no-store",
    });

    if (!res.ok) throw new Error("비밀번호 변경 실패");

    return await res.json();
  } catch (err) {
    console.error("updatePasswordAction 에러:", err);
    throw err;
  }
}
