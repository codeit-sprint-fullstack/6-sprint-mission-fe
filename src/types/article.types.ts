export type Article = {
  id: number;
  title: string;
  content: string;
  images: string[];
  likeCount: number;
  createdAt: Date;
  updatedAt: Date;
  writer: {
    id: string;
    nickname: string;
  };
  isLiked: boolean;
};

export type ArticleListResponse = {
  list: Article[];
  totalCount: number;
};

export type ArticleParams = {
  page: number;
  pageSize: number;
  orderBy?: "recent" | "like";
  keyword?: string;
};
