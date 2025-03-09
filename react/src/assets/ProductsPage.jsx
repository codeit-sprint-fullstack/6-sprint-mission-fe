import React, { useState, useEffect } from "react";
import { getProducts } from "../api";
import "./ProductsPage.css";

const ProductsPage = () => {
  const [bestProducts, setBestProducts] = useState([]); // ✅ 베스트 상품 (4개)
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("createdAt");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const limit = 10; // ✅ 한 페이지당 10개

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // ✅ API에서 4개만 받아오도록 요청 수정
        const bestData = await getProducts({
          page: 1,
          pageSize: 4, // 🔥 4개만 요청
          orderBy: "favorite",
        });

        setBestProducts(bestData.slice(0, 4));
        // ✅ 일반 상품 (5개씩 2줄 -> 10개)
        const data = await getProducts({
          page,
          pageSize: limit, // ✅ 10개 요청 유지
          orderBy: sort,
          keyword: search,
        });
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, sort, search]);

  return (
    <div className="products-container">
      {/* 🔥 베스트 상품 섹션 */}
      <h2 className="best-title">베스트 상품</h2>
      <div className="best-products">
        {bestProducts.map((product) => (
          <div key={product.id} className="product-card best-card">
            {product.images?.length > 0 && (
              <img src={product.images[0]} alt={product.name} />
            )}
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-price">{product.price}원</p>
              <div className="product-likes">❤️ {product.likes}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 검색 & 정렬 */}
      <div className="filter-container">
        <input
          type="text"
          placeholder="🔎 검색할 상품을 입력하세요"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="register-btn">상품 등록하기</button>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="createdAt">최신순</option>
          <option value="likes">좋아요순</option>
        </select>
      </div>

      {/* 🔥 판매 중인 상품 */}
      <h2>판매 중인 상품</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            {product.images?.length > 0 && (
              <img src={product.images[0]} alt={product.name} />
            )}
            <div className="product-info">
              <h2>{product.name}</h2>
              <p className="product-price">{product.price}원</p>
              <div className="product-likes">❤️ {product.likes}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 페이지네이션 */}
      <div className="pagination">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          ⬅
        </button>
        <span> {page} </span>
        <button onClick={() => setPage((prev) => prev + 1)}>➡</button>
      </div>
    </div>
  );
};

export default ProductsPage;
