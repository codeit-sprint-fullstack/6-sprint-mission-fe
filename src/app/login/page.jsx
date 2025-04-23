"use client";

import Link from "next/link";
import { useState } from "react";
import { isValidEmail, isValidPassword } from "../../../utils/isValid";

export default function LoginPage() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const handleEmailBlur = () => {
    setIsEmailValid(isValidEmail(email));
  };

  const handlePasswordBlur = () => {
    setIsPasswordValid(isValidPassword(password));
  };

  const handleLogin = () => {
    console.log("로그인 성공");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <main className="flex flex-col items-center justify-between w-full max-w-[640px]">
        <div className="flex flex-row items-center justify-center w-[396px] h-[132px] mb-10">
          <img
            className="w-[103.53px] h-[103.88px] mr-[22.24px] pt-[12.98px] pb-[15.14px]"
            // src="/login/판다 얼굴.png"
            alt="판다 얼굴"
          />
          <span className="text-[66.34px] font-bold font-[ROKAF Sans] leading-[89.56px] text-[#3692ff] w-[266px] h-[90px] flex items-center justify-center pt-[23.98px] pb-[23.98px]">
            <img
              // src="/login/판다마켓.png"
              alt="판다마켓"
            />
          </span>
        </div>

        <div className="w-full flex flex-col items-center">
          <div className="flex flex-col w-full">
            <form className="mb-5" onSubmit={handleLogin}>
              <label
                htmlFor="input-email"
                className="block text-[18px] font-bold text-[#1f2937] mb-2"
              >
                이메일
              </label>
              <input
                id="input-email"
                type="email"
                placeholder="이메일을 입력해주세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleEmailBlur}
                className="w-full h-[56px] rounded-lg bg-gray-100 px-4 text-[16px] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3692ff]"
              />
              {isEmailValid && (
                <div className="text-[#f74747] font-semibold text-[15px] mt-2">
                  잘못된 이메일 형식입니다.
                </div>
              )}

              <label
                htmlFor="input-password"
                className="relative block text-[18px] font-bold text-[#1f2937] mb-2"
              >
                비밀번호
              </label>
              <input
                id="input-password"
                type="password"
                placeholder="비밀번호를 입력해주세요"
                value={password || ""}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={handlePasswordBlur}
                className="w-full h-[56px] rounded-lg bg-gray-100 px-4 text-[16px] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3692ff]"
              />
              <img
                // src="/login/btn_visibility_off_24px.png"
                alt="비밀번호 보기 아이콘"
                className="absolute top-[58px] left-[610px] w-6 h-6"
              />
              {!isPasswordValid && (
                <div className="text-[#f74747] font-semibold text-[15px] mt-2">
                  비밀번호를 8자 이상 입력해주세요
                </div>
              )}

              <button className="w-full h-[56px] rounded-full bg-gray-400 text-white font-semibold text-[20px]">
                로그인
              </button>
            </form>

            <div className="w-full h-[74px] bg-[#e6f2ff] mt-6 flex justify-center items-center">
              <div className="flex items-center justify-between w-[594px] h-[42px] px-[23px]">
                <div className="text-[16px] font-medium">간편 로그인하기</div>
                <div className="flex gap-2">
                  <a href="https://www.google.com/">
                    <img
                      width="42"
                      height="42"
                      // src="/login/Component 2@3x.png"
                      alt="google"
                    />
                  </a>
                  <a href="https://www.kakaocorp.com/page/">
                    <img
                      width="42"
                      height="42"
                      // src="/login/Component 3@3x.png"
                      alt="kakao"
                    />
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-row justify-between items-center mt-6 text-sm mx-auto">
              <span>판다마켓이 처음이신가요?</span>
              <Link className="text-[#3692FF]" href="/sign-up">
                회원가입
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
