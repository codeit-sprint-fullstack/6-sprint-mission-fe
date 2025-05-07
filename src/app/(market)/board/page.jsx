import React from "react";
import BestArticleList from "./_components/BestArticleList";
import ArticleList from "./_components/ArticleList";
import { getArticles } from "@/lib/getApi";

async function BoardPage() {
  const data = await getArticles();
  const articles = data.list;

  return (
    <div>
      <BestArticleList articles={articles} />
      <ArticleList articles={articles} />
    </div>
  );
}

export default BoardPage;
