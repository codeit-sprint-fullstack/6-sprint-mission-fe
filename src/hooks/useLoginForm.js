"use client";
import { useCallback } from "react";
import { validateEmail, validatePassword } from "@/utils/validators";
import useForm from "./useForm";

export default function useLoginForm() {
  // use validation logic from utils
  const validators = {
    email: (value) => validateEmail(value),
    password: (value) => validatePassword(value),
  };

  const { fields, validation, isFormValid, handleFieldChange, resetForm } =
    useForm({
      initialFields: {
        email: "",
        password: "",
      },
      validators,
    });

  const handleEmailChange = useCallback(
    (value) => {
      handleFieldChange("email", value);
    },
    [handleFieldChange]
  );

  const handlePasswordChange = useCallback(
    (value) => {
      handleFieldChange("password", value);
    },
    [handleFieldChange]
  );

  return {
    email: fields.email,
    password: fields.password,
    isFormValid,
    isEmailValid: validation.email.isValid,
    isPasswordValid: validation.password.isValid,
    isEmailTouched: validation.email.isTouched,
    isPasswordTouched: validation.password.isTouched,
    handleEmailChange,
    handlePasswordChange,
    resetForm,
  };
}
