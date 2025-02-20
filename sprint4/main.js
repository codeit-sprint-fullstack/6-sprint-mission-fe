import { getArticleList, getArticle, createArticle, patchArticle, deleteArticle } from './ArticleService.js';
import { getProductList, getProduct, createProduct, patchProduct, deleteProduct } from './ProductService.js';

// Test article functions
getArticleList();
getArticle('1');
createArticle('New Title', 'New Content', 'image-url.jpg');
patchArticle('20', { title: 'Updated Title' });
deleteArticle('20');

// Test product functions
getProductList();
getProduct('1');
createProduct('New Product', 'New Description', 99.99, ['tag1', 'tag2'], ['image1.jpg']);
patchProduct('20', { price: 79.99 });
deleteProduct('20');
