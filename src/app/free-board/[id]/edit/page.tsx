"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getArticle, updateArticle } from "@/lib/articleApi";
import { use } from "react";

interface EditArticlePageProps {
  params: Promise<{ id: string }>;
}

export default function EditArticlePage({ params }: EditArticlePageProps) {
  const unwrappedParams = use(params);
  const id = Number(unwrappedParams.id);
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const isFormValid = title.trim() !== "" && content.trim() !== "";

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    setToken(storedToken);
    fetchArticle();
  }, []);

  const fetchArticle = async () => {
    try {
      const articleData = await getArticle(id);
      setTitle(articleData.title);
      setContent(articleData.content);
      setLoading(false);
    } catch (error) {
      console.error("게시글을 불러오는데 실패했습니다:", error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || !token) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const formData = { title, content };
      const response = await updateArticle(id, formData, token);

      if (response && response.id) {
        setTimeout(() => {
          router.push(`/free-board/${response.id}`);
        }, 1000);
      }
    } catch (error) {
      console.error("게시글 수정 중 오류 발생:", error);
    }
  };

  if (loading) {
    return <div className="max-w-[1200px] mx-auto mt-[24px]">로딩 중...</div>;
  }

  return (
    <div className="max-w-[1200px] mx-auto mt-[24px] max-h-[1920px] mb-auto">
      <div className="flex items-center justify-between mb-[32px]">
        <h1 className="text-[20px] font-bold">게시글 수정</h1>
        <button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={`cursor-pointer px-[23px] py-[8px] rounded-[8px] text-[16px] font-semibold ${
            isFormValid
              ? "bg-primary text-white hover:bg-blue-700"
              : "bg-primary-400 text-white cursor-not-allowed"
          }`}
        >
          수정
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
            rows={10}
            placeholder="내용을 입력하세요"
          />
        </div>
      </form>
    </div>
  );
}
