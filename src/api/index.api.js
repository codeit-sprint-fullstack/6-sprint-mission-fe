import axios from "axios";
import itemAPI from "./item.api";

const baseURL = "https://six-sprint-mission-be-2.onrender.com/items";

export const client = axios.create({ baseURL });

const api = {
  items: itemAPI,
};

export default api;
