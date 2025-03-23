import {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
} from "./services/ArticleService.js";
import {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
} from "./services/ProductService.js"

// ArticleService.js 검증 함수.
const settingBodyA = {
  "title": "string",
  "content": "string",
  "image": "string"
};

getArticleList(1,2).then(data => console.log("getArticleList: ", data));
getArticle(7).then(data => console.log("getArticle: ", data));

createArticle(settingBodyA).then(console.log);
patchArticle(7, settingBodyA).then(console.log);
deleteArticle(6).then(console.log);



//ProductService.js 검증 함수.
const settingBodyP = {
  "name": "string",
  "description": "string",
  "price": 1,
  "tags": [
    "string"
  ],
  "images": [
    "string"
  ]
}

console.log("getProductList: ", await getProductList(1,2));
console.log("getProduct: ", await getProduct(6))

console.log("createProduct: ", await createProduct(settingBodyP))
console.log("patchProduct: ", await patchProduct(89, settingBodyP))
console.log("deleteProduct: ", await deleteProduct(89))