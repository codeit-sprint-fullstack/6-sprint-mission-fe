// 사용자 관련 타입
export interface User {
  id: number;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

// 게시글 관련 타입
export interface Article {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: User;
  likeCount: number;
}

// 상품 관련 타입
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  author: User;
  favoriteCount: number;
  likeCount: number;
}

// 댓글 관련 타입
export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: User;
  articleId: number;
}

// API 응답 타입
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

// 로그인 요청 타입
export interface LoginRequest {
  email: string;
  password: string;
}

// 회원가입 요청 타입
export interface SignupRequest {
  email: string;
  password: string;
  name: string;
}

// 게시글 생성 요청 타입
export interface CreateArticleRequest {
  title: string;
  content: string;
}

// 상품 생성 요청 타입
export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
}

// 댓글 생성 요청 타입
export interface CreateCommentRequest {
  content: string;
}

// 정렬 옵션 타입
export type SortOption = "recent" | "favorite" | "likes";

// 컴포넌트 Props 타입
export interface ButtonProps {
  buttonText: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export interface ArticleProps {
  id: number;
  title: string;
  createdAt: string;
  name: string;
  like: number;
}

export interface BestArticleProps extends ArticleProps {}

export interface MarketProductProps {
  id: number;
  name: string;
  price: number;
  favoriteCount: number;
}

export interface BestProductProps extends MarketProductProps {}

export interface DropdownMenuProps {
  id: number;
  type: "article" | "product" | "comment";
  article?: Article;
  product?: Product;
  articleId?: number;
  onEdit?: () => void;
  onDeleted?: () => void;
}

export interface AddCommentProps {
  articleId: number;
  boardType: string;
}

export interface CommentsProps {
  articleId: number;
}

export interface OpenEditProps {
  onSelectSort: (sort: SortOption) => void;
}
