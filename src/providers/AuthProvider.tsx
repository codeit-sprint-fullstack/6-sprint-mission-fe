"use client";

import { signUp, signIn, signOut } from "@/api/auth.api";
import { getMyUserInfo, updateMyUserInfo } from "@/api/user.api";
import { AuthContextType } from "@/types/auth";
import { User } from "@/types/user";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const getUser = async () => {
    try {
      const userData = await getMyUserInfo();
      setUser(userData);
    } catch (error) {
      console.error("사용자 정보를 가져오는데 실패했습니다:", error);
      setUser(null);
      // 토큰이 유효하지 않으면 제거
      localStorage.removeItem("accessToken");
    }
  };

  const register = async (
    nickname: string,
    email: string,
    password: string,
    passwordConfirmation: string
  ) => {
    if (password !== passwordConfirmation) {
      throw new Error("비밀번호가 일치하지 않습니다.");
    }
    await signUp({ email, nickname, password });
  };

  const login = async (email: string, password: string) => {
    const response = await signIn({ email, password });
    // 액세스 토큰 저장
    if (response.accessToken) {
      localStorage.setItem("accessToken", response.accessToken);
    }
    await getUser();
  };

  const logout = async () => {
    signOut();
    setUser(null);
  };

  const updateUser = async (userData: Partial<User>) => {
    const updatedUser = await updateMyUserInfo(userData);
    setUser(updatedUser);
  };

  useEffect(() => {
    // 토큰이 있으면 사용자 정보 가져오기
    const token = localStorage.getItem("accessToken");
    if (token) {
      getUser();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, register }}>
      {children}
    </AuthContext.Provider>
  );
}
