import React from "react";
import Image from "next/image";
import { ImageUploadSectionProps } from "@/types/form";

export default function ImageUploadSection({
  images,
  onImageUpload,
  onRemoveImage,
  maxImages = 3,
  title = "이미지",
}: ImageUploadSectionProps & { title?: string }) {
  const uploadId = `image-upload-${title.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div className="flex flex-col gap-2.5">
      <span className="mb-2.5 text-lg font-bold">{title}</span>
      <div className="flex flex-wrap gap-4">
        {/* 이미지 프리뷰 목록 */}
        {images.map((image, index) => (
          <div
            key={index}
            className="relative h-[200px] w-[200px] overflow-hidden rounded-lg border border-gray-200"
          >
            <button
              type="button"
              onClick={() => onRemoveImage(index)}
              className="absolute top-1 right-1 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              ✕
            </button>
            <Image
              src={image.preview}
              alt={`${title} 이미지`}
              fill
              sizes="200px"
              className="object-cover"
            />
          </div>
        ))}

        {/* 이미지 추가 버튼 */}
        {images.length < maxImages && (
          <label
            htmlFor={uploadId}
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
              <span className="text-sm text-gray-500">이미지 추가</span>
            </div>
            <input
              id={uploadId}
              type="file"
              accept="image/*"
              onChange={onImageUpload}
              className="hidden"
            />
          </label>
        )}
      </div>
    </div>
  );
}
