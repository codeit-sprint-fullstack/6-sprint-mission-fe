import axios from "axios";
import { BASE_API } from "./endpoint";

const instance = axios.create({
  baseURL: BASE_API,
});

export const getItemsList = async (options) => {
  try {
    const res = await instance.get("/", { params: options });
    return res.data;
  } catch (e) {
    console.log(e.response.status);
    console.log(e.response.data);
  }
};

export const postItem = async (data) => {
  try {
    const res = await instance.post("/", data);
    const result = res.data;

    return result;
  } catch (e) {
    console.log(e);
  }
};
