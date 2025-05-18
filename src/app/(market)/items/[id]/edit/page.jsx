"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  fetchProductDetail,
  updateProduct,
  uploadImage,
} from "@/lib/api/itemApi";
import {
  validateName,
  validateDescription,
  validatePrice,
} from "@/lib/validation";
import ItemFormInput from "@/components/ui/ItemFormInput";

export default function EditItemPage() {
  const { id: productId } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    tags: [],
    images: [],
  });
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const product = await fetchProductDetail(productId);
        setForm({
          name: product.name,
          description: product.description,
          price: String(product.price),
          tags: product.tags || [],
          images: product.images || [],
        });
        setPreviews(product.images || []);
      } catch (error) {
        console.error(error.message);
      }
    };
    loadProduct();
  }, [productId]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    let error = "";
    if (field === "name") error = validateName(value);
    if (field === "description") error = validateDescription(value);
    if (field === "price") error = validatePrice(value);

    setErrors((prev) => ({ ...prev, [field]: error || undefined }));
  };

  const addTag = (tag) => {
    if (tag && !form.tags.includes(tag)) {
      setForm((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
    }
  };

  const removeTag = (tag) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || file.size > 5 * 1024 * 1024) {
      alert("5MB 이하 이미지만 업로드 가능합니다.");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setPreviews((prev) => [...prev, reader.result]);
    reader.readAsDataURL(file);

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("image", file);
      const { url } = await uploadImage(formData);
      setForm((prev) => ({ ...prev, images: [...prev.images, url] }));
    } finally {
      setUploading(false);
    }
  };

  const handleImageDelete = (idx) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== idx),
    }));
    setPreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.tags.length === 0 || form.images.length === 0) {
      alert("태그와 이미지는 최소 1개 이상 등록해야 합니다.");
      return;
    }
    try {
      await updateProduct(productId, {
        ...form,
        price: Number(form.price),
      });
      router.push(`/items/${productId}`);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto p-6">
      <ItemFormInput
        title="상품 수정하기"
        submitButtonText="수정"
        form={form}
        previews={previews}
        errors={errors}
        uploading={uploading}
        onChange={handleChange}
        onAddTag={addTag}
        onRemoveTag={removeTag}
        onImageUpload={handleImageUpload}
        onImageDelete={handleImageDelete}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
