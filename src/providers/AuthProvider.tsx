"use client";
import { userAPI } from "@/lib/api/user";
import { TUser } from "@/types";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: TUser | null;
  isLoading: boolean;
  getUser: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  getUser: async () => {},
  logout: () => {},
});

export const useAuth = () => {
  const UserContext = useContext(AuthContext);
  if (!UserContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return UserContext;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<TUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const getUser = async () => {
    try {
      setIsLoading(true);
      let res = await userAPI.getMe();
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        setUser(null);
      } else if (res.status === 401 && refreshToken) {
        const refreshRes = await userAPI.refresh(refreshToken);
        if (refreshRes.ok) {
          const refreshData = await refreshRes.json();
          localStorage.setItem("accessToken", refreshData.accessToken);
          res = await userAPI.getMe();
          const data = await res.json();
          setUser(data);
        }
      } else {
        res = await userAPI.getMe();
        const data = await res.json();
        setUser(data);
      }
    } catch (error) {
      console.error("사용자 정보를 가져오는데 실패했습니다", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <AuthContext.Provider value={{ user, isLoading, getUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
