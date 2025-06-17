"use client";

import { useRouter } from "next/navigation";
import { articlesService } from "@/api/articles";
import { ArticleEditFormData } from "@/types/article";
import ArticleForm from "@/components/editForm/ArticleForm";

export default function WritePage() {
  const router = useRouter();

  const handleSubmit = async (formData: ArticleEditFormData) => {
    try {
      // 작성 모드에서는 newImages를 images로 사용
      await articlesService.createArticle({
        title: formData.title,
        content: formData.content,
        images: formData.newImages || formData.images || [],
      });
      router.push("/community");
    } catch (err) {
      console.error("게시글 작성 실패:", err);
      throw err; // ArticleForm에서 에러 처리
    }
  };

  return (
    <div className="flex w-full justify-center">
      <ArticleForm onSubmit={handleSubmit} submitText="등록" />
    </div>
  );
}
