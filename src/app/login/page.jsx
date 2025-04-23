"use client";

import Link from "next/link";
import { useState } from "react";
import { isValidEmail, isValidPassword } from "../../../utils/isValid";
import { useRouter } from "next/navigation";
import InputField from "@/components/ui/login-signup/InputField";
import Button from "@/components/ui/login-signup/Button";
import CompactLogin from "@/components/ui/login-signup/CompactLogin";
import CrossSite from "@/components/ui/login-signup/CrossSite";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const router = useRouter();

  const handleEmailBlur = () => {
    setIsEmailValid(isValidEmail(email));
  };

  const handlePasswordBlur = () => {
    setIsPasswordValid(isValidPassword(password));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://panda-market-api.vercel.app/auth/signIn",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      if (!response.ok) {
        setIsEmailValid(false);
        setIsPasswordValid(false);

        return;
      }

      console.log("로그인 성공");

      router.push("/market");
      return response.json();
    } catch (e) {
      alert("실패했습니다.");
    }
  };

  const handleVisible = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center">
      <main className="flex flex-col items-center">
        <Link
          href="/"
          className="flex flex-row items-center justify-center w-[396px] mb-10"
        >
          <img
            className="w-[103.53px] h-[103.88px] mr-[22.24px] mt-[12.98px] mb-[15.14px]"
            src="/image/login/판다 얼굴.png"
            alt="판다 얼굴"
          />
          <img
            src="/image/login/판다마켓.png"
            className="w-[266px] h-[90px]"
            alt="판다마켓"
          />
        </Link>

        <div className="w-full flex flex-col items-center">
          <div className="flex flex-col items-center">
            <form className=" relative mb-5" onSubmit={handleLogin}>
              <InputField
                label="이메일"
                type="email"
                placeholder="이메일을 입력해주세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {isEmailValid ? undefined : (
                <div className="text-[#f74747] font-semibold text-[15px] mt-2">
                  이메일을 확인해주세요
                </div>
              )}

              <InputField
                label="비밀번호"
                type="password"
                placeholder="비밀번호를 입력해주세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <img
                src={
                  isVisible
                    ? "/image/login/btn_visibility_on_24px.png"
                    : "/image/login/btn_visibility_off_24px.png"
                }
                alt="비밀번호 보기 아이콘"
                className="absolute left-[600px] top-[195px] w-6 h-6"
                onClick={handleVisible}
              />
              {!isPasswordValid && (
                <div className="text-[#f74747] font-semibold text-[15px] mt-2">
                  비밀번호를 확인해주세요.
                </div>
              )}

              <Button text="로그인" />
            </form>

            <CompactLogin />

            <CrossSite
              text="판다마켓은 처음이신가요?"
              linkTo="/sign-up"
              textClick="회원가입"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
