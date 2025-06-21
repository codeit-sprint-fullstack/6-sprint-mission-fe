"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getItem, patchItem, postItem } from "@/lib/api/item";
import { TItem } from "@/types";
import Image from "next/image";

interface ItemFormProps {
  itemId?: TItem["id"] | null;
}

function ItemForm({ itemId = null }: ItemFormProps) {
  const [name, setName] = useState<TItem["name"]>("");
  const [description, setDescription] = useState<TItem["description"]>("");
  const [price, setPrice] = useState<TItem["price"]>(0);
  const [tags, setTags] = useState<TItem["tags"]>([]);
  const [tag, setTag] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const router = useRouter();
  const isValid =
    name.trim() !== "" && description.trim() !== "" && price !== 0;

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!itemId) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", String(price));
      formData.append("tags", JSON.stringify(tags));
      images.forEach((image) => {
        formData.append("images", image);
      });
      const newItem = await postItem(formData);
      router.push(`/items/${newItem.id}`);
    } else {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", String(price));
      formData.append("tags", JSON.stringify(tags));
      images.forEach((image) => {
        formData.append("images", image);
      });

      await patchItem(itemId, formData);
      router.push(`/items/${itemId}`);
    }
  };

  useEffect(() => {
    if (images.length < 3) {
      setErrorMessage("");
    } else {
      setErrorMessage("*이미지 등록은 최대 3개까지 가능합니다.");
    }
  }, [images]);

  useEffect(() => {
    const fetchData = async () => {
      if (!itemId) return;

      try {
        const item = await getItem(
          itemId,
          localStorage.getItem("accessToken") ?? ""
        );
        if (item) {
          setName(item.name);
          setDescription(item.description);
          setPrice(item.price);
          setTags(item.tags);
          setImages(item.images);
        }
      } catch (err) {
        console.error("상품 정보를 불러오는 데 실패했습니다:", err);
      }
    };

    fetchData();
  }, [itemId]);

  return (
    <form className="w-full">
      <div className="flex w-full justify-between">
        <div className="font-bold text-xl text-gray-800">상품 등록하기</div>
        <button
          type="submit"
          className={`${
            !isValid ? "bg-gray-400" : "bg-primary-100"
          } text-white w-18.5 h-10.5 rounded-xl`}
          disabled={!isValid}
          onClick={handleClick}
        >
          등록
        </button>
      </div>
      <div className="flex flex-col mt-6">
        <label className="text-sm text-gray-800 font-bold">상품 이미지</label>
        <div className="flex gap-6 mt-4">
          <input
            id="imageUpload"
            className="hidden"
            type="file"
            accept="image/*"
            multiple
            disabled={images.length >= 3}
            onChange={(e) => {
              const selectedFiles = Array.from(e.target.files || []);
              setImages([...images, ...selectedFiles]);
              console.log("images", images);
            }}
          />
          <label
            htmlFor="imageUpload"
            className="w-70 h-70 bg-gray-200 rounded-2xl flex items-center justify-center cursor-pointer"
          >
            <div className="flex flex-col justify-center items-center">
              <Image
                src="/assets/ic/ic_plus.png"
                width={48}
                height={48}
                alt="이미지 등록"
              />
              <div className="text-gray-400">이미지 등록</div>
            </div>
          </label>
          <div className="flex gap-3">
            {images.map((image, index) => (
              <div className="relative" key={index}>
                <Image
                  alt="preview"
                  src={URL.createObjectURL(image)}
                  width={280}
                  height={280}
                  className="rounded-2xl object-cover"
                />
                <button
                  className="absolute top-1 right-1 z-10 rounded-full bg-gray-400 w-5 h-5 flex justify-center items-center"
                  onClick={(e) => {
                    e.preventDefault();
                    setImages((prev) => prev.filter((_, i) => i !== index));
                  }}
                >
                  <Image
                    alt="cancel"
                    src="/assets/ic/ic_cancel.png"
                    width={8}
                    height={8}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="text-error">{errorMessage}</div>
      </div>
      <div className="flex flex-col mt-6">
        <label className="text-sm text-gray-800 font-bold">상품명</label>
        <input
          className="w-full h-14 bg-gray-100 pl-6 rounded-lg"
          placeholder="상품명을 입력해주세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex flex-col mt-4">
        <label className="text-sm text-gray-800 font-bold">상품 소개</label>
        <textarea
          className="w-full h-50 bg-gray-100 pl-6 pt-4 rounded-lg"
          placeholder="상품 소개를 입력해주세요"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex flex-col mt-6">
        <label className="text-sm text-gray-800 font-bold">판매가격</label>
        <input
          type="number"
          className="w-full h-14 bg-gray-100 pl-6 rounded-lg"
          placeholder="판매 가격을 입력해주세요"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </div>
      <div className="flex flex-col mt-6">
        <label className="text-sm text-gray-800 font-bold">태그</label>
        <input
          className="w-full h-14 bg-gray-100 pl-6 rounded-lg"
          placeholder="태그를 입력해주세요"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (tag.trim() !== "") {
                setTags((prev) => [...prev, tag.trim()]);
                setTag("");
              }
            }
          }}
        />
      </div>
      <div className="mt-4 flex gap-3">
        {tags.map((tagItem) => (
          <div
            className="py-1 px-3 bg-gray-100 flex rounded-2xl gap-2 items-center"
            key={tagItem}
          >
            <p>#{tagItem}</p>
            <div
              className="w-5 h-5 rounded-full bg-gray-400 flex justify-center items-center"
              onClick={() =>
                setTags((prev) => prev.filter((t) => t !== tagItem))
              }
            >
              <Image
                alt="cancel"
                src="/assets/ic/ic_cancel.png"
                width={8}
                height={8}
              />
            </div>
          </div>
        ))}
      </div>
    </form>
  );
}

export default ItemForm;
