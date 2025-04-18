"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { getArticles } from "@/lib/api";
import ArticleCard from "@/components/ArticleCard";

export default function BoardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [articles, setArticles] = useState([]);
  const [bestArticles, setBestArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("word") || "");
  const [orderBy, setOrderBy] = useState("recent");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadArticles = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const bestArticlesResponse = await getArticles({
        take: 3,
        orderBy: "recent",
      });

      const bestArticlesWithDefaults = (bestArticlesResponse.data || []).map(
        (article) => ({
          ...article,

          author: article.author || { nickname: "익명" },

          likes: article.likes ?? 0,
          imageUrl: article.imageUrl || "/default-thumbnail.png",
        })
      );
      setBestArticles(bestArticlesWithDefaults);

      const params = { orderBy, take: 10 };
      const currentSearch = searchParams.get("word");
      if (currentSearch) {
        params.word = currentSearch;
      }
      const articlesResponse = await getArticles(params);

      const articlesWithDefaults = (articlesResponse.data || []).map(
        (article) => ({
          ...article,

          author: article.author || { nickname: "익명" },

          likes: article.likes ?? 0,
          imageUrl: article.imageUrl || "/default-thumbnail.png",
        })
      );
      setArticles(articlesWithDefaults);
    } catch (err) {
      console.error("게시글 로딩 실패:", err);
      setError("게시글을 불러오는 중 오류가 발생했습니다.");

      setBestArticles([]);
      setArticles([]);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy, searchParams]);

  useEffect(() => {
    setSearchTerm(searchParams.get("word") || "");

    const currentOrderBy = searchParams.get("orderBy") || "recent";
    setOrderBy(currentOrderBy);
    loadArticles();
  }, [loadArticles, searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchTerm.trim()) {
      params.set("word", searchTerm.trim());
    } else {
      params.delete("word");
    }

    router.push(`/board?${params.toString()}`);
  };

  const handleSortChange = (e) => {
    const newOrderBy = e.target.value;
    setOrderBy(newOrderBy); //
    const params = new URLSearchParams(searchParams);
    params.set("orderBy", newOrderBy);

    router.push(`/board?${params.toString()}`);
  };

  return (
    <div className="max-w-[1200px] mx-auto pt-[24px] pb-10">
      <section className="mb-[40px]">
        <h2 className="text-2xl font-semibold mb-4">베스트 게시글</h2>

        {isLoading && <p>베스트 게시글 로딩 중...</p>}
        {error && !isLoading && (
          <p className="text-red-500">
            베스트 게시글 로드 중 오류 발생: {error}
          </p>
        )}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
            {bestArticles.length > 0 ? (
              bestArticles.map((article) => (
                <ArticleCard
                  key={`best-${article.id}`}
                  article={article}
                  variant="best"
                />
              ))
            ) : (
              <p>베스트 게시글이 없습니다.</p>
            )}
          </div>
        )}
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">게시글</h2>
          <Link
            href="/board/new"
            className="w-[88px] h-[42px] py-[12px] px-[23px] rounded-lg flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold text-sm transition-colors duration-200"
          >
            글쓰기
          </Link>
        </div>

        <div className="mb-[24px] flex gap-[12px] items-center">
          <form
            onSubmit={handleSearch}
            className="flex items-center w-[1054px] gap-[10px]"
          >
            <input
              type="text"
              placeholder="검색할 내용을 입력해주세요"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow h-[42px] rounded-xl bg-[#F3F4F6] pl-4 pr-5 py-[9px]"
            />
            <button
              type="submit"
              className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded flex-shrink-0 h-[42px]"
            >
              검색
            </button>
          </form>
          <select
            value={orderBy}
            onChange={handleSortChange}
            className="w-[130px] h-[42px] border rounded-lg p-2 flex-shrink-0"
          >
            <option value="recent">최신 순</option>
          </select>
        </div>

        {isLoading && <p>게시글 로딩 중...</p>}
        {error && !isLoading && (
          <p className="text-red-500">게시글 로드 중 오류 발생: {error}</p>
        )}
        {!isLoading && !error && (
          <div className="flex flex-col gap-[24px]">
            {articles.length > 0 ? (
              articles.map((article) => (
                <ArticleCard
                  key={`all-${article.id}`}
                  article={article}
                  variant="list"
                />
              ))
            ) : (
              <p>게시글이 없습니다.</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
