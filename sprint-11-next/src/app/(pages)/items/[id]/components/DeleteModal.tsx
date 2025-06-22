"use client";
import { deleteProducts } from "@/api/Product/Product";
import { useModal } from "@/app/Providers/ModalProvider";
import React from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
function DeleteModal({ id }: { id: string }) {
  const { closeModal } = useModal();
  const router = useRouter();
  const queryClient = useQueryClient();
  return (
    <div className="flex flex-col w-[18.5rem] h-[13rem] p-[1.5rem] gap-[2rem] bg-white rounded-3xl items-center justify-center">
      <div className=" flex flex-col items-center justify-center gap-[1rem]">
        <button className="bg-red-600 rounded-4xl w-[1.6rem]">✔</button>
        <h1>정말로 상품을 삭제하시겠어요?</h1>
        <div className="flex flex-row gap-[1.5rem]">
          <button
            className="btn-primary w-[5rem] border border-red-500 bg-white text-red-500"
            onClick={() => {
              closeModal();
            }}
          >
            {" "}
            취소
          </button>
          <button
            className="btn-primary w-[5rem] border border-red-500 bg-red-500 text-white"
            onClick={() => {
              deleteProducts(id);
              closeModal();
              queryClient.invalidateQueries({ queryKey: ["items"] }); // 캐시 무효화
              router.push("/items");
            }}
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
