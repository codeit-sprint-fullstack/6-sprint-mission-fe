import Image from "next/image";
import { useMemo } from "react";

const limit = 10;
const offset = 5;

function Pagination({ totalCount, currentPage, onPageChange }) {
  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(totalCount / limit);
    const currentGroup = Math.ceil(currentPage / offset);
    const startPage = (currentGroup - 1) * offset + 1;
    const endPage = Math.min(startPage + offset - 1, totalPages);

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return {
      totalPages,
      startPage,
      endPage,
      pages,
      hasPrev: currentPage > 1,
      hasNext: currentPage < totalPages,
    };
  }, [currentPage, totalCount, limit, offset]);

  const handlePrev = () => {
    onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <div className="flex justify-center mb-[140px] gap-1">
      <button
        type="button"
        className="page-btn hover:bg-gray-200"
        onClick={handlePrev}
        disabled={!paginationData.hasPrev}
      >
        <Image
          src="/assets/icon/arrow_left.svg"
          alt="왼쪽 화살표"
          width={16}
          height={16}
        />
      </button>
      {paginationData?.pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={`page-btn ${
            page === currentPage
              ? "bg-[#2F80ED] text-white"
              : "hover:bg-gray-200"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        className="page-btn hover:bg-gray-200"
        onClick={handleNext}
        disabled={!paginationData.hasNext}
      >
        <Image
          src="/assets/icon/arrow_right.svg"
          alt="오른쪽 화살표"
          width={16}
          height={16}
        />
      </button>
    </div>
  );
}

export default Pagination;
