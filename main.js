import {
    getProductList,
    getProduct,
    createProduct,
    patchProduct,
    deleteProduct
} from './ProductService.js';

import {
    getArticleList,
    getArticle,
    createArticle,
    patchArticle,
    deleteArticle
} from './ArticleService.js';


//상품 json
/*
{
    "name": "string",
    "description": "string",
    "price": 0,
    "manufacturer": "string",
    "tags": [
    "string"
     ],
    "images": [
    "string"
    ]
}
*/

//게시글 json
/*
{
    "title": "string",
    "content": "string",
    "image": "string"
}
*/



// ProductService 예시
const product = {
    name: "Testing",
    description: "Testing",
    price: 29900,
    manufacturer: "Codeit",
    tags: ["전자제품", "스마트폰", "삼성"],
    images: ["https://images-na.ssl-images-amazon.com/images/I/81vkpupvZlL._AC_SL1500_.jpg"],
};


//ArticleService 예시
const article = {
    title: "Testing",
    content: "이것은 새로운 게시글의 내용입니다.",
    image: "https://example.com/image.jpg"
};

//게시글 생성
/*
createArticle(article.title, article.content, article.image).then(response => {
    console.log('게시글이 성공적으로 생성되었습니다', response);
}).catch(error => {
    console.error('게시글 생성 오류', error);
});
*/

const articleFix = {
    title: "Fixing",
    content: "이것은 새로운 게시글의 내용입니다.",
    image: "https://example.com/image.jpg"
};

//게시글 생성
/*
createArticle(article.title, article.content, article.image).then(response => {
    console.log('게시글이 성공적으로 생성되었습니다', response);
}).catch(error => {
    console.error('게시글 생성 오류', error);
});
*/

//게시글 수정
/*patchArticle(146, articleFix).then(response => {
    console.log('게시글이 성공적으로 수정되었습니다', response);
}).catch(error => {
    console.error('게시글 수정 오류', error);
});
*/

//게시글 조회
/*
getArticle(146).then(response => {
    console.log('게시글이 성공적으로 가져오기', response);
}).catch(error => {
    console.error('게시글 가져오기 오류', error);
});
*/

//게시글 삭제
/*
deleteArticle(146).then(response => {
    console.log('게시글이 성공적으로 삭제되었습니다', response);
}).catch(error => { 
    console.error('게시글 삭제 오류', error);
})
*/



//상품 생성
/*
createProduct(product).then(response => {
    console.log('상품이 성공적으로 생성되었습니다', response);
}).catch(error => {
    console.error('상품 생성 오류', error);
});
*/

const productFix = {
    name: "Fixing",
    description: "Testing",
    price: 29900,
    manufacturer: "Codeit",
    tags: ["전자제품", "스마트폰", "삼성"],
    images: ["https://images-na.ssl-images-amazon.com/images/I/81vkpupvZlL._AC_SL1500_.jpg"],
};

//상품 수정
/*
patchProduct(100, productFix).then(response => {
    console.log('상품이 성공적으로 수정되었습니다', response);
}).catch(error => {
    console.error('상품 수정 오류', error);
});
*/

//상품 조회
/*
getProduct(100).then(response => {
    console.log('상품이 성공적으로 가져오기', response);
}).catch(error => {
    console.error('상품 가져오기 오류', error);
});
*/


//상품 삭제
/*
deleteProduct(100).then(response => {
    console.log('상품이 성공적으로 삭제되었습니다', response);
}).catch(error => {
    console.error('상품 삭제 오류', error);
});
*/