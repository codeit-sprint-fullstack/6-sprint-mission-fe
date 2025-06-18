"use server";

import { BASE_URL } from "@/constant";
import { cookies } from "next/headers";

interface ArticleParams {
  title: string;
  content: string;
}

// 게시글 상세 조회
export async function getArticleAction(articleId: number) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  try {
    const res = await fetch(`${BASE_URL}/articles/${articleId}`, {
      method: "GET",
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store",
    });

    if (!res.ok) throw new Error("게시글을 불러오는데 실패했습니다.");

    return await res.json();
  } catch (err) {
    console.error("getArticleAction 에러:", err);
  }
}

// 게시글 등록
export async function createArticleAction(params: { params: ArticleParams }) {
  const token = (await cookies()).get("accessToken")?.value;

  try {
    const res = await fetch(`${BASE_URL}/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${token}`,
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
export async function updateArticleAction({
  articleId,
  params,
}: {
  articleId: number;
  params: ArticleParams;
}) {
  const token = (await cookies()).get("accessToken")?.value;

  try {
    const res = await fetch(`${BASE_URL}/articles/${articleId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${token}`,
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
export async function deleteArticleAction({ articleId }: { articleId: number }) {
  const token = (await cookies()).get("accessToken")?.value;

  try {
    const res = await fetch(`${BASE_URL}/articles/${articleId}`, {
      method: "DELETE",
      headers: {
        Cookie: `accessToken=${token}`,
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
