import React from "react";
import Button from "../common-UI/Button";

function ValidModal({ text, onClose }) {
  const handleOverlayClick = () => {
    onClose();
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };
  return (
    <div
      className="fixed inset-0 z-2 flex items-center justify-center bg-[rgba(0,0,0,0.7)]"
      onClick={handleOverlayClick}
    >
      <div
        className="flex justify-center items-center w-[540px] h-[250px] bg-white"
        onClick={handleModalClick}
      >
        <div className="flex flex-col justify-between items-center w-[216px] h-[114px]">
          <div>{text}</div>
          <Button
            text="확인"
            onClick={onClose}
            disabled={false}
            width="w-[165px]"
            height="h-[48px]"
            rounded="rounded-[8px]"
          />
        </div>
      </div>
    </div>
  );
}

export default ValidModal;
