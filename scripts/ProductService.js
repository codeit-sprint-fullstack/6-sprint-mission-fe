import axios from "axios";

const instance = axios.create({
  baseURL: "https://panda-market-api-crud.vercel.app/products",
});

const handleError = (e) => {
  if (e.response) {
    console.log(e.response.status);
    console.log(e.response.data);
  } else {
    console.log("requeset failed");
  }
};

/* 전체 조회 */
export const getProductList = async (options) => {
  try {
    const res = await instance.get("/", { params: options });
    return res.data;
  } catch (e) {
    handleError(e);
  }
};

// console.log(await getProductList());

/* 상세 조회 */
export const getProduct = async (id) => {
  try {
    const res = await instance.get(`/${id}`);
    return res.data;
  } catch (e) {
    handleError(e);
  }
};

// console.log(await getProduct(509));


/* 상품 생성 */
export const createProduct = async (product) => {
  try {
    const res = await instance.post("/", product);
    return res.data;
  } catch (e) {
    handleError(e);
  }
};

// const product = {
//   images: ["https://example.com/..."],
//   tags: ["전자제품"],
//   price: 0,
//   description: "string",
//   name: "상품 이름",
// };

// console.log(await creatProduct(product));

/* 상품 수정 */
export const patchProduct = async (id, product) => {
  try {
    const res = await instance.patch(`/${id}`, product);
    return res.data;
  } catch (e) {
    handleError(e);
  }
};

// const products = {
//   images: ["https://example.com/..."],
//   tags: ["전자제품"],
//   price: 0,
//   description: "string",
//   name: "상품 이름",
// };

// console.log(await patchProduct(509, products));

/* 상품 삭제 */
export const deleteProduct = async (id) => {
  try {
    const res = await instance.delete(`/${id}`);
    return res.data;
  } catch (e) {
    handleError(e);
  }
};

// console.log(await deleteProduct(499));