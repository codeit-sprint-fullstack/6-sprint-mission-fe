import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { getProductList } from "../../api/api";
import "./ProductList.css";

const ProductList = () => {
  // 검색, 정렬, 페이지네이션을 하나의 객체로 관리
  const [queryParams, setQueryParams] = useState({
    search: "",
    sort: "createdAt",
    page: 1,
    pageSize: 10,
  });
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  // API 호출
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("fetchProducts 실행됨, queryParams:", queryParams);

        const { productsData, totalCount } = await getProductList(queryParams);

        console.log("API에서 받은 productsData:", productsData);
        console.log("API에서 받은 totalCount:", totalCount);

        setProducts(productsData);
        setTotalCount(totalCount);

        console.log("setProducts 실행 후 상태:", products);
      } catch (error) {
        console.error("API 호출 실패:", error);
      }
    };

    fetchProducts();
  }, [queryParams]);

  // 검색어 입력 핸들러
  const handleSearchChange = (e) => {
    setQueryParams((prev) => ({ ...prev, search: e.target.value, page: 1 }));
  };

  // 정렬 기준 변경 핸들러
  const handleSortChange = (e) => {
    setQueryParams((prev) => ({ ...prev, sort: e.target.value, page: 1 }));
  };

  // 페이지네이션 핸들러
  const handlePrevPage = () => {
    if (queryParams.page > 1) {
      setQueryParams((prev) => ({ ...prev, page: prev.page - 1 }));
    }
  };

  const handleNextPage = () => {
    if (queryParams.page < Math.ceil(totalCount / queryParams.pageSize)) {
      setQueryParams((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  };

  return (
    <div className="product-list-container">
      <h2>판매 중인 상품</h2>

      {/* 검색창 */}
      <input
        type="text"
        placeholder="검색할 상품을 입력해주세요"
        value={queryParams.search}
        onChange={handleSearchChange}
      />

      {/* 정렬 선택 */}
      <select value={queryParams.sort} onChange={handleSortChange}>
        <option value="createdAt">최신 순</option>
        <option value="favorite">좋아요 순</option>
      </select>

      {/* 상품 목록 */}
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>상품이 없습니다.</p>
        )}
      </div>

      {/* 페이지네이션 */}
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={queryParams.page === 1}>
          이전
        </button>
        <span>
          {queryParams.page} / {Math.ceil(totalCount / queryParams.pageSize)}
        </span>
        <button
          onClick={handleNextPage}
          disabled={
            queryParams.page === Math.ceil(totalCount / queryParams.pageSize)
          }
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default ProductList;
