import * as product from './ProductService.js'
import * as article from './ArticleService.js'


// const articles = await article.getArticleList({
//     keyword: '수정'
// })
// console.log(articles)

// const garticle = await article.getArticle(66)
// console.log(garticle)

// const carticle = await article.createArticle({
//     title: '수정된 제목',
//     content: '수정된 내용입니다.',
//     image: 'https://example.com/updated-image.jpg',
// })
// console.log(carticle)


// const particle = await article.patchArticle(40, {
//     content: '테스트트 내용입니다.',
// })
// console.log(particle)

// const darticle = await article.deleteArticle(35)
// console.log(darticle)





const products = await product.getProductList({
    keyword: '멋진'
})
console.log(products)


// const gproduct = await product.getProduct()
// console.log(gproduct)


// const cproduct = await product.createProduct({
//         "name": "멋진티비",
//         "description": "최신형 티비",
//         "price": 10000,
//         "tags": [
//           "전자제품"
//         ],
//         "images": [
//           "https://unsplash.com/photos/pElSkGRA2NU"
//         ],

// })
// console.log(cproduct)


// const pproduct = await product.patchProduct(68, {

//         "description": "고물 티비",
//         "price": 20000,


// })
// console.log(pproduct)


// const dproduct = await product.deleteProduct(66)
// console.log(dproduct)