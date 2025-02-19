import axios from "axios";

const getProductListURL =
  "https://panda-market-api-crud.vercel.app/products?page=1&pageSize=10&orderBy=recent";
const getProductList = async () => {
  const res = await axios.get(getProductListURL);
  return res.data;
};
const productList = await getProductList();
console.log(productList);

const getProductURL = "https://panda-market-api-crud.vercel.app/products/496";
const getProduct = async () => {
  const res = await axios.get(getProductURL);
  return res.data;
};
const product = await getProduct();
console.log(product);

const createProductURL = "https://panda-market-api-crud.vercel.app/products";
const createProductData = {
  images: ["https://example.com/..."],
  tags: ["전자제품"],
  price: 0,
  description: "string",
  name: "상품 이름",
};
const createProduct = async () => {
  const res = await axios.post(createProductURL, productData);
  return res.data;
};
const createResponse = await createProduct();
console.log(createResponse);

const deleteProductURL =
  "https://panda-market-api-crud.vercel.app/products/495";
const deleteProduct = async () => {
  const res = await axios.delete(deleteProductURL);
  return res.data;
};
const deleteResponse = await deleteProduct();
console.log(deleteResponse);

const patchProductURL = "https://panda-market-api-crud.vercel.app/products/496";
const patchProductData = {
  images: ["https://example.com/..."],
  tags: ["전자제품"],
  price: 0,
  description: "string",
  name: "상품 이름",
};
const patchProduct = async () => {
  const res = await axios.post(patchProductURL, patchProductData);
  return res.data;
};
const patchResponse = await patchProduct();
console.log(patchResponse);
