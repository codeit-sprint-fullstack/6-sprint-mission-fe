import axios from "axios";

const BASE_URL = "https://panda-market-api.vercel.app/products";

// 상품 전체 조회
export async function getProducts() {
  try {
    const res = await axios.get(BASE_URL);
    return res.data;
  } catch (e) {
    console.error("상품 목록을 불러오는데 실패했습니다.", e);
    throw e;
  }
}

// 상품 등록
export async function createProduct(params) {
  try {
    const res = await axios.post(BASE_URL, params);
    return res.data;
  } catch (e) {
    console.error("상품 등록을 실패했습니다.", e);
    throw e;
  }
}

// 상품 상세 조회
export async function getProduct(productId) {
  try {
    const res = await axios.get(`${BASE_URL}/${productId}`);
    return res.data;
  } catch (e) {
    console.error("상품을 불러오는데 실패했습니다.", e);
    throw e;
  }
}

// 상품 수정
export async function updateProduct(productId, params) {
  try {
    const res = await axios.patch(`${BASE_URL}/${productId}`, params);
    return res.data;
  } catch (e) {
    console.error("상품 수정을 실패했습니다.", e);
    throw e;
  }
}

// 상품 삭제
export async function deleteProduct(productId) {
  try {
    const res = await axios.delete(`${BASE_URL}/${productId}`);
    return res.data;
  } catch (e) {
    console.error("상품 삭제를 실패했습니다.", e);
    throw e;
  }
}
