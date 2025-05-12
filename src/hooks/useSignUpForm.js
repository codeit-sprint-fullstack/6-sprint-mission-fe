"use client";
import { useCallback, useEffect, useState } from "react";
import {
  validateEmail,
  validateNickname,
  validatePassword,
  validateConfirmPassword,
} from "@/utils/validators";

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

  const handleEmailChange = useCallback((value) => {
    setEmail(value);
    setIsEmailTouched(true);
    setIsEmailValid(validateEmail(value).isValid);
  }, []);

  const handleNicknameChange = useCallback((value) => {
    setNickname(value);
    setIsNicknameTouched(true);
    setIsNicknameValid(validateNickname(value).isValid);
  }, []);

  const handlePasswordChange = useCallback((value) => {
    setPassword(value);
    setIsPasswordTouched(true);
    setIsPasswordValid(validatePassword(value).isValid);
    const { isValid } = validateConfirmPassword(value, passwordConfirm);
    setIsPasswordConfirmValid(isValid);
  }, []);

  const handlePasswordConfirmChange = useCallback(
    (value) => {
      setPasswordConfirm(value);
      setIsPasswordConfirmTouched(true);
      const { isValid } = validateConfirmPassword(password, value);
      setIsPasswordConfirmValid(isValid);
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
