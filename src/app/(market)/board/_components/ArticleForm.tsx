"use client";

import { createArticleAction, updateArticleAction } from "@/lib/actions/article";
import { articleService } from "@/lib/service/articleService";
import { Article } from "@/types";
import { Params } from "next/dist/server/request/params";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function ArticleForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams<Params>();
  const isEditPage = pathname.endsWith("/edit");

  useEffect(() => {
    if (!isEditPage || !params?.id) return;

    const fetchArticle = async () => {
      const data = await articleService.getArticle(Number(params.id));
      setTitle(data.title);
      setContent(data.content);
    };
    fetchArticle();
  }, [isEditPage, params?.id]);

  const handleSubmit = async ({
    title,
    content,
  }: {
    title: Article["title"];
    content: Article["content"];
  }) => {
    if (isEditPage) {
      const updatedArticle = await updateArticleAction({
        articleId: Number(params.id),
        params: { title, content },
      });
      router.push(`/board/${updatedArticle.id}`);
    } else {
      const newArticle = await createArticleAction({ params: { title, content } });
      router.push(`/board/${newArticle.id}`);
    }
  };

  return (
    <form
      className="mb-[186px]"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit({ title, content });
      }}
    >
      <nav className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">{isEditPage ? "게시글 수정하기" : "게시글 등록하기"}</h2>
        <button className="btn-base" type="submit" disabled={!title || !content}>
          {isEditPage ? "수정" : "등록"}
        </button>
      </nav>
      <section className="space-y-4">
        <div>
          <h3 className="mb-3 text-sm font-bold">*제목</h3>
          <input
            className="w-full rounded-xl bg-gray-100 px-6 py-4 font-normal"
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <h3 className="mb-3 text-sm font-bold">*내용</h3>
          <textarea
            className="h-[200px] w-full resize-none rounded-xl bg-gray-100 px-6 py-4 font-normal"
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
