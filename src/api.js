import axios from "axios";

const instance = axios.create({
  baseURL: "https://panda-market-api.vercel.app/products",
});

export const getProductList = async (options) => {
  try {
    const res = await instance.get("/", { params: options });
    return res.data;
  } catch (e) {
    console.log(e.response.status);
    console.log(e.response.data);
  }
};
