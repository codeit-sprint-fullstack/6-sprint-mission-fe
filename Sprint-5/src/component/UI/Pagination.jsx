import { useState } from "react";
import ArrowLeft from "/btn_right.png";
import ArrowRight from "/btn_left.png";
import './Pagination.css'

export const Pagination = ({ totalPage, currentPage, onPageChange }) => {
  const [page, setPage] = useState(currentPage);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPage) return;
    setPage(newPage);
    onPageChange(newPage);
  };

  const getPageNumbers = () => {
    const pages = [];

    let start = Math.max(1, page - 2);
    let end = Math.min(totalPage, start + 4);
    if (end - start < 4) start = Math.max(1, end - 4);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="pagination-container">
      <div className="pagination">
        <img
          src={ArrowLeft}
          alt="이전"
          className={`page-img ${page === 1 ? "disabled" : ""}`}
          onClick={() => handlePageChange(page - 1)}
        />

        {getPageNumbers().map((num) => (
          <button
            key={num}
            onClick={() => handlePageChange(num)}
            className={`page-btn ${num === page ? "active" : ""}`}
          >
            {num}
          </button>
        ))}

        <img
          src={ArrowRight}
          alt="다음"
          className={`page-img ${page === totalPage ? "disabled" : ""}`}
          onClick={() => handlePageChange(page + 1)}
        />
      </div>
    </div>
  );
};
