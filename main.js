import { 
    getArticle,
    getArticleList,
    createArticle,
    patchArticle,
    deleteArticle
} 
from "./ArticleService.js"

import { 
    getProductList,
    createProduct,
    patchProduct,
    deleteProduct
 } 
 from "./ProductService.js"


 // ArticleSErvice
getArticleList(1 , 5, '테스트')
getArticle(101)
createArticle('타이틀', '컨텐츠', 'http://hsj.com')
patchArticle(101)
deleteArticle(101)

// ProductService
getProductList(1,1)
createArticle('hsj0222', 'hsj0222_content', 'https://hsj.com')
patchProduct(101)
deleteProduct(101)
