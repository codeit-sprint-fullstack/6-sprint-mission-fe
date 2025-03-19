import { useState } from "react";

function useValidation() {
  const [errVisible, setErrVisible] = useState({
    name: false,
    description: false,
    price: false,
    tags: false,
  });

  const checkValidation = (e) => {
    const { id, value } = e.target;

    // 유효성 검사
    const error = setErrVisible((prevErrVisible) => ({
      ...prevErrVisible,
      [id]: true,
    }));

    if (id === "name" && 10 < value.length) {
      error;
    } else if (
      id === "description" &&
      (10 > value.length || 100 < value.length)
    ) {
      error;
    } else if (id === "price" && !Number(value)) {
      if (value === "") {
        return setErrVisible((prevErrVisible) => ({
          ...prevErrVisible,
          [id]: false,
        }));
      }
      error;
    } else if (id === "tags" && 5 < value.length) {
      error;
    } else {
      setErrVisible((prevErrVisible) => ({ ...prevErrVisible, [id]: false }));
    }
  };

  return [errVisible, checkValidation];
}

export default useValidation;
