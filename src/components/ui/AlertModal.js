"use client";

import { useState, createContext, useContext } from "react";

const ModalContext = createContext();

export function useModal() {
  return useContext(ModalContext);
}

export function ModalProvider({ children }) {
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (msg) => {
    setMessage(msg);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  return (
    <ModalContext.Provider value={{ openModal }}>
      {children}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-70" />

          <div className="relative z-10 bg-white rounded-[8px] w-[540px] h-[250px] flex flex-col justify-center items-center gap-10">
            <p className="font-medium text-lg">{message}</p>

            <button
              className="w-[165px] h-[48px] bg-[#3692FF] text-white rounded-lg py-3 px-6 text-base font-medium"
              onClick={closeModal}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
}
