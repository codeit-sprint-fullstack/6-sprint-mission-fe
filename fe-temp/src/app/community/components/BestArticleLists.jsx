"use client";

import { useEffect, useState } from "react";
import { getArticleLists } from "@/lib/services/api/article";
import BestArticleCard from "./BestArticleCard";
import Link from "next/link";

export default function BestArticleLists() {
  const [articlesState, setArticlesState] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getArticleLists(1, 1, "likes");
      setArticlesState(data);
    };

    fetchData();
  }, []);

  return (
    <div className="flex justify-center gap-5">
      {articlesState?.map((article) => {
        return (
          <Link key={article.id} href={`/community/${article.id}`}>
            <BestArticleCard key={article.id} article={article} />
          </Link>
        );
      })}
    </div>
  );
}
