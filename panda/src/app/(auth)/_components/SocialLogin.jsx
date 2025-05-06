import React from "react";
import { FcGoogle } from "react-icons/fc";
import { RiKakaoTalkFill } from "react-icons/ri";

function SocialLogin() {
  return (
    <section className="bg-[#e6f2ff] flex justify-between items-center px-[23px] py-[16px] w-[343px] md:w-[640px] h-[74px]">
      <span className="text-gray-800 font-[500]">간편 로그인하기</span>
      {/* 구글 */}
      <div className="flex gap-[16px]">
        <a href="https://www.google.com" target="_blank">
          <div className="w-[42px] h-[42px] bg-white flex justify-center items-center rounded-[50%]">
            <FcGoogle className="w-[22px] h-[22px]" />
          </div>
        </a>
        {/* 카톡 */}
        <a href="https://www.kakaocorp.com/page" target="_blank">
          <div className="w-[42px] h-[42px] bg-[#f5e14b] flex justify-center items-center rounded-[50%]">
            <RiKakaoTalkFill className="w-[26px] h-[24px]" />
          </div>
        </a>
      </div>
    </section>
  );
}

export default SocialLogin;
