"use client";

import clsx from "clsx";
import React, { useEffect, useState } from "react";
import ProductInput from "./ProductInput";
import ProductCreateTags from "./ProductCreateTags";
import ProductTextArea from "./ProductTextArea";
import ProductImageUpload from "./ProductImageUpload";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { postService } from "@/service/postService";
import useValidation from "@/hooks/useValidation";
import { useParams, useRouter } from "next/navigation";

export default function ProductForm({ title }) {
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tagValue, setTagValue] = useState("");
  const [body, setBody] = useState({
    images: [],
    name: "",
    description: "",
    price: "",
    tags: [],
  });

  const { productId } = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();

  // 에러 메시지
  const [errorMsg, checkValidation] = useValidation();

  // 상품 상세 조회
  const {
    data: product,
    isPending,
    error,
  } = useQuery({
    queryKey: ["products", productId],
    queryFn: () => postService.getPost("products", productId),
    enabled: !!productId,
  });

  // 상품 등록 API
  const { mutate: createPost } = useMutation({
    mutationFn: (body) => postService.createPost("products", body),
    onSuccess: (data) => {
      router.push(`/products/${data.id}`);
    },
  });

  // 상품 수정 API
  const { mutate: updatePost } = useMutation({
    mutationFn: ({ id, body }) => postService.updatePost("products", id, body),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["products", productId] });
      router.push(`/products/${data.id}`);
    },
  });

  // 상품 수정 시 초기 값 세팅
  useEffect(() => {
    if (isPending) return;
    const { images = [], name, description, price, tags } = product;

    setBody((prev) => ({ ...prev, images, name, description, price, tags }));
  }, [isPending]);

  // 상품 등록
  const handleCreatePost = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", body.name);
    formData.append("description", body.description);
    formData.append("price", body.price);
    formData.append("tags", JSON.stringify(body.tags));
    body.images.forEach((image) => {
      formData.append("imageFiles", image.file);
    });

    try {
      setIsLoading(true);

      // TODO: body에 trim해서 보내기
      createPost(formData);
    } catch (e) {
      console.error(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 상품 수정
  const handleUpdatePost = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", body.name);
    formData.append("description", body.description);
    formData.append("price", body.price);
    formData.append("tags", JSON.stringify(body.tags));
    body.images.forEach((image) => {
      formData.append("imageFiles", image.file);
    });

    try {
      setIsLoading(true);

      // TODO: body에 trim해서 보내기
      updatePost({ id: productId, body: formData });
    } catch (e) {
      console.error(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  // body 변경
  const changeValue = (e) => {
    const { id, value } = e.target;

    // 유효성 검사
    checkValidation(e);

    if (id === "tags") {
      return setTagValue(value);
    }

    if (id === "price") {
      return setBody((prev) => ({
        ...prev,
        price: Number(value) ? Number(value) : value,
      }));
    }

    if (id === "image") {
      if (body.images.length === 3) return;

      const images = Array.from(e.target.files);

      return images.map((file) => {
        const imageUrl = URL.createObjectURL(file); // 미리보기용 URL 생성
        const newImage = { file, url: imageUrl };

        setBody((prev) => ({ ...prev, images: [...prev.images, newImage] }));
      });
    }

    setBody((prev) => ({ ...prev, [id]: value }));
  };

  // 상품 등록버튼 활성화
  useEffect(() => {
    const { name, description, price, tags } = body;
    const {
      name: nameErr,
      description: descriptionErr,
      price: priceErr,
      tags: tagsErr,
    } = errorMsg;

    const passValidate =
      name &&
      description &&
      Number(price) &&
      tags.length &&
      !nameErr &&
      !descriptionErr &&
      !priceErr &&
      !tagsErr;

    if (passValidate) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [body, errorMsg]);

  // 태그 추가
  const addTag = (e) => {
    const { value } = e.target;

    if (e.key === "Enter") {
      e.preventDefault();

      if (!value || 5 < value.length || body.tags.includes(value)) return;
      setBody((prev) => ({ ...prev, tags: [...prev.tags, value] }));
      setTagValue("");
    }
  };

  // 태그 삭제
  const deleteTag = (value) => {
    const deletedTag = body.tags.filter((tag) => tag !== value);

    setBody((prev) => ({ ...prev, tags: [...deletedTag] }));
  };

  // 이미지 삭제
  const deleteImage = (value) => {
    const updatedImage = body.images.filter((image) => image !== value);

    setBody((prev) => ({ ...prev, images: [...updatedImage] }));
  };

  return (
    <form onSubmit={productId ? handleUpdatePost : handleCreatePost}>
      <div className="flex flex-col gap-[24px]">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-[20px]/[24px] text-secondary-gray-700 md:leading-[32px]">
            {title}
          </h1>
          <button
            type="submit"
            disabled={!isActive || isLoading}
            className={clsx(
              isActive
                ? "bg-primary-100 hover:bg-primary-200 active:bg-primary-300 cursor-pointer"
                : "bg-secondary-gray-300 cursor-default",
              "text-secondary-gray-100 flex justify-center items-center border-none w-[74px] h-[42px] py-[8px] px-[23px] rounded-[8px] text-center font-semibold text-[16px]"
            )}
          >
            {isLoading ? (
              <div className="flex justify-center items-center gap-[8px]">
                <div className="size-[20px] border-[3px] border-t-[3px] border-secondary-gray-300 border-t-white rounded-full animate-spin"></div>
              </div>
            ) : (
              "등록"
            )}
          </button>
        </div>
        <ProductImageUpload
          body={body}
          changeValue={changeValue}
          deleteImage={deleteImage}
        />
        <ProductInput
          type="name"
          title="상품명"
          placeholder="상품명을 입력해주세요"
          body={body}
          errorMsg={errorMsg.name}
          changeValue={changeValue}
        />
        <ProductTextArea
          type="description"
          title="상품 소개"
          placeholder="상품 소개를 입력해주세요"
          body={body}
          errorMsg={errorMsg.description}
          changeValue={changeValue}
        />
        <ProductInput
          type="price"
          title="판매 가격"
          placeholder="판매 가격을 입력해주세요"
          body={body}
          errorMsg={errorMsg.price}
          changeValue={changeValue}
        />
        <div className="flex flex-col gap-[14px]">
          <ProductInput
            type="tags"
            title="태그"
            placeholder="태그를 입력해주세요"
            tagValue={tagValue}
            errorMsg={errorMsg.tags}
            changeValue={changeValue}
            addTag={addTag}
          />
          <ProductCreateTags tags={body.tags} deleteTag={deleteTag} />
        </div>
      </div>
    </form>
  );
}
