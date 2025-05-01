"use client";

import { MdChevronLeft, MdChevronRight } from "react-icons/md"; // ✅ 추가

export default function Pagination({ page, setPage, totalPages, hasNext }) {
  const goPrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const goNext = () => {
    if (hasNext) setPage(page + 1);
  };

  const renderPages = () => {
    const pages = [];

    const groupSize = 5;
    const currentGroup = Math.floor((page - 1) / groupSize);
    const start = currentGroup * groupSize + 1;
    const end = Math.min(start + groupSize - 1, totalPages);

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
            ${
              i === page
                ? "bg-blue-500 text-white"
                : "border border-gray-300 text-gray-700"
            }
            hover:bg-blue-100 transition
          `}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2">
      {/* ◀️ 이전 */}
      <button
        onClick={goPrev}
        disabled={page === 1}
        className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-300 text-gray-500 hover:bg-gray-100 disabled:opacity-30"
      >
        <MdChevronLeft className="w-5 h-5" />
      </button>

      {/* 5개씩 그룹으로 표시 */}
      {renderPages()}

      {/* ▶️ 다음 */}
      <button
        onClick={goNext}
        disabled={!hasNext}
        className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-300 text-gray-500 hover:bg-gray-100 disabled:opacity-30"
      >
        <MdChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
