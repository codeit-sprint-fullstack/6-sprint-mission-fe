import Image from "next/image";
import Link from "next/link";
import React from "react";

function GoBackBtn({ isItemPage }) {
  return (
    <>
      <Link
        href={isItemPage ? "/items" : "/board"}
        className="flex justify-center"
      >
        <button className="flex btn-base h-12 mt-12 mb-[234px] px-10 rounded-[40px] gap-2">
          <span className="text-lg font-semibold">목록으로 돌아가기</span>
          <Image
            src="/assets/icon/ic_back.svg"
            alt="되돌아가기 아이콘"
            width={24}
            height={24}
          />
        </button>
      </Link>
    </>
  );
}

export default GoBackBtn;
