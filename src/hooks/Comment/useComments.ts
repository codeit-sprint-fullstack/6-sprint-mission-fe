import { commentService } from "@/api/commentService";
import { Comment } from "@/types/comment";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useComments(type: string, parentId: string, limit = 10) {
  const queryClient = useQueryClient();

  // React Query를 사용한 댓글 목록 조회
  const {
    data: comments = [],
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["comments", type, parentId, limit],
    queryFn: () => commentService.getComments(type, parentId, limit, null),
    staleTime: 5 * 60 * 1000, // 5분간 fresh 상태 유지
    gcTime: 10 * 60 * 1000, // 10분간 캐시 유지
    refetchOnWindowFocus: false,
    retry: 1,
  });

  // 댓글 작성 mutation
  const addCommentMutation = useMutation({
    mutationFn: (content: Comment["content"]) =>
      commentService.createComment(type, parentId, content),
    onSuccess: () => {
      // 댓글 목록 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: ["comments", type, parentId],
        exact: false,
      });
    },
    onError: (error) => {
      console.error("댓글 작성 실패:", error);
    },
  });

  // 댓글 수정 mutation
  const updateCommentMutation = useMutation({
    mutationFn: ({
      commentId,
      content,
    }: {
      commentId: string;
      content: string;
    }) => commentService.updateComment(commentId, content),
    onSuccess: () => {
      // 댓글 목록 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: ["comments", type, parentId],
        exact: false,
      });
    },
    onError: (error) => {
      console.error("댓글 수정 실패:", error);
    },
  });

  // 댓글 삭제 mutation
  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: string) => commentService.deleteComment(commentId),
    onSuccess: () => {
      // 댓글 목록 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: ["comments", type, parentId],
        exact: false,
      });
    },
    onError: (error) => {
      console.error("댓글 삭제 실패:", error);
    },
  });

  // 댓글 작성 함수
  const addComment = async (content: Comment["content"]) => {
    return addCommentMutation.mutateAsync(content);
  };

  // 댓글 수정 함수
  const updateComment = async (
    targetCommentId: Comment["id"],
    editContent: Comment["content"]
  ) => {
    return updateCommentMutation.mutateAsync({
      commentId: targetCommentId,
      content: editContent,
    });
  };

  // 댓글 삭제 함수
  const deleteComment = async (targetCommentId: Comment["id"]) => {
    return deleteCommentMutation.mutateAsync(targetCommentId);
  };

  return {
    comments,
    loading,
    error: error
      ? error instanceof Error
        ? error.message
        : "댓글을 불러오는데 실패했습니다."
      : null,
    hasMore: false, // 페이지네이션은 일단 제거
    addComment,
    updateComment,
    deleteComment,
    loadMore: () => {}, // 페이지네이션은 일단 제거
    refetch,

    // 로딩 상태
    isAddingComment: addCommentMutation.isPending,
    isUpdatingComment: updateCommentMutation.isPending,
    isDeletingComment: deleteCommentMutation.isPending,
  };
}
