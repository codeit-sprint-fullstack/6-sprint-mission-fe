import apiRequest from "./apiRequest";

// 전체 상품 목록 조회
export async function getItems() {
  const response = await apiRequest("/products");
  return response.list;
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
