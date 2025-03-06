import { useState, useEffect } from "react";

const API_URL = "https://panda-market-api.vercel.app/products";

const useProducts = (sort, page, pageSize, search = "") => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      try {
        const searchParam = search
          ? `&keyword=${encodeURIComponent(search)}`
          : "";
        const response = await fetch(
          `${API_URL}?page=1&pageSize=1000${searchParam}`
        );
        const data = await response.json();
        setAllProducts(data.list);
      } catch (error) {
        console.error("상품 불러오기 실패:", error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [search]);

  let sortedProducts = [...allProducts];
  if (sort === "latest") {
    sortedProducts.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  } else if (sort === "favorite") {
    sortedProducts.sort((a, b) => b.favoriteCount - a.favoriteCount);
  }

  const totalCount = sortedProducts.length;
  const startIndex = (page - 1) * pageSize;
  const paginatedProducts = sortedProducts.slice(
    startIndex,
    startIndex + pageSize
  );

  return { products: paginatedProducts, totalCount, loading };
};

export default useProducts;
