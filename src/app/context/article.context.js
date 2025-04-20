"use client";

import { createContext, useContext, useState } from "react";

const ArticleContext = createContext();

export const useArticle = () => useContext(ArticleContext);

export function ArticleProvider({ children }) {
  const [board, setBoard] = useState({});
  const value = { board, setBoard };
  return (
    <ArticleContext.Provider value={value}>{children}</ArticleContext.Provider>
  );
}
