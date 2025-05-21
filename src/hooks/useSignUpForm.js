"use client";
import { useCallback, useEffect, useState } from "react";

const useSignUpForm = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordConfirmValid, setIsPasswordConfirmValid] = useState(false);

  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isNicknameTouched, setIsNicknameTouched] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  const [isPasswordConfirmTouched, setIsPasswordConfirmTouched] =
    useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isValid =
      isEmailValid &&
      isNicknameValid &&
      isPasswordValid &&
      isPasswordConfirmValid;
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
    setIsEmailTouched(true);
    setIsEmailValid(isValid);
  }, []);

  const handleNicknameChange = useCallback((value, isValid) => {
    setNickname(value);
    setIsNicknameTouched(true);
    setIsNicknameValid(isValid);
  }, []);

  const handlePasswordChange = useCallback((value, isValid) => {
    setPassword(value);
    setIsPasswordTouched(true);
    setIsPasswordValid(isValid);
  }, []);

  const handlePasswordConfirmChange = useCallback(
    (value) => {
      setPasswordConfirm(value);
      setIsPasswordConfirmTouched(true);
      setIsPasswordConfirmValid(value === password);
    },
    [password]
  );

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
    isEmailTouched,
    isNicknameTouched,
    isPasswordTouched,
    isPasswordConfirmTouched,
    handleEmailChange,
    handleNicknameChange,
    handlePasswordChange,
    handlePasswordConfirmChange,
  };
};

export default useSignUpForm;
