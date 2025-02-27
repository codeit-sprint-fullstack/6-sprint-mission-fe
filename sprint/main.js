import {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
} from "./ArticleService.js";
import {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
} from "./ProductService.js";

getArticleList().then((data) => console.log(data));
getArticle(10).then((data) => console.log(data));
const newArticleData = {
  title: "판다",
  content: "판다사진입니다",
  image:
    "https://i.namu.wiki/i/UP0iFSmqT4A4RJTAXWKtZO8lTr0r6SlQzfM_CqpH5lrlXI1D6tiuHqdJj0_TFTZ-oEML0pgTg4-0j0E1c508Bg9bfPKtwxyl-7wh74-JoeTSeT1ZBLsbc8xqlV1nCtXSJZy5MciQj1mh3rNfiSaGeg.webp",
};
createArticle(newArticleData).then((data) => console.log(data));
const patchArtocleData = {
  title: "토끼",
  content: "토끼사진입니다.",
  image:
    "https://i.namu.wiki/i/Jz1XmL6cFsf6tevhSiw3WAo3Q30Ziwr_5SdqKZEpo-t5WcdLSEavq80MGwZk7ncuLKAQ8PDakTqDCIWdIYM0qZ5iBV-R8jPeeeAI3mYnoguJ0VKyqSdOkdk6uMfM1q330CZo3-5E55cd6dHQVLg6QA.webp",
};
patchArticle(168, patchArtocleData).then((data) => console.log(data));
deleteArticle(169).then((data) => console.log(data));

console.log(await getProductList());
console.log(await getProduct(8));
const newProductData = {
  name: "갤럭시S25",
  description: "이것은 갤럭시S25 입니다",
  price: 10000,
  manufacturer: "삼성전자",
  tags: ["전자제품", "삼성"],
  images: [
    "https://images.samsung.com/kdp/static/mkt/smartphones/galaxy-s25/images/galaxy-s25-features-kv.jpg?imbypass=true",
    "https://www.androidheadlines.com/wp-content/uploads/2024/09/Galaxy-S25-5K1-scaled.webp",
  ],
};
console.log(await createProduct(newProductData));
const patchProductData = {
  name: "수정된상품",
  description: "이것은 수정된 상품 입니다",
  price: 1000,
  tags: ["test1", "test2"],
  images: [
    "https://i.namu.wiki/i/u9xYEu6p2p0klHmkLpRb3z4xmA2Ymymcn89f5qg6GKbpdPi8u4eZ6Pb3e8u9g8F59VoSLW8apoh0LOr9s5ASnw.webp",
  ],
};
console.log(await patchProduct(patchProductData));
console.log(await deleteProduct(16));
