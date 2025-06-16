"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { articlesService } from "@/api/articles";

export default function WritePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleSubmit = async () => {
    if (!isFormValid) {
      alert("제목과 내용을 입력해주세요.");
      return;
    } else if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      const formData = {
        title,
        content,
        images: selectedImages,
      };
      await articlesService.createArticle(formData);
      router.push("/community");
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    // 최대 3장까지만 처리
    const remainingSlots = 3 - selectedImages.length;
    if (remainingSlots <= 0) {
      alert("이미지는 최대 3장까지 업로드할 수 있습니다.");
      return;
    }

    const newFiles = files.slice(0, remainingSlots);

    // 기존 이미지에 새 이미지 추가
    setSelectedImages((prev) => [...prev, ...newFiles]);

    // 새 이미지 프리뷰 생성
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    // 특정 인덱스의 이미지 제거
    if (imagePreviews[index]) {
      URL.revokeObjectURL(imagePreviews[index]);
    }

    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (title.trim() && content.trim()) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [title, content]);

  // 컴포넌트가 언마운트될 때 URL 객체 정리
  useEffect(() => {
    return () => {
      imagePreviews.forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, [imagePreviews]);

  return (
    <div className="flex min-h-screen justify-center p-4">
      <div className="w-full max-w-[1200px]">
        {/* 헤더 */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">게시글 쓰기</h1>
          <div className="flex h-[42px]">
            <button
              onClick={() => handleSubmit()}
              disabled={isSubmitting || !isFormValid}
              className="w-full cursor-pointer rounded-md bg-[#3692FF] px-6 py-2 text-[16px] font-medium text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:opacity-70"
            >
              {isSubmitting ? "등록 중..." : "등록"}
            </button>
          </div>
        </div>

        {/* 입력 폼 */}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="image"
              className="mb-2 block text-sm font-bold text-black"
            >
              게시글 이미지 (최대 3장)
            </label>
            <div className="flex flex-wrap gap-4">
              {/* 이미지 프리뷰 */}
              {imagePreviews.map((preview, index) => (
                <div
                  key={index}
                  className="relative h-[200px] w-[200px] overflow-hidden rounded-lg border border-gray-200"
                >
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300"
                  >
                    ✕
                  </button>
                  <Image
                    src={preview}
                    alt={`게시글 이미지 ${index + 1}`}
                    fill
                    sizes="200px"
                    className="object-cover"
                  />
                </div>
              ))}

              {/* 이미지 추가 버튼 (이미지가 3장 미만인 경우에만 표시) */}
              {imagePreviews.length < 3 && (
                <label
                  htmlFor="image-upload"
                  className="flex h-[200px] w-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mb-1 h-8 w-8 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <span className="text-sm text-gray-500">
                      이미지 추가 ({imagePreviews.length}/3)
                    </span>
                  </div>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-bold text-black"
            >
              *제목
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력해주세요"
              className="block w-full rounded-xl border-gray-300 bg-[#f3f4f6] px-6 py-4 placeholder:text-[#9ca3af] focus:outline-blue-300"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="content"
              className="mb-2 block text-sm font-bold text-black"
            >
              *내용
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="내용을 입력해주세요"
              rows={10}
              className="block w-full rounded-xl border-gray-300 bg-[#f3f4f6] px-6 py-4 placeholder:text-[#9ca3af] focus:outline-blue-300"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
