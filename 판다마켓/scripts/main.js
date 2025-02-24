import {
  getArticleList,
  getArticle,
  createArticle,
  deleteArticle,
  patchArticle,
} from "./apis/ArticleService.js";

import {
  getProductList,
  getProduct,
  createProduct,
  deleteProduct,
  patchProduct,
} from "./apis/ProductService.js";

//리스트 출력 OK
const articleList = await getArticleList();
console.log("articleList", articleList);
const productList = await getProductList();
console.log("productList", productList);

//---

//개별 출력 OK
const article = await getArticle(9);
console.log("article", article);
const product = await getProduct(9);
console.log("product", product);

//---

//생성 함수 OK
const newArticleItem = {
  title: "제목",
  content: "내용",
  image:
    "https://images-na.ssl-images-amazon.com/images/I/81bVHG7gV-L._AC_SL1500_.jpg",
};

const createArticleResponse = await createArticle(newArticleItem);
console.log("createArticleResponse", createArticleResponse);

const newProductItem = {
  name: "이름",
  description: "설명",
  price: 2000,
  manufacturer: "제조업체",
  tags: ["가구", "의자", "사무실"],
  images: [
    "https://images-na.ssl-images-amazon.com/images/I/71o8Q5XJS5L._AC_SL1500_.jpg",
    "https://images-na.ssl-images-amazon.com/images/I/81vkpupvZlL._AC_SL1500_.jpg",
  ],
};

const createProductResponse = await createProduct(newProductItem);
console.log("createProductResponse", createProductResponse);

//---

//업데이트 함수 OK
const updateArticleItem = {
  content: "이미지 변경",
  image:
    "https://images-na.ssl-images-amazon.com/images/I/81vkpupvZlL._AC_SL1500_.jpg",
};

const updateArticleResponse = await patchArticle(9, updateArticleItem);
console.log("updateArticleResponse", updateArticleResponse);

const updateProductItem = {
  description: "할인",
  price: 1500,
};

const updateProductResponse = await patchProduct(9, updateProductItem);
console.log("updateProductResponse", updateProductResponse);

//---

//삭제 함수 OK
const deleteArticleResponse = await deleteArticle(9);
console.log("deleteArticleResponse", deleteArticleResponse);

const deleteProductResponse = await deleteProduct(9);
console.log("deleteProductResponse", deleteProductResponse);
