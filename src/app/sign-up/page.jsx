"use client";

import { useEffect, useState } from "react";
import { isValidEmail, isValidPassword } from "../../../utils/isValid";
import { useRouter } from "next/navigation";
import CompactLogin from "@/components/ui/login-signup/CompactLogin";
import CrossSite from "@/components/ui/login-signup/CrossSite";
import InputField from "@/components/ui/login-signup/InputField";
import Button from "@/components/ui/login-signup/Button";
import Link from "next/link";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [ckPassword, setCkPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isCkVisible, setIsCkVisible] = useState(false);

  const [isFormsValid, setIsFormsValid] = useState(false);

  const router = useRouter();

  //비밀번호 일치 여부
  const isPwMatched = password === ckPassword;

  useEffect(() => {
    const isEmailValid = isValidEmail(email);
    const isNicknameValid = nickName.trim().length > 0;
    const isPwValid = isValidPassword(password);

    setIsFormsValid(
      isEmailValid && isNicknameValid && isPwValid && isPwMatched
    );
  }, [email, nickName, password, ckPassword]);

  const handleSignup = async (e) => {
    e.preventDefault();

    // 디버깅
    console.log("email", email);
    console.log("nickName", nickName);
    console.log("password", password);
    console.log("ckPassword", ckPassword);

    try {
      const response = await fetch(
        "https://panda-market-api.vercel.app/auth/signUp",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            nickname: nickName,
            password: password,
            passwordConfirmation: ckPassword,
          }),
        }
      );

      if (!response.ok) {
        console.error(e);
        //선택 사항
        // setEmail("")
        // setNickName("")
        // setPassword("")
        // setCkPassword("")

        //모달로 구현
        return alert("회원가입 실패");
      }

      //디버깅
      console.log("회원가입 성공");

      router.push("/market");
    } catch (e) {
      //모달로 구현할 것
      alert("실패했습니다", e.message);
    }
  };

  const handleVisible = () => {
    setIsVisible((prev) => !prev);
  };
  const handleCkVisible = () => {
    setIsCkVisible((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col font-[Pretendard] justify-center">
      <div className="flex flex-col items-center justify-center">
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

        <div className="w-[640px] flex flex-col items-center">
          <form onSubmit={handleSignup} className="relative">
            <InputField
              label="이메일"
              type="email"
              placeholder="이메일을 입력해주세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <InputField
              label="닉네임"
              type="text"
              placeholder="닉네임을 입력해주세요"
              value={nickName}
              onChange={(e) => setNickName(e.target.value)}
            />

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
                  ? "/image/signup/btn_visibility_on_24px.png"
                  : "/image/signup/btn_visibility_off_24px.png"
              }
              alt="비밀번호 보기 아이콘"
              className="absolute left-[600px] top-[195px] w-6 h-6"
              onClick={handleVisible}
            />

            <InputField
              label="비밀번호 확인"
              type="password"
              placeholder="비밀번호를 다시 입력해주세요"
              value={ckPassword}
              onChange={(e) => setCkPassword(e.target.value)}
            />
            <img
              src={
                isCkVisible
                  ? "/image/signup/btn_visibility_on_24px.png"
                  : "/image/signup/btn_visibility_off_24px.png"
              }
              alt="비밀번호 보기 아이콘"
              className="absolute left-[600px] top-[315px] w-6 h-6"
              onClick={handleCkVisible}
            />

            <Button text="회원가입" />
          </form>

          <CompactLogin />

          <CrossSite
            text="이미 회원이신가요?"
            linkTo="/login"
            textClick="로그인"
          />
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
