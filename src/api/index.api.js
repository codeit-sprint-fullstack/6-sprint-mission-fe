import axios from "axios";
import productsAPI from "./product.api.js";

const baseURL = "http://localhost:3000";
export const client = axios.create({ baseURL });

const api = {
  products: productsAPI,
};

export default api;
// dfdfdsfsfsdfsf;
