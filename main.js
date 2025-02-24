// ArticleService.js와 ProductService.js에서 작성한 함수들을 import합니다.
import { getArticleList, getArticle, createArticle, patchArticle, deleteArticle } from './ArticleService.js';
import { getProductList, getProduct, createProduct, patchProduct, deleteProduct } from './ProductService.js';

//Articles

const Articles = await getArticleList(1, 10, '커피');
console.log('게시글리스트:', Articles);

const Article = await getArticle(10);
console.log('게시글:', Article);

const newArticle = await createArticle('새로운 목록', '무선 이어폰 리뷰', 'image1.jpg');
console.log('새로운 게시글:', newArticle);

const updatedArticle = await patchArticle(163, { content: '수정된 내용'});
console.log('업데이트 게시글:', updatedArticle);

const deletedArticle = await deleteArticle(163);
console.log('삭제 게시글:', deletedArticle);



//products

const products = await getProductList(1, 10, '수정된 상품명');
console.log('제품리스트:', products);

const product = await getProduct(8);
console.log('제품:', product);

const newProduct = await createProduct('새로운 목록', '무선 이어폰', 10000, ['이어폰'], ['image1.jpg'],5);
console.log('새로운 제품:', newProduct);

const updatedProduct = await patchProduct(128, { price: 1000 });
console.log('업데이트 제품:', updatedProduct);

const deletedProduct = await deleteProduct(127);
console.log('삭제 제품:', deletedProduct);