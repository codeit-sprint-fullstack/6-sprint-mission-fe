import axios from 'axios';

const url = 'https://sprint-mission-api.vercel.app/products'

export async function getProductList(page, pageSize, keyword) {
  try {
    const res = await axios.get(url, { params: { page, pageSize, keyword } });
    return res.data;
  } catch (e) {
    if (e.response) {
      console.log(e.response.status);
      console.log(e.response.data);
    } else {
      console.log("리퀘스트 실패");
    }
  }
}

export async function getProduct(id) {
  try {
    const res = await axios.get(`${url}/${id}`);
    return res.data;
  } catch (e) {
    if (e.response) {
      console.log(e.response.status);
      console.log(e.response.data);
    } else {
      console.log("리퀘스트 실패");
    }
  }
}

export async function createProduct(name, description, price, tags, images) {
  try {
    const res = await axios.post(url, { name, description, price, tags, images });
    return res.data;
  } catch (e) {
    if (e.response) {
      console.log(e.response.status);
      console.log(e.response.data);
    } else {
      console.log("리퀘스트 실패");
    }
  }
}

export async function patchProduct(id, updatedData) {
  try {
    const res = await axios.patch(`${url}/${id}`, updatedData);
    return res.data;
  } catch (e) {
    if (e.response) {
      console.log(e.response.status);
      console.log(e.response.data);
    } else {
      console.log("리퀘스트 실패");
    }
  }
}

export async function deleteProduct(id) {
  try {
    const res = await axios.delete(`${url}/${id}`);
    return res.data;
  } catch (e) {
    if (e.response) {
      console.log(e.response.status);
      console.log(e.response.data);
    } else {
      console.log("리퀘스트 실패");
    }
  }
}
