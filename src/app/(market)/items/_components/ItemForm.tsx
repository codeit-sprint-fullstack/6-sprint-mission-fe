"use client";

import { createProduct, updateProduct, uploadImage } from "@/lib/actions/product";
import Modal from "@/components/ui/Modal";
import Tag from "@/components/ui/Tag";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Product } from "@/types";
import { PlusIcon, RemoveIcon } from "@/assets/svgs";

interface ItemFormProps {
  values: {
    name: Product["name"];
    description: Product["description"];
    price: Product["price"];
    tags: Product["tags"];
    images: Product["images"];
  };
  setValues: React.Dispatch<React.SetStateAction<ItemFormProps["values"]>>;
}

function ItemForm({ values, setValues }: ItemFormProps) {
  const [tagInput, setTagInput] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [inputError, setInputError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const pathname = usePathname();
  const isEditPage = pathname.includes("/edit");

  const queryClient = useQueryClient();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, description, price, tags, images } = values;

    if (isEditPage) {
      const result = await updateProduct({
        productId: Number(id),
        params: {
          name,
          description,
          price: Number(price),
          tags,
          images,
        },
      });

      if (!result?.success) {
        setError(result.message);
        setIsModalOpen(true);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["product", id] });
        router.replace(`/items/${result.id}`);
      }
    } else {
      const result = await createProduct({
        name,
        description,
        price: Number(price),
        tags,
        images,
      });

      if (!result?.success) {
        setError(result.message);
        setIsModalOpen(true);
      } else {
        router.push(`/items/${result.id}`);
      }
    }
  };

  // 모달 버튼 핸들러
  const handleClick = () => {
    if (error) {
      setIsModalOpen(false);
    } else if (isEditPage) {
      router.push(`/items/${id}`);
    } else {
      router.push(`/items`);
    }
  };

  // 이미지 등록 버튼 클릭 시 input 참조
  const handleFileUpload = async () => {
    fileInputRef.current?.click();
  };

  // 이미지 업로드
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    if (!image) return;
    if (values.images.length === 3) {
      setInputError("*이미지 등록은 최대 3개까지 가능합니다.");
      return;
    }

    try {
      const result = await uploadImage({ image });
      if (result.success) {
        setValues((prev) => ({
          ...prev,
          images: [...prev.images, result.url],
        }));
      }
    } catch (e) {
      console.error("이미지 업로드 실패", e);
    } finally {
      e.target.value = "";
    }
  };

  // 업로드된 이미지 삭제
  const handleFileDelete = (index: number) => {
    setValues((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  return (
    <>
      <form className="mb-[186px]" onSubmit={handleSubmit}>
        <nav className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">{isEditPage ? "상품 수정하기" : "상품 등록하기"}</h2>
          <button
            className="btn-base"
            type="submit"
            disabled={
              !values.name || !values.description || !values.price || !values.tags || !values.images
            }
          >
            {isEditPage ? "수정" : "등록"}
          </button>
        </nav>
        <section className="space-y-4">
          <div>
            <h3 className="mb-3 text-lg font-bold">*상품 이미지</h3>
            <div className="flex h-[168px] gap-[10px] lg:h-[282px] lg:gap-6">
              <button
                type="button"
                className="flex aspect-square w-[168px] flex-col items-center justify-center gap-3 rounded-xl bg-gray-100 text-gray-400 hover:bg-gray-200 lg:w-[282px]"
                onClick={handleFileUpload}
              >
                <PlusIcon aria-label="이미지 등록" />
                이미지 등록
              </button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <div className="flex w-full gap-[10px] overflow-auto lg:gap-6">
                {values.images.map((url, index) => (
                  <div key={url} className="relative shrink-0">
                    <Image
                      src={url}
                      alt={`상품 이미지 ${index}`}
                      width={168}
                      height={168}
                      className="aspect-square rounded-xl lg:w-[282px]"
                    />
                    <button
                      className="absolute top-3 right-3"
                      onClick={() => handleFileDelete(index)}
                    >
                      <RemoveIcon aria-label="이미지 취소" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-error-red mt-2 ml-4 text-sm font-semibold">{inputError}</div>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-bold">*상품명</h3>
            <input
              className="w-full rounded-xl bg-gray-100 px-6 py-4 font-normal"
              type="text"
              placeholder="상품명을 입력해주세요"
              value={values.name}
              onChange={(e) => setValues((prev) => ({ ...prev, name: e.target.value }))}
            />
          </div>
          <div>
            <h3 className="mb-3 text-lg font-bold">*상품 소개</h3>
            <textarea
              className="h-[200px] w-full resize-none rounded-xl bg-gray-100 px-6 py-4 font-normal"
              placeholder="상품 소개를 입력해주세요"
              value={values.description}
              onChange={(e) => setValues((prev) => ({ ...prev, description: e.target.value }))}
            />
          </div>
          <div>
            <h3 className="mb-3 text-lg font-bold">*판매 가격</h3>
            <input
              className="w-full rounded-xl bg-gray-100 px-6 py-4 font-normal"
              type="number"
              placeholder="판매 가격을 입력해주세요"
              value={values.price}
              onChange={(e) => setValues((prev) => ({ ...prev, price: Number(e.target.value) }))}
            />
          </div>
          <div>
            <h3 className="mb-3 text-lg font-bold">*태그</h3>
            <Tag
              tags={values.tags}
              setTags={(value) =>
                setValues((prev) => ({
                  ...prev,
                  tags:
                    typeof value === "function"
                      ? (value as (prevState: string[]) => string[])(prev.tags)
                      : value,
                }))
              }
              tagInput={tagInput}
              setTagInput={setTagInput}
            />
          </div>
        </section>
      </form>
      {isModalOpen && <Modal message={error} itemId={Number(id)} handleClick={handleClick} />}
    </>
  );
}

export default ItemForm;
