import { BASE_URL } from "@/constant";

// 상품 댓글 전체 조회
export async function getProductComments(productId: number, limit: number) {
  try {
    const res = await fetch(`${BASE_URL}/products/${productId}/comments?limit=${limit}`);

    if (!res.ok) throw new Error("댓글을 불러오는데 실패했습니다.");

    return res.json();
  } catch (e) {
    console.error("댓글을 가져오는데 실패했습니다.", e);
    throw e;
  }
}

// 게시글 댓글 전체 조회
export async function getArticleComments(articleId: number, limit: number) {
  try {
    const res = await fetch(`${BASE_URL}/articles/${articleId}/comments?limit=${limit}`);

    if (!res.ok) throw new Error("댓글을 불러오는데 실패했습니다.");

    return res.json();
  } catch (e) {
    console.error("댓글을 가져오는데 실패했습니다.", e);
    throw e;
  }
}
