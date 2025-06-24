"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArticleFormData, ArticleEditFormData } from "@/types/article";
import { ImageObject } from "@/types/form";
import { articlesService } from "@/api/articles";

type UseArticleFormProps = {
  initialData?: Partial<ArticleFormData>;
  onSubmit?: (articleData: ArticleEditFormData) => void;
  submitText?: string;
};

export function useArticleForm({
  initialData,
  onSubmit,
  submitText = "등록",
}: UseArticleFormProps = {}) {
  const router = useRouter();
  const queryClient = useQueryClient();

  // 폼 상태 관리
  const [formData, setFormData] = useState<ArticleFormData>({
    title: initialData?.title || "",
    content: initialData?.content || "",
    images: [],
  });
  const [images, setImages] = useState<ImageObject[]>([]);

  // 게시글 등록 mutation
  const createArticleMutation = useMutation({
    mutationFn: (articleData: ArticleFormData) =>
      articlesService.createArticle(articleData),
    onSuccess: () => {
      // 게시글 목록 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: ["articles"],
        exact: false,
      });

      // 게시글 등록 성공 후 목록 페이지로 이동
      router.push("/community");
    },
    onError: (error) => {
      console.error("게시글 등록 실패:", error);
      alert(`게시글 ${submitText}에 실패했습니다.`);
    },
  });

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

      if (!formData.title.trim() || !formData.content.trim()) {
        alert("제목과 내용을 모두 입력해주세요.");
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
        if (onSubmit) {
          // 수정 모드 - 외부에서 제공된 onSubmit 함수 사용
          await onSubmit(formDataToSubmit);
        } else {
          // 등록 모드 - mutation을 사용한 등록 처리
          await createArticleMutation.mutateAsync({
            title: formDataToSubmit.title,
            content: formDataToSubmit.content,
            images: formDataToSubmit.newImages || formDataToSubmit.images || [],
          });
        }
      } catch (error) {
        console.error("게시글 처리 실패:", error);
        if (!onSubmit) {
          // 등록 모드에서는 mutation에서 에러 처리하므로 여기서는 무시
          return;
        }
        alert(`게시글 ${submitText}에 실패했습니다.`);
      }
    },
    [formData, images, onSubmit, submitText, createArticleMutation]
  );

  const isFormValid = formData.title.trim() && formData.content.trim();

  return {
    // 상태값
    formData,
    images,
    isLoading: createArticleMutation.isPending,
    isFormValid: !!isFormValid,

    // 핸들러 함수들
    handleImageUpload,
    removeImage,
    handleChange,
    handleSubmit,
  };
}
