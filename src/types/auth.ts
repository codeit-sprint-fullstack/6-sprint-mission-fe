import { User } from "./user";

// useAuth()에서 사용하는 Context 타입
export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (
    nickname: string,
    email: string,
    password: string,
    passwordConfirmation: string
  ) => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
}

// API 요청에 사용할 payload 타입
export interface SignUpPayload {
  email: string;
  nickname: string;
  password: string;
}

export interface SignInPayload {
  email: string;
  password: string;
}

// 로그인 응답 타입 (accessToken, 필요 시 user 포함)
export interface AuthResponse {
  accessToken: string;
  // user?: User; // 필요하면 여기에 추가
}