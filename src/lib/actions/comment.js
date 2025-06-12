"use server";

import { BASE_URL } from "@/const";
import { cookies } from "next/headers";

// 게시글 댓글 등록
export async function createArticleComment(articleId, params) {
  const token = (await cookies()).get("accessToken")?.value;

  try {
    const res = await fetch(`${BASE_URL}/articles/${articleId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });

    const data = await res.json();

    if (!res.ok) return data;

    return { success: true };
  } catch (e) {
    console.error("댓글 등록을 실패했습니다.", e);
    throw e;
  }
}

// 상품 댓글 등록
export async function createProductComment(productId, params) {
  const token = (await cookies()).get("accessToken")?.value;

  try {
    const res = await fetch(`${BASE_URL}/products/${productId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });

    const data = await res.json();

    if (!res.ok) return data;

    return { success: true };
  } catch (e) {
    console.error("댓글 등록을 실패했습니다.", e);
    throw e;
  }
}

// 댓글 수정
export async function updateComment(commentId, params) {
  const token = (await cookies()).get("accessToken")?.value;

  try {
    const res = await fetch(`${BASE_URL}/comments/${commentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });

    const data = await res.json();

    if (!res.ok) return data;

    return { success: true };
  } catch (e) {
    console.error("댓글 수정을 실패했습니다.", e);
    throw e;
  }
}

// 댓글 삭제
export async function deleteComment(commentId) {
  const token = (await cookies()).get("accessToken")?.value;

  try {
    const res = await fetch(`${BASE_URL}/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) return data;

    return { success: true };
  } catch (e) {
    console.error("댓글 삭제를 실패했습니다.", e);
    throw e;
  }
}
