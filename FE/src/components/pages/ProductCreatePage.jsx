"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { productService } from "@/lib/services/api/productService";
import { useRouter } from "next/navigation";
import useInputForm from "@/hooks/useInputForm";
import InputBox from "../ui/InputBox";
import TitleSection from "../ui/TitleSection";
import SubTitleSection from "../ui/SubTitleSection";
import TagCard from "../ui/TagCard";
import ImageCard from "../ui/ImageCard";

// 상품명 유효성 검사
function isValidCreateName(name) {
  return name.length <= 10;
}

// 상품 소개 유효성 검사
function isValidCreateDescription(description) {
  return description.length <= 100;
}

// 판매가격 유효성 검사
function isValidCreatePrice(price) {
  return !isNaN(Number(price));
}

// 각 태그에 대한 유효성 검사
function isValidCreateTag(tag) {
  return tag.length <= 5;
}

// 이미지 유효성 검사
function isValidCreateImages(images) {
  return images.length <= 3;
}

export default function ProductCreatePage() {
  const router = useRouter();
  const [createTags, setCreateTags] = useState([]);
  const newTagInput = useInputForm(
    "",
    isValidCreateTag,
    "태그는 5글자 이내로 입력해주세요"
  );
  const [createImages, setCreateImages] = useState([]);
  const [imagesError, setImagesError] = useState("");

  const createNameInput = useInputForm(
    "",
    isValidCreateName,
    "10자 이내로 입력해주세요"
  );
  const createDescriptionInput = useInputForm(
    "",
    isValidCreateDescription,
    "10자 이상 입력해주세요"
  );
  const createPriceInput = useInputForm(
    0,
    isValidCreatePrice,
    "숫자로 입력해주세요"
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
      !createTags.includes(trimmedTag) &&
      createTags.length < 5
    ) {
      setCreateTags([...createTags, trimmedTag]);
      newTagInput.setValue("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setCreateTags(createTags.filter((tag) => tag !== tagToRemove));
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0 && createImages.length + files.length <= 3) {
      setCreateImages([...createImages, ...Array.from(files)]);
      setImagesError("");
    } else if (createImages.length >= 3) {
      setImagesError("이미지는 최대 3개까지 등록 가능합니다.");
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setCreateImages(createImages.filter((_, index) => index !== indexToRemove));
  };

  const { mutate, isLoading, isError, error } = useMutation(
    (newProduct) => productService.createProduct(newProduct),
    {
      onSuccess: (data) => {
        router.push(`/items/${data.id}`);
      },
      onError: (error) => {
        console.error("상품 등록 실패:", error);
      },
    }
  );

  const handleCreateProduct = async () => {
    if (!isValidCreateImages(createImages)) {
      setImagesError("이미지를 3개 이하로 등록해주세요.");
      return;
    }

    // TODO: 이미지 업로드 안됨. 폼데이터 로직 필요.
    try {
      mutate({
        name: createNameInput.value,
        description: createDescriptionInput.value,
        price: createPriceInput.value,
        tags: createTags,
        images: createImages,
      });
    } catch (error) {
      console.error("상품 등록 중 오류 발생:", error);
    }
  };

  const isFormValid =
    createNameInput.isValid &&
    createDescriptionInput.isValid &&
    createPriceInput.isValid &&
    createTags.length <= 5 &&
    isValidCreateImages(createImages);

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <TitleSection
          titleText={"상품 등록하기"}
          buttonStyle={
            <button
              className={`btn-sm-42 ${
                isFormValid
                  ? "bg-primary-100 cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!isFormValid || isLoading}
              onClick={handleCreateProduct}
            >
              {isLoading ? "등록 중..." : "등록"}
            </button>
          }
        />

        <section>
          <SubTitleSection titleText={"상품 이미지"} />
          <div className="py-4 gap-4 gap-y-2 flex flex-wrap items-center">
            <InputBox
              placeHolderText={"이미지 등록 (최대 3개)"}
              inputType={"file"}
              onChangeInput={handleImageChange}
              onBlur={() => {}}
              isValid={!imagesError}
              inputClassName={"w-42 h-42 bg-gray-200 rounded-xl"}
              multiple
            />

            {createImages.map((image, index) => (
              <ImageCard
                key={index}
                imgSrc={URL.createObjectURL(image)}
                imgAlt={`새 상품 이미지 ${index + 1}`}
                deleteFn={() => handleRemoveImage(index)}
              />
            ))}
          </div>
          {imagesError && (
            <p className="text-red-500 text-sm ">*{imagesError}</p>
          )}
        </section>

        <section>
          <SubTitleSection titleText={"상품명"} />
          <InputBox
            placeHolderText={"상품명을 입력해주세요"}
            inputValueState={createNameInput.value}
            onChangeInput={createNameInput.onChange}
            inputType={"text"}
            onBlur={createNameInput.onBlur}
            error={createNameInput.error}
            isValid={createNameInput.isValid}
            inputClassName={"h-14"}
          />
        </section>

        <section>
          <SubTitleSection titleText={"상품 소개"} />
          <InputBox
            placeHolderText={"상품 소개를 입력해주세요"}
            inputValueState={createDescriptionInput.value}
            onChangeInput={createDescriptionInput.onChange}
            inputType={"textarea"}
            onBlur={createDescriptionInput.onBlur}
            error={createDescriptionInput.error}
            isValid={createDescriptionInput.isValid}
            inputClassName={"h-70"}
          />
        </section>

        <section>
          <SubTitleSection titleText={"판매가격"} />
          <InputBox
            placeHolderText={"판매 가격을 입력해주세요"}
            inputValueState={createPriceInput.value}
            onChangeInput={createPriceInput.onChange}
            onBlur={createPriceInput.onBlur}
            error={createPriceInput.error}
            isValid={createPriceInput.isValid}
            inputType={"number"}
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
              {createTags.map((tag) => (
                <TagCard
                  key={tag}
                  tagName={tag}
                  deleteTagFn={() => handleRemoveTag(tag)}
                />
              ))}
            </div>
          </div>
        </section>
      </form>
    </div>
  );
}
