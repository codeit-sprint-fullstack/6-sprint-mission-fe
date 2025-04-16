"use client";

import { createArticle } from "@/lib/api/articleApi";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export function UserLocation() {
  const [location, setLocation] = useState("");

  useEffect(() => {
    // 클라이언트에서만 실행
    setLocation(window.location.href);
  }, []);

  return <div>현재 URL: {location}</div>;
}

function page() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }
    try {
      const article = await createArticle({ title, content });
      router.push(`/board/${article.id}`);
    } catch (e) {
      console.error("게시글 등록이 실패했습니다.", e);
    }
  };

  return (
    <form className="p-4 mb-[965px]" onSubmit={handleSubmit}>
      <nav className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">게시글 등록하기</h2>
        <button
          className="btn-base"
          type="submit"
          disabled={!title || !content}
        >
          등록
        </button>
      </nav>
      <section className="space-y-4">
        <div>
          <h3 className="text-sm font-bold mb-3">*제목</h3>
          <input
            className="w-full px-6 py-4 rounded-xl bg-gray-100 font-normal"
            placeholder="제목을 입력해주세요"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <h3 className="text-sm font-bold mb-3">*내용</h3>
          <textarea
            className="w-full h-[200px] px-6 py-4 rounded-xl bg-gray-100 font-normal resize-none"
            placeholder="내용을 입력해주세요"
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </section>
    </form>
  );
}

export default page;
