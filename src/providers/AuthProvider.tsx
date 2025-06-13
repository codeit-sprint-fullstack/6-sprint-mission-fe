"use client";

import React, { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import {
  loginAction,
  signupAction,
  logoutAction,
  refreshAccessTokenClient,
} from "@/lib/actions/auth";
import { getUserAction, updateUserAction } from "@/lib/actions/user";
import { useRouter } from "next/navigation";
import { ChildrenProps, User } from "@/types";

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
  updateUser: (userInfo: Partial<User>) => Promise<void>;
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

  const login = async (email: string, password: string) => {
    const formData = new FormData();
    formData.set("email", email);
    formData.set("password", password);

    const result = await loginAction({ formData });

    if (result?.accessToken) {
      localStorage.setItem("accessToken", result.accessToken);
      await getUser();
    }

    return result;
  };

  const signup = async (
    email: string,
    nickname: string,
    password: string,
    passwordConfirmation: string
  ) => {
    const formData = new FormData();
    formData.set("email", email);
    formData.set("nickname", nickname);
    formData.set("password", password);
    formData.set("passwordConfirmation", passwordConfirmation);

    const result = await signupAction({ formData });
    return result;
  };

  const logout = async () => {
    await logoutAction();
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  const getUser = async () => {
    try {
      const user = await getUserAction();
      setUser(user);
    } catch (error) {
      console.warn("accessToken 만료, refreshToken으로 재발급 시도");
      const result = await refreshAccessTokenClient();

      if (result?.accessToken) {
        try {
          localStorage.setItem("accessToken", result.accessToken);
          const user = await getUserAction();
          setUser(user);
        } catch (error) {
          console.error("토큰 재발급 후 유저정보 불러오기 실패", error);
          await logout();
          router.push("/login");
        }
      } else {
        console.error("accessToken 재발급 실패");
        await logout();
        router.push("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (userInfo: Partial<User>) => {
    const updatedUser = await updateUserAction(userInfo);
    setUser(updatedUser);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ login, signup, logout, user, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
