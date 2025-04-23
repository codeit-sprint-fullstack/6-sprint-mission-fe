"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditPostPage() {
  const router = useRouter();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  // 기존 게시글 정보 불러오기
  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title || "");
        setContent(data.content || "");
        setLoading(false);
      });
  }, [id]);

  const isValid = title.trim() && content.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/posts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      router.push(`/board/${id}`);
    } else {
      alert("수정 실패");
    }
  };

  if (loading) return <p style={{ padding: "2rem" }}>로딩 중...</p>;

  return (
    <main style={{ padding: "2rem" }}>
      <h1>게시글 수정</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <input
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ height: "200px" }}
        />
        <button type="submit" disabled={!isValid}>
          수정 완료
        </button>
      </form>
    </main>
  );
}
