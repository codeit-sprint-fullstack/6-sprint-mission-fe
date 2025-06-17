"use client";

import ArticleForm from "@/components/editForm/ArticleForm";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { articlesService } from "@/api/articles";
import { ArticleFormData, ArticleEditFormData } from "@/types/article";

export default function EditPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [article, setArticle] = useState<ArticleFormData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await articlesService.getArticle(id as string);

        // API에서 반환된 데이터에서 필요한 필드만 추출
        const formattedArticle: ArticleFormData = {
          title: response.title || "",
          content: response.content || "",
          images: response.images || [],
        };

        setArticle(formattedArticle);
      } catch (error) {
        console.error("게시글 조회 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  // 수정 저장 함수 - FormData를 올바르게 구성하여 API 호출
  const handleSaveChanges = async (formData: ArticleEditFormData) => {
    try {
      const form = new FormData();

      // 게시글 텍스트 필드들
      form.append("title", formData.title);
      form.append("content", formData.content);

      // 기존 이미지 정보 전달 (서버에서 유지해야 할 이미지들)
      form.append(
        "existingImages",
        JSON.stringify(formData.existingImages || [])
      );

      // 새 이미지 파일 추가
      if (formData.newImages && formData.newImages.length > 0) {
        formData.newImages.forEach((file: File) => {
          form.append("images", file);
        });
      }

      // FormData를 사용하여 API 호출
      await articlesService.updateArticle(id as string, form);

      router.push(`/community/${id}`);
    } catch (error) {
      console.error("수정 실패:", error);
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="flex w-full justify-center">
      <ArticleForm
        initialData={article || undefined}
        onSubmit={handleSaveChanges}
        submitText="수정"
      />
    </div>
  );
}
