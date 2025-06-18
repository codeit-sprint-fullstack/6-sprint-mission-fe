import { BASE_URL } from "@/constant";
import { getArticleAction } from "../actions/article";
import { Article, ArticleParams } from "@/types";
import { toQueryString } from "../utils/query";

export const articleService = {
  getArticles: async (params: ArticleParams) => {
    const query = toQueryString(params);

    try {
      const res = await fetch(`${BASE_URL}/articles?${query}`);
      if (!res.ok) throw new Error("게시글 목록을 불러오는데 실패했습니다.");
      return await res.json();
    } catch (e) {
      console.error("게시글 목록을 불러오는데 실패했습니다.", e);
      throw e;
    }
  },
  getArticle: async (articleId: number): Promise<Article> => {
    return await getArticleAction(articleId);
  },
};
