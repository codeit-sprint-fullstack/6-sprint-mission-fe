"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { updateProducts } from "@/api/Product/Product";
import { useQuery } from "@tanstack/react-query";

function RegistrationPage() {
  const router = useRouter();
  const { id } = useParams();
  const {
    data: item,
    isPending: itemPending,
    error: itemError,
  } = useQuery({
    queryKey: ["items", id],
    queryFn: () => fetchProduct(id),
    meta: { name: "상품 정보 가져오기" },
  });

  const [formData, setFormData] = useState({
    images: "",
    name: "",
    description: "",
    price: "",
    tags: "",
  });

  useEffect(() => {
    if (item) {
      setFormData({
        images: item.images ?? "",
        name: item.name ?? "",
        description: item.description ?? "",
        price: item.price?.toString() ?? "",
        tags: item.tags?.join(", ") ?? "",
      });
    }
  }, [item]);
  if (itemPending) return <p>상품 정보 불러오는 중...</p>;
  if (itemError) return <p>상품 정보 로드 오류!</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      images: [], // 실제 데이터 넣고 싶으면 수정
      name: formData.name.trim(),
      description: formData.description.trim(),
      price: Number(formData.price),
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ""),
    };

    console.log("제출할 payload:", payload);

    try {
      const res = await updateProducts(id, payload);
      console.log("성공:", res);
      router.push("/items");
    } catch (err) {
      console.error("에러 발생:", err);
    }
  };

  const isFormComplete =
    formData.name.trim() !== "" &&
    formData.description.trim() !== "" &&
    Number(formData.price) > 0 &&
    formData.tags.trim() !== "";

  return (
    <div className="flex flex-col w-full max-w-[40rem] items-center mx-auto mt-[1.5rem] px-4">
      <form
        className="w-full flex flex-col justify-center items-center gap-6 md:gap-8 lg:gap-10"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
            상품 수정하기
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
            수정
          </button>
        </div>
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

        <div className="w-full flex flex-col gap-2">
          <label className="font-semibold text-base md:text-lg">태그</label>
          <input
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full rounded p-3 bg-gray-100 focus:outline-none"
            placeholder="태그를 입력해주세요"
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
