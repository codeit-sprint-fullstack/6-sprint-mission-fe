"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import TitleSection from "../ui/TitleSection";
import InputBox from "../ui/InputBox";
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

// 닉네임 유효성 검사 (2~10자, 한글/영문/숫자만)
function isValidNickname(nickname: string): boolean {
  return /^[a-zA-Z0-9\uac00-\ud7a3]{2,10}$/.test(nickname);
}

// 비밀번호 유효성 검사 (8~20자, 영문+숫자+특수문자 포함)
function isValidPassword(password: string): boolean {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,20}$/.test(password);
}

// 비밀번호 확인 검사
function isPasswordMatch(password: string, confirmPassword: string): boolean {
  return password === confirmPassword;
}

export default function RegisterPage() {
  const router = useRouter();
  const emailInput = useInputForm("", isValidEmail, "잘못된 이메일입니다.");
  const nickNameInput = useInputForm(
    "",
    isValidNickname,
    "닉네임을 확인해주세요.(2~10자, 한글/영문/숫자만)"
  );
  const passwordInput = useInputForm(
    "",
    isValidPassword,
    "잘못된 비밀번호입니다.(8~20자, 영문+숫자+특수 포함)"
  );
  const confirmPasswordInput = useInputForm(
    "",
    isPasswordMatch,
    "비밀번호를 확인해주세요.",
    passwordInput.value
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage("");
  };

  const { mutate: mutateRegister, isPending } = useMutation({
    mutationFn: authService.register,
    onSuccess: () => {
      router.push("/items");
    },
    onError: (error: any) => {
      let errorMessage = "회원가입에 실패했습니다.";
      errorMessage = error.message;
      if (error instanceof Error) {
        try {
          errorMessage = JSON.parse(errorMessage).message;
        } catch {
          errorMessage = error.message;
        }
      } else {
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
      }
      setModalMessage(errorMessage);
      setIsModalOpen(true);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutateRegister({
      email: emailInput.value,
      nickname: nickNameInput.value,
      password: passwordInput.value,
      passwordConfirmation: confirmPasswordInput.value,
    });
  };

  if (isPending) {
    return <div>회원가입중..</div>;
  }

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
          <TitleSection titleText={"닉네임"} />
          <div>
            <InputBox
              placeHolderText={"닉네임을 입력해주세요"}
              inputValueState={nickNameInput.value}
              onChangeInput={nickNameInput.onChange}
              onBlur={nickNameInput.onBlur}
              error={nickNameInput.error}
              isValid={nickNameInput.isValid}
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
          <TitleSection titleText={"비밀번호 확인"} />
          <div>
            <InputBox
              placeHolderText={"비밀번호를 다시 한 번 입력해주세요"}
              inputValueState={confirmPasswordInput.value}
              onChangeInput={confirmPasswordInput.onChange}
              inputType={"password"}
              onBlur={confirmPasswordInput.onBlur}
              error={confirmPasswordInput.error}
              isValid={confirmPasswordInput.isValid}
              inputClassName="h-14"
            />
          </div>
          <div className="my-6">
            <button
              type="submit"
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
