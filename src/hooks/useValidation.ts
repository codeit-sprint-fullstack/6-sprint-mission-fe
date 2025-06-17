import { ChangeEvent, useState } from "react";

type TUseValidation = {
  name: string;
  description: string;
  price: string;
  tags: string;
};

// 에러 메시지
const errMsg = {
  name: "10글자 이내로 입력해주세요.",
  description: "10 ~ 100글자 이내로 입력해주세요.",
  price: "숫자만 입력해주세요.",
  tags: "5글자 이내로 입력해주세요.",
};

export default function useValidation(): [
  TUseValidation,
  (e: ChangeEvent<HTMLInputElement>) => void
] {
  const [errorMsg, setErrorMsg] = useState<TUseValidation>({
    name: "",
    description: "",
    price: "",
    tags: "",
  });

  const checkValidation = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const id = e.target.id as keyof TUseValidation;

    // 유효성 검사 실패 에러 메시지
    const error = setErrorMsg((prev) => ({ ...prev, [id]: errMsg[id] }));

    if (id === "name" && 10 < value.length) {
      return error;
    }

    if (id === "description" && (10 > value.length || 100 < value.length)) {
      return error;
    }

    if (id === "price" && !Number(value)) {
      return error;
    }

    if (id === "tags" && 5 < value.length) {
      return error;
    }

    setErrorMsg((prev) => ({ ...prev, [id]: "" }));
  };

  return [errorMsg, checkValidation];
}
