"use client";

import { patchArticle, postArticle } from "@/lib/api/article";
import { TArticle } from "@/types";
import { useRouter } from "next/navigation";

import React, { useState } from "react";

interface ArticleFormProps {
  dtitle?: TArticle["title"];
  dcontent?: TArticle["content"];
  articleId?: TArticle["id"] | null;
}

function ArticleForm({
  dtitle = "",
  dcontent = "",
  articleId = null,
}: ArticleFormProps) {
  const [title, setTitle] = useState<TArticle["title"]>(dtitle);
  const [content, setContent] = useState<TArticle["content"]>(dcontent);
  const router = useRouter();
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!articleId) {
      const newArticle = await postArticle({ title, content });
      router.push(`/articles/${newArticle.id}`);
    } else {
      await patchArticle(articleId, { title, content });
      router.push(`/articles/${articleId}`);
    }
  };

  const isValid = title.trim() !== "" && content.trim() !== "";
  return (
    <form className="w-full">
      <div className="flex w-full justify-between">
        <div className="font-bold text-xl text-gray-800">상품 등록하기</div>
        <button
          type="submit"
          className={`${
            !isValid ? "bg-gray-400" : "bg-primary-100"
          } text-white w-18.5 h-10.5 rounded-xl`}
          disabled={!isValid}
          onClick={handleClick}
        >
          등록
        </button>
      </div>
      <div className="flex flex-col mt-6">
        <label className="text-sm text-gray-800 font-bold">*제목</label>
        <input
          className="w-full h-14 bg-gray-100 pl-6 rounded-lg"
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col mt-4">
        <label className="text-sm text-gray-800 font-bold">*내용</label>
        <textarea
          className="w-full h-50 bg-gray-100 pl-6 pt-4 rounded-lg"
          placeholder="내용을 입력해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
    </form>
  );
}

export default ArticleForm;
