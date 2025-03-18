import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 임포트
import BestProducts from "./BestProducts";
import SaleProducts from "./SaleProducts";
import "./Market.css";

const Market = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setPageSize(10);
      } else if (window.innerWidth > 768) {
        setPageSize(6);
      } else {
        setPageSize(4);
      }
      setPage(1);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleRegisterClick = () => {
    navigate("/registration"); // 상품 등록 페이지로 이동
  };

  return (
    <div className="market-container">
      {/* <BestProducts /> */}
      <SaleProducts
        sort={sort}
        setSort={setSort}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onRegisterClick={handleRegisterClick} // 상품 등록 버튼 클릭 이벤트 전달
      />
    </div>
  );
};

export default Market;
