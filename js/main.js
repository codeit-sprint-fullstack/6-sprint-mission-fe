// import

import {
  getArticleList, getArticle, createArticle, patchArticle, deleteArticle
} from "./ArticleService.js";

import {
  getProduct, getProductList, createProduct, patchProduct, deleteProduct
} from "./ProductService.js";


// article 함수 test

getArticleList(1, 10, '커피');

createArticle({
  "title": "킨토 물병",
  "content": "비싸지만 좋음.",
  "image": "이미지 주소"
});

getArticle(139);

patchArticle(139, {
  "content": "예쁘지만 비싸서 가성비 생각하면 다이소 물병이 더 좋음.",
});

deleteArticle(139);


// product 함수 test

getProductList(1, 10, '의자');

getProduct(91);

createProduct({
  "name": "허먼 밀러 의자",
  "description": "사무용 의자",
  "price": 2000000,
  "tags": ['사무용 의자'],
  "images": ['ㅇㅇ'],
});

patchProduct(91, {
  "images": ['없음!'],
})

deleteProduct(93);