import React, { useState, useEffect } from "react";
import { getProducts } from "../Api"; // 수정된 api.js에서 getProducts import

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("latest"); // 최신 순 or 좋아요 순
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const limit = 10; // 한 페이지에 표시할 상품 개수

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // getProducts 함수 호출하여 상품 목록 가져오기
        const data = await getProducts({
          page,
          pageSize: limit,
          orderBy: sort === "latest" ? "createdAt" : "likes",
          keyword: search,
        });
        setProducts(data); // 받아온 상품 데이터로 상태 업데이트
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, sort, search]); // 페이지, 정렬, 검색어가 변경될 때마다 재호출

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setPage(1); // 정렬 변경 시 첫 페이지로 이동
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // 검색어 변경 시 첫 페이지로 이동
  };

  return (
    <div>
      <h1>상품 목록</h1>
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="검색할 상품을 입력해주세요"
          value={search}
          onChange={handleSearchChange}
          style={{ marginLeft: "1rem" }}
        />
        <select value={sort} onChange={handleSortChange}>
          <option value="latest">최신 순</option>
          <option value="likes">좋아요 순</option>
        </select>
      </div>
      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <>
          <ul>
            {products.length > 0 ? (
              products.map((product) => (
                <li key={product.id}>
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                  <p>가격: {product.price} 원</p>
                  {product.images && product.images.length > 0 && (
                    <img
                      src={product.images[0]} // images 배열에서 첫 번째 이미지 사용
                      alt={product.name}
                      style={{ maxWidth: "200px", marginTop: "1rem" }}
                    />
                  )}
                  <p>태그: {product.tags.join(", ")}</p>
                  <p>작성자: {product.ownerNickname}</p>
                </li>
              ))
            ) : (
              <p>검색 결과가 없습니다.</p>
            )}
          </ul>
          <div style={{ marginTop: "1rem" }}>
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              이전
            </button>
            <span style={{ margin: "0 1rem" }}>페이지: {page}</span>
            <button onClick={() => setPage((prev) => prev + 1)}>다음</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsPage;
