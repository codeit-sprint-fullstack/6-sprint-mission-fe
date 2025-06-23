"use client";

import ArticleForm from "@/app/community/_components/ArticleForm";

export default function WritePage() {
  return (
    <div className="flex w-full justify-center">
      <ArticleForm submitText="등록" />
    </div>
  );
}
