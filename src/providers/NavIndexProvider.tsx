"use client";

import { createContext, useContext, useState } from "react";

interface NavContextType {
  activePage: string;
  setActivePage: (page: string) => void;
}

const NavContext = createContext<NavContextType | null>(null);

interface NavIndexProviderProps {
  children: React.ReactNode;
}

const NavIndexProvider = ({ children }: NavIndexProviderProps) => {
  const [activePage, setActivePage] = useState<string>("/post");

  return (
    <NavContext.Provider value={{ activePage, setActivePage }}>
      {children}
    </NavContext.Provider>
  );
};

export function useNav() {
  const context = useContext(NavContext);
  if (!context) {
    throw new Error("컨텍스트가 존재하지 않습니다.");
  }
  return context;
}

export default NavIndexProvider;
