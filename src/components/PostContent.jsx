"use client";

import React, { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Image from "next/image";
import { postComment } from "@/api/article.api";

export default function PostContent({ post, onCommentPosted }) {
  const [comment, setComment] = useState("");

  const isValid = comment.trim() !== "";

  const handleCommentSubmit = async () => {
    if (!isValid || !post?.id) return;
    try {
      await postComment(post.id, comment);
      setComment("");
      onCommentPosted?.(); // 댓글 새로고침 요청
    } catch (e) {
      console.error("댓글 등록 실패", e);
    }
  };

  return (
    <section className="w-full max-w-[1200px] mx-auto mt-[34px]  relative">
      {/* 점 세 개 버튼 */}
      <button
        className="absolute top-1 right-1 text-secondary-400 hover:text-secondary-600"
        onClick={() => console.log("옵션 열기")}
        aria-label="게시물 옵션"
      >
        <HiOutlineDotsVertical size={24} />
      </button>

      {/* 제목 */}
      <h1 className="text-xl font-bold mb-4">{post.title}</h1>

      {/* 작성자 정보 + 날짜 + 좋아요 */}
      <div className="flex items-center text-sm font-medium text-secondary-600 pb-4 border-b border-gray-200">
        {/* 작성자 + 날짜 */}
        <div className="flex items-center gap-4">
          {/* 프로필 이미지 */}
          <div className="relative w-[40px] h-[40px]">
            <Image
              src="/images/profile.png"
              alt="profile"
              fill
              className="object-cover"
            />
          </div>
          {/* 이름, 날짜 */}
          <span className="text-sm font-medium text-secondary-600">
            {post.author}
          </span>
          <span className="text-sm font-[400] text-secondary-400">
            {post.date}
          </span>
          {/* 세로 라인 */}
          <div className="w-[1px] h-[34px] bg-gray-200 mx-8" />
        </div>

        {/* 좋아요 박스 */}
        <div className="flex items-center gap-1 px-3 py-1 border border-secondary-200 rounded-full text-secondary-500 text-[16px] font-medium">
          <AiOutlineHeart size={32} />
          <span>{post.likes}</span>
        </div>
      </div>

      {/* 본문 내용 */}
      <p className="font-[400] text-[18px] text-secondary-800 mt-6 mb-8 whitespace-pre-wrap">
        {post.content}
      </p>

      {/* 댓글 입력창 */}
      <div className="mb-10 font-[600] text-[16px] text-gray-900">
        <div className="mb-2">댓글달기</div>
        <textarea
          placeholder="댓글을 입력해주세요."
          className="w-full bg-gray-100 rounded-[12px] px-6 py-3 h-[104px] resize-none outline-none text-[16px] font-[400] placeholder-secondary-400"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="flex justify-end mt-4">
          <button
            onClick={handleCommentSubmit}
            disabled={!isValid}
            className={`w-[74px] h-[42px] rounded-lg text-[16px] font-semibold ${
              isValid
                ? "bg-primary-100 text-white hover:bg-primary-200"
                : "bg-gray-400 text-white cursor-not-allowed"
            }`}
          >
            등록
          </button>
        </div>
      </div>
    </section>
  );
}
