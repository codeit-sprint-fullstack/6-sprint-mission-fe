"use client";

import React, { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { createArticleComment, createProductComment } from "@/lib/actions/comment";
import { getArticleComments, getProductComments } from "@/lib/service/getApi";
import { Comment } from "@/types";

interface CommentSectionProps {
  id: number;
  type: "product" | "article";
}

function CommentSection({ id, type }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const limit = 3;

  const getCommentList = async () => {
    const data =
      type === "product"
        ? await getProductComments(id, limit)
        : await getArticleComments(id, limit);
    const commentList = data.list;
    setComments(commentList);
    setLoading(false);
  };

  useEffect(() => {
    getCommentList();
  }, [id]);

  // 댓글 등록 핸들러
  const handleAddComment = async (content: Comment["content"]) => {
    if (!content.trim()) return;

    if (type === "product") {
      await createProductComment({ productId: id, content });
    } else {
      await createArticleComment({ articleId: id, content });
    }
    getCommentList();
  };

  return (
    <>
      <CommentForm onSubmit={handleAddComment} type={type} />
      {!loading && (
        <CommentList
          comments={comments}
          setComments={setComments}
          getCommentList={getCommentList}
          type={type}
        />
      )}
    </>
  );
}

export default CommentSection;
