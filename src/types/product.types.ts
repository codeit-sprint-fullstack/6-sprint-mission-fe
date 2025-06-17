export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  tags: string[];
  images: string[];
  ownerId: string;
  favoriteCount: number;
  createdAt: Date;
  updatedAt: Date;
  ownerNickname: string;
  isFavorite: boolean;
};

export type ProductListResponse = {
  list: Product[];
  totalCount: number;
};

export type ProductParams = {
  page: number;
  pageSize: number;
  orderBy?: "recent" | "favorite";
  keyword?: string;
};
