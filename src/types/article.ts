export type Article = {
  id: string;
  title: string;
  content: string;
  images: File[];
  createdAt: Date;
  updatedAt: Date;
  likes?: number;
  userId: string;
  image: string[];
  author: {
    id: string;
    nickname: string;
    image: string;
  };
  isLiked: boolean;
};

export type ArticleWithRelations = Article & {
  user: User;
  ArticleLike: ArticleLike[];
  comments: Comment[];
};

export type ArticleCreateInput = {
  title: string;
  content: string;
  images: string[];
  userId: string;
  likes?: number;
};

export type ArticleUpdateInput = Partial<Omit<ArticleCreateInput, "userId">>;

export type ArticleFormData = {
  title: string;
  content: string;
  images: File[];
};

export type ArticleFormProps = {
  initialData?: Partial<ArticleFormData>;
  onSubmit: (articleData: ArticleFormData) => void;
  submitText: string;
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

type ArticleLike = {
  id: string;
  userId: string;
  articleId: string;
  createdAt: Date;
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
