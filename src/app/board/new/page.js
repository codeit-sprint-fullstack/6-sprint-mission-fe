"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const isValid = title.trim() && content.trim();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // 미리보기용
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    const res = await fetch("/api/posts", {
      method: "POST",
      body: formData, // JSON이 아닌 FormData로 보냄
    });

    if (res.ok) {
      const newPost = await res.json();
      router.push(`/board/${newPost.id}`);
    } else {
      alert("게시글 등록에 실패했어요.");
    }
  };

  return (
    <main className="max-w-3xl mx-auto p-6">
      {/* 상단 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">게시글 쓰기</h1>
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={!isValid}
          className={`px-5 py-2 rounded-md text-white font-semibold ${
            isValid
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          등록
        </button>
      </div>

      {/* 폼 내용 */}
      <form className="flex flex-col gap-6">
        <div>
          <label className="block font-medium mb-2">* 제목</label>
          <input
            type="text"
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-4 rounded-lg bg-gray-100 text-base outline-none"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">* 내용</label>
          <textarea
            placeholder="내용을 입력해주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-4 h-64 rounded-lg bg-gray-100 text-base outline-none resize-none"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">이미지</label>
          <label className="w-40 h-40 bg-gray-100 rounded-lg flex flex-col items-center justify-center text-gray-400 border border-dashed cursor-pointer overflow-hidden relative hover:opacity-80">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="미리보기"
                className="object-cover w-full h-full"
              />
            ) : (
              <>
                <img
                  src="/icons/ic_plus.svg"
                  alt="이미지 등록 아이콘"
                  className="w-6 h-6 mb-1"
                />
                <span className="text-sm text-gray-400">이미지 등록</span>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute w-full h-full opacity-0 cursor-pointer"
            />
          </label>
        </div>
      </form>
    </main>
  );
}
