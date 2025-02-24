import axios from 'axios'

export const BASE_URL = 'https://panda-market-api-crud.vercel.app/products';

export const getProductList= async (page, pagesize, keyword) => {
    try {
      console.log("함수실행중");
      const res = BASE_URL;
      const response = await axios.get(res, {
        page: page,
        pageSize: pagesize,
        keyword: keyword
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
//   getProductList();

export const getProduct = async (id) => {
  try {
        console.log("함수실행중");
        const res = `${BASE_URL}/${id}`;
        const response = await axios.get(res);
        console.log(response.data);
        return response;
    } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }}
};

// getProduct()

export const createProduct = async (name, description, price, tags, images) => {
    try {
        console.log("함수실행중")
        const res = BASE_URL;
        const produtsData = {
            name: name,
            description: description,
            price: price,
            tags: tags,
            images: `https://${images}`
        }
        const response = await axios.post(res, produtsData);
        console.log(response.data);
        return response;
    } catch (error) {
    if (error.response) {
        console.log("오류발생")
        console.log(error.response.status);
        console.log(error.response.data);
    }else {
        console.log(error.message);
    }}
}

// createProduct("안녕", "하세요", "1000", "반가워요", "이미지")

export const patchProduct = async (id, name, description, price, tags, images) => {
    try {
        console.log("함수실행중");
        const res = `${BASE_URL}/${id}`;
        const produtsData = {
            name: name,
            description: description,
            price: price,
            tags: tags,
            images: images
        };
        const response = await axios.patch(res, produtsData);
        console.log(response.data);
        return response;
    } catch (error) {
        if (error.response) {
            console.log("오류발생")
            console.log(error.response.status);
            console.log(error.response.data);
        }else {
            console.log(error.message);
        }}
}
// patchProduct()

export const deleteProduct = async (id) => {
    try {
        console.log("함수실행중");
        const res = `${BASE_URL}/${id}`;
        const response = await axios.delete(res);
        console.log(response.data);
        return response;
    } catch {
        if (error.response) {
            console.log("오류발생")
            console.log(error.response.status);
            console.log(error.response.data);
        }else {
            console.log(error.message);
        }}
}

deleteProduct()