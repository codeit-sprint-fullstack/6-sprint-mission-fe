import axios from "axios";

const instance = axios.create({
  baseURL: "https://panda-market-api.vercel.app/products",
});

const handleError = (e) => {
  if (e.response) {
    console.error(`${e.response.status}: ${e.response.statusText}`);
  } else {
    console.error("Request failed");
  }
};

const validnum = (param, paramName) => {
  if (isNaN(param) || param <= 0) {
    throw new Error(`${paramName} must be a positive number.`);
  }
};

export const getProductList = async ({
  orderBy = "favorite",
  page = 1,
  pageSize = 10,
  keyword = "",
} = {}) => {
  try {
    validnum(page, "page");
    validnum(pageSize, "pageSize");
    const res = await instance.get("/", {
      params: { orderBy, page, pageSize, keyword },
    });

    return res.data;
  } catch (e) {
    handleError(e);
  }
};

// export const getProduct = async (id) => {
//   try {
//     const res = await instance.get(`/${id}`);
//     return res.data;
//   } catch (e) {
//     if (e.response) {
//       console.log(`${e.response.status}:${e.response.statusText}`);
//     } else {
//       console.log("request failed");
//     }
//   }
// };
// export const createProduct = async (data) => {
//   try {
//     const res = await instance.post("/", data);
//     return res.data;
//   } catch (e) {
//     handleError(e);
//   }
// };

// export const patchProduct = async (id, data) => {
//   try {
//     const res = await instance.patch(`/${id}`, data);
//     return res.data;
//   } catch (e) {
//     handleError(e);
//   }
// };

// export const deleteProduct = async (id) => {
//   try {
//     const res = await instance.delete(`/${id}`);
//     return res.data;
//   } catch (e) {
//     handleError(e);
//   }
// };
