export const PageBar = ({ maxPage, currentPage, pageChange }) => {
  const maxPageNum = 5;
  let startPage;

  if (maxPage <= maxPageNum) {
    startPage = 1;
  } else {
    startPage = Math.max(currentPage - Math.floor(maxPageNum / 2), 1);
    startPage = Math.min(startPage, maxPage - maxPageNum + 1);
  }
};
