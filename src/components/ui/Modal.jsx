import Image from "next/image";

function Modal({ message, handleClick, isDelete, handleDelete }) {
  return (
    <div className="flex justify-center items-center w-full h-full fixed top-0 left-0 z-100 bg-black/70">
      <div className="flex flex-col justify-center items-center w-[327px] h-[220px] md:w-[540px] md:h-[250px] rounded-lg bg-white gap-[42px]">
        {isDelete && (
          <span className="flex justify-center bg-error-red rounded-full w-6 h-6">
            <Image
              src="/assets/icon/check.svg"
              alt="체크 아이콘"
              width={12}
              height={12}
            />
          </span>
        )}
        <p className="font-medium md:text-lg">{message}</p>
        <div className="flex gap-2">
          <button
            type="button"
            className={`btn-base h-12 ${
              isDelete
                ? "bg-white border border-error-red text-error-red w-22"
                : "w-30 md:w-[165px]"
            }`}
            onClick={handleClick}
          >
            {isDelete ? "취소" : "확인"}
          </button>
          {isDelete && (
            <button
              type="button"
              className="btn-base h-12 bg-error-red w-22"
              onClick={handleDelete}
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
