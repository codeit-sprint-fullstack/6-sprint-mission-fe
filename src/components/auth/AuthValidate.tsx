"use client";
import { useState } from "react";

export default function AuthValidate({ inputType, valueState, setValueState }) {
  const [validateState, setValidateState] = useState({
    email: false,
    nickname: false,
    password: false,
    confirmPassword: false,
  });

  switch (inputType) {
    case "email":
      setValidateState({ ...validateState, email: valueState });
    case "nickname":
      setValidateState({ ...validateState, email: valueState });
    case "password":
      setValidateState({ ...validateState, email: valueState });
    case "confirmPassword":
      setValidateState({ ...validateState, email: valueState });
    default:
      return;
  }

  return (
    <>
      <p>validateState.inputType</p>
    </>
  );
}
