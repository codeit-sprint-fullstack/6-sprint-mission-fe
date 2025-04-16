import React from "react";
import ArticleList from "@/components/ui/ArticleList";
import Articles from "@/components/ui/Articles";
import BestList from "@/components/ui/BestList";

function articles() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-[1200px] flex flex-col pt-[94px] font-pretendard">
        <BestList />

        <ArticleList />
        <Articles />
      </div>
    </div>
  );
}

export default articles;
