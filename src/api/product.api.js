import { client } from "./index.api.js";

const getAllProducts = async (options) => {
  const {
    page = 1,
    pageSize = 4,
    orderBy = "favorite",
    keyword = "",
  } = options;
  const response = await client.get(
    `/products/?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&keyword=${keyword}`
  );
  const result = response.data;
  return result;
};

const postProduct = async (options) => {
  const response = await client.post("/products", options);
  const result = response.data;
  return result;
};

const productsAPI = {
  getAllProducts,
  postProduct,
};

export default productsAPI;
