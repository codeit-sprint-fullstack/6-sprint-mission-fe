"use client";

import React from "react";
import { FaCheck } from "react-icons/fa";

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-xs rounded-2xl bg-white px-6 py-8 text-center shadow-lg">
        {/* 상단 체크 아이콘 */}
        <div className="mx-auto mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-red-500">
          <FaCheck className="text-sm text-white" /> {/* ← 크기 줄임 */}
        </div>

        {/* 텍스트 */}
        <p className="mb-6 text-base font-medium text-gray-800">
          정말로 상품을 삭제하시겠어요?
        </p>

        {/* 버튼 영역 */}
        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            className="w-20 cursor-pointer rounded-lg border border-red-500 px-4 py-2 text-red-500 transition-colors hover:bg-red-50"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="w-20 cursor-pointer rounded-lg bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
}
