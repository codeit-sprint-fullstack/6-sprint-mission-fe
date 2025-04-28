"use client";
import { getArticleDetail } from "@/api/articles";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ArticleDetailPage() {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const data = await getArticleDetail(articleId);
        setArticle(data);
      } catch (e) {
        setError(e.message);
      }
    }

    fetchArticle();
  }, [articleId]);
  if (error) return <p className="text-red-500">오류: {error}</p>;
  if (!article) return <p>게시글을 불러오는 중...</p>;

  return (
    <div className="p-6">Info
      <h1 className="text-xl font-bold">{article.title}</h1>
      <p className="mt-2">This is content: {article.content}</p>
      <p className="mt-2">Created date: {article.createdAt}</p>
    </div>
    

  );
}
