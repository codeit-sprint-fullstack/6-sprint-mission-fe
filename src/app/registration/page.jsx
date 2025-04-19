"use client";

import { postArticle } from "@/lib/api";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateArticlePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const isFormValid = title.trim() !== "" && content.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      const response = await postArticle(title, content);

      if (response && response.id) {
        setTimeout(() => {
          router.push(`/free-board/${response.id}`);
        }, 1000);
      }
    } catch (error) {
      console.error("게시글 등록 중 오류 발생:", error);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto mt-[24px] max-h-[1920px] mb-auto">
      <div className="flex items-center justify-between mb-[32px]">
        <h1 className="text-[20px] font-bold">게시글 쓰기</h1>
        <button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={`cursor-pointer px-[23px] py-[8px] rounded-[8px] text-[16px] font-semibold ${
            isFormValid
              ? "bg-primary text-white hover:bg-blue-700"
              : "bg-primary-400 text-white cursor-not-allowed"
          }`}
        >
          등록
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="mb-[24px]">
          <label
            htmlFor="title"
            className="block text-primary-800 text-[18px] font-semibold mb-[12px]"
          >
            *제목
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-[24px] py-[15px] text-[16px] font-normal bg-primary-100 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="제목을 입력하세요"
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-primary-800 text-[18px] font-semibold mb-[12px]"
          >
            *내용
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-[24px] pt-[16px] text-[16px] font-normal bg-primary-100 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-primary"
            rows="10"
            placeholder="내용을 입력하세요"
          />
        </div>
      </form>
    </div>
  );
}
