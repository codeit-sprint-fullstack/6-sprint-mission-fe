import "./PageButton.css";

export const PageButton = ({ page, setPage, maxPage }) => {
  const handlePage = (newPage) => {
    setPage(newPage);
  };

  const pageButton = [];

  pageButton.push(
    <button
      key="prev"
      className="page-button"
      onClick={() => setPage(page - 1)}
      disabled={page === 1}
    >
      &lt;
    </button>
  );

  const startPage = Math.max(1, page - 2);
  const endPage = Math.min(maxPage, startPage + 4);

  for (let i = startPage; i <= endPage; i++) {
    pageButton.push(
      <button
        key={i}
        className={`page-button page-number ${i === page ? "active" : ""}`}
        onClick={() => handlePage(i)}
        disabled={i === page}
      >
        {i}
      </button>
    );
  }

  pageButton.push(
    <button
      key="next"
      className="page-button"
      onClick={() => setPage(page + 1)}
      disabled={page === maxPage}
    >
      &gt;
    </button>
  );

  return <div className="page-buttons-container">{pageButton}</div>;
};
