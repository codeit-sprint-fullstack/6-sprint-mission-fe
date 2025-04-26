import { BASE_URL } from "@/const";

/*********** 중고마켓 ***********/
// 상품 전체 조회
export async function getProducts() {
  try {
    const res = await fetch(`${BASE_URL}/products`);

    if (!res.ok) throw new Error("상품 목록을 불러오는데 실패했습니다.");

    return res.json();
  } catch (e) {
    console.error("상품 목록을 불러오는데 실패했습니다.", e);
    throw e;
  }
}

// 상품 상세 조회
export async function getProduct(productId) {
  try {
    const res = await fetch(`${BASE_URL}/products/${productId}`);

    if (!res.ok) throw new Error("상품을 불러오는데 실패했습니다.");

    return res.json();
  } catch (e) {
    console.error("상품을 불러오는데 실패했습니다.", e);
    throw e;
  }
}

/*********** 자유게시판 ***********/
// 게시글 전체 조회
export async function getArticles() {
  try {
    const res = await fetch(`${BASE_URL}/articles`);

    if (!res.ok) throw new Error("게시글 목록을 불러오는데 실패했습니다.");

    return res.json();
  } catch (e) {
    console.error("게시글 목록을 불러오는데 실패했습니다.", e);
    throw e;
  }
}

// 게시글 상세 조회
export async function getArticle(articleId) {
  try {
    const res = await fetch(`${BASE_URL}/articles/${articleId}`);

    if (!res.ok) throw new Error("게시글을 불러오는데 실패했습니다.");

    return res.json();
  } catch (e) {
    console.error("게시글을 불러오는데 실패했습니다.", e);
    throw e;
  }
}

/*********** 댓글 ***********/
// 상품 댓글 전체 조회
export async function getProductComments(productId, limit) {
  try {
    const res = await fetch(
      `${BASE_URL}/products/${productId}/comments?limit=${limit}`
    );

    if (!res.ok) throw new Error("댓글을 불러오는데 실패했습니다.");

    return res.json();
  } catch (e) {
    console.error("댓글을 가져오는데 실패했습니다.", e);
    throw e;
  }
}

// 게시글 댓글 전체 조회
export async function getArticleComments(articleId, limit) {
  try {
    const res = await fetch(
      `${BASE_URL}/articles/${articleId}/comments?limit=${limit}`
    );

    if (!res.ok) throw new Error("댓글을 불러오는데 실패했습니다.");

    return res.json();
  } catch (e) {
    console.error("댓글을 가져오는데 실패했습니다.", e);
    throw e;
  }
}
