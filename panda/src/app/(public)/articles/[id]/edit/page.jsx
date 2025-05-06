"use client";

import React, { useState, useEffect } from "react";
import "../../../../components/css/input.scss";
import Button from "../../../../components/Button";
import { Title20, Title18 } from "../../../../components/text/text";
import { useRouter, useParams } from "next/navigation";

function EditPage() {
  const router = useRouter();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 기존 게시글 정보 불러오기
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`http://localhost:3002/articles/${id}`);
        if (!response.ok) throw new Error("데이터 불러오기 실패");

        const data = await response.json();
        setTitle(data.title);
        setContent(data.content);
      } catch (error) {
        console.error(error);
        alert("게시글 정보를 불러오지 못했습니다.");
      }
    };

    fetchArticle();
  }, [id]);

  // 글 수정 (버튼 조작)
  const handleEdit = async () => {
    try {
      const response = await fetch(`http://localhost:3002/articles/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      if (!response.ok) {
        throw new Error("게시글 수정 실패");
      }

      // 수정 후 상세 페이지로 이동
      router.push(`/articles/${id}`);
    } catch (error) {
      console.error(error);
      alert("게시글 수정에 실패했습니다.");
    }
  };

  return (
    <main className="p-[32px] w-full lg:w-[1200px] lg:px-[200px] lg:mx-auto">
      {/* 제목 + 수정 버튼 */}
      <div className="flex justify-between items-center mb-[40px]">
        <Title20 color="gray800">게시글 수정</Title20>
        <Button size="sm" onClick={handleEdit}>
          수정
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
          value={title || ""}
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

export default EditPage;
