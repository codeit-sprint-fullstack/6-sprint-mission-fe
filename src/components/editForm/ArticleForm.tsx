"use client";

import { ArticleFormProps } from "@/types/article";
import FormField from "@/components/editForm/FormField";
import ImageUploadSection from "@/components/editForm/ImageUploadSection";
import FormHeader from "@/components/editForm/FormHeader";
import { useArticleForm } from "@/hooks/Article";

export default function ArticleForm({
  initialData,
  onSubmit,
  submitText = "등록",
}: ArticleFormProps) {
  const {
    formData,
    images,
    isLoading,
    isFormValid,
    handleImageUpload,
    removeImage,
    handleChange,
    handleSubmit,
  } = useArticleForm({
    initialData,
    onSubmit,
    submitText,
  });

  return (
    <section className="flex w-full max-w-[1200px] flex-col gap-10 px-5 py-8">
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        {/* 헤더 */}
        <FormHeader
          submitText={submitText}
          isFormValid={isFormValid}
          isLoading={isLoading}
          title={`게시글 ${submitText}하기`}
        />

        {/* 이미지 업로드 섹션 */}
        <ImageUploadSection
          images={images}
          onImageUpload={handleImageUpload}
          onRemoveImage={removeImage}
          maxImages={5}
          title="게시글 이미지"
        />

        {/* 제목 */}
        <FormField
          label="제목"
          name="title"
          type="text"
          value={formData.title}
          placeholder="제목을 입력해주세요."
          required
          onChange={handleChange}
        />

        {/* 내용 */}
        <FormField
          label="내용"
          name="content"
          type="textarea"
          value={formData.content}
          placeholder="내용을 입력해주세요."
          required
          onChange={handleChange}
        />
      </form>
    </section>
  );
}
