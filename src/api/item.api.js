import axiosInstance from "./axiosInstance";

// 전체 상품 목록 조회 (검색, 정렬 포함)
export const getProducts = async ({ sort, page, pageSize, keyword }) => {
  const res = await axiosInstance.get("/products", {
    params: {
      sort, // orderBy → sort 변경
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

// FormData 사용 시 Content-Type 자동 설정되도록
export const createProduct = async (formData) => {
  const res = await axiosInstance.post("/products", formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

// 상품 수정 (PATCH /products/{productId})
export const updateProduct = async (productId, formData) => {
  const res = await axiosInstance.patch(`/products/${productId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
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
export const updateProductComment = async (productId, commentId, content) => {
  const res = await axiosInstance.patch(
    `/products/${productId}/comments/${commentId}`,
    {
      content,
    }
  );
  return res.data;
};

// 댓글 삭제
export const deleteProductComment = async (productId, commentId) => {
  const res = await axiosInstance.delete(
    `/products/${productId}/comments/${commentId}`
  );
  return res.data;
};

// 베스트 상품 조회 API 추가
export const getBestProducts = async (limit = 4) => {
  const res = await axiosInstance.get("/products/best", {
    params: {
      limit,
    },
  });
  return res.data;
};
