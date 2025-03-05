import { getArticleList, getArticle, createArticle, patchArticle, deleteArticle } from './ArticleService.js';

import { getProductList, getProduct, createProduct, patchProduct, deleteProduct } from './ProductService.js';

// ArticleService.js 출력
getArticleList(1, 5, '추천');

getArticle(3);

createArticle('새로운 제목', '새로운 내용', 'https://example.com/new-image.jpg');

patchArticle(4, { title: '수정된 제목', content: '수정된 내용' });

deleteArticle(5);


// ProductService.js 출력 
getProductList(1, 10, 'phone').then(data => console.log(data));

getProduct('product-id-12345').then(data => console.log(data));

const newProduct = {
    name: 'New Product',
    description: 'Description of the new product',
    price: 100,
    tags: ['tag1', 'tag2'],
    images: ['image-url-1', 'image-url-2']
};
createProduct(newProduct)
    .then(data => console.log('Created Product:', data));
const updateData = {
    price: 150
};

patchProduct('product-id-12345', updateData).then(data => console.log('Updated Product:', data));

deleteProduct('product-id-12345').then(success => {
    if (success) console.log('Product deleted successfully');
    else console.log('Failed to delete product');
});