import React, { useState, useEffect } from "react";
import BestProducts from "./BestProducts";
import SaleProducts from "./SaleProducts";
import "./Market.css";

const Market = () => {
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

  return (
    <div className="market-container">
      <BestProducts />
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
      />
    </div>
  );
};

export default Market;
