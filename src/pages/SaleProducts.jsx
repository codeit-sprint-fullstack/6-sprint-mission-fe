import React from "react";
import useProducts from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import SearchControls from "../components/SearchControls";
import "./SaleProducts.css";

const SaleProducts = ({
  sort,
  setSort,
  page,
  setPage,
  pageSize,
  searchInput,
  setSearchInput,
  searchQuery,
  setSearchQuery,
  onRegisterClick, // 상품 등록 버튼 클릭 이벤트 props로 받음
}) => {
  const { products, totalCount, loading } = useProducts(
    sort,
    page,
    pageSize,
    searchQuery
  );
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <section className="sale-products">
      <SearchControls
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        onSearch={() => {
          setSearchQuery(searchInput);
          setPage(1);
        }}
        sort={sort}
        setSort={setSort}
        onRegisterClick={onRegisterClick} // SearchControls에 전달
      />
      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <>
          <div className="product-grid sale-grid">
            {products.length === 0 ? (
              <p className="no-products-message">판매 중인 상품이 없습니다.</p>
            ) : (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </section>
  );
};

export default SaleProducts;
