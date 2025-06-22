// contexts/AuthContext.js
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("user_token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = () => {
    localStorage.setItem("user_token", "dummy_token_123");
    setIsLoggedIn(true);
    console.log("로그인됨");
  };

  const logout = () => {
    localStorage.removeItem("user_token");
    setIsLoggedIn(false);
    console.log("로그아웃됨");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
