import { client } from "./index.api";

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

export const getItemList = async ({
  orderBy = "recent",
  page = 1,
  pageSize = 10,
  keyWord = "",
} = {}) => {
  try {
    validnum(page, "page");
    validnum(pageSize, "pageSize");
    const res = await client.get("/", {
      params: { orderBy, page, pageSize, keyWord },
    });
    console.log(res.data);
    return res.data;
  } catch (e) {
    handleError(e);
  }
};

// export const getProduct = async (id) => {
//   try {
//     const res = await client.get(`/${id}`);
//     return res.data;
//   } catch (e) {
//     if (e.response) {
//       console.log(`${e.response.status}:${e.response.statusText}`);
//     } else {
//       console.log("request failed");
//     }
//   }
// };

export const createItem = async (data) => {
  try {
    const res = await client.post("/", data);
    return res.data;
  } catch (e) {
    handleError(e);
  }
};

// export const patchProduct = async (id, data) => {
//   try {
//     const res = await client.patch(`/${id}`, data);
//     return res.data;
//   } catch (e) {
//     handleError(e);
//   }
// };

// export const deleteProduct = async (id) => {
//   try {
//     const res = await client.delete(`/${id}`);
//     return res.data;
//   } catch (e) {
//     handleError(e);
//   }
// };

const itemAPI = {
  getItemList,
  createItem,
};

export default itemAPI;
