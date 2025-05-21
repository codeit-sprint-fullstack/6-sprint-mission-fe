import { defaultFetch, tokenFetch } from "../fetchClient";

//상품 목록 조회 (비회원 가능)
export const fetchProducts = async (params) => {
  const query = params ? `?${new URLSearchParams(params)}` : "";
  return await defaultFetch(`/products${query}`, { cache: "no-store" });
};

//상품 상세 조회 (비회원 가능)
export const fetchProduct = async (id) => {
  return await defaultFetch(`/products/${id}`);
};

//상품 등록 (회원 전용)
export const createProducts = async ({
  images,
  tags,
  price,
  description,
  name,
}) => {
  return await tokenFetch("/products", {
    method: "POST",
    body: JSON.stringify({ images, tags, price, description, name }),
  });
};

//상품 수정 (회원 전용)
export const updateProducts = async (
  id,
  { images, tags, price, description, name }
) => {
  return await tokenFetch(`/products/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ images, tags, price, description, name }),
  });
};

//상품 삭제 (회원 전용)
export const deleteProducts = async (id) => {
  return await tokenFetch(`/products/${id}`, {
    method: "DELETE",
  });
};

//상품 좋아요/좋아요 취소 (회원 전용)
export const toggleProductLike = async (id) => {
  return await tokenFetch(`/products/${id}/like`, { method: "POST" });
};

// 이미지 업로드 (회원 전용)
export const uploadProductImages = async (imageFiles) => {
  const formData = new FormData();

  imageFiles.forEach((file) => {
    formData.append("images", file); // ⚠️ key는 서버에서 기대하는 이름과 일치해야 함
  });

  return await tokenFetch("/products/images", {
    method: "POST",
    body: formData,
  });
};
