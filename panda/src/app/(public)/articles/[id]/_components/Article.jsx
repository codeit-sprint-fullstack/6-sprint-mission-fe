import LikesToArticle from "@/components/LikesToArticle";
import ReportingDate from "@/components/text/Date";
import { Title20, UserName, Text } from "@/components/text/text";
import UDselectBox from "@/components/UDselectBox";
import React from "react";

function Article({ article }) {
  return (
    <section>
      {/* 제목부 */}
      <div className="border-b border-gray-200 mb-4">
        <div className="flex justify-between w-full mb-4">
          <Title20 color="gray800">{article.title}</Title20>
          {/* 수정/삭제하기 */}
          <UDselectBox articleId={article.id} />
        </div>
        <div className="mb-4 flex gap-4 items-center h-[40px]">
          <img src="/assets/default_img.svg" alt="프로필 기본 사진" />
          <UserName>{article.user.nickname}</UserName>
          <ReportingDate createdAt={article.createdAt} />
          <div className="h-[34px] border-l border-gray-200 mx-3"></div>
          <div className="h-full border border-gray-200 rounded-[35px] px-3 py-1 flex items-center">
            <LikesToArticle
              articleId={article.id}
              initialCount={article.likesToArticle.length}
            />
          </div>
        </div>
      </div>
      {/* 내용부 */}
      <div className="mb-10">
        <Text>{article.content}</Text>
      </div>
    </section>
  );
}

export default Article;
