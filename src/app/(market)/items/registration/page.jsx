"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct, uploadImage } from "@/lib/api/itemApi";
import {
  validateName,
  validateDescription,
  validatePrice,
} from "@/lib/validation";
import ItemFormInput from "@/components/ui/ItemFormInput";

export default function RegistrationPage() {
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
  const router = useRouter();

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

  const handleImageUpload = (e) => {
    if (form.images.length >= 3) {
      alert("이미지는 최대 3개까지 업로드할 수 있습니다.");
      return;
    }

    const file = e.target.files[0];
    if (!file || file.size > 5 * 1024 * 1024) {
      alert("5MB 이하 이미지만 업로드 가능합니다.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setPreviews((prev) => [...prev, reader.result]);
    reader.readAsDataURL(file);

    setForm((prev) => ({ ...prev, images: [...prev.images, file] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("📦 form.images (제출 직전)", form.images);

    if (form.tags.length === 0 || form.images.length === 0) {
      alert("태그와 이미지는 최소 1개 이상 등록해야 합니다.");
      return;
    }

    try {
      setUploading(true);

      const uploadedImageUrls = [];
      for (const file of form.images) {
        const formData = new FormData();
        formData.append("image", file);
        const { imageUrl } = await uploadImage(formData);
        uploadedImageUrls.push(imageUrl);
      }

      const res = await createProduct({
        ...form,
        images: uploadedImageUrls,
        price: Number(form.price),
      });

      router.push(`/items/${res.id}`);
    } catch (error) {
      console.error(error.message);
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

  return (
    <div className="max-w-[1200px] mx-auto p-6 gap-6">
      <ItemFormInput
        title="상품 등록하기"
        submitButtonText="등록"
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
