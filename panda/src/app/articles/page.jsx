import React from "react";
import BestArticles from "./BestArticles";
import Articles from "./Articles";

function ArticlesPage() {
  return (
    <main className="p-[32px] lg:px-[200px]">
      <BestArticles />
      <Articles />
    </main>
  );
}

export default ArticlesPage;
