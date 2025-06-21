import Image from "next/image";
import React from "react";

function SimpleLogin() {
  return (
    <div className="w-full h-19 rounded-md bg-[#E6F2FF] flex items-center px-6 py-4 justify-between">
      <p>간편 로그인하기</p>
      <div className="flex gap-4">
        <a href="https://www.google.com">
          <Image
            alt="google"
            width={40}
            height={40}
            src="/assets/ic/ic_google.png"
          />
        </a>
        <a href="https://www.kakaocorp.com/page">
          <Image
            alt="kakao"
            width={40}
            height={40}
            src="/assets/ic/ic_kakao.png"
          />
        </a>
      </div>
    </div>
  );
}

export default SimpleLogin;
