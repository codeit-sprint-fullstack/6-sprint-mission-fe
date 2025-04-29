"use client";

import React, { useState } from "react";

function Pagination({
  totalProducts,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}) {
  const totalPage = Math.ceil(totalProducts / itemsPerPage);
  const pagesPerGroup = 5;
  const [currentGroup, setCurrentGroup] = useState(0);

  const handleClickPrev = () => {
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleClicknext = () => {
    if (currentPage < totalPage) setCurrentPage((prevPage) => prevPage + 1);
  };

  const startPage = currentGroup * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPage);

  const handleClick = (num) => {
    setCurrentPage(num);
  };

  return (
    <div className="flex flex-row items-center gap-[4px]">
      <button
        onClick={handleClickPrev}
        className="w-10 h-10 rounded-full border border-gray-300 text-gray-600"
        disabled={currentPage === 1}
      >
        {"<"}
      </button>

      {totalPage > 0 &&
        [...Array(endPage - startPage + 1)].map((_, i) => {
          const pageNum = startPage + i;
          return (
            <button
              key={pageNum}
              onClick={() => handleClick(pageNum)}
              className={`w-10 h-10 rounded-full border border-gray-300 text-gray-600 hover:bg-blue-600 hover:text-white transition-colors ${
                currentPage === pageNum ? "bg-blue-600 text-white" : ""
              }`}
            >
              {pageNum}
            </button>
          );
        })}

      <button
        onClick={handleClicknext}
        className="w-10 h-10 rounded-full border border-gray-300 text-gray-600"
        disabled={currentPage === totalPage}
      >
        {">"}
      </button>
    </div>
  );
}

export default Pagination;
