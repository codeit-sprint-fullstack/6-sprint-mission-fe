import { defaultFetch, tokenFetch } from "../fetchClient";

export interface ProductForm {
  images: string[];
  tags: string[];
  price: number;
  description: string;
  name: string;
}

export interface QueryParams {
  [key: string]: string | number | boolean;
}

// 상품 목록 조회 (비회원 가능)
export const fetchProducts = async (params?: QueryParams): Promise<any> => {
  const query = params
    ? `?${new URLSearchParams(params as any).toString()}`
    : "";
  return await defaultFetch(`/products${query}`, { cache: "no-store" });
};

// 상품 상세 조회 (비회원 가능)
export const fetchProduct = async (id: string | number): Promise<any> => {
  return await defaultFetch(`/products/${id}`);
};

// 상품 등록 (회원 전용)
export const createProducts = async (product: ProductForm): Promise<any> => {
  return await tokenFetch("/products", {
    method: "POST",
    body: JSON.stringify(product),
  });
};

// 상품 수정 (회원 전용)
export const updateProducts = async (
  id: string | number,
  product: ProductForm
): Promise<any> => {
  return await tokenFetch(`/products/${id}`, {
    method: "PATCH",
    body: JSON.stringify(product),
  });
};

// 상품 삭제 (회원 전용)
export const deleteProducts = async (id: string | number): Promise<any> => {
  return await tokenFetch(`/products/${id}`, {
    method: "DELETE",
  });
};

// 상품 좋아요/좋아요 취소 (회원 전용)
export const toggleProductLike = async (id: string | number): Promise<any> => {
  return await tokenFetch(`/products/${id}/like`, { method: "POST" });
};

// 이미지 업로드 (회원 전용)
export const uploadProductImages = async (imageFiles: File[]): Promise<any> => {
  const formData = new FormData();

  imageFiles.forEach((file) => {
    formData.append("images", file); // 서버에서 기대하는 key 이름에 맞춰야 함
  });

  return await tokenFetch("/products/images", {
    method: "POST",
    body: formData,
  });
};
