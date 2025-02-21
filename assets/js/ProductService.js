// ** need to declare functions with export at the bottom once functions are written
// Use the 'https://sprint-mission-api.vercel.app/products' API to implement the following functions:
// Use async/await for handling asynchronous processing.
// Use try/catch for error handling.

import axios from 'axios';
// use axios instance for product service api handling
const instance = axios.create({
  baseURL: 'https://panda-market-api-crud.vercel.app/products',
});

// getProductList(): Use the GET method.
// Use query parameters `page`, `pageSize`, and `keyword`.
async function getProductList(page= 1, pageSize= 100, keyword='') {
  try {
    const params = { page, pageSize, keyword }//* too redundant?
    const productList = await instance.get('/', { params });
    console.log('상품 목록 조회 성공:', productList.data);
    return productList.data;
  } catch (error) {
    console.error('상품 목록 조회 에러 발생:', error);
    if (error.response) {
      console.error('HTTPS 에러:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('Request 에러:', error.request);
    } else {
      console.error('Setup 에러:', error.message);
    }
  }
}

// getProduct(): Use the GET method.
async function getProduct(id) {
  try {
    const product = await instance.get(`/${id}`);
    console.log(`조회한 상품 아이디 ${id} 검색 결과:`, product.data);
    return product.data;
  } catch (error) {
    console.error('상품 아이디 조회 에러 발생:', error);
    if (error.response) {
      console.error('HTTPS 에러:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('Request 에러:', error.request);
    } else {
      console.error('Setup 에러:', error.message);
    }
  }
}

// createProduct(): Use the POST method.
async function createProduct(productContent) {
  // productContent has `name`, `description`, `price`, `tags`, and `images` 
  try {
    const createdProduct = await instance.post('/', productContent);
    console.log('상품이 등록되었습니다:', createdProduct.data);
    return createdProduct.data;
  } catch(error) {
    console.error('상품 등록 에러 발생:', error);
    if (error.response) {
      console.error('HTTPS 에러:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('Request 에러:', error.request);
    } else {
      console.error('Setup 에러:', error.message);
    }
  }
}
// patchProduct(): Use the PATCH method.

// deleteProduct(): Use the DELETE method.
export { getProductList, getProduct, createProduct };