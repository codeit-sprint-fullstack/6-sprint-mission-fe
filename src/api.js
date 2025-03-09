import axios from "axios";

const baseURL = "https://panda-market-api.vercel.app";
const instance = axios.create({ baseURL });

export const getProducts = async (params) => {
  const res = await instance.get("/products", { params });
  return res.data;
};
