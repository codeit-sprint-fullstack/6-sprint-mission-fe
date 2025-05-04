import axiosInstance from "./axiosInstance";

// 전체 상품 목록 조회 (검색, 정렬 포함)
export const getProducts = async ({ orderBy, page, pageSize, keyword }) => {
  const res = await axiosInstance.get("/products", {
    params: {
      orderBy,
      page,
      pageSize,
      keyword,
    },
  });
  return res.data;
};

// 상품 상세 조회
export const getProductById = async (productId) => {
  const res = await axiosInstance.get(`/products/${productId}`);
  return res.data;
};

// 상품 등록 (POST /products)
export const createProduct = async (formData) => {
  const res = await axiosInstance.post("/products", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

// 상품 수정 (PATCH /products/{productId})
export const updateProduct = async (productId, formData) => {
  const res = await axiosInstance.patch(`/products/${productId}`, formData);
  return res.data;
};

// 상품 삭제 (DELETE /products/{productId})
export const deleteProduct = async (productId) => {
  const res = await axiosInstance.delete(`/products/${productId}`);
  return res.data;
};

// 상품 좋아요 (POST /products/{productId}/favorite)
export const likeProduct = async (productId) => {
  const res = await axiosInstance.post(`/products/${productId}/favorite`);
  return res.data;
};

// 상품 좋아요 취소 (DELETE /products/{productId}/favorite)
export const unlikeProduct = async (productId) => {
  const res = await axiosInstance.delete(`/products/${productId}/favorite`);
  return res.data;
};

// 댓글 생성
export const postProductComment = async (productId, content) => {
  const res = await axiosInstance.post(`/products/${productId}/comments`, {
    content,
  });
  return res.data;
};

// 댓글 목록 조회
export const getProductComments = async (productId, limit = 10) => {
  const res = await axiosInstance.get(`/products/${productId}/comments`, {
    params: {
      limit,
    },
  });
  return res.data;
};

// 댓글 수정
export const updateProductComment = async (commentId, content) => {
  const res = await axiosInstance.patch(`/comments/${commentId}`, {
    content,
  });
  return res.data;
};

// 댓글 삭제
export const deleteProductComment = async (commentId) => {
  const res = await axiosInstance.delete(`/comments/${commentId}`);
  return res.data;
};
