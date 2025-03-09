import { useState, useEffect } from "react";
import "./Pagination.css";

export const Pagination = ({ pageLoad, params, totalCount }) => {
  const [pages, setPages] = useState([1, 2, 3, 4, 5]);
  const [currentPage, setCurrentPage] = useState(1);
  const [active, setActive] = useState({ 1: true });

  // 현재 페이지, 페이지 번호 초기화(정렬 선택 or 검색 시)
  useEffect(() => {
    setCurrentPage(1);
    setPages([1, 2, 3, 4, 5]);
  }, [params.orderBy, params.keyword]);

  // 렌더링(현재 페이지 변경 시) & 페이지 버튼 액티브 효과
  useEffect(() => {
    setActive({ [currentPage]: true });
    pageLoad(currentPage);
  }, [currentPage]);

  const pageBtnActvie = (e) => {
    setCurrentPage(Number(e.target.innerText));
  };

  // 화살표 버튼 효과
  const decreasePage = () => {
    if (currentPage <= 5) return;
    const prevPages = pages.map((page) => page - 5);

    setPages(prevPages);
    setCurrentPage(prevPages[4]);
  };

  const increasePage = () => {
    const nextPages = pages.map((page) => page + 5);
    if (nextPages[0] > Math.ceil(totalCount / params.pageSize)) return;

    setPages(nextPages);
    setCurrentPage(nextPages[0]);
  };

  return (
    <div className="page-btn-container">
      <button onClick={decreasePage} className="page-btn">
        <img
          src="/src/assets/image/market/ic_arrow_left.svg"
          alt="왼쪽 화살표"
        />
      </button>
      {pages.map((page) => {
        if (page > Math.ceil(totalCount / params.pageSize)) return;
        return (
          <button
            key={page}
            onClick={pageBtnActvie}
            className={`page-btn ${active[page] ? "active" : ""}`}
          >
            {page}
          </button>
        );
      })}
      <button onClick={increasePage} className="page-btn">
        <img
          src="/src/assets/image/market/ic_arrow_right.svg"
          alt="오른쪽 화살표"
        />
      </button>
    </div>
  );
};
