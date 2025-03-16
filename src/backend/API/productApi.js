import axios from "axios";

const BASE_URL = "https://panda-market-agn0.onrender.com/products";
const instance = axios.create({ baseURL: BASE_URL });

const getProducts = async (params) => {
  const res = await instance.get("/", { params });
  return res.data;
};

const getProduct = async (id) => {
  const res = await instance.get(`/${id}`);
  return res.data;
};

const postProduct = async (body) => {
  const res = await instance.post("/", body);
  return res.data;
};

const patchProduct = async (id, body) => {
  const res = await instance.patch(`/${id}`, body);
  return res.data;
};

const deleteProduct = async (id) => {
  const res = await instance.delete(`/${id}`);
  return res.data;
};

export { getProducts, getProduct, postProduct, patchProduct, deleteProduct };
