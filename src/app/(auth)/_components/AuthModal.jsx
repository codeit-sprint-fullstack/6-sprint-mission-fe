"use client";

import { useRouter } from "next/navigation";

function AuthModal({ isModal, setIsModal }) {
  const router = useRouter();
  const handleClick = () => {
    setIsModal({ state: false });
    if (isModal.message === "가입 완료되었습니다") {
      router.push("/items");
    }
  };

  return (
    <div
      className={`${
        isModal.state ? "block" : "hidden"
      } absolute top-[50%] left-[50%] w-full h-[120vh] translate-[-50%] bg-[#000000b2] flex items-center justify-center`}
    >
      <div className="w-[327px] h-[220px] bg-white rounded-[8px] flex flex-col items-center justify-center gap-[42px]">
        <p>{isModal.message}</p>
        <button
          className="w-[120px] h-[48px] bg-[var(--color-main-blue)] text-white rounded-[8px] cursor-pointer"
          onClick={handleClick}
        >
          확인
        </button>
      </div>
    </div>
  );
}

export default AuthModal;
