"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

/**
 * 확인 모달 컴포넌트
 * @param {Object} props
 * @param {boolean} props.isOpen - 모달 표시 여부
 * @param {Function} props.onClose - 모달 닫기 함수
 * @param {Function} props.onConfirm - 확인 버튼 클릭 시 실행할 함수
 * @param {string} props.title - 모달 제목
 * @param {string} props.message - 모달 메시지
 * @param {string} props.confirmText - 확인 버튼 텍스트
 * @param {string} props.cancelText - 취소 버튼 텍스트
 */
export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "확인",
  message = "정말로 이 작업을 수행하시겠습니까?",
  confirmText = "확인",
  cancelText = "취소",
}) {
  const modalRef = useRef(null);

  // ESC 키나 모달 바깥 클릭으로 닫기
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleOutsideClick);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // 모달 포털을 사용하여 body 직접 하위에 렌더링
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        ref={modalRef}
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
      >
        <h3 className="mb-4 text-lg font-semibold text-gray-900">{title}</h3>
        <p className="mb-6 text-gray-700">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="cursor-pointer rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="cursor-pointer rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
