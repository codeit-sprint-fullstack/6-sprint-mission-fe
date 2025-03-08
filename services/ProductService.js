//axios(instance활용), (async/await)/비동기처리, (try/catch)/오류처리 사용
import axios from "axios";

const instance = axios.create({
  baseURL: 'https://sprint-mission-api.vercel.app/products',
});

async function getProductList(page = 1, pageSize = 100, keyword = "") {
  try{
    // const response = await axios.get(BASE_URL, {
    //   params: { page, pageSize, keyword }
    // });
    const response = await instance.get("/", {
      params: { page, pageSize, keyword }
    });
    return response.data;
  } catch (error) {
    console.error(`[ERROR] getProductList failed: ${error.response ? error.response.status : error.message}`);
    return null;
  }
}

async function getProduct(id) {
  try{
    const response = await instance.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`[ERROR] getProduct failed: ${error.response ? error.response.status : error.message}`);
    return null;
  }
}

async function createProduct({name, description, price, tags, images}) {
  try{
    if (!name || !description || !price || !tags || !images) {
      console.error("[ERROR] createProduct failed: Missing required fields.");
      return Promise.reject(new Error("All fields (name, description, price, tags, images) are required."));
    }

    const response = await instance.post("/",{
      name,
      description,
      price,
      tags,
      images
    });
    return response.data;
  } catch (error) {
    console.error(`[ERROR] createProduct failed: ${error.response ? error.response.status : error.message}`);
    return null;
  }
}

async function patchProduct(id, updateData) {
  try{
    if (!id || !updateData || Object.keys(updateData).length === 0) {
      console.error("[ERROR] patchProduct failed: id and updateData are required.");
      return Promise.reject(new Error("Product ID and at least one update field are required."));
    }

    const response = await instance.patch(`/${id}`, updateData);
    return response.data;
  } catch (error) {
    console.error(`[ERROR] patchProduct failed: ${error.response ? error.response.status : error.message}`);
    return null;
  } 
}

async function deleteProduct(id) {
  try{
    const response = await instance.delete(`/${id}`);
    return response.status === 204;
  } catch (error) {
    console.error(`[ERROR] deleteProduct failed: ${error.response ? error.response.status : error.message}`);
    return false;
  } 
}

export {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
}