import axiosInstance from "./axiosInstance";

interface SignupData {
  email: string;
  password: string;
  name: string;
}

interface SigninData {
  email: string;
  password: string;
}

interface AuthResponse {
  message: string;
  user?: {
    id: number;
    email: string;
    name: string;
  };
  token?: string;
}

// 회원가입 요청
export const signup = async (data: SignupData): Promise<AuthResponse> => {
  const res = await axiosInstance.post("/auth/signup", data);
  return res.data;
};

// 로그인 요청
export const signin = async (data: SigninData): Promise<AuthResponse> => {
  const res = await axiosInstance.post("/auth/signin", data);
  return res.data;
}; 