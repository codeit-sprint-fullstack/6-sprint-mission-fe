const BASE_URL = "https://panda-market-api.vercel.app/products"; // API URL (예시)

export const getProducts = async ({
  page = 1,
  pageSize = 10,
  orderBy = "createdAt", // 기본값 "createdAt"
  keyword = "",
}) => {
  const offset = (page - 1) * pageSize;
  const params = new URLSearchParams({
    offset: offset,
    limit: pageSize,
    order: orderBy,
  });

  // 검색어가 있을 경우 추가
  if (keyword.trim() !== "") {
    params.append("search", keyword);
  }

  try {
    const res = await fetch(`${BASE_URL}/products?${params.toString()}`);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();

    // 상품 리스트가 'list' 키 안에 들어있다면 그 데이터를 반환
    return data.list || []; // 만약 'list'가 없다면 빈 배열 반환
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // 에러 발생 시 빈 배열 반환
  }
};
