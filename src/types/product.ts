export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  likes: number;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  userId: string;
  author: {
    id: string;
    nickname: string;
    image: string | null;
  };
  isLiked: boolean;
};

export type ProductWithRelations = Product & {
  user: User;
  Comment: Comment[];
  ProductLike: ProductLike[];
};

export type ProductCreateInput = {
  name: string;
  description: string;
  price: number;
  images: string[];
  tags: string[];
  userId: string;
  likes?: number;
};

export type ProductUpdateInput = Partial<Omit<ProductCreateInput, "userId">>;

export type ProductFormData = {
  name: string;
  description: string;
  price: number;
  tags: string[];
  images: File[];
  existingImages?: string[];
  newImages?: File[];
};

export type ProductEditFormData = {
  name: string;
  description: string;
  price: number;
  tags: string[];
  images: File[];
  existingImages?: string[];
  newImages?: File[];
};

export type ProductFormProps = {
  initialData?: Partial<ProductFormData>;
  onSubmit?: (productData: ProductFormData) => void;
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

type Comment = {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  articleId?: string;
  productId?: string;
  userId: string;
};

type ProductLike = {
  id: string;
  userId: string;
  productId: string;
  createdAt: Date;
};
