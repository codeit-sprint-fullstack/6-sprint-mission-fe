import React from "react";

interface ErrorModalProps {
  errorMessage: string;
  setErrorMessage: (value: string) => void;
  onConfirm: () => void;
}

function ErrorModal({
  errorMessage,
  setErrorMessage,
  onConfirm,
}: ErrorModalProps) {
  const handleClick = () => {
    if (errorMessage === "가입 완료되었습니다.") {
      setErrorMessage("");
      onConfirm();
    } else {
      setErrorMessage("");
    }
  };
  return (
    <div className="z-500 fixed inset-0 bg-black/70 flex items-center justify-center ">
      <div className="w-80 h-55 bg-white rounded-xl flex justify-center items-center flex-col opacity-100 md:w-130 md:h-60">
        <p className="text-gray-800 font-medium">{errorMessage}</p>
        <button
          onClick={handleClick}
          className="bg-primary-100 text-white py-3 px-11 rounded-lg mt-10 md:40"
        >
          확인
        </button>
      </div>
    </div>
  );
}

export default ErrorModal;
