export type Comment = {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  articleId?: string;
  productId?: string;
  userId: string;
  author: {
    id: string;
    nickname: string;
    image: string | null;
  };
};

export type CommentWithRelations = Comment & {
  user: User;
  Article?: Article;
  Product?: Product;
};

export type CommentCreateInput = {
  content: string;
  articleId?: string;
  productId?: string;
  userId: string;
};

export type CommentUpdateInput = {
  content: string;
};

export type CommentFormData = {
  content: string;
};

// 다른 모델 참조를 위한 임시 타입 (순환 참조 방지)
type User = {
  id: string;
  email: string;
  nickname: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
};

type Article = {
  id: string;
  title: string;
  content: string;
  image: string[];
  createdAt: Date;
  updatedAt: Date;
  likes?: number;
  userId: string;
};

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string[];
  likes?: number;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  userId: string;
};
