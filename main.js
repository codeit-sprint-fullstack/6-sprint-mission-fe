import { getArticleList, getArticle, createArticle, patchArticle, deleteArticle } from './ArticleService.js';
import { getProductList, getProduct, createProduct, patchProduct, deleteProduct } from './ProductService.js';

const printFuncton = async () => {
    console.log(await patchArticle(59, {
      title: 'hi',
      content: 'patch content',
    }));
};

printFuncton();