const url = 'https://sprint-mission-api.vercel.app/products' ;

export const getProductList = async (page = 1, pageSize = 50, keyword = '') => {
    try {
        const response = await fetch(`${url}?page=${page}&pageSize=${pageSize}&keyword=${encodeURIComponent(keyword)}`);// encodeURIComponent(keyword)를 사용하면 특수 문자(예: 한글, 공백, & 등)가 깨지는 문제를 방지할 수 있음
        if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch product list:', error);
    }
};

export const getProduct = async (id) => {
    try {
        const response = await fetch(`${url}/${id}`);
        if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
        return await response.json();
    } catch (error) {
        console.error(`Failed to fetch product with ID ${id}:`, error);
    }
};

export const createProduct = async (name, description, price, tags, images) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, description, price, tags, images })
        });
        if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
        return await response.json();
    } catch (error) {
        console.error('Failed to create product:', error);
    }
};

export const patchProduct = async (id, updatedFields) => {
    try {
        const response = await fetch(`${url}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedFields)
        });
        if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
        return await response.json();
    } catch (error) {
        console.error(`Failed to update product with ID ${id}:`, error);
    }
};

export const deleteProduct = async (id) => {
    try {
        const response = await fetch(`${url}/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
        return { message: 'Product deleted successfully' };
    } catch (error) {
        console.error(`Failed to delete product with ID ${id}:`, error);
    }
};
