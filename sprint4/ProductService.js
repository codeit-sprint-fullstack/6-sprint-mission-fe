export const getProductList = async (page = 1, pageSize = 10, keyword = '') => {
    try {
        const response = await fetch(`https://sprint-mission-api.vercel.app/products?page=${page}&pageSize=${pageSize}&keyword=${keyword}`);
        if (!response.ok) throw new Error(`${response.status}`);
        const data = await response.json();
        console.log("Product List:", data);
    } catch (error) {
        console.error(error);
    }
};

export const getProduct = async (id) => {
    try {
        const response = await fetch(`https://sprint-mission-api.vercel.app/products/${id}`);
        if (!response.ok) throw new Error(`${response.status}`);
        const data = await response.json();
        console.log("Product:", data);
    } catch (error) {
        console.error(error);
    }
};

export const createProduct = async (name, description, price, tags, images) => {
    try {
        const response = await fetch(`https://sprint-mission-api.vercel.app/products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, description, price, tags, images }),
        });
        if (!response.ok) throw new Error(`${response.status}`);
        const data = await response.json();
        console.log("Product Created:", data);
    } catch (error) {
        console.error(error);
    }
};

export const patchProduct = async (id, updates) => {
    try {
        const response = await fetch(`https://sprint-mission-api.vercel.app/products/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates),
        });
        if (!response.ok) throw new Error(`${response.status}`);
        const data = await response.json();
        console.log("Product Updated:", data);
    } catch (error) {
        console.error(error);
    }
};

export const deleteProduct = async (id) => {
    try {
        const response = await fetch(`https://sprint-mission-api.vercel.app/products/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error(`${response.status}`);
        console.log("Product Deleted");
    } catch (error) {
        console.error(error);
    }
};
