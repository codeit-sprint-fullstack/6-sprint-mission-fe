import axios from "axios";

// 스프린트 미션 5에서 활용한 item API
const BASE_URL = "https://panda-market-api.vercel.app/products";
const instance = axios.create({ baseURL: BASE_URL });

export const getItems = async (params) => {
  const res = await instance.get("/", { params });
  return res.data;
};
