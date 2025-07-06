"use client";

import React, { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { loginAction, signupAction, logoutAction } from "@/lib/actions/auth";
import { usePathname, useRouter } from "next/navigation";
import { ChildrenProps, User } from "@/types";
import { userService } from "@/lib/service/userService";
import { EXCLUDED_ROUTES } from "@/constant";

interface AuthContextType {
  login: (email: string, password: string) => Promise<any>;
  signup: (
    email: string,
    nickname: string,
    password: string,
    passwordConfirmation: string
  ) => Promise<any>;
  logout: () => Promise<void>;
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: ChildrenProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();
  const pathname = usePathname();

  const login = async (email: string, password: string) => {
    const result = await loginAction({ email, password });
    if (!result.success) {
      console.error("로그인 실패:", result.error);
      return result;
    }
    getUser();
    return result;
  };

  const signup = async (
    email: string,
    nickname: string,
    password: string,
    passwordConfirmation: string
  ) => {
    return await signupAction({
      email,
      nickname,
      password,
      passwordConfirmation,
    });
  };

  const logout = async () => {
    await logoutAction();
    setUser(null);
    router.push("/login");
  };

  const getUser = async () => {
    try {
      const user = await userService.getMe();
      setUser(user);
    } catch (error) {
      console.error("사용자 정보를 가져오는데 실패했습니다.", error);
      throw error;
    }
  };

  useEffect(() => {
    if (!EXCLUDED_ROUTES.includes(pathname)) {
      getUser();
    } else {
      setLoading(false);
    }
  }, [pathname]);

  return (
    <AuthContext.Provider value={{ login, signup, logout, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
