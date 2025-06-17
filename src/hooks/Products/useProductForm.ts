"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  ImageObject,
  InternalFormData,
  FormErrors,
  FormInputRefs,
} from "@/types/form";
import { ProductFormData, ProductEditFormData } from "@/types/product";
import { productsService } from "@/api/products";
import {
  validateProductForm,
  validateTags,
  validateTagLength,
} from "@/utils/validation";

type UseProductFormProps = {
  initialData?: Partial<ProductFormData>;
  onSubmit?: (productData: ProductEditFormData) => void;
  submitText?: string;
};

export function useProductForm({
  initialData,
  onSubmit,
  submitText = "등록",
}: UseProductFormProps = {}) {
  const router = useRouter();

  // 폼 상태 관리
  const [formData, setFormData] = useState<InternalFormData>(
    initialData || {
      name: "",
      description: "",
      price: "",
      tags: [] as string[],
    }
  );
  const [inputTag, setInputTag] = useState("");
  const [images, setImages] = useState<ImageObject[]>([]);
  const [errors, setErrors] = useState<FormErrors>({
    name: false,
    description: false,
    price: false,
    tags: false,
    tagLength: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // 입력 참조
  const inputRef: FormInputRefs = {
    nameRef: useRef<HTMLInputElement>(null),
    descriptionRef: useRef<HTMLTextAreaElement>(null),
    priceRef: useRef<HTMLInputElement>(null),
    tagRef: useRef<HTMLInputElement>(null),
  };

  // 초기 데이터 설정
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);

      // 기존 이미지가 있는 경우 이미지 배열 초기화
      if (
        initialData.images &&
        Array.isArray(initialData.images) &&
        initialData.images.length > 0
      ) {
        const initialImages: ImageObject[] = initialData.images.map(
          (imgUrl) => ({
            url: typeof imgUrl === "string" ? imgUrl : undefined,
            preview: `${process.env.NEXT_PUBLIC_API_URL}${imgUrl}`,
            isExisting: true,
          })
        );
        setImages(initialImages);
      }
    }
  }, [initialData]);

  // formData 변경 시 유효성 검사 실행
  useEffect(() => {
    const { errors: newErrors, isValid } = validateProductForm(
      formData,
      errors
    );
    setErrors(newErrors);
    setIsFormValid(isValid);
  }, [formData]);

  // 컴포넌트 언마운트 시 메모리 정리
  useEffect(() => {
    return () => {
      images.forEach((image) => {
        if (!image.isExisting && image.preview) {
          URL.revokeObjectURL(image.preview);
        }
      });
    };
  }, [images]);

  // 이미지 업로드 처리
  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setImages((prev) => [
          ...prev,
          { file, preview: imageUrl, isExisting: false },
        ]);
      }
    },
    []
  );

  // 이미지 삭제 처리
  const removeImage = useCallback(
    (index: number) => {
      const newImages = [...images];
      if (!newImages[index].isExisting) {
        URL.revokeObjectURL(newImages[index].preview);
      }
      newImages.splice(index, 1);
      setImages(newImages);
    },
    [images]
  );

  // 전체 폼 유효성 검사
  const validateForm = useCallback(() => {
    const { errors: newErrors, isValid } = validateProductForm(
      formData,
      errors
    );
    setErrors(newErrors);
    setIsFormValid(isValid);
    return isValid;
  }, [formData, errors]);

  // 입력값 변경 핸들러
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  // 태그 입력 핸들러
  const handleTagInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputTag(e.target.value);
    },
    []
  );

  // 태그 추가 핸들러
  const handleAddTag = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (!inputTag || (formData.tags && formData.tags.includes(inputTag))) {
          alert("태그가 비었거나 이미 존재하는 태그입니다.");
          setInputTag("");
          return;
        }
        if (validateTagLength(inputTag)) {
          setErrors((prev) => ({ ...prev, tagLength: true }));
          return;
        } else {
          setErrors((prev) => ({ ...prev, tagLength: false }));
        }

        const updatedTags = [...(formData.tags || []), inputTag];
        setFormData((prev) => ({
          ...prev,
          tags: updatedTags,
        }));

        setErrors((prev) => ({ ...prev, tags: validateTags(updatedTags) }));
        setInputTag("");
      }
    },
    [inputTag, formData.tags]
  );

  // 태그 삭제 핸들러
  const handleDeleteTag = useCallback(
    (e: React.MouseEvent, tagToDelete: string) => {
      e.preventDefault();

      const updatedTags = (formData.tags || []).filter(
        (t) => t !== tagToDelete
      );
      setFormData((prev) => ({
        ...prev,
        tags: updatedTags,
      }));

      setErrors((prev) => ({ ...prev, tags: validateTags(updatedTags) }));
    },
    [formData.tags]
  );

  // 폼 제출 핸들러
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);

      if (!validateForm()) {
        setIsLoading(false);
        return;
      }

      const formDataToSubmit: ProductEditFormData = {
        name: formData.name || "",
        description: formData.description || "",
        price: Number(formData.price) || 0,
        tags: formData.tags || [],
        images: images.filter((img) => !img.isExisting).map((img) => img.file!),
        existingImages: images
          .filter((img) => img.isExisting)
          .map((img) => img.url!),
        newImages: images
          .filter((img) => !img.isExisting)
          .map((img) => img.file!),
      };

      try {
        if (onSubmit) {
          // 수정 모드 - 외부에서 제공된 onSubmit 함수 사용
          onSubmit(formDataToSubmit);
        } else {
          // 등록 모드 - 내부에서 API 호출 처리
          const form = new FormData();

          form.append("name", formDataToSubmit.name);
          form.append("description", formDataToSubmit.description);
          form.append("price", String(formDataToSubmit.price));
          form.append("tags", JSON.stringify(formDataToSubmit.tags));

          if (formDataToSubmit.images && formDataToSubmit.images.length > 0) {
            formDataToSubmit.images.forEach((file: File) => {
              form.append("images", file);
            });
          }

          const result = await productsService.createProduct(form);

          if (result && result.product && result.product.id) {
            router.push(`/items/${result.product.id}`);
          } else {
            throw new Error("상품 등록 후 ID를 받지 못했습니다.");
          }
        }
      } catch (error) {
        console.error("상품 처리 실패:", error);
        alert(`상품 ${submitText}에 실패했습니다.`);
      } finally {
        setIsLoading(false);
      }
    },
    [formData, images, onSubmit, submitText, router, validateForm]
  );

  return {
    // 상태값
    formData,
    inputTag,
    images,
    errors,
    isLoading,
    isFormValid,
    inputRef,

    // 핸들러 함수들
    handleImageUpload,
    removeImage,
    handleChange,
    handleTagInput,
    handleAddTag,
    handleDeleteTag,
    handleSubmit,
    validateForm,
  };
}
