import apiRequest from "./apiRequest";

// 전체 상품 목록 조회 (전체)
export async function getItems({ orderBy = "최신순", page = 1, limit = 10 }) {
  orderBy === "최신순" ? "최신순" : "좋아요순";

  const query = new URLSearchParams({
    orderBy: orderBy,
    page: page.toString(),
    take: limit.toString(),
  });

  const { products, totalCount } = await apiRequest(`/products?${query}`);
  return { products, totalCount };
}

// 전체 상품 목록 조회 (BEST)
export async function getBestItems(limit = 4) {
  const orderBy = "좋아요순";

  const { products } = await apiRequest(
    `/products?orderBy=${orderBy}&take=${limit}`
  );

  return products;
}

// 상품 하나 상세 조회
export async function getItemById(id) {
  const response = await apiRequest(`/products/${id}`);
  return response;
}

// 상품 (하나) 댓글 목록 조회
export async function getCommentsById(itemId, limit = 3, cursor = null) {
  let url = `/products/${itemId}/comments?limit=${limit}`;
  if (cursor) {
    url += `&cursor=${cursor}`;
  }

  const response = await apiRequest(url);
  return {
    nextCursor: response.nextCursor || null,
    list: response.list || [],
  };
}

export async function postItem(formData) {
  const response = await fetch("http://localhost:3002/products", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "상품 등록 실패");
  return data;
}
