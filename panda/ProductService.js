import axios from 'axios';

const baseURL = 'https://panda-market-api-crud.vercel.app/products'

const instance = axios.create({ baseURL });


const handleError = (error) => {
    if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Response Data:", error.response.data);
    } else if (error.request) {
        console.log("No Response from Server:", error.request);
    } else {
        console.log("Request Error:", error.message);
    }
    console.log("Request Config:", error.config);
};

// 상품 목록 조회(getProductList)
async function getProductList(page = 1, pageSize = 10, keyword = "") {
    try {
        const res = await instance.get("/", { params: { page, pageSize, keyword } });
        return res.data;
    } catch (error) {
        handleError(error);
    }
}
// 특정 상품 조회(getProduct)
async function getProduct(id) {
    try {
        const res = await instance.get(`/${id}`);
        return res.data;
    } catch (error) {
        handleError(error);
    }
}

// 상품 생성(createProduct)
async function createProduct(name, description, price, tags, images) {
    try {
        const res = await instance.post("/", { name, description, price, tags, images });
        return res.data;
    } catch (error) {
        handleError(error);
    }
}

// 상품 수정(patchProduct)
async function patchProduct(id, updateData) {
    try {
        const res = await instance.patch(`/${id}`, updateData);
        return res.data;
    } catch (error) {
        handleError(error);
    }
}

// 상품 삭제(deleteProduct)
async function deleteProduct(id, password) {
    try {
        const res = await instance.delete(`/${id}`, { data: { password } });
        return res.data;
    } catch (error) {
        handleError(error);
    }
}

export {
    getProductList,
    getProduct,
    createProduct,
    patchProduct,
    deleteProduct
};
