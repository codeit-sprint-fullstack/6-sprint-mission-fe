import "./index.css";

export const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="paginationBar">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="paginationButton"
      >
        &lt;
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          className="paginationButton"
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="paginationButton"
      >
        &gt;
      </button>
    </div>
  );
};
