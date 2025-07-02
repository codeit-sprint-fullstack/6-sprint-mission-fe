"use client";

import { authService } from "@/service/authService";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface IAuthProviderProps {
  children: ReactNode;
}

type TAuthContext = {
  user: TUser | null;
  signUp: (email: string, nickname: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

type TUser = {
  id: string;
  nickname: string;
  image: string | null;
};

const AuthContext = createContext<TAuthContext | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth는 반드시 AuthProvider안에서 사용해야 합니다.");
  }

  return context;
};

export default function AuthProvider({ children }: IAuthProviderProps) {
  const [user, setUser] = useState<TUser | null>(null);

  // 유저 정보
  const getUser = async () => {
    const user = await authService.getUser();

    setUser(user);
  };

  // 회원가입
  const signUp = async (
    email: string,
    nickname: string,
    password: string
  ): Promise<void> => {
    const user = await authService.signUp(email, nickname, password);

    localStorage.setItem("accessToken", user.accessToken);
    localStorage.setItem("refreshToken", user.refreshToken);

    await getUser();
  };

  // 로그인
  const login = async (email: string, password: string): Promise<void> => {
    const user = await authService.login(email, password);

    localStorage.setItem("accessToken", user.accessToken);
    localStorage.setItem("refreshToken", user.refreshToken);

    await getUser();
  };

  // 로그아웃
  const logout = async (): Promise<void> => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signUp, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
