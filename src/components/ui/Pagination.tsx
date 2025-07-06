"use client";

import ArrowLeft from "@/assets/svgs/arrow_left.svg";
import ArrowRight from "@/assets/svgs/arrow_right.svg";
import { useMemo } from "react";

const pagesPerGroup = 5;

interface PaginationProps {
  totalCount: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (newPage: number) => void;
}

function Pagination({ totalCount, currentPage, pageSize, onPageChange }: PaginationProps) {
  const itemsPerPage = pageSize;

  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(totalCount / itemsPerPage);
    const currentGroup = Math.ceil(currentPage / pagesPerGroup);
    const startPage = (currentGroup - 1) * pagesPerGroup + 1;
    const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return {
      totalPages,
      startPage,
      endPage,
      pages,
      hasPrev: currentPage > 1,
      hasNext: currentPage < totalPages,
    };
  }, [currentPage, totalCount, itemsPerPage, pagesPerGroup]);

  const handlePrev = () => {
    onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <div className="mb-[140px] flex justify-center gap-1">
      <button
        type="button"
        className="page-btn hover:bg-gray-200"
        onClick={handlePrev}
        disabled={!paginationData.hasPrev}
      >
        <ArrowLeft alt="왼쪽 화살표" />
      </button>
      {paginationData?.pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={`page-btn ${
            page === currentPage ? "bg-[#2F80ED] text-white" : "hover:bg-gray-200"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        className="page-btn hover:bg-gray-200"
        onClick={handleNext}
        disabled={!paginationData.hasNext}
      >
        <ArrowRight alt="오른쪽 화살표" />
      </button>
    </div>
  );
}

export default Pagination;
