"use client";
import { useCallback, useEffect, useState } from "react";

const useLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isValid = isEmailValid && isPasswordValid;
    setIsFormValid(isValid);
  }, [isEmailValid, isPasswordValid, password]);

  const handleEmailChange = useCallback((value, isValid) => {
    setEmail(value);
    setIsEmailValid(isValid);
  }, []);

  const handlePasswordChange = useCallback((value, isValid) => {
    setPassword(value);
    setIsPasswordValid(isValid);
  }, []);

  return {
    email,
    password,
    isFormValid,
    isEmailValid,
    isPasswordValid,
    handleEmailChange,
    handlePasswordChange,
  };
};

export default useLoginForm;
