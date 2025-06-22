export interface User {
  id: number;
  userName: string;
  email: string;
  profileImage?: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  images?: string[];
  favoriteCount?: number;
  isLiked?: boolean;
  tags?: string[];
  user?: User;
  createdAt: string;
  updatedAt: string;
  writer?: User;
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt?: string;
  writer?: User;
  nickname?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  nickname: string;
}

export interface LoginResponse {
  token: string;
  nickname: string;
  message?: string;
}

export interface ApiResponse<T> {
  list: T[];
  totalCount: number;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
  orderBy: string;
  keyword: string;
}

export interface ImageUploadResponse {
  url: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  tags: string[];
  images: string[];
} 