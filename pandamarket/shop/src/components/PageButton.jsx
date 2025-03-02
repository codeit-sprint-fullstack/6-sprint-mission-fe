import "./PageButton.css";

export const PageButton = ({ page, setPage, maxPage }) => {
  const handlePage = (newPage) => {
    setPage(newPage);
  };

  const pageButton = [];

  pageButton.push(
    <button
      className="page-button"
      onClick={() => setPage(page - 1)}
      disabled={page === 1}
    >
      &lt;
    </button>
  );

  for (let i = 1; i <= maxPage; i++) {
    pageButton.push(
      <button
        className="page-button page-number"
        onClick={() => handlePage(i)}
        disabled={i === page}
      >
        {i}
      </button>
    );
  }

  pageButton.push(
    <button
      className="page-button"
      onClick={() => setPage(page + 1)}
      disabled={page === maxPage}
    >
      &gt;
    </button>
  );

  return pageButton;
};
