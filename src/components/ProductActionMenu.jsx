"use client";

import { useState, useRef, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useRouter } from "next/navigation";
import DeleteConfirmModal from "./DeleteConfirmModal";
import { useAuth } from "@/providers/AuthProvider";

export default function ProductActionMenu({ itemId }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const ref = useRef(null);

  const { accessToken } = useAuth();

  useEffect(() => {
    const close = (e) =>
      ref.current && !ref.current.contains(e.target) && setOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  const handleDelete = async () => {
    if (!accessToken) {
      alert("로그인이 필요합니다.");
      router.push("/login");
      return;
    }

    const res = await fetch(`http://localhost:5000/api/products/${itemId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      alert(errorData.message || "상품 삭제에 실패했습니다.");
      return;
    }

    alert("삭제되었습니다.");
    router.push("/products");
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="p-2 rounded hover:bg-gray-100"
      >
        <BsThreeDotsVertical className="w-5 h-5 text-gray-500" />
      </button>

      {open && (
        <ul className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded-lg shadow text-sm z-10">
          <li
            onClick={() => router.push(`/products/${itemId}/edit`)}
            className="px-4 py-2 text-center hover:bg-gray-100 cursor-pointer"
          >
            수정하기
          </li>
          <li
            onClick={() => setShowDeleteModal(true)}
            className="px-4 py-2 text-center hover:bg-gray-100 cursor-pointer"
          >
            삭제하기
          </li>
        </ul>
      )}

      {showDeleteModal && (
        <DeleteConfirmModal
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
          message="정말로 상품을 삭제하시겠어요?"
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}
