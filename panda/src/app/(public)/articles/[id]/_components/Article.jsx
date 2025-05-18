import Likes from "@/components/Likes";
import ReportingDate from "@/components/text/Date";
import UDselectBox from "@/components/UDselectBox";
import React from "react";

function Article({ article }) {
  return (
    <section>
      {/* 제목부 */}
      <div className="border-b border-gray-200 mb-4">
        <div className="flex justify-between w-full mb-4">
          <p color="gray800">{article.title}</p>
          {/* 수정/삭제하기 */}
          <UDselectBox articleId={article.id} />
        </div>
        <div className="mb-4 flex gap-4 items-center h-[40px]">
          <img src="/assets/default_img.svg" alt="프로필 기본 사진" />
          <span>{article.author.nickname}</span>
          <ReportingDate createdAt={article.createdAt} />
          <div className="h-[34px] border-l border-gray-200 mx-3"></div>
          <div className="h-full border border-gray-200 rounded-[35px] px-3 py-1 flex items-center">
            <Likes
              type="article"
              articleId={article.id}
              initialCount={article.likes}
            />
          </div>
        </div>
      </div>
      {/* 내용부 */}
      <div className="mb-10">
        <span>{article.content}</span>
      </div>
    </section>
  );
}

export default Article;
