import Image from "next/image";
import React from "react";
import { useModal } from "@/app/Providers/ModalProvider";
function Modal({ message }: { message: string }) {
  const { closeModal } = useModal();
  return (
    <div className="modalContainer flex flex-col items-center justify-between pt-15">
      <p className="text-xl text-red-400 text-">{message}</p>
      <button
        className="btn-primary w-[6rem] md:w-[8.5rem] mt-[1rem]"
        onClick={closeModal}
      >
        확인
      </button>
    </div>
  );
}

export default Modal;
