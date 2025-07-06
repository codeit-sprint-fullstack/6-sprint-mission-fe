"use client";

import React, { useState } from "react";
import ItemHeader from "./ItemHeader";
import ItemDetail from "./ItemDetail";
import UserInfo from "@/components/ui/UserInfo";
import LineDivider from "@/components/ui/LineDivider";
import Modal from "@/components/ui/Modal";
import Image from "next/image";
import ItemDefaultImg from "@/assets/svgs/item_default.svg";
import { useRouter } from "next/navigation";
import { createLike, deleteLike, deleteProduct } from "@/lib/actions/product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Product } from "@/types";
import { productService } from "@/lib/service/productService";

function ItemContainer({ id }: { id: Product["id"] }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [isDelete, setIsDelete] = useState(true);

  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: item } = useQuery({
    queryKey: ["product", id],
    queryFn: () => productService.getProduct(id),
  });

  const likeMutation = useMutation({
    mutationFn: () => createLike({ productId: id }),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["product", id] });

      const previousItem = queryClient.getQueryData(["product", id]);

      queryClient.setQueryData(["product", id], (old: Product) => ({
        ...old,
        isFavorite: true,
        likeCount: old.likeCount + 1,
      }));

      return { previousItem };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(["product", id], context?.previousItem);
    },
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["product", id] });
      }, 300);
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: () => deleteLike({ productId: id }),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["product", id] });

      const previousItem = queryClient.getQueryData(["product", id]);

      queryClient.setQueryData(["product", id], (old: Product) => ({
        ...old,
        isFavorite: false,
        likeCount: old.likeCount - 1,
      }));

      return { previousItem };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(["product", id], context?.previousItem);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["product", id] });
    },
  });

  // 상품 편집 핸들러
  const handleEditItem = (value: string) => {
    setIsDropdownOpen(true);
    if (value === "edit") {
      router.push(`/items/${id}/edit`);
    } else if (value === "delete") {
      setIsModalOpen(true);
      setModalMsg("정말로 상품을 삭제하시겠어요?");
    }
  };

  // 상품 삭제 핸들러
  const handleDeleteItem = async () => {
    const result = await deleteProduct({ productId: id });

    if (!result?.success) {
      setIsModalOpen(true);
      setIsDelete(false);
      setModalMsg(result.message);
    } else {
      router.push("/items");
    }
  };

  // 좋아요 토글 핸들러
  const handleToggleLike = () => {
    if (item?.isFavorite) {
      unlikeMutation.mutate();
    } else {
      likeMutation.mutate();
    }
  };

  return (
    <section className="grid-cols-2 gap-4 md:grid lg:grid-cols-[1fr_2fr]">
      {item && (
        <>
          {item.images?.length > 0 ? (
            <Image
              src={item.images[0]}
              alt="상품 이미지"
              width={343}
              height={343}
              className="mb-4 aspect-square w-full rounded-xl"
            />
          ) : (
            <ItemDefaultImg alt="상품 기본 이미지" />
          )}
          <div>
            <ItemHeader
              item={item}
              isDropdownOpen={isDropdownOpen}
              setIsDropdownOpen={setIsDropdownOpen}
              handleEditItem={handleEditItem}
            />
            <LineDivider />
            <ItemDetail item={item} />
            <UserInfo
              nickname={item.ownerNickname}
              createdAt={item.createdAt}
              likeCount={item.likeCount}
              isItemPage={true}
              isLiked={item.isFavorite}
              onToggleLike={handleToggleLike}
            />
          </div>
        </>
      )}
      {isModalOpen && (
        <Modal
          message={modalMsg}
          handleClick={() => setIsModalOpen(false)}
          isDelete={isDelete}
          handleDelete={handleDeleteItem}
        />
      )}
    </section>
  );
}

export default ItemContainer;
