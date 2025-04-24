"use client";
import FormInput from "@/components/ui/FormInput";
import PasswordInput from "@/components/ui/PasswordInput";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import useRegistrationForm from "@/hooks/useRegistrationForm";

export default function RegistrationForm() {
  const {
    email,
    nickname,
    password,
    passwordConfirm,
    isFormValid,
    isEmailValid,
    isNicknameValid,
    isPasswordValid,
    isPasswordConfirmValid,
    handleEmailChange,
    handleNicknameChange,
    handlePasswordChange,
    handlePasswordConfirmChange,
  } = useRegistrationForm();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFormValid) {
      console.log("Form submitted", {
        email,
        nickname,
        password,
        passwordConfirm,
      });
    }
  };

  return (
    <form
      className="flex flex-col items-center justify-center w-full h-full gap-6"
      onSubmit={handleSubmit}
    >
      <FormInput
        id="email"
        label="이메일"
        placeholder="이메일을 입력해주세요"
        value={email}
        onChange={handleEmailChange}
        isValid={isEmailValid}
        required
      />
      <FormInput
        id="nickname"
        label="닉네임"
        placeholder="닉네임을 입력해주세요"
        value={nickname}
        onChange={handleNicknameChange}
        isValid={isNicknameValid}
        required
      />
      <PasswordInput
        id="password"
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요"
        value={password}
        onChange={handlePasswordChange}
        isValid={isPasswordValid}
        required
      />
      <PasswordInput
        id="password-confirm"
        label="비밀번호 확인"
        placeholder="비밀번호를 다시 한 번 입력해주세요"
        value={passwordConfirm}
        onChange={handlePasswordConfirmChange}
        isValid={isPasswordConfirmValid}
        required
      />
      <button
        className="w-full h-14 rounded-[40px] bg-secondary-400 text-white text-xl font-semibold leading-[32px]"
        disabled={!isFormValid}
        type="submit"
      >
        회원가입
      </button>
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
  );
}
