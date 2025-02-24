import { 
    getProductList, 
    getProduct, 
    createProduct, 
    patchProduct, 
    deleteProduct 
} from './product.js'

import {
    getArticleList,
    getArticle,
    createArticle,
    patchArticle,
    deleteArticle
} from './article.js'

// 🔹 여러 상품 조회 (쿼리 파라미터 사용)
const fetchProducts = async () => {
    const params = {
        page: 1,         
        pageSize: 10,    
        keyword: 'phone'  
    };

    const products = await getProductList(params);
    console.log('✅ 상품 목록:', products);
};

// 🔹 특정 상품 조회 (ID 필요)
const fetchSingleProduct = async (id) => {
    const product = await getProduct(id);
    console.log(`✅ 상품 ${id} 조회 결과:`, product);
};

// 🔹 새 상품 추가 (POST 요청)
const addNewProduct = async () => {
    const newProduct = {
        name: "Wireless Headphones",
        description: "Noise-canceling over-ear headphones",
        price: 129.99,
        tags: ["audio", "wireless", "headphones"],
        images: ["https://www.bose.co.kr/103/?idx=115"]
    };

    const createdProduct = await createProduct(newProduct);
    console.log("✅ 새 상품 추가 완료:", createdProduct);
};

// 🔹 특정 상품 수정 (PATCH 요청)
const updateProduct = async (id) => {
    const updatedData = {
        name: "Updated Headphones",
        price: 99.99
    };

    const updatedProduct = await patchProduct(id, updatedData);
    console.log(`✅ 상품 ${id} 수정 완료:`, updatedProduct);
};

// 🔹 특정 상품 삭제 (DELETE 요청)
const removeProduct = async (id) => {
    const result = await deleteProduct(id);
    console.log(`✅ 상품 ${id} 삭제 완료:`, result);
};



// 여러 게시글 조회
const fetchArticles = async () => {
    const params = {
        page: 1,         
        pageSize: 10,    
        keyword: '홈트레이닝'  
    };
    const articles = await getArticleList(params);
    console.log('✅ 상품 목록:', articles);
};

// 특정 게시글 조회
const fetchSingleArticle = async (id) => {
    const article = await getArticle(id)
    console.log(`✅ 게시글 ${id} 조회 결과:`, article);
}

// 특정 게시글 추가
const addNewArticle = async (data) => {
    const newData = {
        title: "home Headphones",
        description: "Noise-canceling over-ear headphones",
        price: 129.99,
        tags: ["audio", "wireless", "headphones"],
        images: ["https://www.bose.co.kr/103/?idx=115"]
    };

    const createdArticle = await createArticle(newData);
    console.log("✅ 새 게시글 추가 완료:", createdArticle);
};

// 특정 상품 업데이트
const updateArticle = async (id) => {
    const updateData = {
        name: "Updated Headphones",
        price: 100
    }

    const updatedArticle = await patchArticle(id, updateData)
    console.log(`✅ 게시글 ${id} 수정 완료:`, updatedArticle);
};

// 특정 게시글 삭제 
const removeArticle = async (id) => {
    const result = await deleteArticle(id);
    console.log(`✅ 게시글 ${id} 삭제 완료:`, result);
};



// 🚀 실행 예제
fetchProducts();         
fetchSingleProduct(23);   
addNewProduct();         
updateProduct(28);        
removeProduct(32);        


fetchArticles();
fetchSingleArticle(22);
addNewArticle();
updateArticle(28);
removeArticle(30);