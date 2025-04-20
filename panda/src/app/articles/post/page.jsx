/**
 * 나중에 userId 설정 바꿔야 함!
 */

"use client";

import Button from "@/components/Button";
import { Title20, Title18 } from "@/components/text/text";
import React, { useState } from "react";
import "./../../../components/css/input.scss";
import { useRouter } from "next/navigation";

function PostArticle() {
  const router = useRouter(); // 페이지 이동용

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const isValid = title.trim() !== "" && content.trim() !== "";

  // 글쓰기 (버튼 조작)
  const handlePost = async () => {
    if (!isValid) return; // 글 안 썼으면 넘어가면 안 돼!

    // POST
    try {
      const response = await fetch("http://localhost:3002/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          userId: 1, // 나중에 바꿀 것!
        }),
      });

      if (!response.ok) {
        throw new Error(response.status);
      }

      const data = await response.json();
      const articleId = data.id;
      console.log("요청 URL:", "http://localhost:3002/articles");

      // 상세 페이지로 이동
      router.push(`/articles/${articleId}`);
    } catch (error) {
      console.error(error);
      alert("게시글 등록에 실패했습니다.");
    }
  };

  return (
    <main className="p-[32px] w-full lg:w-[1200px] lg:px-[200px] lg:mx-auto">
      {/* 제목 + 등록 버튼 */}
      <div className="flex justify-between items-center mb-[40px]">
        <Title20 color="gray800">게시글 쓰기</Title20>
        <Button size="sm" disabled={!isValid} onClick={handlePost}>
          등록
        </Button>
      </div>
      {/* 본문 */}
      <div>
        <Title18 color="gray800" className="mb-2">
          *제목
        </Title18>
        <input
          placeholder="제목을 입력해주세요"
          className="input h-[56px] mb-[20px]"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div>
        <Title18 color="gray800" className="mb-2">
          *내용
        </Title18>
        <textarea
          placeholder="내용을 입력해주세요"
          className="input h-[343px] md:h-[282px]"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
      </div>
    </main>
  );
}

export default PostArticle;
