"use client";

import { useRef } from "react";

export default function ProductImageUploader({ images, setImages }) {
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    const imageFiles = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...imageFiles]);
  };

  const handleRemove = (index) => {
    const updated = [...images];
    updated.splice(index, 1);
    setImages(updated);
  };

  return (
    <div>
      <label className="block text-base font-semibold text-gray-800 mb-3">
        상품 이미지
      </label>

      <div className="flex flex-wrap gap-4">
        <div
          onClick={() => fileInputRef.current.click()}
          className="cursor-pointer flex flex-col items-center justify-center w-[282px] h-[282px] bg-gray-100 text-gray-400 rounded-xl hover:bg-gray-200 transition"
        >
          <span className="text-3xl">＋</span>
          <span className="mt-1 text-sm">이미지 등록</span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        {images.map((img, idx) => (
          <div
            key={idx}
            className="relative w-[282px] h-[282px] rounded-xl overflow-hidden bg-gray-100"
          >
            <img
              src={img.preview}
              alt={`preview-${idx}`}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => handleRemove(idx)}
              className="absolute top-2 right-2 bg-white bg-opacity-80 text-gray-700 rounded-full p-1 hover:text-red-500 transition"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
