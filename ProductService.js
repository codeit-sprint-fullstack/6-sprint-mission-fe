// (공통) API 주소
const BASE_URL = 'https://sprint-mission-api.vercel.app/products';


// getProductList()
export const getProductList = async (page = 1, pagesize = 10, keyword = '') => {
    try {
        const response = await fetch(`${BASE_URL}?page=${page}&pagesize=${pagesize}&keyword=${encodeURIComponent(keyword)}`);
        if (!response.ok) throw new Error('Failed to fetch product list');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in getProductList:', error);
        return null;
    }
};


// getProduct()
export const getProduct = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`);
        if (!response.ok) throw new Error('Failed to fetch product');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in getProduct:', error);
        return null;
    }
};


// createProduct()
export const createProduct = async (product) => {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });
        if (!response.ok) throw new Error('Failed to create product');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in createProduct:', error);
        return null;
    }
};


// patchProduct()
export const patchProduct = async (id, updateData) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
        });
        if (!response.ok) throw new Error('Failed to update product');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in patchProduct:', error);
        return null;
    }
};


// deleteProduct()
export const deleteProduct = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete product');
        return true;
    } catch (error) {
        console.error('Error in deleteProduct:', error);
        return false;
    }
};
