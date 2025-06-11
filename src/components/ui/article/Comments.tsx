"use client";

import { getComments } from "@/lib/comment";
import Comment from "./Comment";
import { useEffect, useState } from "react";

interface CommentsProps {
  articleId: string;
  refreshTrigger: boolean;
}

interface CommentData {
  id: string;
  content: string;
}

export default function Comments({ articleId, refreshTrigger }: CommentsProps) {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchComments = async (): Promise<void> => {
    try {
      const res: CommentData[] = await getComments(articleId);
      setComments(res);
    } catch (error) {
      console.error("댓글 불러오기 실패", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [articleId, refreshTrigger]);

  if (loading) return <div> 댓글 로딩중... </div>;

  if (comments.length === 0)
    return (
      <div className="flex flex-row justify-center">
        <img src="/image/ui/noComment.png" />
      </div>
    );

  return (
    <div>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          commentId={comment.id}
          articleId={articleId}
          content={comment.content}
          refreshComments={fetchComments}
        />
      ))}
    </div>
  );
}
