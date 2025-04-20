import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// 인스턴스
export const instance = axios.create({
  baseURL: baseUrl,
});

// 에러 처리
const handleError = (error) => {
  if (error.response) {
    console.log(error.response.status);
    console.log(error.response.data);
  } else {
    console.log("request failed");
  }
};

// 안전 검사
export const safeExecute = (func) => {
  try {
    return func();
  } catch (error) {
    handleError(error);
  }
};
