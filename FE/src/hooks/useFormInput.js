import { useState, useEffect } from "react";

export default function useFormInput(initialValue, validateFn, errorMessage, dependencyValue ) {
  const [value, setValue] = useState(initialValue);
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const val = e.target.value;
    setValue(val);
    const isValid = dependencyValue ? validateFn(val, dependencyValue) : validateFn(val);
    if (!isValid) {
      setError(errorMessage);
    } else {
      setError("");
    }
  };

  const handleBlur = () => {
    setTouched(true);
    const isValid = dependencyValue ? validateFn(value, dependencyValue) : validateFn(value);
    if (!isValid) {
      setError(errorMessage);
    }
  };

  useEffect(() => {
    if (touched && validateFn) {
      const isValid = dependencyValue ? validateFn(value, dependencyValue) : validateFn(value);
      if (!isValid) {
        setError(errorMessage);
      } else {
        setError("");
      }
    }
  }, [value, touched, validateFn, dependencyValue, errorMessage]);

  return {
    value,
    setValue,
    onChange: handleChange,
    onBlur: handleBlur,
    error: touched ? error : "",
  };
}