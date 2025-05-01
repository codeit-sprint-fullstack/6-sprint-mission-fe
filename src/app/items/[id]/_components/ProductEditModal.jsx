"use client";

import { useState, useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";

export default function ProductEditModal({ product, isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
    tags: [],
  });

  const [inputTag, setInputTag] = useState("");
  const [isTagValidation, setIsTagValidation] = useState(true);

  const tagInputRef = useRef(null);

  useEffect(() => {
    if (product && isOpen) {
      setFormData({
        // TODO:이미지 수정은 추후 개발 예정
        images: product.images || [],
        tags: product.tags || [],
        price: product.price || 0,
        description: product.description || "",
        name: product.name || "",
      });
    }
  }, [product, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTagInputChange = (e) => {
    setInputTag(e.target.value);
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (!inputTag || formData.tags.includes(inputTag)) {
        alert("태그가 비었거나 이미 존재하는 태그입니다.");
        setInputTag("");
        return;
      }

      if (inputTag.length > 5) {
        setIsTagValidation(false);
        return;
      } else {
        setIsTagValidation(true);
      }

      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, inputTag],
      }));

      setInputTag("");
    }
  };

  const handleTagDelete = (tagToDelete) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToDelete),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">상품 정보 수정</h2>
          <button
            onClick={onClose}
            className="text-xl text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="mb-2 block font-bold">
              상품명
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full rounded-md border p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="mb-2 block font-bold">
              가격
            </label>
            <div className="flex items-center">
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full rounded-md border p-2"
                min="0"
                required
              />
              <span className="ml-2 text-lg">원</span>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="mb-2 block font-bold">
              상품 소개
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={5}
              className="w-full rounded-md border p-2"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="tags" className="mb-2 block font-bold">
              상품 태그
            </label>
            <input
              type="text"
              id="tags"
              value={inputTag}
              onChange={handleTagInputChange}
              onKeyDown={handleTagKeyDown}
              ref={tagInputRef}
              placeholder="태그를 입력 후 엔터키를 눌러 추가하세요"
              className="w-full rounded-md border p-2"
            />
            {!isTagValidation && (
              <p className="mt-1 text-sm text-red-500">
                태그는 5글자 이내로 입력해주세요
              </p>
            )}

            {formData.tags && formData.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <div
                    key={index}
                    className="flex items-center rounded-full bg-[#f3f4f6] py-1 pr-2 pl-3"
                  >
                    <span className="mr-1 text-sm">#{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleTagDelete(tag)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <TiDelete className="text-xl" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-gray-300 px-4 py-2 hover:bg-gray-100"
            >
              취소
            </button>
            <button
              type="submit"
              className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
