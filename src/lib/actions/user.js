"use server";

import { BASE_URL } from "@/const";
import { cookies } from "next/headers";

// 사용자 정보 조회
export async function getUserAction() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  try {
    const res = await fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
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
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  try {
    const res = await fetch(`${BASE_URL}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
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
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  try {
    const res = await fetch(`${BASE_URL}/users/me/password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
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
