"use client";

import { useEffect, useState } from "react";
import { productService } from "@/lib/services/api/productService";
import { useParams, useRouter } from "next/navigation";
import useInputForm from "@/hooks/useInputForm";
import InputBox from "../ui/InputBox";
import TitleSection from "../ui/TitleSection";
import SubTitleSection from "../ui/SubTitleSection";
import TagCard from "../ui/TagCard";
import ImageCard from "../ui/ImageCard";
import { useMutation, useQuery, useQueryClient } from "react-query";

// 상품명 유효성 검사
function isValidEditName(name) {
  return name.length <= 10;
}

// 상품 소개 유효성 검사
function isValidEditDescription(description) {
  return description.length <= 100;
}

// 판매가격 유효성 검사
function isValidEditPrice(price) {
  return !isNaN(Number(price));
}

// 각 태그에 대한 유효성 검사
function isValidEditTag(tag) {
  return tag.length <= 5;
}

// 이미지 유효성 검사
function isValidEditImages(images) {
  return images.length <= 3;
}

export default function ProductEditPage() {
  const { id } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery(["product", id], () => productService.getProduct(id), {
    enabled: !!id,
  });

  const [editTags, setEditTags] = useState([]);
  const newTagInput = useInputForm(
    "",
    isValidEditTag,
    "태그는 5글자 이내로 입력해주세요"
  );
  const [editImages, setEditImages] = useState([]);
  const [imagesError, setImagesError] = useState("");

  const editNameInput = useInputForm(
    "",
    isValidEditName,
    "10자 이내로 입력해주세요"
  );
  const editDescriptionInput = useInputForm(
    "",
    isValidEditDescription,
    "10자 이상 입력해주세요"
  );
  const editPriceInput = useInputForm(
    0,
    isValidEditPrice,
    "숫자로 입력해주세요"
  );

  const updateProductMutation = useMutation(
    (productData) => productService.updateProduct(id, productData),
    {
      onSuccess: () => {
        // 상품 수정 성공 후, 상품 상세 페이지로 이동
        queryClient.invalidateQueries(["product", id]);
        router.push(`/items/${id}`);
      },
      onError: (err) => {
        console.error("수정 실패:", err);
      },
    }
  );

  const handleKeyDownTagInput = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleAddTag = () => {
    const trimmedTag = newTagInput.value.trim();

    if (
      trimmedTag.length <= 5 &&
      trimmedTag !== "" &&
      !editTags.includes(trimmedTag) &&
      editTags.length < 5
    ) {
      setEditTags([...editTags, trimmedTag]);
      newTagInput.setValue("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setEditTags(editTags.filter((tag) => tag !== tagToRemove));
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0 && editImages.length + files.length <= 3) {
      setEditImages([...editImages, ...Array.from(files)]);
      setImagesError("");
    } else if (editImages.length >= 3) {
      setImagesError("이미지는 최대 3개까지 등록 가능합니다.");
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setEditImages(editImages.filter((_, index) => index !== indexToRemove));
  };

  const handleUpdateProduct = () => {
    updateProductMutation.mutate({
      name: editNameInput.value,
      description: editDescriptionInput.value,
      price: editPriceInput.value,
      tags: editTags,
      images: editImages,
    });
  };

  useEffect(() => {
    if (product) {
      editNameInput.setValue(product.name || "");
      editDescriptionInput.setValue(product.description || "");
      editPriceInput.setValue(String(product.price || ""));
      setEditTags(product.tags || []);
      setEditImages(product.images || []);
    }
  }, [product]);

  if (isLoading) {
    return <p>로딩 중...</p>;
  }

  if (error) {
    return <p>상품을 불러오는 중 오류가 발생했습니다.</p>;
  }

  const isFormValid =
    editNameInput.isValid &&
    editDescriptionInput.isValid &&
    editPriceInput.isValid &&
    editTags.length <= 5 &&
    isValidEditImages(editImages);

  return (
    <div>
      <form>
        <TitleSection
          titleText={"상품 수정하기"}
          buttonStyle={
            <button
              className={`btn-sm-42 ${
                isFormValid
                  ? "bg-primary-100 cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!isFormValid}
              onClick={handleUpdateProduct}
            >
              수정
            </button>
          }
        />

        <section>
          <SubTitleSection titleText={"상품 이미지"} />

          <div className="py-4 gap-4 gap-y-2 flex flex-wrap items-center">
            <InputBox
              placeHolderText={"이미지 등록"}
              inputType={"file"}
              onChangeInput={handleImageChange}
              onBlur={() => {}}
              isValid={!imagesError}
              inputClassName={"w-42 h-42 bg-gray-200 rounded-xl"}
              multiple
            />

            {editImages.map((image, index) => {
              return (
                <ImageCard
                  key={index}
                  imgSrc={
                    image instanceof File ? URL.createObjectURL(image) : image
                  }
                  imgAlt={product.name}
                  deleteFn={() => handleRemoveImage(index)}
                />
              );
            })}
          </div>
          {imagesError && (
            <p className="text-red-500 text-sm ">*{imagesError}</p>
          )}
        </section>

        <section>
          <SubTitleSection titleText={"상품명"} />
          <InputBox
            placeHolderText={"상품명을 입력해주세요"}
            inputValueState={editNameInput.value}
            onChangeInput={editNameInput.onChange}
            inputType={"text"}
            onBlur={editNameInput.onBlur}
            error={editNameInput.error}
            isValid={editNameInput.isValid}
            inputClassName={"h-14"}
          />
        </section>

        <section>
          <SubTitleSection titleText={"상품 소개"} />
          <InputBox
            placeHolderText={"상품 소개를 입력해주세요"}
            inputValueState={editDescriptionInput.value}
            onChangeInput={editDescriptionInput.onChange}
            inputType={"textarea"}
            onBlur={editDescriptionInput.onBlur}
            error={editDescriptionInput.error}
            isValid={editDescriptionInput.isValid}
            inputClassName={"h-70"}
          />
        </section>

        <section>
          <SubTitleSection titleText={"판매가격"} />
          <InputBox
            placeHolderText={"판매 가격을 입력해주세요"}
            inputValueState={editPriceInput.value}
            onChangeInput={editPriceInput.onChange}
            onBlur={editPriceInput.onBlur}
            error={editPriceInput.error}
            isValid={editPriceInput.isValid}
            inputClassName={"h-14"}
          />
        </section>

        <section>
          <SubTitleSection titleText={"태그"} />
          <div>
            <InputBox
              placeHolderText="새로운 태그 입력 (최대 5개)"
              inputValueState={newTagInput.value}
              onChangeInput={newTagInput.onChange}
              onBlur={newTagInput.onBlur}
              error={newTagInput.error}
              isValid={newTagInput.isValid}
              inputType="text"
              onKeyDownInput={handleKeyDownTagInput}
              inputClassName={"h-14"}
            />
            <div className="py-4 gap-4 gap-y-2 flex flex-wrap items-center">
              {editTags.map((tag) => {
                return (
                  <TagCard
                    key={tag}
                    tagName={tag}
                    deleteTagFn={() => handleRemoveTag(tag)}
                  />
                );
              })}
            </div>
          </div>
        </section>
      </form>
    </div>
  );
}
