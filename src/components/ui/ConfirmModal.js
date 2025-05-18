"use client";

import { useState, createContext, useContext } from "react";
import Image from "next/image";

const ConfirmModalContext = createContext();

export function useConfirmModal() {
  return useContext(ConfirmModalContext);
}

export function ConfirmModalProvider({ children }) {
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [onConfirm, setOnConfirm] = useState(null);

  const openConfirmModal = (msg, onConfirmCallback) => {
    setMessage(msg);
    setIsOpen(true);
    setOnConfirm(() => onConfirmCallback);
  };

  const closeModal = () => {
    setIsOpen(false);
    setOnConfirm(null);
  };

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    closeModal();
  };

  return (
    <ConfirmModalContext.Provider value={{ openConfirmModal }}>
      {children}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-70" />

          <div className="relative z-10 bg-white rounded-[8px] w-[298px] h-[202px] flex flex-col justify-center items-center gap-6 p-6">
            <Image
              src="/images/icons/ic_check.svg"
              alt="체크"
              width={24}
              height={24}
            />

            <p className="font-pretendard font-medium text-[18px] leading-[26px] text-center text-gray-800">
              {message}
            </p>

            <div className="flex gap-4">
              <button
                className="w-[100px] h-[48px] border border-red-500 text-red-500 rounded-lg text-base font-medium"
                onClick={closeModal}
              >
                취소
              </button>
              <button
                className="w-[100px] h-[48px] bg-red-500 text-white rounded-lg text-base font-medium"
                onClick={handleConfirm}
              >
                네
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmModalContext.Provider>
  );
}
