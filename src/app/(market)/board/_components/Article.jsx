import Image from "next/image";
import Link from "next/link";
import React from "react";
import ArticleCard from "./ArticleCard";
import dayjs from "dayjs";

function Article({ articles }) {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">게시글</h2>
        <Link href="/board/article">
          <button className="btn-base">글쓰기</button>
        </Link>
      </div>
      <div className="flex justify-between items-center h-[42px] my-4">
        <input
          className="w-full mr-[13px] py-[9px] pl-11 rounded-xl bg-gray-100 bg-[url('/assets/icon/ic_search.svg')] bg-no-repeat bg-[center_left_1rem]"
          placeholder="검색할 상품을 입력해주세요"
        />
        <button className="p-[9px] border-1 border-gray-100 rounded-lg cursor-pointer">
          <Image
            src="/assets/icon/ic_sort.svg"
            alt="정렬 아이콘"
            width={24}
            height={24}
          />
        </button>
      </div>
      <article className="mb-[91px]">
        {articles.map((article) => {
          const date = article.createdAt;
          const formattedDate = dayjs(date).format("YYYY. MM. DD");

          return (
            <Link key={article.id} href={`/board/${article.id}`}>
              <ArticleCard
                key={article.id}
                title={article.title}
                createdAt={formattedDate}
              />
              <span className="flex border-b-1 border-gray-200 my-6"></span>
            </Link>
          );
        })}
      </article>
    </div>
  );
}

export default Article;
