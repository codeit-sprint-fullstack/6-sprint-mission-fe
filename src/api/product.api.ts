import axiosInstance from "./axiosInstance";
import { Product } from "@/types";

interface CreateProductData {
  name: string;
  description: string;
  price: number;
  image: string;
}

interface CreateProductResponse {
  message: string;
  product?: Product;
}

export const createProduct = async (data: CreateProductData): Promise<CreateProductResponse> => {
  const token = localStorage.getItem("accessToken");

  const res = await axiosInstance.post("/products", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}; 