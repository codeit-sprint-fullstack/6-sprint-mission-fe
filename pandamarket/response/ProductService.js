import axios from "axios";

const instance = axios.create({
  baseURL: "https://sprint-mission-api.vercel.app/products",
});

export const getProductList = async (
  params = { page: 1, pageSize: 100, key: "" }
) => {
  try {
    const res = await instance.get(`/`, { params });
    return res.data;
  } catch (e) {
    if (e.response) {
      console.log(`${e.response.status}:${e.response.statusText}`);
    } else {
      console.log("request failed");
    }
  }
};

export const getProduct = async (id) => {
  try {
    const res = await instance.get(`/${id}`);
    return res.data;
  } catch (e) {
    if (e.response) {
      console.log(`${e.response.status}:${e.response.statusText}`);
    } else {
      console.log("request failed");
    }
  }
};
export const createProduct = async (data) => {
  try {
    const res = await instance.post("/", data);
    return res.data;
  } catch (e) {
    if (e.response) {
      console.log(`${e.response.status}:${e.response.statusText}`);
    } else {
      console.log("request failed");
    }
  }
};

export const patchProduct = async (id, data) => {
  try {
    const res = await instance.patch(`/${id}`, data);
    return res.data;
  } catch (e) {
    if (e.response) {
      console.log(`${e.response.status}:${e.response.statusText}`);
    } else {
      console.log("request failed");
    }
  }
};

export const deleteProduct = async (id) => {
  try {
    const res = await instance.delete(`/${id}`);
    return res.data;
  } catch (e) {
    if (e.response) {
      console.log(`${e.response.status}:${e.response.statusText}`);
    } else {
      console.log("request failed");
    }
  }
};
