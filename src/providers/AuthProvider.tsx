"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { authService } from "@/lib/authService";
import { userService } from "@/lib/userService";

interface User {
  id: number;
  email: string;
  nickname: string;
  [key: string]: any;
}

interface LoginResult {
  id: string;
  accessToken: string;
  user: User;
}

interface AuthContextType {
  user: User | null | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | null | undefined>>;
  login: (email: string, password: string) => Promise<LoginResult>;
  logout: () => Promise<any>;
  updateUser: (user: User) => Promise<void>;
  register: (
    email: string,
    nickname: string,
    password: string,
    passwordConfirmation: string
  ) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used with an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const getUser = async () => {
    try {
      const user = await userService.getMe();

      setUser(user);
    } catch (e) {
      console.error("사용자 정보를 가져오는데 실패했습니다", e);
      setUser(null);
    }
  };

  const login = async (
    email: string,
    password: string
  ): Promise<LoginResult> => {
    const result = await authService.login(email, password);

    setUser(result.user);
    return result;
  };

  const register = async (
    email: string,
    nickname: string,
    password: string,
    passwordConfirmation: string
  ): Promise<any> => {
    const result = await authService.register(
      email,
      nickname,
      password,
      passwordConfirmation
    );

    setUser(result.user);
    return result;
  };

  const logout = async (): Promise<any> => {
    const result = await authService.logout();
    return result;
  };

  const updateUser = async (user: User): Promise<void> => {
    console.log("유저 업데이트!");
  };

  //새로고침 시 로그인 상태 유지
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      getUser().then(() => {
        setIsLoading(false);
      });
    } else {
      setUser(null);
      setIsLoading(false);
    }
  }, []);

  //인증 상태를 받아오기 전에 렌더링 막기
  if (isLoading) return <div> 로딩 중 ...</div>;

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, logout, updateUser, register }}
    >
      {children}
    </AuthContext.Provider>
  );
}
