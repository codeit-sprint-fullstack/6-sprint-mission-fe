import axios from "axios";

const instance = axios.create({
  baseURL: "https://panda-market-api-crud.vercel.app/products",
});

// 상품 목록 조회
export const getProductList = async (options) => {
  try {
    const res = await instance.get("/", { params: options });
    return res.data;
  } catch (e) {
    handleError(e);
  }
};

// console.log(await getProductList());

// 상품 등록
export const createProduct = async (product) => {
  try {
    const res = await instance.post("/", product);
    return res.data;
  } catch (e) {
    handleError(e);
  }
};

// const product = {
//   name: "멋진 모니터",
//   description: "string",
//   price: 12000,
//   tags: ["전자제품"],
//   images: ["https://example.com/..."],
// };

// console.log(await creatProduct(product));

// 상품 상세 조회
export const getProduct = async (id) => {
  try {
    const res = await instance.get(`/${id}`);
    return res.data;
  } catch (e) {
    handleError(e);
  }
};

// console.log(await getProduct(512));

// 상품 수정
export const patchProduct = async (id, product) => {
  try {
    const res = await instance.patch(`/${id}`, product);
    return res.data;
  } catch (e) {
    handleError(e);
  }
};

// const product = {
//   name: "멋진 모니터",
//   description: "string",
//   price: 12000,
//   tags: ["전자제품"],
//   images: ["https://example.com/..."],
// };

// console.log(await patchProduct(512, products));

// 상품 삭제
export const deleteProduct = async (id) => {
  try {
    const res = await instance.delete(`/${id}`);
    return res.data;
  } catch (e) {
    handleError(e);
  }
};

// console.log(await deleteProduct(572));

// 에러
const handleError = (e) => {
  if (e.response) {
    console.log(e.response.status);
    console.log(e.response.data);
  } else {
    console.log("응답 실패");
  }
};
