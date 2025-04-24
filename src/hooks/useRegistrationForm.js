"use client";
import { useCallback, useEffect, useState } from "react";

const useRegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordConfirmValid, setIsPasswordConfirmValid] = useState(false);

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isValid =
      isEmailValid &&
      isNicknameValid &&
      isPasswordValid &&
      isPasswordConfirmValid &&
      password === passwordConfirm;

    setIsFormValid(isValid);
  }, [
    isEmailValid,
    isNicknameValid,
    isPasswordValid,
    isPasswordConfirmValid,
    password,
    passwordConfirm,
  ]);

  const handleEmailChange = useCallback((value, isValid) => {
    setEmail(value);
    setIsEmailValid(isValid);
  }, []);

  const handleNicknameChange = useCallback((value, isValid) => {
    setNickname(value);
    setIsNicknameValid(isValid);
  }, []);

  const handlePasswordChange = useCallback((value, isValid) => {
    setPassword(value);
    setIsPasswordValid(isValid);
  }, []);

  const handlePasswordConfirmChange = useCallback((value, isValid) => {
    setPasswordConfirm(value);
    setIsPasswordConfirmValid(isValid);
  }, []);

  return {
    email,
    nickname,
    password,
    passwordConfirm,
    isFormValid,
    isEmailValid,
    isNicknameValid,
    isPasswordValid,
    isPasswordConfirmValid,
    handleEmailChange,
    handleNicknameChange,
    handlePasswordChange,
    handlePasswordConfirmChange,
  };
};

export default useRegistrationForm;
