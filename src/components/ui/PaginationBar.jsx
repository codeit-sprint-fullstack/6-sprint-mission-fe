import Image from "next/image";
import React from "react";
import leftArrowIcon from "@/app/assets/icons/ic-arrow-left.svg";
import rightArrowIcon from "@/app/assets/icons/ic-arrow-right.svg";

export default function PaginationBar({
  totalPageNum,
  activePageNum,
  onPageChange,
}) {
  const maxVisiblePages = 5;
  let startPage;

  if (totalPageNum <= maxVisiblePages) {
    startPage = 1;
  } else {
    startPage = Math.max(activePageNum) - Math.floor(maxVisiblePages / 2, 1);
  }
  const pages = Array.from(
    { length: Math.min(maxVisiblePages, totalPageNum - startPage + 1) },
    (_, i) => startPage + i
  );

  return (
    <div className="flex items-center justify-center gap-1">
      <button
        className={`
          rounded-full w-10 h-10 flex items-center justify-center
          border border-gray-300 text-gray-500 font-semibold text-sm
          disabled:cursor-default disabled:opacity-50
        `}
        disabled={activePageNum === 1}
        onClick={() => onPageChange(activePageNum - 1)}
      >
        <Image src={leftArrowIcon} alt="Previous page" width={20} height={20} />
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={`
            rounded-full w-10 h-10 flex items-center justify-center
            border border-gray-300 font-semibold text-sm
            ${
              activePageNum === page
                ? "bg-blue-500 text-white"
                : "text-gray-700"
            }
          `}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className={`
          rounded-full w-10 h-10 flex items-center justify-center
          border border-gray-300 text-gray-500 font-semibold text-sm
          disabled:cursor-default disabled:opacity-50
        `}
        disabled={activePageNum === totalPageNum}
        onClick={() => onPageChange(activePageNum + 1)}
      >
        <Image src={rightArrowIcon} alt="Next Page" width={20} height={20} />
      </button>
    </div>
  );
}
