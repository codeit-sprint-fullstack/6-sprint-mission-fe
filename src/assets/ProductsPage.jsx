import React, { useState, useEffect } from "react";
import { getProducts } from "../api";
import "./ProductsPage.css";

const ProductsPage = () => {
  const [bestProducts, setBestProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("createdAt");
  const [search, setSearch] = useState("");
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

        setBestProducts(bestData.slice(0, 4));

        const data = await getProducts({
          page,
          pageSize: limit,
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
      <h3 className="best-title">베스트 상품</h3>
      <div className="best-products">
        {bestProducts.map((product) => (
          <div key={product.id} className="product-card best-card">
            {product.images?.length > 0 && (
              <img src={product.images[0]} alt={product.name} />
            )}
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-price">{product.price}원</p>
              <div className="product-likes">♡ {product.likes}</div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <div className="filter-container">
          <h3 className="sell-title">판매 중인 상품</h3>
          <div>
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
        </div>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            {product.images?.length > 0 && (
              <img src={product.images[0]} alt={product.name} />
            )}
            <div className="product-info">
              <h2>{product.name}</h2>
              <p className="product-price">{product.price}원</p>
              <div className="product-likes">♡ {product.likes}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          ◀
        </button>

        {[...Array(5)].map((_, index) => (
          <button
            key={index}
            className={page === index + 1 ? "active" : ""}
            onClick={() => setPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button onClick={() => setPage((prev) => prev + 1)}>▶</button>
      </div>
    </div>
  );
};

export default ProductsPage;
