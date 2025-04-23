"use client";

import { createArticle, getArticle, updateArticle } from "@/lib/api/articleApi";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function ArticleForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const isEditPage = pathname.includes("/edit");

  useEffect(() => {
    if (isEditPage && params?.id) {
      getArticleById();
    }
  }, [pathname, params?.id]);

  const getArticleById = async () => {
    const data = await getArticle(params.id);
    setTitle(data.title);
    setContent(data.content);
  };

  const handleSubmit = async ({ title, content }) => {
    if (isEditPage) {
      const updatedArticle = await updateArticle(params.id, { title, content });
      router.push(`/board/${updatedArticle.id}`);
    } else {
      const newArticle = await createArticle({ title, content });
      router.push(`/board/${newArticle.id}`);
    }
  };

  return (
    <form
      className="p-4 mb-[965px]"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit({ title, content });
      }}
    >
      <nav className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">
          {isEditPage ? "게시글 수정하기" : "게시글 등록하기"}
        </h2>
        <button
          className="btn-base"
          type="submit"
          disabled={!title || !content}
        >
          {isEditPage ? "수정" : "등록"}
        </button>
      </nav>
      <section className="space-y-4">
        <div>
          <h3 className="text-sm font-bold mb-3">*제목</h3>
          <input
            className="w-full px-6 py-4 rounded-xl bg-gray-100 font-normal"
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <h3 className="text-sm font-bold mb-3">*내용</h3>
          <textarea
            className="w-full h-[200px] px-6 py-4 rounded-xl bg-gray-100 font-normal resize-none"
            placeholder="내용을 입력해주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </section>
    </form>
  );
}

export default ArticleForm;
