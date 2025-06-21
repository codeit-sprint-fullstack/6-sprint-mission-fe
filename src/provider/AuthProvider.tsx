"use client";

import { AuthContextType, User } from "@/app/types";
import { authService } from "@/lib/authService";
import { userService } from "@/lib/userService";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";



const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
	children: ReactNode;
}
export default function AuthProvider({ children } : AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const getUser = async () => {
    try {
      const user = await userService.getMe();
      setUser(user);
    } catch (error) {
      console.error("사용자 정보를 가져오는데 실패했습니다:", error);
      setUser(null);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    await authService.register(name, email, password);
  };

  const login = async (email: string, password: string) => {
    const {token: loginToken} = await authService.login(email, password);
    setToken(loginToken);
    await getUser();
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setToken(null); 
  };

  const updateUser = async (user : User) => {
    const formData = new FormData();
    Object.entries(user).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });
    const updatedUser = await userService.updateMe(formData);
    setUser(updatedUser);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, updateUser, register, token }}>
      {children}
    </AuthContext.Provider>
  );
}
