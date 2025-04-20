"use client";

import Image from "next/image";
import redCheckImage from "../../assets/images/icons/ic_red_check.png";
import { useParams } from "next/navigation";

export default function DeleteModal({
  confirmText,
  handleOnCloseProps,
  handleDeleteProps,
}) {
  const { id } = useParams();

  const handleOnClickDeleteButton = () => {
    handleDeleteProps(id);
  };
  const handleOnClickCancelButton = () => {
    handleOnCloseProps();
  };

  return (
    <div className="fixed inset-0 bg-gray-300 flex items-center justify-center z-50">
      <div className="flex flex-col justify-center items-center w-75 h-50 bg-white rounded-2xl relative gap-y-6">
        <Image src={redCheckImage} alt="redCheckImage" />

        <p className="text-gray-800 font-medium ">{confirmText}</p>

        <div className="flex gap-2">
          <button
            onClick={handleOnClickCancelButton}
            className="px-4 py-2 w-22 h-12 rounded-lg border border-error-red text-error-red cursor-pointer"
          >
            취소
          </button>
          <button
            onClick={handleOnClickDeleteButton}
            className="px-4 py-2 w-22 h-12 rounded-lg bg-error-red text-white cursor-pointer"
          >
            네
          </button>
        </div>

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
