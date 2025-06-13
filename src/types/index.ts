export * from "./common";

export type User = {
  id: number;
  email: string;
  nickname: string;
  password: string;
  image: string | null;
  provider: "local" | "google" | "kakao";
  providerId: string | null;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  tags: string[];
  images: string[];
  ownerId: number;
  favoriteCount: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Article = {
  id: number;
  title: string;
  content: string;
  images: string[];
  likeCount: number;
  createdAt: Date;
  updatedAt: Date;
  writer: {
    id: number;
    nickname: string;
  };
};

export type Comment = {
  id: number;
  content: string;
  productId?: number;
  articleId?: number;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: string;
  };
};
