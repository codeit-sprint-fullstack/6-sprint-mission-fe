import { useState, ChangeEvent } from "react";

interface UseInputFormReturn {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur: () => void;
  error: string;
  isValid: boolean;
}

export default function useInputForm<
  D = unknown
>(
  initialValue: string,
  validateFn?: (value: string, dependencyValue?: D) => boolean,
  errorMessage?: string,
  dependencyValue?: D
): UseInputFormReturn {
  const [value, setValue] = useState<string>(initialValue);
  const [touched, setTouched] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);
    setError("");
    setIsValid(false);
    setTouched(false);
  };

  const handleBlur = () => {
    setTouched(true);
    if (validateFn) {
      const validationResult = dependencyValue !== undefined ? validateFn(value, dependencyValue) : validateFn(value);
      setIsValid(validationResult);
      setError(validationResult ? "" : errorMessage || "");
    } else {
      setIsValid(true);
      setError("");
    }
  };

  return {
    value,
    setValue,
    onChange: handleChange,
    onBlur: handleBlur,
    error: touched ? error : "",
    isValid: touched ? isValid : false,
  };
}