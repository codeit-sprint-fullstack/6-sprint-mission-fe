"use client";

import { useState } from "react";
import TitleSection from "../ui/TitleSection";
import InputBox from "../ui/InputBox";
import SocialLogin from "@/app/(auth)/_components/SocialLogin";
import useFormInput from "@/hooks/useFormInput";
import Link from "next/link";

// 이메일 유효성 검사
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// 닉네임 유효성 검사 (2~10자, 한글/영문/숫자만)
function isValidNickname(nickname) {
  return /^[a-zA-Z0-9가-힣]{2,10}$/.test(nickname);
}

// 비밀번호 유효성 검사 (8~20자, 영문+숫자+특수문자 포함)
function isValidPassword(password) {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,20}$/.test(password);
}

// 비밀번호 확인 검사
function isPasswordMatch(password, confirmPassword) {
  return password === confirmPassword;
}

export default function RegisterPage() {
  const emailInput = useFormInput("", isValidEmail, "잘못된 이메일입니다.");
  const nickNameInput = useFormInput(
    "",
    isValidNickname,
    "닉네임을 확인해주세요.(2~10자, 한글/영문/숫자만)"
  );
  const passwordInput = useFormInput(
    "",
    isValidPassword,
    "잘못된 비밀번호입니다.(8~20자, 영문+숫자+특수 포함)"
  );
  const confirmPasswordInput = useFormInput(
    "",
    isPasswordMatch,
    "비밀번호를 확인해주세요.",
    passwordInput.value
  );

  const isActiveSubmitButton =
    emailInput.value !== "" &&
    nickNameInput.value !== "" &&
    passwordInput.value !== "" &&
    confirmPasswordInput.value !== "" &&
    !emailInput.error &&
    !nickNameInput.error &&
    !passwordInput.error &&
    !confirmPasswordInput.error;

  return (
    <div>
      <section>
        <form>
          <TitleSection titleText={"이메일"} />
          <div>
            <InputBox
              placeHolderText={"이메일을 입력해주세요"}
              inputValueState={emailInput.value}
              setInputValueState={emailInput.onChange}
              onBlur={emailInput.onBlur}
              error={emailInput.error}
              inputClassName="h-14"
            />
          </div>
          <TitleSection titleText={"닉네임"} />
          <div>
            <InputBox
              placeHolderText={"닉네임을 입력해주세요"}
              inputValueState={nickNameInput.value}
              setInputValueState={nickNameInput.onChange}
              onBlur={nickNameInput.onBlur}
              error={nickNameInput.error}
              inputClassName="h-14"
            />
          </div>
          <TitleSection titleText={"비밀번호"} />
          <div>
            <InputBox
              placeHolderText={"비밀번호를 입력해주세요"}
              inputValueState={passwordInput.value}
              setInputValueState={passwordInput.onChange}
              inputType={"password"}
              onBlur={passwordInput.onBlur}
              error={passwordInput.error}
              inputClassName="h-14"
            />
          </div>
          <TitleSection titleText={"비밀번호 확인"} />
          <div>
            <InputBox
              placeHolderText={"비밀번호를 다시 한 번 입력해주세요"}
              inputValueState={confirmPasswordInput.value}
              setInputValueState={confirmPasswordInput.onChange}
              inputType={"password"}
              onBlur={confirmPasswordInput.onBlur}
              error={confirmPasswordInput.error}
              inputClassName="h-14"
            />
          </div>
          <div className="my-6">
            <button
              className={`btn-lg ${
                isActiveSubmitButton ? "bg-primary-100" : "bg-gray-400"
              }`}
            >
              회원가입
            </button>
          </div>
        </form>
      </section>
      <section>
        <SocialLogin />
      </section>
      <section className="flex gap-2 justify-center p-4 text-sm">
        <span>이미 회원이신가요?</span>
        <Link
          href={"/login"}
          className="text-brand-blue  underline cursor-pointer"
        >
          로그인
        </Link>
      </section>
    </div>
  );
}
