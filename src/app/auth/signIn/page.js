"use client";

import { loginUser } from "@/app/lib/api/signIn";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSignIn = async () => {
    const result = await loginUser({ email, password });
    if (result.success) {
      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("nickName", result.user.nickName);
      localStorage.setItem("userId", result.user.id);
      console.log(result.user.nickName);

      alert("로그인 성공!");
      router.push("/products");
    } else {
      alert("로그인 실패: " + result.error);
    }
  };
  return (
    <div>
      <div className="flex justify-center pt-[231px] w-[640] h-[842]">
        <div>
          <div className="flex justify-center">
            <div className="flex items-center w-[396px] h-[132px] mb-[40px]">
              <Image
                src="/pandaImg.png"
                width={103.53}
                height={103.88}
                alt="panda"
                className="mr-[22.24px]"
              />
              <Link href={`/products`}>
                <p className="font-bold text-[66.34px] leading-[100%] tracking-[0%] align-middle text-[#3692FF] font-rokaf">
                  판다마켓
                </p>
              </Link>
            </div>
          </div>
          <div>
            <div className="w-[640px] h-[220px] mb-[24px]">
              <p className="mb-[16px] font-bold text-[18px] leading-[100%] tracking-[0%] text-[#1F2937] font-pretendard">
                이메일
              </p>
              <input
                type="text"
                placeholder="이메일을 입력해주세요"
                className="mb-[24px] w-[640px] h-[56px] rounded-[12px] px-6 py-4 bg-[#F3F4F6] text-base focus:outline-none placeholder:font-normal placeholder:text-[16px] placeholder:leading-[26px] placeholder:text-[#9CA3AF] placeholder:font-pretendard"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />

              <p className="mb-[16px] font-bold text-[18px] leading-[100%] tracking-[0%] text-[#1F2937] font-pretendard">
                비밀번호
              </p>

              <div className="relative mb-[24px] w-[640px] h-[56px]">
                <input
                  type="password"
                  placeholder="비밀번호를 입력해주세요"
                  className="w-full h-full rounded-[12px] px-6 pr-12 py-4 bg-[#F3F4F6] text-base focus:outline-none
               placeholder:font-normal placeholder:text-[16px] placeholder:leading-[26px] 
               placeholder:text-[#9CA3AF] placeholder:font-pretendard"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <Image
                  src="/eyeIcon.png"
                  width={24}
                  height={24}
                  alt="눈이모지"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                />
              </div>
            </div>

            <button
              onClick={handleSignIn}
              className="hover:bg-blue-500 cursor-pointer w-[640px] h-[56px] rounded-[40px] px-[124px] py-4 bg-[#9CA3AF] mb-[24px] text-white text-[20px] leading-[24px] font-semibold text-center font-pretendard"
            >
              로그인
            </button>

            <div className="mb-[24px] w-[640px] h-[74px] rounded-[8px] px-[23px] py-4 bg-[#E6F2FF]">
              <div className="flex justify-between items-center w-[594px] h-[42px]">
                <p className="font-medium text-[16px] leading-[26px] tracking-[0%] text-[#1F2937] font-pretendard">
                  간편 로그인하기
                </p>
                <div className="flex gap-4">
                  <Image
                    width={42}
                    height={42}
                    src="/googleIcon.png"
                    className="cursor-pointer"
                    alt="구글이모지"
                  />
                  <Image
                    width={42}
                    height={42}
                    src="/kakaoIcon.png"
                    className="cursor-pointer"
                    alt="카카오이모지"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center ">
              <div className="flex items-center gap-1">
                <p className="font-medium text-[14px] leading-[24px] tracking-[0%] text-[#1F2937] font-pretendard">
                  판다마켓이 처음이신가요?
                </p>
                <Link
                  href="/auth/signUp"
                  className="font-medium text-[15px] leading-[100%] tracking-[0%] text-[#3182F6] underline decoration-solid decoration-0"
                >
                  회원가입
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
