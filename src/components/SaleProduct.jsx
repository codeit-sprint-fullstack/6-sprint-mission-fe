import React, { useEffect, useState } from "react";
import "../styles/SaleProduct.css";
import { useFetchProductList } from "../hooks/service";

const SaleProduct = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const [sortType, setSortType] = useState("recent");

  const options = {
    page: currentPage,
    pageSize: 10,
    orderBy: sortType,
    keyword: "",
  };

  const { products, isLoading } = useFetchProductList(options);

  useEffect(() => {
    if (products && products.totalCount) {
      setTotalPages(Math.ceil(products.totalCount / 10));
    }
  }, [products]);

  const handleSortChange = (e) => {
    setSortType(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 4);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  console.log(products);

  return (
    <section>
      <div className="saleProductBox">
        <h4 className="saleProductTitle">판매 중인 상품</h4>
        <div className="saleProductOption">
          <label className="searchBox">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#9CA3AF"
            >
              <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
            </svg>
            <input type="text" placeholder="검색할 상품을 입력해주세요" />
          </label>
          <button>상품 등록하기</button>
          <select
            name="sortType"
            id="sortType"
            value={sortType}
            onChange={handleSortChange}
          >
            <option value="recent">최신순</option>
            <option value="favorite">좋아요순</option>
          </select>
        </div>
      </div>
      <div className="saleItems">
        {products.list.map((product) => (
          <div key={product.id} className="saleItem">
            <img src={product.images[0]} alt="" />
            <div className="saleItemPost">
              <p className="title">{product.name}</p>
              <p className="price">{product.price.toLocaleString()}원</p>
              <div className="likeBtn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#1f1f1f"
                >
                  <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
                </svg>
                <p>{product.favoriteCount}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pageNation">
        <div
          className="prevPage pageBox"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          {"<"}
        </div>
        {getPageNumbers().map((page) => (
          <div
            key={page}
            className={`pageNum pageBox ${
              currentPage === page ? "active" : ""
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </div>
        ))}
        <div
          className="nextPage pageBox"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          {">"}
        </div>
      </div>
    </section>
  );
};

export default SaleProduct;
