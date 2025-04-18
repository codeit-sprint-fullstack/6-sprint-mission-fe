"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createArticle } from "@/api/articles";

export default function WritePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      alert("제목과 내용을 입력해주세요.");
      return;
    } else if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      await createArticle({ title, content });
      router.push("/community");
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (title.trim() && content.trim()) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [title, content]);

  return (
    <div className="flex min-h-screen justify-center p-4">
      <div className="w-full max-w-[1200px]">
        {/* 헤더 */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">게시글 쓰기</h1>
          <div className="flex h-[42px]">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !isFormValid}
              className="w-full cursor-pointer rounded-md bg-[#3692FF] px-6 py-2 text-[16px] font-medium text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:opacity-70"
            >
              {isSubmitting ? "등록 중..." : "등록"}
            </button>
          </div>
        </div>

        {/* 입력 폼 */}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-bold text-black"
            >
              *제목
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력해주세요"
              className="block w-full rounded-xl border-gray-300 bg-[#f3f4f6] px-6 py-4 placeholder:text-[#9ca3af] focus:outline-blue-300"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="content"
              className="mb-2 block text-sm font-bold text-black"
            >
              *내용
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="내용을 입력해주세요"
              rows="10"
              className="block w-full rounded-xl border-gray-300 bg-[#f3f4f6] px-6 py-4 placeholder:text-[#9ca3af] focus:outline-blue-300"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
