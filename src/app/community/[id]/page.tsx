"use client";

import { useParams } from "next/navigation";
import { useArticle } from "@/hooks/Article";
import ArticleSection from "./_components/ArticleSection";
import ArticleWrapper from "./_components/ArticleWrapper";
import LoadingState from "@/components/common/LoadingState";
import CommentSection from "@/components/comment/CommentSection";
import { useAuth } from "@/providers/AuthProvider";

export default function PostPage() {
  const params = useParams();
  const id = params.id as string;

  const { article, loading, error } = useArticle(id);
  const { user } = useAuth();

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
      <ArticleSection article={article} />

      {/* 댓글 영역 */}
      <CommentSection type="articles" parentId={id} user={user!} />
    </ArticleWrapper>
  );
}
