"use client";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Pagination({ pagination, loading }) {
  const getPageNumbers = () => {
    const pages = [];
    for (let i = pagination.startPage; i <= pagination.endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="mt-6 flex items-center justify-center gap-2">
      {/* 이전 페이지 버튼 */}
      <button
        onClick={pagination.goToPrevPage}
        disabled={pagination.currentPage <= 1 || loading}
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="이전 페이지"
      >
        <FiChevronLeft size={20} />
      </button>

      {/* 페이지 번호 버튼들 */}
      {pageNumbers.map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => pagination.goToPage(pageNum)}
          disabled={loading}
          className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition ${
            pagination.currentPage === pageNum
              ? "bg-[#3692FF] text-white"
              : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
          } cursor-pointer disabled:cursor-not-allowed disabled:opacity-50`}
        >
          {pageNum}
        </button>
      ))}

      {/* 다음 페이지 버튼 */}
      <button
        onClick={pagination.goToNextPage}
        disabled={pagination.currentPage >= pagination.totalPages || loading}
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="다음 페이지"
      >
        <FiChevronRight size={20} />
      </button>
    </div>
  );
}
