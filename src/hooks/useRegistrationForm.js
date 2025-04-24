import { useCallback, useState } from "react";

const useRegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isNicknameValid, setIsNicknameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isPasswordConfirmValid, setIsPasswordConfirmValid] = useState(true);

  const checkFormValidity = useCallback(
    (
      emailValid,
      nicknameValid,
      passwordValid,
      passwordConfirmValid,
      currentPassword,
      currentPasswordConfirm
    ) => {
      setIsFormValid(
        emailValid &&
          nicknameValid &&
          passwordValid &&
          passwordConfirmValid &&
          currentPassword === currentPasswordConfirm
      );
    },
    [setIsFormValid]
  );

  const handleEmailChange = useCallback(
    (value, isValid) => {
      setEmail(value);
      setIsEmailValid(isValid);
      checkFormValidity(
        isValid,
        isNicknameValid,
        isPasswordValid,
        isPasswordConfirmValid,
        password,
        passwordConfirm
      );
    },
    [
      setEmail,
      setIsEmailValid,
      checkFormValidity,
      isNicknameValid,
      isPasswordValid,
      isPasswordConfirmValid,
      password,
      passwordConfirm,
    ]
  );

  const handleNicknameChange = useCallback(
    (value, isValid) => {
      setNickname(value);
      setIsNicknameValid(isValid);
      checkFormValidity(
        isEmailValid,
        isValid,
        isPasswordValid,
        isPasswordConfirmValid,
        password,
        passwordConfirm
      );
    },
    [
      setNickname,
      setIsNicknameValid,
      checkFormValidity,
      isEmailValid,
      isPasswordValid,
      isPasswordConfirmValid,
      password,
      passwordConfirm,
    ]
  );

  const handlePasswordChange = useCallback(
    (value, isValid) => {
      setPassword(value);
      setIsPasswordValid(isValid);
      checkFormValidity(
        isEmailValid,
        isNicknameValid,
        isValid,
        isPasswordConfirmValid,
        password,
        passwordConfirm
      );
    },
    [
      setPassword,
      setIsPasswordValid,
      checkFormValidity,
      isEmailValid,
      isNicknameValid,
      isPasswordConfirmValid,
      password,
      passwordConfirm,
    ]
  );

  const handlePasswordConfirmChange = useCallback(
    (value, isValid) => {
      setPasswordConfirm(value);
      setIsPasswordConfirmValid(isValid);
      checkFormValidity(
        isEmailValid,
        isNicknameValid,
        isPasswordValid,
        isValid,
        password,
        passwordConfirm
      );
    },
    [
      setPasswordConfirm,
      setIsPasswordConfirmValid,
      checkFormValidity,
      isEmailValid,
      isNicknameValid,
      isPasswordValid,
      password,
      passwordConfirm,
    ]
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
    handleEmailChange,
    handleNicknameChange,
    handlePasswordChange,
    handlePasswordConfirmChange,
  };
};

export default useRegistrationForm;
