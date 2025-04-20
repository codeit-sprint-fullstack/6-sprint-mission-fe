"use client";

import ArticleDetail from "@/components/ArticleDetail";
import { CommentForm } from "@/components/CommentForm";

import React, { useState } from "react";

const ArticlePage = () => {
  const [comments, setComments] = useState([]);

  // 댓글 제출 처리 함수
  const handleCommentSubmit = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  return (
    <div className="container mx-auto p-4">
      <ArticleDetail />{" "}
      {/* ArticleDetail 컴포넌트는 하드코딩된 데이터를 포함하고 있음 */}
      <div className="mt-8">
        <CommentForm onSubmit={handleCommentSubmit} />
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold">댓글</h3>
        <ul className="mt-4 space-y-4">
          {comments.map((comment, index) => (
            <li key={index} className="p-4 bg-gray-100 rounded-md">
              {comment}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ArticlePage;
