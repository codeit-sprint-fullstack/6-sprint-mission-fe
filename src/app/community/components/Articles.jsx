import Card from "@/components/ui/Card";
import LoadNextButton from "./LoadNextButton";

export default function Articles({ articles, isLoading, error, hasNext, onLoadNext }) {
  return (
    <div className="flex flex-col gap-6">
      {isLoading && articles.length === 0 ? (
        <p>게시글을 불러오는 중...</p>
      ) : error ? (
        <p className="text-red-500">오류: {error}</p>
      ) : articles.length === 0 ? (
        <p>게시글이 없습니다.</p>
      ) : (
        <>
          {articles.map(article => (
            <Card key={article.id} article={article} />
          ))}
          <LoadNextButton onClick={onLoadNext} isLoading={isLoading} hasNext={hasNext} />
        </>
      )}
    </div>
  );
}
