"use client";

import Image from "next/image";
import redCheckImage from "@/assets/images/icons/ic_red_check.png";
import blueCheckImage from "@/assets/images/icons/ic_blue_check.png";

export default function ConfirmModal({
  modalTheme,
  confirmType,
  confirmText,
  handleOnCloseModal,
  handleOnClick,
}) {
  const handleOnClickButton = () => {
    handleOnClick();
  };
  const handleOnClickCancelButton = () => {
    handleOnCloseModal();
  };

  return (
    <div className="fixed inset-0 bg-gray-300 flex items-center justify-center z-50">
      <div className="flex flex-col justify-center items-center w-75 h-50 bg-white rounded-2xl relative gap-y-6">
        <Image
          src={modalTheme === "red" ? redCheckImage : blueCheckImage}
          alt={modalTheme === "red" ? "redCheckImage" : "blueCheckImage"}
        />

        <p className="text-gray-800 font-medium ">{confirmText}</p>
        {confirmType === "confirm" ? (
          <div className="flex gap-2">
            <button
              onClick={handleOnClickCancelButton}
              className={`${
                modalTheme === "red"
                  ? "border-error-red text-error-red"
                  : "border-brand-blue text-brand-blue"
              } px-4 py-2 w-22 h-12 rounded-lg border  cursor-pointer`}
            >
              취소
            </button>
            <button
              onClick={handleOnClickButton}
              className={`${
                modalTheme === "red" ? "bg-error-red" : "bg-brand-blue"
              } px-4 py-2 w-22 h-12 rounded-lg  text-white cursor-pointer`}
            >
              네
            </button>
          </div>
        ) : (
          <div>
            <button
              onClick={handleOnClickButton}
              className={`${
                modalTheme === "red" ? "bg-error-red" : "bg-brand-blue"
              } px-4 py-2 w-30 h-12 rounded-lg  text-white cursor-pointer`}
            >
              확인
            </button>
          </div>
        )}

        <button
          onClick={handleOnClickCancelButton}
          className="absolute top-3 right-3 cursor-pointer"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
