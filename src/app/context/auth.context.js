"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLogin(!!token);
  }, []);

  const login = (result) => {
    localStorage.setItem("accessToken", result.accessToken);
    setIsLogin(true);
    setUser(result.user.nickname);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setIsLogin(false);
  };

  return (
    <AuthContext.Provider value={{ isLogin, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
