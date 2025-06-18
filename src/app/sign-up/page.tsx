"use client";

import React, { useEffect, useState } from "react";
import { isValidEmail, isValidPassword } from "../../../utils/isValid";
import { useRouter } from "next/navigation";
import CompactLogin from "@/components/ui/login-signup/CompactLogin";
import CrossSite from "@/components/ui/login-signup/CrossSite";
import InputField from "@/components/ui/login-signup/InputField";
import Button from "@/components/ui/login-signup/Button";
import Link from "next/link";
import { register } from "@/actions/auth";
import { useAuth } from "@/providers/AuthProvider";
import ValidModal from "@/components/ui/login-signup/validModal";

function SignupPage() {
  const [email, setEmail] = useState<string>("");
  const [nickName, setNickName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [ckPassword, setCkPassword] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false); //눈 모양 아이콘 토글(비밀번호)
  const [isCkVisible, setIsCkVisible] = useState<boolean>(false); //눈 모양 아이콘 토글(비밀번호 확인)
  const [validModal, setValidModal] = useState<boolean>(false);

  const [isEmailErr, setIsEmailErr] = useState<boolean>(true);
  const [isPwErr, setIsPwErr] = useState<boolean>(true);

  const [isFormsValid, setIsFormsValid] = useState<boolean>(false);

  const router = useRouter();

  const { register } = useAuth();

  const isPwMatched = password === ckPassword;
  useEffect(() => {
    const isEmailValid = isValidEmail(email);
    const isNicknameValid = nickName.trim().length > 0;
    const isPwValid = isValidPassword(password);

    setIsFormsValid(
      isEmailValid && isNicknameValid && isPwValid && isPwMatched
    );
  }, [email, nickName, password, ckPassword]);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await register(email, nickName, password, ckPassword);

      if (!result.accessToken) {
        alert("회원가입 실패");
        setIsFormsValid(false);
        return;
      }

      //로컬 스토리지에 token, nickname 저장
      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("UserId", result.user.id);

      router.push("/items");
    } catch (e) {
      console.error("회원가입 실패", e);
      setValidModal(true);
    }
  };

  const handleVisible = () => {
    setIsVisible((prev) => !prev);
  };
  const handleCkVisible = () => {
    setIsCkVisible((prev) => !prev);
  };

  const handleEmailBlur = () => {
    setIsEmailErr(isValidEmail(email));
  };

  const handlePasswordBlur = () => {
    setIsPwErr(isValidPassword(password));
  };
  const handleCkPasswordBlur = () => {
    password === ckPassword;
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              onBlur={handleEmailBlur}
            />
            {isEmailErr ? undefined : (
              <div className="text-[#f74747] font-semibold text-[15px] mt-2">
                잘못된 이메일 형식입니다.
              </div>
            )}

            <InputField
              label="닉네임"
              type="text"
              placeholder="닉네임을 입력해주세요"
              value={nickName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNickName(e.target.value)
              }
            />

            <div className="relative">
              <InputField
                label="비밀번호"
                type={isVisible ? "text" : "password"}
                placeholder="비밀번호를 입력해주세요"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                onBlur={handlePasswordBlur}
              />
              <img
                src={
                  isVisible
                    ? "/image/signup/btn_visibility_on_24px.png"
                    : "/image/signup/btn_visibility_off_24px.png"
                }
                alt="비밀번호 보기 아이콘"
                className="absolute left-[600px] top-[58px] w-6 h-6"
                onClick={handleVisible}
              />
              {isPwErr ? undefined : (
                <div className="text-[#f74747] font-semibold text-[15px] mt-2">
                  비밀번호를 4자 이상 입력해주세요
                </div>
              )}
            </div>

            <div className="relative">
              <InputField
                label="비밀번호 확인"
                type={isCkVisible ? "text" : "password"}
                placeholder="비밀번호를 다시 입력해주세요"
                value={ckPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCkPassword(e.target.value)
                }
                onBlur={handleCkPasswordBlur}
                isPwMatched={isPwMatched}
              />
              <img
                src={
                  isCkVisible
                    ? "/image/signup/btn_visibility_on_24px.png"
                    : "/image/signup/btn_visibility_off_24px.png"
                }
                alt="비밀번호 보기 아이콘"
                className="absolute left-[600px] top-[58px] w-6 h-6"
                onClick={handleCkVisible}
              />
              {isPwMatched ? undefined : (
                <div className="text-[#f74747] font-semibold text-[15px] mt-2">
                  비밀번호가 일치하지 않아요
                </div>
              )}
            </div>

            <Button text="회원가입" disabled={isFormsValid} />
          </form>

          <CompactLogin />

          <CrossSite
            text="이미 회원이신가요?"
            linkTo="/login"
            textClick="로그인"
          />
        </div>
      </div>
      {validModal && (
        <ValidModal
          text="사용중인 이메일입니다"
          onClose={() => setValidModal(false)}
        />
      )}
    </div>
  );
}

export default SignupPage;
