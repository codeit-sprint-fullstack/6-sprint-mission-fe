"use client";

import { createProduct, updateProduct } from "@/app/actions/product";
import Modal from "@/components/ui/Modal";
import { getProduct } from "@/lib/getApi";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function ItemForm() {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    tags: [],
    images: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();
  const pathname = usePathname();
  const { id } = useParams();
  const isEditPage = pathname.includes("/edit");

  useEffect(() => {
    if (isEditPage && id) {
      getProductById();
    }
  }, [pathname, id]);

  const getProductById = async () => {
    const data = await getProduct(id);
    setValues({ ...data });
  };

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
            <h3 className="text-sm font-bold mb-3">*테그</h3>
            <input
              className="w-full px-6 py-4 rounded-xl bg-gray-100 font-normal"
              type="text"
              placeholder="태그를 입력해주세요"
              value={values.tags}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, tags: e.target.value }))
              }
            />
          </div>
          <div>
            <h3 className="text-sm font-bold mb-3">*상품 사진</h3>
            <input type="file" multiple accept="image/*" />
          </div>
        </section>
      </form>
      {isModalOpen && <Modal message={error} handleClick={handleClick} />}
    </>
  );
}

export default ItemForm;
