import React from "react";
import { useRouter } from "next/navigation";
import { IoClose, IoLockClosed } from "react-icons/io5";

interface AuthRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
  title?: string;
}

export default function AuthRequiredModal({
  isOpen,
  onClose,
  message = "로그인이 필요한 기능입니다.",
  title = "로그인 필요",
}: AuthRequiredModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleLoginRedirect = () => {
    onClose();
    router.push("/sign-in");
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50  p-4"
      onClick={handleOverlayClick}
    >
      <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        >
          <IoClose size={20} />
        </button>

        {/* 아이콘 */}
        <div className="flex justify-center mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <IoLockClosed className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        {/* 제목 */}
        <h2 className="mb-3 text-center text-xl font-bold text-gray-900">
          {title}
        </h2>

        {/* 메시지 */}
        <p className="mb-6 text-center text-gray-600 leading-relaxed">
          {message}
        </p>

        {/* 버튼들 */}
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 cursor-pointer transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            취소
          </button>
          <button
            onClick={handleLoginRedirect}
            className="flex-1 rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            로그인하기
          </button>
        </div>
      </div>
    </div>
  );
}
