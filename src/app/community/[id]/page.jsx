"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useArticle } from "@/hooks/Article";
import ArticleSection from "./_components/ArticleSection";
import CommentSection from "./_components/CommentSection";
import ArticleWrapper from "./_components/ArticleWrapper";
import LoadingState from "@/components/common/LoadingState";

export default function PostPage() {
  const params = useParams();
  const id = params.id;
  const { article, loading, error, refetch } = useArticle(id);
  const [isLiked, setIsLiked] = useState(false);
  const [localArticle, setLocalArticle] = useState(null);

  // article이 변경될 때마다 localArticle 업데이트
  useEffect(() => {
    if (article) {
      setLocalArticle(article);
    }
  }, [article]);

  const handleToggleLike = () => {
    setIsLiked(!isLiked);
  };

  // 게시글이 수정되었을 때 호출될 함수
  const handleArticleUpdate = async () => {
    await refetch();
  };

  if (loading || error || !article) {
    return (
      <LoadingState
        loading={loading}
        error={error}
        isEmpty={!loading && !error && !article}
        loadingMessage="게시글을 불러오는 중..."
        errorMessage="게시글을 불러오는데 실패했습니다."
        emptyMessage="게시글이 존재하지 않습니다."
      />
    );
  }

  return (
    <ArticleWrapper>
      {/* 게시글 영역*/}
      <ArticleSection
        article={article}
        onToggleLike={handleToggleLike}
        isLiked={isLiked}
        content={article.data?.content}
        articleId={id}
        onArticleUpdate={handleArticleUpdate}
      />

      {/* 댓글 영역 */}
      <CommentSection articleId={id} />
    </ArticleWrapper>
  );
}
