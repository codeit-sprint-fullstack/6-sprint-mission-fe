import apiRequest from "./apiRequest";

/**
 * 전체 게시글 목록 (일반)
 */
export async function getArticles({ orderBy = "최신순", page = 1, limit = 5 }) {
  orderBy === "최신순" ? "최신순" : "좋아요순";

  const query = new URLSearchParams({
    orderBy: orderBy,
    page: page.toString(),
    take: limit.toString(),
  });

  const { articles, totalCount } = await apiRequest(`/articles?${query}`);
  return { articles, totalCount };
}

/**
 * 전체 게시글 목록 (BEST)
 */
export async function getBestArticles(limit = 3) {
  const orderBy = "좋아요순";

  const { articles } = await apiRequest(
    `/articles?orderBy=${orderBy}&take=${limit}`
  );

  return articles;
}
