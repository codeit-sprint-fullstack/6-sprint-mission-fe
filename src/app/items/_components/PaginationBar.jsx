"use client";

import React from "react";
import "./PaginationBar.css";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const PaginationBar = ({ totalPageNum, activePageNum, onPageChange }) => {
  // totalPageNum이 0이거나 undefined인 경우 페이지네이션 숨기기
  if (!totalPageNum || totalPageNum <= 1) {
    return null;
  }

  const maxVisiblePages = 5;
  let startPage;

  if (totalPageNum <= maxVisiblePages) {
    startPage = 1;
  } else {
    startPage = Math.max(activePageNum - Math.floor(maxVisiblePages / 2), 1);
    startPage = Math.min(startPage, totalPageNum - maxVisiblePages + 1);
  }

  const pages = Array.from(
    { length: Math.min(maxVisiblePages, totalPageNum - startPage + 1) },
    (_, i) => startPage + i
  );

  // 이전 페이지 처리
  const handlePrevPage = () => {
    if (activePageNum > 1) {
      onPageChange(activePageNum - 1);
    }
  };

  // 다음 페이지 처리
  const handleNextPage = () => {
    if (activePageNum < totalPageNum) {
      onPageChange(activePageNum + 1);
    }
  };

  // 페이지 클릭 처리
  const handlePageClick = (page) => {
    if (page !== activePageNum && page >= 1 && page <= totalPageNum) {
      onPageChange(page);
    }
  };

  return (
    <div className="paginationBar">
      {/* 이전 페이지 버튼 */}
      <button
        className="paginationButton"
        disabled={activePageNum === 1}
        onClick={handlePrevPage}
        aria-label="이전 페이지"
      >
        <AiOutlineLeft />
      </button>

      {/* 페이지 번호들 */}
      {pages.map((page) => (
        <button
          key={page}
          className={`paginationButton ${
            activePageNum === page ? "active" : ""
          }`}
          onClick={() => handlePageClick(page)}
          aria-label={`${page}페이지로 이동`}
          aria-current={activePageNum === page ? "page" : undefined}
        >
          {page}
        </button>
      ))}

      {/* 다음 페이지 버튼 */}
      <button
        className="paginationButton"
        disabled={activePageNum === totalPageNum}
        onClick={handleNextPage}
        aria-label="다음 페이지"
      >
        <AiOutlineRight />
      </button>

      {/* 페이지 정보 표시 (선택사항) */}
      <div className="paginationInfo">
        <span className="text-sm text-gray-500 ml-4">
          {activePageNum} / {totalPageNum} 페이지
        </span>
      </div>
    </div>
  );
};

export default PaginationBar;