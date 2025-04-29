"use server";

import { BASE_URL } from "@/const";
import { cookies } from "next/headers";

// 게시글 등록
export async function createArticle(params) {
  const token = cookies().get("accessToken")?.value;

  try {
    const res = await fetch(`${BASE_URL}/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });

    const data = await res.json();

    if (!res.ok) return data;

    return data;
  } catch (e) {
    console.error("게시글 등록을 실패했습니다.", e);
    throw e;
  }
}

// 게시글 수정
export async function updateArticle(articleId, params) {
  const token = cookies().get("accessToken")?.value;

  try {
    const res = await fetch(`${BASE_URL}/articles/${articleId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });

    const data = await res.json();

    if (!res.ok) return data;

    return data;
  } catch (e) {
    console.error("게시글 수정을 실패했습니다.", e);
    throw e;
  }
}

// 게시글 삭제
export async function deleteArticle(articleId) {
  const token = cookies().get("accessToken")?.value;

  try {
    const res = await fetch(`${BASE_URL}/articles/${articleId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) return data;

    return data;
  } catch (e) {
    console.error("게시글 삭제를 실패했습니다.", e);
    throw e;
  }
}
