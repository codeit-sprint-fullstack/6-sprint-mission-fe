"use client";

import React, { useState, useEffect } from "react";
import Article from "./_components/Article";
import { useParams } from "next/navigation";
import Comments from "@/components/layout/ArticleComments";

function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`http://localhost:3002/articles/${id}`);

        if (!response.ok) throw new Error(`${id}번 게시글을 열 수 없습니다.`);

        const data = await response.json();
        setArticle(data.article);
      } catch (e) {
        console.error(e);
      }
    };

    fetchArticle();
  }, [id]);

  if (!article) return <p>로딩 중…!</p>;

  return (
    <main className="p-[32px] w-full lg:w-[1200px] lg:px-[200px] lg:mx-auto">
      <Article key={article.id} article={article} />
      <Comments articleId={article.id} />
    </main>
  );
}

export default ArticlePage;
