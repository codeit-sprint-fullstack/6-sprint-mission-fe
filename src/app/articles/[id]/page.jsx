import ArticleDetail from "@/components/ui/ArticleDetail";
import Button from "@/components/ui/Button";
import Comments from "@/components/ui/comment/Comments";
import CreateComment from "@/components/ui/comment/CreateComment";
import { getArticle } from "@/lib/api/article";
import React from "react";

export default async function SpecifiedArticle({ params }) {
  const { id: articleId } = await params;
  const article = await getArticle(articleId);

  return (
    <div className="flex items-center justify-center font-pretendard">
      <div className="pt-[94px]">
        <ArticleDetail article={article} />
        <CreateComment />
        <Comments params={params} />
        <div className="flex justify-center mt-[64px] mb-[193px]">
          <Button
            text={"목록으로 돌아가기"}
            // onClick={handleBackToCommentList}
            disabled={false}
            width={"w-[240px]"}
            height={"h-[48px]"}
            rounded={"rounded-[40px]"}
          />
        </div>
      </div>
    </div>
  );
}
