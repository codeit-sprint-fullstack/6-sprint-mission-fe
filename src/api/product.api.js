import axiosInstance from "./axiosInstance";

export const createProduct = async (data) => {
  const token = localStorage.getItem("accessToken");

  const res = await axiosInstance.post("/products", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
