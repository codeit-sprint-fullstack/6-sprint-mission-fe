"use client";

import React, { useState } from "react";

function Pagination() {
  const [totalPage, setTotalPage] = useState(1);
  const handleClickPrev = (e) => {
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
    handleButtonClick(e);
  };

  const handleClick = (e, num) => {
    setCurrentPage(num);
    handleButtonClick(e);
  };

  const handleClicknext = (e) => {
    if (currentPage < totalPage) setCurrentPage((prevPage) => prevPage + 1);
    handleButtonClick(e);
  };

  return (
    <>
      <button
        onClick={handleClickPrev}
        className="w-10 h-10 rounded-full border border-gray-300 text-gray-600"
      >
        {"<"}
      </button>
      {[...Array(totalPage)].map((_, i) => (
        <button
          key={i}
          onClick={(e) => handleClick(e, i + 1)}
          className="w-10 h-10 rounded-full border border-gray-300 text-gray-600 hover:bg-blue-600 hover:text-white transition-colors"
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={handleClicknext}
        className="w-10 h-10 rounded-full border border-gray-300 text-gray-600"
      >
        {">"}
      </button>
    </>
  );
}

export default Pagination;
