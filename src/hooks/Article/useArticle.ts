"use client";

import { useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { articlesService } from "../../api/articles";
import { Article, ArticleFormData } from "@/types/article";

export function useArticle(articleId: Article["id"]) {
  const queryClient = useQueryClient();

  // React Query를 사용한 단일 게시글 조회
  const {
    data: article,
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["articles", "detail", articleId],
    queryFn: () => articlesService.getArticle(articleId),
    enabled: !!articleId, // articleId가 있을 때만 쿼리 실행
    staleTime: 5 * 60 * 1000, // 5분간 fresh 상태 유지
    gcTime: 10 * 60 * 1000, // 10분간 캐시 유지
    refetchOnWindowFocus: false,
    retry: 1,
  });

  // 게시글 수정 mutation
  const updateMutation = useMutation({
    mutationFn: (articleData: ArticleFormData) =>
      articlesService.updateArticle(articleId, articleData),
    onSuccess: (updatedArticle) => {
      // 수정된 게시글로 캐시 업데이트
      queryClient.setQueryData(
        ["articles", "detail", articleId],
        updatedArticle
      );

      // 관련 쿼리들 무효화 (게시글 목록에도 반영)
      queryClient.invalidateQueries({
        queryKey: ["articles"],
        exact: false,
      });
    },
    onError: (error) => {
      console.error("게시글 수정 실패:", error);
    },
  });

  // 게시글 삭제 mutation
  const deleteMutation = useMutation({
    mutationFn: () => articlesService.deleteArticle(articleId),
    onSuccess: () => {
      // 삭제된 게시글 캐시 제거
      queryClient.removeQueries({
        queryKey: ["articles", "detail", articleId],
      });

      // 게시글 목록 무효화 (목록에서도 제거되도록)
      queryClient.invalidateQueries({
        queryKey: ["articles"],
        exact: false,
      });
    },
    onError: (error) => {
      console.error("게시글 삭제 실패:", error);
    },
  });

  // 좋아요 추가 mutation
  const likeMutation = useMutation({
    mutationFn: () => articlesService.createLiked(articleId),
    onSuccess: () => {
      // 게시글 상세 페이지 데이터 갱신
      refetch();

      // 게시글 목록 무효화 (좋아요 수 반영)
      queryClient.invalidateQueries({
        queryKey: ["articles"],
        exact: false,
      });
    },
    onError: (error) => {
      console.error("좋아요 추가 실패:", error);
    },
  });

  // 좋아요 취소 mutation
  const unlikeMutation = useMutation({
    mutationFn: () => articlesService.deleteLiked(articleId),
    onSuccess: () => {
      // 게시글 상세 페이지 데이터 갱신
      refetch();

      // 게시글 목록 무효화 (좋아요 수 반영)
      queryClient.invalidateQueries({
        queryKey: ["articles"],
        exact: false,
      });
    },
    onError: (error) => {
      console.error("좋아요 취소 실패:", error);
    },
  });

  // 게시글 수정 함수
  const updateArticle = useCallback(
    async (articleData: ArticleFormData) => {
      if (!articleId) return;
      return updateMutation.mutateAsync(articleData);
    },
    [articleId, updateMutation]
  );

  // 게시글 삭제 함수
  const deleteArticle = useCallback(async () => {
    if (!articleId) return;
    return deleteMutation.mutateAsync();
  }, [articleId, deleteMutation]);

  // 좋아요 토글 함수
  const toggleLike = useCallback(
    async (isLiked: boolean) => {
      if (!articleId) return;

      if (isLiked) {
        return unlikeMutation.mutateAsync();
      } else {
        return likeMutation.mutateAsync();
      }
    },
    [articleId, likeMutation, unlikeMutation]
  );

  return {
    // 데이터
    article,
    loading,
    error: error
      ? error instanceof Error
        ? error.message
        : "알 수 없는 오류"
      : null,

    // 액션
    updateArticle,
    deleteArticle,
    toggleLike, // 새로 추가된 좋아요 토글 함수
    refetch,

    // 로딩 상태
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isTogglingLike: likeMutation.isPending || unlikeMutation.isPending,
  };
}
