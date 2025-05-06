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
  });
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
        setForm({
          name: productData.name,
          description: productData.description,
          price: productData.price.toString(), // 숫자를 문자열로 변환
          tags: productData.tags || [],
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
      form.tags.length > 0;
    
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

    const productData = {
      ...form,
      price: Number(form.price),
    };

    try {
      await updateProduct(itemId, productData);
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