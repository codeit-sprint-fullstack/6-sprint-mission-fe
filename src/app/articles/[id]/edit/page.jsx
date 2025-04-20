"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/api/axiosInstance";

export default function EditArticlePage() {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  // 기존 게시글 내용 불러오기
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await axiosInstance.get(`/articles/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (error) {
        console.error(
          "게시글 불러오기 실패:",
          error.response?.data || error.message
        );
      }
    };

    if (id) fetchArticle();
  }, [id]);

  useEffect(() => {
    setIsFormValid(!!title && !!content);
  }, [title, content]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.patch(`/articles/${id}`, {
        title,
        content,
      });

      alert("게시글이 수정되었습니다.");
      router.push(`/articles/${id}`);
    } catch (error) {
      console.error("게시글 수정 실패:", error.response?.data || error.message);
      alert("게시글 수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto p-6 bg-white">
      <div className="flex flex-row justify-between pb-[37px]">
        <h2 className="text-2xl font-semibold mb-4">게시글 수정</h2>
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
          저장
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
            rows="5"
            className="w-full p-3 px-6 bg-gray-100 border-none rounded-xl resize-none focus:outline-none placeholder-secondary-400"
          />
        </div>
      </form>
    </div>
  );
}
