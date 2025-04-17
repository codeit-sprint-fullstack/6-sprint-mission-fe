"use client";

import React, { createContext, useContext, useState } from "react";

const ArticlesContext = createContext();

export const ArticlesProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [order, setOrder] = useState("recent");

  return (
    <ArticlesContext.Provider
      value={{ articles, setArticles, order, setOrder }}
    >
      {children}
    </ArticlesContext.Provider>
  );
};

export const useArticles = () => useContext(ArticlesContext);
