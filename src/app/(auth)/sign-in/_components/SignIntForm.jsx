"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import OauthSection from "../../_components/OauthSection";
import AuthRedirectMessage from "../../_components/AuthRedirectMessage";
import Popup from "@/components/common/Popup";
import FormInput from "../../_components/FormInput";
import PasswordInput from "../../_components/PasswordInput";
import { useAuth } from "@/providers/AuthProvider";

export function SignInForm() {
  const { login } = useAuth();

  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [popup, setPopup] = useState({
    isOpen: false,
    message: "",
  });

  const isFormValid =
    form.email &&
    form.password &&
    form.password.length >= 8 &&
    /\S+@\S+\.\S+/.test(form.email);

  const validateEmail = () => {
    if (!form.email) {
      setErrors({ ...errors, email: "이메일을 입력해주세요" });
      return false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      setErrors({ ...errors, email: "이메일 형식이 올바르지 않습니다" });
      return false;
    } else {
      setErrors({ ...errors, email: "" });
      return true;
    }
  };

  const validatePassword = () => {
    if (!form.password) {
      setErrors({ ...errors, password: "비밀번호를 입력해주세요" });
      return false;
    } else if (form.password.length < 8) {
      setErrors({ ...errors, password: "비밀번호를 8자 이상 입력해주세요" });
      return false;
    } else {
      setErrors({ ...errors, password: "" });
      return true;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (!isEmailValid || !isPasswordValid) return;

    try {
      await login(form);
      router.push("/items");
    } catch (error) {
      console.log("error", error.message);
      displayPopup(error.message);
      if (error.message === "존재하지 않는 이메일입니다.") {
        setErrors({
          ...errors,
          email: "존재하지 않는 이메일입니다.",
        });
      } else if (error.message === "비밀번호가 일치하지 않습니다.") {
        setErrors({ ...errors, password: "비밀번호가 일치하지 않습니다." });
      }
    }
  };

  const displayPopup = (message) => {
    setPopup({ message, isOpen: true });
  };

  return (
    <>
      <form
        className="mb-5 flex w-full max-w-[400px] flex-col gap-5 md:max-w-none"
        onSubmit={handleLogin}
      >
        <FormInput
          label="이메일"
          type="email"
          placeholder="이메일을 입력해주세요"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          onBlur={validateEmail}
          error={errors.email}
          name="email"
        />

        <PasswordInput
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          onBlur={validatePassword}
          error={errors.password}
          showPassword={showPassword}
          toggleShowPassword={() => setShowPassword(!showPassword)}
        />

        <button
          type="submit"
          className={`h-[56px] rounded-[40px] text-[1.2rem] ${
            isFormValid
              ? "cursor-pointer bg-[#3692FF] text-[#f3f4f6]"
              : "cursor-not-allowed bg-[#9ca3af] text-[#f3f4f6]"
          } transition-colors duration-300`}
          disabled={!isFormValid}
        >
          로그인
        </button>
      </form>

      <OauthSection />

      {/* 회원가입 링크 */}
      <AuthRedirectMessage message="판다마켓이 처음이신가요?" link="/sign-up" />

      {/* 메시지 팝업 */}
      <Popup
        message={popup.message}
        isOpen={popup.isOpen}
        onClose={() => setPopup({ ...popup, isOpen: false })}
      />
    </>
  );
}
