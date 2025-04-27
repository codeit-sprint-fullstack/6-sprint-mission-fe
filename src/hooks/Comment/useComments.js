import { commentService } from "@/api/commentService";
import { useState, useEffect, useCallback } from "react";

export function useComments(type, parentId, limit = 10) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchComments = useCallback(
    async (refresh = false) => {
      try {
        setLoading(true);
        setError(null);

        const currentCursor = refresh ? null : cursor;
        const result = await commentService.getComments(
          type,
          parentId,
          limit,
          currentCursor,
        );
        const list = result?.list || [];
        const newCursor = result?.nextCursor || null;

        if (refresh) {
          setComments(list);
        } else {
          setComments((prev) => [...prev, ...list]);
        }
        setCursor(newCursor);
        setHasMore(!!newCursor && list.length > 0);
      } catch (error) {
        setError(error.message || "댓글을 불러오는데 실패했습니다.");
        console.error("댓글 목록 조회 실패:", error);
      } finally {
        setLoading(false);
      }
    },
    [type, parentId, cursor, limit],
  );

  const refetch = useCallback(() => {
    setCursor(null);
    setHasMore(true);
    fetchComments(true);
  }, [fetchComments]);

  const addComment = async (content) => {
    try {
      setLoading(true);
      setError(null);

      await commentService.createComment(type, parentId, content);
      refetch(); // 🔥 바로 refetch
    } catch (error) {
      setError(error.message || "댓글 작성에 실패했습니다.");
      console.error("댓글 작성 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateComment = async (targetCommentId, editContent) => {
    try {
      setLoading(true);
      setError(null);

      await commentService.updateComment(targetCommentId, editContent);
      refetch(); // 🔥 바로 refetch
    } catch (error) {
      setError(error.message || "댓글 수정에 실패했습니다.");
      console.error("댓글 수정 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteComment = async (targetCommentId) => {
    try {
      setLoading(true);
      setError(null);

      await commentService.deleteComment(targetCommentId);
      refetch(); // 🔥 바로 refetch
    } catch (error) {
      setError(error.message || "댓글 삭제에 실패했습니다.");
      console.error("댓글 삭제 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  // 아직 적용 전
  const loadMore = () => {
    if (!loading && hasMore) fetchComments(false);
  };

  useEffect(() => {
    fetchComments(true);
  }, [fetchComments]);

  return {
    comments,
    loading,
    error,
    hasMore,
    addComment,
    updateComment,
    deleteComment,
    loadMore,
    refetch,
  };
}
