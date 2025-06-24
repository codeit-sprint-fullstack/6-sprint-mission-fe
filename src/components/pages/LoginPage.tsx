"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import InputBox from "../ui/InputBox";
import TitleSection from "../ui/TitleSection";
import useInputForm from "@/hooks/useInputForm";
import SocialLogin from "@/components/auth/SocialLogin";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { authService } from "@/lib/services/api/authService";


// 이메일 유효성 검사
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// 비밀번호 유효성 검사 (8~20자, 영문+숫자+특수문자 포함)
function isValidPassword(password: string): boolean {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,20}$/.test(password);
}

export default function LoginPage() {
  const router = useRouter();
  const emailInput = useInputForm("", isValidEmail, "잘못된 이메일입니다.");
  const passwordInput = useInputForm(
    "",
    isValidPassword,
    "잘못된 비밀번호입니다.(8~20자, 영문+숫자+특수 포함)"
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");

  const { mutate: mutateLogin, isPending } = useMutation({
    mutationFn: authService.login,
    onSuccess: () => {
      router.push("/items");
    },
    onError: (error: any) => {
      let errorMessage = "로그인에 실패했습니다.";
      try {
        const errorObject = JSON.parse(error.message);
        errorMessage = errorObject?.message || errorMessage;
      } catch (parseError) {
        console.error(
          "Error parsing error message:",
          parseError,
          error.message
        );
        errorMessage = error.message;
      }
      setModalMessage(errorMessage);
      setIsModalOpen(true);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutateLogin({
      email: emailInput.value,
      password: passwordInput.value,
    });
  };

  if (isPending) {
    return <div>로그인중..</div>;
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage("");
  };

  const isActiveSubmitButton =
    emailInput.value !== "" &&
    passwordInput.value !== "" &&
    !emailInput.error &&
    !passwordInput.error;

  return (
    <div>
      <section>
        <form onSubmit={handleSubmit}>
          <TitleSection titleText={"이메일"} />
          <div>
            <InputBox
              placeHolderText={"이메일을 입력해주세요"}
              inputValueState={emailInput.value}
              onChangeInput={emailInput.onChange}
              onBlur={emailInput.onBlur}
              error={emailInput.error}
              isValid={emailInput.isValid}
              inputClassName="h-14"
            />
          </div>
          <TitleSection titleText={"비밀번호"} />
          <div>
            <InputBox
              placeHolderText={"비밀번호를 입력해주세요"}
              inputValueState={passwordInput.value}
              onChangeInput={passwordInput.onChange}
              inputType={"password"}
              onBlur={passwordInput.onBlur}
              error={passwordInput.error}
              isValid={passwordInput.isValid}
              inputClassName="h-14"
            />
          </div>
          <div className="py-4 container">
            <button
              className={`btn-lg ${
                isActiveSubmitButton ? "bg-primary-100" : "bg-gray-400"
              }`}
              type="submit"
            >
              로그인
            </button>
          </div>
        </form>
      </section>
      <section>
        <SocialLogin />
      </section>
      <section className="flex gap-2 justify-center p-4 text-sm">
        <span>판다마켓이 처음이신가요?</span>
        <Link
          href={"/register"}
          className="text-brand-blue  underline cursor-pointer"
        >
          회원가입
        </Link>
      </section>
      <section>
        {isModalOpen && (
          <ConfirmModal
            modalTheme={"blue"}
            confirmType={"alert"}
            confirmText={modalMessage}
            handleOnCloseModal={closeModal}
            handleOnClick={closeModal}
          />
        )}
      </section>
    </div>
  );
}
