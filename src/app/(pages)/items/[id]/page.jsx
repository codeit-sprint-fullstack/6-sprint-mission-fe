"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import defaultProfile from "../../../../assets/face.png";
import defalutItem from "../../../../assets/defalut-item.png";
import noComment from "../../../../assets/noCommment.png";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { deleteProducts, fetchProduct } from "@/src/api/Product/Product";
import {
  getProductComent,
  postProductComent,
} from "@/src/api/comment/comments";
import Coment from "./components/Coment";
import modalopenbt from "../../../../assets/modalopenbt.png";
import Link from "next/link";
import { userService } from "@/src/app/providers/AuthProvider";
import ButtonModal from "./components/ButtonModal";
import { useModal } from "@/src/app/providers/ModalProvider";
import DeleteModal from "./components/DeleteModal";
import LikeButton from "@/src/components/LikeButton";

export default function ItemsDetailPage() {
  const { openModal, closeModal } = useModal();
  const router = useRouter();
  const { user } = userService();
  const queryClient = useQueryClient();

  const [inputValue, setInputValue] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인이 필요합니다.");
      router.push("/login");
    }
  }, []);

  const { id } = useParams();

  const {
    data: item,
    isPending: itemPending,
    error: itemError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const {
    data: comments,
    isPending: comentPending,
    error: comentError,
  } = useQuery({
    queryKey: ["itemsComent", id],
    queryFn: () => getProductComent(id, { params: { limit: 10 } }),
    enabled: !!id,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const postComent = async (e) => {
    e.preventDefault();
    await postProductComent(id, { content: inputValue });
    setInputValue("");
    queryClient.invalidateQueries(["itemsComent", id]);
  };

  if (comentPending) return <p>댓글목록 불러오는 중...</p>;
  if (comentError) return <p>댓글목록 오류 발생!</p>;
  if (itemPending) return <p>아이템목록 불러오는 중...</p>;
  if (itemError) return <p>아이템목록 오류 발생!</p>;

  // ✅ 이미지 유효성 검사 및 URL 처리
  const firstImage = item.images?.[0];
  const isValidImage =
    typeof firstImage === "string" &&
    firstImage.trim() !== "" &&
    !firstImage.includes("example.com");
  const isAbsoluteUrl = isValidImage && /^https?:\/\//.test(firstImage);
  const imageUrl = isValidImage
    ? isAbsoluteUrl
      ? firstImage
      : `http://localhost:5000${firstImage}`
    : defalutItem;

  return (
    <div className="w-full max-w-[75rem] mx-auto pb-[5rem] px-[1rem] md:px-[1.5rem] flex flex-col gap-[2.5rem]">
      <div className="flex flex-col md:flex-row gap-[1rem] items-center justify-center pb-[1.5rem] md:pb-[2rem] lg:pb-[2.5rem] border-b border-gray-200">
        <div className="w-[21.5rem] h-[21.5rem] md:w-[30.375rem] md:h-[30.375rem] relative">
          <Image
            src={imageUrl}
            alt="상품이미지"
            fill
            className="object-cover rounded-xl"
          />
        </div>
        <section className="w-full flex flex-col items-center gap-[0.5rem]">
          <div className="w-full flex flex-row justify-between items-center">
            <p className="w-full titletext pb-[1rem]">{item.name}</p>
            {user.user.id === item.ownerId ? (
              <div className="relative inline-block">
                <button onClick={handleOpenModal}>
                  <Image
                    src={modalopenbt}
                    width={24}
                    height={24}
                    alt="모달열기 버튼"
                  />
                </button>
                {modalOpen && (
                  <ButtonModal
                    onDeleteClick={() => {
                      handleCloseModal();
                      openModal(() => <DeleteModal id={id} />);
                    }}
                    onEditClick={() => {
                      router.push(`/items/registration/${item.id}`);
                      handleCloseModal();
                    }}
                  />
                )}
              </div>
            ) : null}
          </div>

          <div className="w-full titletext border-b text-[2rem] lg:text-[2.5rem] border-gray-200 pb-[1rem]">
            <p>{new Intl.NumberFormat("ko-KR").format(item.price)}원</p>
          </div>

          <div className="w-full flex flex-col gap-[0.5rem] items-start justify-center">
            <p>상품소개</p>
            <div>{item.description}</div>
          </div>

          <div className="w-full flex flex-col gap-[0.5rem] items-start justify-center">
            <p>상품태그</p>
            <div className="flex flex-row items-center justify-start gap-[0.5rem]">
              {item.tags?.map((tag, index) => (
                <button
                  key={index}
                  className="btn-primary bg-[#F3F4F6] rounded-3xl text-[#1F2937]"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full flex flex-row justify-between items-center mt-[2rem]">
            <div className="w-full flex flex-row justify-start items-center gap-[1rem]">
              <Image
                src={defaultProfile}
                width={40}
                height={40}
                alt="기본얼굴이미지"
              />
              <div className="flex flex-col justify-center items-start gap-0.5">
                <p>{item.ownerNickname}</p>
                <p className="text-[#9CA3AF]">{item.createdAt.slice(0, 10)}</p>
              </div>
            </div>
            <div className="border-l-[0.2rem] border-gray-200 h-[2.5rem]">
              <LikeButton
                id={item.id}
                type="product"
                isFavorite={item.isFavorite}
                favoriteCount={item.favoriteCount}
              />
            </div>
          </div>
        </section>
      </div>

      <section className="w-full flex flex-col gap-2">
        <h1 className="titletext">문의하기</h1>
        <form className="w-full" onSubmit={postComent}>
          <textarea
            placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
              }
            }}
            className="w-full h-[6.5rem] px-[1.5rem] py-[1rem] outline-none text-base leading-[26px] font-normal text-gray-400 resize-none bg-[#F3F4F6] rounded-xl"
          />
          <div className="flex items-center justify-end mt-[0.5rem] mb-[2rem]">
            <button className="btn-primary w-[4.5rem]" type="submit">
              등록
            </button>
          </div>
        </form>

        <div className="flex flex-col gap-[1rem] w-full">
          {comments.length > 0 ? (
            comments.map((coment) => <Coment key={coment.id} data={coment} />)
          ) : (
            <div className="flex flex-col items-center justify-center gap-[1rem] py-[2rem]">
              <Image src={noComment} width={140} height={140} alt="댓글없음" />
              <p className="text-[#9CA3AF]">아직 문의가 없어요...</p>
            </div>
          )}
        </div>
      </section>

      <Link href={"./"}>
        <button className="btn-primary rounded-3xl w-[15rem] h-[3rem] mx-auto">
          목록으로 돌아가기 ↩
        </button>
      </Link>
    </div>
  );
}
