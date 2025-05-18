"use client";

import Image from "next/image";

export default function PaginationBar({ totalPage, activePage, onPageChange }) {
  const maxVisiblePages = 5;
  let startPage;

  if (totalPage <= maxVisiblePages) {
    startPage = 1;
  } else {
    startPage = Math.max(activePage - Math.floor(maxVisiblePages / 2), 1);
    startPage = Math.min(startPage, totalPage - maxVisiblePages + 1);
  }

  const pages = Array.from(
    { length: Math.min(maxVisiblePages, totalPage - startPage + 1) },
    (_, i) => startPage + i
  );

  return (
    <div className="flex items-center justify-center gap-2 pt-10">
      <button
        className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-full text-gray-500 disabled:opacity-50"
        disabled={activePage === 1}
        onClick={() => onPageChange(activePage - 1)}
      >
        <Image
          src="/images/icons/arrow_left.svg"
          alt="이전"
          width={20}
          height={20}
        />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 flex items-center justify-center border rounded-full font-semibold text-sm ${
            activePage === page
              ? "bg-blue-500 text-white border-blue-500"
              : "text-gray-600 border-gray-200 hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-full text-gray-500 disabled:opacity-50"
        disabled={activePage === totalPage}
        onClick={() => onPageChange(activePage + 1)}
      >
        <Image
          src="/images/icons/arrow_right.svg"
          alt="다음"
          width={20}
          height={20}
        />
      </button>
    </div>
  );
}
