"use client";

import { ProductFormProps } from "@/types/product";
import { useProductForm } from "@/hooks/Products";
import FormHeader from "@/components/editForm/FormHeader";
import ImageUploadSection from "@/components/editForm/ImageUploadSection";
import FormField from "@/components/editForm/FormField";
import TagInput from "./TagInput";
import { useState } from "react";

export default function ProductForm({
  initialData,
  onSubmit,
  submitText = "등록",
}: ProductFormProps) {
  const {
    // 상태값
    formData,
    inputTag,
    images,
    errors,
    isLoading,
    isFormValid,
    inputRef,

    // 핸들러 함수들
    handleImageUpload,
    removeImage,
    handleChange,
    handleTagInput,
    handleAddTag,
    handleDeleteTag,
    handleSubmit,
  } = useProductForm({
    initialData,
    onSubmit,
    submitText,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <section className="flex w-full max-w-[1200px] flex-col gap-10 px-5 py-8">
      <form
        className="flex flex-col gap-8"
        onSubmit={(e) => {
          e.preventDefault();
          setIsSubmitting(true);
          handleSubmit(e);
        }}
      >
        {/* 헤더 */}
        <FormHeader
          submitText={submitText}
          isFormValid={isFormValid}
          isLoading={isLoading}
          title={`상품 ${submitText}하기`}
          isSubmitting={isSubmitting}
        />

        {/* 이미지 업로드 섹션 */}
        <ImageUploadSection
          images={images}
          onImageUpload={handleImageUpload}
          onRemoveImage={removeImage}
          maxImages={3}
          title="상품 이미지"
        />

        {/* 상품명 */}
        <FormField
          label="상품명"
          name="name"
          type="text"
          value={formData.name || ""}
          placeholder="상품명을 입력해주세요."
          required
          error={errors.name}
          errorMessage="10자 이내로 입력해주세요"
          onChange={handleChange}
          inputRef={inputRef.nameRef}
        />

        {/* 상품 소개 */}
        <FormField
          label="상품 소개"
          name="description"
          type="textarea"
          value={formData.description || ""}
          placeholder="상품 소개를 입력해주세요."
          required
          error={errors.description}
          errorMessage="10자 이상 입력해주세요"
          onChange={handleChange}
          inputRef={inputRef.descriptionRef}
        />

        {/* 가격 */}
        <FormField
          label="판매가격"
          name="price"
          type="number"
          value={formData.price || ""}
          placeholder="판매 가격을 입력해주세요."
          required
          error={errors.price}
          errorMessage="숫자로 입력해주세요"
          onChange={handleChange}
          inputRef={inputRef.priceRef}
        />

        {/* 태그 */}
        <TagInput
          tags={formData.tags || []}
          inputTag={inputTag}
          tagError={errors.tags}
          tagLengthError={errors.tagLength}
          onTagInput={handleTagInput}
          onAddTag={handleAddTag}
          onDeleteTag={handleDeleteTag}
          inputRef={inputRef.tagRef}
        />
      </form>
    </section>
  );
}
