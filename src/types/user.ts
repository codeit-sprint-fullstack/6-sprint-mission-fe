export type User = {
  user: {
    id: string;
    email: string;
    nickname: string;
    image?: string;
    encryptedPassword: string;
    createdAt: Date;
    updatedAt: Date;
    refreshToken?: string;
  };
};

export type UserWithRelations = User & {
  ArticleLike: ArticleLike[];
  ProductLike: ProductLike[];
  Article: Article[];
  Product: Product[];
  Comment: Comment[];
};

export type UserCreateInput = {
  email: string;
  nickname: string;
  image?: string;
  encryptedPassword: string;
  refreshToken?: string;
};

export type UserUpdateInput = Partial<Omit<UserCreateInput, "email">>;

// 다른 모델 참조를 위한 임시 타입 (순환 참조 방지)
type ArticleLike = {
  id: string;
  userId: string;
  articleId: string;
  createdAt: Date;
};

type ProductLike = {
  id: string;
  userId: string;
  productId: string;
  createdAt: Date;
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

type Comment = {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  articleId?: string;
  productId?: string;
  userId: string;
};
