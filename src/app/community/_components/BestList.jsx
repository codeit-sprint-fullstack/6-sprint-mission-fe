"use client";

import BestItem from "./BestItem";
import { useArticles } from "@/hooks/Article";
import useDeviceType from "@/hooks/useDeviceType";
import { useMemo } from "react";
import LoadingState from "../../../components/common/LoadingState";

export default function BestList() {
  const { isMobile, isTablet } = useDeviceType();

  // useArticles 훅을 사용하여 항상 3개의 게시글 데이터 가져오기
  const { articles, loading, error } = useArticles({
    limit: 3, // 항상 3개 가져옴
    offset: 0,
  });

  // 디바이스 타입에 따라 표시할 게시글 수 결정
  const displayCount = useMemo(() => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 3; // 데스크탑
  }, [isMobile, isTablet]);

  // 표시할 게시글만 필터링
  const displayedArticles = useMemo(() => {
    if (!articles.length) return [];
    return articles.slice(0, displayCount);
  }, [articles, displayCount]);

  return (
    <div className="w-full">
      <h2 className="mb-4 text-[18px] font-bold md:text-[20px]">
        베스트 게시글
      </h2>

      {/* 로딩 상태 표시 */}
      <LoadingState
        loading={loading}
        error={error}
        isEmpty={!loading && !error && displayedArticles.length === 0}
        emptyMessage="베스트 게시글이 없습니다."
        loadingMessage="베스트 게시글을 불러오는 중..."
        errorMessage="베스트 게시글을 불러오는 데 실패했습니다."
      />

      {/* 베스트 게시글 목록 */}
      {!loading && !error && displayedArticles.length > 0 && (
        <ul className={`flex w-full gap-5 ${isMobile ? "justify-center" : ""}`}>
          {displayedArticles.map((article) => (
            <BestItem key={article.id} article={article} />
          ))}
        </ul>
      )}
    </div>
  );
}
