"use client";

import React, { createContext, useContext, useState } from "react";

interface ArticleType {
  id: number;
  title: string;
  createdAt: string;
}

interface ArticlesContextType {
  articles: ArticleType[];
  setArticles: React.Dispatch<React.SetStateAction<ArticleType[]>>;
  order: "recent" | string;
  setOrder: React.Dispatch<React.SetStateAction<string>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const ArticlesContext = createContext<ArticlesContextType | undefined>(
  undefined
);

interface ArticlesProviderProps {
  children: React.ReactNode;
}

export const ArticlesProvider = ({ children }: ArticlesProviderProps) => {
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [order, setOrder] = useState<string>("recent");
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <ArticlesContext.Provider
      value={{
        articles,
        setArticles,
        order,
        setOrder,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
};

export const useArticles = () => useContext(ArticlesContext);
