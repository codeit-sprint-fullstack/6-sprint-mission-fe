"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ArticleEditFormData,
  ArticleFormData,
  ArticleFormProps,
} from "@/types/article";
import FormField from "@/components/editForm/FormField";
import ImageUploadSection from "@/components/editForm/ImageUploadSection";
import FormHeader from "@/components/editForm/FormHeader";
import { ImageObject } from "@/types/form";

export default function ArticleForm({
  initialData,
  onSubmit,
  submitText = "등록",
}: ArticleFormProps) {
  const [formData, setFormData] = useState<ArticleFormData>({
    title: initialData?.title || "",
    content: initialData?.content || "",
    images: [],
  });
  const [images, setImages] = useState<ImageObject[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 초기 데이터 설정
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        content: initialData.content || "",
        images: [],
      });

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
            isExisting: true,
          })
        );
        setImages(initialImages);
      }
    }
  }, [initialData]);

  // 컴포넌트 언마운트 시 메모리 정리
  useEffect(() => {
    return () => {
      images.forEach((image) => {
        if (!image.isExisting && image.preview) {
          URL.revokeObjectURL(image.preview);
        }
      });
    };
  }, [images]);

  // 이미지 업로드 처리
  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setImages((prev) => [
          ...prev,
          { file, preview: imageUrl, isExisting: false },
        ]);
      }
    },
    []
  );

  // 이미지 삭제 처리
  const removeImage = useCallback(
    (index: number) => {
      const newImages = [...images];
      if (!newImages[index].isExisting) {
        URL.revokeObjectURL(newImages[index].preview);
      }
      newImages.splice(index, 1);
      setImages(newImages);
    },
    [images]
  );

  // 입력값 변경 핸들러
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  // 폼 제출 핸들러
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);

      if (!formData.title.trim() || !formData.content.trim()) {
        alert("제목과 내용을 모두 입력해주세요.");
        setIsLoading(false);
        return;
      }

      const formDataToSubmit: ArticleEditFormData = {
        title: formData.title,
        content: formData.content,
        images: images.filter((img) => !img.isExisting).map((img) => img.file!),
        existingImages: images
          .filter((img) => img.isExisting)
          .map((img) => img.url!),
        newImages: images
          .filter((img) => !img.isExisting)
          .map((img) => img.file!),
      };

      try {
        await onSubmit(formDataToSubmit);
      } catch (error) {
        console.error("게시글 처리 실패:", error);
        alert(`게시글 ${submitText}에 실패했습니다.`);
      } finally {
        setIsLoading(false);
      }
    },
    [formData, images, onSubmit, submitText]
  );

  const isFormValid = formData.title.trim() && formData.content.trim();

  return (
    <section className="flex w-full max-w-[1200px] flex-col gap-10 px-5 py-8">
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        {/* 헤더 */}
        <FormHeader
          submitText={submitText}
          isFormValid={!!isFormValid}
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
