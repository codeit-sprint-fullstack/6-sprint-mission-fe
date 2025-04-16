import React from "react";
import BestArticle from "./_components/BestArticle";
import Article from "./_components/Article";
import { getArticle } from "@/lib/api/articleApi";

async function page() {
  const articles = await getArticle();

  return (
    <div className="p-4">
      <BestArticle articles={articles} />
      <Article articles={articles} />
    </div>
  );
}

export default page;
