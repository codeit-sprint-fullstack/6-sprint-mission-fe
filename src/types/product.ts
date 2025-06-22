export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
  tags: string[];
  favoriteCount: number;
  isFavorite?: boolean;
  ownerId: string;
  createdAt: string;
}

export interface ProductComment {
  id: number;
  productId: number;
  content: string;
  createdAt: string;
  updatedAt?: string;
  writer?: {
    nickname: string;
  };
}

export interface GetProductsParams {
  sort?: string;
  page?: number;
  pageSize?: number;
  keyword?: string;
}
