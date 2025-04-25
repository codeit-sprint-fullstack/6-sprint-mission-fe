"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "@/api/authService";
import { userService } from "@/api/userService";

const AuthContext = createContext({
  login: () => {},
  logout: () => {},
  user: null,
  updateUser: () => {},
  register: () => {},
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
      const acessToken = localStorage.getItem("accessToken");
      if (!acessToken) {
        setUser(null);
        return;
      }

      const user = await userService.getMe();
      setUser(user);
    } catch (error) {
      console.error("사용자 정보를 가져오는데 실패했습니다:", error);
      setUser(null);
    }
  };

  const register = async (email, nickname, password, passwordConfirmation) => {
    await authService.signUp(email, nickname, password, passwordConfirmation);
  };

  const login = async ({ email, password }) => {
    await authService.signIn(email, password);
    await getUser();
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const updateUser = async (user) => {
    const updatedUser = await userService.updateMe(user);
    setUser(updatedUser);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, register }}>
      {children}
    </AuthContext.Provider>
  );
}
