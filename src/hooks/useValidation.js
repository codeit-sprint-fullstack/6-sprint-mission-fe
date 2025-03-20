import { useState } from "react";

export const useValidation = () => {
  const [valids, setValid] = useState({
    name: "none",
    description: "none",
    price: "none",
    tag: "none",
  });

  const validate = (name, value) => {
    let valid = "";
    if (name === "name") {
      if (value.length > 10) {
        valid = "10자 이내로 입력해주세요";
      } else if (value.length < 1) {
        valid = "1자 이상 입력해주세요";
      }
    } else if (name === "description") {
      if (value.length > 100) {
        valid = "100자 이내로 입력해주세요";
      } else if (value.length < 10) {
        valid = "10자 이상 입력해주세요";
      }
    } else if (name === "price") {
      if (isNaN(value)) {
        valid = "숫자로 입력해주세요";
      } else if (value.length < 1) {
        valid = "1자 이상 입력해주세요";
      }
    } else if (name === "tag") {
      if (value.length > 5) {
        valid = "5자 이내로 입력해주세요";
      }
    }
    setValid((prevValid) => ({ ...prevValid, [name]: valid }));
    return valid === "";
  };
  return { valids, validate };
};
