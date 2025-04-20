import { getArticle } from "@/lib/api";
import dayjs from "dayjs";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import AddCommet from "./_component/AddCommet";
import Comments from "./_component/Comments";
import AddComment from "./_component/AddCommet";

export default async function ArticleDetailPage({ params }) {
  if (!params || !params.id) return notFound();

  const { id } = params;

  try {
    const article = await getArticle(Number(id));

    return (
      <div className="max-w-[1200px] mx-auto mt-[32px]">
        <div>
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <h1 className="text-[20px] font-bold text-primary-800 mb-[16px]">
                {article.title}
              </h1>
              <Image src="/ic_kebab.svg" alt="kebab" width={24} height={24} />
            </div>
            <div className="flex items-center mb-4">
              <div className="flex items-center gap-4">
                <Image
                  src="/ic_profile.svg"
                  alt="profile"
                  width={40}
                  height={40}
                />
                <div className="gap-2 flex mr-8">
                  <span className="text-[14px] font-medium text-primary-500">
                    총명한판다
                  </span>
                  <span className="text-[14px] font-normal text-primary-400">
                    {dayjs(article.createdAt).format("YYYY.MM.DD")}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <Image src="/line.svg" alt="line" width={2} height={32} />
                <div className="flex items-center gap-1 border border-primary-200 rounded-[35px] px-[12px] py-[4px]">
                  <Image
                    src="/ic_heart-1.svg"
                    alt="heart"
                    width={32}
                    height={32}
                  />
                  <span className="text-[16px] font-medium text-primary-500">
                    123
                  </span>
                </div>
              </div>
            </div>
            <hr className="mb-6 border-primary-200" />
            <p className="text-[18px] text-primary-800 font-normal whitespace-pre-wrap">
              {article.content}
            </p>
          </div>
          <AddComment articleId={id} boardType="freeboard" />
          <Comments articleId={id} boardType="freeboard" />
        </div>
        <div className="flex justify-center mt-16 mb-[193px]">
          <Link href="/free-board">
            <Image src="/btn_medium.svg" alt="btn" width={240} height={48} />
          </Link>
        </div>
      </div>
    );
  } catch (error) {
    return notFound();
  }
}
