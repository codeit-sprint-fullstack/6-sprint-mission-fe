"use client";

import { TSign, TUser } from "@/types";
import React, { useEffect, useState } from "react";

interface useValidationProps {
  isSignup: boolean;
}

function useValidation({ isSignup }: useValidationProps) {
  const [formData, setFormData] = useState<TSign>(
    isSignup
      ? {
          email: "",
          nickname: "",
          password: "",
          passwordConfirmation: "",
        }
      : {
          email: "",
          password: "",
        }
  );
  const [errors, setErrors] = useState<TSign>(
    isSignup
      ? {
          email: "",
          nickname: "",
          password: "",
          passwordConfirmation: "",
        }
      : {
          email: "",
          password: "",
        }
  );
  const [isValid, setIsValid] = useState<boolean>(false);

  const validEmail = (email: TUser["email"]) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    let message = "";
    if (name === "email") {
      if (value.trim() === "") {
        message = "이메일을 입력해주세요.";
      } else if (!validEmail(value)) {
        message = "잘못된 이메일 형식입니다.";
      }
    } else if (name === "nickname") {
      if (value.trim() === "") {
        message = "닉네임을 입력해주세요.";
      }
    } else if (name === "password") {
      if (value.trim() === "") {
        message = "비밀번호를 입력해주세요.";
      } else if (value.length < 8) {
        message = "비밀번호를 8자 이상 입력해주세요.";
      }
    } else if (name === "passwordConfirmation") {
      if (value.trim() === "") {
        message = "비밀번호를 다시 한번 입력해주세요.";
      } else if (value !== formData.password) {
        message = "비밀번호가 일치하지 않습니다.";
      }
    }
    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  useEffect(() => {
    const isFormValid =
      Object.values(errors).every((msg) => msg === "") &&
      Object.values(formData).every((data) => data.trim() !== "");

    setIsValid(isFormValid);
  }, [formData, errors]);

  return { formData, errors, isValid, handleChange };
}

export default useValidation;
