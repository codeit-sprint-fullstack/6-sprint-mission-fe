"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SubmitButton from "../../_components/SubmitButton";
import Popup from "@/components/common/Popup";
import OauthSection from "../../_components/OauthSection";
import AuthRedirectMessage from "../../_components/AuthRedirectMessage";
import FormInput from "../../_components/FormInput";
import PasswordInput from "../../_components/PasswordInput";
import { useAuth } from "@/providers/AuthProvider";

export default function SignUpForm() {
  const router = useRouter();

  const { register } = useAuth();

  // 폼 상태 관리
  const [form, setForm] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirmation: "",
  });

  // 에러 상태 관리
  const [errors, setErrors] = useState({
    email: "",
    nickname: "",
    password: "",
    confirmPassword: "",
  });

  // 비밀번호 표시 상태 관리
  const [visibility, setVisibility] = useState({
    password: false,
    passwordConfirmation: false,
  });

  // 팝업 상태 관리
  const [popup, setPopup] = useState({
    isOpen: false,
    message: "",
  });

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 유효성 검사 함수들
  const validateEmail = () => {
    if (!form.email) {
      setErrors((prev) => ({ ...prev, email: "이메일을 입력해주세요" }));
      return false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      setErrors((prev) => ({
        ...prev,
        email: "이메일 형식이 올바르지 않습니다",
      }));
      return false;
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
      return true;
    }
  };

  const validatePassword = () => {
    if (!form.password) {
      setErrors((prev) => ({ ...prev, password: "비밀번호를 입력해주세요" }));
      return false;
    } else if (form.password.length < 8) {
      setErrors((prev) => ({
        ...prev,
        password: "비밀번호를 8자 입력해주세요",
      }));
      return false;
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
      return true;
    }
  };

  const validatePasswordConfirm = () => {
    if (!form.passwordConfirmation) {
      setErrors((prev) => ({
        ...prev,
        passwordConfirmation: "비밀번호를 다시 입력해주세요",
      }));
      return false;
    } else if (form.password !== form.passwordConfirmation) {
      setErrors((prev) => ({
        ...prev,
        passwordConfirmation: "비밀번호가 일치하지 않습니다",
      }));
      return false;
    } else {
      setErrors((prev) => ({ ...prev, passwordConfirmation: "" }));
      return true;
    }
  };

  const validateNickname = () => {
    if (!form.nickname) {
      setErrors((prev) => ({ ...prev, nickname: "닉네임을 입력해주세요" }));
      return false;
    } else {
      setErrors((prev) => ({ ...prev, nickname: "" }));
      return true;
    }
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isPasswordConfirmValid = validatePasswordConfirm();
    const isNicknameValid = validateNickname();

    if (
      !isEmailValid ||
      !isPasswordValid ||
      !isPasswordConfirmValid ||
      !isNicknameValid
    )
      return;

    try {
      register(
        form.email,
        form.nickname,
        form.password,
        form.passwordConfirmation,
      );

      router.push("/sign-in");
    } catch (error) {
      displayPopup(error.message);
    }
  };

  // 팝업 표시 함수
  const displayPopup = (message) => {
    setPopup({
      isOpen: true,
      message,
    });
  };

  // 비밀번호 표시 토글 함수
  const togglePasswordVisibility = (field) => {
    setVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // 폼 유효성 검사
  const isFormValid =
    form.email &&
    form.password &&
    form.passwordConfirmation &&
    form.nickname &&
    form.password.length >= 8 &&
    form.password === form.passwordConfirmation &&
    /\S+@\S+\.\S+/.test(form.email);

  return (
    <>
      <form
        className="flex w-full max-w-[400px] flex-col gap-5 md:max-w-none"
        onSubmit={handleSubmit}
      >
        <FormInput
          label="이메일"
          type="email"
          placeholder="이메일을 입력해주세요"
          value={form.email}
          onChange={handleChange}
          onBlur={validateEmail}
          error={errors.email}
          name="email"
        />

        <FormInput
          label="닉네임"
          type="text"
          placeholder="닉네임을 입력해주세요"
          value={form.nickname}
          onChange={handleChange}
          onBlur={validateNickname}
          error={errors.nickname}
          name="nickname"
        />

        <PasswordInput
          label="비밀번호"
          value={form.password}
          onChange={handleChange}
          onBlur={validatePassword}
          error={errors.password}
          showPassword={visibility.password}
          toggleShowPassword={() => togglePasswordVisibility("password")}
          name="password"
        />

        <PasswordInput
          label="비밀번호 확인"
          placeholder="비밀번호를 다시 입력해주세요"
          value={form.passwordConfirmation}
          onChange={handleChange}
          onBlur={validatePasswordConfirm}
          error={errors.passwordConfirmation}
          showPassword={visibility.confirmPassword}
          toggleShowPassword={() => togglePasswordVisibility("confirmPassword")}
          name="passwordConfirmation"
        />

        <SubmitButton isFormValid={isFormValid} />

        <OauthSection />

        <AuthRedirectMessage message="이미 회원이신가요?" link="/sign-in" />
      </form>

      <Popup
        message={popup.message}
        isOpen={popup.isOpen}
        onClose={() => setPopup({ ...popup, isOpen: false })}
      />
    </>
  );
}
