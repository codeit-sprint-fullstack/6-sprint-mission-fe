import { getArticleList, getArticle, createArticle, patchArticle, deleteArticle } from './ArticleService.js'
import { getProductList, getProduct, createProduct, patchProduct, deleteProduct } from './ProductService.js'

/* 게시글 API 테스트 */

// 게시글 목록 조회
const articletList = await getArticleList({ page: 1, pageSize: 100 });
console.log(articletList);

// // 게시글 상세 조회
const article = await getArticle(158);
console.log(article);

// // 게시글 등록
const newArticle = await createArticle({
  title: '새 게시글',
  content: 'API 테스트',
  image: 'https://example.com/test.jpg'
});
console.log(newArticle);

// // 게시글 수정
const patchedArticle = await patchArticle(160, {
  title: '수정된 게시글',
  content: 'API 테스트',
  image: 'https://example.com/test.jpg'
});
console.log(patchedArticle);

// // 게시글 삭제
const deletedArticle = await deleteArticle(162);
console.log(deletedArticle);


/* 상품 API 테스트 */ 
// 상품 목록 조회
const productList = await getProductList(1, 5, '테스트');
console.log(productList);

// 상품 상세 조회
const product = await getProduct(87);
console.log(product);

// 상품 등록
const newProduct = await createProduct();
console.log(newProduct);

// 상품 수정
const patchedProduct = await patchProduct(88);
console.log(patchedProduct);

// 상품 삭제
const deletedProduct = await deleteProduct(77);
console.log(deletedProduct);