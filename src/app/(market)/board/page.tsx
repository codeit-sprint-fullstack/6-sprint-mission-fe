import React from "react";
import BestArticleList from "./_components/BestArticleList";
import ArticleList from "./_components/ArticleList";

async function BoardPage() {
  return (
    <div>
      <BestArticleList />
      <ArticleList />
    </div>
  );
}

export default BoardPage;
