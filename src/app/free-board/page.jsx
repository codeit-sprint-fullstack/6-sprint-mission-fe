"use client";

import { useState, useEffect } from "react";
import Article from "@/components/ui/Article";
import BestArticle from "@/components/ui/BestArticle";
import Button from "@/components/ui/Button";
import Dropdown from "@/components/ui/Dropdown";
import Image from "next/image";
import Link from "next/link";
import { getArticles } from "@/lib/api";

export default function FreeBoardPage() {
  const [articles, setArticles] = useState([]);
  const [bestArticles, setBestArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [orderBy, setOrderBy] = useState("recent");

  useEffect(() => {
    fetchArticles();
  }, [orderBy]);

  useEffect(() => {
    fetchBestArticles(); 
  }, []);

  const fetchBestArticles = async () => {
    try {
      const data = await getArticles({
        keyword: "",
        orderBy: "recent",
        page: 1,
        pageSize: 3,
      });
      setBestArticles(data.list);
    } catch (error) {
      console.error("베스트 게시글을 불러오는 중 오류가 발생했습니다:", error);
    }
  };

  const fetchArticles = async () => {
    try {
      const data = await getArticles({
        keyword: searchQuery,
        orderBy,
        page: 1,
        pageSize: 10,
      });
      setArticles(data.list);
    } catch (error) {
      console.error("게시글을 불러오는 중 오류가 발생했습니다:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter") {
      fetchArticles();
    }
  };

  const handleSearchButtonClick = () => {
    fetchArticles();
  };

  const handleOrderChange = (value) => {
    setOrderBy(value);
  };

  return (
    <div className="flex flex-col items-center mt-6 mb-10">
      <div className="flex flex-col gap-6">
        <h2 className="text-xl text-secondary font-bold">베스트 게시글</h2>
        <div className="flex gap-6">
          {bestArticles.map((article) => (
            <Link key={article.id} href={`/free-board/${article.id}`}>
              <BestArticle
                id={article.id}
                title={article.title}
                createdAt={article.createdAt}
              />
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl text-secondary font-bold">게시글</h2>
            <Link href="/registration/free-board">
              <Button className="py-[11.5px]" buttonText={"글쓰기"} />
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center bg-primary-100 rounded-[12px] pl-[16px] pr-[20px] py-[9px] w-[1054px] h-[42px]">
              <Image
                src="/ic_search.svg"
                alt="search"
                width={24}
                height={24}
                className="mr-1 cursor-pointer"
                onClick={handleSearchButtonClick}
              />
              <input
                type="text"
                placeholder="검색할 상품을 입력하세요"
                className="text-base text-primary-400 outline-none w-full bg-transparent"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleSearchSubmit}
              />
            </div>
            <Dropdown onSelectSort={handleOrderChange} />
          </div>
          <div className="flex flex-col gap-6 mb-24">
            {articles.length > 0 ? (
              articles.map((article) => (
                <Link key={article.id} href={`/free-board/${article.id}`}>
                  <Article
                    id={article.id}
                    title={article.title}
                    createdAt={article.createdAt}
                  />
                </Link>
              ))
            ) : (
              <p className="text-center py-8 text-gray-500">
                검색 결과가 없습니다.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
