"use client";

import React, { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { getArticleComments, getProductComments } from "@/lib/getApi";
import {
  createArticleComment,
  createProductComment,
} from "@/app/actions/comment";

const limit = 3;

function CommentSection({ id, type }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

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
  const handleAddComment = async (content) => {
    if (!content.trim()) return;

    if (type === "product") {
      await createProductComment(id, { content });
    } else {
      await createArticleComment(id, { content });
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
