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
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const bestData = await getProducts({
          page: 1,
          pageSize: 4,
          orderBy: "favorite",
        });

        setBestProducts(bestData);

        const data = await getProducts({
          page,
          pageSize: limit,
          orderBy: sort,
          keyword: search,
        });

        setProducts(data.list);
        setTotalPages(Math.ceil(data.total / limit));
      } catch (error) {
        console.error("Error fetching products:", error);
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
      <BestProducts bestProducts={bestProducts} />

      <ProductFilter
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
        onRegister={handleRegisterClick}
      />

      {loading ? (
        <p className="loading-text">상품을 불러오는 중입니다...</p>
      ) : (
        <>
          <ProductList products={products} />

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
