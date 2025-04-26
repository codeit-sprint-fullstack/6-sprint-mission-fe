"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { INPUT_OPTIONS } from "@/const";
import { useAuth } from "@/providers/AuthProvider";
import InputField from "./InputField";
import Modal from "@/components/ui/Modal";

function LoginForm() {
  const [isInputValid, setIsInputValid] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const router = useRouter();
  const { login } = useAuth();

  // 유효성 검사 함수
  const checkValidation = ({ email, password }) => {
    const pattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
    const newErrors = {};

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
  const handleChange = (e) => {
    const { name, value } = e.target;

    const newValues = { ...values, [name]: value };
    setValues(newValues);

    setErrors((prev) => ({ ...prev, [name]: "" }));

    const isValid =
      newValues.email.trim() !== "" && newValues.password.trim() !== "";
    setIsInputValid(isValid);
  };

  // 로그인 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    checkValidation(values);

    const result = await login(values.email, values.password);

    if (result?.success) {
      router.push("/items");
    } else {
      setModalMsg(result?.message);
      setIsModalOpen(true);
    }
  };

  return (
    <form className="flex flex-col w-full" onSubmit={handleSubmit}>
      {INPUT_OPTIONS.login.map((option) => (
        <InputField
          key={option.name}
          {...option}
          value={values[option.name]}
          onChange={handleChange}
          error={errors[option.name]}
        />
      ))}
      {isModalOpen && (
        <Modal message={modalMsg} handleClick={() => setIsModalOpen(false)} />
      )}
      <button
        type="submit"
        className="btn-base rounded-[40px] h-[56px] text-xl font-semibold"
        disabled={isInputValid === false}
      >
        로그인
      </button>
    </form>
  );
}

export default LoginForm;
