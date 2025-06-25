"use client";

import { useState, useEffect } from "react";
import { Product, PaginationParams, ApiResponse } from "@/types";

const BASE_URL = "http://localhost:5001/api";

export function usePaginatedProducts(params: PaginationParams, isReady: boolean) {
  const { page, pageSize, orderBy, keyword } = params;

  const [data, setData] = useState<{ products: Product[]; totalCount: number }>({ 
    products: [], 
    totalCount: 0 
  });
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
          page: page.toString(),
          size: pageSize.toString(),
          sort: orderBy,
          search: keyword,
        }).toString();

        const res = await fetch(`${BASE_URL}/products?${qs}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`API ${res.status}`);

        const json: ApiResponse<Product> = await res.json();

        setData({
          products: json.list,
          totalCount: json.totalCount,
        });
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
    return () => controller.abort();
  }, [page, pageSize, orderBy, keyword, isReady]);

  return { data, isLoading, isError };
} 