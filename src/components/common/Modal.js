import React, { useEffect } from "react";
import "../../styles/modal.css";

const Modal = ({ isOpen, closeModal, message, redirectUrl = null }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [isOpen]);

  const handleClose = () => {
    closeModal();
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={handleClose} className="confirm-button">
          확인
        </button>
      </div>
    </div>
  );
};

export default Modal;
