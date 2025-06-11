export type Product = {
  name: string;
  description: string;
  price: number;
  tags: string[];
  newImages: File[];
};

export type ProductFormProps = {
  initialData: ProductFormProps;
  onSubmit: (productData: ProductFormProps) => void;
  submitText: string;
};
