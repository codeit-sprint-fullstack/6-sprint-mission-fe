const BASE_URL =
  typeof window !== "undefined"
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.API_URL;

/*********** 중고마켓 ***********/
// 상품 전체 조회
export async function getProducts(params = {}) {
  const query = new URLSearchParams(params).toString();

  try {
    const res = await fetch(`${BASE_URL}/products?${query}`);

    if (!res.ok) throw new Error("상품 목록을 불러오는데 실패했습니다.");

    return res.json();
  } catch (e) {
    console.error("상품 목록을 불러오는데 실패했습니다.", e);
    throw e;
  }
}

// 상품 상세 조회
export async function getProduct(productId) {
  const token = // 브라우저 환경이면 localStorage에 저장된 accessToken 가져옴
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  try {
    const res = await fetch(`${BASE_URL}/products/${productId}`, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

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
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  try {
    const res = await fetch(`${BASE_URL}/articles/${articleId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

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
