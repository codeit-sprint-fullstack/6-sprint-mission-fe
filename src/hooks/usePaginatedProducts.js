"use client";

import { useState, useEffect } from "react";

const BASE_URL = "https://panda-market-api.vercel.app";

export function usePaginatedProducts(params, isReady) {
  const { page, pageSize, orderBy, keyword } = params;

  const [data, setData] = useState({ products: [], totalCount: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!isReady) return;

    const controller = new AbortController();

    const fetchProducts = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const qs = new URLSearchParams({
          page,
          size: pageSize,
          sort: orderBy,
          search: keyword,
        }).toString();

        const res = await fetch(`${BASE_URL}/Products?${qs}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`API ${res.status}`);

        const json = await res.json(); 

        setData({
          products: json.list,
          totalCount: json.totalCount,
        });
      } catch (err) {
        if (err.name !== "AbortError") setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
    return () => controller.abort();
  }, [page, pageSize, orderBy, keyword, isReady]);

  return { data, isLoading, isError };
}
