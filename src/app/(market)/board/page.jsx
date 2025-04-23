import React from "react";
import BestArticleSection from "./_components/BestArticleSection";
import ArticleSection from "./_components/ArticleSection";
import { getArticles } from "@/lib/articleApi";

async function BoardPage() {
  const articles = await getArticles();

  return (
    <div>
      <BestArticleSection articles={articles} />
      <ArticleSection articles={articles} />
    </div>
  );
}

export default BoardPage;
