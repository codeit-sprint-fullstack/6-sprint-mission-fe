import "./Pagination.css";
import arrowLeft from "../assets/images/icon/arrow-left.svg";
import arrowRight from "../assets/images/icon/arrow-right.svg";
import { useState } from "react";

const limit = 10;
const offset = 5;

function Pagination({ totalCount, currentPage, setCurrentPage }) {
  const lastPage = Math.ceil(totalCount / limit);
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(offset);

  const handlePage = (page) => {
    setCurrentPage(page);
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      if (currentPage === startPage) {
        setStartPage((page) => Math.max(1, page - offset));
        setEndPage((page) => Math.max(offset, page - offset));
        setCurrentPage((page) => Math.max(1, page - 1));
      } else {
        setCurrentPage((page) => page - 1);
      }
    }
  };

  const handleNext = () => {
    if (currentPage < lastPage) {
      if (currentPage === endPage) {
        setStartPage((page) => page + offset);
        setEndPage((page) => Math.min(lastPage, page + offset));
        setCurrentPage((page) => page + 1);
      } else {
        setCurrentPage((page) => page + 1);
      }
    }
  };

  return (
    <div className="pagination">
      <button type="button" className="prevBtn" onClick={handlePrev}>
        <img src={arrowLeft} />
      </button>
      {Array.from(
        { length: Math.min(offset, lastPage - startPage + 1) },
        (_, index) => {
          const page = startPage + index;
          return (
            <button
              key={page}
              type="button"
              onClick={() => handlePage(page)}
              className={page === currentPage ? "active" : "hover"}
            >
              {page}
            </button>
          );
        }
      )}
      <button type="button" className="nextBtn" onClick={handleNext}>
        <img src={arrowRight} />
      </button>
    </div>
  );
}

export default Pagination;
