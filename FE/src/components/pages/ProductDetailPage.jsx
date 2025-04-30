"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import InputBox from "@/components/ui/InputBox";
import TitleSection from "@/components/ui/TitleSection";
import { productService } from "@/lib/services/api/productService";
import ConfirmModal from "@/components/ui/ConfirmModal";
import ProfileImage from "../ui/ProfileImage";
import TagCard from "../ui/TagCard";
import CommentCard from "@/app/(main)/(item)/items/_components/CommentCard";
import Dropdown from "@/app/(main)/(item)/_components/Dropdown";

import backImage from "@/assets/images/icons/ic_back.png";
import kebabImage from "@/assets/images/icons/ic_kebab.png";
import emptyHeartImage from "@/assets/images/icons/ic_emptyHeart.png";
import noCommentImage from "@/assets/images/logo/noCommentImage2.png";
import defaultImage from "@/assets/images/logo/defaultImage.png";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentInputValue, setCommentInputValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await await productService.deleteProduct(id);

      if (response.ok) {
        router.push("/items");
      } else {
        console.error("댓글 수정 실패:", response);
      }
    } catch (error) {
      console.error("댓글 수정 중 오류 발생:", error);
    }
  };

  const hadleModalClose = () => {
    setIsModalOpen(false);
  };

  const dropdownItems = [
    {
      label: "수정하기",
      onClick: () => {
        router.push(`/items/${id}/edit`);
        setIsModalOpen(false);
        return;
      },
    },
    { label: "삭제하기", onClick: () => setIsModalOpen(true) },
  ];

  const hadleDropdownOpen = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOnChangeCommentInput = (e) => {
    setCommentInputValue(e.target.value);
  };

  const handleCreateComment = async () => {
    try {
      const response = await productService.createProductComment(id, {
        content: commentInputValue,
      });

      if (response && (response.status === 201 || response.ok)) {
        productService.getProductComments(id, 3, 0);
        setCommentInputValue("");
        fetchData();
      } else {
        console.error("댓글 등록 실패:", response);
      }
    } catch (error) {
      console.error("댓글 등록 중 오류 발생:", error);
    }
  };

  const fetchData = async () => {
    const productData = await productService.getProduct(id);
    setProduct(productData);
    const commentsData = await productService.getProductComments(id, 3, 0);
    setComments(commentsData.list);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (!product) {
    return <p>로딩 중...</p>;
  }

  const isActive = commentInputValue !== "";

  const imageUrl =
    product.images &&
    product.images.length > 0 &&
    product.images[0].startsWith("https")
      ? product.images[0]
      : defaultImage;

  return (
    <div className="py-4 flex flex-col items-center">
      <section className="w-83 h-83 ">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover rounded-xl"
        />
      </section>

      <section className="flex flex-col w-83 border-b border-gray-200 py-3">
        <div>
          <div className="w-full flex justify-between h-18 gap-y-2">
            <div className=" text-gray-800 font-semibold">
              <p className="font-semibold leading-6.5">{product.name}</p>
              <p className="text-2xl leading-8">{product.price}원</p>
            </div>
            <div className="relative h-min ">
              <Image
                src={kebabImage}
                alt="detailDropDown"
                onClick={hadleDropdownOpen}
              />
              {isDropdownOpen && (
                <Dropdown
                  items={dropdownItems}
                  containerClassName="right-0 top-full"
                  className="w-33 text-gray-500 text-md-regular border-gray-300 border-2 rounded-lg"
                />
              )}
            </div>
          </div>
        </div>

        <div className=" text-gray-800 py-3 border-t-2 border-gray-200">
          <h2 className="text-sm-semibold my-1">상품 소개</h2>
          <p>{product.description}</p>
        </div>

        <div className="text-gray-800 py-3">
          <h2 className="text-sm-semibold my-1">상품 태그</h2>
          <div className="flex py-1 gap-2">
            {product.tags.map((tag) => {
              return <TagCard key={tag} tagName={tag} />;
            })}
          </div>
        </div>

        <div className="flex justify-between items-center my-2 ">
          <div className="flex items-center gap-3  ">
            <ProfileImage className={"w-10 h-auto object-cover"} />
            <div>
              <p className="text-gray-600 text-sm font-medium">
                {product.ownerNickname}
              </p>
              <p className="text-gray-400 text-sm ">
                {new Date(product.createdAt)
                  .toISOString()
                  .slice(0, 10)
                  .replace(/-/g, ". ")}
              </p>
            </div>
          </div>

          <div className="border-l-1 border-gray-200 pl-3">
            <div className="flex justify-center items-center w-20 h-8 border-gray-200 border-2 rounded-4xl font-medium  text-gray-500 gap-2">
              <Image
                src={emptyHeartImage}
                alt="emptyHeartImage"
                className="w-5 h-auto object-cover "
              />
              <p>{product.favoriteCount}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full p-4">
        <TitleSection titleText={"문의하기"} />
        <div>
          <InputBox
            placeHolderText={
              "개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
            }
            inputValueState={commentInputValue}
            onChangeInput={handleOnChangeCommentInput}
            inputType={"textarea"}
            inputClassName={"h-32"}
          />
        </div>
        <div className="flex justify-end py-4">
          <button
            className={`btn-sm-42 ${
              isActive
                ? "bg-primary-100 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={() => handleCreateComment()}
          >
            등록
          </button>
        </div>
      </section>

      <section className="p-4"></section>

      <section className="w-full p-4">
        {comments.length === 0 ? (
          <div className="flex flex-col items-center text-md-regular text-gray-400">
            <Image
              src={noCommentImage}
              alt="noCommentImage"
              className="w-49 h-49"
            />
            <p>아직 문의가 없어요</p>
          </div>
        ) : (
          <div>
            {comments.map((comment) => {
              return (
                <CommentCard
                  key={comment.id}
                  comment={comment}
                  fetchData={fetchData}
                />
              );
            })}
          </div>
        )}
      </section>

      <div className="w-full flex justify-center p-10">
        <Link
          href="/community"
          className="btn-lg bg-primary-100 text-FF flex items-center justify-center gap-1 cursor-pointer"
        >
          목록으로 돌아가기 <Image src={backImage} alt="backButton" />
        </Link>
      </div>
      {isModalOpen && (
        <ConfirmModal
          modalTheme={"red"}
          confirmType={"confirm"}
          confirmText={"정말로 상품을 삭제하시겠어요?"}
          handleOnClick={handleDelete}
          handleOnCloseModal={hadleModalClose}
        />
      )}
    </div>
  );
}
