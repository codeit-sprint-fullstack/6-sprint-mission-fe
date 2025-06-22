export interface Article {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  imageUrl?: string;
}

export interface ArticleComment {
  id: number;
  articleId: number;
  content: string;
  createdAt: string;
  updatedAt?: string;
}
