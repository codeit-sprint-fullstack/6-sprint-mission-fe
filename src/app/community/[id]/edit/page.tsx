"use client";

import ArticleForm from "@/components/editForm/ArticleForm";
import { useRouter, useParams } from "next/navigation";
import { useArticle } from "@/hooks/Article";
import { ArticleEditFormData } from "@/types/article";

export default function EditPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const { article, loading, updateArticle } = useArticle(id as string);

  // 수정 저장 함수
  const handleSaveChanges = async (formData: ArticleEditFormData) => {
    try {
      await updateArticle({
        title: formData.title,
        content: formData.content,
        images: formData.newImages || formData.images || [],
      });
      router.push(`/community/${id}`);
    } catch (error) {
      console.error("수정 실패:", error);
      alert("게시글 수정에 실패했습니다.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        로딩 중...
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        게시글을 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="flex w-full justify-center">
      <ArticleForm
        initialData={{
          title: article.title,
          content: article.content,
          images: article.images || [],
        }}
        onSubmit={handleSaveChanges}
        submitText="수정"
      />
    </div>
  );
}
