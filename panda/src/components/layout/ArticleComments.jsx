"use client";

import React, { useEffect, useState } from "react";
import { Title20 } from "../text/text";
import "../css/input.scss";
import Button from "../Button";
import CommentBox from "../CommentBox";

function Comments({ articleId }) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  const baseUrl = "http://localhost:3002/comments/articles";

  // 댓글 목록 불러오기
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`${baseUrl}/${articleId}`);

        if (!response.ok) throw new Error("댓글 불러오기 실패");

        const data = await response.json();
        setComments(data.comments);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComments();
  }, [articleId]);

  // 댓글 작성
  const handlePostComment = async () => {
    if (commentText.trim() === "") return;

    try {
      const response = await fetch(`${baseUrl}/${articleId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: commentText }),
      });

      if (!response.ok) throw new Error("댓글 등록 실패");

      const newComment = await response.json();
      setComments((prev) => [...prev, newComment]);
      setCommentText("");
    } catch (error) {
      console.error(error);
      alert("댓글 등록 실패");
    }
  };

  return (
    // 댓글 등록
    <section>
      <Title20 className="mb-2">댓글달기</Title20>
      <textarea
        placeholder="댓글을 입력해주세요."
        className="input h-[104px] mb-2 relative"
        value={commentText}
        onChange={(event) => setCommentText(event.target.value)}
      ></textarea>
      <Button
        onClick={handlePostComment}
        size="sm"
        className="absolute right-8"
      >
        등록
      </Button>

      {/* 댓글 목록 출력 */}
      {Array.isArray(comments) && comments.length > 0 ? (
        comments.map((comment) => (
          <CommentBox key={comment.id} comment={comment} />
        ))
      ) : (
        // 댓글 없을 때
        <div className="mt-[60px] flex flex-col justify-center items-center">
          <img
            src="/assets/reply_empty.png"
            alt="빈 댓글 이미지"
            className="w-[140px] h-[140px] mb-[20px]"
          />
          <div className="text-center text-gray-400">
            <p>아직 댓글이 없어요.</p>
            <p>지금 댓글을 달아 보세요!</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default Comments;
