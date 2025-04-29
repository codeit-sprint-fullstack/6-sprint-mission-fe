"use client";

import React, { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import {
  loginAction,
  signupAction,
  refreshTokenAction,
  logoutAction,
} from "@/lib/actions/auth";
import { getUserAction, updateUserAction } from "@/lib/actions/user";
import { useRouter } from "next/navigation";
import { setTokensToCookie } from "@/lib/utils/authUtils";

const AuthContext = createContext({
  login: () => {},
  signup: () => {},
  logout: () => {},
  user: null,
  updateUser: () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const router = useRouter();

  const login = async (email, password) => {
    const formData = new FormData();
    formData.set("email", email);
    formData.set("password", password);

    const result = await loginAction(null, formData);

    if (result?.accessToken) {
      localStorage.setItem("accessToken", result.accessToken);
      await getUser();
    }

    return result;
  };

  const signup = async (email, nickname, password, passwordConfirmation) => {
    const formData = new FormData();
    formData.set("email", email);
    formData.set("nickname", nickname);
    formData.set("password", password);
    formData.set("passwordConfirmation", passwordConfirmation);

    const result = await signupAction(null, formData);
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
      // accessToken 만료된 경우 refresh 요청
      console.warn("accessToken 만료, refreshToken으로 재발급 시도");
      const result = await refreshTokenAction();

      if (result?.accessToken && result?.refreshToken) {
        try {
          await setTokensToCookie(result.accessToken, result.refreshToken);
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
      setLoadingUser(false);
    }
  };

  const updateUser = async (userInfo) => {
    const updatedUser = await updateUserAction(userInfo);
    setUser(updatedUser);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ login, signup, logout, user, updateUser, loadingUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
