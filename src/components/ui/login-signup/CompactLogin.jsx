import React from "react";

function CompactLogin() {
  return (
    <div className="w-full h-[74px] bg-[#e6f2ff] mt-6 flex justify-center items-center">
      <div className="flex items-center justify-between w-[594px] h-[42px]">
        <div className="text-[16px] font-medium">간편 로그인하기</div>

        <div className="flex gap-2">
          <a href="https://www.google.com/">
            <img
              width="42"
              height="42"
              src="/image/login/Component 2@3x.png"
              alt="google"
            />
          </a>
          <a href="https://www.kakaocorp.com/page/">
            <img
              width="42"
              height="42"
              src="/image/login/Component 3@3x.png"
              alt="kakao"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default CompactLogin;
