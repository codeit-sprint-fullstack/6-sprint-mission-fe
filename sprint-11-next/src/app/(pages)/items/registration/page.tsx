"use client";
import { createProducts, uploadProductImages } from "@/api/Product/Product";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

function RegistrationPage() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [formData, setFormData] = useState({
    images: "",
    name: "",
    description: "",
    price: "",
    tags: "",
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setImageFiles((prev) => [...prev, ...files]);
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => {
      URL.revokeObjectURL(prev[index].url);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. 이미지 먼저 업로드
      const uploadRes = await uploadProductImages(imageFiles); // imageFiles는 useState로 관리 중
      const imageUrls = uploadRes.imageUrls; // 응답 형태에 따라 조정 필요

      // 2. payload 구성
      const payload = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: Number(formData.price),
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag !== ""),
        images: imageUrls, // ✅ 이미지 경로 포함
      };

      // 3. 상품 등록 API 호출
      const res = await createProducts(payload);
      queryClient.invalidateQueries(["items"]);
      router.push("/items");
    } catch (err) {
      console.error("상품 등록 실패", err);
      alert("상품 등록 중 오류가 발생했습니다.");
    }
  };

  const isFormComplete =
    formData.name.trim() !== "" &&
    formData.description.trim() !== "" &&
    Number(formData.price) > 0 &&
    formData.tags.trim() !== "";

  return (
    <div className="flex flex-col w-full max-w-[75rem] items-center mx-auto mt-[1.5rem] px-4">
      <form
        className="w-full flex flex-col justify-center items-center gap-6 md:gap-8 lg:gap-10"
        onSubmit={handleSubmit}
      >
        {/* 상단 헤더 */}
        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
            상품 등록하기
          </h1>
          <button
            type="submit"
            disabled={!isFormComplete}
            className={`px-4 py-2 rounded ${
              isFormComplete
                ? "bg-blue-500 text-white"
                : "bg-gray-400 text-white cursor-not-allowed"
            }`}
          >
            등록
          </button>
        </div>

        {/* 이미지 업로드 */}
        <div className="w-full flex flex-col gap-2">
          <label className="font-semibold text-base md:text-lg">
            상품 이미지
          </label>
          <div className="flex gap-4 flex-wrap">
            <label className="w-[10.5rem] h-[10.5rem] lg:w-[17.625rem] lg:h-[17.625rem] bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer">
              <span className="text-gray-500 text-sm text-center">
                이미지 등록
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageChange}
              />
            </label>

            {imagePreviews.map((img, index) => (
              <div
                key={index}
                className="relative w-[10.5rem] h-[10.5rem] lg:w-[17.625rem] lg:h-[17.625rem]"
              >
                <img
                  src={img.url}
                  alt={`상품 이미지 ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-white rounded-full shadow p-1 text-gray-700"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 상품명 */}
        <div className="w-full flex flex-col gap-2">
          <label className="font-semibold text-base md:text-lg">상품명</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded p-3 bg-gray-100 focus:outline-none"
            placeholder="상품명을 입력해주세요"
          />
        </div>

        {/* 설명 */}
        <div className="w-full flex flex-col gap-2">
          <label className="font-semibold text-base md:text-lg">
            상품 소개
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full rounded p-3 bg-gray-100 h-32 resize-none focus:outline-none"
            placeholder="상품 소개를 입력해주세요"
          />
        </div>

        {/* 가격 */}
        <div className="w-full flex flex-col gap-2">
          <label className="font-semibold text-base md:text-lg">판매가격</label>
          <input
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full rounded p-3 bg-gray-100 focus:outline-none"
            placeholder="판매 가격을 입력해주세요"
            type="number"
          />
        </div>

        {/* 태그 */}
        <div className="w-full flex flex-col gap-2">
          <label className="font-semibold text-base md:text-lg">태그</label>
          <input
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full rounded p-3 bg-gray-100 focus:outline-none"
            placeholder="태그를 입력해주세요 (예: 겨울,니트,데일리)"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.tags
              .split(",")
              .map((tag) => tag.trim())
              .filter((tag) => tag)
              .map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-gray-200 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegistrationPage;
