"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, ChangeEvent } from "react";
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
import fillHeartImage from "@/assets/images/icons/ic_fillHeart.png";
import noCommentImage from "@/assets/images/logo/noCommentImage2.png";
import defaultImage from "@/assets/images/logo/defaultImage.png";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  tags: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
  ownerNickname: string;
  isFavorite: boolean;
  favoriteCount: number;
}

interface Comment {
  id: number;
  content: string;
  writer: { nickname: string };
  createdAt: string;
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [commentInputValue, setCommentInputValue] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data: product, isPending: isProductLoading } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => productService.getProduct(id),
  });

  const { data: commentData, isPending: isCommentsLoading } = useQuery<{ list: Comment[] }>({
    queryKey: ["productComments", id],
    queryFn: () => productService.getProductComments(id, 3, 0),
  });

  const comments = commentData?.list || [];

  const { mutate: mutateDeleteProduct, isPending: isDeleteProductLoading } =
    useMutation({
      mutationFn: () => productService.deleteProduct(id),
      onSuccess: () => {
        router.push("/items");
        queryClient.invalidateQueries({ queryKey: ["products", id] });
      },
      onError: (error: unknown) => {
        console.error("상품 삭제 중 오류 발생:", error);
      },
    });

  const { mutate: createProductComment, isPending: isCreateCommentLoading } =
    useMutation({
      mutationFn: () =>
        productService.createProductComment(id, {
          content: commentInputValue,
        }),
      onSuccess: () => {
        setCommentInputValue("");
        queryClient.invalidateQueries({ queryKey: ["productComments", id] });
      },
      onError: (error: unknown) => {
        console.error("댓글 생성 중 오류 발생:", error);
      },
    });

  const likeMutation = useMutation({
    mutationFn: () => productService.likeProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product", id] });
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: () => productService.unlikeProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product", id] });
    },
  });

  const handleDeleteProduct = () => {
    mutateDeleteProduct();
  };

  const hadleDropdownOpen = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOnChangeCommentInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCommentInputValue(e.target.value);
  };

  const handleCreateComment = () => {
    createProductComment();
  };

  const handleOnClickLike = () => {
    if (!product) return;
    product.isFavorite ? unlikeMutation.mutate() : likeMutation.mutate();
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

  if (isProductLoading) {
    return <p>상품 정보 로딩 중...</p>;
  }

  if (isCommentsLoading) {
    return <p>댓글 정보 로딩 중...</p>;
  }

  if (isDeleteProductLoading) {
    return <p>상품 정보 삭제 중...</p>;
  }
  if (isCreateCommentLoading) {
    return <p>댓글 정보 생성 중...</p>;
  }

  if (!product) {
    return <p>상품 정보가 없습니다.</p>;
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
                src={product.isFavorite ? fillHeartImage : emptyHeartImage}
                alt="likeIcon"
                className="w-5 h-auto object-cover "
                onClick={handleOnClickLike}
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
                  productId={id}
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
          handleOnClick={handleDeleteProduct}
          handleOnCloseModal={hadleModalClose}
        />
      )}
    </div>
  );
}
