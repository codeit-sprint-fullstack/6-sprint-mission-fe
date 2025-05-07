"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { INPUT_OPTIONS } from "@/const";
import InputField from "./InputField";
import Modal from "@/components/ui/Modal";
import { useAuth } from "@/providers/AuthProvider";
import AuthFooter from "./AuthFooter";

function SignupForm() {
  const [isInputValid, setIsInputValid] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [values, setValues] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirmation: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirmation: "",
  });

  const router = useRouter();
  const { signup } = useAuth();

  // 유효성 검사 함수
  const checkValidation = ({ email, password, passwordConfirmation }) => {
    const pattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
    const newErrors = {};

    if (!pattern.test(email)) {
      newErrors.email = "잘못된 이메일 형식입니다.";
    }

    if (password && password.length < 8) {
      newErrors.password = "비밀번호를 8자 이상 입력해주세요.";
    }

    if (passwordConfirmation && password !== passwordConfirmation) {
      newErrors.passwordConfirmation = "비밀번호가 일치하지 않습니다.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 입력 필드 값 변경 시 실행되는 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;

    const newValues = { ...values, [name]: value };
    setValues(newValues);
    setErrors((prev) => ({ ...prev, [name]: "" }));

    const isValid =
      newValues.email.trim() !== "" &&
      newValues.nickname.trim() !== "" &&
      newValues.password.trim() !== "" &&
      newValues.passwordConfirmation.trim() !== "";
    setIsInputValid(isValid);
  };

  // 회원가입 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    checkValidation(values);

    const result = await signup(
      values.email,
      values.nickname,
      values.password,
      values.passwordConfirmation
    );

    setIsSignupSuccess(result.success);
    setModalMsg(result.message);
    setIsModalOpen(true);
  };

  // 모달 버튼 핸들러
  const handleClick = async () => {
    if (isSignupSuccess) {
      router.push("/login");
    } else {
      setIsModalOpen(false);
    }
  };

  return (
    <form
      className="flex flex-col w-full lg:max-w-[640px]"
      onSubmit={handleSubmit}
    >
      {INPUT_OPTIONS.signup.map((option) => (
        <InputField
          key={option.name}
          {...option}
          value={values[option.name]}
          onChange={handleChange}
          error={errors[option.name]}
        />
      ))}
      {isModalOpen && <Modal message={modalMsg} handleClick={handleClick} />}
      <button
        type="submit"
        className="btn-base rounded-[40px] h-[56px] text-xl font-semibold"
        disabled={!isInputValid}
      >
        회원가입
      </button>
      <AuthFooter />
    </form>
  );
}

export default SignupForm;
