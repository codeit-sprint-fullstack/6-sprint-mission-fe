"use client";

import { authService } from "@/lib/authService";
import { userService } from "@/lib/userService";
import { createContext, useContext, useEffect, useState } from "react";

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
      const user = await userService.getMe();
      setUser(user);
    } catch (error) {
      console.error("사용자 정보를 가져오는데 실패했습니다:", error);
      setUser(null);
    }
  };

  const register = async (nickname, email, password, passwordConfirmation) => {
    await authService.register(nickname, email, password, passwordConfirmation);
  };

  const login = async (email, password) => {
    await authService.login(email, password);
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
