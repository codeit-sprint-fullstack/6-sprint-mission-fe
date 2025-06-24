import { FormErrors, InternalFormData } from "@/types/form";

// 개별 유효성 검사 함수들
export const validateName = (name: string): boolean => {
  return name.length === 0 || name.length > 10;
};

export const validateDescription = (description: string): boolean => {
  return description.length < 10;
};

export const validatePrice = (price: string | number): boolean => {
  return isNaN(Number(price)) || Number(price) <= 0;
};

export const validateTags = (tags: string[]): boolean => {
  return tags.length === 0;
};

export const validateTagLength = (tag: string): boolean => {
  return tag.length > 5;
};

// 전체 폼 유효성 검사 함수
export const validateProductForm = (
  formData: InternalFormData,
  currentErrors: FormErrors
): { errors: FormErrors; isValid: boolean } => {
  const newErrors: FormErrors = {
    name: validateName(formData.name || ""),
    description: validateDescription(formData.description || ""),
    price: validatePrice(formData.price || ""),
    tags: validateTags(formData.tags || []),
    tagLength: currentErrors.tagLength, // 태그 입력 시에만 변경되는 값
  };

  const isValid = !Object.values(newErrors).some(Boolean);

  return { errors: newErrors, isValid };
};

// 특정 필드만 유효성 검사하는 함수
export const validateField = (
  fieldName: keyof Omit<FormErrors, "tagLength">,
  value: string | string[] | number,
  currentErrors: FormErrors
): FormErrors => {
  const updatedErrors = { ...currentErrors };

  switch (fieldName) {
    case "name":
      updatedErrors.name = validateName(value as string);
      break;
    case "description":
      updatedErrors.description = validateDescription(value as string);
      break;
    case "price":
      updatedErrors.price = validatePrice(value as string | number);
      break;
    case "tags":
      updatedErrors.tags = validateTags(value as string[]);
      break;
  }

  return updatedErrors;
};
