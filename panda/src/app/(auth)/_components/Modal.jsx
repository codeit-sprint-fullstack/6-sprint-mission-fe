import Button from "@/components/Button";
import React from "react";

function Modal({ message, onClick }) {
  return (
    <section className="fixed inset-0 flex justify-center items-center">
      <div className="absolute inset-0 bg-black opacity-50" />
      <div
        open
        className="bg-white rounded-[8px] px-[45px] py-[26px] md:px-[140px] md:py-[40px] w-[327px] h-[220px] md:w-[540px] md:h-[250px] z-50 flex flex-col justify-center items-center gap-[40px]"
      >
        <p className="text-gray-800 font-[500]">{message}</p>
        <Button size="lg" onClick={onClick}>
          확인
        </Button>
      </div>
    </section>
  );
}

export default Modal;
