"use client";

import React, { useState } from "react";
import ArticleDetail from "@/components/ArticleDetail";
import { Comment } from "@/components/CommentForm";
import { useRouter } from "next/navigation";
import { TbArrowBack } from "react-icons/tb";
import Image from "next/image";

const ArticlePage = () => {
  const router = useRouter();
  const [comments, setComments] = useState([
    // {
    //   author: "똑똑한 판다",
    //   time: "1시간 전",
    //   content: "혹시 사용기간이 어떻게 되실까요?",
    // },
  ]);

  const handleCommentSubmit = (newComment) => {
    const newEntry = {
      author: "현재 사용자",
      time: new Date().toLocaleString(),
      content: newComment,
    };
    setComments([...comments, newEntry]);
  };

  return (
    <div className="max-w-[1200px] mx-auto ">
      <ArticleDetail onSubmit={handleCommentSubmit} />

      <div className="mt-6">
        {comments.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-10 text-center text-gray-400">
            <div className="w-35 h-35 relative mb-4">
              <Image
                src="/images/products/emptyComment.png"
                alt="댓글 없음"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-base">아직 댓글이 없어요,</p>
            <p className="text-base">지금 댓글을 달아보세요!</p>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-semibold">댓글</h3>
            <ul className="mt-4 space-y-4">
              {comments.map((c, index) => (
                <li key={index}>
                  <Comment author={c.author} time={c.time} content={c.content} />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* 목록으로 돌아가기 버튼 */}
      <div className="flex justify-center mt-12 mb-10">
        <button
          onClick={() => router.push("/articles")}
          className="bg-blue-500 text-white px-6 py-2 rounded-full flex items-center gap-2"
        >
          목록으로 돌아가기
          <TbArrowBack className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ArticlePage;
