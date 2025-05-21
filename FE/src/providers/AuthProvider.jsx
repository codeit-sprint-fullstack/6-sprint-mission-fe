"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "@/lib/services/api/authService";
import { userService } from "@/lib/services/api/userService";

const AuthContext = createContext({
  user: null,
  login: async ({ email, password }) => {},
  logout: () => {},
  register: async ({ nickname, email, password, passwordConfirmation }) => {},
  updateUser: async (user) => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const fetchedUser = await userService.getMe();
      console.log("user:", fetchedUser);
      setUser(fetchedUser);
    } catch (error) {
      console.error("사용자 정보를 가져오는데 실패했습니다:", error);
      setUser(null);
    }
  };

  const register = async ({
    nickname,
    email,
    password,
    passwordConfirmation,
  }) => {
    try {
      const { accessToken, refreshToken } = await authService.register({
        nickname,
        email,
        password,
        passwordConfirmation,
      });
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      await getUser();
    } catch (error) {
      console.error("회원가입 실패:", error);
      throw error;
    }
  };

  const login = async ({ email, password }) => {
    try {
      const { accessToken, refreshToken } = await authService.login({
        email,
        password,
      });
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      await getUser();
    } catch (error) {
      console.error("로그인 실패:", error);
      throw error;
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const updateUser = async (userData) => {
    const updatedUser = await userService.updateMe(userData);
    setUser(updatedUser);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      getUser();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
