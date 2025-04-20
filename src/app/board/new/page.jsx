"use client";

import React, { useState } from "react";

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const isValid = title.trim() !== "" && content.trim() !== "";

  const handleSubmit = () => {
    e.preventDefault(); // 새로고침 방지
    if (!isValid) return;

    // TODO: post API 호출
    console.log("제출됨!", { title, content });
  };

  return (
    <main className="w-full max-w-[1200px] mx-auto mt-6">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold mb-[37px] text-secondary-800">
            게시글 쓰기
          </h2>
          <button
            type="submit"
            disabled={!isValid}
            className={`w-[74px] h-[42px] text-[16px] font-[600] rounded-[8px] ${
              isValid
                ? "bg-primary-100 text-white hover:bg-primary-200"
                : "bg-gray-400 text-white cursor-not-allowed"
            }`}
          >
            등록
          </button>
        </div>

        {/* 제목 */}
        <label className="block text-[18px] font-[700] text-secondary-800 mb-3">
          *제목
        </label>
        <input
          type="text"
          placeholder="제목을 입력해주세요"
          value={title}       
          onChange={(e) => setTitle(e.target.value)}
          className="w-full h-[56px] bg-gray-100 rounded-[12px] px-6 py-4 outline-none placeholder-secondary-400"
        />

        {/* 내용 */}
        <label className="block text-[18px] font-[700] text-secondary-800 mb-3 mt-6">
          *내용
        </label>
        <textarea
          placeholder="내용을 입력해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-[282px] bg-gray-100 rounded-[12px] px-6 py-4 resize-none outline-none placeholder-secondary-400"
        />
      </form>
    </main>
  );
}
