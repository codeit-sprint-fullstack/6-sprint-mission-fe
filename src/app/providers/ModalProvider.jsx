import React, {
  createContext,
  useRef,
  useEffect,
  useContext,
  useState,
} from "react";

const ModalContext = createContext(null);

export const ModalProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState(null);
  const modalRef = useRef();

  const openModal = (content) => setModalContent(() => content);
  const closeModal = () => setModalContent(null);

  // ✅ ESC 키로 닫기
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };

    if (modalContent) {
      window.addEventListener("keydown", onKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [modalContent]);

  // ✅ 바깥 클릭으로 닫기
  useEffect(() => {
    const onClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal();
      }
    };

    if (modalContent) {
      document.addEventListener("mousedown", onClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [modalContent]);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      {modalContent && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div ref={modalRef}>
            {typeof modalContent === "function" ? modalContent() : modalContent}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal은 ModalProvider 안에서 사용해야 해요!");
  }
  return context;
};

export default ModalProvider;
