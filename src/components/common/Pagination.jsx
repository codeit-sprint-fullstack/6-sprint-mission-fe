"use client";

import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";

export default function Pagination({
  totalPage,
  currentPage,
  setCurrentPage,
  loading = false,
}) {
  if (!totalPage || totalPage <= 0) return null;

  const getPageNumbers = () => {
    const pageNumbers = [];
    const pageGroupSize = 5;

    // 현재 페이지가 속한 그룹 계산
    const currentGroup = Math.floor((currentPage - 1) / pageGroupSize);

    // 시작 페이지와 끝 페이지 계산
    const startPage = currentGroup * pageGroupSize + 1;
    const endPage = Math.min(totalPage, startPage + pageGroupSize - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return {
      pageNumbers,
      startPage,
      endPage,
      currentGroup,
      lastGroup: Math.floor((totalPage - 1) / pageGroupSize),
    };
  };

  const { pageNumbers, startPage, endPage, currentGroup, lastGroup } =
    getPageNumbers();

  const goToPage = (page) => {
    if (page < 1 || page > totalPage || page === currentPage) return;
    setCurrentPage(page);
  };

  // 이전 페이지로 이동 (한 페이지씩)
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // 다음 페이지로 이동 (한 페이지씩)
  const goToNextPage = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPage);
  };

  // 이전 페이지 그룹으로 이동
  const goToPrevGroup = () => {
    if (startPage > 1) {
      setCurrentPage(startPage - 1);
    }
  };

  // 다음 페이지 그룹으로 이동
  const goToNextGroup = () => {
    if (endPage < totalPage) {
      setCurrentPage(endPage + 1);
    }
  };

  return (
    <div className="mt-6 flex items-center justify-center gap-2">
      {/* 첫 페이지 버튼 */}
      <button
        onClick={goToFirstPage}
        disabled={currentPage <= 1 || loading}
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="첫 페이지"
      >
        <FiChevronsLeft size={20} />
      </button>

      {/* 이전 페이지 버튼 (한 페이지씩) */}
      <button
        onClick={goToPrevPage}
        disabled={currentPage <= 1 || loading}
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="이전 페이지"
      >
        <FiChevronLeft size={20} />
      </button>

      {/* 페이지 번호 버튼들 */}
      {pageNumbers.map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => goToPage(pageNum)}
          disabled={loading}
          className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition ${
            currentPage === pageNum
              ? "bg-[#3692FF] text-white"
              : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
          } cursor-pointer disabled:cursor-not-allowed disabled:opacity-50`}
        >
          {pageNum}
        </button>
      ))}

      {/* 다음 페이지 버튼 (한 페이지씩) */}
      <button
        onClick={goToNextPage}
        disabled={currentPage >= totalPage || loading}
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="다음 페이지"
      >
        <FiChevronRight size={20} />
      </button>

      {/* 마지막 페이지 버튼 */}
      <button
        onClick={goToLastPage}
        disabled={currentPage >= totalPage || loading}
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="마지막 페이지"
      >
        <FiChevronsRight size={20} />
      </button>
    </div>
  );
}
