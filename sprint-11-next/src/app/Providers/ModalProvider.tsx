import React, {
  createContext,
  useRef,
  useEffect,
  useContext,
  useState,
  ReactNode,
} from "react";
type ModalContextType = {
  openModal: (content: ReactNode | (() => ReactNode)) => void;
  closeModal: () => void;
};
const ModalContext = createContext<ModalContextType | null>(null);
export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const openModal = (content: ReactNode | (() => ReactNode)) =>
    setModalContent(content);
  const closeModal = () => setModalContent(null);

  // ✅ ESC 키로 닫기
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
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
    const onClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
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
            {typeof modalContent === "function"
              ? (modalContent as () => ReactNode)()
              : modalContent}
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
