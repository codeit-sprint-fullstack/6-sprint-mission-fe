import React, { useState, useEffect } from "react";
import { getProducts } from "../api";
import BestProducts from "../component/BestProducts";
import ProductFilter from "../component/ProductFilter";
import ProductList from "../component/ProductList";
import Pagination from "../component/Pagination";
import "./ProductsPage.css";

const ProductsPage = () => {
  const [bestProducts, setBestProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("createdAt");
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1); // ✅ totalPages 추가
  const [loading, setLoading] = useState(false);
  const limit = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // ✅ 베스트 상품 데이터 가져오기
        const bestData = await getProducts({
          page: 1,
          pageSize: 4,
          orderBy: "favorite",
        });

        setBestProducts(bestData); // ✅ slice(0, 4) 제거

        // ✅ 일반 상품 목록 가져오기
        const data = await getProducts({
          page,
          pageSize: limit,
          orderBy: sort,
          keyword: search,
        });

        setProducts(data.list); // ✅ API 응답이 list 형태로 올 경우 대응
        setTotalPages(Math.ceil(data.total / limit)); // ✅ 전체 페이지 계산 추가
      } catch (error) {
        console.error("❌ Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, sort, search]);

  const handleRegisterClick = () => {
    alert("상품 등록 페이지로 이동합니다.");
  };

  return (
    <div className="products-container">
      {/* 🔹 베스트 상품 컴포넌트 */}
      <BestProducts bestProducts={bestProducts} />

      {/* 🔹 검색 & 정렬 필터 */}
      <ProductFilter
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
        onRegister={handleRegisterClick}
      />

      {/* 🔹 로딩 중일 때 표시 */}
      {loading ? (
        <p className="loading-text">상품을 불러오는 중입니다...</p>
      ) : (
        <>
          {/* 🔹 상품 목록 */}
          <ProductList products={products} />

          {/* 🔹 페이지네이션 */}
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
};

export default ProductsPage;
