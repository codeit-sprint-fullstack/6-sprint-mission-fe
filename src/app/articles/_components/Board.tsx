"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getAllArticles } from "@/lib/api/article";
import Search from "@/components/Search";
import Article from "./Article";
import Orders from "@/components/Orders";
import { TArticle } from "@/types";

function Board() {
  const [articles, setArticles] = useState<TArticle[]>([]);
  const [search, setSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [order, setOrder] = useState<"recent" | "favorite">("recent");

  useEffect(() => {
    const fetchArticles = async () => {
      const data = await getAllArticles(search, order);
      setArticles(data);
      setIsLoading(false);
    };
    fetchArticles();
  }, [search, order]);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="font-bold">게시글</p>
        <Link href="board/post">
          <button className="w-22 h-10.5 bg-primary-100 text-white rounded-xl">
            글쓰기
          </button>
        </Link>
      </div>

      <div className="flex justify-between gap-4">
        <Search setSearch={setSearch} />
        <Orders setOrder={setOrder} />
      </div>
      <div className="flex flex-col gap-6 h-auto items-center">
        {isLoading ? (
          <p>로딩중...</p>
        ) : (
          articles.map((article) => (
            <Link
              className="w-full"
              key={article.id}
              href={`/articles/${article.id}`}
            >
              <Article title={article.title} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default Board;
