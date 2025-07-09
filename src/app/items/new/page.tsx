"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import TagInput from "@/components/ui/TagInput";
import { createProduct } from "@/api/item.api.js";
import Image from "next/image";

interface FormState {
  name: string;
  description: string;
  price: string;
  tags: string[];
  imageFiles: File[];
  imagePreviewUrls: string[];
}

interface FormErrors {
  name?: string;
  description?: string;
  price?: string;
  tags?: string;
  images?: string;
}

export default function NewItemPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    description: "",
    price: "",
    tags: [],
    imageFiles: [], // ← File 객체들을 저장
    imagePreviewUrls: [], // ← 미리보기 URL들
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // 유효성 검사 수정
  useEffect(() => {
    const formHasRequiredFields =
      !!form.name &&
      !!form.description &&
      !!form.price &&
      form.tags.length > 0 &&
      form.imageFiles.length > 0; // ← imageFiles로 변경

    const formHasNoErrors = Object.keys(errors).length === 0;
    setIsFormValid(formHasRequiredFields && formHasNoErrors);
  }, [form, errors]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (form.name.length < 2 || form.name.length > 10) {
      newErrors.name = "2자 이상 10자 이내로 입력해주세요";
    }
    if (form.description.length < 10) {
      newErrors.description = "10자 이상 입력해주세요.";
    }
    if (!/^\d+$/.test(form.price)) {
      newErrors.price = "숫자로 입력해주세요.";
    } else if (Number(form.price) <= 0) {
      newErrors.price = "가격은 0보다 커야 합니다.";
    }
    if (form.tags.length === 0) {
      newErrors.tags = "태그를 1개 이상 입력해주세요.";
    }
    if (form.imageFiles.length === 0) {
      // ← imageFiles로 변경
      newErrors.images = "이미지를 1개 이상 등록해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // 실시간 유효성 검사
    setErrors((prev) => {
      const updatedErrors = { ...prev };

      if (name === "name") {
        if (value.length < 2 || value.length > 10) {
          updatedErrors.name = "2자 이상 10자 이내로 입력해주세요";
        } else {
          delete updatedErrors.name;
        }
      }

      if (name === "description") {
        if (value.length < 10) {
          updatedErrors.description = "10자 이상 입력해주세요.";
        } else {
          delete updatedErrors.description;
        }
      }

      if (name === "price") {
        if (!/^\d+$/.test(value)) {
          updatedErrors.price = "숫자로 입력해주세요.";
        } else if (Number(value) <= 0) {
          updatedErrors.price = "가격은 0보다 커야 합니다.";
        } else {
          delete updatedErrors.price;
        }
      }

      return updatedErrors;
    });
  };

  // 이미지 처리 함수 수정
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    // 현재 이미지 개수 확인
    const currentImageCount = form.imageFiles.length;
    const remainingSlots = 3 - currentImageCount;
    const filesToAdd = files.slice(0, remainingSlots);

    if (files.length > remainingSlots) {
      alert(`이미지는 최대 3개까지 등록 가능합니다.`);
    }

    // 새로운 미리보기 URL 생성
    const newPreviewUrls = filesToAdd.map((file) => URL.createObjectURL(file));

    setForm((prev) => ({
      ...prev,
      imageFiles: [...prev.imageFiles, ...filesToAdd], // ← File 객체들
      imagePreviewUrls: [...prev.imagePreviewUrls, ...newPreviewUrls], // ← 미리보기 URL들
    }));

    // 에러 제거
    setErrors((prev) => {
      const updatedErrors = { ...prev };
      delete updatedErrors.images;
      return updatedErrors;
    });

    // input을 리셋하여 같은 파일을 다시 선택할 수 있게 함
    e.target.value = "";
  };

  // 이미지 제거 함수
  const handleRemoveImage = (indexToRemove: number) => {
    // 미리보기 URL 해제
    URL.revokeObjectURL(form.imagePreviewUrls[indexToRemove]);

    setForm((prev) => ({
      ...prev,
      imageFiles: prev.imageFiles.filter((_, i) => i !== indexToRemove),
      imagePreviewUrls: prev.imagePreviewUrls.filter(
        (_, i) => i !== indexToRemove
      ),
    }));
  };

  const handleAddTag = (tag: string) => {
    if (!form.tags.includes(tag)) {
      const updatedTags = [...form.tags, tag];
      setForm((prev) => ({ ...prev, tags: updatedTags }));

      setErrors((prev) => {
        const updatedErrors = { ...prev };
        delete updatedErrors.tags;
        return updatedErrors;
      });
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const updatedTags = form.tags.filter((tag) => tag !== tagToRemove);
    setForm((prev) => ({ ...prev, tags: updatedTags }));

    setErrors((prev) => {
      const updatedErrors = { ...prev };
      if (updatedTags.length === 0) {
        updatedErrors.tags = "태그를 1개 이상 입력해주세요.";
      } else {
        delete updatedErrors.tags;
      }
      return updatedErrors;
    });
  };
  // 폼 제출 함수 수정
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    // FormData 생성
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("tags", JSON.stringify(form.tags));

    // File 객체들 추가
    form.imageFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      await createProduct(formData);

      // 미리보기 URL들 해제
      form.imagePreviewUrls.forEach((url) => URL.revokeObjectURL(url));
      router.push("/items");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("알 수 없는 에러입니다.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // 컴포넌트 언마운트 시 미리보기 URL 정리
  useEffect(() => {
    return () => {
      form.imagePreviewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [form.imagePreviewUrls]);

  return (
    <main className="max-w-[1200px] mx-auto px-4 py-8">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">상품 등록하기</h1>
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className="bg-primary-100 text-white px-6 py-2 rounded disabled:opacity-50"
          >
            {isSubmitting ? "등록 중..." : "등록"}
          </button>
        </div>

        {/* 상품 이미지 등록 */}
        <div className="mb-8">
          <label className="block text-[18px] font-[700] mb-4">
            상품 이미지
          </label>
          <div className="flex gap-6">
            {/* 이미지 추가 버튼 - 3개 미만일 때만 표시 */}
            {form.imageFiles.length < 3 && (
              <label className="w-[282px] h-[282px] flex flex-col items-center justify-center rounded-[12px] bg-gray-100 text-gray-400 cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange} // ← 올바른 함수 사용
                  className="hidden"
                />
                <span className="text-[50px] leading-none mb-3">+</span>
                <span className="text-[16px] text-secondary-400 font-[400]">
                  이미지 등록
                </span>
              </label>
            )}
            {/* 등록된 이미지 미리보기 */}
            {form.imagePreviewUrls.map((url, idx) => (
              <div key={idx} className="relative w-[282px] h-[282px]">
                <Image
                  src={url}
                  alt={`preview-${idx}`}
                  className="w-full h-full object-cover rounded-md"
                  fill
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)} // ← 올바른 함수 사용
                  className="absolute top-3 right-3 bg-secondary-400 bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <Input
            label="상품명"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="상품명을 입력해 주세요"
            error={errors.name}
          />

          <Input
            label="상품 소개"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="상품 소개를 입력해 주세요"
            isTextArea
            error={errors.description}
            className="h-[282px]"
          />

          <Input
            label="판매 가격"
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="판매 가격을 입력해 주세요"
            error={errors.price}
          />

          <TagInput
            tags={form.tags}
            onAddTag={handleAddTag}
            onRemoveTag={handleRemoveTag}
            error={errors.tags}
          />
        </div>
      </form>
    </main>
  );
}
