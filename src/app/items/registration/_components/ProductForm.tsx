"use client";

import { useState, useRef, useEffect } from "react";
import { TiDelete } from "react-icons/ti";
import Image from "next/image";
import { ProductFormProps } from "@/types/product";

// 이미지 객체 타입 정의
interface ImageObject {
  url?: string;
  file?: File;
  preview: string;
  isExisting: boolean;
}

// 폼 데이터 타입 정의
interface FormData {
  name?: string;
  description?: string;
  price?: string | number;
  tags?: string[];
}

export default function ProductForm({
  initialData,
  onSubmit,
  submitText = "등록",
}: ProductFormProps) {
  const [formData, setFormData] = useState<FormData>(
    initialData || {
      name: "",
      description: "",
      price: "",
      tags: [] as string[],
    }
  );
  const [inputTag, setInputTag] = useState("");
  const [images, setImages] = useState<ImageObject[]>([]);
  const [errors, setErrors] = useState({
    name: false,
    description: false,
    price: false,
    tags: false,
    tagLength: false,
  });

  const inputRef = {
    nameRef: useRef<HTMLInputElement>(null),
    descriptionRef: useRef<HTMLTextAreaElement>(null),
    priceRef: useRef<HTMLInputElement>(null),
    tagRef: useRef<HTMLInputElement>(null),
  };

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);

      // 기존 이미지가 있는 경우 이미지 배열 초기화
      if (
        initialData.images &&
        Array.isArray(initialData.images) &&
        initialData.images.length > 0
      ) {
        const initialImages: ImageObject[] = initialData.images.map(
          (imgUrl) => ({
            url: typeof imgUrl === "string" ? imgUrl : undefined,
            preview: `${process.env.NEXT_PUBLIC_API_URL}${imgUrl}`,
            isExisting: true, // 기존 이미지 표시
          })
        );
        setImages(initialImages);
      }
    }
  }, [initialData]);

  // 이미지 업로드 처리
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImages((prev) => [
        ...prev,
        { file, preview: imageUrl, isExisting: false },
      ]);
    }
  };

  // 이미지 삭제 처리
  const removeImage = (index: number) => {
    const newImages = [...images];
    if (!newImages[index].isExisting) {
      URL.revokeObjectURL(newImages[index].preview); // 로컬 이미지인 경우 메모리 정리
    }
    newImages.splice(index, 1);
    setImages(newImages);
  };

  // 컴포넌트 언마운트 시 메모리 정리
  useEffect(() => {
    return () => {
      images.forEach((image) => {
        if (!image.isExisting && image.preview) {
          URL.revokeObjectURL(image.preview);
        }
      });
    };
  }, []);

  // 각 필드별 유효성 검사 함수
  const validateName = (name: string) => {
    return name.length === 0 || name.length > 10;
  };

  const validateDescription = (description: string) => {
    return description.length < 10;
  };

  const validatePrice = (price: string | number) => {
    return isNaN(Number(price)) || Number(price) <= 0;
  };

  const validateTags = (tags: string[]) => {
    return tags.length === 0;
  };

  // 전체 폼 유효성 검사
  const validateForm = () => {
    const newErrors = {
      name: validateName(formData.name || ""),
      description: validateDescription(formData.description || ""),
      price: validatePrice(formData.price || ""),
      tags: validateTags(formData.tags || []),
      tagLength: errors.tagLength, // 이 값은 태그 입력시에만 변경
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  // 입력값 변경 핸들러 - 변경 시마다 해당 필드 유효성 검사
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    // 변경된 필드에 대한 유효성 검사 수행
    setErrors((prev) => {
      const updatedErrors = { ...prev };

      switch (name) {
        case "name":
          updatedErrors.name = validateName(value);
          break;
        case "description":
          updatedErrors.description = validateDescription(value);
          break;
        case "price":
          updatedErrors.price = validatePrice(value);
          break;
      }

      return updatedErrors;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // 폼 데이터와 이미지 파일을 함께 전달
    onSubmit({
      name: formData.name || "",
      description: formData.description || "",
      price: Number(formData.price) || 0,
      tags: formData.tags || [],
      images: images.filter((img) => !img.isExisting).map((img) => img.file!),
    });
  };

  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputTag(e.target.value);

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!inputTag || (formData.tags && formData.tags.includes(inputTag))) {
        alert("태그가 비었거나 이미 존재하는 태그입니다.");
        setInputTag("");
        return;
      }
      if (inputTag.length > 5) {
        setErrors((prev) => ({ ...prev, tagLength: true }));
        return;
      } else {
        setErrors((prev) => ({ ...prev, tagLength: false }));
      }

      const updatedTags = [...(formData.tags || []), inputTag];
      setFormData((prev) => ({
        ...prev,
        tags: updatedTags,
      }));

      // 태그 추가 후 태그 유효성 검사
      setErrors((prev) => ({ ...prev, tags: validateTags(updatedTags) }));
      setInputTag("");
    }
  };

  const handleDeleteTag = (e: React.MouseEvent, tagToDelete: string) => {
    e.preventDefault();

    const updatedTags = (formData.tags || []).filter((t) => t !== tagToDelete);
    setFormData((prev) => ({
      ...prev,
      tags: updatedTags,
    }));

    // 태그 삭제 후 태그 유효성 검사
    setErrors((prev) => ({ ...prev, tags: validateTags(updatedTags) }));
  };

  const isAllValid =
    !errors.name &&
    !errors.description &&
    !errors.price &&
    !errors.tags &&
    !errors.tagLength;

  return (
    <section className="flex w-full max-w-[1200px] flex-col gap-10 px-5 py-8">
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        {/* 헤더 */}
        <div className="flex w-full justify-between gap-2.5">
          <span className="text-xl font-bold">상품 {submitText}하기</span>
          <button
            className={`w-20 rounded-lg px-5 py-2.5 text-white transition-all duration-300 ${
              isAllValid
                ? "cursor-pointer bg-[#3692ff]"
                : "cursor-not-allowed bg-[#9ca3af]"
            }`}
            disabled={!isAllValid}
            type="submit"
          >
            {submitText}
          </button>
        </div>

        {/* 이미지 업로드 섹션 */}
        <div className="flex flex-col gap-2.5">
          <span className="mb-2.5 text-lg font-bold">상품 이미지</span>
          <div className="flex flex-wrap gap-4">
            {/* 이미지 프리뷰 목록 */}
            {images.map((image, index) => (
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
                  src={image.preview}
                  alt="상품 이미지"
                  fill
                  sizes="200px"
                  className="object-cover"
                />
              </div>
            ))}

            {/* 이미지 추가 버튼 3개까지 등록 가능*/}
            {images.length < 3 && (
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
                  <span className="text-sm text-gray-500">이미지 추가</span>
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

        {/* 상품명 */}
        <div className="flex flex-col gap-2.5">
          <span className="mb-2.5 text-lg font-bold">상품명</span>
          <input
            className={`h-14 w-full rounded-xl border-none bg-[#f3f4f6] p-5 text-[#1f2937] focus:outline-none ${
              errors.name ? "border border-[#f74747]" : ""
            }`}
            name="name"
            type="text"
            required
            value={formData.name || ""}
            ref={inputRef.nameRef}
            placeholder="상품명을 입력해주세요."
            onChange={handleChange}
          />
          {errors.name && (
            <span className="mt-2.5 pl-4 text-sm text-[#f74747]">
              10자 이내로 입력해주세요
            </span>
          )}
        </div>

        {/* 상품 소개 */}
        <div className="flex flex-col gap-2.5">
          <span className="mb-2.5 text-lg font-bold">상품 소개</span>
          <textarea
            className={`h-[400px] w-full resize-none rounded-xl border-none bg-[#f3f4f6] p-5 text-[#1f2937] focus:outline-none ${
              errors.description ? "border border-[#f74747]" : ""
            }`}
            name="description"
            required
            value={formData.description || ""}
            ref={inputRef.descriptionRef}
            placeholder="상품 소개를 입력해주세요."
            onChange={handleChange}
          />
          {errors.description && (
            <span className="mt-2.5 pl-4 text-sm text-[#f74747]">
              10자 이상 입력해주세요
            </span>
          )}
        </div>

        {/* 가격 */}
        <div className="flex flex-col gap-2.5">
          <span className="mb-2.5 text-lg font-bold">판매가격</span>
          <input
            className={`h-14 w-full rounded-xl border-none bg-[#f3f4f6] p-5 text-[#1f2937] focus:outline-none ${
              errors.price ? "border border-[#f74747]" : ""
            }`}
            name="price"
            type="number"
            required
            value={formData.price || ""}
            ref={inputRef.priceRef}
            placeholder="판매 가격을 입력해주세요."
            onChange={handleChange}
          />
          {errors.price && (
            <span className="mt-2.5 pl-4 text-sm text-[#f74747]">
              숫자로 입력해주세요
            </span>
          )}
        </div>

        {/* 태그 */}
        <div className="flex flex-col gap-2.5">
          <span className="mb-2.5 text-lg font-bold">태그</span>
          <input
            className={`h-14 w-full rounded-xl border-none bg-[#f3f4f6] p-5 text-[#1f2937] focus:outline-none ${
              errors.tags || errors.tagLength ? "border border-[#f74747]" : ""
            }`}
            type="text"
            value={inputTag}
            ref={inputRef.tagRef}
            placeholder="태그를 입력후 엔터를 눌러주세요!"
            onChange={handleTagInput}
            onKeyDown={handleAddTag}
          />
          {errors.tagLength && (
            <span className="mt-2.5 pl-4 text-sm text-[#f74747]">
              5글자 이내로 입력해주세요
            </span>
          )}
          {errors.tags && (
            <span className="mt-2.5 pl-4 text-sm text-[#f74747]">
              태그를 1개 이상 입력해주세요
            </span>
          )}
          {formData.tags && (
            <ul className="flex w-full flex-wrap gap-2.5">
              {formData.tags.map((tag: string, index: number) => (
                <li
                  key={index}
                  className="flex items-center gap-2.5 rounded-3xl bg-[#f3f4f6] px-2.5 py-1.5"
                >
                  <span className="ml-1 text-base text-[#1f2937]">#{tag}</span>
                  <TiDelete
                    className="h-[35px] w-[35px] cursor-pointer text-[#9ca3af]"
                    onClick={(e) => handleDeleteTag(e, tag)}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </form>
    </section>
  );
}
