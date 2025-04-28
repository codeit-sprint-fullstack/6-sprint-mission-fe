import Card from "@/components/ui/Card";
import LoadNextButton from "./LoadNextButton";

export default function Articles({
  articles,
  isLoading,
  error,
  hasNext,
  onLoadNext,
}) {
  let content;

  if (isLoading && articles.length === 0) {
    content = <p>게시글을 불러오는 중...</p>;
  } else if (error) {
    content = <p className="text-error">오류: {error}</p>;
  } else if (articles.length === 0) {
    content = <p>게시글이 없습니다.</p>;
  } else {
    content = (
      <>
        {articles.map((article) => (
          <Card key={article.id} article={article} />
        ))}
        <LoadNextButton
          onClick={onLoadNext}
          isLoading={isLoading}
          hasNext={hasNext}
        />
      </>
    );
  }

  return <div className="flex flex-col gap-6">{content}</div>;
}
