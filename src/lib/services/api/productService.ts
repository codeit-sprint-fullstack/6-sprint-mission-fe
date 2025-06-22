import { defaultFetch, tokenFetch } from "./fetchClient";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  tags: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
  ownerNickname?: string;
  isFavorite?: boolean;
  favoriteCount?: number;
}

export interface Comment {
  id: number;
  content: string;
  writer: { nickname: string };
  createdAt: string;
}

export interface ProductListResponse {
  list: Product[];
  totalCount?: number;
}

export interface CommentListResponse {
  list: Comment[];
  totalCount?: number;
}

export interface NewProduct {
  name: string;
  description: string;
  price: number;
  tags: string[];
  images: (string | File)[];
}

export interface EditProduct extends NewProduct {}

export const productService = {
  // 상품 목록 조회 (비회원 가능)
  getProducts: async (
    page = 1,
    pageSize = 5,
    orderBy = "recent",
    keyword = ""
  ): Promise<ProductListResponse> => {
    const query = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      orderBy,
      keyword,
    }).toString();
    return await defaultFetch(`/products?${query}`);
  },

  // 상품 상세 조회 (비회원 가능)
  getProduct: async (id: number | string): Promise<Product> => {
    return await defaultFetch(`/products/${id}`);
  },

  // 상품 등록 (회원 전용)
  createProduct: async (product: NewProduct): Promise<{ id: number }> => {
    return await tokenFetch("/products", {
      method: "POST",
      body: JSON.stringify(product),
    });
  },

  // 상품 수정 (회원 전용)
  updateProduct: async (
    id: number | string,
    product: EditProduct
  ): Promise<Product> => {
    return await tokenFetch(`/products/${id}`, {
      method: "PATCH",
      body: JSON.stringify(product),
    });
  },

  // 상품 삭제 (회원 전용)
  deleteProduct: async (id: number | string): Promise<{ ok: boolean }> => {
    return await tokenFetch(`/products/${id}`, {
      method: "DELETE",
    });
  },

  // 상품 좋아요 (회원 전용)
  likeProduct: async (id: number | string): Promise<{ ok: boolean }> => {
    return await tokenFetch(`/like/products/${id}`, {
      method: "POST",
    });
  },

  // 좋아요 취소 (회원 전용)
  unlikeProduct: async (id: number | string): Promise<{ ok: boolean }> => {
    return await tokenFetch(`/like/products/${id}`, {
      method: "DELETE",
    });
  },

  // 상품 댓글 목록 조회 (비회원 가능)
  getProductComments: async (
    id: number | string,
    limit = 3,
    cusor = 0
  ): Promise<CommentListResponse> => {
    return await defaultFetch(`/comments/products/${id}`);
  },

  // 상품 댓글 작성 (회원 전용)
  createProductComment: async (
    id: number | string,
    { content }: { content: string }
  ): Promise<Comment> => {
    return await tokenFetch(`/comments/products/${id}`, {
      method: "POST",
      body: JSON.stringify({ content }),
    });
  },

  // 상품 댓글 수정 (회원 전용)
  updateProductComment: async (
    commentId: number | string,
    { content }: { content: string }
  ): Promise<Comment> => {
    return await tokenFetch(`/comments/${commentId}`, {
      method: "PATCH",
      body: JSON.stringify({ content }),
    });
  },

  // 상품 댓글 삭제 (회원 전용)
  deleteProductComment: async (
    commentId: number | string
  ): Promise<{ ok: boolean }> => {
    return await tokenFetch(`/comments/${commentId}`, {
      method: "DELETE",
    });
  },
};
