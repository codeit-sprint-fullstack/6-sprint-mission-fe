import { useState } from "react";

export default function useInputForm(initialValue, validateFn, errorMessage, dependencyValue) {
  const [value, setValue] = useState(initialValue);
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false); 

  const handleChange = (e) => {
    setValue(e.target.value);
    setError(""); 
    setIsValid(false); 
    setTouched(false);
  };

  const handleBlur = () => {
    setTouched(true);
    if (validateFn) {
      const validationResult = dependencyValue ? validateFn(value, dependencyValue) : validateFn(value);
      setIsValid(validationResult);
      setError(validationResult ? "" : errorMessage);
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