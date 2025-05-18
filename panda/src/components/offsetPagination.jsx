"use client";

import React from "react";

function offsetPagination({ totalPages, currentPage, onPageChange }) {
  let pageNumbers = [];

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };
  return (
    <>
      <button
        onClick={handlePrev}
        className="w-10 h-10 border-1 border-gray-200 bg-white hover:bg-primary-200 active:bg-primary-200"
      >
        <span className="text-gray-500 hover:text-white active:text-white">
          &lt
        </span>
      </button>
      <button
        onClick={handleNext}
        className="w-10 h-10 border-1 border-gray-200 bg-white hover:bg-primary-200 active:bg-primary-200"
      >
        <span>{page.map}</span>
      </button>
      <button className="w-10 h-10 border-1 border-gray-200 bg-white hover:bg-primary-200 active:bg-primary-200">
        <span className="text-gray-500 hover:text-white active:text-white">
          &gt
        </span>
      </button>
    </>
  );
}

export default offsetPagination;
