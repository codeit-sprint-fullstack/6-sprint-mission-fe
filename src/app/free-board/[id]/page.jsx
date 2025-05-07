"use client";

import { getArticle } from "@/lib/api";
import dayjs from "dayjs";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import Link from "next/link";
import AddComment from "./_component/AddComment";
import Comments from "./_component/Comments";
import DropdownMenu from "./_component/DropdownMenu";
import { useEffect, useState } from "react";
import { use } from "react";

export default function ArticleDetailPage({ params }) {
  const unwrappedParams = use(params);
  const id = Number(unwrappedParams.id);
  
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const articleData = await getArticle(id);
        setArticle(articleData);
        setLoading(false);
      } catch (error) {
        console.error("게시글을 불러오는데 실패했습니다:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return <div className="max-w-[1200px] mx-auto mt-[32px]">로딩 중...</div>;
  }

  if (error || !article) {
    return notFound();
  }

  return (
    <div className="max-w-[1200px] mx-auto mt-[32px]">
      <div>
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-[20px] font-bold text-primary-800 mb-[16px]">
              {article.title}
            </h1>
            <DropdownMenu id={id} type="article" article={article} />
          </div>
          <div className="flex items-center mb-4">
            <div className="flex items-center gap-4">
              <Image
                src="/ic_profile.svg"
                alt="profile"
                width={40}
                height={40}
                className="rounded-[100%]"
              />
              <div className="gap-2 flex items-center mr-8">
                <span className="text-[14px] font-medium text-primary-500">
                  {article.writer.nickname}
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
                  {article.likeCount}
                </span>
              </div>
            </div>
          </div>
          <hr className="mb-6 border-primary-200" />
          <p className="text-[18px] text-primary-800 font-normal whitespace-pre-wrap">
            {article.content}
          </p>
        </div>
        <AddComment articleId={id} boardType="articles" />
        <Comments articleId={id} />
      </div>
      <div className="flex justify-center mt-16 mb-[193px]">
        <Link href="/free-board">
          <Image src="/btn_medium.svg" alt="btn" width={240} height={48} />
        </Link>
      </div>
    </div>
  );
}