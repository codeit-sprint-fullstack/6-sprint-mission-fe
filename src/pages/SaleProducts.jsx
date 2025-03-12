import React from "react";
import useProducts from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import SearchControls from "../components/SearchControls";

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
      />
      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <>
          <div className="product-grid sale-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
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
