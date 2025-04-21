"use client";

import {
  deleteArticleComment,
  getArticleComments,
  patchArticleComment,
  postArticleComment,
} from "@/lib/api/articleComment.api";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const INITIAL_BODY = { content: "" };

export default function Comments() {
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [body, setBody] = useState(INITIAL_BODY);
  const { articleId } = useParams();

  // body 업데이트
  const changeValue = (e) => {
    const { id, value } = e.target;

    setBody((prevBody) => ({ ...prevBody, [id]: value }));
  };

  // 게시글 댓글 조회
  useEffect(() => {
    commentsLoad(articleId);
  }, []);

  const commentsLoad = async (articleId) => {
    const comments = await getArticleComments(articleId);

    if (!comments.length) return setIsLoading(false);

    setIsLoading(false);
    return setComments(comments);
  };

  // 게시글 댓글 작성
  const createArticleComment = async (articleId, body) => {
    const { content } = body;

    const comment = await postArticleComment(articleId, {
      content: content.trim(),
    });

    setComments((prevComments) => [...prevComments, comment]);
    setBody(INITIAL_BODY);
  };

  // 게시글 댓글 수정
  const updateArticleComment = async (articleId, commentId, body) => {
    const { content } = body;

    const updateComment = await patchArticleComment(articleId, commentId, {
      content: content.trim(),
    });

    setComments((prevComments) => {
      return prevComments.map((comment) => {
        if (comment.id === updateComment.id) {
          return { ...comment, content: updateComment.content };
        }
        return comment;
      });
    });
  };

  // 게시글 댓글 삭제
  const removeArticleComment = async (articleId, commentId) => {
    await deleteArticleComment(articleId, commentId);

    const deleteComment = comments.filter(
      (comment) => comment.id !== commentId
    );

    setComments(deleteComment);
  };

  return (
    <div className="flex flex-col w-full gap-[24px] sm:gap-[32px] md:gap-[40px]">
      <CommentCreate
        body={body}
        createArticleComment={createArticleComment}
        changeValue={changeValue}
      />
      <CommentList
        isLoading={isLoading}
        comments={comments}
        updateArticleComment={updateArticleComment}
        removeArticleComment={removeArticleComment}
      />
    </div>
  );
}
