import Image from "next/image";
import Link from "next/link";
import React from "react";
import CommentForm from "./_components/CommentForm";

function page() {
  return (
    <div className="flex-col px-4 pt-6">
      <nav className="w-full border-b-1 border-gray-200">
        <div className="flex justify-between gap-2">
          <h2 className="text-xl font-bold text-gray-800">
            맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?{" "}
          </h2>
          <Image
            src="/assets/icon/ic_kebab.svg"
            alt="편집 아이콘"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </div>
        <div className="flex items-center my-4 gap-4">
          <Image
            src="/assets/icon/ic_profile.svg"
            alt="기본 프로필 아이콘"
            width={40}
            height={40}
          />
          <div className="flex gap-0.5">
            <div className="font-medium text-gray-600">총명한 판다</div>
            <div className="text-gray-400">2024. 04. 16</div>
          </div>
          <span className="h-10 border-1 border-gray-200"></span>
          <button className="flex items-center px-3 py-1 border-1 border-gray-200 rounded-[35px] gap-[3px]">
            <Image
              src="/assets/icon/ic_unheart.svg"
              alt="좋아요 아이콘"
              width={40}
              height={40}
            />
            <span className="font-medium text-gray-500">123</span>
          </button>
        </div>
      </nav>
      <section>
        <p className="mt-4 mb-8">
          맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?
        </p>
        <CommentForm />
        <Link href="/board" className="flex justify-center">
          <button className="flex btn-base mt-10 mb-[319px] px-10 rounded-[40px] gap-2">
            <span className="text-lg font-semibold">목록으로 돌아가기</span>
            <Image
              src="/assets/icon/ic_back.svg"
              alt="되돌아가기 아이콘"
              width={24}
              height={24}
            />
          </button>
        </Link>
      </section>
    </div>
  );
}

export default page;
