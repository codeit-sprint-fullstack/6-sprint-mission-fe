// axios 설정

import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://sprint-mission-api.vercel.app',
  timeout: 5000,
});

// get 함수들

export async function getProductList(page, pageSize, keyword = '') {

  try {
    const response = await instance.get(
      `/products?page=${page}&pageSize=${pageSize}&keyword=${keyword}`
    );

    if (response.status < 200 || response.status >= 300) {
      throw new Error('GET List 함수 작동이 안 됨');
    }

    console.log(response.data);
    return response.data;
    
  } catch (error) {
    console.error(error.message);
  }
}

export async function getProduct(id) {
  try {
    const response = await instance.get(`/products/${id}`);

    if (response.status < 200 || response.status >= 300) {
      throw new Error('Get 함수 작동이 안 됨');
    }

    console.log(response.data);
    return response.data;

  } catch (error) {
    console.error(error.message);
  }
}

// post, patch, delete 함수

export async function createProduct(productData) {
  try {
    const response = await instance.post('/products', productData);

    if (response.status < 200 || response.status >= 300) {
      throw new Error('POST 함수 작동이 안 됨');
    }

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
}

export async function patchProduct(id, patchData) {
  try {
    const response = await instance.patch(`/products/${id}`, patchData);

    if(response.status < 200 || response.status >= 300) {
      console.log('PATCH 함수 작동이 안 됨');
    }

    console.log(response.data);
    return response.data;

  } catch (error) {
    console.error(error.message);
  }
}

export async function deleteProduct(id) {
  try {
    const response = await instance.delete(`/products/${id}`);

    if(response.status < 200 || response.status >= 300) {
      console.log('DELETE 함수 작동이 안 됨');
    }

    console.log(response.data);
    return response.data;

  } catch (error) {
    console.error(error.message);
  }
}