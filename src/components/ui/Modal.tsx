import Image from "next/image";

interface ModalProps {
  message?: string | null;
  handleClick?: () => void;
  isDelete?: boolean;
  itemId?: number | null;
  handleDelete?: (itemId: number) => void;
}

function Modal({ message, handleClick, isDelete, itemId, handleDelete }: ModalProps) {
  return (
    <div className="fixed top-0 left-0 z-100 flex h-full w-full items-center justify-center bg-black/70">
      <div className="flex h-[220px] w-[327px] flex-col items-center justify-center gap-[42px] rounded-lg bg-white md:h-[250px] md:w-[540px]">
        {isDelete && (
          <span className="bg-error-red flex h-6 w-6 justify-center rounded-full">
            <Image src="/assets/icon/check.svg" alt="체크 아이콘" width={12} height={12} />
          </span>
        )}
        <p className="font-medium md:text-lg">{message}</p>
        <div className="flex gap-2">
          <button
            type="button"
            className={`btn-base h-12 ${
              isDelete
                ? "border-error-red text-error-red w-22 border bg-white"
                : "w-30 md:w-[165px]"
            }`}
            onClick={handleClick}
          >
            {isDelete ? "취소" : "확인"}
          </button>
          {isDelete && (
            <button
              type="button"
              className="btn-base bg-error-red h-12 w-22"
              onClick={() => handleDelete(itemId)}
            >
              네
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
