"use client";

import Link from "next/link";
import React from "react";

export default function GlobalErrorPage() {
  return (
    <html>
      <body>
        <div className="flex justify-center items-center h-screen">
          <div className="flex justify-center items-center flex-col gap-[18px]">
            <div className="flex justify-center items-center text-[30px] font-medium text-center">
              예상치 못한 오류가 발생했습니다.
              <br />
              다시 시도해주세요.
            </div>
            <Link
              href="/"
              className="flex justify-center items-center rounded-[40px] py-[11px] px-[39.5px] gap-[8px] bg-primary-100 hover:bg-primary-200 active:bg-primary-300 font-semibold text-[18px]/[26px] text-secondary-gray-100"
            >
              홈으로 이동하기
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
