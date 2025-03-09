const BASE_URL = "https://panda-market-api.vercel.app/products"; // API URL

export const getProducts = async ({
  page = 1,
  pageSize = 10,
  orderBy = "createdAt",
  keyword = "",
  isBest = false, // 🔥 베스트 상품 여부 추가
}) => {
  const offset = (page - 1) * pageSize;
  const params = new URLSearchParams({
    offset: offset,
    limit: pageSize,
    order: isBest ? "favorite" : orderBy, // ✅ 베스트 상품이면 favorite 정렬
  });

  if (keyword.trim() !== "") {
    params.append("search", keyword);
  }

  try {
    const res = await fetch(`${BASE_URL}?${params.toString()}`);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    return data.list || []; // API가 list 배열을 반환한다고 가정
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
