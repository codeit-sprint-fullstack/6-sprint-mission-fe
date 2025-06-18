"use client";

import ArticleDetail from "@/components/ui/ArticleDetail";
import Button from "@/components/ui/common-UI/Button";
import Comments from "@/components/ui/article/Comments";
import { getArticle } from "@/lib/article";
import React, { useEffect, useState } from "react";
import CreateComment from "@/components/ui/CreateComment";

interface SpecifiedArticleProps {
  params: {
    id: string;
  };
}

interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

export default function SpecifiedArticle({ params }: SpecifiedArticleProps) {
  const articleId = params.id;
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refreshComments = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const fetchArticle = async () => {
    const data = await getArticle(articleId);
    setArticle(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchArticle();
  }, [articleId]);

  if (loading) return <div>게시글 로딩 중... </div>;

  return (
    <div className="flex items-center justify-center font-pretendard">
      <div className="pt-[94px]">
        <ArticleDetail articleId={articleId} article={article} />
        <CreateComment articleId={articleId} onCommentAdded={refreshComments} />
        <Comments articleId={articleId} refreshTrigger={refreshTrigger} />
        <div className="flex justify-center mt-[64px]">
          <Button
            text={"목록으로 돌아가기"}
            disabled={false}
            width={"w-[240px]"}
            height={"h-[48px]"}
            rounded={"rounded-[40px]"}
          />
        </div>
      </div>
    </div>
  );
}
