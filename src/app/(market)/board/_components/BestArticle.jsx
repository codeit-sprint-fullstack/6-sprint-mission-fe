import Image from "next/image";
import ArticleCard from "./ArticleCard";
import Link from "next/link";

function BestArticle({ articles }) {
  const article = articles[0];

  return (
    <div>
      <h2 className="text-lg font-bold">베스트 게시글</h2>
      <article className="mt-4 mb-6 px-6 pb-4 bg-gray-50 rounded-lg">
        <Image
          src="/assets/img/img_badge.svg"
          alt="베스트 뱃지"
          width={102}
          height={30}
          className="mb-4"
        />
        <Link key={article.id} href={`/board/${article.id}`}>
          <ArticleCard
            key={article.id}
            title={article.title}
            createdAt={article.createdAt}
            isBest={true}
          />
        </Link>
      </article>
    </div>
  );
}

export default BestArticle;
