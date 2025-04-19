"use client";

import CommonItem from "./CommonItem";
import { useArticles } from "@/hooks/Article";
import Link from "next/link";
import LoadingState from "./LoadingState";
import SearchSortBar from "./SearchSortBar";
import Pagination from "./pagination";

export default function CommonList() {
  const { articles, loading, error, search, handleOrderChange, pagination } =
    useArticles();

  return (
    <div className="flex w-full flex-col gap-5">
      {/* 일반 게시글 헤더 */}
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
        onSearchChange={search.handleSearchChange}
        onOrderChange={handleOrderChange}
      />

      {/* 로딩 상태 표시 */}
      <LoadingState
        loading={loading && articles.length === 0}
        error={error}
        isEmpty={!loading && !error && articles.length === 0}
        emptyMessage="등록된 게시글이 없습니다."
        loadingMessage="게시글을 불러오는 중..."
        errorMessage="게시글을 불러오는 데 실패했습다."
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
      {articles.length > 0 && (
        <Pagination pagination={pagination} loading={loading} />
      )}
    </div>
  );
}
