import axios from "axios";

export const Product_URL = "https://panda-market-api-crud.vercel.app/products";

export const getProductList = async (page, pagesize, keyword) => {
  try {
    console.log("함수실행중");
    const res = Product_URL;
    const response = await axios.get(res, {
      page: page,
      pageSize: pagesize,
      keyword: keyword,
    });
    console.log(response.data);
    return response;
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
};

export const getProduct = async (id) => {
  try {
    console.log("함수실행중");
    const res = `${Product_URL}/${id}`;
    const response = await axios.get(res);
    console.log(response.data);
    return response;
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
};

export const createProduct = async (name, description, price, tags, images) => {
  try {
    console.log("함수실행중");
    const res = Product_URL;
    const produtsData = {
      name: name,
      description: description,
      price: price,
      tags: tags,
      images: `https://${images}`,
    };
    const response = await axios.post(res, produtsData);
    console.log(response.data);
    return response;
  } catch (error) {
    if (error.response) {
      console.log("오류발생");
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
};

export const patchProduct = async (
  id,
  name,
  description,
  price,
  tags,
  images
) => {
  try {
    console.log("함수실행중");
    const res = `${Product_URL}/${id}`;
    const produtsData = {
      name: name,
      description: description,
      price: price,
      tags: tags,
      images: images,
    };
    const response = await axios.patch(res, produtsData);
    console.log(response.data);
    return response;
  } catch (error) {
    if (error.response) {
      console.log("오류발생");
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
};

export const deleteProduct = async (id) => {
  try {
    console.log("함수실행중");
    const res = `${Product_URL}/${id}`;
    const response = await axios.delete(res);
    console.log(response.data);
    return response;
  } catch {
    if (error.response) {
      console.log("오류발생");
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
};
