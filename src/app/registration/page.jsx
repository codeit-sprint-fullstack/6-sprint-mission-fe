"use client";
import Button from "@/components/ui/Button";
import FormInput from "@/components/ui/FormInput";
import PasswordInput from "@/components/ui/PasswordInput";
//find out which part can be separated as client component and keep this main page as server component
import Image from "next/image";
import Link from "next/link";

export default function RegistrationPage() {
  return (
    <>
      {/* wrapper */}
      <div className="flex flex-col items-center justify-center max-w-[640px] max-h-[842px] w-full h-full gap-6 md:gap-10 mx-4 mt-6 mb-[179px] md:mx-[53px] md:mt-[48px] md:mb-[243px]">
        {/* header */}
        <Image
          src="/logo/logo-md.svg"
          width={198}
          height={66}
          alt="판다마켓 로고"
          className="block md:hidden"
        ></Image>
        <Image
          src="/logo/logo-lg.svg"
          width={396}
          height={132}
          alt="판다마켓 로고"
          className="hidden md:block"
        ></Image>
        {/* form wrapper  */}
        <form className="flex flex-col items-center justify-center w-full h-full gap-6 md:gap-">
          <FormInput
            id="email"
            label="이메일"
            placeholder="이메일을 입력해주세요"
          />
          <FormInput
            id="nickname"
            label="닉네임"
            placeholder="닉네임을 입력해주세요"
          />
          <PasswordInput
            id="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
          />
          <PasswordInput
            id="password-confirm"
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 한 번 입력해주세요"
          />
          {/* make it as common component */}
          <button className="w-full h-14 rounded-[40px] bg-secondary-400 text-white text-xl font-semibold leading-[32px]">
            회원가입
          </button>
          {/* social signin wrapper */}
          <div className="bg-[#E6F2FF] text-secondary-800 rounded-lg px-6 py-4 w-full font-medium leading-[26px]">
            <div className="flex items-center justify-between w-full h-full">
              <p>간편 로그인하기</p>
              <div className="flex gap-4">
                <Image
                  src="/icons/ic_google.svg"
                  width={42}
                  height={42}
                  alt="구글 로그인 아이콘"
                ></Image>
                <Image
                  src="/icons/ic_kakaotalk.svg"
                  width={42}
                  height={42}
                  alt="카카오톡 로그인 아이콘"
                ></Image>
              </div>
            </div>
          </div>
          <div className="flex gap-1 justify-center items-center">
            <span className="text-secondary-800 text-sm font-medium leading-[24px]">
              이미 회원이신가요?
            </span>
            <Link
              href="/login"
              className="text-primary underline text-sm font-medium leading-[24px]"
            >
              로그인
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
