"use client";
import BestCard from "@/components/ui/BestCard";

export default function BestArticles({ articles, isLoading, error }) {
  if (isLoading && articles.length === 0) return <p>게시글을 불러오는 중...</p>;
  if (error) return <p className="text-red-500">오류: {error}</p>;
  if (articles.length === 0) return <p>게시글이 없습니다.</p>;

  return (
    <>
      {articles[0] && (
        <div className="block md:hidden w-full">
          <BestCard article={articles[0]} />
        </div>
      )}
      {articles[0] && (
        <div className="hidden md:block xl:hidden w-full">
          <div className="flex gap-4">
            <BestCard article={articles[0]} />
            {articles[1] && <BestCard article={articles[1]} />}
          </div>
        </div>
      )}
      {articles[0] && (
        <div className="hidden xl:flex gap-4 w-full">
          <BestCard article={articles[0]} />
          {articles[1] && <BestCard article={articles[1]} />}
          {articles[2] && <BestCard article={articles[2]} />}
        </div>
      )}
    </>
  );
}
