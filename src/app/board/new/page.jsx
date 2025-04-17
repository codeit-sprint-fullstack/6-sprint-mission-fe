"use client";

import React, { useState } from "react";

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const isValid = title.trim() !== "" && content.trim() !== "";

  const handleSubmit = () => {
    if (!isValid) return;
    // TODO: post API 호출
    console.log("제출됨!", { title, content });
  };

  return (
    <main className="w-full max-w-[1200px] mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">게시글 쓰기</h2>
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className={`w-[88px] h-[42px] text-[16px] font-[600] rounded-[8px] ${
            isValid
              ? "bg-primary-100 text-white hover:bg-primary-200"
              : "bg-gray-300 text-white cursor-not-allowed"
          }`}
        >
          등록
        </button>
      </div>

      {/* 제목 */}
      <label className="block text-sm font-semibold text-secondary-700 mb-1">
        *제목
      </label>
      <input
        type="text"
        placeholder="제목을 입력해주세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full h-[48px] bg-gray-100 rounded-lg px-4 mb-6 outline-none"
      />

      {/* 내용 */}
      <label className="block text-sm font-semibold text-secondary-700 mb-1">
        *내용
      </label>
      <textarea
        placeholder="내용을 입력해주세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-[200px] bg-gray-100 rounded-lg px-4 py-2 resize-none outline-none"
      />
    </main>
  );
}
