"use client";
import { useCallback, useEffect, useState } from "react";
import {
  validateEmail,
  validateNickname,
  validatePassword,
  validateConfirmPassword,
} from "@/utils/validators";

const useLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isValid = isEmailValid && isPasswordValid;
    setIsFormValid(isValid);
  }, [isEmailValid, isPasswordValid, password]);

  const handleEmailChange = useCallback((value, isValid) => {
    setEmail(value);
    setIsEmailTouched(true);
    setIsEmailValid(isValid);
  }, []);

  const handlePasswordChange = useCallback((value, isValid) => {
    setPassword(value);
    setIsPasswordTouched(true);
    setIsPasswordValid(isValid);
  }, []);

  return {
    email,
    password,
    isFormValid,
    isEmailValid,
    isEmailTouched,
    isPasswordTouched,
    isPasswordValid,
    handleEmailChange,
    handlePasswordChange,
  };
};

export default useLoginForm;
