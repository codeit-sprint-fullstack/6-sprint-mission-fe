"use client";

import { getArticle, patchArticle } from "@/lib/api";
import { use, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function EditArticlePage(props) {
  const { id } = use(props.params);
  const articleId = Number(id);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const isFormValid = title.trim() !== "" && content.trim() !== "";

  useEffect(() => {
    async function fetchArticle() {
      try {
        const data = await getArticle(articleId);
        setTitle(data.title);
        setContent(data.content);
      } catch (error) {
        alert("게시글 정보를 불러오지 못했습니다.");
      }
    }

    if (articleId) fetchArticle();
  }, [articleId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      await patchArticle(articleId, { title, content });
      router.push(`/free-board/${articleId}`);
    } catch (error) {
      alert("게시글 수정에 실패했습니다.");
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto mt-[24px] max-h-[1920px] mb-auto">
      <div className="flex items-center justify-between mb-[32px]">
        <h1 className="text-[20px] font-bold">게시글 수정</h1>
        <button
          onClick={handleUpdate}
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

      <form onSubmit={handleUpdate} className="flex flex-col">
        <div className="mb-[24px]">
          <label
            htmlFor="title"
            className="block text-[18px] font-semibold mb-[12px]"
          >
            *제목
          </label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-[24px] py-[15px] text-[16px] bg-primary-100 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="제목을 입력하세요"
          />
        </div>
        <div>
          <label
            htmlFor="content"
            className="block text-[18px] font-semibold mb-[12px]"
          >
            *내용
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="10"
            className="w-full px-[24px] pt-[16px] text-[16px] bg-primary-100 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="내용을 입력하세요"
          />
        </div>
      </form>
    </div>
  );
}
