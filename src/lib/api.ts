import { Product, CreateProductRequest } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

const authHeader = (token: string) => ({
  Authorization: `Bearer ${token}`,
});

export const getAllProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${API_BASE}/product`);
  return res.json();
};

export const getProduct = async (id: number): Promise<Product> => {
  const res = await fetch(`${API_BASE}/product/${id}`);
  return res.json();
};

export const createProduct = async (
  data: CreateProductRequest,
  token: string
): Promise<Product> => {
  const res = await fetch(`${API_BASE}/product`, {
    method: "POST",
    headers: {
      ...authHeader(token),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateProduct = async (
  id: number,
  data: Partial<CreateProductRequest>,
  token: string
): Promise<Product> => {
  const res = await fetch(`${API_BASE}/product/${id}`, {
    method: "PUT",
    headers: {
      ...authHeader(token),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteProduct = async (
  id: number,
  token: string
): Promise<void> => {
  const res = await fetch(`${API_BASE}/product/${id}`, {
    method: "DELETE",
    headers: authHeader(token),
  });
  return res.json();
};

export const likeProduct = async (id: number, token: string): Promise<void> => {
  const res = await fetch(`${API_BASE}/product/${id}/like`, {
    method: "POST",
    headers: authHeader(token),
  });
  return res.json();
};

export const unlikeProduct = async (
  id: number,
  token: string
): Promise<void> => {
  const res = await fetch(`${API_BASE}/product/${id}/like`, {
    method: "DELETE",
    headers: authHeader(token),
  });
  return res.json();
};

export const checkProductLiked = async (
  id: number,
  token: string
): Promise<boolean> => {
  const res = await fetch(`${API_BASE}/product/${id}/like`, {
    method: "GET",
    headers: authHeader(token),
  });
  return res.json();
};
