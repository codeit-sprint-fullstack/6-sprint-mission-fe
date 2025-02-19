import axios from "axios";

const instance = axios.create({
  baseURL: "https://panda-market-api-crud.vercel.app/products",
});

// --------------------------전체 조회-----------------------------
const getProductList = async (options) => {
  try {
    const res = await instance.get("/", { params: options });
    return res.data;
  } catch (e) {
    if (e.response) {
      console.log(e.response.status);
      console.log(e.response.data);
    } else {
      console.log("requeset failed");
    }
  }
};

// console.log(await getProductList());

// --------------------------상세 조회-----------------------------
const getProduct = async (id) => {
  try {
    const res = await instance.get(`/${id}`);
    return res.data;
  } catch (e) {
    if (e.response) {
      console.log(e.response.status);
      console.log(e.response.data);
    } else {
      console.log("requeset failed");
    }
  }
};

// console.log(await getProduct(509));

// --------------------------상품 생성-----------------------------
const creatProduct = async (product) => {
  const res = await instance.post("/", product);
  return res.data;
};

const product = {
  images: ["https://example.com/..."],
  tags: ["전자제품"],
  price: 0,
  description: "string",
  name: "상품 이름",
};

// console.log(await creatProduct(product));

// --------------------------상품 수정-----------------------------
const patchProduct = async (id, product) => {
  try {
    const res = await instance.patch(`/${id}`, product);
    return res.data;
  } catch (e) {
    if (e.response) {
      console.log(e.response.status);
      console.log(e.response.data);
    } else {
      console.log("requeset failed");
    }
  }
};

const products = {
  images: ["https://example.com/..."],
  tags: ["전자제품"],
  price: 0,
  description: "string",
  name: "상품 이름",
};

// console.log(await patchProduct(509, products));

// --------------------------상품 삭제-----------------------------
const deleteProduct = async (id) => {
  try {
    const res = await instance.delete(`/${id}`);
    return res.data;
  } catch (e) {
    if (e.response) {
      console.log(e.response.status);
      console.log(e.response.data);
    } else {
      console.log("requeset failed");
    }
  }
};

// console.log(await deleteProduct(499));
