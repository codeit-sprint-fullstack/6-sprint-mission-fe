import React from "react";
import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const currentBlock = Math.ceil(currentPage / 5);
  const startPage = (currentBlock - 1) * 5 + 1;
  const endPage = Math.min(currentBlock * 5, totalPages);

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      {}
      {currentBlock > 1 && (
        <button
          className="pagination-btn"
          onClick={() => onPageChange(startPage - 1)}
        >
          &lt;
        </button>
      )}
      {pages.map((number) => (
        <button
          key={number}
          className={`pagination-btn ${currentPage === number ? "active" : ""}`}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}
      {}
      {endPage < totalPages && (
        <button
          className="pagination-btn"
          onClick={() => onPageChange(endPage + 1)}
        >
          &gt;
        </button>
      )}
    </div>
  );
};

export default Pagination;
