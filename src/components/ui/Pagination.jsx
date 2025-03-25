import styles from "./Pagination.module.css";
import arrowLeft from "../../assets/images/icon/arrow_left.svg";
import arrowRight from "../../assets/images/icon/arrow_right.svg";
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
    <div className={styles.pagination}>
      <button
        type="button"
        className={styles.prevBtn}
        onClick={handlePrev}
        disabled={!paginationData.hasPrev}
      >
        <img src={arrowLeft} alt="왼쪽 화살표" />
      </button>
      {paginationData.pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={
            page === currentPage ? `${styles.active}` : `${styles.hover}`
          }
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        className={styles.nextBtn}
        onClick={handleNext}
        disabled={!paginationData.hasNext}
      >
        <img src={arrowRight} alt="오른쪽 화살표" />
      </button>
    </div>
  );
}

export default Pagination;
