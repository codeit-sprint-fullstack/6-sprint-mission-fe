"use client";

import React, { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import InputField from "./InputField";

function LoginForm() {
  const inputOptions = [
    {
      label: "이메일",
      name: "email",
      type: "email",
      placeholder: "이메일을 입력해주세요",
    },
    {
      label: "비밀번호",
      name: "password",
      type: "password",
      placeholder: "비밀번호를 입력해주세요",
    },
  ];
  const [values, setValues] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const router = useRouter();

  // 유효성 검사 함수
  const checkValidation = ({ email, password }) => {
    const pattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
    const newErrors = {};

    if (!email) {
      newErrors.email = "이메일을 입력해주세요.";
    } else if (!pattern.test(email)) {
      newErrors.email = "잘못된 이메일 형식입니다.";
    }

    if (!password) {
      newErrors.password = "비밀번호를 입력해주세요.";
    } else if (password.length < 8) {
      newErrors.password = "비밀번호를 8자 이상 입력해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 입력 필드 값 변경 시 실행되는 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // 폼 제출 시 실행되는 핸들러
  async function handleSubmit(e) {
    e.preventDefault();

    checkValidation(values);

    try {
      setLoading(true);

      await login(values.email, values.password);

      alert("로그인에 성공했습니다.");
      router.push("/items");
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div>로딩 중...</div>;

  return (
    <form className="flex flex-col w-full" onSubmit={handleSubmit}>
      {inputOptions.map((option) => (
        <InputField
          key={option.name}
          {...option}
          value={values[option.name]}
          onChange={handleChange}
          error={errors[option.name]}
        />
      ))}
      <button
        type="submit"
        className="btn-base rounded-[40px] h-[56px] text-xl font-semibold"
      >
        로그인
      </button>
    </form>
  );
}

export default LoginForm;
