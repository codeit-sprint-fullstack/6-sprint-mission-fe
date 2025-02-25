const BASE_URL = 'https://sprint-mission-api.vercel.app/products';

async function getProductList(page, pageSize, keyword) {
    try {
        const response = await fetch(`${BASE_URL}?page=${page}&pageSize=${pageSize}&keyword=${keyword}`);
        if (!response.ok) {
            throw new Error('네트워크 응답 오류');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('상품 목록을 가져오는데 실패했습니다:', error);
        throw error;
    }
}

async function getProduct(id) {
    try {
        const response = await fetch(`${BASE_URL}/${id}`);
        if (!response.ok) {
            throw new Error('네트워크 응답 오류');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('상품을 가져오는데 실패했습니다:', error);
        throw error;
    }
}

async function createProduct(product) {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
        if (!response.ok) {
            throw new Error('네트워크 응답 오류');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('상품을 생성하는데 실패했습니다:', error);
        throw error;
    }
}

async function patchProduct(id, updates) {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updates)
        });
        if (!response.ok) {
            throw new Error('네트워크 응답 오류');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('상품을 업데이트하는데 실패했습니다:', error);
        throw error;
    }
}

async function deleteProduct(id) {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('네트워크 응답 오류');
        }
        return true;
    } catch (error) {
        console.error('상품을 삭제하는데 실패했습니다:', error);
        throw error;
    }
}

export { 
    getProductList, 
    getProduct, 
    createProduct, 
    patchProduct, 
    deleteProduct 
};
