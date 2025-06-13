"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { INPUT_OPTIONS } from "@/constant";
import { useAuth } from "@/providers/AuthProvider";
import InputField from "./InputField";
import Modal from "@/components/ui/Modal";
import AuthFooter from "./AuthFooter";
import { User } from "@/types";

function LoginForm() {
  const [isInputValid, setIsInputValid] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [values, setValues] = useState<Record<string, string>>({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({ email: "", password: "" });

  const router = useRouter();
  const { login } = useAuth();

  // 유효성 검사 함수
  const checkValidation = (email: User["email"], password: User["password"]) => {
    const pattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
    const newErrors = { email, password };

    if (!pattern.test(email)) {
      newErrors.email = "잘못된 이메일 형식입니다.";
    }

    if (password && password.length < 8) {
      newErrors.password = "비밀번호를 8자 이상 입력해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 입력 필드 값 변경 시 실행되는 핸들러
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));

    setIsInputValid(
      value.trim() !== "" &&
        (name === "email" ? values.password.trim() !== "" : values.email.trim() !== "")
    );
  };

  // 로그인 폼 제출 핸들러
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    checkValidation(values.email, values.password);

    const result = await login(values.email, values.password);

    if (result?.success) {
      router.push("/items");
    } else {
      setModalMsg(result?.message);
      setIsModalOpen(true);
    }
  };

  return (
    <form className="flex w-full flex-col lg:max-w-[640px]" onSubmit={handleSubmit}>
      {INPUT_OPTIONS.login.map((option) => (
        <InputField
          key={option.name}
          {...option}
          value={values[option.name]}
          onChange={handleInputChange}
          error={errors[option.name]}
        />
      ))}
      {isModalOpen && <Modal message={modalMsg} handleClick={() => setIsModalOpen(false)} />}
      <button
        type="submit"
        className="btn-base h-[56px] rounded-[40px] text-xl font-semibold"
        disabled={isInputValid === false}
      >
        로그인
      </button>
      <AuthFooter />
    </form>
  );
}

export default LoginForm;
