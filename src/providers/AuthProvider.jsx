"use client";

import { authApi } from "@/lib/authApi";
import { userApi } from "@/lib/userApi";
import React, { useEffect, useState } from "react";

import { createContext, useContext } from "react";

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

  const login = async (email, password) => {
    await authApi.login(email, password);
    await getUser();
  };

  const signup = async (email, nickname, password, passwordConfirmation) => {
    await authApi.signup(email, nickname, password, passwordConfirmation);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  const refreshAccessToken = async () => {
    try {
      const data = await authApi.getRefreshToken(); // refreshToken은 쿠키로 자동 전송됨
      localStorage.setItem("accessToken", data.accessToken);
      return data.accessToken;
    } catch (error) {
      console.error("토큰 갱신 실패:", error);
      logout();
      return null;
    }
  };

  const getUser = async () => {
    try {
      const user = await userApi.getUser();
      setUser(user);
    } catch (error) {
      console.error("사용자 정보를 가져오는데 실패했습니다.", error);

      // accessToken 만료된 경우 refresh 요청
      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        try {
          const user = await userApi.getUser();
          setUser(user);
        } catch (error) {
          console.error("유저 정보를 불러오는데 실패했습니다.", error);
          logout();
        }
      }
    }
  };

  const updateUser = async (userInfo) => {
    const updatedUser = await userApi.updateUser(userInfo);
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ login, signup, logout, user, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
