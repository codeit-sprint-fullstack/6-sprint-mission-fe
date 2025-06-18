export type Comment = {
  id: number;
  content: string;
  productId?: number;
  articleId?: number;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: string;
    nickname: string;
  };
};
