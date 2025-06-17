import clsx from "clsx";
import React from "react";

interface IAuthModalProps {
  isModalVisible: boolean;
  modalMessage: string;
  handleModal: () => void;
}

export default function AuthModal({
  isModalVisible,
  modalMessage,
  handleModal,
}: IAuthModalProps) {
  return (
    <div
      className={clsx(
        isModalVisible ? "block" : "hidden",
        "absolute top-0 right-0 bottom-0 left-0 bg-[rgba(0,0,0,0.7)] z-1"
      )}
    >
      <div className="absolute top-[50%] left-[50%] translate-[-50%] bg-white rounded-[8px] font-medium text-[16px]/[19px] text-center w-[327px] h-[220px] pt-[81px] sm:w-[540px] sm:h-[250px] sm:pt-[108px] sm:pb-[123px]">
        <p>{modalMessage}</p>
        <button
          className="w-[120px] h-[48px] border-none rounded-[8px] bg-primary-100 text-secondary-gray-100 py-[12px] px-[23px] font-semibold text-[16px]/[19px] mt-[49px] mx-[103.5px] mb-[23px] cursor-pointer sm:mt-[47px] sm:mr-[28px] sm:mb-[28px] sm:ml-[392px]"
          onClick={handleModal}
          type="button"
        >
          확인
        </button>
      </div>
    </div>
  );
}
