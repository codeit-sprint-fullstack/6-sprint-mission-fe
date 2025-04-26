"use client";

import React, { useState } from "react";
import ItemHeader from "./ItemHeader";
import ItemDetail from "./ItemDetail";
import UserInfo from "@/components/ui/UserInfo";
import LineDivider from "@/components/ui/LineDivider";
import defaultImg from "../../../../../../public/assets/img/img_item_default.svg";
import { useRouter } from "next/navigation";
import { createLike, deleteLike, deleteProduct } from "@/app/actions/product";
import { getProduct } from "@/lib/getApi";
import Modal from "@/components/ui/Modal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function ItemContainer({ id }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [isDelete, setIsDelete] = useState(true);

  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: item } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });

  const likeMutation = useMutation({
    mutationFn: () => createLike(id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["product", id] });

      const previousItem = queryClient.getQueryData(["product", id]);

      queryClient.setQueryData(["product", id], (old) => ({
        ...old,
        isFavorite: true,
        favoriteCount: old.favoriteCount + 1,
      }));

      return { previousItem };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(["product", id], context.previousItem);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["product", id] });
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: () => deleteLike(id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["product", id] });

      const previousItem = queryClient.getQueryData(["product", id]);

      queryClient.setQueryData(["product", id], (old) => ({
        ...old,
        isFavorite: true,
        favoriteCount: old.favoriteCount - 1,
      }));

      return { previousItem };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(["product", id], context.previousItem);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["product", id] });
    },
  });

  // 상품 편집 핸들러
  const handleEditItem = (action) => {
    setIsDropdownOpen(true);
    if (action === "edit") {
      router.push(`/items/${id}/edit`);
    } else if (action === "delete") {
      setIsModalOpen(true);
      setModalMsg("정말로 상품을 삭제하시겠어요?");
    }
  };

  // 상품 삭제 핸들러
  const handleDeleteItem = async () => {
    const result = await deleteProduct(id);

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
    <section className="md:grid grid-cols-2 gap-4 lg:grid-cols-[1fr_2fr]">
      <img
        src={
          item?.images?.[0] && item.images[0].length > 0
            ? item.images[0]
            : defaultImg.src
        }
        alt="상품 이미지"
        className="rounded-xl mb-4 w-full aspect-square"
      />
      {item && (
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
            favoriteCount={item.favoriteCount}
            isItemPage={true}
            isLiked={item.isFavorite}
            onToggleLike={handleToggleLike}
          />
        </div>
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
