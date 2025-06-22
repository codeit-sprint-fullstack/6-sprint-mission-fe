"use client";

import React, { useState, useEffect } from "react";
import axiosInstance from "@/api/axiosInstance";
import { useRouter } from "next/navigation";

export default function CreateArticle() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsFormValid(!!title && !!content);
  }, [title, content]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axiosInstance.post("/articles", {
        title,
        content,
      });

      alert("게시글이 등록되었습니다.");
      router.push("/articles");
    } catch (error) {
      console.error("게시글 등록 실패:", error);
      alert("등록에 실패했습니다.");
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto p-6 bg-white">
      <div className="flex flex-row justify-between pb-[37px]">
        <h2 className="text-2xl font-semibold mb-4">게시글 쓰기</h2>
        <button
          type="submit"
          onClick={handleSubmit}
          className={`py-2 px-[23px] rounded-lg focus:outline-none ${
            isFormValid
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-400 text-gray-600 cursor-not-allowed"
          }`}
          disabled={!isFormValid}
        >
          등록
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4 pb-6">
          <label
            htmlFor="title"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            * 제목
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해주세요"
            className="w-full p-3 px-6 bg-gray-100 rounded-xl border-none focus:outline-none placeholder-secondary-400"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="content"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            * 내용
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력해주세요"
            rows={5}
            className="w-full p-3 px-6 bg-gray-100 border-none rounded-xl resize-none focus:outline-none placeholder-secondary-400"
          />
        </div>
      </form>
    </div>
  );
} 