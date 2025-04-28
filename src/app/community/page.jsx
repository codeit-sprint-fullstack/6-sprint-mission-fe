"use client";

import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import SearchInput from "@/components/ui/SearchInput";
import DropdownMenu from "@/components/ui/DropdownMenu";
import { getArticles } from "@/api/articles";

import BestArticles from "./_components/BestArticles";
import Articles from "./_components/Articles";
import Link from "next/link";

export default function CommunityPage() {
  const [word, setWord] = useState("");
  const [orderBy, setOrderBy] = useState("recent");
  const [articles, setArticles] = useState([]);
  const [bestArticles, setBestArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bestArticleError, setBestArticleError] = useState(null);
  const [cursor, setCursor] = useState(0);
  const [hasNext, setHasNext] = useState(true);

  const fetchBestArticles = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await getArticles({ orderBy: "recent" });
      if (!result) {
        setBestArticles([]);
      } else {
        setBestArticles(result.data);
      }
    } catch (e) {
      setBestArticleError(e.message);
      console.error("Error fetching best articles", e);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchArticles = async (resetList = false) => {
    try {
      setIsLoading(true);
      setError(null);

      const currentCursor = resetList ? 0 : cursor;

      const result = await getArticles({
        cursor: currentCursor,
        take: 10,
        orderBy,
        word: word || undefined,
      });

      if (resetList) {
        setArticles(result.data || []);
      } else {
        setArticles((prev) => [...prev, ...(result.data || [])]);
      }

      setCursor(result.nextCursor);
      setHasNext(result.hasNext);
    } catch (e) {
      setError(e.message);
      console.error("Error fetching articles", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(true);
    fetchBestArticles();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchArticles(true);
    }, 500);
    return () => clearTimeout(timer);
  }, [word, orderBy]);

  const handleSearch = (e) => setWord(e.target.value);
  const handleSortChange = (newSortOrder) => setOrderBy(newSortOrder);
  const handleLoadNext = () => {
    if (!isLoading && hasNext) fetchArticles(false);
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-[1200px] w-full h-full pt-4 pr-4 pb-[91px] pl-4 gap-6 md:p-6 xl:p-0 xl:mt-6 xl:mb-[293px] xl:mx-auto">
      <div className="flex flex-col justify-center gap-4 md:gap-6 w-full h-full">
        <p className="text-lg md:text-xl font-bold text-secondary-800">
          베스트 게시글
        </p>
        <div className="flex justify-between gap-4 w-full">
          <BestArticles
            articles={bestArticles}
            isLoading={isLoading}
            error={bestArticleError}
          />
        </div>
      </div>

      <div className="flex flex-col w-full h-full gap-4 md:gap-12 lg:gap-6">
        <div className="flex items-center justify-between">
          <p className="text-lg md:text-xl font-bold text-secondary-800">
            게시글
          </p>
          <Link href="community/create">
            <Button>글쓰기</Button>
          </Link>
        </div>
        <div className="flex flex-col gap-4 md:gap-10 lg:gap-6">
          <div className="flex items-center justify-between">
            <SearchInput value={word} onChange={handleSearch} />
            <DropdownMenu orderBy={orderBy} onSortChange={handleSortChange} />
          </div>
          <Articles
            articles={articles}
            isLoading={isLoading}
            error={error}
            hasNext={hasNext}
            onLoadNext={handleLoadNext}
          />
        </div>
      </div>
    </div>
  );
}
