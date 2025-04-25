"use client";

import React, { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { getRefreshToken, loginAction, signupAction } from "@/app/actions/auth";
import { getUserAction, updateUserAction } from "@/app/actions/user";

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

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const formData = new FormData();
      formData.set("refreshToken", refreshToken);

      const data = await getRefreshToken(null, formData);

      if (data?.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
        return data.accessToken;
      }

      throw new Error("refresh 실패");
    } catch (error) {
      console.error("토큰 갱신 실패:", error);
      logout();
      return null;
    }
  };

  const getUser = async () => {
    try {
      const user = await getUserAction();
      setUser(user);
    } catch (error) {
      // accessToken 만료된 경우 refresh 요청
      const newAccessToken = await refreshAccessToken();
      setUser(null);

      if (newAccessToken) {
        try {
          const user = await getUserAction();
          setUser(user);
        } catch (error) {
          console.error("유저 정보를 불러오는데 실패했습니다.", error);
        }
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
