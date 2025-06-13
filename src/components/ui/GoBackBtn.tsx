import Image from "next/image";
import Link from "next/link";
import React from "react";

function GoBackBtn({ isItemPage }: { isItemPage: boolean }) {
  return (
    <>
      <Link href={isItemPage ? "/items" : "/board"} className="flex justify-center">
        <button className="btn-base mt-12 mb-[234px] flex h-12 gap-2 rounded-[40px] px-10">
          <span className="text-lg font-semibold">목록으로 돌아가기</span>
          <Image src="/assets/icon/ic_back.svg" alt="되돌아가기 아이콘" width={24} height={24} />
        </button>
      </Link>
    </>
  );
}

export default GoBackBtn;
