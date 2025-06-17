// 이미지 객체 타입
export type ImageObject = {
  url?: string;
  file?: File;
  preview: string;
  isExisting: boolean;
};

// 폼 데이터 타입 (내부 상태용)
export type InternalFormData = {
  name?: string;
  description?: string;
  price?: string | number;
  tags?: string[];
};

// 폼 에러 상태 타입
export type FormErrors = {
  name: boolean;
  description: boolean;
  price: boolean;
  tags: boolean;
  tagLength: boolean;
};

// 입력 참조 타입
export type FormInputRefs = {
  nameRef: React.RefObject<HTMLInputElement | null>;
  descriptionRef: React.RefObject<HTMLTextAreaElement | null>;
  priceRef: React.RefObject<HTMLInputElement | null>;
  tagRef: React.RefObject<HTMLInputElement | null>;
};

// === 컴포넌트 Props 타입들 ===

// FormField 컴포넌트 Props
export type FormFieldProps = {
  label: string;
  name: string;
  type?: "text" | "number" | "textarea";
  value: string | number;
  placeholder: string;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  inputRef?: React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
  className?: string;
};

// FormHeader 컴포넌트 Props
export type FormHeaderProps = {
  submitText: string;
  isFormValid: boolean;
  isLoading: boolean;
};

// TagInput 컴포넌트 Props
export type TagInputProps = {
  tags: string[];
  inputTag: string;
  tagError: boolean;
  tagLengthError: boolean;
  onTagInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddTag: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onDeleteTag: (e: React.MouseEvent, tag: string) => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
};

// ImageUploadSection 컴포넌트 Props
export type ImageUploadSectionProps = {
  images: ImageObject[];
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (index: number) => void;
  maxImages?: number;
};
