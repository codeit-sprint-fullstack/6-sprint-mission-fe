"use client";

import { createProduct, updateProduct } from "@/lib/actions/product";
import Modal from "@/components/ui/Modal";
import Tag from "@/components/ui/Tag";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

function ItemForm({ values, setValues }) {
  const [tagInput, setTagInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const isEditPage = pathname.includes("/edit");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, description, price, tags, images } = values;

    if (isEditPage) {
      const result = await updateProduct(id, {
        name,
        description,
        price,
        tags,
        images,
      });

      if (!result?.success) {
        setError(result.message);
        setIsModalOpen(true);
      } else {
        router.push(`/items/${id}`);
      }
    } else {
      const result = await createProduct({
        name,
        description,
        price,
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
    if (isEditPage) {
      router.push(`/items/${id}`);
    } else {
      router.push(`/items`);
    }
  };

  return (
    <>
      <form className="mb-[186px]" onSubmit={handleSubmit}>
        <nav className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">
            {isEditPage ? "상품 수정하기" : "상품 등록하기"}
          </h2>
          <button
            className="btn-base"
            type="submit"
            disabled={
              !values.name ||
              !values.description ||
              !values.price ||
              !values.tags ||
              !values.images
            }
          >
            {isEditPage ? "수정" : "등록"}
          </button>
        </nav>
        <section className="space-y-4">
          <div>
            <h3 className="text-sm font-bold mb-3">*상품 이미지</h3>
            <button
              type="button"
              className="flex flex-col justify-center items-center gap-3 w-[168px] aspect-square bg-gray-100 rounded-xl text-gray-400 hover:bg-gray-200"
            >
              <Image
                src="/assets/icon/ic_plus.svg"
                alt="이미지 등록"
                width={48}
                height={48}
              />
              이미지 등록
            </button>
            <input type="file" multiple accept="image/*" className="hidden" />
          </div>
          <div>
            <h3 className="text-sm font-bold mb-3">*상품명</h3>
            <input
              className="w-full px-6 py-4 rounded-xl bg-gray-100 font-normal"
              type="text"
              placeholder="상품명을 입력해주세요"
              value={values.name}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div>
            <h3 className="text-sm font-bold mb-3">*상품 소개</h3>
            <textarea
              className="w-full h-[200px] px-6 py-4 rounded-xl bg-gray-100 font-normal resize-none"
              type="text"
              placeholder="상품 소개를 입력해주세요"
              value={values.description}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, description: e.target.value }))
              }
            />
          </div>
          <div>
            <h3 className="text-sm font-bold mb-3">*판매 가격</h3>
            <input
              className="w-full px-6 py-4 rounded-xl bg-gray-100 font-normal"
              type="number"
              placeholder="판매 가격을 입력해주세요"
              value={values.price}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, price: e.target.value }))
              }
            />
          </div>
          <div>
            <h3 className="text-sm font-bold mb-3">*태그</h3>
            <Tag
              tags={values.tags}
              setValues={setValues}
              tagInput={tagInput}
              setTagInput={setTagInput}
            />
          </div>
        </section>
      </form>
      {isModalOpen && <Modal message={error} handleClick={handleClick} />}
    </>
  );
}

export default ItemForm;
