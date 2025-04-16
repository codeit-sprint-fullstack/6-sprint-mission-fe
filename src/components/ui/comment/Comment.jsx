import { getArticle } from "@/lib/api/article";

async function Comment() {
  const articleId = params.id;

  const res = await getArticle(articleId);
  const article = res.data;

  return <div className="pt-[94px]">{article}</div>;
}

export default Comment;
