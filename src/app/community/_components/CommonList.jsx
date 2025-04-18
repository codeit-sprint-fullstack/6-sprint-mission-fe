"use client";

import CommonItem from "./CommonItem";
import { useEffect, useState } from "react";
import { useArticles } from "@/hooks/useArticle";
import Link from "next/link";
import LoadingState from "./LoadingState";
import SearchSortBar from "./SearchSortBar";

export default function CommonList() {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    articles,
    pagination,
    loading,
    error,
    handleSearchChange,
    handleOrderChange,
    loadMore,
  } = useArticles({
    limit: 10,
  });

  // 로컬 검색어 상태 업데이트
  const updateLocalSearchTerm = (value) => {
    setSearchTerm(value);
    // 디바운스 처리는 이미 useArticles 훅 내부에서 이루어짐
    handleSearchChange(value);
  };

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex items-center justify-between">
        <span className="text-[18px] font-bold md:text-[20px]">게시글</span>
        <Link href="/community/write">
          <button className="h-[42px] w-[88px] cursor-pointer rounded-lg bg-[#3692FF] px-4 py-2 text-[16px] font-[500] text-white transition duration-300 hover:bg-[#3692FF]/80">
            글쓰기
          </button>
        </Link>
      </div>

      {/* 검색 및 정렬 영역 */}
      <SearchSortBar
        searchTerm={searchTerm}
        onSearchChange={updateLocalSearchTerm}
        onOrderChange={handleOrderChange}
      />

      {/* 로딩 상태 표시 */}
      <LoadingState
        loading={loading && articles.length === 0}
        error={error}
        isEmpty={!loading && !error && articles.length === 0}
        emptyMessage="등록된 게시글이 없습니다."
        loadingMessage="게시글을 불러오는 중..."
        errorMessage="게시글을 불러오는 데 실패했습니다."
      />

      {/* 게시글 목록 */}
      {!loading && !error && articles.length > 0 && (
        <ul className="flex w-full flex-col gap-6 pb-24">
          {articles.map((article) => (
            <div key={article.id}>
              <CommonItem article={article} />
            </div>
          ))}
        </ul>
      )}

      {/* 페이지네이션 버튼 */}
      {pagination.hasMore && (
        <div className="mt-5 text-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "불러오는 중..." : "더 보기"}
          </button>
        </div>
      )}
    </div>
  );
}
