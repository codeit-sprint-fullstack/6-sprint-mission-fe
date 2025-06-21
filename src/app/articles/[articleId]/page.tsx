import CommentsList from "@/app/articles/[articleId]/_components/CommentsList";
import CommentForm from "@/app/articles/[articleId]/_components/CommentForm";
import ArticleDetail from "@/app/articles/[articleId]/_components/ArticleDetail";
import Link from "next/link";
import { getArticle } from "@/lib/api/article";
import Image from "next/image";
import { TArticle } from "@/types";

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ articleId: TArticle["id"] }>;
}) {
  const { articleId } = await params;
  const article = await getArticle(articleId);
  return (
    <div className="flex justify-center m-4 flex-col">
      <ArticleDetail
        title={article.title}
        content={article.content}
        articleId={articleId}
      />
      <CommentForm articleId={articleId} />
      <CommentsList comments={article.comments} articleId={articleId} />
      <div className="flex justify-center mt-10 ">
        <Link href="/articles">
          <button className="bg-primary-100 text-white flex justify-center items-center w-60 h-12 font-semibold rounded-4xl">
            목록으로 돌아가기
            <Image
              alt="back"
              className="w-5 h-4"
              src="/assets/ic/ic_back.png"
            />
          </button>
        </Link>
      </div>
    </div>
  );
}
