"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { updateProduct, deleteProduct } from "@/api/item.api";
import Input from "@/components/ui/Input";
import TagInput from "@/components/ui/TagInput";
import { getProductById } from "@/api/item.api";

export default function EditItemPage() {
  const { itemId } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    tags: [],
    imageFiles: [], // 새로 추가할 이미지 파일
    imagePreviewUrls: [], // 새 이미지 미리보기 URL
    existingImages: [], // 기존 이미지 URL
  });
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 이미지 URL 처리 함수
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;

    // 이미 전체 URL인 경우
    if (imagePath.startsWith("http")) return imagePath;

    // 상대 경로인 경우 백엔드 URL 추가
    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
    return `${baseUrl}/${imagePath}`;
  };

  // 상품 데이터 로드
  useEffect(() => {
    const loadProductData = async () => {
      setIsLoading(true);
      try {
        if (!itemId) {
          console.error("상품 ID가 없습니다.");
          return;
        }

        const productData = await getProductById(itemId);

        // 기존 이미지 URL 생성
        const existingImages =
          productData.images?.map((img) => getImageUrl(img)) || [];

        setForm({
          name: productData.name,
          description: productData.description,
          price: productData.price?.toString() || "", // 숫자를 문자열로 변환
          tags: productData.tags || [],
          imageFiles: [],
          imagePreviewUrls: [],
          existingImages: existingImages,
        });
      } catch (error) {
        console.error("상품 정보 로드 실패", error);
        alert("상품 정보를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    if (itemId) loadProductData();
  }, [itemId]);

  // 폼 유효성 검사를 관리하는 useEffect
  useEffect(() => {
    if (isLoading) return; // 로딩 중에는 유효성 검사 스킵

    const formHasRequiredFields =
      form.name &&
      form.description &&
      form.price &&
      form.tags.length > 0 &&
      (form.existingImages.length > 0 || form.imageFiles.length > 0);

    const formHasNoErrors = Object.keys(errors).length === 0;

    setIsFormValid(formHasRequiredFields && formHasNoErrors);
  }, [form, errors, isLoading]);

  const validate = () => {
    const newErrors = {};
    if (form.name.length < 2 || form.name.length > 10) {
      newErrors.name = "2자 이상 10자 이내로 입력해주세요";
    }
    if (form.description.length < 10) {
      newErrors.description = "10자 이상 입력해주세요.";
    }
    if (!/^\d+$/.test(form.price)) {
      newErrors.price = "숫자로 입력해주세요.";
    } else if (Number(form.price) <= 0) {
      newErrors.price = "가격은 0보다 커야 합니다.";
    }
    if (form.tags.length === 0) {
      newErrors.tags = "태그를 1개 이상 입력해주세요.";
    }
    if (form.existingImages.length === 0 && form.imageFiles.length === 0) {
      newErrors.images = "이미지를 1개 이상 등록해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 이미지 처리 함수
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // 현재 이미지 개수 확인
    const currentImageCount =
      form.existingImages.length + form.imageFiles.length;
    const remainingSlots = 3 - currentImageCount;
    const filesToAdd = files.slice(0, remainingSlots);

    if (files.length > remainingSlots) {
      alert(`이미지는 최대 3개까지 등록 가능합니다.`);
    }

    // 새로운 미리보기 URL 생성
    const newPreviewUrls = filesToAdd.map((file) => URL.createObjectURL(file));

    setForm((prev) => ({
      ...prev,
      imageFiles: [...prev.imageFiles, ...filesToAdd],
      imagePreviewUrls: [...prev.imagePreviewUrls, ...newPreviewUrls],
    }));

    // 에러 제거
    setErrors((prev) => {
      const updatedErrors = { ...prev };
      if (
        form.existingImages.length > 0 ||
        form.imageFiles.length + filesToAdd.length > 0
      ) {
        delete updatedErrors.images;
      }
      return updatedErrors;
    });

    // input을 리셋하여 같은 파일을 다시 선택할 수 있게 함
    e.target.value = "";
  };

  // 새 이미지 제거 함수
  const handleRemoveNewImage = (indexToRemove) => {
    // 미리보기 URL 해제
    URL.revokeObjectURL(form.imagePreviewUrls[indexToRemove]);

    setForm((prev) => ({
      ...prev,
      imageFiles: prev.imageFiles.filter((_, i) => i !== indexToRemove),
      imagePreviewUrls: prev.imagePreviewUrls.filter(
        (_, i) => i !== indexToRemove
      ),
    }));

    // 에러 처리
    if (form.existingImages.length === 0 && form.imageFiles.length <= 1) {
      setErrors((prev) => ({
        ...prev,
        images: "이미지를 1개 이상 등록해주세요.",
      }));
    }
  };

  // 기존 이미지 제거 함수
  const handleRemoveExistingImage = (indexToRemove) => {
    setForm((prev) => ({
      ...prev,
      existingImages: prev.existingImages.filter((_, i) => i !== indexToRemove),
    }));

    // 에러 처리
    if (form.existingImages.length <= 1 && form.imageFiles.length === 0) {
      setErrors((prev) => ({
        ...prev,
        images: "이미지를 1개 이상 등록해주세요.",
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => {
      const updatedErrors = { ...prev };

      if (name === "name") {
        if (value.length < 2 || value.length > 10) {
          updatedErrors.name = "2자 이상 10자 이내로 입력해주세요";
        } else {
          delete updatedErrors.name;
        }
      }

      if (name === "description") {
        if (value.length < 10) {
          updatedErrors.description = "10자 이상 입력해주세요.";
        } else {
          delete updatedErrors.description;
        }
      }

      if (name === "price") {
        if (!/^\d+$/.test(value)) {
          updatedErrors.price = "숫자로 입력해주세요.";
        } else if (Number(value) <= 0) {
          updatedErrors.price = "가격은 0보다 커야 합니다.";
        } else {
          delete updatedErrors.price;
        }
      }

      return updatedErrors;
    });
  };

  const handleAddTag = (tag) => {
    if (!form.tags.includes(tag)) {
      const updatedTags = [...form.tags, tag];
      setForm((prev) => ({ ...prev, tags: updatedTags }));

      setErrors((prev) => {
        const updatedErrors = { ...prev };
        if (updatedTags.length > 0) {
          delete updatedErrors.tags;
        }
        return updatedErrors;
      });
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    const updatedTags = form.tags.filter((tag) => tag !== tagToRemove);
    setForm((prev) => ({ ...prev, tags: updatedTags }));

    setErrors((prev) => {
      const updatedErrors = { ...prev };
      if (updatedTags.length === 0) {
        updatedErrors.tags = "태그를 1개 이상 입력해주세요.";
      } else {
        delete updatedErrors.tags;
      }
      return updatedErrors;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // FormData 생성
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("tags", JSON.stringify(form.tags));

    // 기존 이미지 정보 추가
    if (form.existingImages.length > 0) {
      formData.append("existingImages", JSON.stringify(form.existingImages));
    }

    // 새 이미지 파일 추가
    form.imageFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      await updateProduct(itemId, formData);

      // 미리보기 URL 해제
      form.imagePreviewUrls.forEach((url) => URL.revokeObjectURL(url));

      router.push(`/items/${itemId}`);
    } catch (error) {
      const errorMessage = error.message || "상품 수정에 실패했습니다.";
      alert(errorMessage);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm("정말 삭제하시겠습니까?");
    if (!confirm) return;

    setIsDeleting(true);

    try {
      await deleteProduct(itemId);
      router.push("/items");
    } catch (error) {
      const errorMessage = error.message || "상품 삭제에 실패했습니다.";
      alert(errorMessage);
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <main className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">상품 정보를 불러오는 중...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-[1200px] mx-auto px-4 py-8">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">상품 수정하기</h1>
          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className="bg-primary-100 text-white px-6 py-2 rounded disabled:opacity-50"
            >
              {isSubmitting ? "수정 중..." : "수정"}
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-500 text-white px-6 py-2 rounded disabled:opacity-50"
            >
              {isDeleting ? "삭제 중..." : "삭제"}
            </button>
          </div>
        </div>

        {/* 상품 이미지 등록 */}
        <div className="mb-8">
          <label className="block text-[18px] font-[700] mb-4">
            상품 이미지
          </label>
          <div className="flex gap-6 flex-wrap">
            {/* 이미지 추가 버튼 - 총 이미지 개수가 3개 미만일 때만 표시 */}
            {form.existingImages.length + form.imageFiles.length < 3 && (
              <label className="w-[282px] h-[282px] flex flex-col items-center justify-center rounded-[12px] bg-gray-100 text-gray-400 cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
                <span className="text-[50px] leading-none mb-3">+</span>
                <span className="text-[16px] text-secondary-400 font-[400]">
                  이미지 등록
                </span>
              </label>
            )}

            {/* 기존 이미지 미리보기 */}
            {form.existingImages.map((url, idx) => (
              <div
                key={`existing-${idx}`}
                className="relative w-[282px] h-[282px]"
              >
                <img
                  src={url}
                  alt={`existing-preview-${idx}`}
                  className="w-full h-full object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveExistingImage(idx)}
                  className="absolute top-3 right-3 bg-secondary-400 bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ))}

            {/* 새로 추가된 이미지 미리보기 */}
            {form.imagePreviewUrls.map((url, idx) => (
              <div key={`new-${idx}`} className="relative w-[282px] h-[282px]">
                <img
                  src={url}
                  alt={`new-preview-${idx}`}
                  className="w-full h-full object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveNewImage(idx)}
                  className="absolute top-3 right-3 bg-secondary-400 bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          {errors.images && (
            <p className="mt-2 text-sm text-error">{errors.images}</p>
          )}
        </div>

        <div className="space-y-6">
          <Input
            label="상품명"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="상품명을 입력해 주세요"
            error={errors.name}
          />

          <Input
            label="상품 소개"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="상품 소개를 입력해 주세요"
            isTextArea
            error={errors.description}
            className="h-[282px]"
          />

          <Input
            label="판매 가격"
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="판매 가격을 입력해 주세요"
            error={errors.price}
          />

          <TagInput
            tags={form.tags}
            onAddTag={handleAddTag}
            onRemoveTag={handleRemoveTag}
            error={errors.tags}
          />
        </div>
      </form>
    </main>
  );
}
