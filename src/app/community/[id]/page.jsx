"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { useArticle } from "@/hooks/useArticle";
import ArticleHeader from "./_components/ArticleHeader";
import ArticleContent from "./_components/ArticleContent";
import CommentSection from "./_components/CommentSection";
import LoadingState from "./_components/LoadingState";
import ArticleWrapper from "./_components/ArticleWrapper";

export default function PostPage() {
  const params = useParams();
  const id = params.id;
  const { article, loading, error } = useArticle(id);
  const [isLiked, setIsLiked] = useState(false);

  const handleToggleLike = () => {
    setIsLiked(!isLiked);
  };

  if (loading || error || !article) {
    return (
      <LoadingState
        loading={loading}
        error={error}
        isEmpty={!loading && !error && !article}
      />
    );
  }

  return (
    <ArticleWrapper>
      {/* 게시글 헤더 */}
      <ArticleHeader
        article={article}
        onToggleLike={handleToggleLike}
        isLiked={isLiked}
      />

      {/* 게시글 내용 */}
      <ArticleContent content={article.data?.content} />

      {/* 댓글 영역 */}
      <CommentSection articleId={id} />
    </ArticleWrapper>
  );
}
